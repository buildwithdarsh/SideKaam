"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getMatches, getMyBookings, type Opportunity, type Booking } from "@/lib/data";
import { ArrowRight, TrendingUp, Send, Briefcase, MapPin, Clock, IndianRupee, Sparkles } from "lucide-react";
import { EmptyState } from "@/components/empty-states";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FeedPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<any[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMatches(), getMyBookings()])
      .then(([m, b]) => { setMatches(m); setBookings(b); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Greeting */}
      <div className="relative bg-gradient-to-br from-sk-emerald/15 via-sk-emerald/8 to-sk-emerald/[0.02] overflow-hidden rounded-2xl p-3">
        <div className="relative z-10 space-y-1">
          <p className="text-[11px] font-medium text-sk-emerald/70 uppercase tracking-wider">Welcome back</p>
          <h1 className="text-2xl font-bold tracking-tight">
            Hey, {user?.name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {matches.length > 0
              ? <><span className="text-sk-emerald font-semibold">{matches.length} matches</span> found for you</>
              : "Complete your profile to start getting matched"
            }
          </p>
        </div>
        {/* Illustration */}
        <svg viewBox="0 0 140 120" fill="none" className="absolute -right-2 -bottom-2 w-32 h-28 opacity-20" aria-hidden="true">
          <circle cx="70" cy="60" r="45" fill="rgb(var(--sk-emerald))" fillOpacity="0.15" />
          <circle cx="70" cy="60" r="28" fill="rgb(var(--sk-emerald))" fillOpacity="0.12" />
          <path d="M58 52 L70 40 L82 52 M70 40 V80" stroke="rgb(var(--sk-emerald))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 70 Q70 85 90 70" stroke="rgb(var(--sk-emerald))" strokeWidth="2" strokeLinecap="round" />
          <circle cx="45" cy="45" r="4" fill="rgb(var(--sk-emerald))" fillOpacity="0.3" />
          <circle cx="95" cy="42" r="3" fill="rgb(var(--sk-emerald))" fillOpacity="0.25" />
          <circle cx="100" cy="65" r="2" fill="rgb(var(--sk-emerald))" fillOpacity="0.2" />
        </svg>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Matches", value: String(matches.length), Icon: Sparkles, color: "text-sk-emerald", bg: "bg-sk-emerald/8" },
          { label: "Bookings", value: String(bookings.length), Icon: Send, color: "text-sk-indigo", bg: "bg-sk-indigo/8" },
          { label: "Completed", value: String(bookings.filter((b) => b.status === "completed").length), Icon: Briefcase, color: "text-sk-amber", bg: "bg-sk-amber/8" },
          { label: "Earned", value: `₹${bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString("en-IN")}`, Icon: TrendingUp, color: "text-sk-teal", bg: "bg-sk-teal/8" },
        ].map(({ label, value, Icon, color, bg }, i) => (
          <div key={i} className="bg-card rounded-2xl p-4 shadow-soft space-y-2">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", bg)}>
              <Icon className={cn("h-4 w-4", color)} />
            </div>
            <p className="text-xl font-bold tabular-nums">{value}</p>
            <p className="text-[11px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Matches */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Your Matches</h2>
          <Link href="/matches" className="text-xs text-sk-emerald font-medium flex items-center gap-1">
            View all matches <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {loading ? (
          <EmptyState type="loading" />
        ) : matches.length === 0 ? (
          <EmptyState type="empty-matches" action={{ label: "Complete Profile", href: "/profile" }} />
        ) : (
          <div className="space-y-2">
            {matches.slice(0, 5).map((match: any) => (
              <Link
                key={match.id}
                href={`/jobs/${match.id}`}
                className="block bg-card rounded-2xl p-4 shadow-soft hover:shadow-card transition-all group"
              >
                <div className="flex items-center gap-3">
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
                      <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{match.hoursNeeded}h</span>
                      {match.provider?.avgRating > 0 && <span className="text-sk-amber">★ {match.provider.avgRating.toFixed(1)}</span>}
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-secondary text-[9px] capitalize inline-block">{match.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Recent bookings */}
      {bookings.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-semibold">Recent Bookings</h2>
          <div className="space-y-2">
            {bookings.slice(0, 3).map((b) => (
              <div key={b.id} className="bg-card rounded-2xl p-4 shadow-soft flex items-center gap-3">
                <div className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  b.status === "completed" ? "bg-sk-emerald" :
                  b.status === "confirmed" ? "bg-sk-amber" :
                  b.status === "pending" ? "bg-border" : "bg-sk-rose"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate">{b.experience?.title || "Booking"}</p>
                  <p className="text-[11px] text-muted-foreground">{b.date} · ₹{b.totalAmount}</p>
                </div>
                <span className={cn(
                  "text-[11px] font-medium px-2.5 py-1 rounded-full capitalize",
                  b.status === "completed" ? "bg-sk-emerald/10 text-sk-emerald" :
                  b.status === "confirmed" ? "bg-sk-amber/10 text-sk-amber" :
                  "bg-secondary text-muted-foreground"
                )}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
