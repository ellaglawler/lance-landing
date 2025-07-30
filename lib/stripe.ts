import { loadStripe } from '@stripe/stripe-js';

// Debug: Log the publishable key being used
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
console.log('🔍 Frontend Debug: Stripe Publishable Key:', publishableKey);
console.log('🔍 Frontend Debug: Key starts with:', publishableKey?.substring(0, 20));

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export { stripePromise };

// Helper function to redirect to Stripe Checkout
export async function redirectToCheckout(sessionId: string) {
  console.log('🔍 Frontend Debug: Redirecting to checkout with session ID:', sessionId);
  
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    console.error('🔍 Frontend Debug: Stripe redirect error:', error);
    throw error;
  }
}

// Helper function to handle checkout errors
export function handleCheckoutError(error: any) {
  console.error('Checkout error:', error);

  if (error.type === 'card_error' || error.type === 'validation_error') {
    return error.message;
  } else {
    return 'An unexpected error occurred. Please try again.';
  }
} 