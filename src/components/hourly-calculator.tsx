"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const sideKaams = [
  { label: "Guitar Teacher", rate: 500 },
  { label: "Product Photographer", rate: 1000 },
  { label: "GST Consultant", rate: 2000 },
  { label: "Yoga Instructor", rate: 600 },
  { label: "Freelance Developer", rate: 1200 },
  { label: "Tiffin Service", rate: 400 },
  { label: "Mehendi Artist", rate: 800 },
  { label: "Social Media Manager", rate: 700 },
  { label: "Home Baker", rate: 500 },
  { label: "Content Writer", rate: 800 },
  { label: "Career Counsellor", rate: 1000 },
  { label: "Interior Designer", rate: 1500 },
];

const hourOptions = [
  { label: "2 hrs/week (weekends only)", hours: 2 },
  { label: "4 hrs/week", hours: 4 },
  { label: "6 hrs/week", hours: 6 },
  { label: "8 hrs/week", hours: 8 },
];

export function HourlyCalculator() {
  const [selectedKaam, setSelectedKaam] = useState(sideKaams[0]);
  const [selectedHours, setSelectedHours] = useState(hourOptions[0]);

  const monthly = selectedKaam.rate * selectedHours.hours * 4;
  const yearly = monthly * 12;

  return (
    <div className="space-y-5">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center">
        What's your Side Kaam worth?
      </h2>

      <div className="space-y-3">
        {/* Side Kaam selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Your Side Kaam</label>
          <div className="flex flex-wrap gap-1.5">
            {sideKaams.map((sk) => (
              <button
                key={sk.label}
                onClick={() => setSelectedKaam(sk)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[11px] font-medium transition-all",
                  selectedKaam.label === sk.label
                    ? "bg-sk-emerald text-white"
                    : "bg-card shadow-soft text-muted-foreground hover:text-foreground"
                )}
              >
                {sk.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hours selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Hours per week</label>
          <div className="flex flex-wrap gap-1.5">
            {hourOptions.map((h) => (
              <button
                key={h.hours}
                onClick={() => setSelectedHours(h)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[11px] font-medium transition-all",
                  selectedHours.hours === h.hours
                    ? "bg-foreground text-background"
                    : "bg-card shadow-soft text-muted-foreground"
                )}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="bg-card rounded-2xl p-5 shadow-card space-y-4 text-center">
        <p className="text-[12px] text-muted-foreground">Your Side Kaam income:</p>
        <div className="space-y-1">
          <p className="text-[13px] text-muted-foreground">
            ₹{selectedKaam.rate.toLocaleString("en-IN")}/hr × {selectedHours.hours} hrs/week × 4 weeks
          </p>
          <p className="text-3xl font-bold text-[#138808] tabular-nums">
            = ₹{monthly.toLocaleString("en-IN")}/month
          </p>
        </div>
        <p className="text-[13px] text-muted-foreground">
          That&apos;s <span className="font-semibold text-foreground">₹{yearly.toLocaleString("en-IN")}/year</span>
        </p>
        <div className="h-px bg-border" />
        <p className="text-[15px] font-semibold text-[#FF9933]">
          + Unlimited Fun & Experience
        </p>
        <p className="text-[11px] text-muted-foreground">
          Money is just the bonus. The real reward is doing what you love.
        </p>
      </div>
    </div>
  );
}
