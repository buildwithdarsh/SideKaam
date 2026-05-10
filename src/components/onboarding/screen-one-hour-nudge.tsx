"use client";

import { Clock } from "lucide-react";

export function ScreenOneHourNudge() {
  return (
    <div className="animate-fade-scale flex flex-col items-center gap-8 px-6 text-center">
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-sk-amber/10 flex items-center justify-center">
          <Clock className="h-9 w-9 text-sk-amber animate-float" />
        </div>
        <div className="absolute -z-10 inset-0 rounded-3xl bg-sk-amber/10 blur-xl" />
      </div>

      <div className="space-y-3 max-w-xs">
        <h2 className="text-2xl font-bold tracking-tight">
          Just give it one hour this weekend.
        </h2>
        <p className="text-[15px] text-muted-foreground leading-relaxed">
          That's all it takes. One hour. One customer. One experience.
          You'll know if this is your Side Kaam.
        </p>
      </div>
    </div>
  );
}
