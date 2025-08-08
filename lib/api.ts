import axios, { AxiosRequestConfig } from 'axios';

// Extend AxiosRequestConfig to include our custom retry flag
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

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

// Mutex lock for refresh token operations
let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
let retryCount = 0;
const MAX_RETRIES = 3;
let isRedirecting = false; // Prevent multiple redirects

// Attempt to refresh JWT if 401 is encountered with mutex lock
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      typeof window !== 'undefined'
    ) {
      console.log('[API] 401 detected, attempting token refresh...');
      originalRequest._retry = true;
      
      // Check retry limits to prevent infinite loops
      if (retryCount >= MAX_RETRIES) {
        console.error('[API] Max retry attempts reached, clearing tokens and redirecting');
        clearTokens();
        retryCount = 0;
        // Show user-friendly message before redirect
        if (typeof window !== 'undefined' && !isRedirecting) {
          isRedirecting = true;
          // Try to show toast notification if available
          try {
            // Check if toast is available (from useToast hook)
            const event = new CustomEvent('show-toast', {
              detail: {
                title: 'Session Expired',
                description: 'Please log in again to continue.',
                variant: 'destructive'
              }
            });
            window.dispatchEvent(event);
          } catch (e) {
            console.log('[API] Toast notification not available');
          }
          // Debounced redirect to prevent multiple navigation triggers
          setTimeout(() => {
            window.location.href = '/onboarding';
          }, 100); // Small delay to prevent multiple redirects
        }
        return Promise.reject(error);
      }
      
      // Use mutex lock to prevent concurrent refresh attempts
      if (!isRefreshing) {
        isRefreshing = true;
        retryCount++;
        
        refreshPromise = (async () => {
          try {
            console.log('[API] Calling /auth/refresh (refresh token sent via HttpOnly cookie)...');
            const res = await api.post('/auth/refresh');
            setTokens(res.data.access_token);
            console.log('[API] Token refresh successful');
            retryCount = 0; // Reset retry count on successful refresh
            return res.data.access_token;
          } catch (refreshError) {
            console.error('[API] Token refresh failed:', refreshError);
            clearTokens();
            retryCount = 0;
            // Show user-friendly message before redirect
            if (typeof window !== 'undefined' && !isRedirecting) {
              isRedirecting = true;
              // Try to show toast notification if available
              try {
                const event = new CustomEvent('show-toast', {
                  detail: {
                    title: 'Session Expired',
                    description: 'Please log in again to continue.',
                    variant: 'destructive'
                  }
                });
                window.dispatchEvent(event);
              } catch (e) {
                console.log('[API] Toast notification not available');
              }
              // Debounced redirect to prevent multiple navigation triggers
              setTimeout(() => {
                window.location.href = '/onboarding';
              }, 100); // Small delay to prevent multiple redirects
            }
            throw refreshError;
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        })();
      }
      
      try {
        // Wait for the refresh to complete (either success or failure)
        const newToken = await refreshPromise;
        console.log('[API] Retrying original request with new token...');
        // Update Authorization header and retry original request
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, reject the original request
        return Promise.reject(error);
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
  return {
    gmail_connected: res.data.gmail_connected,
    gmail_token_valid: res.data.gmail_token_valid,
  };
}

// Exchange Google OAuth code for tokens (GET /google/callback?code=...)
export async function exchangeGoogleCode(code: string, isSignUp: boolean = true) {
  const endpoint = isSignUp ? '/auth/google/callback-signup' : '/auth/google/callback-signin';
  const res = await api.get(endpoint, { params: { code } });
  return res.data;
}

// Upload profile picture
export async function uploadProfilePicture(file: File): Promise<{ message: string; profile_picture_url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await api.post('/auth/profile-picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

// Remove profile picture
export async function removeProfilePicture(): Promise<{ message: string }> {
  const res = await api.delete('/auth/profile-picture');
  return res.data;
}

// Job Status Types
export interface JobStatusResponse {
  job_id: string;
  status: 'queued' | 'started' | 'finished' | 'failed' | 'error';
  result?: string;
  enqueued_at?: string;
  started_at?: string;
  ended_at?: string;
}

export interface AsyncJobResponse {
  type: 'job';
  status: string;
  job_id: string;
  message: string;
}

export interface SyncResultsResponse {
  type: 'results';
  invoices: InvoiceResponse[];
  total_found: number;
  overdue_count: number;
}

export type ScanResponse = AsyncJobResponse | SyncResultsResponse;

// Scan Gmail for invoices for the current user
export async function scanInvoices(query?: string, maxResults: number = 50): Promise<ScanResponse> {
  const res = await api.get('/invoices/scan/', {
    params: {
      ...(query ? { query } : {}),
      max_results: maxResults,
    },
  });
  
  // Handle new async format
  if (res.data.job_id) {
    return { type: 'job', ...res.data };
  }
  
  // Handle legacy sync format (fallback)
  return { type: 'results', ...res.data };
}

// Job status polling functions
export async function getJobStatus(jobId: string): Promise<JobStatusResponse> {
  const res = await api.get(`/invoices/jobs/${jobId}`);
  return res.data;
}

export async function pollJobStatus(
  jobId: string, 
  onUpdate?: (status: JobStatusResponse) => void,
  intervalMs: number = 3000
): Promise<JobStatusResponse> {
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const status = await getJobStatus(jobId);
        onUpdate?.(status);
        
        if (status.status === 'finished' || status.status === 'failed' || status.status === 'error') {
          resolve(status);
        } else {
          setTimeout(poll, intervalMs);
        }
      } catch (error) {
        reject(error);
      }
    };
    
    poll();
  });
}

// Payment status check function
export async function checkPaymentStatus(maxResults: number = 50): Promise<AsyncJobResponse> {
  const res = await api.get('/invoices/payment-status', {
    params: { max_results: maxResults }
  });
  return res.data;
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
  user_name?: string;
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
export async function sendBulkEmails(invoiceIds: number[], tone: string = 'polite', userName?: string): Promise<{
  message: string;
  sent_count: number;
  failed_count: number;
  total_invoices: number;
}> {
  const res = await api.post('/email-threads/send-bulk', {
    invoice_ids: invoiceIds,
    tone,
    user_name: userName
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

// Admin API functions
export interface SchedulerStatus {
  scheduler_running: boolean;
  jobs: Array<{
    id: string;
    name: string;
    next_run_time: string | null;
    trigger: string;
  }>;
  job_count: number;
}

export interface WebhookStatus {
  webhook_setup: {
    total_users: number;
    users_with_gmail: number;
    users_with_history_id: number;
    setup_percentage: number;
  };
  activity: {
    recent_activity_1h: number;
    daily_activity: number;
  };
  health: {
    status: string;
    last_check: string;
  };
}

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  last_gmail_scan: string | null;
  gmail_history_id: string | null;
  gmail_access_token: boolean;
  gmail_refresh_token: boolean;
  is_admin: boolean;
  created_at: string;
}

export interface UserDebugInfo {
  user: AdminUser;
  invoice_stats: {
    total_invoices: number;
    invoices_this_week: number;
    invoices_this_month: number;
  };
  recent_errors: Array<{
    id: number;
    message_id: string;
    reason: string;
    error_type: string | null;
    created_at: string;
  }>;
}

export interface ParsingError {
  id: number;
  user_id: number | null;
  message_id: string;
  thread_id: string | null;
  reason: string;
  error_type: string | null;
  created_at: string;
  raw_content: string | null;
}

export interface ScanLog {
  user_id: number;
  user_email: string;
  scan_timestamp: string;
  scan_type: string;
}

// Get scheduler status
export async function getSchedulerStatus(): Promise<SchedulerStatus> {
  const res = await api.get('/admin/scheduler/status');
  return res.data;
}

// Start scheduler
export async function startScheduler(): Promise<{ status: string; message: string }> {
  const res = await api.post('/admin/scheduler/start');
  return res.data;
}

// Stop scheduler
export async function stopScheduler(): Promise<{ status: string; message: string }> {
  const res = await api.post('/admin/scheduler/stop');
  return res.data;
}

// Get webhook status
export async function getWebhookStatus(): Promise<WebhookStatus> {
  const res = await api.get('/admin/webhook-status');
  return res.data;
}

// Search users
export async function searchUsers(params?: { email?: string; limit?: number }): Promise<AdminUser[]> {
  const res = await api.get('/admin/users/search', { params });
  return res.data;
}

// Get user debug info
export async function getUserDebugInfo(userId: number): Promise<UserDebugInfo> {
  const res = await api.get(`/admin/users/${userId}/debug`);
  return res.data;
}

// Get parsing errors
export async function getParsingErrors(params?: { user_id?: number; error_type?: string; limit?: number }): Promise<ParsingError[]> {
  const res = await api.get('/admin/parsing-errors/', { params });
  return res.data;
}

// Get scan logs
export async function getScanLogs(params?: { user_id?: number; limit?: number }): Promise<ScanLog[]> {
  const res = await api.get('/admin/scan-logs', { params });
  return res.data;
}

// Trigger scan for all users
export async function triggerAllUsersScan(): Promise<{ status: string; message: string }> {
  const res = await api.post('/admin/scheduler/scan-all');
  return res.data;
}

// Trigger scan for specific user
export async function triggerUserScan(userId: number, frequencyHours?: number): Promise<{ status: string; message: string; periodic_scan_setup?: boolean }> {
  const res = await api.post(`/admin/scheduler/scan-user/${userId}`, null, {
    params: frequencyHours ? { frequency_hours: frequencyHours } : {}
  });
  return res.data;
}

// Register Gmail watches for all users
export async function registerGmailWatches(): Promise<{ message: string; results: Array<{ user_id: number; email: string; status: string; history_id?: string; error?: string }> }> {
  const res = await api.post('/admin/gmail/register-watches-all');
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

// Invoice status enum
export type InvoiceStatus = "PAID" | "OVERDUE" | "DUE";

// Test Invoice Generator API functions
export interface InvoiceResponse {
  id: number;
  client_name: string;
  client_email: string | null;
  amount: number;
  currency: string;  // Currency code (USD, EUR, GBP, etc.)
  due_date: string | null;
  days_overdue: number;
  is_overdue: boolean;
  subject: string | null;
  detected_at: string;
  is_cloud_invoice: boolean;
  cloud_invoice_link: string | null;
  confidence: number | null;  // Confidence score (0-1) for invoice detection
  
  // Payment tracking fields
  paid_at: string | null;
  message_type: string | null;
  days_to_payment: number | null;
  message_sent: string | null;
  tone: string | null;
  last_reminder_sent: string | null;
  next_follow_up_date: string | null;
  
  // Reminder summary fields (computed from email threads)
  reminder_count: number;
  last_reminder_tone: string | null;
  
  // Computed status field
  status: InvoiceStatus;
}

export interface TestInvoiceRequest {
  scenario: 'due' | 'past-due' | 'paid' | 'all';
  count: number;
  client?: string;
  send_to: string;
}

export interface TestInvoiceResponse {
  status: string;
  job_id: string;
  message?: string;
}

export interface TestInvoiceJobStatus {
  job_id: string;
  status: 'queued' | 'started' | 'finished' | 'failed' | 'error';
  result?: {
    total_sent: number;
    errors: string[];
    sent_emails: Array<{
      scenario: string;
      client: string;
      send_to: string;
      subject: string;
      amount: number;
      gmail_message_id: string;
      sent_at: string;
    }>;
  };
  enqueued_at?: string;
  started_at?: string;
  ended_at?: string;
  error?: string;
  debug?: {
    redis_status: string;
    queue_length: number | string;
    worker_count: number | string;
    queue_name: string;
    job_position?: number | string;
  };
}

export async function generateTestInvoices(request: TestInvoiceRequest): Promise<TestInvoiceResponse> {
  const res = await api.post('/admin/generate-test-invoices', request);
  return res.data;
}

export async function getTestInvoiceJobStatus(jobId: string): Promise<TestInvoiceJobStatus> {
  const res = await api.get(`/admin/test-invoice-job-status?job_id=${jobId}`);
  return res.data;
}

export async function setUserAdminStatus(userId: number, isAdmin: boolean): Promise<{
  message: string;
  user_id: number;
  email: string;
  is_admin: boolean;
}> {
  const res = await api.post('/admin/users/set-admin', {
    user_id: userId,
    is_admin: isAdmin
  });
  return res.data;
}

export async function getUserInvoices(userId: number, params?: {
  status?: string;
  limit?: number;
}): Promise<InvoiceResponse[]> {
  const response = await api.get(`/admin/users/${userId}/invoices`, { params });
  return response.data;
}

export async function deleteInvoice(invoiceId: number): Promise<{
  message: string;
  invoice_id: number;
  user_email: string;
  client_name: string;
  amount: number;
}> {
  const response = await api.delete(`/admin/invoices/${invoiceId}`);
  return response.data;
}

// Detection Tester Types and Functions
export interface UserWithGmail {
  id: number;
  email: string;
  name: string;
  is_admin: boolean;
}

export interface DetectionTestRequest {
  message_ids: string[];
  mode: 'invoice' | 'payment' | 'match';
  user_id?: number;
}

export interface DetectionResult {
  message_id: string;
  subject?: string;
  from_email?: string;
  to_email?: string;
  date?: string;
  raw_text: string;
  headers: Record<string, string>;
  
  // Invoice detection results
  is_invoice?: boolean;
  invoice_amount?: number;
  invoice_currency?: string;
  invoice_due_date?: string;
  invoice_client_name?: string;
  invoice_confidence?: number;
  invoice_confidence_explanation?: Record<string, any>;
  invoice_number?: string;
  invoice_status?: string;
  
  // Payment detection results
  is_payment_confirmation?: boolean;
  is_payment_pending?: boolean;
  payment_amount?: number;
  payment_currency?: string;
  payment_date?: string;
  payment_confidence?: number;
  payment_confidence_explanation?: Record<string, any>;
  
  // Matching results
  matched_invoice_id?: number;
  match_reason?: string;
  match_details?: Record<string, any>;
  
  // Error information
  error?: string;
  gmail_error?: string;
}

export interface DetectionTestResponse {
  results: DetectionResult[];
  summary: Record<string, any>;
  test_timestamp: string;
}

export async function getUsersWithGmail(): Promise<UserWithGmail[]> {
  const response = await api.get('/admin/users/with-gmail');
  return response.data;
}

export async function testDetection(request: DetectionTestRequest): Promise<DetectionTestResponse> {
  const response = await api.post('/admin/test-detection', request);
  return response.data;
}