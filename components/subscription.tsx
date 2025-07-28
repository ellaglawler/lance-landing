"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, CreditCard, Crown, CheckCircle, AlertCircle } from 'lucide-react'
import { 
  createCheckoutSession, 
  createPortalSession, 
  getSubscriptionStatus,
  type SubscriptionStatus 
} from '@/lib/api'
import { redirectToCheckout, handleCheckoutError } from '@/lib/stripe'
import { useToast } from '@/hooks/use-toast'

interface SubscriptionProps {
  className?: string
}

export default function Subscription({ className }: SubscriptionProps) {
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const { toast } = useToast()

  // Fetch subscription status on component mount
  useEffect(() => {
    fetchSubscriptionStatus()
  }, [])

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true)
      const status = await getSubscriptionStatus()
      setSubscription(status)
    } catch (error) {
      console.error('Failed to fetch subscription status:', error)
      toast({
        title: "Error",
        description: "Failed to load subscription status",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    try {
      setCheckoutLoading(true)
      
      // Replace with your actual Stripe price ID
      const priceId = 'price_1OqXxXxXxXxXxXxXxXxXxXx' // You'll need to replace this
      
      const { id: sessionId } = await createCheckoutSession(priceId)
      await redirectToCheckout(sessionId)
    } catch (error) {
      console.error('Checkout error:', error)
      const errorMessage = handleCheckoutError(error)
      toast({
        title: "Checkout Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setCheckoutLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    try {
      setPortalLoading(true)
      const { url } = await createPortalSession()
      window.location.href = url
    } catch (error) {
      console.error('Portal error:', error)
      toast({
        title: "Error",
        description: "Failed to access customer portal",
        variant: "destructive",
      })
    } finally {
      setPortalLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Subscription
        </CardTitle>
        <CardDescription>
          Manage your Lance subscription and billing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscription?.is_subscribed ? (
          <div className="space-y-4">
            {/* Active Subscription */}
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">
                    {subscription.plan_name || 'Pro Plan'}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Active Subscription
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                {subscription.status}
              </Badge>
            </div>

            {/* Subscription Details */}
            <div className="space-y-2 text-sm">
              {subscription.current_period_end && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next billing date:</span>
                  <span>{formatDate(subscription.current_period_end)}</span>
                </div>
              )}
              
              {subscription.cancel_at_period_end && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800 dark:text-yellow-200">
                    Subscription will cancel at the end of the current period
                  </span>
                </div>
              )}
            </div>

            {/* Manage Subscription Button */}
            <Button 
              onClick={handleManageSubscription} 
              disabled={portalLoading}
              className="w-full"
              variant="outline"
            >
              {portalLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Subscription
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* No Subscription */}
            <div className="text-center py-6">
              <Crown className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Upgrade to Pro</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get unlimited invoice tracking, automated follow-ups, and priority support.
              </p>
              
              {/* Pricing Info */}
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="text-2xl font-bold">$29</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <Button 
                onClick={handleSubscribe} 
                disabled={checkoutLoading}
                className="w-full"
                size="lg"
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Start Pro Trial
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 