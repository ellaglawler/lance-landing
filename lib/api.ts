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

// Get Google OAuth URL for sign up (full SSO + Gmail)
export async function getGoogleSignupUrl() {
  const res = await api.get('/auth/google/signup');
  return res.data.auth_url as string; // Note: backend returns {auth_url}
}

// Get Google OAuth URL for sign in (SSO only)
export async function getGoogleSigninUrl() {
  const res = await api.get('/auth/google/signin');
  return res.data.auth_url as string; // Note: backend returns {auth_url}
}

// Check Gmail connection and token validity for the current user
export async function checkGmailToken() {
  const res = await api.get('/auth/google/check-gmail-token');
  // Return both fields
  return {
    gmail_connected: res.data.gmail_connected,
    gmail_token_valid: res.data.gmail_token_valid,
  };
}

// Exchange Google OAuth code for tokens (GET /google/callback?code=...)
export async function exchangeGoogleCode(code: string) {
  const res = await api.get('/auth/google/callback-signup', { params: { code } });
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
  const res = await api.post('/email-threads/send-bulk', {
    invoice_ids: invoiceIds,
    tone
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

// Activity API functions
export interface Activity {
  id: number;
  user_id: number;
  activity_type: 'follow_up_sent' | 'overdue_detected' | 'payment_received' | 'invoice_processed' | 'tone_adjusted' | 'bulk_email_sent' | 'gmail_scan_completed' | 'follow_up_scheduled' | 'payment_detected' | 'invoice_escalated';
  message: string;
  created_at: string;
  invoice_id?: number;
  email_thread_id?: number;
  follow_up_id?: number;
  metadata?: Record<string, any>;
}

export interface ActivityListResponse {
  activities: Activity[];
  total_count: number;
}

export interface ActivityStats {
  total_activities: number;
  follow_ups_sent: number;
  payments_received: number;
  invoices_processed: number;
  overdue_detected: number;
  bulk_emails_sent: number;
  gmail_scans_completed: number;
  activity_by_type: Record<string, number>;
}

export interface ActivityTimeline {
  timeline: Array<{
    date: string;
    activities: Array<{
      id: number;
      type: string;
      message: string;
      created_at: string;
    }>;
    counts: Record<string, number>;
  }>;
  total_days: number;
}

// Get activities for the current user
export async function getActivities(params?: {
  limit?: number;
  activity_type?: string;
  days?: number;
}): Promise<ActivityListResponse> {
  const res = await api.get('/activities/', { params });
  return res.data;
}

// Create a new activity
export async function createActivity(activity: {
  activity_type: Activity['activity_type'];
  message: string;
  invoice_id?: number;
  email_thread_id?: number;
  follow_up_id?: number;
  metadata?: Record<string, any>;
}): Promise<Activity> {
  const res = await api.post('/activities/', activity);
  return res.data;
}

// Get activity statistics
export async function getActivityStats(days: number = 7): Promise<ActivityStats> {
  const res = await api.get('/activities/stats', { params: { days } });
  return res.data;
}

// Get activity timeline data
export async function getActivityTimeline(days: number = 7): Promise<ActivityTimeline> {
  const res = await api.get('/activities/timeline', { params: { days } });
  return res.data;
}

// Stripe Subscription API functions
export interface StripeCheckoutSession {
  id: string;
  url: string;
}

export interface StripePortalSession {
  url: string;
}

export interface SubscriptionStatus {
  is_subscribed: boolean;
  subscription_id?: string;
  plan_name?: string;
  status?: string;
  current_period_end?: string;
  cancel_at_period_end?: boolean;
  price?: {
    amount: number;
    currency: string;
    interval: string;
  };
}

// Create a Stripe Checkout session for subscription
export async function createCheckoutSession(priceId: string): Promise<StripeCheckoutSession> {
  console.log('🔍 Frontend Debug: Making API call to create checkout session with price ID:', priceId);
  
  const res = await api.post('/stripe/create-checkout-session', {
    price_id: priceId,
    success_url: `${window.location.origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${window.location.origin}/dashboard?canceled=true`,
    _t: Date.now(), // Cache busting parameter
  });
  
  console.log('🔍 Frontend Debug: API response received:', res.data);
  return res.data;
}

// Create a Customer Portal session
export async function createPortalSession(): Promise<StripePortalSession> {
  const res = await api.post('/stripe/create-portal-session', {
    return_url: `${window.location.origin}/dashboard`,
  });
  return res.data;
}

// Get subscription status for current user
export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
  const res = await api.get('/stripe/subscription-status');
  return res.data;
}

// Get checkout session details
export async function getCheckoutSession(sessionId: string): Promise<any> {
  const res = await api.get(`/stripe/checkout-session/${sessionId}`);
  return res.data;
}