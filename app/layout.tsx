import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { GoogleAnalyticsComponent } from '@/components/google-analytics'

export const metadata: Metadata = {
  title: 'Lance - Smart Financial Tools',
  description: 'Empowering freelancers and small businesses with smart financial tools.',
  generator: 'v0.dev',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex-1">
            <Header />
            {children}
          </div>
          <Footer />
        </ThemeProvider>
        <GoogleAnalyticsComponent gaId={gaId || ''} />
      </body>
    </html>
  )
}
