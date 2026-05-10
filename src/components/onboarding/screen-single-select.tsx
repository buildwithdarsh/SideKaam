"use client";

import { cn } from "@/lib/utils";
import type { ScreenConfig } from "@/lib/onboarding-types";
import { OptionIcon } from "./option-icon";

interface Props {
  screen: ScreenConfig;
  value: string;
  onSelect: (value: string) => void;
}

export function ScreenSingleSelect({ screen, value, onSelect }: Props) {
  return (
    <div className="animate-slide-up flex flex-col gap-8 px-5">
      <div className="space-y-2">
        <h2 className="text-[22px] sm:text-2xl font-bold leading-snug tracking-tight">
          {screen.title}
        </h2>
        {screen.subtitle && (
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            {screen.subtitle}
          </p>
        )}
      </div>

      <div className="stagger-children flex flex-col gap-2.5">
        {screen.options?.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={cn(
                "group flex items-center gap-4 w-full rounded-2xl px-4 py-4",
                "text-left transition-all duration-200",
                "active:scale-[0.98]",
                selected
                  ? "bg-sk-emerald/8 ring-2 ring-sk-emerald shadow-soft"
                  : "bg-card shadow-soft hover:shadow-card"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                  selected
                    ? "bg-sk-emerald text-white"
                    : "bg-secondary text-muted-foreground group-hover:bg-sk-emerald/10 group-hover:text-sk-emerald"
                )}
              >
                <OptionIcon name={option.icon} className="h-[18px] w-[18px]" />
              </div>
              <span
                className={cn(
                  "flex-1 text-[15px] font-medium transition-colors",
                  selected ? "text-foreground" : "text-foreground/80"
                )}
              >
                {option.label}
              </span>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                  selected ? "border-sk-emerald bg-sk-emerald" : "border-border"
                )}
              >
                {selected && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
