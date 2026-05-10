"use client";

import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Users, Clock } from "lucide-react";
import { Logo } from "@/components/logo";

interface Props {
  onSelect: (path: "seeker" | "finder") => void;
}

const stats = [
  { icon: TrendingUp, text: "85% of users get their first gig within 2 weeks", color: "text-sk-emerald" },
  { icon: Users, text: "10,000+ professionals already earning on the side", color: "text-sk-indigo" },
  { icon: Clock, text: "Average side income: ₹12,000/month with just 8 hrs/week", color: "text-sk-amber" },
  { icon: Sparkles, text: "Top earners make ₹50K+ per month from Side Kaam", color: "text-sk-teal" },
];

export function ScreenPathSelector({ onSelect }: Props) {
  const [statIndex, setStatIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStatIndex((i) => (i + 1) % stats.length), 3500);
    return () => clearInterval(t);
  }, []);

  const stat = stats[statIndex]!;
  const StatIcon = stat.icon;

  return (
    <div className="flex flex-col px-5 gap-8 sm:items-center sm:text-center">
      {/* Brand */}
      <div className="space-y-4 pt-2">
        <Logo size="md" />
        <div>
          <h1 className="text-[32px] font-bold tracking-tight leading-[1.15]">
            Kaam nahi,
            <br />
            <span className="text-sk-emerald">Side Kaam.</span>
          </h1>
          <p className="text-[14px] text-muted-foreground mt-2 leading-relaxed">
            Your 9-to-5 pays the bills.
            <br />
            Your Side Kaam pays for the life you want.
          </p>
        </div>
      </div>

      {/* Rotating stat */}
      <div className="rounded-2xl bg-card shadow-soft p-4 flex items-start gap-3 min-h-[72px]" key={statIndex}>
        <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0`}>
          <StatIcon className={`h-4.5 w-4.5 ${stat.color}`} />
        </div>
        <p className="text-[13px] leading-relaxed text-foreground/80 animate-fade-scale">
          <span className="font-semibold text-foreground">Did you know?</span>{" "}
          {stat.text}
        </p>
      </div>

      {/* CTA */}
      <div className="space-y-3">
        <button
          onClick={() => onSelect("seeker")}
          className="w-full rounded-2xl py-4 text-[15px] font-semibold bg-foreground text-background shadow-soft hover:shadow-card active:scale-[0.98] transition-all"
        >
          Get Started
        </button>
        <p className="text-[10px] text-muted-foreground/40 text-center">
          For working professionals only &middot; 10K+ users across 10+ cities
        </p>
      </div>
    </div>
  );
}
