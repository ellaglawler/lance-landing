import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  AlertCircle,
  Target,
  Clock,
  TrendingUp,
  Shield,
  BarChart3,
  FileText,
  Palette,
  Code,
  Video,
  ArrowRight,
  Zap,
  Star,
  Cpu,
  Receipt,
  DollarSign,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { WaitlistForm } from "@/components/waitlist-form"
import type { Metadata } from 'next'
import { HeroStats } from "../components/hero-stats"

export const metadata: Metadata = {
  title: 'Lance - AI Collections Agent for Freelancers | Stop Chasing, Start Collecting',
  description: 'Lance is your AI-powered collections agent that politely recovers overdue invoices while protecting client relationships. Get paid 2x faster and save 8+ hours monthly.',
  keywords: [
    'AI collections agent',
    'freelancer payment recovery',
    'overdue invoice collection',
    'automated payment follow-up',
    'freelancer cash flow',
    'client payment automation',
    'invoice collection software',
    'freelancer business tools',
    'payment recovery AI',
    'automated collections',
    'freelancer payment solutions',
    'late payment recovery',
    'client relationship management',
    'freelance business automation',
    'get paid faster',
    'stop chasing clients',
    'AI for freelancers',
    'payment automation tools',
    'invoice follow-up automation',
    'freelancer financial tools'
  ],
  openGraph: {
    title: 'Lance - AI Collections Agent for Freelancers',
    description: 'Stop chasing clients, start collecting. Lance is your AI-powered collections agent that recovers overdue invoices while protecting client relationships.',
    type: 'website',
    url: 'https://lanceos.ai',
    siteName: 'Lance',
    images: [
      {
        url: '/images/lance-logo.png',
        width: 1200,
        height: 630,
        alt: 'Lance - AI Collections Agent for Freelancers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lance - AI Collections Agent for Freelancers',
    description: 'Stop chasing clients, start collecting. AI-powered collections agent that recovers overdue invoices.',
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
    canonical: 'https://lanceos.ai',
  },
  authors: [{ name: 'Lance Team' }],
  category: 'Business & Finance',
  other: {
    'application-name': 'Lance',
    'apple-mobile-web-app-title': 'Lance',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#0B0F19',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#0B0F19',
  },
}

export default function LanceLanding() {
  return (
    <div className="flex flex-col pt-24">
      {/* Hero Section */}
      <section className="relative py-32 flex items-center justify-center min-h-[80vh]">
        {/* Wave Background - Main background that spans all sections */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-wave-bg.png')",
            zIndex: -1
          }}
        ></div>

        {/* Subtle Product Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/images/invoice-detection.png')",
            zIndex: -1
          }}
        ></div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="mx-auto max-w-6xl text-center">
            {/* Beta Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full micro-badge text-blue-300 text-sm font-medium mb-8">
              <Cpu className="h-4 w-4" />
              <span>Lance AI</span>
            </div>

            <h1 className="h1-hero text-white mb-8">
              Stop Chasing Invoices. <br />
              <span className="gradient-text-enhanced">Get Paid 2× Faster.</span>
            </h1>

            <p className="text-xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: "#AEB6C4" }}>
              Lance is your trusted AI-powered collections agent: polite to your clients, relentless for you. Transform overdue
              invoices into consistent cash flow.
            </p>

            {/* Trust Signal */}
            <div className="flex items-center justify-center gap-2 mb-10 opacity-80 trust-signal">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
              </div>
              <span className="text-sm text-gray-400">We are just getting started, join our small group of 100+ freelancers getting paid 2x faster.</span>
            </div>

            {/* Enhanced Stats with Visual Hierarchy */}
            <HeroStats />

            {/* CTA Buttons */}
            <WaitlistForm variant="hero" />

            {/* Social Proof Testimonial */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto social-proof">
              <p className="text-sm text-blue-300 italic mb-1">
                "Lance recovered $1.2K in week one—that's a game changer!"
              </p>
              <p className="text-xs text-gray-400">— Sarah Chen, Freelance Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator Section */}
      <div className="scroll-indicator-container">
        <div className="scroll-indicator" aria-hidden="true"></div>
      </div>

      {/* Section Break - After Hero */}
      <div className="relative py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
            <div className="w-3 h-3 rounded-full bg-blue-600/30"></div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Pain Section */}
      <section className="relative py-24">
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

        <div className="absolute inset-0 bg-[#0B0F19]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="mx-auto max-w-6xl text-center py-12">
            <h2 className="h2-section mb-6">The Pain Every Freelancer Knows</h2>
            <p className="text-xl mb-16 max-w-3xl mx-auto" style={{ color: "#AEB6C4" }}>
              Freelancing is freedom until late payments chain you down and steal your focus from what you love doing.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="depth-card-dark rounded-3xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="h3-card mb-4 text-white">Endless Follow-ups</h3>
                <p style={{ color: "#AEB6C4" }} className="leading-relaxed">
                  Sending "just following up" emails that make you feel desperate and damage client relationships.
                </p>
              </div>

              <div className="depth-card-dark rounded-3xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="h3-card mb-4 text-white">Waiting Game</h3>
                <p style={{ color: "#AEB6C4" }} className="leading-relaxed">
                  Waiting weeks or months to get paid while your bills pile up and stress levels skyrocket.
                </p>
              </div>

              <div className="depth-card-dark rounded-3xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="h3-card mb-4 text-white">Lost Revenue</h3>
                <p style={{ color: "#AEB6C4" }} className="leading-relaxed">
                  Wondering if you'll ever see your money, leading to cash flow problems and sleepless nights.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pain Section Bottom CTA */}
        <div className="container mx-auto px-4 md:px-6 relative mt-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="p-6 bg-red-600/10 rounded-2xl border border-red-500/20">
              <p className="text-red-300 text-lg font-semibold mb-2">
                Freelancers lose $9-12K per year to unpaid invoices
              </p>
              <p className="text-red-400 text-sm">
                Don't let your hard work go unpaid. Let Lance help you recover what's yours.
              </p>
            </div>
          </div>
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

      {/* How Lance Works Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F19]/80 to-[#0B0F19]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-5xl font-bold text-white mb-4">How Lance Works</h1>
            <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
              Recover overdue invoices automatically, in just 3 simple steps.
            </p>

            {/* Trust Signals */}
            {/* <div className="flex items-center justify-center gap-8 mb-16 opacity-60">
              <div className="text-gray-400 text-sm">Trusted by 500+ freelancers</div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="text-gray-400 text-sm">94% recovery rate</div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="text-gray-400 text-sm">$2.3M recovered</div>
            </div> */}

            {/* Timeline Container */}
            <div className="relative min-h-[600px]">
              {/* Vertical Timeline Line */}
              <div className="spine-line"></div>

              {/* Step 1: Auto-Detect Section */}
              <div className="relative mb-32">
                {/* Timeline Circle */}
                <div className="timeline-icon timeline-icon-detect">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="text-left lg:pr-16">
                    <div className="flex items-center gap-4 mb-8 lg:hidden">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-glow">
                        <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h2 className="text-4xl font-bold text-white">Instantly Find Overdue Invoices</h2>
                    </div>
                    <div className="lg:mt-16">
                      <h2 className="text-4xl font-bold text-white mb-8 lg:block hidden">Instantly Find Overdue Invoices</h2>
                      <div className="space-y-4 text-lg text-gray-400">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                          <span>One-click Google Workspace connection</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                          <span>Private, secure inbox scanning</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                          <span>Auto-detect late payments in seconds</span>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-blue-600/10 rounded-lg border border-blue-500/20">
                        <p className="text-blue-300 text-sm italic">"Lance found 8 overdue invoices I had completely forgotten about!"</p>
                        <p className="text-blue-400 text-xs mt-1">— Sarah Chen, Freelance Designer</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    {/* Window Controls */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      {/* Search Bar */}
                      <div className="flex-1 bg-[#2A2D37] rounded-md px-3 py-1.5 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-gray-400 text-sm">inbox</span>
                      </div>
                    </div>

                    {/* Gmail Interface */}
                    <div className="flex">
                      {/* Sidebar */}
                      <div className="w-48 pr-4">
                        {/* Gmail Logo */}
                        <div className="flex items-center gap-3 px-2 py-3 mb-2">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-300" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                          </svg>
                          <span className="text-gray-300 font-medium">Gmail</span>
                        </div>

                        {/* Sidebar Items */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-300">
                            <span>Inbox</span>
                            <span className="bg-[#2A2D37] text-xs px-2 py-0.5 rounded">235</span>
                          </div>
                          <div className="flex items-center px-3 py-2 text-sm text-gray-400">
                            <span>Starred</span>
                          </div>
                          <div className="flex items-center px-3 py-2 text-sm text-gray-400">
                            <span>Snoozed</span>
                          </div>
                          <div className="flex items-center px-3 py-2 text-sm text-gray-400">
                            <span>Sent</span>
                          </div>
                          <div className="flex items-center px-3 py-2 text-sm text-gray-400">
                            <span>Drafts</span>
                          </div>
                        </div>
                      </div>

                      {/* Email List */}
                      <div className="flex-1 border-l border-gray-700">
                        {/* Inbox Header */}
                        <div className="px-4 py-2 border-b border-gray-700">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-300">Inobox</span>
                          </div>
                        </div>

                        {/* Email Items */}
                        <div className="divide-y divide-gray-700">
                          {/* Selected Email */}
                          <div className="px-4 py-3 bg-blue-600/20">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <input type="checkbox" className="rounded border-gray-600 bg-transparent" />
                                <span className="text-blue-400 text-sm font-medium">Invoice #123 is overdue</span>
                              </div>
                              <span className="text-blue-400 text-xs">10:23 AM</span>
                            </div>
                            <div className="mt-1 ml-8">
                              <span className="text-blue-400 text-xs">Acme Corp</span>
                            </div>
                          </div>

                          {/* Regular Email */}
                          <div className="px-4 py-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <input type="checkbox" className="rounded border-gray-600 bg-transparent" />
                                <span className="text-gray-300 text-sm">Weekly Report</span>
                              </div>
                              <span className="text-gray-400 text-xs">8:47 AM</span>
                            </div>
                            <div className="mt-1 ml-8">
                              <span className="text-gray-400 text-xs">Alice Srown</span>
                            </div>
                          </div>

                          {/* Another Email */}
                          <div className="px-4 py-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <input type="checkbox" className="rounded border-gray-600 bg-transparent" />
                                <span className="text-gray-300 text-sm">Project Update</span>
                              </div>
                              <span className="text-gray-400 text-xs">Yesterday</span>
                            </div>
                            <div className="mt-1 ml-8">
                              <span className="text-gray-400 text-xs">David Lad</span>
                            </div>
                          </div>

                          {/* One More Email */}
                          <div className="px-4 py-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <input type="checkbox" className="rounded border-gray-600 bg-transparent" />
                                <span className="text-gray-300 text-sm">Meeting Tomorrow</span>
                              </div>
                              <span className="text-gray-400 text-xs">Feb 16</span>
                            </div>
                            <div className="mt-1 ml-8">
                              <span className="text-gray-400 text-xs">Richard Clone</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Automated Follow-ups Section */}
              <div className="relative mb-32">
                {/* Timeline Circle */}
                <div className="timeline-icon timeline-icon-email">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="text-left lg:pr-16">
                    <div className="flex items-center gap-4 mb-8 lg:hidden">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xl font-bold shadow-glow">
                        <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h2 className="text-4xl font-bold text-white">Smart Follow-ups That Get Results</h2>
                    </div>
                    <div className="lg:mt-16">
                      <h2 className="text-4xl font-bold text-white mb-8 lg:block hidden">Smart Follow-ups That Get Results</h2>
                      <div className="space-y-4 text-lg text-gray-400">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                          <span>AI-crafted professional reminders</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                          <span>Persistent enough to recover payments</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                          <span>Polite enough to maintain relationships</span>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-green-600/10 rounded-lg border border-green-500/20">
                        <p className="text-green-300 text-sm italic">"Lance recovered $12K in unpaid invoices within 2 weeks—that's a 40% lift!"</p>
                        <p className="text-green-400 text-xs mt-1">— Alex Rodriguez, Freelance Developer</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    {/* Window Controls */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      {/* Search Bar */}
                      <div className="flex-1 bg-[#2A2D37] rounded-md px-3 py-1.5 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-gray-400 text-sm">compose</span>
                      </div>
                    </div>

                    {/* Email Interface */}
                    <div className="flex">
                      {/* Sidebar */}
                      <div className="w-48 pr-4">
                        {/* Gmail Logo */}
                        <div className="flex items-center gap-3 px-2 py-3 mb-2">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-300" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                          </svg>
                          <span className="text-gray-300 font-medium">Gmail</span>
                        </div>

                        {/* Sidebar Items */}
                        <div className="space-y-1">
                          <div className="flex items-center px-3 py-2 text-sm text-gray-400">
                            <span>Inbox</span>
                          </div>
                          <div className="flex items-center px-3 py-2 text-sm text-gray-400">
                            <span>Drafts</span>
                          </div>
                          <div className="flex items-center px-3 py-2 bg-green-600/20 rounded-lg text-green-400 text-sm">
                            <span>Compose</span>
                          </div>
                          <div className="flex items-center px-3 py-2 text-sm text-gray-400">
                            <span>Sent</span>
                          </div>
                        </div>
                      </div>

                      {/* Email Compose Area */}
                      <div className="flex-1 border-l border-gray-700">
                        <div className="px-4 py-3 border-b border-gray-700">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm w-12">To:</span>
                            <span className="text-gray-300 text-sm">sarah@acmecorp.com</span>
                          </div>
                        </div>

                        <div className="px-4 py-3 border-b border-gray-700">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm w-12">Subject:</span>
                            <span className="text-gray-300 text-sm">Following up on Invoice #123</span>
                          </div>
                        </div>

                        <div className="p-4 space-y-3 text-sm text-left">
                          <p className="text-gray-300">Hi Sarah,</p>
                          
                          <p className="text-gray-300">I hope this email finds you well. I'm following up on invoice #123 for $2,500, which was due on February 15th.</p>
                          
                          <div className="bg-green-600/20 rounded-lg p-3 my-3">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                              <span className="text-green-400 text-xs font-medium">Payment Summary</span>
                            </div>
                            <div className="space-y-1 ml-3 text-green-300 text-xs">
                              <p>Amount Due: $2,500</p>
                              <p>Due Date: February 15, 2024</p>
                              <p>Days Overdue: 5</p>
                            </div>
                          </div>

                          <p className="text-gray-300">Could you please provide an update on when we can expect payment?</p>
                          
                          <p className="text-gray-300">Best regards,<br />Alex</p>
                        </div>

                        {/* Email Actions */}
                        <div className="px-4 flex items-center gap-2 pt-3 border-t border-gray-700">
                          <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">
                            Send
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-gray-300">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Get Paid Section */}
              <div className="relative mb-32">
                {/* Timeline Circle */}
                <div className="timeline-icon timeline-icon-paid">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="text-left lg:pr-16">
                    <div className="flex items-center gap-4 mb-8 lg:hidden">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-glow">
                        <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <h2 className="text-4xl font-bold text-white">Watch Payments Roll In</h2>
                    </div>
                    <div className="lg:mt-16">
                      <h2 className="text-4xl font-bold text-white mb-8 lg:block hidden">Watch Payments Roll In</h2>
                      <div className="space-y-4 text-lg text-gray-400">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                          <span>AI-powered recovery system</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                          <span>Boost cash flow automatically</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                          <span>No more manual payment chasing</span>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-purple-600/10 rounded-lg border border-purple-500/20">
                        <p className="text-purple-300 text-sm italic">"I've recovered 23% more on-time payments since using Lance!"</p>
                        <p className="text-purple-400 text-xs mt-1">— Maria Santos, Freelance Consultant</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative transform scale-105">
                    {/* Window Controls */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      {/* Title Bar */}
                      <div className="flex-1 bg-[#2A2D37] rounded-md px-3 py-1.5 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-400 text-sm">Payment Analytics</span>
                      </div>
                    </div>

                    <div className="flex">
                      {/* Sidebar */}
                      <div className="w-48 pr-4">
                        <div className="space-y-1">
                          <div className="flex items-center px-3 py-2 bg-purple-600/20 rounded-lg text-purple-400 text-sm">
                            <span>Overview</span>
                          </div>
                          <div className="flex items-center px-3 py-2 text-sm text-gray-400">
                            <span>Invoices</span>
                          </div>
                          <div className="flex items-center px-3 py-2 text-sm text-gray-400">
                            <span>Reports</span>
                          </div>
                          <div className="flex items-center px-3 py-2 text-sm text-gray-400">
                            <span>Settings</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 border-l border-gray-700">
                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-2 p-3">
                          <div className="bg-[#2A2D37] rounded-lg p-2 border border-green-500/30 animate-pulse">
                            <div className="text-[10px] text-gray-400">Recovery Rate</div>
                            <div className="text-sm font-bold text-green-400">94%</div>
                            <div className="text-[10px] text-green-400">↑ 12%</div>
                          </div>
                          <div className="bg-[#2A2D37] rounded-lg p-2">
                            <div className="text-[10px] text-gray-400">Payment Time</div>
                            <div className="text-sm font-bold text-blue-400">4.2d</div>
                            <div className="text-[10px] text-blue-400">↓ 3d</div>
                          </div>
                          <div className="bg-[#2A2D37] rounded-lg p-2">
                            <div className="text-[10px] text-gray-400">Recovered</div>
                            <div className="text-sm font-bold text-purple-400">$12.4k</div>
                            <div className="text-[10px] text-purple-400">30d</div>
                          </div>
                        </div>

                        {/* Recent Payments */}
                        <div className="px-3 py-2">
                          <div className="text-xs font-medium text-gray-300 mb-2">Recent Payments</div>
                          <div className="space-y-1.5">
                            <div className="bg-green-500/10 rounded-lg p-2 border border-green-500/20">
                              <div className="flex justify-between items-center">
                                <span className="text-green-400 text-xs font-medium">Invoice #123</span>
                                <span className="text-green-400 text-xs">$2,500</span>
                              </div>
                              <div className="text-[10px] text-gray-400">Acme Corp • 2h ago</div>
                            </div>
                            <div className="bg-[#2A2D37] rounded-lg p-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-xs">Invoice #122</span>
                                <span className="text-gray-300 text-xs">$1,800</span>
                              </div>
                              <div className="text-[10px] text-gray-400">TechStart • Yesterday</div>
                            </div>
                            <div className="bg-[#2A2D37] rounded-lg p-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-xs">Invoice #121</span>
                                <span className="text-gray-300 text-xs">$3,200</span>
                              </div>
                              <div className="text-[10px] text-gray-400">DevCo • 3d ago</div>
                            </div>
                          </div>
                        </div>

                        {/* Follow-up Performance */}
                        <div className="px-3 py-2 border-t border-gray-700">
                          <div className="text-xs font-medium text-gray-300 mb-2">Follow-up Success</div>
                          <div className="bg-[#2A2D37] rounded-lg p-2">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="h-1.5 rounded-full bg-purple-600 w-3/4"></div>
                              <span className="text-[10px] text-gray-400">75%</span>
                            </div>
                            <div className="text-[10px] text-gray-400">3/4 follow-ups successful</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          {/* <div className="text-center mt-20">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Stop Chasing Invoices?</h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join 500+ freelancers who've recovered over $2.3M in overdue payments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started Free
              </button>
              <button className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                See Quick Demo
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required • Setup in 2 minutes</p>
          </div> */}
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

      {/* Who It's For */}
      <section className="py-32 bg-primary-dark relative">
        {/* AI Chip Pattern */}
        <div className="absolute top-4 right-4 ai-chip-pattern opacity-20 w-32 h-32 rounded-lg"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="h2-section mb-4">Built Exclusively for High-Earning Freelancers</h2>
            <p className="text-xl text-blue-400 font-semibold mb-16">Designed for Freelancers Ready to Level Up to Bigger Projects</p>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="depth-card-dark rounded-3xl p-10 transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl gradient-primary flex items-center justify-center shadow-xl">
                  <Palette className="h-10 w-10 text-white" />
                </div>
                <h3 className="h3-card mb-4 text-white">Creative Professionals</h3>
                <p className="text-lg" style={{ color: "#AEB6C4" }}>
                   Designers, Copywriters, and Marketers
                </p>
              </div>
              <div className="depth-card-dark rounded-3xl p-10 transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl gradient-primary flex items-center justify-center shadow-xl">
                  <Code className="h-10 w-10 text-white" />
                </div>
                <h3 className="h3-card mb-4 text-white">Technical Experts</h3>
                <p className="text-lg" style={{ color: "#AEB6C4" }}>
                   Developers, Web Designers and Consultants
                </p>
              </div>
              <div className="depth-card-dark rounded-3xl p-10 transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl gradient-primary flex items-center justify-center shadow-xl">
                  <Video className="h-10 w-10 text-white" />
                </div>
                <h3 className="h3-card mb-4 text-white">Media Creators</h3>
                <p className="text-lg" style={{ color: "#AEB6C4" }}>
                   Videographers, Photographers, and Event Pros
                </p>
              </div>
            </div>
          </div>
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

      {/* FAQ Section */}
      <section className="py-32 bg-primary-dark relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="h2-section mb-4">Frequently Asked Questions</h2>
            <p className="text-xl mb-16" style={{ color: "#AEB6C4" }}>
              Everything you need to know about Lance and how it works.
            </p>

            <Accordion type="single" collapsible className="text-left">
              <AccordionItem value="item-1" className="border-b border-blue-500/20">
                <AccordionTrigger className="text-white hover:text-blue-400 text-lg py-6">
                  How does Lance protect my data?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6 text-lg">
                  Lance uses bank-level encryption and secure servers to protect your data. We never share your information with third parties, and all transactions are GDPR and CCPA compliant to ensure your privacy.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-blue-500/20">
                <AccordionTrigger className="text-white hover:text-blue-400 text-lg py-6">
                  How much time can Lance save me?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6 text-lg">
                  Lance can save you 5–10 hours per week by automating follow-ups and payment reminders. This lets you focus on client work instead of chasing overdue invoices.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-blue-500/20">
                <AccordionTrigger className="text-white hover:text-blue-400 text-lg py-6">
                  Can I customize Lance's follow-up strategy?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6 text-lg">
                  Yes! You can customize the timing, tone, and frequency of follow-ups. Lance learns from your preferences and client interactions to keep things professional and aligned with your style.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-blue-500/20">
                <AccordionTrigger className="text-white hover:text-blue-400 text-lg py-6">
                  What payment methods does Lance support?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6 text-lg">
                  Lance supports credit cards, debit cards, PayPal, ACH transfers, and other popular payment methods. This makes it easier for clients to pay you quickly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-blue-500/20">
                <AccordionTrigger className="text-white hover:text-blue-400 text-lg py-6">
                  Is Lance suitable for freelancers and small businesses?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6 text-lg">
                  Absolutely. Lance is built for freelancers, consultants, and small businesses who want to automate follow-ups and get paid faster—without sounding pushy or losing client relationships.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#141828] relative">
        {/* Invoice Checkoff Background */}
        <div className="absolute inset-0">
          <Receipt className="invoice-checkoff w-24 h-24 top-20 left-20" style={{ animationDelay: "0s" }} />
          <Receipt className="invoice-checkoff w-20 h-20 top-40 right-32" style={{ animationDelay: "1s" }} />
          <Receipt className="invoice-checkoff w-28 h-28 bottom-32 left-1/4" style={{ animationDelay: "2s" }} />
          <Receipt className="invoice-checkoff w-16 h-16 bottom-20 right-20" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="h1-hero mb-8 text-white">
              Start Collecting Without the <span className="gradient-text">Awkward Conversations</span>
            </h1>

            <p className="text-xl mb-8" style={{ color: "#AEB6C4" }}>
              Join hundreds of pioneering freelancers who've transformed their payment process with Lance.
            </p>

            {/* CTA Input */}
            <WaitlistForm variant="cta" />
          </div>
        </div>
      </section>
    </div>
  )
}
