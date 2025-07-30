"use client"

import { WaitlistForm } from "./waitlist-form"

export function FinalCTASection() {
  return (
    <section className="py-32 bg-[#141828] relative">
      {/* Invoice Checkoff Background */}
      <div className="absolute inset-0">
        <svg className="invoice-checkoff w-24 h-24 top-20 left-20" style={{ animationDelay: "0s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <svg className="invoice-checkoff w-20 h-20 top-40 right-32" style={{ animationDelay: "1s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <svg className="invoice-checkoff w-28 h-28 bottom-32 left-1/4" style={{ animationDelay: "2s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <svg className="invoice-checkoff w-16 h-16 bottom-20 right-20" style={{ animationDelay: "0.5s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="h1-hero mb-8 text-white">
            Start Collecting Without the <span className="gradient-text">Awkward Conversations</span>
          </h1>

          <p className="text-xl mb-8" style={{ color: "#AEB6C4" }}>
            Join hundreds of pioneering freelancers who've transformed their payment process with Lance.
          </p>

          {/* Value Proposition */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-blue-500/20">
            <div className="flex items-center justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">$748</div>
                <div className="text-sm text-gray-400">Avg. recovered monthly</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">3 days</div>
                <div className="text-sm text-gray-400">Pays for itself</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">$29</div>
                <div className="text-sm text-gray-400">Founders price</div>
              </div>
            </div>
            <p className="text-center text-blue-400 text-sm font-medium">
              🔹 Limited to first 500 users • Locked for life • No credit card required
            </p>
          </div>

          {/* CTA Input */}
          <WaitlistForm variant="cta" />
        </div>
      </div>
    </section>
  )
} 