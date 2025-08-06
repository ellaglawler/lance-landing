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
  Send,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useCallback } from "react"
import { getInvoices } from "@/lib/api"
import { getEmailThreadsForInvoice, sendEmail, sendBulkEmails, EmailThread } from "@/lib/api"
import { getActivities, createActivity, Activity as ActivityType } from "@/lib/api"

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
  status: "OVERDUE" | "PAID" | "DUE";
  tone?: string;
  customMessage?: string;
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
  reminderCount?: number;
  lastReminderTone?: string | null;
}

interface ActivityFeedItem {
  id: number;
  type: string;
  message: string;
  time: string;
  icon: any;
  color: string;
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
  const [emailThreads, setEmailThreads] = useState<EmailThread[]>([])
  const [loadingEmailThreads, setLoadingEmailThreads] = useState(false)
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [loadingActivities, setLoadingActivities] = useState(false)
  const [actedRecommendations, setActedRecommendations] = useState<Set<number>>(new Set())
  const [sendingReminder, setSendingReminder] = useState<number | null>(null)
  const [sentReminders, setSentReminders] = useState<Set<number>>(new Set())

  // Unified mock data for demo mode (matches getInvoices structure)
  const mockInvoices = [
    // Overdue
    {
      id: 1,
      client_name: "Acme Design Co.",
      amount: 1200,
      days_overdue: 14,
      status: "OVERDUE",
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
      status: "OVERDUE",
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
      status: "OVERDUE",
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
      status: "PAID",
      detected_at: "2024-01-15T00:00:00Z",
      paid_at: "2024-01-18T00:00:00Z",
      message_type: "Polite",
      message_sent: "Hi there! I hope you're doing well! I wanted to follow up on invoice #101...",
      days_to_payment: 3,
      emailThread: [
        {
          id: "e1",
          date: "2024-01-15",
          subject: "Invoice #101 - Due",
          tone: "Polite",
          content: "Hi there!\n\nI hope this email finds you well. I wanted to send over invoice #101 for our recent project. The total amount is $2,500, due within 30 days.\n\nPlease let me know if you have any questions!\n\nBest regards"
        },
        {
          id: "e2",
          date: "2024-01-17",
          subject: "Invoice #101 - Payment Received",
          tone: "Polite",
          content: "Hi there!\n\nThank you so much for the prompt payment! I've received confirmation that invoice #101 has been paid in full.\n\nIt's always a pleasure working with you, and I look forward to our next collaboration.\n\nBest regards"
        }
      ]
    },
    {
      id: 102,
      client_name: "StartupXYZ",
      amount: 1800,
      status: "PAID",
      detected_at: "2024-01-10T00:00:00Z",
      paid_at: "2024-01-25T00:00:00Z",
      message_type: "Professional",
      message_sent: "Hello, I'm writing to follow up on invoice #102 for $1,800...",
      days_to_payment: 15,
      emailThread: [
        {
          id: "e1",
          date: "2024-01-10",
          subject: "Invoice #102 - Due",
          tone: "Professional",
          content: "Hello,\n\nPlease find attached invoice #102 for our recent collaboration. The total amount is $1,800, due within 30 days.\n\nThank you for your business!\n\nBest regards"
        },
        {
          id: "e2",
          date: "2024-01-20",
          subject: "Invoice #102 - Follow Up",
          tone: "Professional",
          content: "Hello,\n\nI'm following up on invoice #102 which was due last week. Please let me know if you have any questions about the payment.\n\nBest regards"
        },
        {
          id: "e3",
          date: "2024-01-25",
          subject: "Invoice #102 - Payment Confirmation",
          tone: "Professional",
          content: "Hello,\n\nThank you for the payment! I've received confirmation that invoice #102 has been paid in full.\n\nBest regards"
        }
      ]
    },
    {
      id: 103,
      client_name: "Design Studio Pro",
      amount: 950,
      status: "PAID",
      detected_at: "2024-01-08T00:00:00Z",
      paid_at: "2024-01-12T00:00:00Z",
      message_type: "Polite",
      message_sent: "Hi there! I hope you're doing well! I wanted to follow up on invoice #103...",
      days_to_payment: 4,
      emailThread: [
        {
          id: "e1",
          date: "2024-01-08",
          subject: "Invoice #103 - Due",
          tone: "Polite",
          content: "Hi there!\n\nI hope this email finds you well. I wanted to send over invoice #103 for our recent work. The total amount is $950, due within 30 days.\n\nPlease let me know if you have any questions!\n\nBest regards"
        },
        {
          id: "e2",
          date: "2024-01-12",
          subject: "Invoice #103 - Payment Received",
          tone: "Polite",
          content: "Hi there!\n\nThank you for the quick payment! I've received confirmation that invoice #103 has been paid in full.\n\nIt was great working with you on this project!\n\nBest regards"
        }
      ]
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

  // Fetch email threads for selected invoice
  const fetchEmailThreads = useCallback(async (invoiceId: number) => {
    if (demoMode) return;
    
    setLoadingEmailThreads(true)
    try {
      const response = await getEmailThreadsForInvoice(invoiceId)
      setEmailThreads(response.email_threads)
    } catch (err: any) {
      console.error('Failed to fetch email threads:', err)
      setEmailThreads([])
    } finally {
      setLoadingEmailThreads(false)
    }
  }, [demoMode])

  // Fetch activities for the current user
  const fetchActivities = useCallback(async () => {
    if (demoMode) return;
    
    setLoadingActivities(true)
    try {
      const response = await getActivities({ limit: 50, days: 7 })
      setActivities(response.activities)
    } catch (err: any) {
      console.error('Failed to fetch activities:', err)
      setActivities([])
    } finally {
      setLoadingActivities(false)
    }
  }, [demoMode])

  useEffect(() => {
    if (!demoMode) {
      fetchInvoices()
      fetchActivities()
    } else {
      setInvoices(mockInvoices)
      setLoadingInvoices(false)
    }
  }, [fetchInvoices, fetchActivities, demoMode])

  // Split invoices by status and map to UI shape
  const mappedOverdueInvoices: InvoiceUI[] = invoices
    .filter(inv => inv.status === "OVERDUE")
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
      status: "OVERDUE" as const,
      tone: inv.tone || "Polite",
      emailThread: inv.emailThread,
      lastReminderSent: inv.last_reminder_sent,
      nextFollowUpDate: inv.next_follow_up_date,
      reminderCount: inv.reminder_count || 0,
      lastReminderTone: inv.last_reminder_tone || null,
    }))

  const dueInvoices: InvoiceUI[] = invoices
    .filter(inv => inv.status === "DUE")
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
      status: "DUE" as const,
      tone: inv.tone || "Polite",
      emailThread: inv.emailThread,
      lastReminderSent: inv.last_reminder_sent,
      nextFollowUpDate: inv.next_follow_up_date,
      reminderCount: inv.reminder_count || 0,
      lastReminderTone: inv.last_reminder_tone || null,
    }))

  const pastInvoices: InvoiceUI[] = invoices
    .filter(inv => inv.status === "PAID")
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
      status: "PAID" as const,
      emailThread: inv.emailThread,
      reminderCount: inv.reminder_count || 0,
      lastReminderTone: inv.last_reminder_tone || null,
    }))

  const allInvoices: InvoiceUI[] = [...mappedOverdueInvoices, ...dueInvoices, ...pastInvoices]

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

  function generateDefaultMessage(invoice: InvoiceUI, tone: string): string {
    const amount = invoice.amount.toLocaleString()
    const daysOverdue = invoice.daysOverdue ?? 0
    if (tone === "Polite") {
      return `Hi there!

I hope you're doing well! I wanted to follow up on invoice #${invoice.id} for $${amount}, which was due ${daysOverdue} days ago.

I know things can get busy, so I wanted to send a gentle reminder. If you have any questions about the invoice or need any additional information, please don't hesitate to reach out!

Thanks for your time, and I look forward to hearing from you soon!

Best regards`
    } else if (tone === "Professional") {
      return `Hello,

I'm writing to follow up on invoice #${invoice.id} for $${amount}, which was due ${daysOverdue} days ago.

Please let me know when I can expect payment, or if there are any issues that need to be addressed. I'm happy to discuss payment arrangements if needed.

Thank you for your prompt attention to this matter.

Best regards`
    } else if (tone === "Firm") {
      return `Dear ${invoice.client},

This is a formal notice regarding overdue invoice #${invoice.id} for $${amount}, which was due ${daysOverdue} days ago.

Immediate payment is required to avoid any disruption to our business relationship. Please remit payment within 5 business days of receiving this notice.

If payment has already been sent, please disregard this notice and provide payment confirmation.

Regards`
    }
    return ""
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
      content: invoice.customMessage || generateEmailContent(invoice)
    }
    return {
      ...invoice,
      status: "DUE",
      lastReminderSent: now.toISOString(),
      nextFollowUpDate: nextFollowUp.toISOString(),
      emailThread: [...(invoice.emailThread ?? []), newEmail]
    }
  }

  // Send email via backend API
  const sendEmailViaAPI = useCallback(async (invoice: InvoiceUI, tone: string) => {
    if (demoMode) {
      // In demo mode, just update local state
      const updatedInvoice = sendReminder(invoice)
      setInvoices(currentInvoices => 
        currentInvoices.map(inv => inv.id === invoice.id ? updatedInvoice : inv)
      )
      return updatedInvoice
    }

    try {
      const content = invoice.customMessage || generateEmailContent(invoice)
      const subject = `Payment Reminder - Invoice #${invoice.id}`
      
      // Calculate next follow-up date
      const nextFollowUp = new Date()
      const daysToAdd = invoice.daysOverdue && invoice.daysOverdue > 14 ? 3 : 7
      nextFollowUp.setDate(nextFollowUp.getDate() + daysToAdd)

      const emailRequest = {
        invoice_id: invoice.id,
        tone: tone.toLowerCase(),
        subject,
        content,
        is_automated: false,
        next_follow_up_date: nextFollowUp.toISOString()
      }

      const sentEmail = await sendEmail(emailRequest)
      
      // Update local state with the sent email
      const updatedInvoice = {
        ...invoice,
        status: "due" as const,
        lastReminderSent: sentEmail.sent_at || new Date().toISOString(),
        nextFollowUpDate: sentEmail.next_follow_up_date || nextFollowUp.toISOString(),
        emailThread: [
          ...(invoice.emailThread || []),
          {
            id: sentEmail.id.toString(),
            date: sentEmail.created_at,
            subject: sentEmail.subject,
            tone: sentEmail.tone,
            content: sentEmail.content
          }
        ]
      }

      setInvoices(currentInvoices => 
        currentInvoices.map(inv => inv.id === invoice.id ? updatedInvoice : inv)
      )

      // Track sent reminder
      setSentReminders(prev => new Set([...prev, invoice.id]))

      // Create activity record for the sent email
      try {
        await createActivity({
          activity_type: 'follow_up_sent',
          message: `Sent ${tone.toLowerCase()} follow-up to ${invoice.client}`,
          invoice_id: invoice.id,
          email_thread_id: sentEmail.id,
          metadata: {
            tone,
            amount: invoice.amount,
            days_overdue: invoice.daysOverdue
          }
        })
      } catch (error) {
        console.error('Failed to create activity record:', error)
      }

      return updatedInvoice
    } catch (error) {
      console.error('Failed to send email:', error)
      throw error
    }
  }, [demoMode])

  // Send bulk emails via backend API
  const sendBulkEmailsViaAPI = useCallback(async (invoiceIds: number[], tone: string = 'polite') => {
    if (demoMode) {
      // In demo mode, just update local state for all invoices
      const updatedInvoices = allInvoices.map(invoice => {
        if (invoice.status === "OVERDUE") {
          return sendReminder(invoice)
        }
        return invoice
      })
      setInvoices(updatedInvoices)
      return { sent_count: updatedInvoices.filter(inv => inv.status === "DUE").length, failed_count: 0 }
    }

    try {
      const result = await sendBulkEmails(invoiceIds, tone)
      
      // Refresh invoices to get updated status
      await fetchInvoices()
      
      // Create activity record for bulk email
      try {
        await createActivity({
          activity_type: 'bulk_email_sent',
          message: `Sent bulk ${tone} reminders to ${result.sent_count} clients`,
          metadata: {
            sent_count: result.sent_count,
            failed_count: result.failed_count,
            tone
          }
        })
      } catch (error) {
        console.error('Failed to create activity record:', error)
      }
      
      return result
    } catch (error) {
      console.error('Failed to send bulk emails:', error)
      throw error
    }
  }, [demoMode, allInvoices, fetchInvoices])

  // Load email threads when invoice is selected
  useEffect(() => {
    if (selectedInvoice && !demoMode) {
      fetchEmailThreads(selectedInvoice.id)
    }
  }, [selectedInvoice, demoMode, fetchEmailThreads])

  // Helper function to format relative time
  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`
  }

  // Helper function to get icon and color for activity type
  const getActivityIconAndColor = (activityType: string): { icon: any; color: string } => {
    switch (activityType) {
      case 'follow_up_sent':
        return { icon: Mail, color: 'text-blue-400' }
      case 'overdue_detected':
        return { icon: AlertTriangle, color: 'text-orange-400' }
      case 'payment_received':
        return { icon: CheckCircle, color: 'text-green-400' }
      case 'invoice_processed':
        return { icon: FileText, color: 'text-indigo-400' }
      case 'bulk_email_sent':
        return { icon: Zap, color: 'text-purple-400' }
      case 'gmail_scan_completed':
        return { icon: Bot, color: 'text-yellow-400' }
      case 'tone_adjusted':
        return { icon: Bot, color: 'text-yellow-400' }
      case 'follow_up_scheduled':
        return { icon: Clock, color: 'text-purple-400' }
      case 'payment_detected':
        return { icon: CheckCircle, color: 'text-green-400' }
      case 'invoice_escalated':
        return { icon: AlertTriangle, color: 'text-red-400' }
      default:
        return { icon: Bot, color: 'text-slate-400' }
    }
  }

  // Activity feed data
  const activityFeed: ActivityFeedItem[] = demoMode ? [
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
  ] : activities.map(activity => {
    const { icon, color } = getActivityIconAndColor(activity.activity_type)
    return {
      id: activity.id,
      type: activity.activity_type,
      message: activity.message,
      time: formatRelativeTime(activity.created_at),
      icon,
      color,
    }
  })

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
        if (invoice.status === "PAID") return true // Always show paid invoices
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

  // Helper function to calculate next follow-up date
  const calculateNextFollowUpDate = (daysOverdue: number): Date => {
    const nextDate = new Date()
    const daysToAdd = daysOverdue > 14 ? 3 : 7
    nextDate.setDate(nextDate.getDate() + daysToAdd)
    return nextDate
  }

  // Helper function to get recommended tone based on days overdue
  const getRecommendedTone = (daysOverdue: number): string => {
    if (daysOverdue > 21) return "Firm"
    if (daysOverdue > 14) return "Professional"
    return "Polite"
  }

  // Helper function to get risk history (demo mode only)
  const getRiskHistory = (clientName: string): string => {
    if (!demoMode) return ""
    
    // Demo risk history data
    const riskData: { [key: string]: string } = {
      "Acme Design Co.": "This client has paid late on 2/3 invoices.",
      "TechStart Inc.": "This client has paid late on 1/2 invoices.",
      "Creative Studio": "This client has paid late on 3/5 invoices.",
    }
    
    return riskData[clientName] || "No payment history available."
  }

  // Helper function to get reminder history for display in invoice rows
  const getReminderHistory = (invoice: InvoiceUI): {
    reminderCount: number;
    lastReminderDate: string;
    lastReminderTone: string;
    hasReminders: boolean;
  } => {
    if (demoMode) {
      // Demo data based on invoice ID
      const demoData: { [key: number]: { count: number; date: string; tone: string } } = {
        1: { count: 2, date: "2024-02-15", tone: "Polite" },
        2: { count: 1, date: "2024-02-10", tone: "Polite" },
        3: { count: 3, date: "2024-02-10", tone: "Professional" },
        32: { count: 4, date: "2024-08-04", tone: "Firm" }, // Add data for invoice #32
      }
      
      const data = demoData[invoice.id]
      if (data) {
        return {
          reminderCount: data.count,
          lastReminderDate: formatDate(data.date),
          lastReminderTone: data.tone,
          hasReminders: true
        }
      }
    } else {
      // Use reminder summary data from API response
      if (invoice.reminderCount && invoice.reminderCount > 0) {
        return {
          reminderCount: invoice.reminderCount,
          lastReminderDate: invoice.lastReminderSent ? formatDate(invoice.lastReminderSent) : "Unknown",
          lastReminderTone: invoice.lastReminderTone || "Unknown",
          hasReminders: true
        }
      }
    }
    
    return {
      reminderCount: 0,
      lastReminderDate: "",
      lastReminderTone: "",
      hasReminders: false
    }
  }

  // Helper function to get smart suggestion for high-risk clients
  const getSmartSuggestion = (invoice: InvoiceUI): string | null => {
    const history = getReminderHistory(invoice)
    
    if (history.reminderCount >= 3 && (invoice.daysOverdue ?? 0) > 21) {
      return "Client hasn't replied to 3 reminders — consider requesting payment confirmation."
    }
    
    if (history.reminderCount >= 2 && (invoice.daysOverdue ?? 0) > 14) {
      return "Multiple reminders sent — may need escalation."
    }
    
    return null
  }

  // Helper function to get payment insights for paid invoices
  const getPaymentInsights = (invoice: InvoiceUI): {
    successMessage: string;
    clientPattern: string;
    comparisonToAverage: string;
    paymentReliability: string;
  } => {
    const daysToPayment = invoice.daysToPayment ?? 0
    
    // Generate success message
    const successMessage = daysToPayment <= 3 
      ? `Invoice Paid — Lance helped you get paid in just ${daysToPayment} days!`
      : daysToPayment <= 7
      ? `Invoice Paid — Lance helped you get paid in ${daysToPayment} days.`
      : `Invoice Paid — Lance helped you get paid in ${daysToPayment} days.`
    
    // Generate client payment pattern (demo data for now)
    let clientPattern = ""
    if (demoMode) {
      const patterns: { [key: string]: string } = {
        "Blue Corp": "This client typically pays in 3-5 days.",
        "StartupXYZ": "This client typically pays in 10-15 days.",
        "Design Studio Pro": "This client typically pays in 2-4 days.",
      }
      clientPattern = patterns[invoice.client] || "First payment from this client."
    } else {
      // In real implementation, this would query payment history
      clientPattern = daysToPayment <= 5 ? "This client typically pays quickly." : "This client typically pays within terms."
    }
    
    // Generate comparison to average
    const averageDays = demoMode ? 7.2 : 8.5 // Would be calculated from real data
    const comparisonToAverage = daysToPayment < averageDays
      ? `Faster than your average client (${averageDays} days)`
      : `About average for your clients (${averageDays} days)`
    
    // Generate payment reliability
    const reliability = demoMode ? "On-time 4 out of 5 times" : "Reliable payer"
    
    return {
      successMessage,
      clientPattern,
      comparisonToAverage,
      paymentReliability: reliability
    }
  }

  // Helper function to get payment timeline for paid invoices
  const getPaymentTimeline = (invoice: InvoiceUI): Array<{
    step: string;
    date: string;
    icon: any;
    color: string;
  }> => {
    const timeline = []
    
    // Invoice sent
    if (invoice.dateSent) {
      timeline.push({
        step: "Invoice Sent",
        date: formatDate(invoice.dateSent),
        icon: FileText,
        color: "text-blue-400"
      })
    }
    
    // Reminders sent (if any)
    const history = getReminderHistory(invoice)
    if (history.hasReminders) {
      timeline.push({
        step: `${history.reminderCount} Reminder${history.reminderCount > 1 ? 's' : ''} Sent`,
        date: history.lastReminderDate,
        icon: Send,
        color: "text-orange-400"
      })
    }
    
    // Payment received
    if (invoice.datePaid) {
      timeline.push({
        step: "Paid in Full",
        date: formatDate(invoice.datePaid),
        icon: CheckCircle,
        color: "text-green-400"
      })
    }
    
    return timeline
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
              {/* You're Owed */}
              <div className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-4">
                <BadgeDollarSign className="text-red-400 h-7 w-7" />
                <div>
                  <div className="text-slate-400 text-xs font-medium">You're Owed</div>
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
                      const followUpsThisWeek = activities.filter(a => 
                        a.activity_type === 'follow_up_sent' && 
                        new Date(a.created_at) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                      ).length
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

            {/* Lance Recommendations */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pin className="text-blue-400 h-5 w-5" />
                <span className="text-white font-semibold">Lance Recommendations</span>
              </div>
              <ul className="space-y-2">
                {mappedOverdueInvoices
                  .map(inv => ({...inv, days: inv.daysOverdue ?? 0}))
                  .filter(inv => inv.days >= 21 && !actedRecommendations.has(inv.id))
                  .map(inv => (
                  <li 
                    key={inv.id} 
                    className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700 transition-colors"
                    onClick={() => {
                      const el = document.getElementById(`invoice-${inv.id}`)
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        el.classList.add('ring-4', 'ring-red-500')
                        setTimeout(() => el.classList.remove('ring-4', 'ring-red-500'), 2000)
                      }
                    }}
                  >
                    <Circle className="h-3 w-3 text-blue-400" />
                    <span className="flex-1 text-slate-300">Approve escalated reminder to <span className="font-semibold text-white">{inv.client}</span></span>
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-4 py-1"
                      onClick={async (e) => {
                        e.stopPropagation() // Prevent row click when button is clicked
                        try {
                          // Send escalated email immediately (using "firm" tone for 21+ days overdue)
                          await sendEmailViaAPI(inv, 'firm')
                          
                          // Mark this recommendation as acted upon
                          setActedRecommendations(prev => new Set([...prev, inv.id]))
                          
                          // Show success notification
                          if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('toast', { 
                              detail: { 
                                message: `Escalated reminder sent to ${inv.client}`,
                                type: 'success'
                              } 
                            }))
                          }
                        } catch (error) {
                          console.error('Failed to send escalated reminder:', error)
                          // Show error notification
                          if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('toast', { 
                              detail: { 
                                message: `Failed to send reminder to ${inv.client}`,
                                type: 'error'
                              } 
                            }))
                          }
                        }
                      }}
                    >
                      Approve
                    </Button>
                  </li>
                ))}
                {/* Example: View action for a client with 7-20 days overdue */}
                {mappedOverdueInvoices
                  .map(inv => ({...inv, days: inv.daysOverdue ?? 0}))
                  .filter(inv => inv.days >= 8 && inv.days < 21 && !actedRecommendations.has(inv.id))
                  .map(inv => (
                  <li 
                    key={inv.id} 
                    className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700 transition-colors"
                    onClick={() => {
                      const el = document.getElementById(`invoice-${inv.id}`)
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        el.classList.add('ring-4', 'ring-blue-500')
                        setTimeout(() => el.classList.remove('ring-4', 'ring-blue-500'), 2000)
                      }
                    }}
                  >
                    <Circle className="h-3 w-3 text-blue-400" />
                    <span className="flex-1 text-slate-300">Review <span className="font-semibold text-white">{inv.client}</span>'s overdue invoice</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-semibold bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent row click when button is clicked
                        const el = document.getElementById(`invoice-${inv.id}`)
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                          el.classList.add('ring-4', 'ring-blue-500')
                          setTimeout(() => el.classList.remove('ring-4', 'ring-blue-500'), 2000)
                        }
                      }}
                    >
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                    </Button>
                  </li>
                ))}
                {/* If no next steps */}
                {mappedOverdueInvoices
                  .map(inv => ({...inv, days: inv.daysOverdue ?? 0}))
                  .filter(inv => inv.days >= 8 && !actedRecommendations.has(inv.id))
                  .length === 0 && (
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
                  {demoMode ? (
                    // Demo timeline points
                    <>
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
                    </>
                  ) : (
                    // Real timeline points based on actual activities
                    (() => {
                      const now = new Date()
                      const last24Hours = activities
                        .filter(activity => {
                          const activityDate = new Date(activity.created_at)
                          const diffHours = (now.getTime() - activityDate.getTime()) / (1000 * 60 * 60)
                          return diffHours <= 24
                        })
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0, 8) // Show up to 8 most recent activities

                      if (last24Hours.length === 0) {
                        return (
                          <div className="w-full text-center text-slate-500 text-sm py-4">
                            No recent activity
                          </div>
                        )
                      }

                      return last24Hours.map((activity, index) => {
                        const activityDate = new Date(activity.created_at)
                        const diffHours = (now.getTime() - activityDate.getTime()) / (1000 * 60 * 60)
                        const diffMins = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60))
                        
                        // Determine time label
                        let timeLabel = ''
                        if (diffMins < 60) {
                          timeLabel = `${diffMins}m`
                        } else if (diffHours < 24) {
                          timeLabel = `${Math.floor(diffHours)}h`
                        } else {
                          timeLabel = `${Math.floor(diffHours / 24)}d`
                        }

                        // Determine color based on activity type
                        let color = 'bg-slate-400'
                        let size = 'w-2 h-2'
                        let animate = ''
                        
                        switch (activity.activity_type) {
                          case 'follow_up_sent':
                            color = 'bg-blue-400'
                            size = diffMins < 30 ? 'w-3 h-3' : 'w-2.5 h-2.5'
                            animate = diffMins < 30 ? 'animate-pulse' : ''
                            break
                          case 'payment_received':
                            color = 'bg-green-400'
                            size = 'w-3 h-3'
                            break
                          case 'overdue_detected':
                            color = 'bg-orange-400'
                            size = 'w-2.5 h-2.5'
                            break
                          case 'invoice_processed':
                            color = 'bg-indigo-400'
                            size = 'w-2 h-2'
                            break
                          case 'bulk_email_sent':
                            color = 'bg-purple-400'
                            size = 'w-2.5 h-2.5'
                            break
                          case 'gmail_scan_completed':
                            color = 'bg-yellow-400'
                            size = 'w-2 h-2'
                            break
                          default:
                            color = 'bg-slate-400'
                            size = 'w-1.5 h-1.5'
                        }

                        return (
                          <div key={activity.id} className="relative">
                            <div className={`${size} ${color} rounded-full border-2 border-slate-800 ${animate}`}></div>
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap">
                              {timeLabel}
                            </div>
                          </div>
                        )
                      })
                    })()
                  )}
                </div>

                {/* Activity summary */}
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center sm:justify-center gap-3 sm:gap-6 text-xs">
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
              {(demoMode ? activityFeed : activities.slice(0, 10).map(activity => {
                const { icon, color } = getActivityIconAndColor(activity.activity_type)
                return {
                  id: activity.id,
                  type: activity.activity_type,
                  message: activity.message,
                  time: formatRelativeTime(activity.created_at),
                  icon,
                  color,
                }
              })).map((activity, index) => {
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
              {!demoMode && activities.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-slate-400 text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Invoice List */}
        <Card className="bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <DollarSign className="text-white h-5 w-5" />
                  </div>
                  Invoice List
                </CardTitle>
                <CardDescription className="text-slate-100">
                  {mappedOverdueInvoices.length} overdue • {pastInvoices.length} completed
                </CardDescription>
              </div>
              <Button 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                  // Get all overdue invoice IDs
                  const overdueInvoiceIds = allInvoices
                    .filter(inv => inv.status === "OVERDUE")
                    .map(inv => inv.id)
                  
                  if (overdueInvoiceIds.length === 0) return
                  
                  // Send bulk emails
                  sendBulkEmailsViaAPI(overdueInvoiceIds, 'polite')
                    .then(result => {
                      console.log(`Bulk email sent: ${result.sent_count} successful, ${result.failed_count} failed`)
                    })
                    .catch(error => {
                      console.error('Bulk email failed:', error)
                    })
                }}
              >
                <Zap className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Approve All Reminders</span>
                <span className="sm:hidden">Approve All</span> ({allInvoices.filter(inv => inv.status === "OVERDUE").length})
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
                if (invoice.status === "PAID") {
                  // Render paid invoice
                  const insights = getPaymentInsights(invoice)
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
                        <div className="flex-1">
                          <div className="font-bold text-xl text-white">
                            {invoice.client}
                            {invoice.id && (
                              <span className="text-slate-400 font-normal text-lg ml-2">
                                #{invoice.id}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-slate-300 font-medium">
                            <span className="font-bold text-green-400">${invoice.amount.toLocaleString()}</span> • Paid
                            {'daysToPayment' in invoice && invoice.daysToPayment !== null ? ` in ${invoice.daysToPayment} days` : ' (unknown)'}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Sent: {'dateSent' in invoice ? formatDate(invoice.dateSent) : ''}
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Paid: {'datePaid' in invoice ? formatDate(invoice.datePaid) : ''}
                            </div>
                          </div>
                          
                          {/* Payment Insights */}
                          <div className="mt-2 space-y-1">
                            <div className="text-xs text-green-400 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              <span className="font-medium">{insights.successMessage}</span>
                            </div>
                            <div className="text-xs text-slate-400">
                              {insights.clientPattern} • {insights.comparisonToAverage}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedInvoice({ ...invoice, isPastInvoice: true })}
                          className="text-slate-400 hover:text-white hover:bg-slate-600 transition-all duration-300"
                        >
                          <span className="hidden sm:inline">View Details</span>
                          <span className="sm:hidden">View</span>
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
                        <div className="flex-1">
                          <div className="font-bold text-xl text-white">
                            {invoice.client}
                            {invoice.id && (
                              <span className="text-slate-400 font-normal text-lg ml-2">
                                #{invoice.id}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-slate-300 font-medium">
                            <span className="font-bold text-green-400">${invoice.amount.toLocaleString()}</span> • {days} days overdue
                          </div>
                          <div className={`text-xs mt-1 font-medium ${getStatusTextColor(days)}`}>
                            {getStatusText(days)}
                          </div>
                          
                          {/* Reminder History Context */}
                          {(() => {
                            const history = getReminderHistory(invoice)
                            const suggestion = getSmartSuggestion(invoice)
                            
                            return (
                              <div className="mt-2 space-y-1">
                                {history.hasReminders ? (
                                  <div className="text-xs text-slate-400 flex items-center gap-1">
                                    <Send className="h-3 w-3" />
                                    <span>{history.reminderCount} reminder{history.reminderCount > 1 ? 's' : ''} sent</span>
                                    <span>•</span>
                                    <span>Last sent: {history.lastReminderDate}</span>
                                    <span>•</span>
                                    <span>Tone: {history.lastReminderTone}</span>
                                  </div>
                                ) : (
                                  <div className="text-xs text-slate-400 flex items-center gap-1">
                                    <Send className="h-3 w-3" />
                                    <span>No reminders sent yet</span>
                                  </div>
                                )}
                                
                                {/* Smart Suggestion for High-Risk Clients */}
                                {suggestion && (
                                  <div className="text-xs text-yellow-400 flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">
                                    <Brain className="h-3 w-3" />
                                    <span>{suggestion}</span>
                                  </div>
                                )}
                              </div>
                            )
                          })()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {sentReminders.has(invoice.id) ? (
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-lg border border-green-500/20">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-green-400 font-medium">Sent</span>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => setSelectedInvoice({ ...invoice, status: "OVERDUE" })}
                            className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-4 py-1"
                          >
                            <span className="hidden sm:inline">Review & Approve</span>
                            <span className="sm:hidden">Review</span>
                          </Button>
                        )}
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
                    {selectedInvoice.isPastInvoice 
                      ? "Invoice Details" 
                      : isEditingMessage 
                        ? "Edit Message" 
                        : `Overdue Invoice #${selectedInvoice.id} - ${selectedInvoice.client}`}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsEditingMessage(false)
                      setSelectedInvoice(null)
                    }}
                    className="hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-all duration-300"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Success Banner for Paid Invoices */}
                  {selectedInvoice.isPastInvoice && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-green-400 font-semibold text-lg">
                            {getPaymentInsights(selectedInvoice).successMessage}
                          </div>
                          <div className="text-green-300 text-sm mt-1">
                            Great work! Lance helped streamline your payment process.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Invoice Details Card */}
                  <div className="bg-slate-700 p-5 rounded-xl border border-slate-600">
                    <div className="text-sm text-slate-300 mb-2 font-medium">
                      To: <span className="text-blue-400 hover:text-blue-300 cursor-pointer underline decoration-dotted" onClick={() => {
                        // In a real implementation, this would open a client history modal
                        console.log(`Opening client history for ${selectedInvoice.client}`)
                      }}>
                        {selectedInvoice.client}
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2 font-medium">
                      Subject: {selectedInvoice.isPastInvoice ? "Payment Reminder" : "Friendly reminder"} - Invoice #
                      {selectedInvoice.id}
                    </div>
                    <div className="text-sm text-slate-300 font-medium">
                      Amount: ${selectedInvoice.amount.toLocaleString()}
                    </div>
                    
                    {selectedInvoice.isPastInvoice ? (
                      // Paid invoice details
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
                            <div className="text-blue-400 font-medium">{selectedInvoice.daysToPayment !== null ? `${selectedInvoice.daysToPayment} days` : 'Unknown'}</div>
                          </div>
                        </div>
                        
                        {/* Payment Insights */}
                        <div className="mt-4 pt-3 border-t border-slate-600">
                          <div className="text-sm font-medium text-slate-300 mb-2">Payment Insights</div>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2">
                              <Brain className="h-3 w-3 text-blue-400" />
                              <span className="text-slate-300">{getPaymentInsights(selectedInvoice).clientPattern}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BarChart2 className="h-3 w-3 text-purple-400" />
                              <span className="text-slate-300">{getPaymentInsights(selectedInvoice).comparisonToAverage}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              <span className="text-slate-300">{getPaymentInsights(selectedInvoice).paymentReliability}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Overdue invoice details
                      <div className="mt-3 pt-3 border-t border-slate-600">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Status:</span>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="outline" 
                                className={
                                  (selectedInvoice.daysOverdue ?? 0) <= 7 
                                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" 
                                    : (selectedInvoice.daysOverdue ?? 0) <= 14 
                                    ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                }
                              >
                                {selectedInvoice.daysOverdue} Days Overdue
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-400">Risk Level:</span>
                            <div className="flex items-center gap-2">
                              <div className="relative group">
                                <Badge 
                                  variant="outline" 
                                  className={
                                    (selectedInvoice.daysOverdue ?? 0) <= 7 
                                      ? "bg-green-500/10 text-green-400 border-green-500/20 cursor-help" 
                                      : (selectedInvoice.daysOverdue ?? 0) <= 14 
                                      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 cursor-help"
                                      : "bg-red-500/10 text-red-400 border-red-500/20 cursor-help"
                                  }
                                >
                                  {(selectedInvoice.daysOverdue ?? 0) <= 7 ? "Low" : (selectedInvoice.daysOverdue ?? 0) <= 14 ? "Medium" : "High"}
                                </Badge>
                                {demoMode && getRiskHistory(selectedInvoice.client) && (
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-slate-200 text-xs rounded-lg shadow-lg border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                    {getRiskHistory(selectedInvoice.client)}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-400">Next Reminder:</span>
                            <div className="text-slate-300 font-medium">
                              {selectedInvoice.nextFollowUpDate 
                                ? formatDate(selectedInvoice.nextFollowUpDate) 
                                : formatDate(calculateNextFollowUpDate(selectedInvoice.daysOverdue ?? 0).toISOString())
                              }
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-400">Planned Tone:</span>
                            <div className="text-slate-300 font-medium">
                              {getRecommendedTone(selectedInvoice.daysOverdue ?? 0)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Last reminder sent info */}
                        {selectedInvoice.lastReminderSent && (
                          <div className="mt-3 pt-3 border-t border-slate-600">
                            <div className="text-sm">
                              <span className="text-slate-400">Last Reminder Sent:</span>
                              <div className="text-slate-300 font-medium">{formatDate(selectedInvoice.lastReminderSent)}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Email Thread Section */}
                  {(selectedInvoice.emailThread || emailThreads.length > 0) && !isEditingMessage && (
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
                              {selectedInvoice.isPastInvoice ? "Communication History" : "Previous Communications"} ({demoMode ? selectedInvoice.emailThread?.length || 0 : emailThreads.length})
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
                          {(demoMode ? selectedInvoice.emailThread ?? [] : emailThreads.map(thread => ({
                            id: thread.id.toString(),
                            date: thread.created_at,
                            subject: thread.subject,
                            tone: thread.tone,
                            content: thread.content
                          }))).map((email) => (
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

                  {/* Payment Timeline for Paid Invoices */}
                  {selectedInvoice.isPastInvoice && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-400" />
                        <h4 className="text-lg font-semibold text-white">Payment Journey</h4>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                        <div className="space-y-3">
                          {getPaymentTimeline(selectedInvoice).map((step, index) => {
                            const IconComponent = step.icon
                            return (
                              <div key={index} className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-full bg-slate-600 ${step.color}`}>
                                  <IconComponent className="h-3 w-3" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-white">{step.step}</div>
                                  <div className="text-xs text-slate-400">{step.date}</div>
                                </div>
                                {index < getPaymentTimeline(selectedInvoice).length - 1 && (
                                  <div className="w-px h-6 bg-slate-600 mx-2"></div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Edit Message Section */}
                  {!selectedInvoice.isPastInvoice && isEditingMessage && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="text-sm font-medium text-slate-300 mb-3">Select Tone:</div>
                        <div className="flex gap-3">
                          <Button
                            variant={selectedInvoice.tone === "Polite" ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              const newTone = "Polite"
                              const defaultMessage = generateDefaultMessage(selectedInvoice, newTone)
                              setSelectedInvoice({ 
                                ...selectedInvoice, 
                                tone: newTone,
                                customMessage: selectedInvoice.customMessage || defaultMessage
                              })
                            }}
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
                            onClick={() => {
                              const newTone = "Professional"
                              const defaultMessage = generateDefaultMessage(selectedInvoice, newTone)
                              setSelectedInvoice({ 
                                ...selectedInvoice, 
                                tone: newTone,
                                customMessage: selectedInvoice.customMessage || defaultMessage
                              })
                            }}
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
                            onClick={() => {
                              const newTone = "Firm"
                              const defaultMessage = generateDefaultMessage(selectedInvoice, newTone)
                              setSelectedInvoice({ 
                                ...selectedInvoice, 
                                tone: newTone,
                                customMessage: selectedInvoice.customMessage || defaultMessage
                              })
                            }}
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

                      <div className="space-y-4">
                        <div className="text-sm font-medium text-slate-300 mb-3">Edit Message Content:</div>
                        <Textarea
                          value={selectedInvoice.customMessage || generateDefaultMessage(selectedInvoice, selectedInvoice.tone || "Polite")}
                          onChange={(e) => setSelectedInvoice({ 
                            ...selectedInvoice, 
                            customMessage: e.target.value 
                          })}
                          className="min-h-[200px] bg-slate-700 border-slate-600 text-slate-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Edit your message content here..."
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const defaultMessage = generateDefaultMessage(selectedInvoice, selectedInvoice.tone || "Polite")
                              setSelectedInvoice({ 
                                ...selectedInvoice, 
                                customMessage: defaultMessage
                              })
                            }}
                            className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 text-xs"
                          >
                            Reset to Default
                          </Button>
                          <div className="text-xs text-slate-400 flex items-center">
                            You can customize the message while keeping the selected tone
                          </div>
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
                  )}

                  {/* Upcoming Reminder Section for Overdue Invoices */}
                  {!selectedInvoice.isPastInvoice && !isEditingMessage && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-400" />
                        <h4 className="text-lg font-semibold text-white">Upcoming Reminder</h4>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                              {getRecommendedTone(selectedInvoice.daysOverdue ?? 0)} Tone
                            </Badge>
                            <span className="text-sm text-slate-400">
                              Scheduled for {formatDate(calculateNextFollowUpDate(selectedInvoice.daysOverdue ?? 0).toISOString())}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap bg-slate-700 rounded p-3 border border-slate-600">
                          {selectedInvoice.customMessage || generateDefaultMessage(selectedInvoice, getRecommendedTone(selectedInvoice.daysOverdue ?? 0))}
                        </div>
                        <div className="mt-3 text-xs text-slate-400">
                          Lance will send this message using your selected tone and schedule.
                        </div>
                      </div>
                    </div>
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
                      ) : selectedInvoice.status === "DUE" ? (
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
                            onClick={() => {
                              // Initialize custom message if not already set
                              if (!selectedInvoice.customMessage) {
                                const defaultMessage = generateDefaultMessage(selectedInvoice, getRecommendedTone(selectedInvoice.daysOverdue ?? 0))
                                setSelectedInvoice({ 
                                  ...selectedInvoice, 
                                  customMessage: defaultMessage,
                                  tone: getRecommendedTone(selectedInvoice.daysOverdue ?? 0)
                                })
                              }
                              setIsEditingMessage(true)
                            }}
                          >
                            Edit Message
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 font-semibold transition-all duration-300"
                            onClick={() => {
                              // Schedule reminder for default delay (e.g., +2 days)
                              const nextFollowUp = new Date()
                              const daysToAdd = selectedInvoice.daysOverdue && selectedInvoice.daysOverdue > 14 ? 3 : 7
                              nextFollowUp.setDate(nextFollowUp.getDate() + daysToAdd)
                              
                              // Update the invoice with scheduled date
                              setSelectedInvoice({
                                ...selectedInvoice,
                                nextFollowUpDate: nextFollowUp.toISOString()
                              })
                              
                              // Show success notification
                              if (typeof window !== 'undefined') {
                                window.dispatchEvent(new CustomEvent('toast', { 
                                  detail: { 
                                    message: `Reminder scheduled for ${formatDate(nextFollowUp.toISOString())}`,
                                    type: 'success'
                                  } 
                                }))
                              }
                              
                              // Close modal after scheduling
                              setTimeout(() => {
                                setSelectedInvoice(null)
                              }, 1500)
                            }}
                          >
                            Schedule Reminder
                          </Button>
                          <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={sendingReminder === selectedInvoice.id}
                            onClick={() => {
                              if (!selectedInvoice) return
                              
                              setSendingReminder(selectedInvoice.id)
                              
                              // Send email via API with recommended tone
                              const recommendedTone = getRecommendedTone(selectedInvoice.daysOverdue ?? 0)
                              sendEmailViaAPI(selectedInvoice, recommendedTone)
                                .then(() => {
                                  // Show success state briefly before closing
                                  setTimeout(() => {
                                    setSendingReminder(null)
                                    setSelectedInvoice(null)
                                  }, 1500)
                                })
                                .catch(error => {
                                  console.error('Failed to send email:', error)
                                  setSendingReminder(null)
                                  // Could show a toast notification here
                                })
                            }}
                          >
                            {sendingReminder === selectedInvoice.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Sending...
                              </>
                            ) : (
                              "Send Reminder Now"
                            )}
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
