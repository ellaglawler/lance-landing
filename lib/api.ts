import axios from 'axios';

// Base URL can be set here if needed, or use relative URLs for Next.js proxying
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  withCredentials: true, // send cookies for auth if needed
});

// Get Google OAuth URL for sign up (full SSO + Gmail)
export async function getGoogleSignupUrl() {
  const res = await api.get('/google/signup');
  return res.data.url as string;
}

// Get Google OAuth URL for sign in (SSO only)
export async function getGoogleSigninUrl() {
  const res = await api.get('/google/signin');
  return res.data.url as string;
}

// Check if Gmail tokens are valid for the current user
export async function checkGmailToken() {
  const res = await api.get('/google/check-gmail-token');
  return res.data.valid as boolean;
} 