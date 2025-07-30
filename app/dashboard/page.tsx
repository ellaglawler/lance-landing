"use client"

import React, { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import LanceDashboard from "@/components/dashboard"
import { useToast } from "@/hooks/use-toast"

function DashboardContent() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const isDemoMode = searchParams.get('demo-mode') === 'true'

  // Handle Stripe checkout success/cancel states
  useEffect(() => {
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')
    const sessionId = searchParams.get('session_id')

    if (success === 'true' && sessionId) {
      toast({
        title: "Welcome to Lance Pro!",
        description: "Your subscription has been successfully activated.",
      })
      // Clean up URL params
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('success')
      newUrl.searchParams.delete('session_id')
      window.history.replaceState({}, '', newUrl.toString())
    } else if (canceled === 'true') {
      toast({
        title: "Subscription Canceled",
        description: "No worries! You can upgrade anytime from your dashboard.",
        variant: "default",
      })
      // Clean up URL params
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('canceled')
      window.history.replaceState({}, '', newUrl.toString())
    }
  }, [searchParams, toast])

  useEffect(() => {
    if (!loading && !isAuthenticated && !isDemoMode) {
      router.push('/')
    }
  }, [isAuthenticated, isDemoMode, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated && !isDemoMode) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Redirecting...</div>
      </div>
    )
  }

  return <LanceDashboard isDemoMode={isDemoMode} />
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <DashboardContent />
    </Suspense>
  )
} 