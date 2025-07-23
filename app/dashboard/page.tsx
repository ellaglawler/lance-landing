"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import LanceDashboard from "@/components/dashboard"

export default function DashboardPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDemoMode = searchParams.get('demo-mode') === 'true'

  useEffect(() => {
    if (!isAuthenticated && !isDemoMode) {
      router.push('/')
    }
  }, [isAuthenticated, isDemoMode, router])

  // Show loading or redirect if not authenticated and not in demo mode
  if (!isAuthenticated && !isDemoMode) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Redirecting...</div>
      </div>
    )
  }

  return <LanceDashboard />
} 