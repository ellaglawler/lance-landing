# 🚀 Lance Website

The official website for Lance - an AI-powered collections agent for freelancers. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 📋 Overview

Lance helps freelancers stop chasing clients and start collecting payments. Our AI-powered collections agent politely recovers overdue invoices while protecting client relationships, helping you get paid 2x faster and save 8+ hours monthly.

**Live Site:** [https://lanceos.ai](https://lanceos.ai)

## ✨ Features

- **Modern Landing Page** - Beautiful, responsive design with dark theme
- **User Authentication** - Google OAuth integration
- **Dashboard** - User dashboard with analytics and invoice management
- **Stripe Integration** - Subscription management and payment processing
- **HubSpot Integration** - Lead capture and CRM integration
- **Google Analytics** - Comprehensive analytics tracking
- **Admin Dashboard** - Admin-only features for user management
- **Blog System** - Content management with WordPress integration
- **Waitlist System** - User registration and onboarding flow

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Authentication:** Custom OAuth implementation
- **Payments:** Stripe
- **Analytics:** Google Analytics
- **CRM:** HubSpot
- **Content:** WordPress (Docker)
- **Deployment:** Docker

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for WordPress)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lance-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://lanceos.ai
   NEXT_PUBLIC_API_BASE_URL=https://api.lanceos.ai
   
   # HubSpot Configuration
   NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your-portal-id
   NEXT_PUBLIC_HUBSPOT_FORM_GUID=your-form-guid
   
   # Google Analytics Configuration
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   
   # Feature Flags
   NEXT_PUBLIC_ALLOW_SIGNUP=true
   
   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_your_pro_plan_price_id_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
lance-website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard
│   ├── blog/              # Blog pages
│   ├── dashboard/         # User dashboard
│   ├── onboarding/        # User onboarding
│   ├── pricing/           # Pricing page
│   └── profile/           # User profile
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── auth-context.tsx  # Authentication context
│   ├── dashboard.tsx     # Dashboard components
│   ├── header.tsx        # Site header
│   └── footer.tsx        # Site footer
├── lib/                  # Utility libraries
│   ├── api.ts           # API client
│   ├── stripe.ts        # Stripe integration
│   ├── hubspot.ts       # HubSpot integration
│   └── utils.ts         # Utility functions
├── public/              # Static assets
├── styles/              # Global styles
└── wordpress/           # WordPress Docker setup
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Your site's URL | Yes |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | Yes |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | HubSpot portal ID | No |
| `NEXT_PUBLIC_HUBSPOT_FORM_GUID` | HubSpot form GUID | No |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No |
| `NEXT_PUBLIC_ALLOW_SIGNUP` | Enable user signup | No |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID` | Stripe Pro plan price ID | Yes |

## 🐳 Docker Setup

### WordPress (Optional)

If you need the WordPress blog system:

```bash
cd wordpress
docker-compose up -d
```

This will start WordPress on `http://localhost:8080`

## 📚 Additional Documentation

- [Stripe Setup Guide](./STRIPE_SETUP.md)
- [Admin Dashboard Guide](./ADMIN_DASHBOARD.md)
- [Google Analytics Setup](./GOOGLE_ANALYTICS_SETUP.md)
- [HubSpot Integration](./HUBSPOT_SETUP.md)
- [WordPress Setup](./WORDPRESS_SETUP.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support, email support@lanceos.ai or join our Discord community.

---

**Built with ❤️ by the Lance Team** 