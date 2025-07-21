import { ClipboardList, Zap, Laptop, Heart } from "lucide-react"

export function AboutFeatures() {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-white text-center mb-6">What Sets Us Apart</h2>
      <p className="text-center text-xl mb-8" style={{ color: "#AEB6C4" }}>
        Built <em>by freelancers, for freelancers</em>, Lance understands what you're going through — and actually helps.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="depth-card-dark rounded-3xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mb-3">
            <ClipboardList className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Workflow‑Focused</h3>
          <p className="text-xl" style={{ color: "#AEB6C4" }}>
            We don't just give you templates, we handle the work, the way you would.
          </p>
        </div>
        <div className="depth-card-dark rounded-3xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mb-3">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Works With Your Tools</h3>
          <p className="text-xl" style={{ color: "#AEB6C4" }}>
            Integrated directly into your email & calendar. No clunky dashboards to learn.
          </p>
        </div>
        <div className="depth-card-dark rounded-3xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mb-3">
            <Laptop className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Affordable & Intuitive</h3>
          <p className="text-xl" style={{ color: "#AEB6C4" }}>
            Made for solopreneurs, accessible, straightforward, and ready to use.
          </p>
        </div>
        <div className="depth-card-dark rounded-3xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mb-3">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Empathetic Design</h3>
          <p className="text-xl" style={{ color: "#AEB6C4" }}>
            We've been where you are. Every feature comes from lived experience.
          </p>
        </div>
      </div>
    </div>
  )
} 
