"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, Circle, Quote } from "lucide-react";

const steps = [
  "Matching your skills",
  "Checking availability",
  "Scanning opportunities",
  "Finding the best fits",
];

const testimonials = [
  { name: "Priya M.", city: "Pune", text: "Found 2 side projects in my first week. The matching quality surprised me." },
  { name: "Rahul K.", city: "Bangalore", text: "Matched with startups that actually needed my skills. Earning extra every month." },
  { name: "Sneha D.", city: "Delhi", text: "Returned to work after a break. Flexible hours made it easy to start again." },
];

interface Props {
  onComplete: () => void;
}

export function ScreenLoading({ onComplete }: Props) {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setCompletedSteps(i + 1), 1200 * (i + 1)));
    });
    timers.push(setTimeout(onComplete, 1200 * steps.length + 800));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[testimonialIdx];

  return (
    <div className="animate-fade-scale flex flex-col items-center gap-10 px-5">
      {/* Animated ring */}
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgb(var(--border))" strokeWidth="3" />
          <circle
            cx="40" cy="40" r="36" fill="none"
            stroke="rgb(var(--sk-emerald))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(completedSteps / steps.length) * 226} 226`}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-sk-emerald tabular-nums">
            {Math.round((completedSteps / steps.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="w-full max-w-xs space-y-3">
        {steps.map((step, i) => {
          const done = i < completedSteps;
          const active = i === completedSteps;
          return (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 transition-all duration-300",
                done || active ? "opacity-100" : "opacity-30"
              )}
            >
              {done ? (
                <div className="w-6 h-6 rounded-full bg-sk-emerald flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center">
                  {active && <div className="w-2 h-2 rounded-full bg-sk-emerald animate-pulse" />}
                </div>
              )}
              <span className={cn("text-[14px]", done ? "text-foreground font-medium" : "text-muted-foreground")}>
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Testimonial */}
      <div className="w-full max-w-sm bg-card rounded-2xl p-5 shadow-soft">
        <Quote className="h-4 w-4 text-sk-amber mb-2" />
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
          {t.text}
        </p>
        <p className="text-xs font-semibold text-foreground">
          {t.name} <span className="text-muted-foreground font-normal">from {t.city}</span>
        </p>
      </div>
    </div>
  );
}
