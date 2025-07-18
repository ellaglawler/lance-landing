import { Header } from "@/components/header"
import { AboutHero } from "./components/AboutHero"
import { AboutProblem } from "./components/AboutProblem"
import { AboutWhy } from "./components/AboutWhy"
import { AboutFeatures } from "./components/AboutFeatures"
import { AboutTeam } from "./components/AboutTeam"
import { AboutCTA } from "./components/AboutCTA"

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-24 dark">
      <Header />
      
      {/* Hero Section */}
      <AboutHero />

      {/* Problem Section */}
      <section className="relative py-24 bg-[#0B0F19]">
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
        <div className="container mx-auto px-4 md:px-6 relative">
          <AboutProblem />
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

      {/* Why Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#0B0F19] to-[#0B0F19]/95">
        <div className="container mx-auto px-4 md:px-6 relative">
          <AboutWhy />
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

      {/* Features Section */}
      <section className="relative py-24 bg-[#0B0F19]">
        <div className="container mx-auto px-4 md:px-6 relative">
          <AboutFeatures />
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

      {/* Team Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#0B0F19] to-[#0B0F19]/95">
        <div className="container mx-auto px-4 md:px-6 relative">
          <AboutTeam />
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

      {/* CTA Section */}
      <section className="relative py-24 bg-[#0B0F19]">
        <div className="container mx-auto px-4 md:px-6 relative">
          <AboutCTA />
        </div>
      </section>
    </div>
  )
} 