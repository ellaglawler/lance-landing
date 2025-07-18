import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-24">
      <Header />
      
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Contact Us</h1>
          
          <div className="prose prose-lg prose-invert mb-12">
            <p className="text-xl text-gray-400">
              Have questions about Lance? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-200">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Your message..."
                />
              </div>

              <Button className="w-full" size="lg">
                Send Message
              </Button>
            </form>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
              <p className="text-gray-400">support@lance.ai</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-2">Follow Us</h3>
              <p className="text-gray-400">@lance_ai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 