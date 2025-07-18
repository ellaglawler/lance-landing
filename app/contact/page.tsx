import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  Cpu,
  ChevronLeft,
} from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"
import Link from "next/link"

export default function ContactPage() {
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
              <Cpu className="h-4 w-4" />
              <span>Get in Touch</span>
            </div>

            <h1 className="h1-hero text-white mb-8">
              Stop Chasing. <span className="gradient-text-enhanced">Start Collecting.</span>
            </h1>

            <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: "#AEB6C4" }}>
              Whether you're tired of awkward follow-up emails, losing sleep over late payments, or just want to focus on your craft instead of admin, Lance is your AI collections agent.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options Section */}
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
          <div className="mx-auto max-w-6xl">
            {/* Contact Cards */}
            <div className="grid gap-8 md:grid-cols-2 mb-16">
              {/* Email Us Card */}
              <div className="depth-card-dark rounded-3xl p-10 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="h3-card mb-4 text-white text-center">Email Us</h3>
                <p className="text-center mb-6" style={{ color: "#AEB6C4" }}>
                  Have questions about how Lance works? Drop us a line, we usually respond within 1-2 business days.
                </p>
                <div className="text-center">
                  <a 
                    href="mailto:team@lanceos.ai" 
                    className="text-blue-400 hover:text-blue-300 text-lg font-medium transition-colors"
                  >
                    team@lanceos.ai
                  </a>
                </div>
              </div>

              {/* Talk to Sales Card */}
              <div className="depth-card-dark rounded-3xl p-10 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="h3-card mb-4 text-white text-center">Talk to Sales</h3>
                <p className="text-center mb-6" style={{ color: "#AEB6C4" }}>
                  Ready to stop chasing clients? Our team can walk you through how Lance recovers your overdue invoices.
                </p>
                <div className="text-center">
                <a 
                    href="mailto:sales@lanceos.ai" 
                    className="text-blue-400 hover:text-blue-300 text-lg font-medium transition-colors"
                  >
                    sales@lanceos.ai
                  </a>
                </div>
              </div>
            </div>

            {/* Demo Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-400 mb-4">See Your AI Collections Agent in Action</h2>
              <p className="text-xl mb-8" style={{ color: "#AEB6C4" }}>
                Watch how Lance politely recovers your overdue invoices while protecting your client relationships.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WaitlistForm variant="demo" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 