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
  BarChart2,
  BadgeDollarSign,
  Hourglass,
  AlertCircle,
  Pin,
  CircleDot,
  Circle,
  ChevronUp,
  ChevronDown,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useCallback } from "react"
import { getInvoices } from "@/lib/api"

// Email and Invoice types for type safety
interface Email {
  id: string;
  date: string;
  subject: string;
  tone: string;
  content: string;
}

interface InvoiceUI {
  id: number;
  client: string;
  amount: number;
  avatar: string;
  status: "overdue" | "paid" | "pending_response";
  tone?: string;
  daysOverdue?: number;
  emailThread?: Email[];
  dateSent?: string;
  datePaid?: string;
  messageType?: string;
  daysToPayment?: number;
  messageSent?: string;
  isPastInvoice?: boolean;
  lastReminderSent?: string;
  nextFollowUpDate?: string;
}

export default function LanceDashboard({ isDemoMode = true }: { isDemoMode?: boolean }) {
  // Demo mode toggle (set to true for demo/mock data)
  // const demoMode = true // Set to true to enable demo mode
  const demoMode = isDemoMode;
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceUI | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [amountFilter, setAmountFilter] = useState("all")
  const [daysFilter, setDaysFilter] = useState("all")
  const [showEmailThread, setShowEmailThread] = useState(false)
  const [isEditingMessage, setIsEditingMessage] = useState(false)

  // Unified mock data for demo mode (matches getInvoices structure)
  const mockInvoices = [
    // Overdue
    {
      id: 1,
      client_name: "Acme Design Co.",
      amount: 1200,
      days_overdue: 14,
      is_overdue: true,
      is_paid: false,
      detected_at: "2024-01-01T00:00:00Z",
      tone: "Polite",
      emailThread: [
        {
          id: "e1",
          date: "2024-02-01",
          subject: "Invoice #1 - Due",
          tone: "Polite",
          content: "Hi there!\n\nI hope this email finds you well. I wanted to send over invoice #1 for our recent project. The total amount is $1,200, due within 30 days.\n\nPlease let me know if you have any questions!\n\nBest regards"
        },
        {
          id: "e2",
          date: "2024-02-15",
          subject: "Invoice #1 - Gentle Reminder",
          tone: "Polite",
          content: "Hi there!\n\nI hope you're doing well! Just following up on invoice #1 which was due a few days ago. Please let me know if you need any additional information.\n\nThanks!\n\nBest regards"
        }
      ]
    },
    {
      id: 2,
      client_name: "TechStart Inc.",
      amount: 850,
      days_overdue: 7,
      is_overdue: true,
      is_paid: false,
      detected_at: "2024-01-02T00:00:00Z",
      tone: "Polite",
      emailThread: [
        {
          id: "e1",
          date: "2024-02-10",
          subject: "Invoice #2 - Due",
          tone: "Polite",
          content: "Hi there!\n\nPlease find attached invoice #2 for our recent collaboration. The total amount is $850, due within 30 days.\n\nThank you for your business!\n\nBest regards"
        }
      ]
    },
    {
      id: 3,
      client_name: "Creative Studio",
      amount: 400,
      days_overdue: 21,
      is_overdue: true,
      is_paid: false,
      detected_at: "2024-01-03T00:00:00Z",
      tone: "Firm",
      emailThread: [
        {
          id: "e1",
          date: "2024-01-20",
          subject: "Invoice #3 - Due",
          tone: "Polite",
          content: "Hi there!\n\nPlease find attached invoice #3 for our recent work. The total amount is $400, due within 30 days.\n\nBest regards"
        },
        {
          id: "e2",
          date: "2024-02-01",
          subject: "Invoice #3 - First Reminder",
          tone: "Professional",
          content: "Hello,\n\nI'm following up on invoice #3 which was due last week. Please let me know if you have any questions about the payment.\n\nBest regards"
        },
        {
          id: "e3",
          date: "2024-02-10",
          subject: "Invoice #3 - Second Reminder",
          tone: "Professional",
          content: "Hello,\n\nThis is another reminder about invoice #3 which is now overdue by two weeks. Please process the payment as soon as possible.\n\nThank you for your attention to this matter.\n\nBest regards"
        }
      ]
    },
    // Paid
    {
      id: 101,
      client_name: "Blue Corp",
      amount: 2500,
      is_overdue: false,
      is_paid: true,
      detected_at: "2024-01-15T00:00:00Z",
      paid_at: "2024-01-18T00:00:00Z",
      message_type: "Polite",
      message_sent: "Hi there! I hope you're doing well! I wanted to follow up on invoice #101...",
      days_to_payment: 3,
    },
    {
      id: 102,
      client_name: "StartupXYZ",
      amount: 1800,
      is_overdue: false,
      is_paid: true,
      detected_at: "2024-01-10T00:00:00Z",
      paid_at: "2024-01-25T00:00:00Z",
      message_type: "Professional",
      message_sent: "Hello, I'm writing to follow up on invoice #102 for $1,800...",
      days_to_payment: 15,
    },
    {
      id: 103,
      client_name: "Design Studio Pro",
      amount: 950,
      is_overdue: false,
      is_paid: true,
      detected_at: "2024-01-08T00:00:00Z",
      paid_at: "2024-01-12T00:00:00Z",
      message_type: "Polite",
      message_sent: "Hi there! I hope you're doing well! I wanted to follow up on invoice #103...",
      days_to_payment: 4,
    },
  ]

  const [invoices, setInvoices] = useState<any[]>([])
  const [loadingInvoices, setLoadingInvoices] = useState(true)
  const [invoicesError, setInvoicesError] = useState<string | null>(null)

  const fetchInvoices = useCallback(async () => {
    setLoadingInvoices(true)
    setInvoicesError(null)
    try {
      const data = await getInvoices()
      setInvoices(data)
    } catch (err: any) {
      setInvoicesError(err?.message || "Failed to fetch invoices")
    } finally {
      setLoadingInvoices(false)
    }
  }, [])

  useEffect(() => {
    if (!demoMode) {
      fetchInvoices()
    } else {
      setInvoices(mockInvoices)
      setLoadingInvoices(false)
    }
  }, [fetchInvoices, demoMode])

  // --- UX: Send Reminder Logic ---
  function generateEmailContent(invoice: InvoiceUI): string {
    const tone = invoice.tone ?? "Polite"
    const amount = invoice.amount.toLocaleString()
    const daysOverdue = invoice.daysOverdue ?? 0
    if (tone === "Polite") {
      return `Hi there!\n\nI hope you're doing well! I wanted to follow up on invoice #${invoice.id} for $${amount}, which was due ${daysOverdue} days ago.\n\nI know things can get busy, so I wanted to send a gentle reminder. If you have any questions about the invoice or need any additional information, please don't hesitate to reach out!\n\nThanks for your time, and I look forward to hearing from you soon!\n\nBest regards`
    }
    if (tone === "Professional") {
      return `Hello,\n\nI'm writing to follow up on invoice #${invoice.id} for $${amount}, which was due ${daysOverdue} days ago.\n\nPlease let me know when I can expect payment, or if there are any issues that need to be addressed. I'm happy to discuss payment arrangements if needed.\n\nThank you for your prompt attention to this matter.\n\nBest regards`
    }
    return `Dear ${invoice.client},\n\nThis is a formal notice regarding overdue invoice #${invoice.id} for $${amount}, which was due ${daysOverdue} days ago.\n\nImmediate payment is required to avoid any disruption to our business relationship. Please remit payment within 5 business days of receiving this notice.\n\nIf payment has already been sent, please disregard this notice and provide payment confirmation.\n\nRegards`
  }

  function sendReminder(invoice: InvoiceUI): InvoiceUI {
    const now = new Date()
    const nextFollowUp = new Date()
    const daysToAdd = invoice.daysOverdue && invoice.daysOverdue > 14 ? 3 : 7
    nextFollowUp.setDate(now.getDate() + daysToAdd)
    const newEmail: Email = {
      id: `e${invoice.emailThread?.length ?? 0 + 1}`,
      date: now.toISOString(),
      subject: `Invoice #${invoice.id} - Payment Reminder`,
      tone: invoice.tone ?? "Polite",
      content: generateEmailContent(invoice)
    }
    return {
      ...invoice,
      status: "pending_response",
      lastReminderSent: now.toISOString(),
      nextFollowUpDate: nextFollowUp.toISOString(),
      emailThread: [...(invoice.emailThread ?? []), newEmail]
    }
  }

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
      type: "follow_up_sent",
      message: "Sent follow-up for TechStart Inc. (2 days overdue)",
      time: "5 hours ago",
      icon: Clock,
      color: "text-purple-400",
    },
    {
      id: 5,
      type: "follow_up_sent",
      message: "Sent follow-up for Creative Studio (21+ days overdue)",
      time: "1 day ago",
      icon: Bot,
      color: "text-yellow-400",
    },
    {
      id: 6,
      type: "invoice_processed",
      message: "Processed new invoice from Digital Solutions - $1,800",
      time: "2 days ago",
      icon: FileText,
      color: "text-indigo-400",
    },
    {
      id: 7,
      type: "payment_received",
      message: "Payment received from GreenTech LLC - $3,200",
      time: "3 days ago",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      id: 8,
      type: "overdue_detected",
      message: "Detected Marketing Pro invoice is now 15 days overdue",
      time: "4 days ago",
      icon: AlertTriangle,
      color: "text-orange-400",
    },
    {
      id: 9,
      type: "follow_up_sent",
      message: "Sent reminder for WebDev Partners (7 days overdue)",
      time: "5 days ago",
      icon: Mail,
      color: "text-blue-400",
    },
    {
      id: 10,
      type: "invoice_processed",
      message: "Processed new invoice from Data Analytics Co. - $4,500",
      time: "1 week ago",
      icon: FileText,
      color: "text-indigo-400",
    },
  ]

  // Split invoices into overdue and paid, and map to UI shape
  const mappedOverdueInvoices: InvoiceUI[] = invoices
    .filter(inv => inv.is_overdue)
    .map(inv => ({
      id: inv.id,
      client: inv.client_name,
      amount: inv.amount,
      daysOverdue: inv.days_overdue,
      avatar: inv.client_name
        ? inv.client_name
            .split(" ")
            .map((w: string) => w[0])
            .join("")
            .toUpperCase()
        : "--",
      status: "overdue" as const,
      tone: inv.tone || "Polite",
      emailThread: inv.emailThread,
      lastReminderSent: inv.lastReminderSent,
      nextFollowUpDate: inv.nextFollowUpDate,
    }))

  const pastInvoices: InvoiceUI[] = invoices
    .filter(inv => inv.is_paid)
    .map(inv => ({
      id: inv.id,
      client: inv.client_name,
      amount: inv.amount,
      avatar: inv.client_name
        ? inv.client_name
            .split(" ")
            .map((w: string) => w[0])
            .join("")
            .toUpperCase()
        : "--",
      dateSent: inv.detected_at,
      datePaid: inv.paid_at,
      messageType: inv.message_type,
      messageSent: inv.message_sent,
      daysToPayment: inv.days_to_payment,
      status: "paid" as const,
      emailThread: inv.emailThread,
    }))

  const allInvoices: InvoiceUI[] = [...mappedOverdueInvoices, ...pastInvoices]

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
        const days = invoice.daysOverdue ?? 0;
        if (daysFilter === "1-7") return days >= 1 && days <= 7
        if (daysFilter === "8-14") return days >= 8 && days <= 14
        if (daysFilter === "15-30") return days >= 15 && days <= 30
        if (daysFilter === "30+") return days > 30
        return true
      })
    }

    return filtered
  }

  const filteredInvoices = getFilteredInvoices()

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
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

        {/* Weekly Insights Card */}
        <Card className="bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart2 className="text-white h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">Weekly Insights</CardTitle>
                <CardDescription className="text-slate-400">Your freelance business at a glance.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* You’re Owed */}
              <div className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-4">
                <BadgeDollarSign className="text-red-400 h-7 w-7" />
                <div>
                  <div className="text-slate-400 text-xs font-medium">You’re Owed</div>
                  <div className="text-white text-xl font-bold">
                    ${(isDemoMode ? 2450 : mappedOverdueInvoices.reduce((sum, inv) => sum + inv.amount, 0)).toLocaleString()}
                  </div>
                </div>
              </div>
              {/* Collected This Week */}
              <div className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-4">
                <CheckCircle className="text-green-400 h-7 w-7" />
                <div>
                  <div className="text-slate-400 text-xs font-medium">Collected This Week</div>
                  <div className="text-white text-xl font-bold">
                    ${(isDemoMode ? 1980 : pastInvoices.filter(inv => {
                      const paid = inv.datePaid ? new Date(inv.datePaid) : new Date()
                      const now = new Date()
                      const diff = (now.getTime() - paid.getTime()) / (1000 * 60 * 60 * 24)
                      return diff <= 7
                    }).reduce((sum, inv) => sum + inv.amount, 0)).toLocaleString()}
                  </div>
                </div>
              </div>
              {/* Hours Saved */}
              <div className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-4">
                <Hourglass className="text-yellow-400 h-7 w-7" />
                <div>
                  <div className="text-slate-400 text-xs font-medium">Hours Saved</div>
                  <div className="text-white text-xl font-bold">
                    ~{isDemoMode ? 6.5 : (() => {
                      // Assume each follow-up sent saves 30min (0.1667h * 3)
                      const followUpsThisWeek = activityFeed.filter(a => {
                        if (a.type !== 'follow_up_sent') return false
                        // Parse time string (e.g., '2 minutes ago', '1 hour ago', '1 day ago')
                        const t = a.time
                        if (t.includes('minute')) return true
                        if (t.includes('hour')) return true
                        if (t.includes('day')) return parseInt(t) <= 7
                        return false
                      }).length
                      const hours = followUpsThisWeek * 0.1667 * 3
                      return hours.toFixed(1)
                    })()} hours
                  </div>
                </div>
              </div>
            </div>

            {/* At-Risk Clients */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="text-yellow-400 h-5 w-5" />
                <span className="text-white font-semibold">At-Risk Clients</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-slate-300">
                  <thead>
                    <tr className="text-slate-400">
                      <th className="px-2 py-1 text-left">Client</th>
                      <th className="px-2 py-1 text-left">Amount</th>
                      <th className="px-2 py-1 text-left">Days Overdue</th>
                      <th className="px-2 py-1 text-left">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappedOverdueInvoices
                      .map(inv => ({...inv, days: inv.daysOverdue ?? 0}))
                      .filter(inv => inv.days >= 14)
                      .slice(0, 2)
                      .map(inv => (
                        <tr key={inv.id} className="hover:bg-slate-700 cursor-pointer transition" onClick={() => {
                          const el = document.getElementById(`invoice-${inv.id}`)
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                            el.classList.add('ring-4', 'ring-red-500')
                            setTimeout(() => el.classList.remove('ring-4', 'ring-red-500'), 2000)
                          }
                        }}>
                          <td className="px-2 py-1 text-blue-400 underline">{inv.client}</td>
                          <td className="px-2 py-1">${inv.amount.toLocaleString()}</td>
                          <td className="px-2 py-1">{inv.days}</td>
                          <td className="px-2 py-1">
                            <span className="inline-flex items-center gap-1 font-semibold text-red-400">
                              <CircleDot className="h-4 w-4 text-red-400" /> High
                            </span>
                          </td>
                        </tr>
                      ))}
                    {mappedOverdueInvoices.filter(inv => (inv.daysOverdue ?? 0) >= 14).length === 0 && (
                      <tr><td colSpan={4} className="text-slate-500 py-2">No high-risk clients this week.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pin className="text-blue-400 h-5 w-5" />
                <span className="text-white font-semibold">Next Steps</span>
              </div>
              <ul className="space-y-2">
                {mappedOverdueInvoices.map(inv => ({...inv, days: inv.daysOverdue ?? 0})).filter(inv => inv.days >= 21).map(inv => (
                  <li key={inv.id} className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3">
                    <Circle className="h-3 w-3 text-blue-400" />
                    <span className="flex-1 text-slate-300">Approve escalated reminder to <span className="font-semibold text-white">{inv.client}</span></span>
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-4 py-1"
                      onClick={() => {
                        // Simulate escalation action
                        if (typeof window !== 'undefined') {
                          window.dispatchEvent(new CustomEvent('toast', { detail: { message: `Escalated reminder approved for ${inv.client}` } }))
                        }
                      }}
                    >
                      Approve
                    </Button>
                  </li>
                ))}
                {/* Example: View action for a client with 7-20 days overdue */}
                {mappedOverdueInvoices.map(inv => ({...inv, days: inv.daysOverdue ?? 0})).filter(inv => inv.days >= 8 && inv.days < 21).map(inv => (
                  <li key={inv.id} className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3">
                    <Circle className="h-3 w-3 text-blue-400" />
                    <span className="flex-1 text-slate-300">Review <span className="font-semibold text-white">{inv.client}</span>’s overdue invoice</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-semibold px-4 py-1"
                      onClick={() => {
                        const el = document.getElementById(`invoice-${inv.id}`)
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                          el.classList.add('ring-4', 'ring-blue-500')
                          setTimeout(() => el.classList.remove('ring-4', 'ring-blue-500'), 2000)
                        }
                      }}
                    >
                      View
                    </Button>
                  </li>
                ))}
                {/* If no next steps */}
                {mappedOverdueInvoices.map(inv => ({...inv, days: inv.daysOverdue ?? 0})).filter(inv => inv.days >= 8).length === 0 && (
                  <li className="text-slate-500 py-2">No urgent actions needed this week.</li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

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
                    Your AI agent is actively working on {mappedOverdueInvoices.length} overdue invoices
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
                  {mappedOverdueInvoices.length} overdue • {pastInvoices.length} completed
                </CardDescription>
              </div>
              <Button 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                  // Get all unpaid invoices that aren't already being monitored
                  const unpaidInvoices = allInvoices.filter(inv => inv.status === "overdue")
                  if (unpaidInvoices.length === 0) return
                  // Send reminders for all unpaid invoices
                  const updatedInvoices = allInvoices.map(invoice => {
                    if (invoice.status === "overdue") {
                      return sendReminder(invoice)
                    }
                    return invoice
                  })
                  setInvoices(updatedInvoices)
                }}
              >
                <Zap className="h-4 w-4 mr-2" />
                Send All Reminders ({allInvoices.filter(inv => inv.status === "overdue").length})
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
            {loadingInvoices && (
              <div className="text-center py-8">
                <p className="text-slate-400 text-lg mb-2">Loading overdue invoices...</p>
                <p className="text-slate-500 text-sm">Please wait a moment.</p>
              </div>
            )}
            {invoicesError && (
              <div className="text-center py-8">
                <p className="text-red-400 text-lg mb-2">Error: {invoicesError}</p>
                <p className="text-slate-500 text-sm">Failed to fetch invoices. Please try again later.</p>
              </div>
            )}
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-slate-400 text-lg mb-2">No invoices in this category</div>
                <div className="text-slate-500 text-sm">Try selecting a different filter</div>
              </div>
            ) : (
              filteredInvoices.map((invoice) => {
                const days = invoice.daysOverdue ?? 0;
                if (invoice.status === "paid") {
                  // Render paid invoice
                  return (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-5 bg-slate-700/30 rounded-xl shadow-md transition-all duration-300 hover:bg-slate-700 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 shadow-lg">
                          <AvatarFallback className="bg-slate-600 text-white font-bold text-lg">
                            {invoice.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-xl text-white">{invoice.client}</div>
                          <div className="text-sm text-slate-300 font-medium">
                            <span className="font-bold text-slate-400">${invoice.amount.toLocaleString()}</span> • Paid
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInvoice({ ...invoice, isPastInvoice: true })}
                          className="font-semibold bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-300"
                        >
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
                      id={`invoice-${invoice.id}`}
                      className={`flex items-center justify-between p-5 border-l-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${getStatusColor(days)}`}
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
                            <span className="font-bold text-green-400">${invoice.amount.toLocaleString()}</span> • {days} days overdue
                          </div>
                          <div className={`text-xs mt-1 font-medium ${getStatusTextColor(days)}`}>
                            {getStatusText(days)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={invoice.tone === "Polite" ? "secondary" : "outline"}
                          className="font-semibold bg-slate-700 text-slate-300 border-slate-600"
                        >
                          {invoice.tone ? `${invoice.tone} Tone` : ''}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInvoice({ ...invoice, status: "overdue" })}
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
                  {/* Invoice Details Card */}
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
                            <div className="text-slate-300 font-medium">{formatDate(selectedInvoice.dateSent ?? '')}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Date Paid:</span>
                            <div className="text-green-400 font-medium">{formatDate(selectedInvoice.datePaid ?? '')}</div>
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

                  {/* Email Thread Section */}
                  {selectedInvoice.emailThread && !isEditingMessage && (
                    <div className="space-y-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowEmailThread(!showEmailThread)}
                        className="w-full bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-300"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            <span className="font-medium">
                              {selectedInvoice.isPastInvoice ? "Communication History" : "Previous Communications"} ({selectedInvoice.emailThread.length})
                            </span>
                          </div>
                          {showEmailThread ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </Button>
                      
                      {showEmailThread && (
                        <div className="space-y-4 animate-in slide-in-from-top duration-300">
                          {selectedInvoice.emailThread.map((email) => (
                            <div 
                              key={email.id} 
                              className="bg-slate-700/50 rounded-lg p-4 space-y-2 transition-all duration-300 hover:bg-slate-700"
                            >
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline" className="bg-slate-600 text-slate-300">
                                    {email.tone}
                                  </Badge>
                                  <span className="text-slate-400">{formatDate(email.date)}</span>
                                </div>
                                <span className="text-slate-400">{email.subject}</span>
                              </div>
                              <div className="text-sm text-slate-300 whitespace-pre-wrap font-mono bg-slate-700 rounded p-3">
                                {email.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message Preview or Edit Section */}
                  {!selectedInvoice.isPastInvoice && (
                    <>
                      {isEditingMessage ? (
                        // Edit Message View
                        <div className="space-y-6">
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

                          <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 bg-slate-700/30">
                            <div className="text-sm leading-relaxed text-slate-300">
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
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <Button
                              variant="outline"
                              className="flex-1 bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 font-semibold transition-all duration-300"
                              onClick={() => setIsEditingMessage(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                              onClick={() => setIsEditingMessage(false)}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Preview View
                        <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 bg-slate-700/30">
                          <div className="text-sm leading-relaxed text-slate-300">
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
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Action Buttons */}
                  {!isEditingMessage && (
                    <div className="flex gap-4 pt-4">
                      {selectedInvoice.isPastInvoice ? (
                        <Button
                          className="w-full bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 font-semibold transition-all duration-300"
                          onClick={() => setSelectedInvoice(null)}
                        >
                          Close
                        </Button>
                      ) : selectedInvoice.status === "pending_response" ? (
                        <>
                          <div className="flex-1 flex items-center justify-center gap-3 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <div className="text-sm">
                              <span className="text-blue-400 font-medium">Lance is monitoring</span>
                              <span className="text-slate-400"> • Next follow-up in {(() => {
                                if (!selectedInvoice?.nextFollowUpDate) return '...'
                                const nextDate = new Date(selectedInvoice.nextFollowUpDate)
                                const now = new Date()
                                const diffDays = Math.ceil((nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                                return `${diffDays} days`
                              })()}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 font-semibold transition-all duration-300"
                            onClick={() => setSelectedInvoice(null)}
                          >
                            Close
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="flex-1 bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 font-semibold transition-all duration-300"
                            onClick={() => setIsEditingMessage(true)}
                          >
                            Edit Message
                          </Button>
                          <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            onClick={() => {
                              if (!selectedInvoice) return
                              
                              // Send the reminder
                              const updatedInvoice = sendReminder(selectedInvoice)
                              
                              // Update state
                              setInvoices(currentInvoices => 
                                currentInvoices.map(inv => inv.id === selectedInvoice.id ? updatedInvoice : inv)
                              )
                              
                              // Close modal after short delay to show status change
                              setTimeout(() => setSelectedInvoice(null), 1500)
                            }}
                          >
                            Send Reminder
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
