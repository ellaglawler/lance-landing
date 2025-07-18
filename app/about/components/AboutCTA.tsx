import { WaitlistForm } from "@/components/waitlist-form"

export function AboutCTA() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">See Your Collections Agent in Action</h2>
        <p className="text-xl mb-8" style={{ color: "#AEB6C4" }}>
          Watch how Lance politely recovers your overdue invoices while protecting your client relationships.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <WaitlistForm variant="demo" />
        </div>
      </div>
    </div>
  )
} 