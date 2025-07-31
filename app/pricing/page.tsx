import type { Metadata } from 'next'
import { PricingContent } from '@/components/pricing-content'

export const metadata: Metadata = {
  title: 'Pricing - Lance | AI Collections Agent for Freelancers',
  description: 'Stop chasing clients, start collecting cash. Lance recovers $500-$1,000/month in lost payments automatically. Plans from $49/month.',
  keywords: [
    'Lance pricing',
    'freelancer collections pricing',
    'AI collections cost',
    'invoice recovery pricing',
    'freelancer payment tools pricing',
    'automated collections pricing',
    'payment recovery software cost',
    'freelancer business tools pricing',
    'AI collections agent pricing',
    'invoice chasing software pricing'
  ],
  openGraph: {
    title: 'Pricing - Lance | AI Collections Agent for Freelancers',
    description: 'Stop chasing clients, start collecting cash. Plans from $49/month.',
    type: 'website',
    url: 'https://lanceos.ai/pricing',
    siteName: 'Lance',
  },
}

export default function PricingPage() {
  return <PricingContent />
} 