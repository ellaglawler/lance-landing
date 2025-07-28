import axios from 'axios';

// Base URL can be set here if needed, or use relative URLs for Next.js proxying
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  withCredentials: true, // send cookies for auth if needed
});

// Attach JWT to all requests if present
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

// Helper to get tokens from localStorage
function getTokens() {
  return {
    access: localStorage.getItem('jwt'),
  };
}

// Helper to set tokens in localStorage
function setTokens(access: string) {
  localStorage.setItem('jwt', access);
}

// Helper to clear tokens
function clearTokens() {
  localStorage.removeItem('jwt');
}

// Attempt to refresh JWT if 401 is encountered
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      typeof window !== 'undefined'
    ) {
      console.log('[API] 401 detected, attempting token refresh...');
      originalRequest._retry = true;
      try {
        console.log('[API] Calling /auth/refresh (refresh token sent via HttpOnly cookie)...');
        const res = await api.post('/auth/refresh');
        setTokens(res.data.access_token);
        console.log('[API] Token refresh successful, retrying original request...');
        // Update Authorization header and retry original request
        originalRequest.headers['Authorization'] = `Bearer ${res.data.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('[API] Token refresh failed:', refreshError);
        clearTokens();
        // Optionally, redirect to login page here
      }
    } else {
      if (error.response && error.response.status === 401) {
        console.warn('[API] 401 received, but refresh logic not triggered (maybe already retried or not in browser).');
      }
    }
    return Promise.reject(error);
  }
);

// Get Google OAuth URL for both sign up (full SSO + Gmail) and sign in
export async function getGoogleSignupUrl() {
  const res = await api.get('/auth/google/login');
  return res.data.authorization_url as string;
}

// Use the same endpoint for sign in
export async function getGoogleSigninUrl() {
  const res = await api.get('/auth/google/login');
  return res.data.authorization_url as string;
}

// Check Gmail connection and token validity for the current user
export async function checkGmailToken() {
  try {
    const res = await api.get('/me');
    return {
      gmail_connected: true,
      gmail_token_valid: true
    };
  } catch (error) {
    return {
      gmail_connected: false,
      gmail_token_valid: false
    };
  }
}

// Exchange Google OAuth code for tokens
export async function exchangeGoogleCode(code: string) {
  const res = await api.get('/auth/google/callback', { params: { code } });
  return res.data;
}

// Scan Gmail for invoices for the current user
export async function scanInvoices(query?: string, maxResults: number = 50) {
  const res = await api.get('/invoices/scan/', {
    params: {
      ...(query ? { query } : {}),
      max_results: maxResults,
    },
  });
  return res.data; // { invoices, total_found, overdue_count }
}

// Fetch all invoices for the current user, with optional status/client filters
export async function getInvoices({ status = 'all', client }: { status?: string; client?: string } = {}) {
  const res = await api.get('/invoices/', {
    params: {
      status,
      ...(client ? { client } : {}),
    },
  });
  return res.data; // Array of invoices
}

// Email Thread API functions
export interface EmailThread {
  id: number;
  invoice_id: number;
  user_id: number;
  subject: string;
  content: string;
  tone: string;
  email_type: 'INITIAL_INVOICE' | 'FOLLOW_UP' | 'RESPONSE' | 'PAYMENT_CONFIRMATION' | 'REMINDER';
  direction: 'SENT' | 'RECEIVED';
  gmail_message_id?: string;
  gmail_thread_id?: string;
  is_sent: boolean;
  sent_at?: string;
  created_at: string;
  next_follow_up_date?: string;
  is_automated: boolean;
}

export interface EmailThreadListResponse {
  email_threads: EmailThread[];
  total_count: number;
}

export interface SendEmailRequest {
  invoice_id: number;
  tone: string;
  subject: string;
  content: string;
  is_automated?: boolean;
  next_follow_up_date?: string;
}

// Get email threads for a specific invoice
export async function getEmailThreadsForInvoice(invoiceId: number): Promise<EmailThreadListResponse> {
  const res = await api.get(`/email-threads/invoice/${invoiceId}`);
  return res.data;
}

// Send an email for an invoice
export async function sendEmail(request: SendEmailRequest): Promise<EmailThread> {
  const res = await api.post('/email-threads/send', request);
  return res.data;
}

// Send bulk emails to multiple invoices
export async function sendBulkEmails(invoiceIds: number[], tone: string = 'polite'): Promise<{
  message: string;
  sent_count: number;
  failed_count: number;
  total_invoices: number;
}> {
  const res = await api.post('/email-threads/send-bulk', null, {
    params: { invoice_ids: invoiceIds, tone }
  });
  return res.data;
}

// Get pending follow-ups
export async function getPendingFollowups(): Promise<{
  pending_invoices: Array<{
    id: number;
    client_name: string;
    amount: number;
    days_overdue: number;
    next_follow_up_date: string;
  }>;
  count: number;
}> {
  const res = await api.get('/email-threads/pending-followups');
  return res.data;
}