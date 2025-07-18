# Google Analytics Setup

This project includes Google Analytics 4 (GA4) integration using Next.js third-parties.

## Setup Instructions

### 1. Create a Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use an existing one
3. Set up a data stream for your website
4. Copy your Measurement ID (starts with "G-")

### 2. Configure Environment Variables

1. Copy your `.env.example` file to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Update the Google Analytics ID in your `.env.local` file:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 3. Verify Installation

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your website and check the browser's developer tools:
   - Go to the Network tab
   - Look for requests to `google-analytics.com` or `googletagmanager.com`
   - You should see analytics data being sent

3. Check your Google Analytics dashboard to confirm data is being received

## Features

- **Automatic Page Tracking**: Page views are automatically tracked
- **Performance Optimized**: Uses Next.js third-parties for optimal loading
- **Privacy Compliant**: Respects user privacy settings
- **Development Safe**: Only loads in production by default

## Custom Events

To track custom events, you can use the `gtag` function:

```typescript
// Track a custom event
gtag('event', 'button_click', {
  event_category: 'engagement',
  event_label: 'cta_button'
})
```

## Privacy Considerations

- Google Analytics respects user privacy settings
- Consider implementing a cookie consent banner for GDPR compliance
- The analytics component only loads when `NEXT_PUBLIC_GA_ID` is provided

## Troubleshooting

- **No data appearing**: Check that your GA ID is correct and the environment variable is set
- **Development vs Production**: Analytics may behave differently in development mode
- **Ad blockers**: Some ad blockers may prevent analytics from loading 