import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Lance AI Collections Agent | Data Protection & Security',
  description: 'Learn how Lance protects your data and privacy. Our Privacy Policy explains how we collect, use, and safeguard your information when using our AI collections agent platform.',
  keywords: [
    'lance privacy policy',
    'lance data protection',
    'AI collections privacy',
    'freelancer data security',
    'lance privacy protection',
    'payment recovery privacy',
    'lance data handling',
    'AI collections data security',
    'freelancer privacy policy',
    'lance information security',
    'payment automation privacy',
    'lance data privacy',
    'AI collections data protection',
    'freelancer data privacy',
    'lance security policy',
    'payment recovery data security',
    'lance privacy protection',
    'AI collections information security',
    'freelancer privacy protection',
    'lance data security policy'
  ],
  openGraph: {
    title: 'Privacy Policy - Lance AI Collections Agent',
    description: 'Learn how Lance protects your data and privacy. Our Privacy Policy explains how we collect, use, and safeguard your information.',
    type: 'website',
    url: 'https://lanceos.ai/privacy',
    siteName: 'Lance',
    images: [
      {
        url: '/images/lance-logo.png',
        width: 1200,
        height: 630,
        alt: 'Lance Privacy Policy - Data Protection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Lance AI Collections Agent',
    description: 'Learn how Lance protects your data and privacy with our comprehensive Privacy Policy.',
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
    canonical: 'https://lanceos.ai/privacy',
  },
  authors: [{ name: 'Lance Team' }],
  category: 'Legal',
  other: {
    'application-name': 'Lance',
    'apple-mobile-web-app-title': 'Lance Privacy',
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

export default function PrivacyPage() {
  return (
    <main className="pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl mb-8 text-muted-foreground">
              How we protect and handle your data at Lance
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg prose-gray dark:prose-invert">
          <div className="bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Lance: Privacy Policy</h2>
            <p className="text-muted-foreground mb-8">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <p className="mb-6">
              At Lance, we respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and safeguard information in connection 
              with your use of the Lance platform ("Lance," "we," or "our").
            </p>

            <h3 className="text-xl font-semibold mb-4 mt-8">Information We Collect</h3>
            <p className="mb-4">
              We collect information you voluntarily provide when you create an account and connect your 
              email, calendar, invoicing, or messaging tools to Lance, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Contact information (name, email, business details)</li>
              <li>Invoices, contracts, and client communications you authorize Lance to access</li>
              <li>Usage data, such as login activity, feature usage, and feedback</li>
            </ul>
            <p className="mb-6">
              We only access data you explicitly grant permission to access.
            </p>

            <h3 className="text-xl font-semibold mb-4 mt-8">How We Use Your Information</h3>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Detect overdue invoices and unresponsive clients</li>
              <li>Generate and send professional reminders on your behalf</li>
              <li>Provide insights, reports, and recommendations</li>
              <li>Improve our platform and develop new features</li>
            </ul>
            <p className="mb-6">
              We do <strong>not</strong> sell your data. We may share data with trusted service providers 
              under strict confidentiality to operate and improve Lance.
            </p>

            <h3 className="text-xl font-semibold mb-4 mt-8">Data Security</h3>
            <p className="mb-6">
              We implement industry-standard security measures to protect your data, including encryption, 
              secure storage, and access controls. However, no system can guarantee absolute security.
            </p>

            <h3 className="text-xl font-semibold mb-4 mt-8">Your Choices & Rights</h3>
            <p className="mb-4">You can:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Disconnect integrations at any time</li>
              <li>Request access to or deletion of your data</li>
              <li>Opt out of non-essential communications</li>
            </ul>
            <div className="border-t pt-6 mt-8">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="mb-6">
                To exercise your rights, contact us at{" "}
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
                <strong>Thank you for choosing Lance — Polite. Persistent. Paid.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 