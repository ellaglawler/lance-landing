import Image from "next/image"

export function AboutTeam() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Meet the Founders</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="depth-card-dark rounded-3xl p-6 text-center transform hover:scale-105 transition-all duration-300">
          <div className="relative w-36 h-36 mx-auto mb-3">
            <Image
              src="/images/charles.png"
              alt="Charles Casillas"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-semibold text-white">Charles Casillas</h3>
          <p className="text-xl text-blue-400 font-medium mb-1">Cofounder</p>
          <p className="text-xl italic mb-4" style={{ color: "#AEB6C4" }}>Product Builder. Technologist. Visionary.</p>
          <p className="text-xl" style={{ color: "#AEB6C4" }}>
            From launching AI-driven apps to leading engineering and product at Apple Music, Beats, Pandora, and beyond, Charles turns complex technology into seamless, human-centered experiences.
          </p>
        </div>
        <div className="depth-card-dark rounded-3xl p-6 text-center transform hover:scale-105 transition-all duration-300">
          <div className="relative w-36 h-36 mx-auto mb-3">
            <Image
              src="/images/ella.png"
              alt="Ella Lawler"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-semibold text-white">Ella Lawler</h3>
          <p className="text-xl text-blue-400 font-medium mb-1">Cofounder</p>
          <p className="text-xl italic mb-4" style={{ color: "#AEB6C4" }}>Creative Strategist. Marketer. Designer.</p>
          <p className="text-xl" style={{ color: "#AEB6C4" }}>
            From years of freelancing in design and marketing to building user-focused products, Ella blends creativity with practical execution to help products connect with audiences and grow.
          </p>
        </div>
      </div>
    </div>
  )
} 