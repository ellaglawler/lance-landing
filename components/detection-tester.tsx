"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useToast } from '@/hooks/use-toast'
import { 
  Play, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  DollarSign,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  Zap,
  TestTube,
  RefreshCw
} from 'lucide-react'
import { testDetection, type DetectionTestRequest, type DetectionTestResponse, type DetectionResult } from '@/lib/api'

export default function DetectionTester() {
  const [messageIds, setMessageIds] = useState('')
  const [mode, setMode] = useState<'invoice' | 'payment' | 'match'>('match')
  const [userId, setUserId] = useState<string>('')
  const [results, setResults] = useState<DetectionTestResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [showRawText, setShowRawText] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  const extractMessageIdFromUrl = (url: string): string | null => {
    // Handle different Gmail URL formats
    const patterns = [
      /permmsgid=msg-f:(\d+)/,  // New Gmail format (web_id/threadId)
      /#inbox\/([a-zA-Z0-9]+)/,  // Classic Gmail format (API message ID)
      /#search\/([a-zA-Z0-9]+)/,  // Search results (API message ID)
      /#sent\/([a-zA-Z0-9]+)/,    // Sent folder (API message ID)
      /#all\/([a-zA-Z0-9]+)/,     // All mail (API message ID)
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return match[1]
      }
    }
    return null
  }

  const isMessageIdHeader = (input: string): boolean => {
    // Message-ID headers look like: <CA+...@mail.gmail.com>
    return input.startsWith('<') && input.endsWith('>') && input.includes('@')
  }

  const handleTest = async () => {
    if (!messageIds.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one Gmail Message ID or URL",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      // Process input to handle URLs, Message-ID headers, and message IDs
      const items = messageIds.split(/[,\n]/).map(item => item.trim()).filter(item => item)
      const processedItems = items.map(item => {
        if (item.startsWith('http') && item.includes('mail.google.com')) {
          const messageId = extractMessageIdFromUrl(item)
          if (messageId) {
            return messageId
          } else {
            toast({
              title: "Warning",
              description: `Could not extract Message ID from URL: ${item}`,
              variant: "destructive"
            })
            return null
          }
        } else if (isMessageIdHeader(item)) {
          // Keep Message-ID headers as-is (they'll be resolved on the backend)
          return item
        }
        return item
      }).filter(item => item !== null) as string[]

      if (processedItems.length === 0) {
        toast({
          title: "Error",
          description: "No valid Message IDs or URLs found",
          variant: "destructive"
        })
        setLoading(false)
        return
      }

      const request: DetectionTestRequest = {
        message_ids: processedItems,
        mode,
        user_id: userId ? parseInt(userId) : undefined
      }

      const response = await testDetection(request)
      setResults(response)
      
      toast({
        title: "Success",
        description: `Test completed: ${response.summary.successful_fetches}/${response.summary.total_messages} messages processed`
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to run detection test",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Text copied to clipboard"
    })
  }

  const toggleRawText = (messageId: string) => {
    setShowRawText(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500'
    if (confidence >= 0.6) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return 'High'
    if (confidence >= 0.6) return 'Medium'
    return 'Low'
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5" />
            Manual Email Detection Tester
          </CardTitle>
          <CardDescription>
            Test invoice and payment detection on specific Gmail messages by Message ID, Gmail URL, or Message-ID header
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Gmail Message IDs or URLs</label>
              <Textarea
                placeholder="Enter Gmail Message IDs, URLs, or Message-ID headers (comma or newline separated)"
                value={messageIds}
                onChange={(e) => setMessageIds(e.target.value)}
                rows={4}
                className="font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground">
                Examples: 18c1234567890abcdef, https://mail.google.com/mail/u/0/?ik=cf6fad45e1&view=om&permmsgid=msg-f:1839743770647179390, &lt;CA+...@mail.gmail.com&gt;
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Detection Mode</label>
              <Select value={mode} onValueChange={(value: any) => setMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoice">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Invoice Detection
                    </div>
                  </SelectItem>
                  <SelectItem value="payment">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Payment Detection
                    </div>
                  </SelectItem>
                  <SelectItem value="match">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Matching Attempt (Both)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">User ID (Optional)</label>
              <Input
                placeholder="Leave empty for auto-select"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                type="number"
              />
              <p className="text-xs text-muted-foreground">
                Specific user's Gmail to test against
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleTest} 
            disabled={loading || !messageIds.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Running Test...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Detection Test
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              Test completed at {formatDate(results.test_timestamp)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              <div className="text-center p-3 border rounded">
                <div className="text-2xl font-bold">{results.summary.total_messages}</div>
                <p className="text-sm text-muted-foreground">Total Messages</p>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-2xl font-bold text-green-600">{results.summary.successful_fetches}</div>
                <p className="text-sm text-muted-foreground">Successful Fetches</p>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-2xl font-bold text-blue-600">{results.summary.invoice_detections}</div>
                <p className="text-sm text-muted-foreground">Invoice Detections</p>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-2xl font-bold text-purple-600">{results.summary.payment_detections}</div>
                <p className="text-sm text-muted-foreground">Payment Detections</p>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-2xl font-bold text-orange-600">{results.summary.successful_matches}</div>
                <p className="text-sm text-muted-foreground">Successful Matches</p>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-2xl font-bold text-red-600">{results.summary.errors}</div>
                <p className="text-sm text-muted-foreground">Errors</p>
              </div>
            </div>

            {/* Results */}
            <Tabs defaultValue="results" className="space-y-4">
              <TabsList>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="raw">Raw Data</TabsTrigger>
              </TabsList>

              <TabsContent value="results" className="space-y-4">
                {results.results.map((result, index) => (
                  <Card key={result.message_id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            {result.message_id}
                          </Badge>
                          {result.error && (
                            <Badge variant="destructive">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Error
                            </Badge>
                          )}
                          {result.gmail_error && (
                            <Badge variant="destructive">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Gmail Error
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleRawText(result.message_id)}
                          >
                            {showRawText[result.message_id] ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-1" />
                                Hide Text
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-1" />
                                Show Text
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(result.raw_text)}
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </div>
                      
                      {result.subject && (
                        <p className="text-sm font-medium">{result.subject}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {result.from_email && (
                          <span>From: {result.from_email}</span>
                        )}
                        {result.to_email && (
                          <span>To: {result.to_email}</span>
                        )}
                        {result.date && (
                          <span>Date: {formatDate(result.date)}</span>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Error Display */}
                      {(result.error || result.gmail_error) && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded">
                          <p className="text-sm text-red-800">
                            {result.error || result.gmail_error}
                          </p>
                        </div>
                      )}

                      {/* Invoice Detection Results */}
                      {mode !== 'payment' && (
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Invoice Detection
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Is Invoice:</span>
                              {result.is_invoice ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            {result.invoice_amount && (
                              <div className="text-sm">
                                Amount: {formatCurrency(result.invoice_amount, result.invoice_currency)}
                              </div>
                            )}
                            {result.invoice_due_date && (
                              <div className="text-sm">
                                Due: {formatDate(result.invoice_due_date)}
                              </div>
                            )}
                            {result.invoice_confidence !== undefined && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm">Confidence:</span>
                                <Badge className={getConfidenceColor(result.invoice_confidence)}>
                                  {getConfidenceText(result.invoice_confidence)} ({Math.round(result.invoice_confidence * 100)}%)
                                </Badge>
                              </div>
                            )}
                          </div>
                          {result.invoice_client_name && (
                            <div className="text-sm">
                              Client: {result.invoice_client_name}
                            </div>
                          )}
                          {result.invoice_number && (
                            <div className="text-sm">
                              Invoice #: {result.invoice_number}
                            </div>
                          )}
                          {result.invoice_status && (
                            <div className="text-sm">
                              Status: <Badge variant="outline">{result.invoice_status}</Badge>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Payment Detection Results */}
                      {mode !== 'invoice' && (
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Payment Detection
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Confirmation:</span>
                              {result.is_payment_confirmation ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Pending:</span>
                              {result.is_payment_pending ? (
                                <Clock className="w-4 h-4 text-yellow-500" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            {result.payment_amount && (
                              <div className="text-sm">
                                Amount: {formatCurrency(result.payment_amount, result.payment_currency)}
                              </div>
                            )}
                            {result.payment_confidence !== undefined && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm">Confidence:</span>
                                <Badge className={getConfidenceColor(result.payment_confidence)}>
                                  {getConfidenceText(result.payment_confidence)} ({Math.round(result.payment_confidence * 100)}%)
                                </Badge>
                              </div>
                            )}
                          </div>
                          {result.payment_date && (
                            <div className="text-sm">
                              Payment Date: {formatDate(result.payment_date)}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Matching Results */}
                      {mode === 'match' && result.matched_invoice_id && (
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Invoice Match
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm">
                              Matched Invoice ID: <Badge variant="outline">{result.matched_invoice_id}</Badge>
                            </div>
                            <div className="text-sm">
                              Match Reason: <Badge variant="outline">{result.match_reason}</Badge>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Raw Text */}
                      {showRawText[result.message_id] && (
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                              <ChevronDown className="w-4 h-4 mr-2" />
                              Raw Email Text
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2">
                            <div className="p-3 bg-gray-50 border rounded font-mono text-xs whitespace-pre-wrap max-h-64 overflow-y-auto">
                              {result.raw_text || 'No text content'}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="raw">
                <div className="space-y-4">
                  {results.results.map((result) => (
                    <Card key={result.message_id}>
                      <CardHeader>
                        <CardTitle className="text-sm font-mono">{result.message_id}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Headers</h4>
                            <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
                              {JSON.stringify(result.headers, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Raw Text</h4>
                            <pre className="text-xs bg-gray-50 p-3 rounded whitespace-pre-wrap max-h-64 overflow-y-auto">
                              {result.raw_text || 'No text content'}
                            </pre>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Full Result</h4>
                            <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
                              {JSON.stringify(result, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
