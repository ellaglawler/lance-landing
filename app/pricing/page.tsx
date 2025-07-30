import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  CheckCircle,
  DollarSign,
  TrendingUp,
  Clock,
  Shield,
  Star,
  Zap,
  ArrowRight,
  Users,
  BarChart3,
  MessageSquare,
  FileText,
  Bot,
  Crown,
  Sparkles,
  AlertCircle,
  Target,
  Calendar,
  CreditCard,
  ArrowUpRight,
  Quote,
  Award,
  Timer,
  Calculator,
  Heart,
  Rocket,
  Lock,
  Check,
  X,
} from "lucide-react"
import type { Metadata } from 'next'

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Revenue Recovery Made Simple
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Stop chasing clients.
              <br />
              <span className="text-blue-400">Start collecting cash.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              <strong className="text-green-400">Lance recovers $500–$1,000/month</strong> in lost payments, automatically.
              <br />
              For less than the price of one missed invoice, get peace of mind, time back, and your income on autopilot.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              <Rocket className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <p className="text-slate-400 text-sm">
              No credit card required
            </p>
          </div>
          
          <p className="text-slate-400 text-sm">
            Join 500+ freelancers who've recovered over $250K using Lance.
          </p>
        </div>
      </section>

      {/* Early Adopter Offer */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600/20 to-red-600/20 border-y border-orange-500/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 mr-3" />
              <h2 className="text-3xl font-bold">🚀 Founders Plan: $29/month for life</h2>
            </div>
            <p className="text-xl mb-6">
              For our first 500 users only, lock in this rate forever.
            </p>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="flex items-center">
                <Timer className="w-5 h-5 mr-2" />
                <span className="font-semibold">322 spots remaining</span>
              </div>
              <div className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                <span className="font-semibold">No price increases. Ever.</span>
              </div>
            </div>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold">
              Claim Founders Plan
            </Button>
            <p className="text-orange-100 text-sm mt-4">
              *Includes all Core features. Upgrade anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Choose Your Revenue Recovery Plan
            </h2>
            <p className="text-xl text-slate-300">
              Every plan includes our core recovery engine. Scale up as you grow.
            </p>
          </div>

          <Tabs defaultValue="monthly" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Save 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Lance Core */}
                <Card className="relative border-slate-700 bg-slate-800/50">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Core</CardTitle>
                    <div className="text-3xl font-bold text-white">
                      $49<span className="text-lg text-slate-400">/month</span>
                    </div>
                    <CardDescription className="text-slate-400">
                      Solo freelancers
                    </CardDescription>
                    <p className="text-sm text-blue-400 font-medium mt-2">
                      Essential tools to get you paid, fast.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Smart follow-ups</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Weekly reports</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Proposal builder</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Email integration</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Basic templates</span>
                      </div>
                    </div>
                    <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>

                {/* Lance Pro - Most Popular */}
                <Card className="relative border-blue-500 bg-slate-800/50 scale-105">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Pro</CardTitle>
                    <div className="text-3xl font-bold text-white">
                      $99<span className="text-lg text-slate-400">/month</span>
                    </div>
                    <CardDescription className="text-slate-400">
                      High-earning freelancers
                    </CardDescription>
                    <p className="text-sm text-blue-400 font-medium mt-2">
                      Automate follow-ups and protect your cash flow.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Everything in Core</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Client risk scoring</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Slack/WhatsApp bot</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Advanced AI personalized templates</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Priority support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Analytics dashboard</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>

                {/* Lance Studio */}
                <Card className="relative border-slate-700 bg-slate-800/50">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Studio</CardTitle>
                    <div className="text-3xl font-bold text-white">
                      From $199<span className="text-lg text-slate-400">/month</span>
                    </div>
                    <CardDescription className="text-slate-400">
                      Agencies, small studios
                    </CardDescription>
                    <p className="text-sm text-blue-400 font-medium mt-2">
                      Built for teams that want to scale with confidence.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Everything in Pro</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Multi-user dashboard</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Shared inbox & workflows</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Dedicated support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Concierge onboarding</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Studio insights & ROI</span>
                      </div>
                    </div>
                    <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="yearly" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Lance Core Yearly */}
                <Card className="relative border-slate-700 bg-slate-800/50">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Core</CardTitle>
                    <div className="text-3xl font-bold text-white">
                      $39<span className="text-lg text-slate-400">/month</span>
                    </div>
                    <div className="text-sm text-slate-400">$468 billed annually</div>
                    <CardDescription className="text-slate-400">
                      Solo freelancers
                    </CardDescription>
                    <p className="text-sm text-blue-400 font-medium mt-2">
                      Essential tools to get you paid — fast.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Smart follow-ups</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Weekly reports</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Proposal builder</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Email integration</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Basic templates</span>
                      </div>
                    </div>
                    <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>

                {/* Lance Pro Yearly - Most Popular */}
                <Card className="relative border-blue-500 bg-slate-800/50 scale-105">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Pro</CardTitle>
                    <div className="text-3xl font-bold text-white">
                      $79<span className="text-lg text-slate-400">/month</span>
                    </div>
                    <div className="text-sm text-slate-400">$948 billed annually</div>
                    <CardDescription className="text-slate-400">
                      High-earning freelancers
                    </CardDescription>
                    <p className="text-sm text-blue-400 font-medium mt-2">
                      Automate follow-ups and protect your cash flow.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Everything in Core</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Client risk scoring</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Slack/WhatsApp bot</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Advanced AI personalized templates</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Priority support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Analytics dashboard</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>

                {/* Lance Studio Yearly */}
                <Card className="relative border-slate-700 bg-slate-800/50">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Studio</CardTitle>
                    <div className="text-3xl font-bold text-white">
                      From $159<span className="text-lg text-slate-400">/month</span>
                    </div>
                    <div className="text-sm text-slate-400">$1,908 billed annually</div>
                    <CardDescription className="text-slate-400">
                      Agencies, small studios
                    </CardDescription>
                    <p className="text-sm text-blue-400 font-medium mt-2">
                      Built for teams that want to scale with confidence.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Everything in Pro</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Multi-user dashboard</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Shared inbox & workflows</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Dedicated support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Concierge onboarding</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Studio insights & ROI</span>
                      </div>
                    </div>
                    <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Value Justification - ROI Visual */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Lance isn't a tool. It's revenue insurance.
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Freelancers lose up to <strong className="text-red-400">$12K/year</strong> to unpaid invoices. Lance helps you get it back.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">$748</div>
                <p className="text-slate-300">Average recovered per month</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">8+</div>
                <p className="text-slate-300">Hours saved monthly</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">3 days</div>
                <p className="text-slate-300">Lance pays for itself</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">You earn, Lance handles the chase.</h3>
                <p className="text-slate-300">Real users have reported 20x–30x ROI</p>
              </div>
              <Calculator className="w-12 h-12 text-blue-400" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <span className="text-slate-300">Lance Cost</span>
                <span className="text-red-400 font-semibold">$49/month</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-600/20 rounded-lg border border-green-500/30">
                <span className="text-slate-300">Average Recovery</span>
                <span className="text-green-400 font-semibold">$748/month</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-600/20 rounded-lg border border-blue-500/30">
                <span className="text-slate-300">Time Saved</span>
                <span className="text-blue-400 font-semibold">8+ hours/month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by 500+ freelancers
            </h2>
            <p className="text-xl text-slate-300">
              Real results from real people
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Quote className="w-8 h-8 text-blue-400 mt-1" />
                  <div>
                    <p className="text-slate-300 mb-4">
                      "Lance recovered $1,600 for me in my first month. I just let it run, no stress, no chasing."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold">J</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Jordan</p>
                        <p className="text-slate-400 text-sm">Freelance designer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Quote className="w-8 h-8 text-blue-400 mt-1" />
                  <div>
                    <p className="text-slate-300 mb-4">
                      "Feels like having a polite pitbull in my inbox. Clients pay faster, and respect me more."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold">D</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Devon</p>
                        <p className="text-slate-400 text-sm">Software consultant</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-slate-400 text-sm">Backed by real freelancers</div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
                  <Award className="w-4 h-4 text-slate-400" />
                </div>
                <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
                  <Shield className="w-4 h-4 text-slate-400" />
                </div>
                <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
                  <Star className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-300">
              Everything you need to know about Lance
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                How is this different from invoicing tools?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Invoicing tools send invoices. Lance <strong>chases</strong> them for you, automatically, politely, and relentlessly. We don't just send reminders; we analyze payment patterns, personalize follow-ups, and escalate strategically to get you paid.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                Do I need to change my workflow?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Nope. Lance integrates with your email, calendar, and invoicing tools. It works in the background, learning your communication style and handling follow-ups automatically. You can focus on your work while Lance handles the collections.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                What if Lance doesn't help me recover anything?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                If you don't get <strong>at least 5x ROI in your first month</strong>, we'll refund you. No questions asked. We're confident Lance will pay for itself many times over, or you don't pay.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                Can I cancel anytime?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Yes, no contracts, no hassle. You can cancel your subscription at any time from your dashboard. We believe you should only pay for Lance if it's delivering real value to your business.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                How does the free trial work?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Start your 14-day free trial with full access to all features. No credit card required. If you're not completely satisfied, simply cancel before the trial ends. No charges, no commitment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. All payments are processed securely through Stripe, and you can update your payment method anytime from your account settings.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Start collecting what you're owed.
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Lance gets you paid faster, with zero awkward emails, and zero effort.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              <Rocket className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10 px-8 py-4 text-lg">
              <Crown className="w-5 h-5 mr-2" />
              Claim Founders Plan
            </Button>
          </div>
          
          <p className="text-slate-400 text-sm mt-6">
            Join 500+ freelancers who've recovered over $250K using Lance.
          </p>
        </div>
      </section>
    </div>
  )
} 