import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';

// Initialize Apollo Client with fallback URL for development
const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8000/graphql';

const link = createHttpLink({
  uri: wordpressUrl,
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Initialize Apollo Client
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

// Define common GraphQL fragments for reuse
export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    slug
    date
    modified
    excerpt
    content
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
    categories {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
    seo {
      title
      metaDesc
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
      }
    }
  }
`;

// Query to get all posts
export const GET_ALL_POSTS = gql`
  ${POST_FIELDS}
  query AllPosts($first: Int) {
    posts(first: $first) {
      nodes {
        ...PostFields
      }
    }
  }
`;

// Query to get a single post by slug
export const GET_POST_BY_SLUG = gql`
  ${POST_FIELDS}
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostFields
    }
  }
`;

// Query to get posts by category
export const GET_POSTS_BY_CATEGORY = gql`
  ${POST_FIELDS}
  query PostsByCategory($categoryId: ID!, $first: Int, $after: String) {
    category(id: $categoryId, idType: SLUG) {
      name
      posts(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  }
`;

// Types for our WordPress data
export interface WordPressPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  modified: string;
  excerpt: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
  author: {
    node: {
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  categories: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        slug: string;
      };
    }>;
  };
  seo: {
    title: string;
    metaDesc: string;
    opengraphTitle: string;
    opengraphDescription: string;
    opengraphImage: {
      sourceUrl: string;
    };
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface PostsResponse {
  posts: {
    pageInfo: PageInfo;
    edges: Array<{
      node: WordPressPost;
    }>;
  };
} 