"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getMyProfile } from "@/lib/data";
import { cn, maskEmail } from "@/lib/utils";
import {
  MapPin, Shield, Calendar, Clock, Edit3, Briefcase, TrendingUp,
  Star, Award, Upload, FileText, Plus, Building2, GraduationCap, Loader2,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile().then((p) => setProfile(p)).finally(() => setLoading(false));
  }, []);

  const hasPaid = user?.subscription?.status === "active";
  const trustScore = hasPaid ? 99 : (profile?.trustScore || 0);
  const trustColor = trustScore >= 80 ? "text-sk-emerald" : trustScore >= 50 ? "text-sk-amber" : "text-sk-rose";
  const trustBg = trustScore >= 80 ? "bg-sk-emerald" : trustScore >= 50 ? "bg-sk-amber" : "bg-sk-rose";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 text-sk-emerald animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-6 space-y-4">
      {/* Profile header */}
      <div className="relative bg-gradient-to-br from-sk-teal/15 via-sk-teal/8 to-sk-teal/[0.02] rounded-2xl p-3 overflow-hidden">
        {/* Illustration */}
        <svg viewBox="0 0 140 120" fill="none" className="absolute -right-2 -top-2 w-32 h-28 opacity-[0.12]" aria-hidden="true">
          <circle cx="70" cy="60" r="40" fill="rgb(var(--sk-teal))" fillOpacity="0.1" />
          <circle cx="70" cy="45" r="16" fill="none" stroke="rgb(var(--sk-teal))" strokeWidth="2.5" />
          <path d="M46 82 Q58 65 70 65 Q82 65 94 82" fill="none" stroke="rgb(var(--sk-teal))" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="42" cy="35" r="3" fill="rgb(var(--sk-teal))" fillOpacity="0.2" />
          <circle cx="100" cy="38" r="2.5" fill="rgb(var(--sk-teal))" fillOpacity="0.15" />
          <path d="M98 72 L104 66 M104 72 L98 66" stroke="rgb(var(--sk-teal))" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <div className="relative z-10 p-5">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-sk-teal/10 flex items-center justify-center shrink-0 ring-2 ring-sk-teal/20">
              <span className="text-xl font-bold text-sk-teal">{user?.name?.[0] || "?"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-sk-teal/70 uppercase tracking-wider mb-0.5">Your Profile</p>
              <h1 className="text-lg font-bold tracking-tight">{user?.name || "Your Name"}</h1>
              <p className="text-[12px] text-muted-foreground">{maskEmail(user?.email)}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                {profile?.city && <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {profile.city}</span>}
                {profile?.userType && (
                  <span className="px-1.5 py-0.5 rounded-full bg-sk-teal/10 text-sk-teal text-[10px] font-semibold capitalize">
                    {profile.userType}
                  </span>
                )}
              </div>
            </div>
            <Link href="/onboarding?edit=true" className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0">
              <Edit3 className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Trust score */}
          <div className="rounded-xl bg-card/60 backdrop-blur-sm p-3 space-y-2 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Shield className={cn("h-3.5 w-3.5", trustColor)} />
                <span className="text-[12px] font-semibold">Trust Score</span>
              </div>
              <span className={cn("text-sm font-bold tabular-nums", trustColor)}>{trustScore}/100</span>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <div className={cn("h-full rounded-full transition-all", trustBg)} style={{ width: `${trustScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Projects", value: String(profile?.reviewCount || 0), Icon: Briefcase, color: "text-sk-indigo", bg: "bg-sk-indigo/8" },
          { label: "Earned", value: `₹${((profile?.totalEarned || 0) / 1000).toFixed(0)}K`, Icon: TrendingUp, color: "text-sk-emerald", bg: "bg-sk-emerald/8" },
          { label: "Hours", value: String(profile?.totalHours || 0), Icon: Clock, color: "text-sk-amber", bg: "bg-sk-amber/8" },
          { label: "Rating", value: profile?.avgRating ? `${profile.avgRating.toFixed(1)}` : "—", Icon: Star, color: "text-sk-teal", bg: "bg-sk-teal/8" },
        ].map(({ label, value, Icon, color, bg }, i) => (
          <div key={i} className="bg-card rounded-xl p-3 shadow-soft text-center space-y-1">
            <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center mx-auto", bg)}>
              <Icon className={cn("h-3.5 w-3.5", color)} />
            </div>
            <p className="text-base font-bold tabular-nums">{value}</p>
            <p className="text-[9px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Skills / Categories */}
      {profile?.categories?.length > 0 && (
        <div className="bg-card rounded-2xl p-4 shadow-soft space-y-3">
          <h2 className="text-sm font-semibold">Categories</h2>
          <div className="flex flex-wrap gap-1.5">
            {profile.categories.map((cat: string) => (
              <span key={cat} className="px-3 py-1.5 rounded-full bg-sk-emerald/8 text-sk-emerald text-[11px] font-medium capitalize">{cat}</span>
            ))}
          </div>
        </div>
      )}

      {/* Subcategories */}
      {profile?.subcategories?.length > 0 && (
        <div className="bg-card rounded-2xl p-4 shadow-soft space-y-3">
          <h2 className="text-sm font-semibold">Specialties</h2>
          <div className="flex flex-wrap gap-1.5">
            {profile.subcategories.map((sub: string) => (
              <span key={sub} className="px-3 py-1.5 rounded-full bg-secondary text-[11px] font-medium">{sub}</span>
            ))}
          </div>
        </div>
      )}

      {/* Rate & Availability */}
      <div className="bg-card rounded-2xl p-4 shadow-soft space-y-2">
        <h2 className="text-sm font-semibold">Rate & Availability</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[13px]">{profile?.hoursBand || "—"} hours/week</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-sk-emerald">
              ₹{profile?.hourlyRateMin || 0}{profile?.hourlyRateMax && profile.hourlyRateMax !== profile.hourlyRateMin ? `-₹${profile.hourlyRateMax}` : ""}/hr
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn("w-2 h-2 rounded-full", profile?.isActive ? "bg-sk-emerald" : "bg-border")} />
          <span className={cn("text-[11px] font-medium", profile?.isActive ? "text-sk-emerald" : "text-muted-foreground")}>
            {profile?.isActive ? "Available" : "Paused"}
          </span>
        </div>
      </div>

      {/* No profile yet */}
      {!profile && (
        <div className="bg-card rounded-2xl p-8 shadow-soft text-center space-y-3">
          <p className="text-sm text-muted-foreground">You haven&apos;t created your marketplace profile yet.</p>
          <Link href="/onboarding" className="inline-flex items-center gap-2 rounded-xl bg-sk-emerald text-white px-5 py-2.5 text-[13px] font-semibold">
            Complete Onboarding
          </Link>
        </div>
      )}
    </div>
  );
}
