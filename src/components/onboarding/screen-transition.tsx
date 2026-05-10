"use client";

import type { ScreenConfig, OnboardingData } from "@/lib/onboarding-types";
import { Sparkles, Target, Globe2, Rocket, Trophy, Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  screen: ScreenConfig;
  data: OnboardingData;
}

function renderBoldText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-sk-emerald font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function getMessage(screen: ScreenConfig, data: OnboardingData): string {
  if (screen.dynamicCopy) {
    let lookupKey = "";
    if (screen.id === "2") lookupKey = String((data as unknown as Record<string, string>).employment_type || "");
    return screen.dynamicCopy[lookupKey] || screen.mascotMessage || "";
  }
  return screen.mascotMessage || "";
}

const defaultMeta = { Icon: Sparkles, color: "text-sk-emerald", bg: "bg-sk-emerald/8", heading: "Nice!" };

export function ScreenTransition({ screen, data }: Props) {
  const message = getMessage(screen, data);
  const meta = defaultMeta;
  const { Icon, color, bg, heading } = meta;

  return (
    <div className="animate-fade-scale flex flex-col items-center gap-8 px-6 text-center">
      {/* Decorative background shape */}
      <div className="relative">
        <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center", bg)}>
          <Icon className={cn("h-8 w-8 animate-float", color)} />
        </div>
        <div className={cn("absolute -z-10 inset-0 rounded-3xl blur-xl opacity-40", bg)} />
      </div>

      <div className="space-y-3 max-w-sm">
        <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {renderBoldText(message)}
        </p>
      </div>
    </div>
  );
}
