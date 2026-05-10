"use client";

import { cn } from "@/lib/utils";
import type { ScreenConfig } from "@/lib/onboarding-types";
import { OptionIcon } from "./option-icon";

interface Props {
  screen: ScreenConfig;
  values: string[];
  onToggle: (value: string) => void;
}

export function ScreenMultiSelect({ screen, values, onToggle }: Props) {
  const isLargeGrid = (screen.options?.length ?? 0) > 6;

  return (
    <div className="animate-slide-up flex flex-col gap-6 px-5">
      <div className="space-y-2">
        <h2 className="text-[22px] sm:text-2xl font-bold leading-snug tracking-tight">
          {screen.title}
        </h2>
        <p className="text-[13px] text-muted-foreground">
          Tap all that apply
          {values.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-sk-emerald text-white text-[10px] font-bold">
              {values.length}
            </span>
          )}
        </p>
      </div>

      {isLargeGrid ? (
        /* Chip cloud for many items */
        <div className="stagger-children flex flex-wrap gap-2">
          {screen.options?.map((option) => {
            const selected = values.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => onToggle(option.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2.5",
                  "text-[13px] font-medium transition-all duration-200",
                  "active:scale-95",
                  selected
                    ? "bg-sk-emerald text-white shadow-soft"
                    : "bg-card shadow-soft text-foreground/80 hover:shadow-card"
                )}
              >
                <OptionIcon name={option.icon} className="h-4 w-4" />
                {option.label}
              </button>
            );
          })}
        </div>
      ) : (
        /* Card style for few items */
        <div className="stagger-children flex flex-col gap-2.5">
          {screen.options?.map((option) => {
            const selected = values.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => onToggle(option.id)}
                className={cn(
                  "group flex items-center gap-4 w-full rounded-2xl px-4 py-4",
                  "text-left transition-all duration-200 active:scale-[0.98]",
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
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <OptionIcon name={option.icon} className="h-[18px] w-[18px]" />
                </div>
                <span className="flex-1 text-[15px] font-medium">{option.label}</span>
                <div
                  className={cn(
                    "w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
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
      )}
    </div>
  );
}
