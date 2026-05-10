"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Mail, ShieldCheck, Lock, Loader2 } from "lucide-react";
import { TZ } from "@/lib/tz";

interface Props {
  value: string;
  onboardingData?: Record<string, any>;
  onSubmit: (email: string) => void;
}

export function ScreenEmailCapture({ value, onSubmit, onboardingData }: Props) {
  const [email, setEmail] = useState(value);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email.trim()) { setError("Please enter your email"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email"); return; }
    setError("");
    setLoading(true);
    try {
      await TZ.storefront.auth.sendOtp({ identifier: email, type: "email" });
      setOtpSent(true);
    } catch (err: any) {
      setError(err?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) return;
    setError("");
    setLoading(true);
    try {
      const result: any = await TZ.storefront.auth.verifyOtp({ identifier: email, otp, type: "email" });

      // Returning user with active subscription → skip to dashboard
      if (result?.user?.subscription?.status === "active") {
        window.location.href = "/feed";
        return;
      }

      // Save onboarding data + create marketplace profile (now authenticated)
      if (onboardingData) {
        try {
          await Promise.resolve(TZ.storefront.marketplace.saveOnboarding(onboardingData as any));
        } catch {
          // Onboarding save failed — non-blocking, profile will be created on next login
        }
      }

      onSubmit(email);
    } catch (err: any) {
      setError(err?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // OTP verification screen
  if (otpSent) {
    return (
      <div className="animate-slide-up flex flex-col gap-8 px-5">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-sk-emerald/8 flex items-center justify-center">
            <Mail className="h-7 w-7 text-sk-emerald" />
          </div>
          <div className="space-y-2">
            <h2 className="text-[22px] font-bold tracking-tight">Check your inbox</h2>
            <p className="text-[13px] text-muted-foreground max-w-xs">
              We sent a verification code to <strong className="text-foreground">{email}</strong>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={otp}
            onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
            placeholder="Enter OTP"
            autoFocus
            className={cn(
              "w-full rounded-2xl bg-card shadow-soft px-5 py-4",
              "text-center text-[22px] font-mono tracking-[0.5em]",
              "placeholder:text-muted-foreground/50 placeholder:tracking-normal placeholder:text-[15px] placeholder:font-sans",
              "focus:outline-none focus:ring-2 focus:ring-sk-emerald focus:shadow-card",
              error && "ring-2 ring-destructive"
            )}
          />
          {error && <p className="text-xs text-destructive text-center">{error}</p>}
        </div>

        <button
          onClick={handleVerifyOtp}
          disabled={otp.length < 4 || loading}
          className={cn(
            "w-full rounded-2xl py-4 text-[15px] font-semibold flex items-center justify-center gap-2",
            otp.length >= 4 ? "bg-foreground text-background" : "bg-secondary text-muted-foreground cursor-not-allowed"
          )}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Continue"}
        </button>

        <div className="flex items-center justify-center gap-4 text-[12px]">
          <button onClick={handleSendOtp} className="text-sk-emerald font-medium">Resend OTP</button>
          <span className="text-border">|</span>
          <button onClick={() => { setOtpSent(false); setOtp(""); setError(""); }} className="text-muted-foreground">Change email</button>
        </div>
      </div>
    );
  }

  // Email input screen
  return (
    <div className="animate-slide-up flex flex-col gap-8 px-5">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-3xl bg-sk-emerald/8 flex items-center justify-center">
          <Mail className="h-7 w-7 text-sk-emerald" />
        </div>
        <div className="space-y-2">
          <h2 className="text-[22px] font-bold tracking-tight">
            Let&apos;s verify you
          </h2>
          <p className="text-[13px] text-muted-foreground max-w-xs">
            Enter your email — we&apos;ll send a quick verification code.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
          placeholder="your@email.com"
          className={cn(
            "w-full rounded-2xl bg-card shadow-soft px-5 py-4",
            "text-[15px] placeholder:text-muted-foreground/50",
            "focus:outline-none focus:ring-2 focus:ring-sk-emerald focus:shadow-card",
            "transition-all",
            error && "ring-2 ring-destructive"
          )}
        />
        {error && <p className="text-xs text-destructive px-1">{error}</p>}
      </div>

      <div className="flex flex-col gap-2.5">
        {[
          { Icon: ShieldCheck, text: "Zero spam, ever" },
          { Icon: Lock, text: "DPDP Act 2023 compliant" },
        ].map(({ Icon, text }, i) => (
          <div key={i} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
            <Icon className="h-4 w-4 text-sk-emerald/60 shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleSendOtp}
        disabled={loading}
        className={cn(
          "w-full rounded-2xl py-4 text-[15px] font-semibold flex items-center justify-center gap-2",
          "bg-foreground text-background shadow-soft hover:shadow-card",
          "active:scale-[0.98] transition-all"
        )}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Verification Code"}
      </button>

      <p className="text-[10px] text-center text-muted-foreground/60">
        By continuing you agree with our terms of service and privacy policy
      </p>
    </div>
  );
}
