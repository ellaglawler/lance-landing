"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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
  RefreshCw,
  Info,
  X,
  Link
} from 'lucide-react'
import { testDetection, getUsersWithGmail, type DetectionTestRequest, type DetectionTestResponse, type DetectionResult, type UserWithGmail } from '@/lib/api'

export default function DetectionTester() {
  const [messageIds, setMessageIds] = useState('')
  const [mode, setMode] = useState<'invoice' | 'payment' | 'match'>('match')
  const [userId, setUserId] = useState<string>('default')
  const [users, setUsers] = useState<UserWithGmail[]>([])
  const [results, setResults] = useState<DetectionTestResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [showRawText, setShowRawText] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  // Load users with Gmail access on component mount
  React.useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersWithGmail = await getUsersWithGmail()
        setUsers(usersWithGmail)
      } catch (error) {
        console.error('Failed to load users:', error)
        toast({
          title: "Error",
          description: "Failed to load users with Gmail access",
          variant: "destructive"
        })
      }
    }
    loadUsers()
  }, [toast])



  const handleTest = async () => {
    console.log('🔍 handleTest called')
    console.log('messageIds:', messageIds)
    console.log('mode:', mode)
    console.log('userId:', userId)
    
    if (!messageIds.trim()) {
      console.log('❌ No message IDs provided')
      toast({
        title: "Error",
        description: "Please enter at least one RFC822 Message-ID header",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    console.log('🔄 Starting test...')
    try {
      // Process input to handle Message-ID headers
      const items = messageIds.split(/[,\n]/).map(item => item.trim()).filter(item => item)
      console.log('📝 Processed items:', items)
      
      const processedItems = items.map(item => {
        // Ensure it's a valid Message-ID header format
        if (!item.startsWith('<') || !item.endsWith('>')) {
          // Try to add angle brackets if missing
          if (item.includes('@') && item.includes('.')) {
            return `<${item}>`
          } else {
            toast({
              title: "Warning",
              description: `Invalid Message-ID format: ${item}. Expected format: <...@...>`,
              variant: "destructive"
            })
            return null
          }
        }
        return item
      }).filter(item => item !== null) as string[]

      console.log('✅ Final processed items:', processedItems)

      if (processedItems.length === 0) {
        console.log('❌ No valid items after processing')
        toast({
          title: "Error",
          description: "No valid Message-ID headers found",
          variant: "destructive"
        })
        setLoading(false)
        return
      }

      const request: DetectionTestRequest = {
        message_ids: processedItems,
        mode,
        user_id: userId && userId !== 'default' ? parseInt(userId) : undefined
      }

      console.log('📤 Sending request:', request)
      const response = await testDetection(request)
      console.log('📥 Received response:', response)
      setResults(response)
      
      toast({
        title: "Success",
        description: `Test completed: ${response.summary.successful_fetches}/${response.summary.total_messages} messages processed`
      })
    } catch (error: any) {
      console.error('❌ Error in handleTest:', error)
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to run detection test",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
      console.log('🏁 Test completed')
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

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500'
    if (confidence >= 0.7) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return 'High'
    if (confidence >= 0.7) return 'Medium'
    return 'Low'
  }

  const getConfidenceVariant = (confidence: number) => {
    if (confidence >= 0.8) return 'default'
    if (confidence >= 0.7) return 'secondary'
    return 'destructive'
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const ConfidenceBreakdown = ({ confidence, explanation }: { confidence: number, explanation?: Record<string, any> }) => {
    if (!explanation) return null
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant={getConfidenceVariant(confidence)} className="cursor-help">
              {getConfidenceText(confidence)} ({Math.round(confidence * 100)}%)
              {confidence < 0.7 && <AlertTriangle className="w-3 h-3 ml-1" />}
              <Info className="w-3 h-3 ml-1" />
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm">
            <div className="space-y-2">
              <div className="font-semibold">Confidence Breakdown:</div>
              {explanation.base_score && (
                <div className="text-sm">
                  <span className="text-green-600">+{Math.round(explanation.base_score * 100)}%</span> Base score
                </div>
              )}
              {explanation.bonuses && explanation.bonuses.length > 0 && (
                <div className="space-y-1">
                  {explanation.bonuses.map((bonus: any, idx: number) => (
                    <div key={idx} className="text-sm">
                      <span className="text-blue-600">+{Math.round(bonus.score * 100)}%</span> {bonus.reason}
                    </div>
                  ))}
                </div>
              )}
              {explanation.penalties && explanation.penalties.length > 0 && (
                <div className="space-y-1">
                  {explanation.penalties.map((penalty: any, idx: number) => (
                    <div key={idx} className="text-sm">
                      <span className="text-red-600">-{Math.round(penalty.score * 100)}%</span> {penalty.reason}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
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
            Test invoice and payment detection on specific Gmail messages using RFC822 Message-ID headers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                              <label className="text-sm font-medium">RFC822 Message-ID Headers</label>
              <Textarea
                                  placeholder="Enter RFC822 Message-ID headers (e.g. <CA+fU2QoKeRPMVkB864rk0ukA6c13tZeL481DsqxKhs3heZ10sA@mail.gmail.com>)"
                value={messageIds}
                onChange={(e) => setMessageIds(e.target.value)}
                rows={4}
                className="font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground">
                Example: &lt;CA+fU2QoKeRPMVkB864rk0ukA6c13tZeL481DsqxKhs3heZ10sA@mail.gmail.com&gt;
              </p>
              <p className="text-xs text-muted-foreground">
                💡 <strong>How to find this:</strong> Gmail ⋮ → Show original → Copy Message-ID header
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
              <label className="text-sm font-medium">Gmail Account (Optional)</label>
              <Select value={userId} onValueChange={setUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Use logged-in admin account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">
                    <div className="flex items-center gap-2">
                      <span>Use logged-in admin account</span>
                    </div>
                  </SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      <div className="flex items-center gap-2">
                        <span>{user.email}</span>
                        {user.is_admin && (
                          <Badge variant="secondary" className="text-xs">Admin</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose which user's Gmail account to test against (defaults to your admin account)
              </p>
            </div>
          </div>
          
          <Button 
            onClick={() => {
              console.log('🎯 Button clicked!')
              handleTest()
            }} 
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
                {results.results.map((result, index) => {
                  // Determine card border color based on detection results
                  let borderColor = 'border-l-gray-300' // Default
                  if (result.error || result.gmail_error) {
                    borderColor = 'border-l-red-500' // Error
                  } else if (result.is_invoice && result.invoice_confidence && result.invoice_confidence >= 0.7) {
                    borderColor = 'border-l-green-500' // High confidence invoice
                  } else if (result.is_payment_confirmation && result.payment_confidence && result.payment_confidence >= 0.7) {
                    borderColor = 'border-l-blue-500' // High confidence payment
                  } else if (result.is_invoice || result.is_payment_confirmation) {
                    borderColor = 'border-l-yellow-500' // Low confidence detection
                  }
                  
                  return (
                    <Card key={result.message_id} className={`border-l-4 ${borderColor}`}>
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
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-green-600 font-medium">Yes</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <X className="w-4 h-4 text-red-500" />
                                  <span className="text-red-600 font-medium">No</span>
                                </div>
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
                                <ConfidenceBreakdown 
                                  confidence={result.invoice_confidence} 
                                  explanation={result.invoice_confidence_explanation}
                                />
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
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-green-600 font-medium">Yes</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <X className="w-4 h-4 text-red-500" />
                                  <span className="text-red-600 font-medium">No</span>
                                </div>
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
                                <ConfidenceBreakdown 
                                  confidence={result.payment_confidence} 
                                  explanation={result.payment_confidence_explanation}
                                />
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
                      {mode === 'match' && (
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Invoice Match
                          </h4>
                          {result.matched_invoice_id ? (
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm">
                                  Matched Invoice ID: <Badge variant="outline">{result.matched_invoice_id}</Badge>
                                </div>
                                <div className="text-sm">
                                  Match Reason: <Badge variant="outline">{result.match_reason}</Badge>
                                </div>
                              </div>
                              {result.match_details && (
                                <div className="text-sm space-y-1">
                                  <div className="font-medium">Match Details:</div>
                                  {result.match_details.amount_match !== undefined && (
                                    <div className="flex items-center gap-2">
                                      <span>Amount Match:</span>
                                      {result.match_details.amount_match ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                      ) : (
                                        <X className="w-4 h-4 text-red-500" />
                                      )}
                                    </div>
                                  )}
                                  {result.match_details.invoice_number_match !== undefined && (
                                    <div className="flex items-center gap-2">
                                      <span>Invoice Number:</span>
                                      {result.match_details.invoice_number_match ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                      ) : (
                                        <X className="w-4 h-4 text-red-500" />
                                      )}
                                    </div>
                                  )}
                                  {result.match_details.thread_match !== undefined && (
                                    <div className="flex items-center gap-2">
                                      <span>Gmail Thread:</span>
                                      {result.match_details.thread_match ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                      ) : (
                                        <X className="w-4 h-4 text-red-500" />
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-red-600">
                              <X className="w-4 h-4" />
                              <span className="font-medium">No invoice match found</span>
                            </div>
                          )}
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
                )
                })}
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
