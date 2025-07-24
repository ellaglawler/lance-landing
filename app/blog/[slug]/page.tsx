import { client, GET_POST_BY_SLUG, type WordPressPost } from "@/lib/wordpress"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

// This enables SSR for this page
export const dynamic = 'force-dynamic'

// Revalidate every hour
export const revalidate = 3600

interface Props {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  try {
    const { data } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: {
        slug,
      },
    });
    return data.post as WordPressPost;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - Lance Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.seo.title || post.title,
    description: post.seo.metaDesc || post.excerpt.replace(/<[^>]*>/g, ''),
    openGraph: {
      title: post.seo.opengraphTitle || post.title,
      description: post.seo.opengraphDescription || post.excerpt.replace(/<[^>]*>/g, ''),
      type: 'article',
      url: `https://lanceos.ai/blog/${post.slug}`,
      images: post.seo.opengraphImage?.sourceUrl ? [
        {
          url: post.seo.opengraphImage.sourceUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [
        {
          url: '/images/lance-logo.png',
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.opengraphTitle || post.title,
      description: post.seo.opengraphDescription || post.excerpt.replace(/<[^>]*>/g, ''),
      images: post.seo.opengraphImage?.sourceUrl ? [post.seo.opengraphImage.sourceUrl] : ['/images/lance-logo.png'],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col pt-24">
      {/* Hero Section */}
      <section className="relative py-32 flex items-center justify-center">
        {/* Wave Background */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat wave-bg"
          style={{
            backgroundImage: "url('/hero-wave-bg.png')",
            zIndex: 0
          }}
        ></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-4xl">
            {/* Back Button */}
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-6">
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
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              {post.categories?.edges.length > 0 && (
                <span className="text-sm text-gray-400">
                  {post.categories.edges[0].node.name}
                </span>
              )}
            </div>

            {/* Title and Featured Image */}
            <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>
            {post.featuredImage?.node && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <article>
              <div 
                className="prose prose-lg prose-invert wordpress-content max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/<p>/g, '<p class="text-gray-300">').replace(/<h2>/g, '<h2 class="text-white mt-8 mb-4">').replace(/<h3>/g, '<h3 class="text-white mt-6 mb-3">')
                }}
              />
            </article>
          </div>
        </div>
      </section>
    </div>
  );
} 