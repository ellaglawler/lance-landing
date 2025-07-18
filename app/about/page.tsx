import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="pt-32 pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
              We are dedicated to revolutionizing the way businesses handle their finances through innovative AI-powered solutions.
              Our platform combines cutting-edge technology with intuitive design to make financial management effortless.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Our mission is to empower businesses with intelligent financial tools that streamline operations, reduce overhead, and drive growth.
              Through cutting-edge AI technology, we're making financial management more efficient and accessible than ever before.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-lg text-muted-foreground">
              We envision a future where businesses of all sizes can harness the power of AI to transform their financial operations,
              making smart financial decisions faster and with greater confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Active Businesses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$10M+</div>
              <div className="text-sm text-muted-foreground">Processed Monthly</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-4">Innovation First</h3>
            <p className="text-muted-foreground">
              We constantly push the boundaries of what's possible with AI and financial technology.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-4">Client Success</h3>
            <p className="text-muted-foreground">
              Your success is our success. We're committed to providing the tools and support you need to thrive.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-4">Trust & Security</h3>
            <p className="text-muted-foreground">
              We maintain the highest standards of security and reliability in everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src="/placeholder-user.jpg"
                  alt="CEO"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Sarah Johnson</h3>
              <p className="text-muted-foreground">CEO & Co-founder</p>
            </div>
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src="/placeholder-user.jpg"
                  alt="CTO"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Michael Chen</h3>
              <p className="text-muted-foreground">CTO & Co-founder</p>
            </div>
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src="/placeholder-user.jpg"
                  alt="CPO"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Alex Rivera</h3>
              <p className="text-muted-foreground">Chief Product Officer</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 