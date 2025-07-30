"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react'
import { getCheckoutSession } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [sessionDetails, setSessionDetails] = useState<any>(null)

  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetails()
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const fetchSessionDetails = async () => {
    try {
      const session = await getCheckoutSession(sessionId!)
      setSessionDetails(session)
    } catch (error) {
      console.error('Failed to fetch session details:', error)
      toast({
        title: "Error",
        description: "Failed to load subscription details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-white" />
          <p className="text-white">Loading your subscription details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Welcome to Lance Pro!</CardTitle>
          <CardDescription>
            Your subscription has been successfully activated
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessionDetails && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Plan:</span>
                <span className="font-medium">Pro Plan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount:</span>
                <span className="font-medium">
                  ${(sessionDetails.amount_total / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-medium">What's included:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Unlimited invoice tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Automated follow-up emails
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Priority customer support
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Advanced analytics & reporting
              </li>
            </ul>
          </div>

          <Button onClick={goToDashboard} className="w-full" size="lg">
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            You'll receive a confirmation email shortly with your receipt and account details.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-white" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  )
} 