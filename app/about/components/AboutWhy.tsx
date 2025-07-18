export function AboutWhy() {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Why We Built Lance</h2>
      <blockquote className="text-2xl font-medium italic mb-8 pl-4 border-l-4 border-blue-400 text-white">
        Too many freelancers treat themselves like their own worst‑paid employee.
      </blockquote>
      <p className="text-xl mb-8" style={{ color: "#AEB6C4" }}>
        We've been in your shoes. We've launched viral products, led growth at world‑class platforms, 
        advised startups, and run our own creative shops. And through it all, we spent more time sending 
        follow‑ups and wrangling contracts than creating.
      </p>
      <p className="text-xl mb-8" style={{ color: "#AEB6C4" }}>
        Existing tools (Trello, Notion, QuickBooks) are scattered, manual, and designed for 
        <em> small businesses</em>, not <em>solo creators</em>.
      </p>
      <p className="text-xl text-white mb-6">So we built the teammate we wished we had:</p>
      <ul className="space-y-4 mb-8">
        <li className="flex items-center text-xl" style={{ color: "#AEB6C4" }}>
          <span className="text-green-500 mr-2">✅</span>
          Drafts & sends client emails, proposals & contracts
        </li>
        <li className="flex items-center text-xl" style={{ color: "#AEB6C4" }}>
          <span className="text-green-500 mr-2">✅</span>
          Tracks unpaid invoices & reminds clients
        </li>
        <li className="flex items-center text-xl" style={{ color: "#AEB6C4" }}>
          <span className="text-green-500 mr-2">✅</span>
          Books meetings & keeps your calendar in sync
        </li>
        <li className="flex items-center text-xl" style={{ color: "#AEB6C4" }}>
          <span className="text-green-500 mr-2">✅</span>
          Weekly summary of open tasks & next steps
        </li>
      </ul>
      <p className="text-xl" style={{ color: "#AEB6C4" }}>
        Delivered simply — through a web app & chat — with no steep learning curve.
      </p>
    </div>
  )
} 