"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { submitToHubspot, validateEmail } from "@/lib/hubspot"

interface WaitlistFormProps {
  variant?: "hero" | "cta" | "demo" | "contact"
  className?: string
}

export function WaitlistForm({ variant = "hero", className = "" }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [honeypot, setHoneypot] = useState("") // Spam protection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Honeypot check
    if (honeypot) {
      console.log("Bot detected via honeypot")
      return
    }

    // Validate email
    if (!email.trim()) {
      setStatus("error")
      setMessage("Please enter your email address")
      return
    }

    if (!validateEmail(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setStatus("idle")
    setMessage("")

    try {
      await submitToHubspot(email, getSource())
      setStatus("success")
      setMessage(getSuccessMessage())
      setEmail("")
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = variant === "hero" 
    ? "flex-1 px-4 py-3 text-lg rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
    : "flex-1 px-4 py-3 text-lg rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"

  const buttonClasses = variant === "hero"
    ? "cta-button-primary text-white px-8 py-6 text-lg font-semibold rounded-xl whitespace-nowrap"
    : "cta-button-primary text-white px-8 py-6 text-lg font-semibold rounded-xl whitespace-nowrap"

  const secondaryButtonClasses = variant === "hero"
    ? "bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg font-semibold rounded-xl whitespace-nowrap border border-white/20"
    : "bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg font-semibold rounded-xl whitespace-nowrap border border-white/20"

  const getButtonText = () => {
    switch (variant) {
      case "contact":
        return "Start Getting Paid Faster"
      case "demo":
        return "Get Early Access"
      case "hero":
      case "cta":
      default:
        return "Be First to Try Lance"
    }
  }

  const getSuccessMessage = () => {
    switch (variant) {
      case "contact":
      case "demo":
      case "hero":
      case "cta":
      default:
        return "Thanks! You'll be getting paid faster soon"
    }
  }

  const getSource = () => {
    switch (variant) {
      case "demo":
        return "demo"
      case "hero":
        return "waitlist"
      case "cta":
        return "waitlist"
      default:
        return "waitlist"
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-3xl mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting || status === "success"}
            className={inputClasses}
            required
          />
          <Button 
            type="submit"
            size="lg" 
            disabled={isSubmitting || status === "success"}
            className={buttonClasses}
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              getButtonText()
            )}
          </Button>
          <Button 
            type="button"
            size="lg"
            className={secondaryButtonClasses}
            onClick={() => window.location.href = '/dashboard'}
          >
            See Demo
          </Button>
        </div>
        
        {/* Honeypot field for spam protection */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute left-[-9999px]"
          tabIndex={-1}
          autoComplete="off"
        />
      </form>

      {/* Status Messages */}
      {status !== "idle" && (
        <div className={`mt-4 text-center ${
          status === "success" ? "text-green-400" : "text-red-400"
        }`}>
          <div className="flex items-center justify-center gap-2">
            {status === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-sm">{message}</span>
          </div>
        </div>
      )}
    </div>
  )
} 