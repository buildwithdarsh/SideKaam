"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Smartphone, Mail, Loader2 } from "lucide-react";
import { TZ, getCachedConfig, getAppConfig } from "@/lib/tz";

interface Props {
  onSelect: (provider: string) => void;
}

interface AuthConfig {
  google_oauth_enabled: boolean;
  phone_otp_enabled: boolean;
  email_password_enabled: boolean;
  otp_length: number;
  country_code: string;
}

const defaultAuth: AuthConfig = {
  google_oauth_enabled: true,
  phone_otp_enabled: true,
  email_password_enabled: true,
  otp_length: 6,
  country_code: "+91",
};

function getAuthConfig(config: any): AuthConfig {
  return {
    google_oauth_enabled: config?.auth?.google_oauth_enabled ?? defaultAuth.google_oauth_enabled,
    phone_otp_enabled: config?.auth?.phone_otp_enabled ?? defaultAuth.phone_otp_enabled,
    email_password_enabled: config?.auth?.email_password_enabled ?? defaultAuth.email_password_enabled,
    otp_length: config?.auth?.otp_length ?? defaultAuth.otp_length,
    country_code: config?.branding?.country_code ?? defaultAuth.country_code,
  };
}

export function ScreenAccountCreation({ onSelect }: Props) {
  const cached = getCachedConfig();
  const [auth, setAuth] = useState<AuthConfig>(getAuthConfig(cached));
  const [mode, setMode] = useState<"choose" | "phone" | "email">("choose");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  useEffect(() => {
    if (cached) return;
    getAppConfig().then((c: any) => { if (c) setAuth(getAuthConfig(c)); });
  }, [cached]);

  const countryCode = auth.country_code.startsWith("+") ? auth.country_code : `+${auth.country_code}`;

  const handleSendOtp = async () => {
    const formatted = phone.startsWith(countryCode) ? phone : `${countryCode}${phone.replace(/\D/g, "")}`;
    if (formatted.length < countryCode.length + 10) return;
    setSendingOtp(true);
    setOtpError(null);
    try {
      await TZ.storefront.auth.sendOtp({ identifier: formatted, type: "phone" });
      setOtpSent(true);
    } catch (err: any) {
      setOtpError(err?.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    const formatted = phone.startsWith(countryCode) ? phone : `${countryCode}${phone.replace(/\D/g, "")}`;
    setVerifyingOtp(true);
    setOtpError(null);
    try {
      await TZ.storefront.auth.verifyOtp({ identifier: formatted, otp, type: "phone" });
      onSelect("phone");
    } catch (err: any) {
      setOtpError(err?.message || "Invalid OTP");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Phone OTP flow
  if (mode === "phone") {
    return (
      <div className="animate-slide-up flex flex-col gap-6 px-5">
        <div className="text-center space-y-2">
          <h2 className="text-[22px] font-bold tracking-tight">
            {otpSent ? "Enter the OTP" : "Enter your phone number"}
          </h2>
          <p className="text-[13px] text-muted-foreground">
            {otpSent ? `We sent a ${auth.otp_length}-digit code via SMS` : "We\u2019ll send you a verification code"}
          </p>
        </div>

        {!otpSent ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-medium text-muted-foreground bg-secondary rounded-xl px-3 py-3">{countryCode}</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10-digit mobile number"
                className="flex-1 rounded-xl bg-card shadow-soft px-4 py-3 text-[15px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sk-emerald"
                autoFocus
              />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={phone.length < 10 || sendingOtp}
              className={cn(
                "w-full rounded-2xl py-3.5 text-[15px] font-semibold flex items-center justify-center gap-2",
                phone.length >= 10 ? "bg-foreground text-background" : "bg-secondary text-muted-foreground cursor-not-allowed"
              )}
            >
              {sendingOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send OTP"}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, auth.otp_length))}
              placeholder="Enter OTP"
              className="w-full rounded-xl bg-card shadow-soft px-4 py-3 text-center text-[20px] font-mono tracking-[0.5em] placeholder:text-muted-foreground/50 placeholder:tracking-normal placeholder:text-[15px] focus:outline-none focus:ring-2 focus:ring-sk-emerald"
              autoFocus
            />
            <button
              onClick={handleVerifyOtp}
              disabled={otp.length < auth.otp_length || verifyingOtp}
              className={cn(
                "w-full rounded-2xl py-3.5 text-[15px] font-semibold flex items-center justify-center gap-2",
                otp.length >= auth.otp_length ? "bg-foreground text-background" : "bg-secondary text-muted-foreground cursor-not-allowed"
              )}
            >
              {verifyingOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Continue"}
            </button>
            <button onClick={() => handleSendOtp()} className="text-[12px] text-sk-emerald font-medium text-center w-full">
              Resend OTP
            </button>
          </div>
        )}

        {otpError && (
          <p className="text-[12px] text-destructive text-center">{otpError}</p>
        )}

        <button onClick={() => setMode("choose")} className="text-[12px] text-muted-foreground text-center">
          Use a different method
        </button>
      </div>
    );
  }

  // Choose method — only show enabled providers
  return (
    <div className="animate-slide-up flex flex-col gap-8 px-5">
      <div className="text-center space-y-2">
        <h2 className="text-[22px] font-bold tracking-tight">Create your account</h2>
        <p className="text-[13px] text-muted-foreground">One tap and you&apos;re in.</p>
      </div>

      <div className="space-y-3">
        {auth.google_oauth_enabled && (
          <button
            onClick={() => onSelect("google")}
            className="w-full flex items-center gap-3 rounded-2xl bg-card shadow-soft px-5 py-4 hover:shadow-card active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <span className="text-[15px] font-semibold">Continue with Google</span>
          </button>
        )}

        {auth.phone_otp_enabled && (
          <button
            onClick={() => setMode("phone")}
            className="w-full flex items-center gap-3 rounded-2xl bg-card shadow-soft px-5 py-4 hover:shadow-card active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-sk-emerald/8 flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-sk-emerald" />
            </div>
            <span className="text-[15px] font-semibold">Continue with Phone</span>
          </button>
        )}

        {auth.email_password_enabled && (
          <button
            onClick={() => onSelect("email")}
            className="w-full flex items-center gap-3 rounded-2xl bg-card shadow-soft px-5 py-4 hover:shadow-card active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-sk-indigo/8 flex items-center justify-center">
              <Mail className="h-5 w-5 text-sk-indigo" />
            </div>
            <span className="text-[15px] font-semibold">Continue with Email</span>
          </button>
        )}
      </div>
    </div>
  );
}
