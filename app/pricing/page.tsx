"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap, Shield, Headphones, BarChart3 } from 'lucide-react'
import { createCheckoutSession } from '@/lib/api'
import { redirectToCheckout, handleCheckoutError } from '@/lib/stripe'
import { useToast } from '@/hooks/use-toast'

export default function PricingPage() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      
      // Use the price ID from environment variable
      const priceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'price_1OqXxXxXxXxXxXxXxXxXxXx'
      
      const { id: sessionId } = await createCheckoutSession(priceId)
      await redirectToCheckout(sessionId)
    } catch (error) {
      console.error('Checkout error:', error)
      const errorMessage = handleCheckoutError(error)
      toast({
        title: "Checkout Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      name: "Unlimited Invoice Tracking",
      description: "Track as many invoices as you need",
      icon: BarChart3,
    },
    {
      name: "Automated Follow-ups",
      description: "AI-powered email sequences that adapt to client responses",
      icon: Zap,
    },
    {
      name: "Priority Support",
      description: "Get help when you need it with dedicated support",
      icon: Headphones,
    },
    {
      name: "Advanced Analytics",
      description: "Detailed insights into your payment recovery performance",
      icon: BarChart3,
    },
    {
      name: "Gmail Integration",
      description: "Seamless integration with your existing Gmail workflow",
      icon: Shield,
    },
    {
      name: "Custom Email Templates",
      description: "Create and save your own email templates",
      icon: Crown,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Choose the plan that works best for your business. Start free, upgrade when you're ready.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Free</CardTitle>
              <CardDescription className="text-slate-400">
                Perfect for getting started
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-slate-400">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-slate-300">Up to 5 invoices tracked</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-slate-300">Basic email templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-slate-300">Community support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-slate-300">Gmail integration</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                disabled
              >
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-slate-800 border-blue-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-600 text-white px-4 py-1">
                Most Popular
              </Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                <Crown className="h-6 w-6 text-yellow-400" />
                Pro
              </CardTitle>
              <CardDescription className="text-slate-400">
                For serious freelancers and agencies
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-slate-400">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-slate-300">Unlimited invoice tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-slate-300">AI-powered automated follow-ups</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-slate-300">Priority customer support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-slate-300">Advanced analytics & reporting</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-slate-300">Custom email templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-slate-300">Bulk email operations</span>
                </li>
              </ul>
              <Button 
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                size="lg"
              >
                {loading ? "Processing..." : "Start Pro Trial"}
              </Button>
              <p className="text-xs text-center text-slate-400">
                14-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Everything you need to get paid faster
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Lance handles the awkward conversations so you can focus on what you do best.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.name}
                </h3>
                <p className="text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Can I cancel anytime?
                </h3>
                <p className="text-slate-400">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-slate-400">
                  Yes! Pro plans come with a 14-day free trial. No credit card required to start.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-slate-400">
                  We accept all major credit cards, debit cards, and PayPal. All payments are processed securely through Stripe.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-slate-400">
                  We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 