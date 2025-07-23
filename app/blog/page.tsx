import { Button } from "@/components/ui/button"
import {
  FileText,
  Calendar,
  Users,
  TrendingUp,
  ChevronLeft,
  Cpu,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Zap,
} from "lucide-react"
import { Header } from "@/components/header"
import { WaitlistForm } from "@/components/waitlist-form"
import Link from "next/link"
import type { Metadata } from 'next'
import { client, GET_ALL_POSTS, type WordPressPost } from "@/lib/wordpress"
import Image from "next/image"

// This enables SSR for this page
export const dynamic = 'force-dynamic'

// Revalidate every hour
export const revalidate = 3600

async function getLatestPosts() {
  try {
    const { data } = await client.query({
      query: GET_ALL_POSTS,
      variables: {
        first: 10, // Get latest 10 posts
      },
    });
    return data.posts.edges.map(({ node }: { node: WordPressPost }) => node);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  // You can make this dynamic based on the latest posts if needed
  return {
    title: 'Lance Blog - Freelancer Payment Strategies & Business Automation',
    description: 'Get exclusive insights on payment strategies, client relationships, and business automation for freelancers. Learn how to stop chasing clients and start collecting with AI-powered tools.',
    keywords: [
      'freelancer blog',
      'payment strategies',
      'client relationships',
      'business automation',
      'AI for freelancers',
      'invoice collection',
      'freelance business',
      'payment psychology',
      'automated collections',
      'freelancer tips',
      'get paid faster',
      'late payment solutions',
      'freelance cash flow',
      'client communication',
      'business automation tools'
    ],
    openGraph: {
      title: 'Lance Blog - Freelancer Payment Strategies & Business Automation',
      description: 'Exclusive insights on payment strategies, client relationships, and business automation for freelancers. Stop chasing clients, start collecting.',
      type: 'website',
      url: 'https://lanceos.ai/blog',
      siteName: 'Lance',
      images: [
        {
          url: '/images/lance-logo.png',
          width: 1200,
          height: 630,
          alt: 'Lance Blog - Freelancer Payment Strategies',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Lance Blog - Freelancer Payment Strategies & Business Automation',
      description: 'Exclusive insights on payment strategies, client relationships, and business automation for freelancers.',
      images: ['/images/lance-logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://lanceos.ai/blog',
    },
    authors: [{ name: 'Lance Team' }],
    category: 'Business & Finance',
  }
}

export default async function BlogPage() {
  const posts = await getLatestPosts();
  const hasPosts = posts.length > 0;

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
            <h1 className="h1-hero text-white mb-8">
              The Lance <span className="gradient-text-enhanced">Blog</span>
            </h1>

            <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: "#AEB6C4" }}>
              Insights, strategies, and stories from freelancers who've transformed their payment process. 
              Learn how to stop chasing clients and start collecting.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
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
            {hasPosts ? (
              <div className="grid gap-8 md:grid-cols-2">
                {posts.map((post: WordPressPost) => (
                  <Link 
                    href={`/blog/${post.slug}`} 
                    key={post.id}
                    className="depth-card-dark rounded-2xl p-8 transform hover:scale-105 transition-all duration-300"
                  >
                    {post.featuredImage?.node && (
                      <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText || post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm text-blue-400">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
                    <div 
                      className="text-[#AEB6C4] mb-4"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <div className="flex items-center gap-4">
                      {post.author?.node && (
                        <div className="flex items-center gap-2">
                          {post.author.node.avatar?.url && (
                            <Image
                              src={post.author.node.avatar.url}
                              alt={post.author.node.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          )}
                          <span className="text-sm text-gray-400">{post.author.node.name}</span>
                        </div>
                      )}
                      {post.categories?.edges.length > 0 && (
                        <span className="text-sm text-gray-400">
                          {post.categories.edges[0].node.name}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              // Fallback content when no posts are available
              <div className="text-center">
                <h2 className="h2-section mb-6">Coming Soon</h2>
                <p className="text-xl mb-16 max-w-3xl mx-auto" style={{ color: "#AEB6C4" }}>
                  We're working on bringing you valuable insights and strategies. Stay tuned!
                </p>
                
                {/* Newsletter Signup */}
                <div className="depth-card-dark rounded-3xl p-10 max-w-2xl mx-auto">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="h3-card mb-4 text-white text-center">Get Early Access</h3>
                  <p className="text-center mb-8" style={{ color: "#AEB6C4" }}>
                    Be the first to know when we launch. Get exclusive insights and strategies delivered to your inbox.
                  </p>
                  
                  <WaitlistForm variant="cta" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#141828] relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="h2-section mb-8 text-white">
              Ready to Stop Chasing <span className="gradient-text">and Start Collecting?</span>
            </h2>
            <p className="text-xl mb-8" style={{ color: "#AEB6C4" }}>
              Transform your payment process with Lance while staying up to date with our latest insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WaitlistForm variant="demo" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 