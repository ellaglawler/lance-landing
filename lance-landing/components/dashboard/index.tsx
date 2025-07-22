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

// Define interfaces for our invoice types
interface EmailMessage {
  id: string
  date: string
  tone: "Polite" | "Professional" | "Firm"
  content: string
  wasOpened?: boolean
  wasClicked?: boolean
}

interface BaseInvoice {
  id: number
  client: string
  amount: number
  avatar: string
  status: "overdue" | "paid"
  dateIssued: string
  dateDue: string
  emailThread: EmailMessage[]
  isPastInvoice?: boolean
}

interface OverdueInvoice extends BaseInvoice {
  status: "overdue"
  daysOverdue: number
  tone: "Polite" | "Professional" | "Firm"
  lastContacted?: string
  pendingResponse?: boolean
}

interface PaidInvoice extends BaseInvoice {
  status: "paid"
  datePaid: string
  daysToPayment: number
}

type Invoice = OverdueInvoice | PaidInvoice

export default function LanceDashboard() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [amountFilter, setAmountFilter] = useState("all")
  const [daysFilter, setDaysFilter] = useState("all")
  const [isEditing, setIsEditing] = useState(false)

  // Sample data - in real app this would come from an API
  const overdueInvoices: OverdueInvoice[] = [
    {
      id: 1,
      client: "Acme Design Co.",
      amount: 1200,
      daysOverdue: 14,
      avatar: "AD",
      status: "overdue",
      tone: "Polite",
      dateIssued: "2024-02-01",
      dateDue: "2024-02-15",
      lastContacted: "2024-02-23",
      pendingResponse: true,
      emailThread: [
        {
          id: "e1",
          date: "2024-02-16",
          tone: "Polite",
          content: "Hi there! I hope you're doing well! I wanted to follow up on invoice #1...",
          wasOpened: true,
          wasClicked: true
        }
      ]
    }
  ]

  const pastInvoices: PaidInvoice[] = [
    {
      id: 101,
      client: "Blue Corp",
      amount: 2500,
      avatar: "BC",
      dateIssued: "2024-01-01",
      dateDue: "2024-01-15",
      datePaid: "2024-01-18",
      daysToPayment: 3,
      status: "paid",
      emailThread: []
    }
  ]

  // Combine all invoices
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
        if (invoice.status === "paid") return true
        if (!("daysOverdue" in invoice)) return true
        if (daysFilter === "1-7") return invoice.daysOverdue >= 1 && invoice.daysOverdue <= 7
        if (daysFilter === "8-14") return invoice.daysOverdue >= 8 && invoice.daysOverdue <= 14
        if (daysFilter === "15-30") return invoice.daysOverdue >= 15 && invoice.daysOverdue <= 30
        if (daysFilter === "30+") return invoice.daysOverdue > 30
        return true
      })
    }

    return filtered
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const filteredInvoices = getFilteredInvoices()

  return (
    <div className="min-h-screen bg-slate-900 p-6">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoice List */}
          <div className="lg:col-span-2">
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

              <CardContent className="space-y-4 p-6">
                {filteredInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-5 border-l-4 border-l-slate-600 bg-slate-700/30 hover:bg-slate-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 ring-4 ring-slate-600/30 shadow-lg">
                        <AvatarFallback className="bg-slate-600 text-white font-bold text-lg">
                          {invoice.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-xl text-white">{invoice.client}</div>
                        <div className="text-sm text-slate-300 font-medium">
                          <span className="font-bold text-slate-200">${invoice.amount.toLocaleString()}</span>
                          {invoice.status === "overdue" && ` • ${invoice.daysOverdue} days overdue`}
                          {invoice.status === "paid" && ` • Paid in ${invoice.daysToPayment} days`}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {formatDate(invoice.dateDue)}
                          </div>
                          {invoice.status === "paid" && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Paid: {formatDate(invoice.datePaid)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add activity items here */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 