"use client"

import React, { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import LanceDashboard from "@/components/dashboard"

function DashboardContent() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDemoMode = searchParams.get('demo-mode') === 'true'

  console.log('[Dashboard] Render', { isAuthenticated, isDemoMode, loading })

  useEffect(() => {
    if (!loading && !isAuthenticated && !isDemoMode) {
      console.log('[Dashboard] Redirecting to home because not authenticated, not in demo mode, and not loading')
      router.push('/')
    }
  }, [isAuthenticated, isDemoMode, loading, router])

  if (loading) {
    console.log('[Dashboard] Showing loading UI')
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated && !isDemoMode) {
    console.log('[Dashboard] Showing redirecting UI')
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Redirecting...</div>
      </div>
    )
  }

  return <LanceDashboard />
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <DashboardContent />
    </Suspense>
  )
} 