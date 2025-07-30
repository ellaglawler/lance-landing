"use client"

import { Button } from "@/components/ui/button"

export function PainSectionCTA() {
  return (
    <div className="container mx-auto px-4 md:px-6 relative mt-16">
      <div className="mx-auto max-w-4xl text-center">
        <div className="p-6 bg-red-600/10 rounded-2xl border border-red-500/20">
          <p className="text-red-300 text-lg font-semibold mb-2">
            Freelancers lose $9-12K per year to unpaid invoices
          </p>
          <p className="text-red-400 text-sm mb-4">
            Don't let your hard work go unpaid. Let Lance help you recover what's yours.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => window.location.href = '/pricing'}
            >
              🔹 See Plans
            </Button>
            <p className="text-orange-400 text-sm font-medium">Starting at $29/month during beta</p>
          </div>
        </div>
      </div>
    </div>
  )
} 