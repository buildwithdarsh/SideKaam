"use client";

import { cn } from "@/lib/utils";
import { getHourlyRate } from "@/lib/onboarding-store";
import type { OnboardingData } from "@/lib/onboarding-types";
import { Flame, Equal, TrendingUp } from "lucide-react";

// Rough day-job hourly estimates by industry + experience
function estimateDayJobRate(industry: string, exp: string): number {
  const baseRates: Record<string, number> = {
    "IT / Software": 600, "Banking / Finance": 500, "Healthcare": 450,
    "Education": 300, "Government": 350, "Manufacturing": 400,
    "Consulting": 700, "Legal": 550, "FMCG": 450,
  };
  const base = baseRates[industry] || 400;
  const multiplier = exp === "15+" ? 2.5 : exp === "7-15" ? 1.8 : exp === "4-7" ? 1.3 : 1.0;
  return Math.round(base * multiplier);
}

interface Props {
  data: OnboardingData;
}

export function ScreenRateComparison({ data }: Props) {
  const sideKaamRate = getHourlyRate();
  const dayJobRate = estimateDayJobRate("", "");
  const diff = sideKaamRate - dayJobRate;
  const isMore = diff > 50;
  const isSimilar = Math.abs(diff) <= 50;

  return (
    <div className="animate-fade-scale flex flex-col items-center gap-8 px-5 text-center">
      <h2 className="text-[22px] font-bold tracking-tight">Let's do the math</h2>

      {/* Comparison cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        <div className="bg-card rounded-2xl p-4 shadow-soft space-y-2">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Day Job</p>
          <p className="text-2xl font-bold tabular-nums text-muted-foreground">₹{dayJobRate}</p>
          <p className="text-[11px] text-muted-foreground">/hour (approx)</p>
        </div>
        <div className={cn(
          "rounded-2xl p-4 shadow-card space-y-2",
          isMore ? "bg-sk-emerald/8 ring-2 ring-sk-emerald" : "bg-card"
        )}>
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Side Kaam</p>
          <p className={cn("text-2xl font-bold tabular-nums", isMore ? "text-sk-emerald" : "text-foreground")}>
            ₹{sideKaamRate}
          </p>
          <p className="text-[11px] text-muted-foreground">/hour (your rate)</p>
        </div>
      </div>

      {/* Verdict */}
      <div className={cn(
        "rounded-2xl p-5 w-full max-w-sm space-y-2",
        isMore ? "bg-sk-emerald/8" : isSimilar ? "bg-sk-amber/8" : "bg-sk-indigo/8"
      )}>
        <div className="flex items-center justify-center gap-2">
          {isMore ? (
            <Flame className="h-5 w-5 text-sk-emerald" />
          ) : isSimilar ? (
            <Equal className="h-5 w-5 text-sk-amber" />
          ) : (
            <TrendingUp className="h-5 w-5 text-sk-indigo" />
          )}
          <p className={cn(
            "text-[15px] font-bold",
            isMore ? "text-sk-emerald" : isSimilar ? "text-sk-amber" : "text-sk-indigo"
          )}>
            {isMore
              ? `Your Side Kaam pays MORE than your day job per hour!`
              : isSimilar
                ? `Your Side Kaam matches your day job — doing what you love!`
                : `Your Side Kaam is an investment in your passion!`}
          </p>
        </div>
        {isMore && (
          <p className="text-[13px] text-muted-foreground">
            That's <strong className="text-sk-emerald">₹{sideKaamRate - dayJobRate} more</strong> per hour for something you actually enjoy.
          </p>
        )}
      </div>
    </div>
  );
}
