"use client"

import { useState } from "react"
import {
  Clock,
  Zap,
  DollarSign,
  Filter,
  CheckCircle,
  Calendar,
  MessageSquare,
  Bot,
  Mail,
  AlertTriangle,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LanceDashboard() {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [amountFilter, setAmountFilter] = useState("all")
  const [daysFilter, setDaysFilter] = useState("all")

  const overdueInvoices = [
    {
      id: 1,
      client: "Acme Design Co.",
      amount: 1200,
      daysOverdue: 14,
      avatar: "AD",
      status: "overdue",
      tone: "Polite",
    },
    {
      id: 2,
      client: "TechStart Inc.",
      amount: 850,
      daysOverdue: 7,
      avatar: "TS",
      status: "overdue",
      tone: "Polite",
    },
    {
      id: 3,
      client: "Creative Studio",
      amount: 400,
      daysOverdue: 21,
      avatar: "CS",
      status: "overdue",
      tone: "Firm",
    },
  ]

  const pastInvoices = [
    {
      id: 101,
      client: "Blue Corp",
      amount: 2500,
      avatar: "BC",
      dateSent: "2024-01-15",
      datePaid: "2024-01-18",
      messageType: "Polite",
      messageSent: "Hi there! I hope you're doing well! I wanted to follow up on invoice #101...",
      daysToPayment: 3,
      status: "paid",
    },
    {
      id: 102,
      client: "StartupXYZ",
      amount: 1800,
      avatar: "SX",
      dateSent: "2024-01-10",
      datePaid: "2024-01-25",
      messageType: "Professional",
      messageSent: "Hello, I'm writing to follow up on invoice #102 for $1,800...",
      daysToPayment: 15,
      status: "paid",
    },
    {
      id: 103,
      client: "Design Studio Pro",
      amount: 950,
      avatar: "DS",
      dateSent: "2024-01-08",
      datePaid: "2024-01-12",
      messageType: "Polite",
      messageSent: "Hi there! I hope you're doing well! I wanted to follow up on invoice #103...",
      daysToPayment: 4,
      status: "paid",
    },
  ]

  // Activity feed data
  const activityFeed = [
    {
      id: 1,
      type: "follow_up_sent",
      message: "Sent polite follow-up to Acme Design Co.",
      time: "2 minutes ago",
      icon: Mail,
      color: "text-blue-400",
    },
    {
      id: 2,
      type: "overdue_detected",
      message: "Detected Creative Studio invoice is now 21 days overdue",
      time: "1 hour ago",
      icon: AlertTriangle,
      color: "text-orange-400",
    },
    {
      id: 3,
      type: "payment_received",
      message: "Payment received from Blue Corp - $2,500",
      time: "3 hours ago",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      id: 4,
      type: "follow_up_scheduled",
      message: "Scheduled follow-up for TechStart Inc. in 2 days",
      time: "5 hours ago",
      icon: Clock,
      color: "text-purple-400",
    },
    {
      id: 5,
      type: "tone_adjusted",
      message: "Switched to firm tone for Creative Studio (21+ days overdue)",
      time: "1 day ago",
      icon: Bot,
      color: "text-yellow-400",
    },
  ]

  // Combine all invoices with overdue first, then paid
  const allInvoices = [...overdueInvoices, ...pastInvoices]

  const getFilteredInvoices = () => {
    let filtered = allInvoices

    // Filter by amount
    if (amountFilter !== "all") {
      filtered = filtered.filter((invoice) => {
        if (amountFilter === "0-500") return invoice.amount <= 500
        if (amountFilter === "500-1000") return invoice.amount > 500 && invoice.amount <= 1000
        if (amountFilter === "1000-2500") return invoice.amount > 1000 && invoice.amount <= 2500
        if (amountFilter === "2500+") return invoice.amount > 2500
        return true
      })
    }

    // Filter by days overdue (only applies to overdue invoices)
    if (daysFilter !== "all") {
      filtered = filtered.filter((invoice) => {
        if (invoice.status === "paid") return true // Always show paid invoices
        if (daysFilter === "1-7") return "daysOverdue" in invoice && invoice.daysOverdue >= 1 && invoice.daysOverdue <= 7
        if (daysFilter === "8-14") return "daysOverdue" in invoice && invoice.daysOverdue >= 8 && invoice.daysOverdue <= 14
        if (daysFilter === "15-30") return "daysOverdue" in invoice && invoice.daysOverdue >= 15 && invoice.daysOverdue <= 30
        if (daysFilter === "30+") return "daysOverdue" in invoice && invoice.daysOverdue > 30
        return true
      })
    }

    return filtered
  }

  const filteredInvoices = getFilteredInvoices()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getToneColor = (tone: string) => {
    if (tone === "Polite") return "bg-green-100 text-green-800 border-green-200"
    if (tone === "Professional") return "bg-blue-100 text-blue-800 border-blue-200"
    if (tone === "Firm") return "bg-red-100 text-red-800 border-red-200"
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 pt-32">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Hey Ella,</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Avatar className="ring-4 ring-blue-500/20 ring-offset-2 ring-offset-slate-900">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-blue-600 text-white font-bold">E</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Lance Activity Bar */}
        <Card className="bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">Lance Activity</CardTitle>
                  <CardDescription className="text-slate-400">
                    Your AI agent is actively working on {overdueInvoices.length} overdue invoices
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-medium">Active</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Visual Timeline */}
            <div className="mb-6 p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-300">Activity Timeline</span>
                <span className="text-xs text-slate-400">Last 24 hours</span>
              </div>
              <div className="relative">
                {/* Timeline base line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-600 transform -translate-y-1/2"></div>

                {/* Timeline points */}
                <div className="relative flex justify-between items-center h-8">
                  {/* Recent activity points */}
                  <div className="relative">
                    <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap">
                      2m
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-orange-400 rounded-full border-2 border-slate-800"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap">
                      1h
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap">
                      3h
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-2 h-2 bg-purple-400 rounded-full border-2 border-slate-800"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap">
                      5h
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-slate-800"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap">
                      1d
                    </div>
                  </div>

                  {/* Additional smaller points for more activity */}
                  <div className="relative">
                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full border border-slate-800"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">
                      2d
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-2 h-2 bg-green-300 rounded-full border border-slate-800"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">
                      3d
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-1.5 h-1.5 bg-orange-300 rounded-full border border-slate-800"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">
                      4d
                    </div>
                  </div>
                </div>

                {/* Activity summary */}
                <div className="mt-8 flex items-center justify-center gap-6 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-slate-400">Follow-ups</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-slate-400">Detections</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-400">Payments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-slate-400">Scheduling</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-slate-400">Adjustments</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Timeline Text Feed */}
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {activityFeed.map((activity, index) => {
                const IconComponent = activity.icon
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <div className={`p-1.5 rounded-full bg-slate-600 ${activity.color}`}>
                      <IconComponent className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">{activity.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Invoice List */}
        <Card className="bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <DollarSign className="h-6 w-6" />
                  Invoice List
                </CardTitle>
                <CardDescription className="text-slate-100">
                  {overdueInvoices.length} overdue • {pastInvoices.length} completed
                </CardDescription>
              </div>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Zap className="h-4 w-4 mr-2" />
                Send All Reminders
              </Button>
            </div>
          </CardHeader>

          {/* Filter Dropdown */}
          <div className="bg-slate-750 border-b border-slate-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                {(amountFilter !== "all" || daysFilter !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setAmountFilter("all")
                      setDaysFilter("all")
                    }}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <div className="text-sm text-slate-400">
                Showing {filteredInvoices.length} of {allInvoices.length} invoices
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 p-4 bg-slate-700 rounded-lg border border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Amount Filter */}
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-3 block">Amount ($)</label>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "All amounts" },
                        { value: "0-500", label: "$0 - $500" },
                        { value: "500-1000", label: "$500 - $1,000" },
                        { value: "1000-2500", label: "$1,000 - $2,500" },
                        { value: "2500+", label: "$2,500+" },
                      ].map((option) => (
                        <Button
                          key={option.value}
                          variant={amountFilter === option.value ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setAmountFilter(option.value)}
                          className={
                            amountFilter === option.value
                              ? "w-full justify-start bg-blue-600 text-white hover:bg-blue-700"
                              : "w-full justify-start text-slate-300 hover:bg-slate-600 hover:text-white"
                          }
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Days Overdue Filter */}
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-3 block">Days Overdue</label>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "All overdue" },
                        { value: "1-7", label: "1-7 days" },
                        { value: "8-14", label: "8-14 days" },
                        { value: "15-30", label: "15-30 days" },
                        { value: "30+", label: "30+ days" },
                      ].map((option) => (
                        <Button
                          key={option.value}
                          variant={daysFilter === option.value ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setDaysFilter(option.value)}
                          className={
                            daysFilter === option.value
                              ? "w-full justify-start bg-blue-600 text-white hover:bg-blue-700"
                              : "w-full justify-start text-slate-300 hover:bg-slate-600 hover:text-white"
                          }
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <CardContent className="space-y-4 p-6">
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-slate-400 text-lg mb-2">No invoices in this category</div>
                <div className="text-slate-500 text-sm">Try selecting a different filter</div>
              </div>
            ) : (
              filteredInvoices.map((invoice) => {
                if (invoice.status === "paid") {
                  // Render paid invoice
                  return (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-5 border-l-4 border-l-green-400 bg-slate-700/50 hover:bg-slate-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] opacity-75"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 ring-4 ring-green-500/30 shadow-lg">
                          <AvatarFallback className="bg-green-600 text-white font-bold text-lg">
                            {invoice.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-xl text-white">{invoice.client}</div>
                          <div className="text-sm text-slate-300 font-medium">
                            <span className="font-bold text-green-400">${invoice.amount.toLocaleString()}</span> • Paid
                            {'daysToPayment' in invoice ? ` in ${invoice.daysToPayment} days` : ''}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Sent: {'dateSent' in invoice ? formatDate(invoice.dateSent) : ''}
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Paid: {'datePaid' in invoice ? formatDate(invoice.datePaid) : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`font-semibold border ${'messageType' in invoice ? getToneColor(invoice.messageType) : ''}`}>
                          {'messageType' in invoice ? invoice.messageType : ''}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInvoice({ ...invoice, isPastInvoice: true })}
                          className="font-semibold bg-slate-700 border-slate-600 text-slate-300 hover:bg-green-600 hover:border-green-600 hover:text-white transition-all duration-300 hover:scale-105"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  )
                } else {
                  // Render overdue invoice
                  const getStatusColor = (days: number) => {
                    if (days <= 7) return "border-l-yellow-400 bg-slate-700/50 hover:bg-slate-700"
                    if (days <= 14) return "border-l-orange-400 bg-slate-700/50 hover:bg-slate-700"
                    return "border-l-red-400 bg-slate-700/50 hover:bg-slate-700"
                  }

                  const getStatusText = (days: number) => {
                    if (days <= 7) return "Recently overdue"
                    if (days <= 14) return "Needs attention"
                    return "Urgent follow-up"
                  }

                  const getStatusTextColor = (days: number) => {
                    if (days <= 7) return "text-yellow-400"
                    if (days <= 14) return "text-orange-400"
                    return "text-red-400"
                  }

                  return (
                    <div
                      key={invoice.id}
                      className={`flex items-center justify-between p-5 border-l-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${'daysOverdue' in invoice ? getStatusColor(invoice.daysOverdue) : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 ring-4 ring-slate-600 shadow-lg">
                          <AvatarFallback className="bg-blue-600 text-white font-bold text-lg">
                            {invoice.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-xl text-white">{invoice.client}</div>
                          <div className="text-sm text-slate-300 font-medium">
                            <span className="font-bold text-green-400">${invoice.amount.toLocaleString()}</span> •{" "}
                            {'daysOverdue' in invoice ? `${invoice.daysOverdue} days overdue` : ''}
                          </div>
                          <div className={`text-xs mt-1 font-medium ${'daysOverdue' in invoice ? getStatusTextColor(invoice.daysOverdue) : ''}`}>
                            {'daysOverdue' in invoice ? getStatusText(invoice.daysOverdue) : ''}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={'tone' in invoice && invoice.tone === "Polite" ? "secondary" : "outline"}
                          className="font-semibold bg-slate-700 text-slate-300 border-slate-600"
                        >
                          {'tone' in invoice ? `${invoice.tone} Tone` : ''}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInvoice(invoice)}
                          className="font-semibold bg-slate-700 border-slate-600 text-slate-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  )
                }
              })
            )}
          </CardContent>
        </Card>

        {/* Preview Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedInvoice.isPastInvoice ? "Invoice Details" : "Preview Reminder"}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedInvoice(null)}
                    className="hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-all duration-300"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-700 p-5 rounded-xl border border-slate-600">
                    <div className="text-sm text-slate-300 mb-2 font-medium">To: {selectedInvoice.client}</div>
                    <div className="text-sm text-slate-300 mb-2 font-medium">
                      Subject: {selectedInvoice.isPastInvoice ? "Payment Reminder" : "Friendly reminder"} - Invoice #
                      {selectedInvoice.id}
                    </div>
                    <div className="text-sm text-slate-300 font-medium">
                      Amount: ${selectedInvoice.amount.toLocaleString()}
                    </div>
                    {selectedInvoice.isPastInvoice && (
                      <div className="mt-3 pt-3 border-t border-slate-600">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Date Sent:</span>
                            <div className="text-slate-300 font-medium">{formatDate(selectedInvoice.dateSent)}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Date Paid:</span>
                            <div className="text-green-400 font-medium">{formatDate(selectedInvoice.datePaid)}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Message Type:</span>
                            <div className="text-slate-300 font-medium">{selectedInvoice.messageType}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Days to Payment:</span>
                            <div className="text-blue-400 font-medium">{selectedInvoice.daysToPayment} days</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {!selectedInvoice.isPastInvoice && (
                    <div className="space-y-4">
                      <div className="text-sm font-medium text-slate-300 mb-3">Select Tone:</div>
                      <div className="flex gap-3">
                        <Button
                          variant={selectedInvoice.tone === "Polite" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedInvoice({ ...selectedInvoice, tone: "Polite" })}
                          className={
                            selectedInvoice.tone === "Polite"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                          }
                        >
                          Polite
                        </Button>
                        <Button
                          variant={selectedInvoice.tone === "Professional" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedInvoice({ ...selectedInvoice, tone: "Professional" })}
                          className={
                            selectedInvoice.tone === "Professional"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                          }
                        >
                          Professional
                        </Button>
                        <Button
                          variant={selectedInvoice.tone === "Firm" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedInvoice({ ...selectedInvoice, tone: "Firm" })}
                          className={
                            selectedInvoice.tone === "Firm"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                          }
                        >
                          Firm
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 bg-slate-700/30">
                    <div className="text-sm leading-relaxed text-slate-300">
                      {selectedInvoice.isPastInvoice ? (
                        <div>
                          <div className="text-slate-400 text-xs mb-2">Message that was sent:</div>
                          <p>{selectedInvoice.messageSent}</p>
                        </div>
                      ) : (
                        <>
                          {selectedInvoice.tone === "Polite" && (
                            <>
                              <p>Hi there!</p>
                              <br />
                              <p>
                                I hope you're doing well! I wanted to follow up on invoice #{selectedInvoice.id} for $
                                {selectedInvoice.amount.toLocaleString()}, which was due {selectedInvoice.daysOverdue}{" "}
                                days ago.
                              </p>
                              <br />
                              <p>
                                I know things can get busy, so I wanted to send a gentle reminder. If you have any
                                questions about the invoice or need any additional information, please don't hesitate to
                                reach out!
                              </p>
                              <br />
                              <p>Thanks for your time, and I look forward to hearing from you soon!</p>
                              <br />
                              <p>Best regards</p>
                            </>
                          )}
                          {selectedInvoice.tone === "Professional" && (
                            <>
                              <p>Hello,</p>
                              <br />
                              <p>
                                I'm writing to follow up on invoice #{selectedInvoice.id} for $
                                {selectedInvoice.amount.toLocaleString()}, which was due {selectedInvoice.daysOverdue}{" "}
                                days ago.
                              </p>
                              <br />
                              <p>
                                Please let me know when I can expect payment, or if there are any issues that need to be
                                addressed. I'm happy to discuss payment arrangements if needed.
                              </p>
                              <br />
                              <p>Thank you for your prompt attention to this matter.</p>
                              <br />
                              <p>Best regards</p>
                            </>
                          )}
                          {selectedInvoice.tone === "Firm" && (
                            <>
                              <p>Dear {selectedInvoice.client},</p>
                              <br />
                              <p>
                                This is a formal notice regarding overdue invoice #{selectedInvoice.id} for $
                                {selectedInvoice.amount.toLocaleString()}, which was due {selectedInvoice.daysOverdue}{" "}
                                days ago.
                              </p>
                              <br />
                              <p>
                                Immediate payment is required to avoid any disruption to our business relationship.
                                Please remit payment within 5 business days of receiving this notice.
                              </p>
                              <br />
                              <p>
                                If payment has already been sent, please disregard this notice and provide payment
                                confirmation.
                              </p>
                              <br />
                              <p>Regards</p>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    {selectedInvoice.isPastInvoice ? (
                      <Button
                        className="w-full bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 font-semibold transition-all duration-300"
                        onClick={() => setSelectedInvoice(null)}
                      >
                        Close
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="flex-1 bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 font-semibold transition-all duration-300"
                          onClick={() => setSelectedInvoice(null)}
                        >
                          Edit Message
                        </Button>
                        <Button
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          onClick={() => {
                            setSelectedInvoice(null)
                          }}
                        >
                          Send Reminder
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
