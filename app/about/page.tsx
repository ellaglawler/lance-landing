import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Shield, Target, Users, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-24">
      <Header />
      
      {/* Wave Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat wave-bg"
        style={{
          backgroundImage: "url('/hero-wave-bg.png')",
          zIndex: 0
        }}
      ></div>
      
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="wave-bg absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20">
            <div className="wave-animation" />
          </div>
        </div>
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Making Freelancing <span className="gradient-text">Work Better</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Lance is revolutionizing how freelancers handle payment collection, using AI to transform the way independent professionals get paid.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-gray-400">
                We believe freelancers should focus on what they do best - creating amazing work for their clients. 
                That's why we've built Lance to handle the challenging task of payment collection, using advanced AI 
                to maintain professional relationships while ensuring you get paid on time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg mb-6">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Vision</h3>
                <p className="text-gray-400">
                  A world where freelancers can focus on their craft without the stress of chasing payments, 
                  powered by intelligent automation.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg mb-6">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Trust</h3>
                <p className="text-gray-400">
                  Building reliable, secure solutions that protect both freelancers and their client relationships.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg mb-6">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Community</h3>
                <p className="text-gray-400">
                  Supporting and empowering the freelance community to achieve their full potential.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg mb-6">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Care</h3>
                <p className="text-gray-400">
                  Delivering solutions with empathy, understanding the unique challenges freelancers face.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Our Impact</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">2×</div>
                <div className="text-gray-400">Faster Payments</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">8+</div>
                <div className="text-gray-400">Hours Saved/Week</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">1K+</div>
                <div className="text-gray-400">Users Waitlist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Our Commitment</h2>
            
            <div className="space-y-8">
              <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold text-white mb-4">Professional Excellence</h3>
                <p className="text-gray-400">
                  We maintain the highest standards of professionalism in every interaction. Our AI is designed to 
                  represent your business with the same level of excellence you bring to your work.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold text-white mb-4">Client Relationships First</h3>
                <p className="text-gray-400">
                  Every feature and interaction is designed to strengthen, not strain, your client relationships. 
                  We believe in being persistent yet polite, professional yet personable.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold text-white mb-4">Continuous Innovation</h3>
                <p className="text-gray-400">
                  We're constantly evolving our AI technology to better serve the freelance community, staying 
                  ahead of industry changes and adapting to new challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Freelance Business?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of freelancers who've revolutionized their payment collection process with Lance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex w-full max-w-md gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 text-lg rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <Button size="lg" className="cta-button-primary text-white px-8 py-6 text-lg font-semibold rounded-xl whitespace-nowrap">
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 