import { Cpu, ChevronLeft } from "lucide-react"
import Link from "next/link"

export function AboutHero() {
  return (
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
            <span>About Us</span>
          </div>

          <h1 className="h1-hero text-white mb-8">
            Making Freelancing <span className="gradient-text-enhanced">Work Better</span>
          </h1>

          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: "#AEB6C4" }}>
            The teammate who works as hard as you do, without burning out. You've earned the right to focus on your craft. We'll handle the rest, 24/7.
          </p>
        </div>
      </div>
    </section>
  )
} 