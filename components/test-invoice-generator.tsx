"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import { 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Mail, 
  FileText,
  Loader2,
  RefreshCw
} from 'lucide-react'
import {
  generateTestInvoices,
  getTestInvoiceJobStatus,
  type TestInvoiceRequest,
  type TestInvoiceJobStatus
} from '@/lib/api'

export default function TestInvoiceGenerator() {
  const [formData, setFormData] = useState<TestInvoiceRequest>({
    scenario: 'all',
    count: 5,
    client: 'Test Client Corp',
    send_to: ''
  })
  const [loading, setLoading] = useState(false)
  const [jobStatus, setJobStatus] = useState<TestInvoiceJobStatus | null>(null)
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval)
      }
    }
  }, [pollingInterval])

  const validateForm = (): string | null => {
    if (!formData.send_to) {
      return 'Send To email is required'
    }
    if (formData.count < 1 || formData.count > 50) {
      return 'Count must be between 1 and 50'
    }
    return null
  }

  const handleSubmit = async () => {
    const error = validateForm()
    if (error) {
      toast({
        title: "Validation Error",
        description: error,
        variant: "destructive"
      })
      return
    }

    // Calculate total emails for confirmation
    const totalEmails = formData.scenario === 'all' ? formData.count * 3 : formData.count
    if (totalEmails > 50) {
      const confirmed = window.confirm(
        `This will generate ${totalEmails} emails. Are you sure you want to continue?`
      )
      if (!confirmed) return
    }

    try {
      setLoading(true)
      const response = await generateTestInvoices(formData)
      
      toast({
        title: "Job Queued",
        description: response.message || "Test invoice generation job has been queued"
      })

      setJobStatus({
        job_id: response.job_id,
        status: 'queued'
      })

      // Start polling for job status
      startPolling(response.job_id)

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to generate test invoices",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const startPolling = (jobId: string) => {
    // Clear any existing polling
    if (pollingInterval) {
      clearInterval(pollingInterval)
    }

    const interval = setInterval(async () => {
      try {
        const status = await getTestInvoiceJobStatus(jobId)
        setJobStatus(status)

        if (status.status === 'finished' || status.status === 'failed' || status.status === 'error') {
          clearInterval(interval)
          setPollingInterval(null)
          
          if (status.status === 'finished') {
            toast({
              title: "Job Completed",
              description: `Successfully sent ${status.result?.total_sent || 0} test emails`
            })
          } else {
            toast({
              title: "Job Failed",
              description: status.error || "Test invoice generation failed",
              variant: "destructive"
            })
          }
        }
      } catch (error) {
        console.error('Failed to poll job status:', error)
      }
    }, 3000) // Poll every 3 seconds

    setPollingInterval(interval)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'queued':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'started':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case 'finished':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'queued':
        return <Badge variant="secondary">Queued</Badge>
      case 'started':
        return <Badge variant="default">Running</Badge>
      case 'finished':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>
      case 'failed':
      case 'error':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generate Test Invoices
          </CardTitle>
          <CardDescription>
            Create simulated invoice emails to test the invoice extraction flow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scenario">Scenario</Label>
              <Select 
                value={formData.scenario} 
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, scenario: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="due">Due Invoices</SelectItem>
                  <SelectItem value="past-due">Past Due Invoices</SelectItem>
                  <SelectItem value="paid">Paid Invoices</SelectItem>
                  <SelectItem value="all">All Scenarios</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="count">Count per Scenario</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="50"
                value={formData.count}
                onChange={(e) => setFormData(prev => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
                placeholder="5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client">Client Name (Optional)</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
              placeholder="Test Client Corp"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="send_to">Send To Email *</Label>
            <Input
              id="send_to"
              type="email"
              value={formData.send_to}
              onChange={(e) => setFormData(prev => ({ ...prev, send_to: e.target.value }))}
              placeholder="test@example.com"
            />
            {formData.send_to && !formData.send_to.endsWith('@gmail.com') && (
              <p className="text-sm text-yellow-600">💡 Tip: Gmail addresses work best for testing webhook flows</p>
            )}
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={loading || !formData.send_to}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Test Data...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Generate Test Data
              </>
            )}
          </Button>

          {formData.scenario === 'all' && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This will generate {formData.count * 3} total emails (3 scenarios × {formData.count} each)
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Job Status Card */}
      {jobStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(jobStatus.status)}
              Job Status
            </CardTitle>
            <CardDescription>
              Job ID: {jobStatus.job_id}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusBadge(jobStatus.status)}
                <span className="text-sm text-muted-foreground">
                  {jobStatus.status === 'queued' && 'Job is waiting to be processed'}
                  {jobStatus.status === 'started' && 'Job is currently running'}
                  {jobStatus.status === 'finished' && 'Job completed successfully'}
                  {jobStatus.status === 'failed' && 'Job failed to complete'}
                  {jobStatus.status === 'error' && 'Job encountered an error'}
                </span>
              </div>
              {pollingInterval && (
                <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
              )}
            </div>

            {/* Job Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {jobStatus.enqueued_at && (
                <div>
                  <span className="font-medium">Queued:</span>
                  <br />
                  <span className="text-muted-foreground">{formatDate(jobStatus.enqueued_at)}</span>
                </div>
              )}
              {jobStatus.started_at && (
                <div>
                  <span className="font-medium">Started:</span>
                  <br />
                  <span className="text-muted-foreground">{formatDate(jobStatus.started_at)}</span>
                </div>
              )}
              {jobStatus.ended_at && (
                <div>
                  <span className="font-medium">Completed:</span>
                  <br />
                  <span className="text-muted-foreground">{formatDate(jobStatus.ended_at)}</span>
                </div>
              )}
            </div>

            {/* Results */}
            {jobStatus.result && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{jobStatus.result.total_sent}</div>
                    <div className="text-sm text-muted-foreground">Emails Sent</div>
                  </div>
                  {jobStatus.result.errors.length > 0 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{jobStatus.result.errors.length}</div>
                      <div className="text-sm text-muted-foreground">Errors</div>
                    </div>
                  )}
                </div>

                {/* Sent Emails Table */}
                {jobStatus.result.sent_emails.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Sent Emails</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Scenario</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Sent At</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {jobStatus.result.sent_emails.map((email, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Badge variant="outline">{email.scenario}</Badge>
                              </TableCell>
                              <TableCell>{email.client}</TableCell>
                              <TableCell className="max-w-xs truncate">{email.subject}</TableCell>
                              <TableCell>${email.amount}</TableCell>
                              <TableCell className="text-sm">{formatDate(email.sent_at)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {/* Errors */}
                {jobStatus.result.errors.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">Errors</h4>
                    <div className="space-y-2">
                      {jobStatus.result.errors.map((error, index) => (
                        <Alert key={index} variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Error Message */}
            {jobStatus.error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{jobStatus.error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 