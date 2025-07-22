import { Header } from "@/components/header"
import { AboutHero } from "./components/AboutHero"
import { AboutProblem } from "./components/AboutProblem"
import { AboutWhy } from "./components/AboutWhy"
import { AboutFeatures } from "./components/AboutFeatures"
import { AboutTeam } from "./components/AboutTeam"
import { AboutCTA } from "./components/AboutCTA"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Lance - AI Collections Agent for Freelancers | Our Mission & Team',
  description: 'Learn about Lance\'s mission to help freelancers get paid faster with AI-powered collections. Meet our team and discover how we\'re transforming payment recovery for independent professionals.',
  keywords: [
    'about lance',
    'lance mission',
    'lance team',
    'AI collections company',
    'freelancer payment company',
    'lance founders',
    'payment recovery mission',
    'AI for freelancers company',
    'lance company story',
    'freelancer payment solutions company',
    'automated collections company',
    'lance business model',
    'freelancer payment automation company',
    'lance company values',
    'payment recovery technology',
    'lance company culture',
    'AI collections agent company',
    'freelancer business tools company',
    'lance company background',
    'payment automation mission'
  ],
  openGraph: {
    title: 'About Lance - AI Collections Agent for Freelancers',
    description: 'Learn about Lance\'s mission to help freelancers get paid faster with AI-powered collections. Meet our team and discover our story.',
    type: 'website',
    url: 'https://lanceos.ai/about',
    siteName: 'Lance',
    images: [
      {
        url: '/images/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'About Lance - AI Collections Agent Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Lance - AI Collections Agent for Freelancers',
    description: 'Learn about Lance\'s mission to help freelancers get paid faster with AI-powered collections.',
    images: ['/images/social-preview.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://lanceos.ai/about',
  },
  authors: [{ name: 'Lance Team' }],
  category: 'Business & Finance',
  other: {
    'application-name': 'Lance',
    'apple-mobile-web-app-title': 'About Lance',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#0B0F19',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#0B0F19',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-24 dark">
      {/* Hero Section */}
      <AboutHero />

      {/* Problem Section */}
      <section className="relative py-24 bg-[#0B0F19]">
        {/* Top Curve */}
        <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ transform: 'translateY(-1px)' }}>
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-[60px]" 
            style={{ transform: 'rotateX(180deg)' }}
          >
            <path 
              d="M600,112C268.63,112,0,69.39,0,69.39V0H1200V69.39C1200,69.39,931.37,112,600,112Z" 
              className="fill-[#0B0F19]"
            ></path>
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <AboutProblem />
        </div>
      </section>

      {/* Section Break */}
      <div className="relative py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
            <div className="w-3 h-3 rounded-full bg-blue-600/30"></div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Why Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#0B0F19] to-[#0B0F19]/95">
        <div className="container mx-auto px-4 md:px-6 relative">
          <AboutWhy />
        </div>
      </section>

      {/* Section Break */}
      <div className="relative py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
            <div className="w-3 h-3 rounded-full bg-blue-600/30"></div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-24 bg-[#0B0F19]">
        <div className="container mx-auto px-4 md:px-6 relative">
          <AboutFeatures />
        </div>
      </section>

      {/* Section Break */}
      <div className="relative py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
            <div className="w-3 h-3 rounded-full bg-blue-600/30"></div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#0B0F19] to-[#0B0F19]/95">
        <div className="container mx-auto px-4 md:px-6 relative">
          <AboutTeam />
        </div>
      </section>

      {/* Section Break */}
      <div className="relative py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
            <div className="w-3 h-3 rounded-full bg-blue-600/30"></div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative py-24 bg-[#0B0F19]">
        <div className="container mx-auto px-4 md:px-6 relative">
          <AboutCTA />
        </div>
      </section>
    </div>
  )
} 