# HubSpot Waitlist Form Integration Setup

This guide will help you set up the HubSpot Forms API integration for the Lance landing page waitlist.

## Prerequisites

- Access to a HubSpot account
- Admin permissions to create forms

## Step 1: Create HubSpot Form

1. **Log into HubSpot**
   - Navigate to your HubSpot account dashboard

2. **Create a new form**
   - Go to **Marketing > Lead Capture > Forms**
   - Click **"Create form"**
   - Select **"Standalone form"**

3. **Configure form fields**
   - Add an **Email** field (required)
     - Set field type to "Email"
     - Make it required
   - Add a **Source** field (hidden)
     - Set field type to "Single-line text"
     - Set the field name to "source"
     - Check "Make this field hidden" to hide it from users
     - Set "Default value" to "waitlist"
   - Optionally add additional fields like:
     - First Name (text)
     - Company (text)
     - How did you hear about us? (dropdown)

4. **Form settings**
   - Set form name: "Lance Waitlist Signup"
   - Choose a form group (create new if needed)
   - Set up any desired notifications

5. **Publish the form**
   - Click **"Publish"** to make the form live

## Step 2: Get Form Credentials

After publishing, you'll need two pieces of information:

### Portal ID
- Look in the top-right corner of your HubSpot dashboard
- It's a number like `12345678`

### Form GUID
- Go to your published form
- Click **"Share"** or **"Embed"**
- Copy the form GUID from the embed code
- It looks like: `3a4d1d55-4180-4506-ba12-a5d47f0fcb72`

## Step 3: Environment Configuration

1. **Create `.env.local` file**
   ```bash
   # In the project root directory
   touch .env.local
   ```

2. **Add environment variables**
   ```bash
   # HubSpot Configuration
   NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your-portal-id-here
   NEXT_PUBLIC_HUBSPOT_FORM_GUID=your-form-guid-here
   ```

3. **Replace placeholder values**
   - Replace `your-portal-id-here` with your actual Portal ID
   - Replace `your-form-guid-here` with your actual Form GUID

## Step 4: Test the Integration

1. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Test the form**
   - Navigate to the landing page
   - Try submitting an email through either waitlist form
   - Check the browser console for any errors
   - Verify the submission appears in HubSpot

## Step 5: Production Deployment

1. **Set environment variables in production**
   - Add the same environment variables to your production environment
   - Ensure they're accessible to the Next.js application

2. **Verify production functionality**
   - Test the form on the live site
   - Monitor HubSpot for new submissions

## Troubleshooting

### Common Issues

1. **"HubSpot configuration is missing" error**
   - Check that environment variables are set correctly
   - Ensure the `.env.local` file is in the project root
   - Restart the development server after adding environment variables

2. **"Failed to submit to HubSpot" error**
   - Verify Portal ID and Form GUID are correct
   - Check that the form is published and active
   - Ensure the form field names match: "email" and "source"
   - Verify the "source" field has "waitlist" as the default value

3. **CORS errors**
   - The HubSpot Forms API should handle CORS automatically
   - If issues persist, contact HubSpot support

### Debug Information

The integration includes comprehensive error logging:
- Check browser console for detailed error messages
- Server-side errors are logged to the console
- Form submission responses are logged for debugging

## Security Features

The integration includes:
- **Email validation**: Ensures valid email format
- **Honeypot protection**: Hidden field to catch bots
- **Error handling**: Graceful failure with user feedback
- **Rate limiting**: Consider implementing if needed

## Monitoring

Monitor the following:
- Form submission success rate
- Error frequency and types
- Lead quality in HubSpot
- Conversion tracking (if enabled)

## Support

For technical issues:
1. Check the browser console for error messages
2. Verify environment variables are set correctly
3. Test with a simple email submission
4. Contact the development team if issues persist 