import { WaitlistForm } from "@/components/waitlist-form"
import { HeroStats } from "@/components/hero-stats"

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Get Paid Faster with Lance
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Automate your invoicing and get paid faster. Lance helps you manage your finances so you can focus on your work.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <WaitlistForm />
                </div>
              </div>
              <HeroStats />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 