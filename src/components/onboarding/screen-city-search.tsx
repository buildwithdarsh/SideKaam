"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MapPin, Rocket, Globe, Loader2 } from "lucide-react";
import { getCachedConfig, getAppConfig } from "@/lib/tz";

const remoteOptions = ["Remote / Online", "Work from Anywhere"];

const fallbackCities = [
  "Delhi", "Bangalore", "Mumbai", "Hyderabad", "Kolkata",
  "Jaipur", "Pune", "Chennai", "Ahmedabad", "Gwalior",
  "Varanasi", "Shimla", "Agra", "Jhansi", "Lucknow",
  "Indore", "Chandigarh", "Bhopal", "Noida", "Gurgaon",
];

interface Props {
  value: string;
  onSelect: (city: string) => void;
}

export function ScreenCitySearch({ value, onSelect }: Props) {
  const cached = getCachedConfig();
  const [cities, setCities] = useState<string[]>(cached?.sidekaam?.launched_cities || fallbackCities);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    if (cached) return;
    getAppConfig().then((c: any) => {
      if (c?.sidekaam?.launched_cities?.length) setCities(c.sidekaam.launched_cities);
    }).finally(() => setLoading(false));
  }, [cached]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="h-5 w-5 text-sk-emerald animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-slide-up flex flex-col gap-5 px-5">
      <div className="space-y-1">
        <h2 className="text-[22px] font-bold tracking-tight">Which city?</h2>
        <p className="text-[13px] text-muted-foreground">Pick where you want to experience or provide.</p>
      </div>

      {/* Remote options */}
      <div className="grid grid-cols-2 gap-2.5">
        {remoteOptions.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 rounded-2xl px-3 py-4 text-center transition-all active:scale-[0.97]",
                selected
                  ? "bg-sk-indigo text-white shadow-card"
                  : "bg-sk-indigo/5 border border-sk-indigo/15 text-foreground hover:border-sk-indigo/30"
              )}
            >
              <Globe className={cn("h-4 w-4", selected ? "text-white/80" : "text-sk-indigo/50")} />
              <span className="text-[13px] font-semibold leading-tight">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* City grid */}
      <div className="grid grid-cols-3 gap-2">
        {cities.map((city) => {
          const selected = value === city;
          return (
            <button
              key={city}
              onClick={() => onSelect(city)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3.5 text-center transition-all active:scale-[0.97]",
                selected
                  ? "bg-sk-emerald text-white shadow-card"
                  : "bg-card shadow-soft text-foreground hover:shadow-card"
              )}
            >
              <MapPin className={cn("h-3.5 w-3.5", selected ? "text-white/70" : "text-muted-foreground/30")} />
              <span className="text-[12px] font-medium leading-tight">{city}</span>
            </button>
          );
        })}
      </div>

      {/* Expanding soon */}
      <div className="rounded-2xl bg-sk-indigo/5 border border-sk-indigo/10 p-5 flex items-center gap-4">
        <div className="shrink-0">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" aria-hidden="true">
            <circle cx="32" cy="32" r="28" fill="rgb(99 102 241)" fillOpacity="0.06" stroke="rgb(99 102 241)" strokeOpacity="0.15" strokeWidth="1.5"/>
            <circle cx="22" cy="20" r="2" fill="rgb(99 102 241)" fillOpacity="0.3"/>
            <circle cx="38" cy="18" r="2" fill="rgb(99 102 241)" fillOpacity="0.3"/>
            <circle cx="28" cy="30" r="2.5" fill="rgb(16 185 129)" fillOpacity="0.5"/>
            <circle cx="42" cy="28" r="2" fill="rgb(99 102 241)" fillOpacity="0.3"/>
            <circle cx="20" cy="38" r="2" fill="rgb(99 102 241)" fillOpacity="0.2"/>
            <circle cx="35" cy="40" r="2" fill="rgb(99 102 241)" fillOpacity="0.2"/>
            <circle cx="44" cy="36" r="1.5" fill="rgb(99 102 241)" fillOpacity="0.15"/>
            <circle cx="30" cy="48" r="1.5" fill="rgb(99 102 241)" fillOpacity="0.15"/>
            <circle cx="28" cy="30" r="8" fill="none" stroke="rgb(16 185 129)" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="2 2"/>
            <circle cx="28" cy="30" r="14" fill="none" stroke="rgb(16 185 129)" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 2"/>
            <path d="M46 12 L50 8 L52 14 L46 12Z" fill="rgb(245 158 11)" fillOpacity="0.4"/>
          </svg>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Rocket className="h-3.5 w-3.5 text-sk-indigo" />
            <p className="text-[12px] font-semibold text-sk-indigo">Expanding soon</p>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            More cities launching every month. Don&apos;t see yours? We&apos;ll notify you when we arrive.
          </p>
        </div>
      </div>
    </div>
  );
}
