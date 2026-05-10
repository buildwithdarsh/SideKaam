"use client";

import { useEffect, useState } from "react";
import { initApp } from "@/lib/init";

export function AppLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initApp().finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999]">
        <div className="relative mb-6">
          <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 animate-pulse" aria-hidden="true">
            <rect width="64" height="64" rx="16" fill="#10B981" />
            <path d="M16 21L32 32L16 43" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            <path d="M48 21L32 32L48 43" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            <circle cx="32" cy="32" r="4" fill="white" />
            <circle cx="50" cy="16" r="3.5" fill="#FCD34D" />
          </svg>
          <div className="absolute -inset-3">
            <svg viewBox="0 0 88 88" className="w-full h-full animate-spin" style={{ animationDuration: "3s" }} aria-hidden="true">
              <circle cx="44" cy="44" r="40" fill="none" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.15" strokeDasharray="8 12" />
            </svg>
          </div>
        </div>
        <div className="text-center space-y-1.5">
          <h2 className="text-lg font-bold tracking-tight">Side<span className="text-[#10B981]">Kaam</span></h2>
          <p className="text-[12px] text-muted-foreground animate-pulse">Loading your experience...</p>
        </div>
        <div className="flex items-center gap-1.5 mt-8">
          {[0, 150, 300].map((delay) => (
            <div key={delay} className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-bounce" style={{ animationDelay: `${delay}ms`, animationDuration: "1s" }} />
          ))}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
