import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <main className="pt-32 pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Lance</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary">
              The teammate who works as hard as you do — without burning out.
            </h2>
            <p className="text-xl mb-8 text-muted-foreground">
              You've earned the right to focus on your craft. We'll handle the rest — 24/7.
            </p>
            <p className="text-lg mb-8 text-muted-foreground">
              At Lance, we're reimagining what it means to work for yourself — without working <em>alone</em>.
            </p>
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground mb-8">
            We know the grind: chasing clients. Writing proposals late at night. Following up on unpaid invoices. 
            Scheduling endless meetings. Spending more time managing your business than creating.
          </p>
          <p className="text-lg mb-8">
            We've been there.
          </p>
          <p className="text-lg text-muted-foreground mb-12">
            So we built something better: a loyal teammate that handles the busywork — right inside your inbox 
            and calendar — so you can focus on what really matters.
          </p>
          <div className="bg-primary/10 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-xl font-medium">
              Free freelancers from busywork so they can focus on their craft.
            </p>
          </div>
        </div>
      </div>

      {/* Why We Built Lance Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Why We Built Lance</h2>
            <blockquote className="text-2xl font-medium italic mb-8 pl-4 border-l-4 border-primary">
              Too many freelancers treat themselves like their own worst‑paid employee.
            </blockquote>
            <p className="text-lg text-muted-foreground mb-8">
              We've been in your shoes. We've launched viral products, led growth at world‑class platforms, 
              advised startups, and run our own creative shops. And through it all, we spent more time sending 
              follow‑ups and wrangling contracts than creating.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Existing tools (Trello, Notion, QuickBooks) are scattered, manual, and designed for 
              <em>small businesses</em>, not <em>solo creators</em>.
            </p>
            <p className="text-lg mb-6">So we built the teammate we wished we had:</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-lg">
                <span className="text-green-500 mr-2">✅</span>
                Drafts & sends client emails, proposals & contracts
              </li>
              <li className="flex items-center text-lg">
                <span className="text-green-500 mr-2">✅</span>
                Tracks unpaid invoices & reminds clients
              </li>
              <li className="flex items-center text-lg">
                <span className="text-green-500 mr-2">✅</span>
                Books meetings & keeps your calendar in sync
              </li>
              <li className="flex items-center text-lg">
                <span className="text-green-500 mr-2">✅</span>
                Weekly summary of open tasks & next steps
              </li>
            </ul>
            <p className="text-lg text-muted-foreground">
              Delivered simply — through a web app & chat — with no steep learning curve.
            </p>
          </div>
        </div>
      </div>

      {/* What Sets Us Apart */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Sets Us Apart</h2>
        <p className="text-center text-lg mb-12">
          Built <em>by freelancers, for freelancers</em>, Lance understands what you're going through — and actually helps.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-2xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-4">Workflow‑Focused</h3>
            <p className="text-muted-foreground">
              We don't just give you templates — we handle the work, the way you would.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-2xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-4">Works With Your Tools</h3>
            <p className="text-muted-foreground">
              Integrated directly into your email & calendar. No clunky dashboards to learn.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-2xl mb-4">💻</div>
            <h3 className="text-xl font-semibold mb-4">Affordable & Intuitive</h3>
            <p className="text-muted-foreground">
              Made for solopreneurs — accessible, straightforward, and ready to use.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-2xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold mb-4">Empathetic Design</h3>
            <p className="text-muted-foreground">
              We've been where you are. Every feature comes from lived experience.
            </p>
          </div>
        </div>
      </div>

      {/* Meet the Founders */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Founders</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Charles Casillas"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Charles Casillas</h3>
              <p className="text-primary font-medium mb-2">Cofounder</p>
              <p className="text-muted-foreground italic mb-4">Product Builder. Technologist. Visionary.</p>
              <p className="text-muted-foreground text-sm">
                From launching AI‑driven apps to leading engineering & product at Apple Music, Beats, 
                Pandora, and beyond — Charles turns complex technology into seamless, human‑centered experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Ella Lawler"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Ella Lawler</h3>
              <p className="text-primary font-medium mb-2">Cofounder</p>
              <p className="text-muted-foreground italic mb-4">Creative Strategist. Brand Storyteller. Designer.</p>
              <p className="text-muted-foreground text-sm">
                With a background in design, branding, and marketing, Ella has led campaigns, crafted identities, 
                and built user‑focused products that connect deeply with audiences. As a freelancer herself, 
                she knows the hustle — and is passionate about making it easier.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 md:px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Reclaim Your Time?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Lance is now onboarding select beta users — hardworking freelancers who are ready to 
          stop drowning in admin and start living their craft.
        </p>
        <p className="text-xl font-medium mb-8">Your loyal teammate is ready when you are.</p>
        <Button size="lg" className="text-lg px-8">
          ✨ Join the Beta
        </Button>
      </div>
    </main>
  )
} 