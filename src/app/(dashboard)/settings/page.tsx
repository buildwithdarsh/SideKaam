"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { maskEmail } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { TZ } from "@/lib/tz";
import {
  ChevronDown, Bell, CreditCard, Shield, LogOut,
  Moon, HelpCircle, Sun, Loader2, Check,
} from "lucide-react";

type Preferences = {
  notifications_push: boolean;
  notifications_email: boolean;
  notifications_whatsapp: boolean;
  appearance: "light" | "dark" | "system";
};

const DEFAULT_PREFS: Preferences = {
  notifications_push: true,
  notifications_email: true,
  notifications_whatsapp: true,
  appearance: "light",
};

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const subscription = user?.subscription;

  const planLabel = subscription?.plan === "yearly" ? "12 Months" : subscription?.plan === "half-yearly" ? "6 Months" : subscription?.plan === "monthly" ? "1 Month" : "Free";
  const planStatus = subscription?.status === "active" ? "Active" : subscription?.status === "cancelled" ? "Cancelled" : "Inactive";
  const expiresAt = subscription?.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : null;

  // Collapsed sections (Account & Support are collapsible, Billing is not)
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Load prefs from user attributes
  useEffect(() => {
    if (user) {
      const attrs = (user as any).attributes;
      if (attrs?.preferences) {
        const merged = { ...DEFAULT_PREFS, ...attrs.preferences };
        setPrefs(merged);
        document.documentElement.classList.toggle("dark", merged.appearance === "dark");
      }
    }
  }, [user]);

  const toggleSection = (title: string) => {
    setExpandedSection((prev) => (prev === title ? null : title));
  };

  const savePref = async (key: keyof Preferences, value: unknown) => {
    const updated = { ...prefs, [key]: value };
    setPrefs(updated);

    // Apply dark mode immediately
    if (key === "appearance") {
      document.documentElement.classList.toggle("dark", value === "dark");
    }

    setSaving(true);
    setSaved(false);
    try {
      await Promise.resolve(TZ.storefront.auth.updateProfile({ preferences: { [key]: value } } as any));
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch { /* non-blocking */ }
    finally { setSaving(false); }
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "w-10 h-6 rounded-full transition-colors relative shrink-0",
        checked ? "bg-sk-emerald" : "bg-border",
      )}
    >
      <div className={cn(
        "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
        checked ? "translate-x-[18px]" : "translate-x-0.5",
      )} />
    </button>
  );

  const appearances = [
    { id: "light" as const, label: "Light", Icon: Sun },
    { id: "dark" as const, label: "Dark", Icon: Moon },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-muted/80 via-muted/40 rounded-2xl p-3 to-transparent overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Shield className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wider">Preferences</p>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account & preferences</p>
        </div>
        <svg viewBox="0 0 140 120" fill="none" className="absolute -right-2 -bottom-2 w-32 h-28 opacity-[0.08]" aria-hidden="true">
          <circle cx="70" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="70" cy="60" r="10" fill="currentColor" fillOpacity="0.15" />
          <line x1="70" y1="18" x2="70" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="70" y1="92" x2="70" y2="102" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="28" y1="60" x2="38" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="102" y1="60" x2="112" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="30" x2="47" y2="37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="93" y1="83" x2="100" y2="90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="30" x2="93" y2="37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="47" y1="83" x2="40" y2="90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* User info */}
      <div className="bg-card rounded-2xl p-4 shadow-soft flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sk-emerald/10 flex items-center justify-center">
          <span className="text-sm font-bold text-sk-emerald">{user?.name?.[0] || "?"}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium">{user?.name}</p>
          <p className="text-[11px] text-muted-foreground">{maskEmail(user?.email)}</p>
        </div>
        {saving && <Loader2 className="h-3.5 w-3.5 text-muted-foreground animate-spin" />}
        {saved && <Check className="h-3.5 w-3.5 text-sk-emerald" />}
      </div>

      {/* ─── ACCOUNT (collapsible) ─── */}
      <div className="space-y-2">
        <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-1">Account</h2>
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          {/* Notifications */}
          <div className="border-b border-border">
            <button
              onClick={() => toggleSection("notifications")}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left"
            >
              <Bell className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium">Notifications</p>
                <p className="text-[11px] text-muted-foreground">Push, email, WhatsApp</p>
              </div>
              <ChevronDown className={cn("h-4 w-4 text-muted-foreground shrink-0 transition-transform", expandedSection === "notifications" && "rotate-180")} />
            </button>
            {expandedSection === "notifications" && (
              <div className="px-4 pb-4 space-y-3 animate-slide-down">
                {([
                  { key: "notifications_push" as const, label: "Push notifications" },
                  { key: "notifications_email" as const, label: "Email notifications" },
                  { key: "notifications_whatsapp" as const, label: "WhatsApp updates" },
                ] as const).map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between pl-7">
                    <span className="text-[13px]">{label}</span>
                    <Toggle checked={prefs[key]} onChange={(v) => savePref(key, v)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Appearance */}
          <div>
            <button
              onClick={() => toggleSection("appearance")}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left"
            >
              <Moon className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium">Appearance</p>
                <p className="text-[11px] text-muted-foreground capitalize">{prefs.appearance}</p>
              </div>
              <ChevronDown className={cn("h-4 w-4 text-muted-foreground shrink-0 transition-transform", expandedSection === "appearance" && "rotate-180")} />
            </button>
            {expandedSection === "appearance" && (
              <div className="px-4 pb-3 flex gap-2 pl-11 animate-slide-down">
                {appearances.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => savePref("appearance", id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] transition-colors",
                      prefs.appearance === id
                        ? "bg-sk-emerald/10 text-sk-emerald font-medium ring-1 ring-sk-emerald/20"
                        : "bg-secondary hover:bg-border",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── BILLING (always visible, no collapse) ─── */}
      <div className="space-y-2">
        <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-1">Billing</h2>
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden divide-y divide-border">
          <div className="px-4 py-3.5">
            <div className="flex items-center gap-3">
              <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium">Subscription</p>
                <p className="text-[11px] text-muted-foreground">
                  {planLabel} — {planStatus}
                  {expiresAt && subscription?.status === "active" && <> — renews {expiresAt}</>}
                  {expiresAt && subscription?.status === "cancelled" && <> — expires {expiresAt}</>}
                </p>
              </div>
            </div>
            {subscription?.status === "active" && subscription?.id && (
              <div className="mt-3 pl-7">
                {!showCancelConfirm ? (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="text-[12px] text-destructive font-medium"
                  >
                    Cancel subscription
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[12px] text-muted-foreground">
                      Are you sure? You&apos;ll keep access until {expiresAt || "the end of your billing period"}.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          setCancelling(true);
                          try {
                            await TZ.storefront.subscriptions.cancel(subscription.id);
                            window.location.reload();
                          } catch {
                            setCancelling(false);
                            setShowCancelConfirm(false);
                          }
                        }}
                        disabled={cancelling}
                        className="text-[12px] font-medium text-destructive bg-destructive/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                      >
                        {cancelling ? <Loader2 className="h-3 w-3 animate-spin" /> : "Yes, cancel"}
                      </button>
                      <button
                        onClick={() => setShowCancelConfirm(false)}
                        className="text-[12px] font-medium text-muted-foreground px-3 py-1.5 rounded-lg"
                      >
                        Keep plan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left">
            <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium">Privacy & Data</p>
              <p className="text-[11px] text-muted-foreground">DPDP Act compliant</p>
            </div>
          </button>
        </div>
      </div>

      {/* ─── SUPPORT (collapsible) ─── */}
      <div className="space-y-2">
        <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-1">Support</h2>
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          <button
            onClick={() => toggleSection("help")}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left"
          >
            <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium">Help Center</p>
              <p className="text-[11px] text-muted-foreground">FAQs & contact</p>
            </div>
            <ChevronDown className={cn("h-4 w-4 text-muted-foreground shrink-0 transition-transform", expandedSection === "help" && "rotate-180")} />
          </button>
          {expandedSection === "help" && (
            <div className="px-4 pb-4 pl-11 animate-slide-down">
              <p className="text-[13px] text-muted-foreground">
                Email us at <a href="mailto:hello@build.withdarsh.com" className="font-medium text-sk-emerald">hello@build.withdarsh.com</a>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sign out */}
      <button
        onClick={logout}
        className="w-full flex items-center gap-3 bg-card rounded-2xl px-4 py-3.5 shadow-soft text-sk-rose hover:bg-sk-rose/5 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span className="text-[14px] font-medium">Sign Out</span>
      </button>
    </div>
  );
}
