import { Button } from "@/components/ui/button"
import {
  FileText,
  Calendar,
  Users,
  TrendingUp,
  ChevronLeft,
  Cpu,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Zap,
} from "lucide-react"
import { Header } from "@/components/header"
import { WaitlistForm } from "@/components/waitlist-form"
import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lance Blog - Freelancer Payment Strategies & Business Automation | Coming Soon',
  description: 'Get exclusive insights on payment strategies, client relationships, and business automation for freelancers. Learn how to stop chasing clients and start collecting with AI-powered tools.',
  keywords: [
    'freelancer blog',
    'payment strategies',
    'client relationships',
    'business automation',
    'AI for freelancers',
    'invoice collection',
    'freelance business',
    'payment psychology',
    'automated collections',
    'freelancer tips',
    'get paid faster',
    'late payment solutions',
    'freelance cash flow',
    'client communication',
    'business automation tools'
  ],
  openGraph: {
    title: 'Lance Blog - Freelancer Payment Strategies & Business Automation',
    description: 'Exclusive insights on payment strategies, client relationships, and business automation for freelancers. Stop chasing clients, start collecting.',
    type: 'website',
    url: 'https://lanceos.ai/blog',
    siteName: 'Lance',
    images: [
      {
        url: '/images/lance-logo.png',
        width: 1200,
        height: 630,
        alt: 'Lance Blog - Freelancer Payment Strategies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lance Blog - Freelancer Payment Strategies & Business Automation',
    description: 'Exclusive insights on payment strategies, client relationships, and business automation for freelancers.',
    images: ['/images/lance-logo.png'],
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
    canonical: 'https://lanceos.ai/blog',
  },
  authors: [{ name: 'Lance Team' }],
  category: 'Business & Finance',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function BlogPage() {
  return (
    <div className="flex flex-col pt-24">
      {/* Hero Section */}
      <section className="relative py-32 flex items-center justify-center min-h-[60vh]">
        {/* Wave Background */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat wave-bg"
          style={{
            backgroundImage: "url('/hero-wave-bg.png')",
            zIndex: 0
          }}
        ></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {/* Beta Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full micro-badge text-blue-300 text-sm font-medium mb-8">
              <BookOpen className="h-4 w-4" />
              <span>Coming Soon</span>
            </div>

            <h1 className="h1-hero text-white mb-8">
              The Lance <span className="gradient-text-enhanced">Blog</span>
            </h1>

            <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: "#AEB6C4" }}>
              Insights, strategies, and stories from freelancers who've transformed their payment process. 
              Learn how to stop chasing clients and start collecting.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="relative bg-secondary-dark py-32">
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

        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] to-[#0B0F19]/95"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-6xl text-center">
            <div className="mb-16">
              <h2 className="h2-section mb-6">What's Coming to the Blog</h2>
              <p className="text-xl mb-16 max-w-3xl mx-auto" style={{ color: "#AEB6C4" }}>
                We're building a resource hub for freelancers who want to get paid faster and run their business better.
              </p>
            </div>

            {/* Content Categories */}
            <div className="grid gap-8 md:grid-cols-3 mb-16">
              <div className="depth-card-dark rounded-3xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="h3-card mb-4 text-white">Payment Strategies</h3>
                <p style={{ color: "#AEB6C4" }} className="leading-relaxed">
                  Proven tactics to get paid faster, handle difficult clients, and maintain healthy cash flow.
                </p>
              </div>

              <div className="depth-card-dark rounded-3xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="h3-card mb-4 text-white">Client Relationships</h3>
                <p style={{ color: "#AEB6C4" }} className="leading-relaxed">
                  How to maintain professional relationships while ensuring you get paid what you're worth.
                </p>
              </div>

              <div className="depth-card-dark rounded-3xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="h3-card mb-4 text-white">Business Automation</h3>
                <p style={{ color: "#AEB6C4" }} className="leading-relaxed">
                  Tools and techniques to automate admin tasks and focus on what you do best.
                </p>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="depth-card-dark rounded-3xl p-10 max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="h3-card mb-4 text-white text-center">Get Early Access</h3>
              <p className="text-center mb-8" style={{ color: "#AEB6C4" }}>
                Be the first to know when we launch. Get exclusive insights and strategies delivered to your inbox.
              </p>
              
              <WaitlistForm variant="cta" />
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-32 bg-primary-dark relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="h2-section mb-4">Sneak Peek: What We're Working On</h2>
            <p className="text-xl mb-16" style={{ color: "#AEB6C4" }}>
              Here's a preview of the content we're crafting for you.
            </p>

            <div className="grid gap-8 md:grid-cols-2 text-left">
              <div className="depth-card-dark rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-blue-400">Coming Soon</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">"The Psychology of Late Payments: Why Clients Ghost and How to Respond"</h3>
                <p style={{ color: "#AEB6C4" }} className="mb-4">
                  Understanding the psychology behind late payments and how to craft responses that get results without damaging relationships.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>5 min read</span>
                  <span>•</span>
                  <span>Payment Psychology</span>
                </div>
              </div>

              <div className="depth-card-dark rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-blue-400">Coming Soon</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">"From $0 to $50K: How I Automated My Collections Process"</h3>
                <p style={{ color: "#AEB6C4" }} className="mb-4">
                  A freelancer's journey from spending hours chasing payments to having an AI agent handle it all automatically.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>8 min read</span>
                  <span>•</span>
                  <span>Case Study</span>
                </div>
              </div>

              <div className="depth-card-dark rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-blue-400">Coming Soon</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">"The Ultimate Freelancer's Invoice Template (That Actually Gets Paid)"</h3>
                <p style={{ color: "#AEB6C4" }} className="mb-4">
                  Templates, scripts, and strategies that professionalize your invoicing and increase your payment success rate.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>6 min read</span>
                  <span>•</span>
                  <span>Templates & Tools</span>
                </div>
              </div>

              <div className="depth-card-dark rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-blue-400">Coming Soon</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">"AI for Freelancers: Beyond Chatbots to Business Automation"</h3>
                <p style={{ color: "#AEB6C4" }} className="mb-4">
                  How AI is transforming freelance business operations and what tools you should be using right now.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>7 min read</span>
                  <span>•</span>
                  <span>AI & Automation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#141828] relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="h2-section mb-8 text-white">
              Ready to Stop Chasing <span className="gradient-text">and Start Collecting?</span>
            </h2>
            <p className="text-xl mb-8" style={{ color: "#AEB6C4" }}>
              While you wait for the blog, why not try Lance and see how it transforms your payment process?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WaitlistForm variant="demo" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 