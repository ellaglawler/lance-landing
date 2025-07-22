"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, Shield, Zap, UserCheck, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const GOOGLE_OAUTH_URL = "/api/auth/google";

const STEP = {
  SIGNIN: 0,
  SCANNING: 1,
  RESULTS: 2,
  ERROR: 3,
};

const checklist = [
  {
    icon: <CheckCircle className="text-green-500 mr-2" />, label: "Log in securely with your Google account"
  },
  {
    icon: <Mail className="text-blue-500 mr-2" />, label: "Scan your inbox for unpaid invoices"
  },
  {
    icon: <Zap className="text-yellow-500 mr-2" />, label: "Draft (and if you choose, send) polite reminders"
  },
  {
    icon: <Shield className="text-purple-500 mr-2" />, label: "Never read unrelated emails or spam anyone"
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(STEP.SIGNIN);
  const [scanResult, setScanResult] = useState<null | { count: number; total: number }>(null);
  const [noInvoices, setNoInvoices] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const { code, error } = event.data || {};
      if (code) {
        setStep(STEP.SCANNING);
        setTimeout(() => {
          const found = Math.random() > 0.3;
          if (found) {
            setScanResult({ count: 3, total: 2700 });
            setStep(STEP.RESULTS);
          } else {
            setNoInvoices(true);
            setStep(STEP.RESULTS);
          }
        }, 2000);
      } else if (error) {
        setError("OAuth failed or was denied.");
        setStep(STEP.ERROR);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      {/* Wave Background - Main background that spans all sections */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-wave-bg.png')",
          zIndex: -1
        }}
      ></div>
      {/* Hero background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F19]/80 to-[#0B0F19] opacity-90 z-10" />
      <main className="relative z-20 w-full flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-lg mx-auto">
          <Card className="shadow-lg bg-[#192132] border border-white/10 rounded-2xl p-0">
            <CardHeader className="flex flex-col items-center gap-2 pb-2">
              <Badge className="mb-2 bg-blue-700/80 text-white px-4 py-1 text-sm font-semibold">Onboarding</Badge>
              <CardTitle className="text-center text-3xl font-bold text-white mb-2">
                {step === STEP.SIGNIN && (
                  <>
                    Welcome to Lance <span className="gradient-text-enhanced">your smarter way to get paid.</span>
                  </>
                )}
                {step === STEP.SCANNING && "Scanning your inbox…"}
                {step === STEP.RESULTS && (noInvoices ? "No Unpaid Invoices Found" : "Here’s what we found!")}
                {step === STEP.ERROR && "Oops, we couldn’t connect to your inbox."}
              </CardTitle>
              {step === STEP.SIGNIN && (
                <CardDescription className="text-center text-gray-300 text-lg">
                  Let us find and follow up on unpaid invoices in your inbox, so you can spend less time chasing clients and more time doing what you love.
                </CardDescription>
              )}
              {step === STEP.SCANNING && (
                <CardDescription className="text-center text-gray-300 text-lg">
                  Hang tight while we search your inbox for unpaid invoices and set things up.<br />This usually takes just a few seconds.
                </CardDescription>
              )}
              {step === STEP.RESULTS && noInvoices && (
                <CardDescription className="text-center text-gray-300 text-lg">
                  You can still use Lance to track and manage future invoices from your dashboard.
                </CardDescription>
              )}
              {step === STEP.ERROR && (
                <CardDescription className="text-center text-gray-300 text-lg">
                  Without access, we can’t find or follow up on your invoices.<br />You can try again or explore the dashboard and connect later.
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="px-8 pb-8 pt-2">
              {step === STEP.SIGNIN && (
                <>
                  <ul className="mb-6 mt-2 space-y-3">
                    {checklist.map((item, i) => (
                      <li key={i} className="flex items-center text-base text-gray-200">
                        {item.icon}
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full py-2 px-4 text-lg mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    onClick={() => {
                      window.open(
                        GOOGLE_OAUTH_URL,
                        "google-oauth",
                        "width=500,height=600"
                      );
                    }}
                  >
                    <UserCheck className="mr-2" /> Sign in with Google
                  </Button>
                  <div className="text-xs text-gray-400 mt-3 text-center">
                    On the next screen, Google will ask you to confirm the permissions above. You can revoke access anytime at myaccount.google.com/security.
                  </div>
                  {/* Testimonial */}
                  <div className="mt-8 p-4 bg-[#232B3A] rounded-xl border border-white/10 max-w-md mx-auto">
                    <p className="text-sm text-blue-200 italic mb-1">
                      "Lance found 3 overdue invoices I had completely forgotten about!"
                    </p>
                    <p className="text-xs text-blue-400">— Sarah Chen, Freelance Designer</p>
                  </div>
                </>
              )}
              {step === STEP.SCANNING && (
                <div className="flex flex-col items-center gap-6 mt-4">
                  <Progress value={80} className="w-full h-3 bg-[#232B3A]" />
                  <div className="text-xs text-gray-400">We only scan emails related to invoices, never your personal conversations.</div>
                </div>
              )}
              {step === STEP.RESULTS && !noInvoices && (
                <div className="flex flex-col items-center gap-6 mt-2">
                  <div className="text-2xl font-semibold text-green-400 mb-2">🎉 We found <b>{scanResult?.count} unpaid invoices</b> worth <b>${scanResult?.total}</b>.</div>
                  <div className="text-gray-300 text-base mb-4">Next, we’ll help you follow up with your clients, you choose if we draft them for you (Copilot) or send them automatically (Autopilot).</div>
                  <div className="flex flex-col gap-3 w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={() => router.push("/app/dashboard?mode=copilot")}>→ Review Draft Follow-Ups (Copilot)</Button>
                    <Button className="w-full bg-[#232B3A] hover:bg-[#283146] text-blue-200 font-semibold border border-blue-700" variant="secondary" onClick={() => router.push("/app/dashboard?mode=autopilot")}>→ Start Sending Automatically (Autopilot)</Button>
                  </div>
                </div>
              )}
              {step === STEP.RESULTS && noInvoices && (
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={() => router.push("/app/dashboard")}>→ Go to My Dashboard</Button>
              )}
              {step === STEP.ERROR && (
                <div className="flex flex-col gap-3 w-full mt-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={() => { setError(null); setStep(STEP.SIGNIN); }}>→ Try Again</Button>
                  <Button className="w-full bg-[#232B3A] hover:bg-[#283146] text-blue-200 font-semibold border border-blue-700" variant="secondary" onClick={() => router.push("/app/dashboard")}>→ Go to Dashboard</Button>
                  <Alert variant="destructive" className="mt-4 bg-[#232B3A] border border-red-700 text-red-300">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <AlertDescription>
                      There was a problem connecting to Google. Please try again or contact support if the issue persists.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 