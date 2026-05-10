"use client";

import { useEffect, useState } from "react";
import { getMatches } from "@/lib/data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sparkles, MapPin, IndianRupee, ArrowRight, Loader2 } from "lucide-react";

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatches().then(setMatches).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      <div className="relative bg-gradient-to-br from-sk-indigo/15 via-sk-indigo/8 to-sk-indigo/[0.02] overflow-hidden rounded-2xl p-3">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Sparkles className="h-3.5 w-3.5 text-sk-indigo" />
            <p className="text-[11px] font-medium text-sk-indigo/70 uppercase tracking-wider">AI-Powered</p>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Your Matches</h1>
          <p className="text-sm text-muted-foreground">Curated opportunities based on your profile</p>
        </div>
        {/* Illustration */}
        <svg viewBox="0 0 140 120" fill="none" className="absolute -right-2 -bottom-2 w-32 h-28 opacity-20" aria-hidden="true">
          <circle cx="70" cy="60" r="45" fill="rgb(var(--sk-indigo))" fillOpacity="0.12" />
          <path d="M55 65 L65 55 L75 65 L85 45" stroke="rgb(var(--sk-indigo))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="55" cy="65" r="4" fill="rgb(var(--sk-indigo))" fillOpacity="0.3" />
          <circle cx="65" cy="55" r="4" fill="rgb(var(--sk-indigo))" fillOpacity="0.3" />
          <circle cx="75" cy="65" r="4" fill="rgb(var(--sk-indigo))" fillOpacity="0.3" />
          <circle cx="85" cy="45" r="4" fill="rgb(var(--sk-indigo))" fillOpacity="0.3" />
          <path d="M40 80 Q70 95 100 80" stroke="rgb(var(--sk-indigo))" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <path d="M60 35 L70 28 L80 35" stroke="rgb(var(--sk-indigo))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="70" y1="28" x2="70" y2="22" stroke="rgb(var(--sk-indigo))" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 text-sk-emerald animate-spin" /></div>
      ) : matches.length === 0 ? (
        <div className="text-center py-12 space-y-2">
          <Sparkles className="h-8 w-8 text-muted-foreground/20 mx-auto" />
          <p className="text-sm text-muted-foreground">No matches yet. Complete your profile to start getting matched.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {matches.map((match: any) => (
            <Link
              key={match.id}
              href={`/jobs/${match.id}`}
              className="block bg-card rounded-2xl p-4 shadow-soft hover:shadow-card transition-all group"
            >
              <div className="flex items-center gap-3">
                {/* Score */}
                <div className="w-10 h-10 rounded-xl bg-sk-emerald/10 flex items-center justify-center text-sk-emerald shrink-0">
                  <IndianRupee className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="text-[14px] font-semibold leading-snug truncate group-hover:text-sk-emerald transition-colors">
                    {match.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{match.city}</span>
                    <span className="flex items-center gap-0.5">
                      <IndianRupee className="h-3 w-3" />₹{match.hourlyBudget}/hr
                    </span>
                    <span>{match.hoursNeeded}h</span>
                    {match.provider?.avgRating > 0 && <span className="text-sk-amber">★ {match.provider.avgRating.toFixed(1)}</span>}
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-secondary text-[9px] capitalize inline-block">{match.category}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-sk-emerald shrink-0 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
