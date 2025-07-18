/**
 * HubSpot Forms API integration for waitlist signups
 */

export interface HubSpotSubmissionResponse {
  success: boolean;
  message: string;
}

/**
 * Get cookie value by name
 */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

/**
 * Submit email to HubSpot form
 */
export async function submitToHubspot(email: string, source: string = 'waitlist'): Promise<HubSpotSubmissionResponse> {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const formGuid = process.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID;

  if (!portalId || !formGuid) {
    console.error('HubSpot environment variables not configured');
    throw new Error('HubSpot configuration is missing. Please check your environment variables.');
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;
  
  const payload = {
    fields: [
      { name: 'email', value: email },
      { name: 'source', value: source }
    ],
    context: {
      pageUri: typeof window !== 'undefined' ? window.location.href : '',
      pageName: 'Lance Landing Page',
      hutk: typeof window !== 'undefined' ? getCookie('hubspotutk') : undefined
    }
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('HubSpot API error:', {
        status: res.status,
        statusText: res.statusText,
        body: errorBody
      });
      throw new Error(`Failed to submit to HubSpot: ${res.status} ${res.statusText}`);
    }

    return {
      success: true,
      message: 'Successfully joined the waitlist!'
    };
  } catch (error) {
    console.error('Error submitting to HubSpot:', error);
    throw error;
  }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
} 