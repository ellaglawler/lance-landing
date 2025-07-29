"use client"

import { Button } from "@/components/ui/button"
import {
  Check,
  Star,
  Zap,
  Shield,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  MessageSquare,
  FileText,
  ArrowRight,
  Crown,
  Sparkles,
} from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"

export default function PricingPage() {
  return (
    <div className="flex flex-col pt-24">
      {/* Hero Section */}
      <section className="relative py-20 flex items-center justify-center min-h-[40vh]">
        {/* Wave Background */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-wave-bg.png')",
            zIndex: -1
          }}
        ></div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full micro-badge text-blue-300 text-sm font-medium mb-8">
              <DollarSign className="h-4 w-4" />
              <span>Simple Pricing</span>
            </div>

            <h1 className="h1-hero text-white mb-8">
              Pricing That <span className="gradient-text-enhanced">Grows With You</span>
            </h1>

            <p className="text-xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: "#AEB6C4" }}>
              Start free, scale as you grow. No hidden fees, no surprises. Just transparent pricing that makes sense for freelancers.
            </p>

            {/* Trust Signal */}
            <div className="flex items-center justify-center gap-2 mb-10 opacity-80">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
              </div>
              <span className="text-sm text-gray-400">Join 100+ freelancers getting paid 2x faster</span>
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

      {/* Pricing Tiers */}
      <section className="py-32 bg-primary-dark relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-7xl">


            {/* Pricing Cards */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Lance Core Plan */}
              <div className="depth-card-dark rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 flex flex-col">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 text-blue-300 text-sm font-medium mb-4">
                    <Zap className="h-4 w-4" />
                    <span>Lance Core</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-gray-400 line-through">$49</span>
                      <span className="text-4xl font-bold text-white">$29.99</span>
                      <span className="text-gray-400 ml-2">/month</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">
                      <span>Early Bird Discount</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">Perfect for growing freelancers</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Up to 25 overdue invoices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">AI-powered follow-ups</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Email & calendar integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Payment tracking & analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Client relationship insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Priority email support</span>
                  </div>
                </div>

                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 mt-auto">
                  Start Core Trial
                </Button>
              </div>

              {/* Lance Pro Plan */}
              <div className="depth-card-dark rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 flex flex-col">

                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 text-purple-300 text-sm font-medium mb-4">
                    <Sparkles className="h-4 w-4" />
                    <span>Lance Pro</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">$99</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                  <p className="text-gray-400 text-sm">For established freelancers</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Up to 100 overdue invoices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Advanced AI follow-ups</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Custom follow-up schedules</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Priority phone & email support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Advanced analytics & reporting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Client relationship insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Payment method integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Team collaboration features</span>
                  </div>
                </div>

                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 mt-auto">
                  Coming Soon
                </Button>
              </div>

              {/* Lance Studio Plan */}
              <div className="depth-card-dark rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 flex flex-col">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 text-orange-300 text-sm font-medium mb-4">
                    <Shield className="h-4 w-4" />
                    <span>Lance Studio</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">$199+</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                  <p className="text-gray-400 text-sm">Enterprise-level solutions</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Unlimited overdue invoices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Custom AI training</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">White-label options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">API access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Custom integrations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">SLA guarantees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Multi-user management</span>
                  </div>
                </div>

                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 mt-auto">
                  Coming Soon
                </Button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-32 text-center">
              <h2 className="h2-section mb-4">Frequently Asked Questions</h2>
              <p className="text-xl mb-16" style={{ color: "#AEB6C4" }}>
                Everything you need to know about Lance pricing.
              </p>

              <div className="grid gap-8 md:grid-cols-2 text-left max-w-4xl mx-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Can I change plans anytime?</h3>
                    <p className="text-gray-400">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Is there a setup fee?</h3>
                    <p className="text-gray-400">No setup fees. Start with our free plan and upgrade when you're ready to scale.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
                    <p className="text-gray-400">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Do you offer refunds?</h3>
                    <p className="text-gray-400">Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Can I cancel anytime?</h3>
                    <p className="text-gray-400">Absolutely. Cancel your subscription anytime with no penalties or hidden fees.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Do you offer team discounts?</h3>
                    <p className="text-gray-400">Yes! Contact us for custom pricing for teams of 5+ users.</p>
                  </div>
                </div>
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

      {/* Final CTA */}
      <section className="py-32 bg-[#141828] relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="h1-hero mb-8 text-white">
              Ready to <span className="gradient-text">Stop Chasing Invoices</span>?
            </h1>

            <p className="text-xl mb-8" style={{ color: "#AEB6C4" }}>
              Join hundreds of freelancers who've transformed their payment process with Lance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                Schedule Demo
              </Button>
            </div>

            <p className="text-sm text-gray-500">No credit card required • Setup in 2 minutes • 30-day money-back guarantee</p>
          </div>
        </div>
      </section>
    </div>
  )
} 