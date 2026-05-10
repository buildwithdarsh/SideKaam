"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { popularCities, searchCitiesAPI } from "@/lib/cities";
import { Briefcase, Building2, MapPin, Search } from "lucide-react";
import { useEffect } from "react";

const industries = [
  "IT / Software", "Banking / Finance", "Healthcare", "Education",
  "Government", "Manufacturing", "Retail / E-commerce", "Media / Entertainment",
  "Consulting", "Real Estate", "Telecom", "FMCG", "Automobile",
  "Legal", "Agriculture", "Hospitality", "Logistics", "Other",
];

interface Props {
  jobTitle: string;
  jobIndustry: string;
  city: string;
  onChange: (key: string, value: string) => void;
  onContinue: () => void;
}

export function ScreenDayJobInput({ jobTitle, jobIndustry, city, onChange, onContinue }: Props) {
  const [cityQuery, setCityQuery] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [cities, setCities] = useState<string[]>(popularCities);

  useEffect(() => {
    if (cityQuery.length < 2) { setCities(popularCities); return; }
    const timer = setTimeout(async () => {
      const results = await searchCitiesAPI(cityQuery);
      setCities(results);
    }, 300);
    return () => clearTimeout(timer);
  }, [cityQuery]);

  const canContinue = jobTitle.trim() && jobIndustry && city;

  return (
    <div className="animate-slide-up flex flex-col gap-6 px-5">
      <div className="space-y-1">
        <h2 className="text-[22px] font-bold tracking-tight">
          Tell us about your 9-to-5
        </h2>
        <p className="text-[13px] text-muted-foreground">
          We won't tell your boss.
        </p>
      </div>

      {/* Job title */}
      <div className="space-y-2">
        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Job Title</label>
        <div className="relative">
          <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => onChange("job_title", e.target.value)}
            placeholder="e.g. Software Engineer, CA, Teacher..."
            className="w-full rounded-xl bg-card shadow-soft pl-10 pr-4 py-3 text-[14px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sk-emerald"
          />
        </div>
      </div>

      {/* Industry */}
      <div className="space-y-2">
        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Industry</label>
        <div className="flex flex-wrap gap-1.5">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => onChange("job_industry", ind)}
              className={cn(
                "px-3 py-1.5 rounded-full text-[11px] font-medium transition-all",
                jobIndustry === ind ? "bg-sk-emerald text-white" : "bg-card shadow-soft text-muted-foreground"
              )}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">City</label>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={showCities ? cityQuery : city || cityQuery}
            onChange={(e) => { setCityQuery(e.target.value); setShowCities(true); onChange("city", ""); }}
            onFocus={() => setShowCities(true)}
            placeholder="Search city..."
            className="w-full rounded-xl bg-card shadow-soft pl-10 pr-4 py-3 text-[14px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sk-emerald"
          />
        </div>
        {showCities && (
          <div className="max-h-[25vh] overflow-y-auto rounded-xl bg-card shadow-card">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => { onChange("city", c); setCityQuery(""); setShowCities(false); }}
                className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-secondary transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Continue */}
      <button
        onClick={onContinue}
        disabled={!canContinue}
        className={cn(
          "w-full rounded-2xl py-4 text-[15px] font-semibold transition-all",
          canContinue
            ? "bg-foreground text-background shadow-soft active:scale-[0.98]"
            : "bg-secondary text-muted-foreground cursor-not-allowed"
        )}
      >
        Continue
      </button>
    </div>
  );
}
