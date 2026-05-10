"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { TZ } from "@/lib/tz";
import { Logo } from "@/components/logo";
import { Mail, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown > 0]);

  const handleSendOtp = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await TZ.storefront.auth.sendOtp({ identifier: email, type: "email" });
      setOtpSent(true);
      setCooldown(60);
    } catch (err: any) {
      setError(err?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) return;
    setLoading(true);
    setError("");
    try {
      const result: any = await TZ.storefront.auth.verifyOtp({ identifier: email, otp, type: "email" });

      // Check subscription from auth response — no extra API call
      if (result?.user?.subscription?.status === "active") {
        window.location.href = "/feed";
      } else {
        window.location.href = "/onboarding";
      }
    } catch (err: any) {
      setError(err?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <nav className="px-5 py-3.5">
        <Link href="/"><Logo size="sm" /></Link>
      </nav>

      <main className="flex-1 flex items-center justify-center px-5">
        <div className="w-full max-w-sm space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-3xl bg-sk-emerald/8 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-sk-emerald" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              {otpSent ? "Enter the code" : "Welcome back"}
            </h1>
            <p className="text-[13px] text-muted-foreground">
              {otpSent
                ? <>We sent a code to <strong className="text-foreground">{email}</strong></>
                : "Log in with your email to continue"
              }
            </p>
          </div>

          {/* Form */}
          {!otpSent ? (
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                placeholder="your@email.com"
                autoFocus
                className={cn(
                  "w-full rounded-2xl bg-card shadow-soft px-5 py-4 text-[15px]",
                  "placeholder:text-muted-foreground/50",
                  "focus:outline-none focus:ring-2 focus:ring-sk-emerald",
                  error && "ring-2 ring-destructive"
                )}
              />
              {error && <p className="text-xs text-destructive text-center">{error}</p>}
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full rounded-2xl py-4 text-[15px] font-semibold bg-foreground text-background flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send Code <ArrowRight className="h-4 w-4" /></>}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                placeholder="Enter code"
                autoFocus
                className={cn(
                  "w-full rounded-2xl bg-card shadow-soft px-5 py-4",
                  "text-center text-[22px] font-mono tracking-[0.5em]",
                  "placeholder:text-muted-foreground/50 placeholder:tracking-normal placeholder:text-[15px] placeholder:font-sans",
                  "focus:outline-none focus:ring-2 focus:ring-sk-emerald",
                  error && "ring-2 ring-destructive"
                )}
              />
              {error && <p className="text-xs text-destructive text-center">{error}</p>}
              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length < 4}
                className={cn(
                  "w-full rounded-2xl py-4 text-[15px] font-semibold flex items-center justify-center gap-2 transition-all",
                  otp.length >= 4 ? "bg-foreground text-background active:scale-[0.98]" : "bg-secondary text-muted-foreground cursor-not-allowed"
                )}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Log In"}
              </button>
              <div className="flex items-center justify-center gap-4 text-[12px]">
                <button onClick={handleSendOtp} disabled={cooldown > 0} className={cn("font-medium", cooldown > 0 ? "text-muted-foreground cursor-not-allowed" : "text-sk-emerald")}>
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                </button>
                <span className="text-border">|</span>
                <button onClick={() => { setOtpSent(false); setOtp(""); setError(""); }} className="text-muted-foreground">Change email</button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center space-y-3">
            <p className="text-[12px] text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/onboarding" className="text-sk-emerald font-medium">Get started</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
