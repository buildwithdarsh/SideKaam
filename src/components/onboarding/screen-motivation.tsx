"use client";

import { cn } from "@/lib/utils";
import {
  Sparkles, Rocket, Heart, TrendingUp, Coffee,
  Sun, Flame, Star, Award, PartyPopper,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: string;
  color: string;
  bg: string;
  headline: string;
  message: string;
}

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles, rocket: Rocket, heart: Heart,
  "trending-up": TrendingUp, coffee: Coffee, sun: Sun,
  flame: Flame, star: Star, award: Award, "party-popper": PartyPopper,
};

export function ScreenMotivation({ icon, color, bg, headline, message }: Props) {
  const Icon = iconMap[icon] || Sparkles;

  return (
    <div className="animate-fade-scale flex flex-col items-center gap-6 px-6 text-center">
      {/* Icon with glow */}
      <div className="relative">
        <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center", bg)}>
          <Icon className={cn("h-7 w-7 animate-float", color)} />
        </div>
        <div className={cn("absolute -z-10 inset-0 rounded-3xl blur-xl opacity-50", bg)} />
      </div>

      <div className="space-y-2 max-w-xs">
        <h2 className="text-xl font-bold tracking-tight">{headline}</h2>
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}
