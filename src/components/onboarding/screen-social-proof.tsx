"use client";

import { Star } from "lucide-react";
import type { ScreenConfig } from "@/lib/onboarding-types";

interface Props {
  screen: ScreenConfig;
}

export function ScreenSocialProof({ screen }: Props) {
  return (
    <div className="animate-scale-in flex flex-col items-center gap-6 px-4 text-center">
      <h2 className="text-xl sm:text-2xl font-bold leading-tight max-w-sm">
        {screen.title}
      </h2>

      {/* Press quote card */}
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-4 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {screen.id === "3" ? "YourStory" : "Economic Times"}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="text-sm italic text-muted-foreground leading-relaxed">
          &ldquo;{screen.subtitle}&rdquo;
        </p>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-sk-orange text-sk-orange"
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            Play Store 4.8 ⭐
          </span>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-semibold text-sk-green">
            #1 Product
          </span>
          <span className="text-xs text-muted-foreground">Product Hunt</span>
        </div>
      </div>
    </div>
  );
}
