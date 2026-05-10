"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  type: "not-found" | "empty-matches" | "empty-bookings" | "empty-jobs" | "empty-profile" | "loading" | "error";
  title?: string;
  message?: string;
  action?: { label: string; href: string };
}

function NotFoundSVG() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-48 h-auto" aria-hidden="true">
      <circle cx="100" cy="80" r="60" fill="rgb(var(--sk-emerald))" fillOpacity="0.04" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.12" strokeWidth="1.5"/>
      <rect x="72" y="55" width="56" height="50" rx="8" fill="rgb(var(--sk-emerald))" fillOpacity="0.06" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.15" strokeWidth="1.5"/>
      <path d="M85 72h30M85 82h20" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="100" cy="95" r="3" fill="rgb(var(--sk-emerald))" fillOpacity="0.3"/>
      <path d="M132 52l12-12M132 52l-4-14M132 52l14-4" stroke="rgb(var(--sk-amber))" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="60" cy="45" r="4" fill="rgb(var(--sk-indigo))" fillOpacity="0.15"/>
      <circle cx="145" cy="110" r="3" fill="rgb(var(--sk-amber))" fillOpacity="0.2"/>
    </svg>
  );
}

function EmptyMatchesSVG() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-48 h-auto" aria-hidden="true">
      <circle cx="100" cy="80" r="55" fill="rgb(var(--sk-emerald))" fillOpacity="0.03"/>
      <circle cx="75" cy="70" r="20" fill="rgb(var(--sk-emerald))" fillOpacity="0.06" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.12" strokeWidth="1.5"/>
      <circle cx="75" cy="65" r="7" fill="rgb(var(--sk-emerald))" fillOpacity="0.12"/>
      <path d="M65 80c0-5.5 4.5-10 10-10s10 4.5 10 80" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.12" strokeWidth="1" fill="rgb(var(--sk-emerald))" fillOpacity="0.05"/>
      <circle cx="125" cy="70" r="20" fill="rgb(var(--sk-indigo))" fillOpacity="0.06" stroke="rgb(var(--sk-indigo))" strokeOpacity="0.12" strokeWidth="1.5"/>
      <circle cx="125" cy="65" r="7" fill="rgb(var(--sk-indigo))" fillOpacity="0.12"/>
      <path d="M90 75h20" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3"/>
      <path d="M95 80l5-5 5 5" stroke="rgb(var(--sk-amber))" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="50" cy="110" r="3" fill="rgb(var(--sk-amber))" fillOpacity="0.15"/>
      <circle cx="155" cy="45" r="2.5" fill="rgb(var(--sk-emerald))" fillOpacity="0.2"/>
    </svg>
  );
}

function EmptyBookingsSVG() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-48 h-auto" aria-hidden="true">
      <rect x="55" y="40" width="90" height="80" rx="12" fill="rgb(var(--sk-emerald))" fillOpacity="0.04" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.12" strokeWidth="1.5"/>
      <rect x="65" y="55" width="70" height="6" rx="3" fill="rgb(var(--sk-emerald))" fillOpacity="0.08"/>
      <rect x="65" y="68" width="50" height="6" rx="3" fill="rgb(var(--sk-emerald))" fillOpacity="0.06"/>
      <rect x="65" y="81" width="60" height="6" rx="3" fill="rgb(var(--sk-emerald))" fillOpacity="0.04"/>
      <circle cx="100" cy="105" r="8" fill="none" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.15" strokeWidth="1.5"/>
      <path d="M97 105l3 3 5-5" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M140 35l8 8M148 35l-8 8" stroke="rgb(var(--sk-amber))" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="50" cy="130" r="3" fill="rgb(var(--sk-indigo))" fillOpacity="0.15"/>
    </svg>
  );
}

function EmptyJobsSVG() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-48 h-auto" aria-hidden="true">
      <circle cx="100" cy="75" r="40" fill="rgb(var(--sk-emerald))" fillOpacity="0.04" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.1" strokeWidth="1.5"/>
      <circle cx="100" cy="75" r="20" fill="rgb(var(--sk-emerald))" fillOpacity="0.06"/>
      <path d="M93 75l4 4 8-8" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="60" y="125" width="80" height="10" rx="5" fill="rgb(var(--sk-emerald))" fillOpacity="0.04"/>
      <rect x="75" y="128" width="50" height="4" rx="2" fill="rgb(var(--sk-emerald))" fillOpacity="0.08"/>
      <circle cx="55" cy="50" r="4" fill="rgb(var(--sk-amber))" fillOpacity="0.15"/>
      <circle cx="150" cy="60" r="3" fill="rgb(var(--sk-indigo))" fillOpacity="0.15"/>
      <circle cx="145" cy="115" r="2.5" fill="rgb(var(--sk-emerald))" fillOpacity="0.2"/>
    </svg>
  );
}

function LoadingSVG() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16" aria-hidden="true">
      <circle cx="40" cy="40" r="32" fill="none" stroke="rgb(var(--border))" strokeWidth="3"/>
      <circle cx="40" cy="40" r="32" fill="none" stroke="rgb(var(--sk-emerald))" strokeWidth="3" strokeLinecap="round" strokeDasharray="60 140" className="animate-spin" style={{ transformOrigin: "center" }}/>
      <circle cx="40" cy="40" r="6" fill="rgb(var(--sk-emerald))" fillOpacity="0.2"/>
    </svg>
  );
}

const configs = {
  "not-found": { SVG: NotFoundSVG, defaultTitle: "Not found", defaultMessage: "We couldn't find what you're looking for." },
  "empty-matches": { SVG: EmptyMatchesSVG, defaultTitle: "No matches yet", defaultMessage: "Complete your profile to start getting matched with opportunities." },
  "empty-bookings": { SVG: EmptyBookingsSVG, defaultTitle: "No bookings yet", defaultMessage: "Browse opportunities and express interest to get started." },
  "empty-jobs": { SVG: EmptyJobsSVG, defaultTitle: "No opportunities found", defaultMessage: "Try adjusting your filters or check back later." },
  "empty-profile": { SVG: EmptyMatchesSVG, defaultTitle: "Profile not set up", defaultMessage: "Complete your onboarding to create your marketplace profile." },
  loading: { SVG: LoadingSVG, defaultTitle: "", defaultMessage: "" },
  error: { SVG: NotFoundSVG, defaultTitle: "Something went wrong", defaultMessage: "Please try again later." },
};

export function EmptyState({ type, title, message, action }: Props) {
  const config = configs[type];
  const SVG = config.SVG;

  if (type === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <SVG />
        <p className="text-[13px] text-muted-foreground animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 gap-5 text-center">
      <SVG />
      <div className="space-y-1.5 max-w-xs">
        <h3 className="text-[16px] font-semibold">{title || config.defaultTitle}</h3>
        <p className="text-[13px] text-muted-foreground leading-relaxed">{message || config.defaultMessage}</p>
      </div>
      {action && (
        <Link href={action.href} className="text-[13px] font-medium text-sk-emerald hover:underline">
          {action.label}
        </Link>
      )}
    </div>
  );
}
