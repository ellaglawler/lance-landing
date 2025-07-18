import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  ArrowLeft,
  Cpu,
  Clock,
  MessageSquare,
  Calendar,
  Play,
  ChevronLeft,
} from "lucide-react"
import { Header } from "@/components/header"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-24">
      <Header />
      
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
            {/* Back to Home Link */}
            <div className="flex justify-center mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>

            {/* Beta Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full micro-badge text-blue-300 text-sm font-medium mb-8">
              <Cpu className="h-4 w-4" />
              <span>Get in Touch</span>
            </div>

            <h1 className="h1-hero text-white mb-8">
              Let's Build Something <span className="gradient-text-enhanced">Brilliant</span>
            </h1>

            <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: "#AEB6C4" }}>
              Whether you're scaling growth, solving payment challenges, or just exploring what AI-driven collections can do—Lance is ready to connect.
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
                  Prefer direct contact? Drop us a line, we usually respond within 1-2 business days.
                </p>
                <div className="text-center">
                  <a 
                    href="mailto:team@lance.ai" 
                    className="text-blue-400 hover:text-blue-300 text-lg font-medium transition-colors"
                  >
                    team@lance.ai
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
                  Ready to scale? Our growth specialists can walk you through a personalized demo or help you get started fast.
                </p>
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>

            {/* Demo Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-400 mb-4">Prefer to See It In Action?</h2>
              <p className="text-xl mb-8" style={{ color: "#AEB6C4" }}>
                We built Lance to make collections effortless, and we'd love to show you how.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-primary-dark relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="h2-section mb-4">Common Questions</h2>
            <p className="text-xl mb-16" style={{ color: "#AEB6C4" }}>
              Quick answers to help you get started with Lance.
            </p>

            <div className="grid gap-6 md:grid-cols-2 text-left">
              <div className="depth-card-dark rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">How quickly can I get started?</h3>
                </div>
                <p style={{ color: "#AEB6C4" }}>
                  Lance connects to your Google Workspace in under 2 minutes. Start recovering payments within the first hour.
                </p>
              </div>

              <div className="depth-card-dark rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Can I customize the follow-up messages?</h3>
                </div>
                <p style={{ color: "#AEB6C4" }}>
                  Absolutely. Lance learns your communication style and lets you customize timing, tone, and frequency.
                </p>
              </div>

              <div className="depth-card-dark rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <Cpu className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">How does the AI work?</h3>
                </div>
                <p style={{ color: "#AEB6C4" }}>
                  Lance scans your inbox for overdue invoices and sends personalized, professional follow-ups that maintain client relationships.
                </p>
              </div>

              <div className="depth-card-dark rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">What if I need help?</h3>
                </div>
                <p style={{ color: "#AEB6C4" }}>
                  Our support team is available via email and phone. We typically respond within 1-2 business days.
                </p>
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
              Ready to Transform Your <span className="gradient-text">Payment Process?</span>
            </h2>
            <p className="text-xl mb-8" style={{ color: "#AEB6C4" }}>
              Join thousands of freelancers who've automated their collections with Lance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Get Started Today
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 