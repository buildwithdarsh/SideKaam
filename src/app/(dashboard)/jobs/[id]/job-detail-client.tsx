"use client";

import { useEffect, useState } from "react";
import { getOpportunity } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, IndianRupee, Calendar, Users, Send, Bookmark, Share2, CheckCircle, XCircle } from "lucide-react";
import { EmptyState } from "@/components/empty-states";
import { BookingSheet } from "@/components/booking-sheet";

export function JobDetailClient({ id }: { id: string }) {
  const [opp, setOpp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  const fetchOpp = () => {
    if (id) getOpportunity(id).then(setOpp).finally(() => setLoading(false));
  };

  useEffect(fetchOpp, [id]);

  const connectionStatus = opp?.connectionStatus;
  const provider = opp?.provider;

  if (loading) return <EmptyState type="loading" />;

  if (!opp) {
    return (
      <div className="max-w-3xl mx-auto px-4 lg:px-8 py-6">
        <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to opportunities
        </Link>
        <EmptyState type="not-found" title="Opportunity not found" action={{ label: "Browse opportunities", href: "/jobs" }} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-6 space-y-4">
      <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to opportunities
      </Link>

      {/* Header card */}
      <div className="bg-card rounded-2xl p-5 shadow-card space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            {opp.isRecurring && <span className="px-2 py-0.5 rounded-full bg-sk-emerald/10 text-sk-emerald text-[10px] font-semibold">Recurring</span>}
            <span className="px-2 py-0.5 rounded-full bg-secondary text-[10px] font-medium text-muted-foreground capitalize">{opp.category}</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary text-[10px] font-medium text-muted-foreground">{opp.workMode}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight leading-snug">{opp.title}</h1>
        </div>

        {/* Provider info */}
        {provider && (
          <div className="flex items-center gap-3 bg-secondary/40 rounded-xl p-3">
            <div className="w-9 h-9 rounded-lg bg-sk-emerald/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-sk-emerald">{(provider.headline || "P")[0]?.toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium truncate">{provider.headline || "Provider"}</p>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>{provider.city}</span>
                {provider.avgRating > 0 && <span className="text-sk-amber">★ {provider.avgRating.toFixed(1)}</span>}
                {provider.reviewCount > 0 && <span>({provider.reviewCount})</span>}
              </div>
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { Icon: IndianRupee, label: "Rate", value: `₹${opp.hourlyBudget}/hr` },
            { Icon: Clock, label: "Hours", value: `${opp.hoursNeeded} hrs` },
            { Icon: MapPin, label: "City", value: opp.city },
            { Icon: Calendar, label: "Date", value: opp.scheduledDate || "Flexible" },
          ].map(({ Icon, label, value }, i) => (
            <div key={i} className="rounded-lg bg-secondary/60 p-2.5 space-y-0.5">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Icon className="h-3 w-3" /><span className="text-[9px] font-medium uppercase tracking-wider">{label}</span>
              </div>
              <p className="text-[13px] font-semibold">{value}</p>
            </div>
          ))}
        </div>

        {/* CTA or Status */}
        {connectionStatus ? (
          <div className={cn(
            "w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-bold",
            connectionStatus === "confirmed" ? "bg-sk-emerald/10 text-sk-emerald" :
            connectionStatus === "pending" ? "bg-sk-amber/10 text-sk-amber" :
            connectionStatus === "completed" ? "bg-sk-emerald/10 text-sk-emerald" :
            "bg-sk-rose/10 text-sk-rose"
          )}>
            {connectionStatus === "pending" && <><Clock className="h-4 w-4" /> Booking sent — waiting for confirmation</>}
            {connectionStatus === "confirmed" && <><CheckCircle className="h-4 w-4" /> Confirmed!</>}
            {connectionStatus === "completed" && <><CheckCircle className="h-4 w-4" /> Completed</>}
            {connectionStatus === "cancelled" && <><XCircle className="h-4 w-4" /> Declined</>}
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setShowBooking(true)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-sk-emerald text-white py-3.5 text-[14px] font-semibold shadow-soft active:scale-[0.98] transition-all">
              <Send className="h-4 w-4" /> Book Session
            </button>
            <button aria-label="Save opportunity" className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground"><Bookmark className="h-4 w-4" /></button>
            <button aria-label="Share opportunity" className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground"><Share2 className="h-4 w-4" /></button>
          </div>
        )}
      </div>

      {/* Description */}
      {opp.description && (
        <div className="bg-card rounded-2xl p-4 shadow-soft">
          <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider mb-2">About</h3>
          <p className="text-[14px] text-foreground/80 leading-relaxed">{opp.description}</p>
        </div>
      )}

      {/* Subcategory */}
      {opp.subcategory && (
        <div className="bg-card rounded-2xl p-4 shadow-soft">
          <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Specialty</h3>
          <span className="px-3 py-1 rounded-full bg-sk-emerald/8 text-sk-emerald text-[11px] font-medium">{opp.subcategory}</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {opp.applicants} interested</span>
        <span>{new Date(opp.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Booking sheet */}
      <BookingSheet
        open={showBooking}
        onClose={() => setShowBooking(false)}
        onSuccess={fetchOpp}
        opportunity={{ id: opp.id, title: opp.title, hourlyBudget: opp.hourlyBudget, city: opp.city }}
      />
    </div>
  );
}
