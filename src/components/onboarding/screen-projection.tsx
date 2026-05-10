"use client";

import type { OnboardingData } from "@/lib/onboarding-types";
import { getEarningsProjection, getMatchCount, getHourlyRate } from "@/lib/onboarding-store";
import { Gem, Handshake, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  data: OnboardingData;
}

export function ScreenProjection({ data }: Props) {
  const matchCount = getMatchCount();
  const rate = getHourlyRate();
  const { hourly, weekly, monthly, yearly } = getEarningsProjection();
  const hoursLabel = data.sidekaam_hours_band || "4-8";
  const cats = data.sidekaam_categories.slice(0, 2).join(", ");

  return (
    <div className="animate-slide-up flex flex-col gap-5 px-5">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          <span className="text-sk-emerald">{matchCount.toLocaleString("en-IN")}</span> Side Kaams
        </h2>
        <p className="text-[13px] text-muted-foreground">match your profile</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[`${hoursLabel} hrs/week`, cats, data.city].filter(Boolean).map((tag, i) => (
          <span key={i} className="px-3 py-1 rounded-full bg-secondary text-[11px] font-medium text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>

      {/* Hourly breakdown card */}
      <div className="bg-card rounded-3xl p-5 shadow-card space-y-4">
        <p className="text-sm font-semibold text-center">Your Side Kaam earnings</p>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Your rate</p>
            <p className="text-lg font-bold text-sk-emerald tabular-nums">{hourly}</p>
            <p className="text-[10px] text-muted-foreground">/hour</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Weekly</p>
            <p className="text-lg font-bold tabular-nums">{weekly}</p>
            <p className="text-[10px] text-muted-foreground">{hoursLabel} hrs</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Monthly</p>
            <p className="text-lg font-bold text-sk-emerald tabular-nums">{monthly}</p>
            <p className="text-[10px] text-muted-foreground">projected</p>
          </div>
        </div>

        {/* Visual bar chart */}
        <div className="flex items-end justify-center gap-4 h-28">
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">Week 1</span>
            <div className="w-14 bg-sk-emerald/15 rounded-xl h-8" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">Week 2</span>
            <div className="w-14 bg-sk-emerald/25 rounded-xl h-14" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-semibold text-sk-emerald">Month 1+</span>
            <div className="w-14 bg-sk-emerald/40 rounded-xl h-24" />
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-2">
        {[
          { Icon: Gem, color: "text-sk-indigo", bg: "bg-sk-indigo/8", text: <><strong className="text-foreground">5 matches/week</strong> — just 2 hours reviewing</> },
          { Icon: Handshake, color: "text-sk-teal", bg: "bg-sk-teal/8", text: <>First customer within <strong className="text-foreground">7 days</strong></> },
          { Icon: Rocket, color: "text-sk-emerald", bg: "bg-sk-emerald/8", text: <>{monthly} by <strong className="text-foreground">end of month 1</strong></> },
        ].map(({ Icon, color, bg, text }, i) => (
          <div key={i} className="flex items-center gap-3 bg-card rounded-2xl p-4 shadow-soft">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", bg)}>
              <Icon className={cn("h-4 w-4", color)} />
            </div>
            <p className="text-[13px] text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
