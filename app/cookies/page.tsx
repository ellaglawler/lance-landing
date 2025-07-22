import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy - Lance AI Collections Agent | Cookie Usage & Management',
  description: 'Learn how Lance uses cookies and similar technologies to improve your experience. Our Cookie Policy explains what cookies we use and how you can manage them.',
  keywords: [
    'lance cookie policy',
    'lance cookies',
    'AI collections cookies',
    'freelancer cookie policy',
    'lance cookie usage',
    'payment recovery cookies',
    'lance cookie management',
    'AI collections cookie policy',
    'freelancer cookie usage',
    'lance tracking cookies',
    'payment automation cookies',
    'lance cookie settings',
    'AI collections tracking',
    'freelancer cookie management',
    'lance cookie preferences',
    'payment recovery tracking',
    'lance cookie consent',
    'AI collections cookie usage',
    'freelancer cookie settings',
    'lance cookie technology'
  ],
  openGraph: {
    title: 'Cookie Policy - Lance AI Collections Agent',
    description: 'Learn how Lance uses cookies and similar technologies to improve your experience. Understand our cookie usage and management options.',
    type: 'website',
    url: 'https://lanceos.ai/cookies',
    siteName: 'Lance',
    images: [
      {
        url: '/images/lance-logo.png',
        width: 1200,
        height: 630,
        alt: 'Lance Cookie Policy - Cookie Usage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy - Lance AI Collections Agent',
    description: 'Learn how Lance uses cookies and similar technologies to improve your experience.',
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
    canonical: 'https://lanceos.ai/cookies',
  },
  authors: [{ name: 'Lance Team' }],
  category: 'Legal',
  other: {
    'application-name': 'Lance',
    'apple-mobile-web-app-title': 'Lance Cookies',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#0B0F19',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#0B0F19',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function CookiesPage() {
  return (
    <main className="pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-xl mb-8 text-muted-foreground">
              How we use cookies and similar technologies
            </p>
          </div>
        </div>
      </div>

      {/* Cookie Policy Content */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg prose-gray dark:prose-invert">
          <div className="bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Lance: Cookie Policy</h2>
            <p className="text-muted-foreground mb-8">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <p className="mb-6">
              This Cookie Policy explains how Lance ("we," "our," or "us") uses cookies and similar 
              technologies when you visit our website or use the Lance platform (collectively, the "Service").
            </p>

            <div className="border-t border-b py-4 my-8">
              <h3 className="text-xl font-semibold mb-4">What Are Cookies?</h3>
              <p className="mb-6">
                Cookies are small text files placed on your device when you visit a website. They help us 
                recognize your device, enhance functionality, analyze usage, and deliver a better experience.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-8">Types of Cookies We Use</h3>

            <h4 className="text-lg font-semibold mb-3 mt-6">1. Essential Cookies</h4>
            <p className="mb-6">
              These cookies are necessary for the Service to function and cannot be switched off in our systems. 
              They are usually set in response to your actions, such as logging in or filling out forms.
            </p>

            <h4 className="text-lg font-semibold mb-3 mt-6">2. Performance & Analytics Cookies</h4>
            <p className="mb-6">
              These cookies help us understand how visitors interact with the Service by collecting information 
              anonymously. This data helps us improve functionality and performance.
            </p>

            <h4 className="text-lg font-semibold mb-3 mt-6">3. Functionality Cookies</h4>
            <p className="mb-6">
              These cookies enable the Service to provide enhanced features and personalization, such as 
              remembering your preferences.
            </p>

            <h4 className="text-lg font-semibold mb-3 mt-6">4. Third-Party Cookies</h4>
            <p className="mb-6">
              Some cookies are placed by third-party services we use (e.g., analytics providers). These third 
              parties may use their own cookies, which are subject to their privacy policies.
            </p>

            <div className="border-t border-b py-4 my-8">
              <h3 className="text-xl font-semibold mb-4">Managing Cookies</h3>
              <p className="mb-4">
                You can control and manage cookies through your browser settings. Please note that blocking 
                certain types of cookies may impact your experience on the Service.
              </p>
              <p className="mb-6">
                For detailed guidance on how to manage or delete cookies, visit{" "}
                <a 
                  href="http://www.allaboutcookies.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.allaboutcookies.org
                </a>
                .
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-8">Changes to This Policy</h3>
            <p className="mb-6">
              We may update this Cookie Policy from time to time. Changes will be posted on this page with 
              an updated effective date.
            </p>

            <div className="border-t pt-6 mt-8">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="mb-6">
                If you have questions about our use of cookies, please contact us at{" "}
                <a 
                  href="mailto:legal@lanceos.ai" 
                  className="text-primary hover:underline"
                >
                  legal@lanceos.ai
                </a>
                .
              </p>
            </div>

            <div className="border-t pt-6 mt-8">
              <p className="text-center text-lg font-medium">
                <strong>Thank you for trusting Lance — Polite. Persistent. Paid.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 