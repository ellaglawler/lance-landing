import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export { stripePromise };

// Helper function to redirect to Stripe Checkout
export async function redirectToCheckout(sessionId: string) {
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }
  
  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
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