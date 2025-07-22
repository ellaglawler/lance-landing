import dynamic from 'next/dynamic'

// Dynamically import the dashboard with no SSR since it uses client-side features
const LanceDashboard = dynamic(() => import('@/components/dashboard'), { ssr: false })

export default function AppPage() {
  return <LanceDashboard />
} 