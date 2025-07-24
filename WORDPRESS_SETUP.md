# WordPress Integration Setup

This guide explains how to set up the headless WordPress integration for the Lance blog.

## WordPress Setup

1. Install and configure the following WordPress plugins:
   - WPGraphQL (https://wordpress.org/plugins/wp-graphql/)
   - Yoast SEO (https://wordpress.org/plugins/wordpress-seo/)
   - WPGraphQL for Yoast SEO (https://github.com/ashhitch/wp-graphql-yoast-seo)

2. Configure WPGraphQL:
   - Go to GraphQL > Settings in your WordPress admin
   - Enable introspection (required for development)
   - Set appropriate CORS origins for your development and production environments

3. Configure Yoast SEO:
   - Set up default templates for titles and meta descriptions
   - Configure social media settings
   - Enable schema markup

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# WordPress GraphQL API
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
```

Replace `your-wordpress-site.com` with your actual WordPress site URL.

## Development Workflow

1. Start your WordPress development server
2. Ensure your WordPress site is accessible and the GraphQL endpoint is responding
3. Run the Next.js development server:
   ```bash
   npm run dev
   ```

## Content Guidelines

1. Featured Images:
   - Use high-quality images with 16:9 aspect ratio
   - Recommended size: 1200x675px
   - Always provide alt text

2. Categories:
   - Use consistent category names
   - Limit to 1-2 primary categories per post

3. SEO:
   - Fill out all Yoast SEO fields
   - Provide meta descriptions
   - Set featured images as OG images

## Testing

Before deploying:
1. Test GraphQL queries in GraphiQL
2. Verify image optimization
3. Check meta tags and social sharing previews
4. Test responsive layouts
5. Verify Lighthouse performance scores

## Deployment

1. Set environment variables in your production environment
2. Configure CORS on WordPress to allow your production domain
3. Test the GraphQL endpoint from your production environment
4. Monitor performance and caching

## Security

1. Keep WordPress core and all plugins updated
2. Use strong passwords and 2FA where possible
3. Limit GraphQL query complexity
4. Configure appropriate CORS headers
5. Monitor for unusual traffic patterns

## Troubleshooting

Common issues and solutions:

1. CORS errors:
   - Check WordPress CORS settings
   - Verify environment variables
   - Check for protocol mismatches (http vs https)

2. Missing images:
   - Verify media URLs are accessible
   - Check image dimensions and formats
   - Ensure proper next/image configuration

3. GraphQL errors:
   - Check WPGraphQL plugin settings
   - Verify query syntax
   - Monitor error logs

For additional support, refer to:
- [WPGraphQL Documentation](https://www.wpgraphql.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Yoast SEO Documentation](https://yoast.com/wordpress/plugins/seo/) 