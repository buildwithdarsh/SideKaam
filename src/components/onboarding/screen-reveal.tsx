"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface Props {
  matchCount: number;
}

export function ScreenReveal({ matchCount }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = matchCount;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [matchCount]);

  return (
    <div className="animate-fade-scale flex flex-col items-center gap-8 px-5 text-center">
      {/* Icon */}
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-sk-emerald/10 flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-sk-emerald animate-float" />
        </div>
        <div className="absolute -z-10 inset-0 rounded-3xl bg-sk-emerald/10 blur-xl" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">All set!</h2>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">We found</p>
          <div className="inline-flex items-baseline gap-1">
            <span className="text-5xl font-bold text-sk-emerald tabular-nums font-mono">
              {count.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            opportunities matching your profile
          </p>
        </div>
      </div>
    </div>
  );
}
