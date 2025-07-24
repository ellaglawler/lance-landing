import { MetadataRoute } from 'next'
import { client, GET_ALL_POSTS } from '@/lib/wordpress'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lanceos.ai'
  
  // Fetch all posts from WordPress
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const { data } = await client.query({
      query: GET_ALL_POSTS,
      variables: {
        first: 100 // Adjust this number based on your needs
      }
    })

    if (data?.posts?.nodes) {
      blogPosts = data.posts.nodes.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.modified || post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6
      }))
    }
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
    // Continue with static routes even if blog posts fail to load
  }

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Combine static routes with blog posts
  return [...staticRoutes, ...blogPosts]
} 