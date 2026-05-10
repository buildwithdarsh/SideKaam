"use client";

import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Amit K.",
    role: "CA, Deloitte",
    city: "Delhi",
    text: "I started doing GST filing on SideKaam for 2 hours every Saturday. Now I earn ₹40,000/month on the side.",
    rate: "₹2,000/hr",
  },
  {
    name: "Priya M.",
    role: "Bank PO, SBI",
    city: "Indore",
    text: "My mehendi bookings went from 2/month to 12/month. Weekends are now my favourite part of the week.",
    rate: "₹1,500/hr",
  },
  {
    name: "Rahul S.",
    role: "Software Engineer",
    city: "Bangalore",
    text: "I teach guitar every Saturday morning. Best ₹500/hour I've ever earned — doing what I love.",
    rate: "₹500/hr",
  },
];

export function ScreenTestimonials() {
  return (
    <div className="animate-slide-up flex flex-col gap-6 px-5">
      <h2 className="text-[22px] font-bold tracking-tight text-center">
        Real professionals. Real Side Kaams.
      </h2>

      <div className="space-y-3">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-card rounded-2xl p-5 shadow-soft space-y-3">
            <Quote className="h-4 w-4 text-sk-amber" />
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.role}, {t.city}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-sk-emerald/10 text-sk-emerald text-[11px] font-bold">
                {t.rate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
