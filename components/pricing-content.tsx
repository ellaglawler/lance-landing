"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  CheckCircle,
  Shield,
  Star,
  Crown,
  Sparkles,
  Quote,
  Award,
  Timer,
  Calculator,
  Rocket,
  Lock,
} from "lucide-react"
import React, { useEffect, useState } from 'react';
import { WaitlistForm } from "@/components/waitlist-form"

// Countdown component
function BetaCountdown() {
  const endDate = new Date('2025-08-31T23:59:59Z');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mb-2">
      <div className="flex items-center gap-2 text-orange-400 font-bold text-sm bg-orange-900/30 px-3 py-1 rounded-full mt-4">
        <span>Beta ends in</span>
        <span className="tabular-nums">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
    </div>
  );
}

// Early access spots countdown component
function EarlyAccessCountdown() {
  const endDate = new Date('2025-09-01T00:00:00Z');
  const startDate = new Date('2025-08-01T00:00:00Z');
  const startSpots = 100;
  const [spotsLeft, setSpotsLeft] = useState(startSpots);

  useEffect(() => {
    function updateSpots() {
      const now = new Date();
      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsed = now.getTime() - startDate.getTime();
      
      if (elapsed >= totalDuration) {
        setSpotsLeft(0);
        return;
      }
      
      if (elapsed < 0) {
        setSpotsLeft(startSpots);
        return;
      }
      
      const progress = elapsed / totalDuration;
      const remainingSpots = Math.max(0, Math.floor(startSpots * (1 - progress)));
      setSpotsLeft(remainingSpots);
    }
    
    updateSpots();
    const interval = setInterval(updateSpots, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return spotsLeft;
}

export function PricingContent() {
  const [showBetaForm, setShowBetaForm] = useState(false);

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
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="mx-auto max-w-6xl text-center">
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
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                onClick={() => setShowBetaForm(true)}
              >
                Join Free Beta
              </Button>
              <p className="text-slate-400 text-sm">
                No credit card required
              </p>
            </div>
            
            <p className="text-slate-400 text-sm">
              Join 500+ freelancers who've recovered over $250K using Lance.
            </p>
          </div>
        </div>
      </section>

      {/* Early Adopter Offer */}
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
          <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 mr-3" />
              <h2 className="text-3xl font-bold">Founders Plan: $29/month for life</h2>
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
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold"
              onClick={() => setShowBetaForm(true)}
            >
              Claim Founders Plan
            </Button>
            <p className="text-orange-100 text-sm mt-4">
              *Includes all Core features. Upgrade anytime.
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

      {/* Pricing Tiers */}
      <section id="pricing-tiers" className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F19]/80 to-[#0B0F19]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
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
                <Card className="relative border-slate-700 bg-slate-800/50 flex flex-col h-full">
                  <BetaCountdown />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600/20 text-green-300 border border-green-500/30 px-2 py-1 text-xs">
                      Beta
                    </Badge>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Core</CardTitle>
                    <div className="text-3xl font-bold text-green-400">
                      Free during beta
                    </div>
                    <div className="text-lg text-slate-400">
                      (normally $49/month)
                    </div>
                    <CardDescription className="text-slate-400">
                      For early access freelancers ready to stop chasing and start collecting.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    {/* Lance Core features */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Invoice chasing, done for you</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Weekly reports on what's paid and what's at risk</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Smart AI-written follow-ups that sound like you</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Auto-scans your inbox, no setup required</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white mt-auto"
                      onClick={() => setShowBetaForm(true)}
                    >
                      Join Free Beta
                    </Button>
                    <p className="text-xs text-slate-400 text-center mt-2">
                      *Free access available until Beta end date. No credit card required.
                    </p>
                  </CardContent>
                </Card>

                {/* Lance Pro - Most Popular */}
                <Card className="relative border-slate-700 bg-slate-800/50 flex flex-col h-full">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-purple-600/20 text-purple-300 border border-purple-500/30 px-2 py-1 text-xs">
                      Coming Sept 1
                    </Badge>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Pro</CardTitle>
                    <div className="text-3xl font-bold text-white">
                      $99<span className="text-lg text-slate-400">/month</span>
                    </div>
                    <CardDescription className="text-slate-400">
                      For high-earning freelancers ready to automate their revenue.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    {/* Lance Pro features */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Everything in Beta</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Slack/WhatsApp notifications when action is needed</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Client risk scoring, know who's likely to ghost</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Analytics dashboard to track performance</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">AI-optimized follow-up strategy</span>
                      </div>
                      <div className="text-xs text-slate-400 ml-8 mb-2">
                        Smarter timing, tone, and escalation, tuned to maximize client response and on-time payments.
                      </div>
                    </div>
                    <Button className="w-full bg-slate-600 text-slate-400 cursor-not-allowed mt-auto" disabled>
                      Coming September 1
                    </Button>
                  </CardContent>
                </Card>

                {/* Lance Studio */}
                <Card className="relative border-slate-700 bg-slate-800/50 flex flex-col h-full">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-slate-600/20 text-slate-300 border border-slate-500/30 px-2 py-1 text-xs">
                      Coming Soon
                    </Badge>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Studio</CardTitle>
                    <div className="text-3xl font-bold text-white">
                      From $199<span className="text-lg text-slate-400">/month</span>
                    </div>
                    <CardDescription className="text-slate-400">
                      For agencies & studios scaling their client ops.
                    </CardDescription>
                    <p className="text-sm text-blue-400 font-medium mt-2">
                      Built for teams running serious freelance operations.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    {/* Lance Studio features */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Everything in Pro</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Shared inbox + client workflows</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Concierge onboarding & support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Studio insights, ROI by client, team, and service</span>
                      </div>
                    </div>
                    <Button className="w-full bg-slate-600 text-slate-400 cursor-not-allowed mt-auto" disabled>
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="yearly" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Lance Core Yearly */}
                <Card className="relative border-slate-700 bg-slate-800/50 flex flex-col h-full">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-600/20 text-blue-300 border border-blue-500/30 px-2 py-1 text-xs">
                      Coming Sept 1
                    </Badge>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Core</CardTitle>
                    <div className="text-3xl font-bold text-white">
                      $39<span className="text-lg text-slate-400">/month</span>
                    </div>
                    <CardDescription className="text-slate-400">
                      For early access freelancers ready to stop chasing and start collecting.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Invoice chasing, done for you</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Weekly reports on what's paid and what's at risk</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Smart AI-written follow-ups that sound like you</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Auto-scans your inbox, no setup required</span>
                      </div>
                    </div>
                    <Button className="w-full bg-slate-600 text-slate-400 cursor-not-allowed mt-auto" disabled>
                      Coming September 1
                    </Button>
                  </CardContent>
                </Card>

                {/* Lance Pro Yearly - Most Popular */}
                <Card className="relative border-slate-700 bg-slate-800/50 flex flex-col h-full">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-purple-600/20 text-purple-300 border border-purple-500/30 px-2 py-1 text-xs">
                      Coming Sept 1
                    </Badge>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Pro</CardTitle>
                    <div className="text-3xl font-bold text-white">
                      $79<span className="text-lg text-slate-400">/month</span>
                    </div>
                    <CardDescription className="text-slate-400">
                      For high-earning freelancers ready to automate their revenue.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    {/* Lance Pro features */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Everything in Beta</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Slack/WhatsApp notifications when action is needed</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Client risk scoring, know who's likely to ghost</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Analytics dashboard to track performance</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">AI-optimized follow-up strategy</span>
                      </div>
                      <div className="text-xs text-slate-400 ml-8 mb-2">
                        Smarter timing, tone, and escalation, tuned to maximize client response and on-time payments.
                      </div>
                    </div>
                    <Button className="w-full bg-slate-600 text-slate-400 cursor-not-allowed mt-auto" disabled>
                      Coming September 1
                    </Button>
                  </CardContent>
                </Card>

                {/* Lance Studio Yearly */}
                <Card className="relative border-slate-700 bg-slate-800/50 flex flex-col h-full">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-slate-600/20 text-slate-300 border border-slate-500/30 px-2 py-1 text-xs">
                      Coming Soon
                    </Badge>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Lance Studio</CardTitle>
                    <div className="text-3xl font-bold text-white">
                      From $159<span className="text-lg text-slate-400">/month</span>
                    </div>
                    <CardDescription className="text-slate-400">
                      For agencies & studios scaling their client ops.
                    </CardDescription>
                    <p className="text-sm text-blue-400 font-medium mt-2">
                      Built for teams running serious freelance operations.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    {/* Lance Studio features */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Everything in Pro</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Shared inbox + client workflows</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Concierge onboarding & support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-slate-300">Studio insights, ROI by client, team, and service</span>
                      </div>
                    </div>
                    <Button className="w-full bg-slate-600 text-slate-400 cursor-not-allowed mt-auto" disabled>
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
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

      {/* Value Justification - ROI Visual */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-[#0B0F19]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
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
                <span className="text-slate-300">Lance Cost (Post-Beta)</span>
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

      {/* Social Proof */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F19]/80 to-[#0B0F19]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
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
      <section className="relative py-24">
        <div className="absolute inset-0 bg-[#0B0F19]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
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
                <span className="flex items-center">
                  <Badge className="bg-orange-600 text-white mr-3 text-xs">Beta</Badge>
                  Why Beta? What's in it for me?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">What you get:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Full access to all Lance features, completely free during beta</li>
                      <li>Priority support and direct feedback to our team</li>
                      <li>Early access to new features before public release</li>
                      <li>Lock-in opportunity for our Founders Plan ($29/month for life)</li>
                      <li>No credit card required, start recovering payments immediately</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">What we're looking for:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Real feedback to make Lance better for all freelancers</li>
                      <li>Success stories and testimonials (with your permission)</li>
                      <li>Usage data to understand how to optimize the product</li>
                      <li>Early adopters who believe in our mission</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Our roadmap:</h4>
                    <p className="text-sm">We're building the future of freelancer payment recovery. Beta users help us shape features like AI-powered client risk assessment, advanced automation workflows, and seamless integrations with your existing tools.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Post-Beta transition:</h4>
                    <p className="text-sm">When beta ends, you'll have the option to continue with Lance at $49/month, or upgrade to our Founders Plan for $29/month for life. We'll notify you well in advance of any changes.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                How is this different from invoicing tools?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Invoicing tools send invoices. Lance <strong>chases</strong> them for you, automatically, politely, and relentlessly. We don't just send reminders; we analyze payment patterns, personalize follow-ups, and escalate strategically to get you paid.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                Do I need to change my workflow?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Nope. Lance integrates with your email, calendar, and invoicing tools. It works in the background, learning your communication style and handling follow-ups automatically. You can focus on your work while Lance handles the collections.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                What if Lance doesn't help me recover anything?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                If you don't get <strong>at least 5x ROI in your first month</strong>, we'll refund you. No questions asked. We're confident Lance will pay for itself many times over, or you don't pay.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                Can I cancel anytime?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Yes, no contracts, no hassle. You can cancel your subscription at any time from your dashboard. We believe you should only pay for Lance if it's delivering real value to your business.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                How does the free trial work?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Start your 14-day free trial with full access to all features. No credit card required. If you're not completely satisfied, simply cancel before the trial ends. No charges, no commitment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-slate-700">
              <AccordionTrigger className="text-left text-white hover:text-blue-400">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. All payments are processed securely through Stripe, and you can update your payment method anytime from your account settings.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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

      {/* Final CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F19]/80 to-[#0B0F19]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Start collecting what you're owed.
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Lance gets you paid faster, with zero awkward emails, and zero effort.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
              onClick={() => setShowBetaForm(true)}
            >
              Join Free Beta
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-orange-500 text-orange-400 hover:bg-orange-500/10 px-8 py-4 text-lg"
              onClick={() => setShowBetaForm(true)}
            >
              <Crown className="w-5 h-5 mr-2" />
              Claim Founders Plan
            </Button>
          </div>
          
          <p className="text-slate-400 text-sm mt-6">
            Join 500+ freelancers who've recovered over $250K using Lance.
          </p>
          </div>
        </div>
      </section>

      {/* Beta Signup Modal */}
      {showBetaForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4">
          {/* Blurred background success screenshot for credibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm"></div>
          
          <div className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full border border-slate-700 relative z-10 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Stop chasing payments. Start collecting, for free.
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Join the Lance Beta to unlock your personal AI collections agent.
                <br />
                Recover what you're owed, no awkward follow-ups, no setup, no cost.
              </p>
            </div>

            {/* Scarcity trigger */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 px-4 py-2 rounded-full">
                <span className="text-orange-400 font-semibold text-sm">🔥</span>
                <span className="text-orange-300 text-sm font-medium">
                  Only <EarlyAccessCountdown /> early access spots left. Secure yours now.
                </span>
              </div>
            </div>
            
            <WaitlistForm 
              variant="pricing" 
              plan="starter"
              showDemoButton={false}
              className="mb-6"
            />
            
            {/* Trust indicators */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>No credit card required.</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                <Shield className="w-3 h-3" />
                <span>We'll never spam you</span>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <button
                onClick={() => setShowBetaForm(false)}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 