"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ScreenConfig } from "@/lib/onboarding-types";
import { ThumbsDown, Minus, ThumbsUp, MessageCircle } from "lucide-react";

interface Props {
  screen: ScreenConfig;
  value: string;
  onSelect: (value: string) => void;
}

const reactions = [
  { key: "disagree", label: "Not me", Icon: ThumbsDown, color: "text-sk-rose", bg: "bg-sk-rose/8", ring: "ring-sk-rose" },
  { key: "neutral", label: "Kinda", Icon: Minus, color: "text-sk-amber", bg: "bg-sk-amber/8", ring: "ring-sk-amber" },
  { key: "agree", label: "Totally", Icon: ThumbsUp, color: "text-sk-emerald", bg: "bg-sk-emerald/8", ring: "ring-sk-emerald" },
];

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

export function ScreenEmojiReaction({ screen, value, onSelect }: Props) {
  const [showResponse, setShowResponse] = useState(!!value);

  const handleSelect = (key: string) => {
    onSelect(key);
    setShowResponse(true);
  };

  const response = value && screen.reactions ? screen.reactions[value] : null;

  return (
    <div className="animate-slide-up flex flex-col gap-8 px-5">
      {/* Statement card */}
      <div className="bg-card rounded-3xl p-6 shadow-card">
        <p className="text-lg font-semibold leading-snug text-center">
          &ldquo;{screen.statement}&rdquo;
        </p>
      </div>

      {/* Reaction buttons */}
      <div className="grid grid-cols-3 gap-3">
        {reactions.map((r) => {
          const selected = value === r.key;
          return (
            <button
              key={r.key}
              onClick={() => handleSelect(r.key)}
              className={cn(
                "flex flex-col items-center gap-2.5 rounded-2xl py-5 px-3",
                "transition-all duration-200 active:scale-95",
                selected
                  ? `${r.bg} ring-2 ${r.ring}`
                  : "bg-card shadow-soft hover:shadow-card"
              )}
            >
              <div className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center transition-colors",
                selected ? `${r.bg} ${r.color}` : "bg-secondary text-muted-foreground"
              )}>
                <r.Icon className="h-5 w-5" />
              </div>
              <span className={cn(
                "text-xs font-semibold",
                selected ? r.color : "text-muted-foreground"
              )}>
                {r.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Response */}
      {showResponse && response && (
        <div className="animate-slide-up">
          <div className="flex gap-3 items-start bg-card rounded-2xl p-4 shadow-soft">
            <div className="w-8 h-8 rounded-full bg-sk-emerald/10 flex items-center justify-center shrink-0 mt-0.5">
              <MessageCircle className="h-4 w-4 text-sk-emerald" />
            </div>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {renderBoldText(response)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
