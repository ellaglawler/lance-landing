"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle, ArrowLeft, CreditCard } from 'lucide-react'

export default function CancelPage() {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <XCircle className="h-16 w-16 text-orange-500" />
          </div>
          <CardTitle className="text-2xl">Subscription Canceled</CardTitle>
          <CardDescription>
            No worries! You can upgrade to Pro anytime
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Your subscription wasn't completed. You can continue using Lance with limited features, 
              or try upgrading again when you're ready.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-center">What you're missing:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-orange-500" />
                Unlimited invoice tracking
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-orange-500" />
                Automated follow-up emails
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-orange-500" />
                Priority customer support
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-orange-500" />
                Advanced analytics & reporting
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button onClick={goToDashboard} className="w-full" size="lg">
              Continue with Free Plan
            </Button>
            
            <Button onClick={goBack} variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Questions? Contact our support team at support@lanceos.ai
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 