import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { GoogleAnalyticsComponent } from '@/components/google-analytics'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Header />
        {children}
      </div>
      <Footer />
      <GoogleAnalyticsComponent gaId={gaId || ''} />
    </div>
  )
} 