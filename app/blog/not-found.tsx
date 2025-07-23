import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function NotFound() {
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
            {/* Back Button */}
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>

            <h1 className="h1-hero text-white mb-8">
              Post Not Found
            </h1>

            <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: "#AEB6C4" }}>
              Sorry, we couldn't find the blog post you're looking for. It may have been moved or deleted.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 