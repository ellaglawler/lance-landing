"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Crown } from "lucide-react"

export function PricingPreviewSection() {
  return (
    <section className="py-32 bg-primary-dark relative">
      {/* AI Chip Pattern */}
      <div className="absolute top-4 right-4 ai-chip-pattern opacity-20 w-32 h-32 rounded-lg"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="h2-section mb-4">Recover $500–$1,000/month — for less than the price of a coffee a day</h2>
          <p className="text-xl text-blue-400 font-semibold mb-8">Lance users typically earn back their cost in <span className="text-green-400 font-bold">3 days</span> — with 20× ROI</p>
          
          {/* Pricing Preview Card */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="depth-card-dark rounded-3xl p-8 border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-purple-600/10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white">Founders Deal: $29/month</h3>
                  <p className="text-orange-400 text-sm font-medium">Limited to first 500 users • Locked for life</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">$748</div>
                  <div className="text-sm text-gray-400">Avg. recovered monthly</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">3 days</div>
                  <div className="text-sm text-gray-400">Pays for itself</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">AI-powered invoice chasing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Professional follow-up sequences</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Payment analytics & insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Client relationship protection</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = '/pricing'}
              >
                🔹 View Plans →
              </Button>
              
              <p className="text-xs text-gray-400 mt-4">
                <span className="text-orange-400 font-semibold">322 spots remaining</span> • No credit card required
              </p>
            </div>
          </div>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            "Lance recovered $1.2K in week one, that's a game changer!" — <span className="text-blue-400 font-medium">Sarah Chen, Freelance Designer</span>
          </p>
        </div>
      </div>
    </section>
  )
} 