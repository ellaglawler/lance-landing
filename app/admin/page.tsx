"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import AdminGuard from '@/components/admin-guard'
import TestInvoiceGenerator from '@/components/test-invoice-generator'
import { 
  Play, 
  Square, 
  RefreshCw, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Users,
  Activity,
  Settings,
  FileText,
  Zap,
  TestTube
} from 'lucide-react'
import {
  getSchedulerStatus,
  getWebhookStatus,
  searchUsers,
  getParsingErrors,
  getScanLogs,
  startScheduler,
  stopScheduler,
  triggerAllUsersScan,
  triggerUserScan,
  registerGmailWatches,
  getUserDebugInfo,
  type SchedulerStatus,
  type WebhookStatus,
  type AdminUser,
  type UserDebugInfo,
  type ParsingError,
  type ScanLog
} from '@/lib/api'

export default function AdminDashboard() {
  const [schedulerStatus, setSchedulerStatus] = useState<SchedulerStatus | null>(null)
  const [webhookStatus, setWebhookStatus] = useState<WebhookStatus | null>(null)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [parsingErrors, setParsingErrors] = useState<ParsingError[]>([])
  const [scanLogs, setScanLogs] = useState<ScanLog[]>([])
  const [selectedUser, setSelectedUser] = useState<UserDebugInfo | null>(null)
  const [searchEmail, setSearchEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      await Promise.all([
        loadSchedulerStatus(),
        loadWebhookStatus(),
        loadUsers(),
        loadParsingErrors(),
        loadScanLogs()
      ])
    } catch (error: any) {
      if (error?.response?.status === 403) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard",
          variant: "destructive"
        })
        router.push('/dashboard')
        return
      }
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const loadSchedulerStatus = async () => {
    try {
      const data = await getSchedulerStatus()
      setSchedulerStatus(data)
    } catch (error) {
      console.error('Failed to load scheduler status:', error)
    }
  }

  const loadWebhookStatus = async () => {
    try {
      const data = await getWebhookStatus()
      setWebhookStatus(data)
    } catch (error) {
      console.error('Failed to load webhook status:', error)
    }
  }

  const loadUsers = async () => {
    try {
      const data = await searchUsers()
      setUsers(data)
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  const loadParsingErrors = async () => {
    try {
      const data = await getParsingErrors({ limit: 50 })
      setParsingErrors(data)
    } catch (error) {
      console.error('Failed to load parsing errors:', error)
    }
  }

  const loadScanLogs = async () => {
    try {
      const data = await getScanLogs({ limit: 50 })
      setScanLogs(data)
    } catch (error) {
      console.error('Failed to load scan logs:', error)
    }
  }

  const handleSchedulerAction = async (action: 'start' | 'stop') => {
    try {
      if (action === 'start') {
        await startScheduler()
      } else {
        await stopScheduler()
      }
      
      toast({
        title: "Success",
        description: `Scheduler ${action}ed successfully`
      })
      await loadSchedulerStatus()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} scheduler`,
        variant: "destructive"
      })
    }
  }

  const handleScanAction = async (type: 'all' | 'user', userId?: number) => {
    try {
      setScanning(true)
      
      if (type === 'all') {
        await triggerAllUsersScan()
      } else if (userId) {
        await triggerUserScan(userId)
      }
      
      toast({
        title: "Success",
        description: `Scan triggered successfully`
      })
      await loadDashboardData()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trigger scan",
        variant: "destructive"
      })
    } finally {
      setScanning(false)
    }
  }

  const handleRegisterWatches = async () => {
    try {
      const data = await registerGmailWatches()
      toast({
        title: "Success",
        description: data.message
      })
      await loadWebhookStatus()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register Gmail watches",
        variant: "destructive"
      })
    }
  }

  const searchUser = async () => {
    if (!searchEmail) return
    
    try {
      const data = await searchUsers({ email: searchEmail })
      if (data.length > 0) {
        await loadUserDebugInfo(data[0].id)
      } else {
        toast({
          title: "Not Found",
          description: "No user found with that email",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search user",
        variant: "destructive"
      })
    }
  }

  const loadUserDebugInfo = async (userId: number) => {
    try {
      const data = await getUserDebugInfo(userId)
      setSelectedUser(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load user debug info",
        variant: "destructive"
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Healthy</Badge>
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500"><AlertTriangle className="w-3 h-3 mr-1" />Warning</Badge>
      default:
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Error</Badge>
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <AdminGuard>
      <div className="container mx-auto p-6 pt-32">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage invoice scanning system</p>
          </div>
          <Button onClick={loadDashboardData} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="test-invoices">Test Invoices</TabsTrigger>
            <TabsTrigger value="errors">Error Logs</TabsTrigger>
            <TabsTrigger value="scans">Scan Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{webhookStatus?.webhook_setup.total_users || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {webhookStatus?.webhook_setup.users_with_gmail || 0} with Gmail connected
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scheduler Status</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    {schedulerStatus?.scheduler_running ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm font-medium">
                      {schedulerStatus?.scheduler_running ? 'Running' : 'Stopped'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {schedulerStatus?.job_count || 0} active jobs
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Webhook Health</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(webhookStatus?.health.status || 'unknown')}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {webhookStatus?.activity.recent_activity_1h || 0} active in last hour
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Errors</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{parsingErrors.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Last 50 parsing errors
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common admin tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleSchedulerAction(schedulerStatus?.scheduler_running ? 'stop' : 'start')}
                      variant={schedulerStatus?.scheduler_running ? 'destructive' : 'default'}
                    >
                      {schedulerStatus?.scheduler_running ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {schedulerStatus?.scheduler_running ? 'Stop' : 'Start'} Scheduler
                    </Button>
                    <Button 
                      onClick={() => handleScanAction('all')} 
                      disabled={scanning}
                      variant="outline"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Scan All Users
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => {
                        const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
                        const testInvoicesTab = tabsList?.querySelector('[value="test-invoices"]') as HTMLElement
                        testInvoicesTab?.click()
                      }}
                      variant="outline"
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      Generate Test Invoices
                    </Button>
                  </div>
                  <Button 
                    onClick={handleRegisterWatches} 
                    variant="outline"
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Register Gmail Watches
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Search</CardTitle>
                  <CardDescription>Find and debug specific users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Search by email..."
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && searchUser()}
                    />
                    <Button onClick={searchUser} variant="outline">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  {selectedUser && (
                    <div className="space-y-2">
                      <h4 className="font-medium">{selectedUser.user.email}</h4>
                      <div className="text-sm space-y-1">
                        <p>Total Invoices: {selectedUser.invoice_stats.total_invoices}</p>
                        <p>This Week: {selectedUser.invoice_stats.invoices_this_week}</p>
                        <p>This Month: {selectedUser.invoice_stats.invoices_this_month}</p>
                        <p>Last Scan: {selectedUser.user.last_gmail_scan ? formatDate(selectedUser.user.last_gmail_scan) : 'Never'}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scheduler" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduler Control</CardTitle>
                <CardDescription>Manage periodic scanning jobs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Status: {schedulerStatus?.scheduler_running ? 'Running' : 'Stopped'}</p>
                    <p className="text-sm text-muted-foreground">
                      {schedulerStatus?.job_count || 0} active jobs
                    </p>
                  </div>
                  <Button 
                    onClick={() => handleSchedulerAction(schedulerStatus?.scheduler_running ? 'stop' : 'start')}
                    variant={schedulerStatus?.scheduler_running ? 'destructive' : 'default'}
                  >
                    {schedulerStatus?.scheduler_running ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {schedulerStatus?.scheduler_running ? 'Stop' : 'Start'} Scheduler
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Active Jobs</h4>
                  {schedulerStatus?.jobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{job.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Next run: {job.next_run_time ? formatDate(job.next_run_time) : 'Not scheduled'}
                        </p>
                      </div>
                      <Badge variant="outline">{job.trigger}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Status</CardTitle>
                <CardDescription>Monitor Gmail webhook health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{webhookStatus?.webhook_setup.total_users || 0}</div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{webhookStatus?.webhook_setup.users_with_gmail || 0}</div>
                    <p className="text-sm text-muted-foreground">With Gmail</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{webhookStatus?.webhook_setup.users_with_history_id || 0}</div>
                    <p className="text-sm text-muted-foreground">With Webhooks</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Health Status</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusBadge(webhookStatus?.health.status || 'unknown')}
                    </div>
                  </div>
                  <Button onClick={handleRegisterWatches} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Register Watches
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Activity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded">
                      <div className="text-xl font-bold">{webhookStatus?.activity.recent_activity_1h || 0}</div>
                      <p className="text-sm text-muted-foreground">Active (1h)</p>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <div className="text-xl font-bold">{webhookStatus?.activity.daily_activity || 0}</div>
                      <p className="text-sm text-muted-foreground">Active (24h)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Monitor user scanning activity</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Last Scan</TableHead>
                      <TableHead>Gmail Status</TableHead>
                      <TableHead>Webhook</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.last_gmail_scan ? formatDate(user.last_gmail_scan) : 'Never'}
                        </TableCell>
                        <TableCell>
                          {user.gmail_access_token && user.gmail_refresh_token ? (
                            <Badge variant="default" className="bg-green-500">Connected</Badge>
                          ) : (
                            <Badge variant="destructive">Not Connected</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {user.gmail_history_id ? (
                            <Badge variant="outline">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button 
                            onClick={() => handleScanAction('user', user.id)}
                            size="sm"
                            variant="outline"
                            disabled={scanning}
                          >
                            Scan
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test-invoices" className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <TestTube className="w-6 h-6" />
              <div>
                <h2 className="text-2xl font-bold">Test Invoice Generator</h2>
                <p className="text-muted-foreground">Generate simulated invoice emails for testing the webhook pipeline</p>
              </div>
            </div>
            <TestInvoiceGenerator />
          </TabsContent>

          <TabsContent value="errors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Parsing Errors</CardTitle>
                <CardDescription>Recent invoice parsing failures</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Message ID</TableHead>
                      <TableHead>Error Type</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsingErrors.map((error) => (
                      <TableRow key={error.id}>
                        <TableCell>{error.user_id || 'Unknown'}</TableCell>
                        <TableCell className="font-mono text-xs">{error.message_id}</TableCell>
                        <TableCell>
                          {error.error_type ? (
                            <Badge variant="outline">{error.error_type}</Badge>
                          ) : (
                            <span className="text-muted-foreground">None</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{error.reason}</TableCell>
                        <TableCell>{formatDate(error.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scan Activity</CardTitle>
                <CardDescription>Recent scanning activity logs</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Email</TableHead>
                      <TableHead>Scan Type</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scanLogs.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell>{log.user_email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.scan_type}</Badge>
                        </TableCell>
                        <TableCell>{formatDate(log.scan_timestamp)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  )
} 