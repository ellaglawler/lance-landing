"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, Shield, Zap, UserCheck, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getGoogleSignupUrl, getGoogleSigninUrl, checkGmailToken, exchangeGoogleCode, scanInvoices } from '@/lib/api';
import { useAuth } from '@/components/auth-context';
import { WaitlistForm } from '@/components/waitlist-form';

const STEP = {
  ENTRY: -1,
  SIGNIN: 0,
  SCANNING: 1,
  RESULTS: 2,
  ERROR: 3,
  RECONNECT: 4,
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
  const [step, setStep] = useState(STEP.ENTRY);
  const [scanResult, setScanResult] = useState<null | { count: number; total: number }>(null);
  const [noInvoices, setNoInvoices] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false); // Track if user is new or returning
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  // Listen for OAuth callback via postMessage
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const { code, error, flow } = event.data || {};
      if (code) {
        setLoading(true);
        exchangeGoogleCode(code)
          .then((data) => {
            // Store JWT and user info in AuthContext
            login(data.access_token, data.user);
            if (isSignUp) {
              setStep(STEP.SCANNING);
              // Call scanInvoices API here
              scanInvoices()
                .then((data) => {
                  if (data && data.invoices && data.invoices.length > 0) {
                    const total = data.invoices.reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0);
                    setScanResult({ count: data.invoices.length, total });
                    setNoInvoices(false);
                  } else {
                    setNoInvoices(true);
                  }
                  setStep(STEP.RESULTS);
                })
                .catch(() => {
                  setError('Failed to scan for invoices.');
                  setStep(STEP.ERROR);
                })
                .finally(() => setLoading(false));
            } else {
              setStep(STEP.SCANNING);
              checkGmailToken()
                .then((tokensValid) => {
                  if (tokensValid) {
                    // Redirect to dashboard
                    router.push("/dashboard");
                  } else {
                    setStep(STEP.RECONNECT);
                  }
                })
                .catch(() => {
                  setError('Failed to check Gmail token.');
                  setStep(STEP.ERROR);
                });
            }
          })
          .catch(() => {
            setError('Google authentication failed.');
            setStep(STEP.ERROR);
          })
          .finally(() => setLoading(false));
      } else if (error) {
        setError("OAuth failed or was denied.");
        setStep(STEP.ERROR);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isSignUp, router, login]);

  // Entry screen: Sign Up or Sign In
  if (step === STEP.ENTRY) {
    // Read the env variable (must be NEXT_PUBLIC_ for client-side)
    const allowSignup = process.env.NEXT_PUBLIC_ALLOW_SIGNUP !== 'false';
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
                  Welcome back, or welcome aboard!
                </CardTitle>
                <CardDescription className="text-center text-gray-300 text-lg">
                  Lance helps you track unpaid invoices and follow up with clients, automatically or with your review.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-2">
                <div className="flex flex-col gap-4 w-full mt-4">
                  {allowSignup ? (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={() => { setIsSignUp(true); setStep(STEP.SIGNIN); }}>
                      → I’m New — Sign Up
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-4 items-center">
                      <div className="text-blue-200 text-center text-base font-semibold">
                        Lance is currently in Beta. Get access by joining the waitlist below:
                      </div>
                      <WaitlistForm showDemoButton={false} />
                    </div>
                  )}
                  <Button className="w-full bg-[#232B3A] hover:bg-[#283146] text-blue-200 font-semibold border border-blue-700" variant="secondary" onClick={() => { setIsSignUp(false); setStep(STEP.SIGNIN); }}>
                    → I Already Have an Account — Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Step 1: Sign in with Google (Sign Up or Sign In)
  if (step === STEP.SIGNIN) {
    const handleGoogleAuth = async () => {
      setLoading(true);
      // Open a blank popup immediately to avoid browser popup blocking
      const popup = window.open('', 'google-oauth', 'width=500,height=600');
      if (!popup) {
        setError('Popup blocked. Please allow popups for this site.');
        setStep(STEP.ERROR);
        setLoading(false);
        return;
      }
      // Optionally show a loading message in the popup
      popup.document.write('<p style="font-family:sans-serif;text-align:center;margin-top:2em;">Loading Google sign-in…</p>');
      try {
        let url = '';
        if (isSignUp) {
          url = await getGoogleSignupUrl();
        } else {
          url = await getGoogleSigninUrl();
        }
        popup.location.href = url;
      } catch (err) {
        popup.close();
        setError('Failed to initiate Google authentication.');
        setStep(STEP.ERROR);
      } finally {
        setLoading(false);
      }
    };
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
                <Badge className="mb-2 bg-blue-700/80 text-white px-4 py-1 text-sm font-semibold">{isSignUp ? "Sign Up" : "Sign In"}</Badge>
                <CardTitle className="text-center text-3xl font-bold text-white mb-2">
                  {isSignUp ? (
                    <>Welcome to Lance <span className="gradient-text-enhanced">your smarter way to get paid.</span></>
                  ) : (
                    <>Sign in to Lance <span className="gradient-text-enhanced">get paid faster.</span></>
                  )}
                </CardTitle>
                <CardDescription className="text-center text-gray-300 text-lg">
                  {isSignUp
                    ? "Let us find and follow up on unpaid invoices in your inbox, so you can spend less time chasing clients and more time doing what you love."
                    : "Sign in with Google to access your dashboard and keep tracking your invoices."}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-2">
                {isSignUp && (
                  <ul className="mb-6 mt-2 space-y-3">
                    {checklist.map((item, i) => (
                      <li key={i} className="flex items-center text-base text-gray-200">
                        {item.icon}
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Button
                  className="w-full py-2 px-4 text-lg mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                >
                  <UserCheck className="mr-2" /> {loading ? 'Loading…' : isSignUp ? "Sign up with Google" : "Sign in with Google"}
                </Button>
                <div className="text-xs text-gray-400 mt-3 text-center">
                  {isSignUp
                    ? "On the next screen, Google will ask you to confirm the permissions above. You can revoke access anytime at myaccount.google.com/security."
                    : "We’ll never access your inbox unless you give us permission."}
                </div>
                {isSignUp && (
                  <div className="mt-8 p-4 bg-[#232B3A] rounded-xl border border-white/10 max-w-md mx-auto">
                    <p className="text-sm text-blue-200 italic mb-1">
                      "Lance found 3 overdue invoices I had completely forgotten about!"
                    </p>
                    <p className="text-xs text-blue-400">— Sarah Chen, Freelance Designer</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Step: Reconnect Gmail OAuth for returning users with expired tokens
  if (step === STEP.RECONNECT) {
    const handleReconnect = async () => {
      setLoading(true);
      // Open a blank popup immediately to avoid browser popup blocking
      const popup = window.open('', 'google-oauth', 'width=500,height=600');
      if (!popup) {
        setError('Popup blocked. Please allow popups for this site.');
        setStep(STEP.ERROR);
        setLoading(false);
        return;
      }
      popup.document.write('<p style="font-family:sans-serif;text-align:center;margin-top:2em;">Loading Google sign-in…</p>');
      try {
        const url = await getGoogleSignupUrl();
        popup.location.href = url;
      } catch (err) {
        popup.close();
        setError('Failed to initiate Google authentication.');
        setStep(STEP.ERROR);
      } finally {
        setLoading(false);
      }
    };
    return (
      <div className="min-h-screen flex flex-col justify-center items-center relative">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-wave-bg.png')",
            zIndex: -1
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F19]/80 to-[#0B0F19] opacity-90 z-10" />
        <main className="relative z-20 w-full flex flex-col items-center justify-center min-h-screen">
          <div className="w-full max-w-lg mx-auto">
            <Card className="shadow-lg bg-[#192132] border border-white/10 rounded-2xl p-0">
              <CardHeader className="flex flex-col items-center gap-2 pb-2">
                <Badge className="mb-2 bg-yellow-700/80 text-white px-4 py-1 text-sm font-semibold">Reconnect Inbox</Badge>
                <CardTitle className="text-center text-2xl font-bold text-white mb-2">
                  We need to reconnect to your inbox to keep tracking your invoices.
                </CardTitle>
                <CardDescription className="text-center text-gray-300 text-lg">
                  Please re-authorize Gmail access so Lance can keep finding and following up on unpaid invoices for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-2">
                <Button
                  className="w-full py-2 px-4 text-lg mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  onClick={handleReconnect}
                  disabled={loading}
                >
                  <UserCheck className="mr-2" /> {loading ? 'Loading…' : 'Reconnect Inbox'}
                </Button>
                <div className="text-xs text-gray-400 mt-3 text-center">
                  You can revoke access anytime at myaccount.google.com/security.
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

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
                      setLoading(true);
                      getGoogleSigninUrl()
                        .then((url) => window.open(url, "google-oauth", "width=500,height=600"))
                        .catch((err) => {
                          setError('Failed to initiate Google authentication.');
                          setStep(STEP.ERROR);
                        })
                        .finally(() => setLoading(false));
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
                  <div className="text-2xl font-semibold text-green-400 mb-2">🎉 We found <b>{scanResult?.count} unpaid invoices</b> worth <b>{Number(scanResult?.total).toLocaleString("en-US", { style: "currency", currency: "USD" })}</b>.</div>
                  <div className="text-gray-300 text-base mb-4">Next, we’ll help you follow up with your clients, you choose if we draft them for you (Copilot) or send them automatically (Autopilot).</div>
                  <div className="flex flex-col gap-3 w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={() => router.push("/dashboard?mode=copilot")}>→ Review Draft Follow-Ups (Copilot)</Button>
                    <Button className="w-full bg-[#232B3A] hover:bg-[#283146] text-blue-200 font-semibold border border-blue-700" variant="secondary" onClick={() => router.push("/dashboard?mode=autopilot")}>→ Start Sending Automatically (Autopilot)</Button>
                  </div>
                </div>
              )}
              {step === STEP.RESULTS && noInvoices && (
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={() => router.push("/dashboard")}>→ Go to My Dashboard</Button>
              )}
              {step === STEP.ERROR && (
                <div className="flex flex-col gap-3 w-full mt-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={() => { setError(null); setStep(STEP.SIGNIN); }}>→ Try Again</Button>
                  <Button className="w-full bg-[#232B3A] hover:bg-[#283146] text-blue-200 font-semibold border border-blue-700" variant="secondary" onClick={() => router.push("/dashboard")}>→ Go to Dashboard</Button>
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