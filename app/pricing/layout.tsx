import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Lance AI Collections Agent | Simple, Transparent Pricing',
  description: 'Choose the perfect Lance plan for your freelance business. Start free, scale as you grow. Recover overdue invoices with AI-powered collections.',
  keywords: [
    'Lance pricing',
    'AI collections pricing',
    'freelancer payment recovery cost',
    'invoice collection pricing',
    'automated collections pricing',
    'freelancer business tools pricing'
  ],
  openGraph: {
    title: 'Lance Pricing - Simple, Transparent Pricing for Freelancers',
    description: 'Choose the perfect Lance plan for your freelance business. Start free, scale as you grow.',
    type: 'website',
    url: 'https://lanceos.ai/pricing',
    siteName: 'Lance',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 