"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { subCategories } from "@/lib/onboarding-screens";
import type { OnboardingData } from "@/lib/onboarding-types";
import { Plus, X } from "lucide-react";

interface Props {
  categories: string[];
  values: string[];
  onToggle: (value: string) => void;
}

export function ScreenSubcategoryChips({ categories, values, onToggle }: Props) {
  const [custom, setCustom] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Gather sub-categories for selected categories
  const chips = categories.flatMap((cat) => subCategories[cat] || []);

  const addCustom = () => {
    if (custom.trim() && !values.includes(custom.trim())) {
      onToggle(custom.trim());
      setCustom("");
      setShowInput(false);
    }
  };

  return (
    <div className="animate-slide-up flex flex-col gap-6 px-5">
      <div className="space-y-2">
        <h2 className="text-[22px] font-bold tracking-tight">
          Get specific — what exactly?
        </h2>
        <p className="text-[13px] text-muted-foreground">
          The more specific, the better we match you.
          {values.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-sk-emerald text-white text-[10px] font-bold">
              {values.length}
            </span>
          )}
        </p>
      </div>

      <div className="stagger-children flex flex-wrap gap-2">
        {chips.map((chip) => {
          const selected = values.includes(chip);
          return (
            <button
              key={chip}
              onClick={() => onToggle(chip)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-2",
                "text-[13px] font-medium transition-all duration-200 active:scale-95",
                selected
                  ? "bg-sk-emerald text-white shadow-soft"
                  : "bg-card shadow-soft text-foreground/80 hover:shadow-card"
              )}
            >
              {chip}
              {selected && <X className="h-3 w-3" />}
            </button>
          );
        })}

        {/* Custom add */}
        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-2 border-2 border-dashed border-border text-[13px] font-medium text-muted-foreground hover:border-sk-emerald hover:text-sk-emerald transition-colors"
          >
            <Plus className="h-3 w-3" /> Add your own
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
              placeholder="Type here..."
              autoFocus
              className="rounded-full px-3.5 py-2 bg-card shadow-soft text-[13px] w-40 focus:outline-none focus:ring-2 focus:ring-sk-emerald"
            />
            <button onClick={addCustom} className="text-sk-emerald text-xs font-semibold">Add</button>
            <button onClick={() => setShowInput(false)} className="text-muted-foreground text-xs">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
