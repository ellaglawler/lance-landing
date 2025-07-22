"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Placeholder: Replace with your backend's Google OAuth URL
const GOOGLE_OAUTH_URL = "/api/auth/google";

// Step Enum
const STEP = {
  SIGNIN: 0,
  SCANNING: 1,
  RESULTS: 2,
  ERROR: 3,
};

export default function OnboardingPage() {
  const [step, setStep] = useState(STEP.SIGNIN);
  const [scanResult, setScanResult] = useState<null | { count: number; total: number }>(null);
  const [noInvoices, setNoInvoices] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Listen for OAuth callback via postMessage
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const { code, error } = event.data || {};
      if (code) {
        setStep(STEP.SCANNING);
        // Placeholder: Simulate backend scan
        setTimeout(() => {
          // Simulate scan result (random for demo)
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

  // Step 1: Sign in with Google
  if (step === STEP.SIGNIN) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Welcome to Lance — your smarter way to get paid.</h1>
        <p className="mb-6">
          Let us find and follow up on unpaid invoices in your inbox — so you can spend less time chasing clients and more time doing what you love.
        </p>
        <div className="mb-4 text-sm bg-gray-50 p-3 rounded">
          <div>Here’s what happens when you continue:</div>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>✅ Log in securely with your Google account</li>
            <li>✅ Scan your inbox for unpaid invoices</li>
            <li>✅ Draft (and if you choose, send) polite reminders to your clients</li>
            <li>✅ Never read unrelated emails or spam anyone — you’re always in control</li>
          </ul>
        </div>
        <button
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold text-lg"
          onClick={() => {
            // Open OAuth in popup
            window.open(
              GOOGLE_OAUTH_URL,
              "google-oauth",
              "width=500,height=600"
            );
          }}
        >
          ☑ Sign in with Google
        </button>
        <div className="text-xs text-gray-500 mt-2">
          On the next screen, Google will ask you to confirm the permissions above. You can revoke access anytime at myaccount.google.com/security.
        </div>
      </div>
    );
  }

  // Step 2: Scanning Inbox
  if (step === STEP.SCANNING) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Scanning your inbox…</h1>
        <p className="mb-6">Hang tight while we search your inbox for unpaid invoices and set things up.<br/>This usually takes just a few seconds.</p>
        <div className="w-full h-2 bg-gray-200 rounded mb-4">
          <div className="h-2 bg-blue-500 rounded animate-pulse" style={{ width: "80%" }}></div>
        </div>
        <div className="text-xs text-gray-500">We only scan emails related to invoices — never your personal conversations.</div>
      </div>
    );
  }

  // Step 3: Results
  if (step === STEP.RESULTS) {
    if (noInvoices) {
      return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow text-center">
          <h1 className="text-2xl font-bold mb-4">We didn’t find any unpaid invoices in your inbox — nice work!</h1>
          <p className="mb-6">You can still use Lance to track and manage future invoices from your dashboard.</p>
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold text-lg"
            onClick={() => router.push("/app/dashboard")}
          >
            → Go to My Dashboard
          </button>
        </div>
      );
    }
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Here’s what we found!</h1>
        <p className="mb-6">🎉 We found <b>{scanResult?.count} unpaid invoices</b> worth <b>${scanResult?.total}</b>.<br/>Next, we’ll help you follow up with your clients — you choose if we draft them for you (Copilot) or send them automatically (Autopilot).</p>
        <div className="flex flex-col gap-3">
          <button
            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 font-semibold text-lg"
            onClick={() => router.push("/app/dashboard?mode=copilot")}
          >
            → Review Draft Follow-Ups (Copilot)
          </button>
          <button
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold text-lg"
            onClick={() => router.push("/app/dashboard?mode=autopilot")}
          >
            → Start Sending Automatically (Autopilot)
          </button>
        </div>
      </div>
    );
  }

  // Step 4: OAuth Failure/Error
  if (step === STEP.ERROR) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Oops — we couldn’t connect to your inbox.</h1>
        <p className="mb-6">Without access, we can’t find or follow up on your invoices.<br/>You can try again or explore the dashboard and connect later.</p>
        <div className="flex flex-col gap-3">
          <button
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold text-lg"
            onClick={() => {
              setError(null);
              setStep(STEP.SIGNIN);
            }}
          >
            → Try Again
          </button>
          <button
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-semibold text-lg"
            onClick={() => router.push("/app/dashboard")}
          >
            → Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return null;
} 