"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import AdminGuard from '@/components/admin-guard'
import TestInvoiceGenerator from '@/components/test-invoice-generator'
import { ArrowLeft, TestTube } from 'lucide-react'

export default function TestInvoicesPage() {
  const router = useRouter()
  const { toast } = useToast()

  return (
    <AdminGuard>
      <div className="container mx-auto p-6 pt-32">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push('/admin')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
          <div className="flex items-center gap-2">
            <TestTube className="w-6 h-6" />
            <div>
              <h1 className="text-3xl font-bold">Test Invoice Generator</h1>
              <p className="text-muted-foreground">Generate simulated invoice emails for testing the webhook pipeline</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About Test Invoice Generator</CardTitle>
              <CardDescription>
                This tool allows you to generate realistic test invoice emails that will trigger the full webhook-to-database flow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-muted-foreground">Test Scenarios</div>
                  <div className="text-xs text-muted-foreground mt-1">Due, Past-Due, Paid</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">50</div>
                  <div className="text-sm text-muted-foreground">Max Emails</div>
                  <div className="text-xs text-muted-foreground mt-1">Per Request</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">[TEST]</div>
                  <div className="text-sm text-muted-foreground">Tagged Emails</div>
                  <div className="text-xs text-muted-foreground mt-1">Easy Identification</div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Fill out the form below with your test parameters</li>
                  <li>2. Click "Generate Test Data" to queue the job</li>
                  <li>3. Monitor the job status in real-time</li>
                  <li>4. Check your Gmail inbox for test emails</li>
                  <li>5. Verify the webhook processes the emails correctly</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <TestInvoiceGenerator />
        </div>
      </div>
    </AdminGuard>
  )
} 