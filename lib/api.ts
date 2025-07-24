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
    refresh: localStorage.getItem('refresh_token'),
  };
}

// Helper to set tokens in localStorage
function setTokens(access: string, refresh: string) {
  localStorage.setItem('jwt', access);
  localStorage.setItem('refresh_token', refresh);
}

// Helper to clear tokens
function clearTokens() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('refresh_token');
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
      const { refresh } = getTokens();
      if (refresh) {
        try {
          console.log('[API] Found refresh token, calling /auth/refresh...');
          const res = await api.post('/auth/refresh', { refresh_token: refresh });
          setTokens(res.data.access_token, res.data.refresh_token);
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
        console.warn('[API] No refresh token found, clearing tokens.');
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