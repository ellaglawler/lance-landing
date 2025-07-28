# Stripe Subscription Integration Setup Guide

This guide will help you set up Stripe Checkout for subscription payments in your Lance application.

## 🚀 Quick Start

### 1. Install Dependencies

The Stripe.js library has already been installed:
```bash
npm install @stripe/stripe-js
```

### 2. Environment Variables

Add your Stripe configuration to your `.env.local` file:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### 3. Backend API Endpoints

Your backend needs to implement these endpoints:

#### Create Checkout Session
```
POST /stripe/create-checkout-session
```

**Request Body:**
```json
{
  "price_id": "price_1OqXxXxXxXxXxXxXxXxXxXx",
  "success_url": "https://yourdomain.com/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}",
  "cancel_url": "https://yourdomain.com/dashboard?canceled=true"
}
```

**Response:**
```json
{
  "id": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

#### Create Customer Portal Session
```
POST /stripe/create-portal-session
```

**Request Body:**
```json
{
  "return_url": "https://yourdomain.com/dashboard"
}
```

**Response:**
```json
{
  "url": "https://billing.stripe.com/..."
}
```

#### Get Subscription Status
```
GET /stripe/subscription-status
```

**Response:**
```json
{
  "is_subscribed": true,
  "subscription_id": "sub_...",
  "plan_name": "Pro Plan",
  "status": "active",
  "current_period_end": "2024-02-01T00:00:00Z",
  "cancel_at_period_end": false
}
```

#### Get Checkout Session Details
```
GET /stripe/checkout-session/{session_id}
```

**Response:**
```json
{
  "id": "cs_test_...",
  "amount_total": 2900,
  "currency": "usd",
  "status": "complete"
}
```

## 📋 Implementation Details

### Frontend Components

1. **Subscription Component** (`components/subscription.tsx`)
   - Displays subscription status
   - Handles checkout initiation
   - Provides customer portal access

2. **Success Page** (`app/success/page.tsx`)
   - Shows subscription confirmation
   - Displays session details

3. **Cancel Page** (`app/cancel/page.tsx`)
   - Handles canceled checkouts
   - Provides retry options

4. **Pricing Page** (`app/pricing/page.tsx`)
   - Showcases subscription plans
   - Direct checkout integration

### API Functions

All Stripe-related API functions are in `lib/api.ts`:

- `createCheckoutSession(priceId)` - Creates Stripe checkout session
- `createPortalSession()` - Creates customer portal session
- `getSubscriptionStatus()` - Gets current subscription status
- `getCheckoutSession(sessionId)` - Gets checkout session details

### Stripe Utilities

Stripe.js utilities are in `lib/stripe.ts`:

- `stripePromise` - Initialized Stripe instance
- `redirectToCheckout(sessionId)` - Redirects to Stripe Checkout
- `handleCheckoutError(error)` - Handles checkout errors

## 🔧 Configuration

### Stripe Dashboard Setup

1. **Create Products & Prices**
   - Go to Stripe Dashboard → Products
   - Create a "Pro Plan" product
   - Add a recurring price (e.g., $29/month)
   - Copy the Price ID (starts with `price_`)

2. **Update Price ID**
   - Replace `price_1OqXxXxXxXxXxXxXxXxXxXx` in:
     - `components/subscription.tsx` (line 67)
     - `app/pricing/page.tsx` (line 18)

3. **Configure Webhooks**
   - Set up webhook endpoints for:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`

### Customer Portal Configuration

1. **Enable Customer Portal**
   - Go to Stripe Dashboard → Settings → Customer Portal
   - Enable the portal
   - Configure allowed features (billing, cancellation, etc.)

2. **Configure Return URLs**
   - Set default return URL to your dashboard
   - Ensure proper redirect handling

## 🎯 Usage Examples

### Starting a Subscription

```typescript
import { createCheckoutSession } from '@/lib/api'
import { redirectToCheckout } from '@/lib/stripe'

const handleSubscribe = async () => {
  try {
    const { id: sessionId } = await createCheckoutSession('price_your_price_id')
    await redirectToCheckout(sessionId)
  } catch (error) {
    console.error('Checkout error:', error)
  }
}
```

### Managing Subscription

```typescript
import { createPortalSession } from '@/lib/api'

const handleManageSubscription = async () => {
  try {
    const { url } = await createPortalSession()
    window.location.href = url
  } catch (error) {
    console.error('Portal error:', error)
  }
}
```

### Checking Subscription Status

```typescript
import { getSubscriptionStatus } from '@/lib/api'

const checkStatus = async () => {
  try {
    const status = await getSubscriptionStatus()
    if (status.is_subscribed) {
      console.log('User has active subscription:', status.plan_name)
    }
  } catch (error) {
    console.error('Status check error:', error)
  }
}
```

## 🚨 Error Handling

The integration includes comprehensive error handling:

- **Checkout Errors**: Displayed via toast notifications
- **API Errors**: Graceful fallbacks with user feedback
- **Network Errors**: Retry mechanisms and loading states

## 🔒 Security Considerations

1. **Never expose secret keys** in frontend code
2. **Always validate sessions** on the backend
3. **Use webhooks** for reliable event handling
4. **Implement proper authentication** for API endpoints

## 📱 Mobile Responsiveness

All components are mobile-responsive and follow your existing design system:

- Responsive pricing cards
- Mobile-optimized checkout flow
- Touch-friendly buttons and interactions

## 🧪 Testing

### Test Mode
- Use Stripe test keys for development
- Test with Stripe's test card numbers
- Verify webhook delivery in test mode

### Test Cards
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

## 📞 Support

For issues with this integration:

1. Check Stripe Dashboard for webhook delivery
2. Verify API endpoint responses
3. Check browser console for JavaScript errors
4. Ensure environment variables are set correctly

## 🔄 Updates

To update the Stripe integration:

1. Update `@stripe/stripe-js` package
2. Review Stripe API changelog
3. Test checkout flow thoroughly
4. Update webhook handlers if needed

---

**Note**: Replace all placeholder price IDs with your actual Stripe price IDs before deploying to production. 