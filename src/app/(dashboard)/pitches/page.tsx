"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getMyBookings, getMyProfile, type Booking, type MarketplaceProfile } from "@/lib/data";
import { TZ } from "@/lib/tz";
import { cn } from "@/lib/utils";
import { Send, Clock, CheckCircle, XCircle, Loader2, ThumbsUp, ThumbsDown, MessageCircle, IndianRupee, Calendar } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; bg: string; Icon: any }> = {
  pending: { label: "Pending", color: "text-sk-amber", bg: "bg-sk-amber/10", Icon: Clock },
  confirmed: { label: "Confirmed", color: "text-sk-emerald", bg: "bg-sk-emerald/10", Icon: CheckCircle },
  completed: { label: "Completed", color: "text-sk-emerald", bg: "bg-sk-emerald/10", Icon: CheckCircle },
  cancelled: { label: "Declined", color: "text-sk-rose", bg: "bg-sk-rose/10", Icon: XCircle },
  no_show: { label: "No Show", color: "text-sk-rose", bg: "bg-sk-rose/10", Icon: XCircle },
};

export default function PitchesPage() {
  const { user } = useAuth();
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [profile, setProfile] = useState<MarketplaceProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [noteModal, setNoteModal] = useState<{ id: string; action: "confirmed" | "cancelled" } | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const isProvider = profile?.userType === "provider";

  useEffect(() => {
    getMyProfile().then(async (p) => {
      setProfile(p);
      const role = p?.userType === "provider" ? "provider" : "experiencer";
      const data = await getMyBookings(role);
      setAllBookings(data);
      setBookings(data);
    }).finally(() => setLoading(false));
  }, []);

  const handleAction = async (bookingId: string, status: "confirmed" | "cancelled") => {
    setActionLoading(bookingId);
    try {
      await Promise.resolve(TZ.storefront.marketplace.updateBookingStatus(bookingId, status, note || undefined));
      // Update local state
      setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status } : b));
      setNoteModal(null);
      setNote("");
    } catch (err: any) {
      setError(err?.message || "Failed to update");
    } finally {
      setActionLoading(null);
    }
  };

  const pageTitle = isProvider ? "Incoming Requests" : "My Bookings";
  const pageSubtitle = isProvider
    ? `${bookings.filter((b) => b.status === "pending").length} pending requests`
    : `${bookings.length} total`;

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      <div className="relative bg-gradient-to-br from-sk-amber/15 via-sk-amber/8 to-sk-amber/[0.02] overflow-hidden rounded-2xl p-3">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Send className="h-3.5 w-3.5 text-sk-amber" />
            <p className="text-[11px] font-medium text-sk-amber/70 uppercase tracking-wider">
              {isProvider ? "Manage" : "Track"}
            </p>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-sm text-muted-foreground">{pageSubtitle}</p>
        </div>
        {/* Illustration */}
        <svg viewBox="0 0 140 120" fill="none" className="absolute -right-2 -bottom-2 w-32 h-28 opacity-20" aria-hidden="true">
          <circle cx="70" cy="60" r="45" fill="rgb(var(--sk-amber))" fillOpacity="0.12" />
          <rect x="48" y="40" width="44" height="35" rx="6" fill="none" stroke="rgb(var(--sk-amber))" strokeWidth="2.5" />
          <path d="M48 48 L70 62 L92 48" stroke="rgb(var(--sk-amber))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="40" cy="38" r="3" fill="rgb(var(--sk-amber))" fillOpacity="0.25" />
          <circle cx="100" cy="42" r="2.5" fill="rgb(var(--sk-amber))" fillOpacity="0.2" />
          <circle cx="95" cy="80" r="3.5" fill="rgb(var(--sk-amber))" fillOpacity="0.15" />
          <path d="M105 55 L112 48 M112 55 L105 48" stroke="rgb(var(--sk-amber))" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Tabs for provider */}
      {isProvider && (
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                if (tab === "all") {
                  getMyBookings("provider").then(setBookings);
                } else {
                  getMyBookings("provider").then((all) => setBookings(all.filter((b) => b.status === tab)));
                }
              }}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-card shadow-soft text-muted-foreground capitalize hover:text-foreground transition-colors"
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Loader2 className="h-6 w-6 text-sk-emerald animate-spin" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center">
          <svg viewBox="0 0 120 100" fill="none" className="w-28 h-auto" aria-hidden="true">
            <rect x="20" y="20" width="80" height="60" rx="12" fill="rgb(var(--sk-emerald))" fillOpacity="0.04" stroke="rgb(var(--sk-emerald))" strokeOpacity="0.12" strokeWidth="1.5"/>
            <rect x="32" y="35" width="40" height="4" rx="2" fill="rgb(var(--sk-emerald))" fillOpacity="0.12"/>
            <rect x="32" y="45" width="56" height="3" rx="1.5" fill="rgb(var(--sk-emerald))" fillOpacity="0.08"/>
            <rect x="32" y="54" width="48" height="3" rx="1.5" fill="rgb(var(--sk-emerald))" fillOpacity="0.06"/>
          </svg>
          <div className="space-y-1">
            <p className="text-[15px] font-semibold">{isProvider ? "No requests yet" : "No bookings yet"}</p>
            <p className="text-[13px] text-muted-foreground">
              {isProvider ? "When experiencers express interest, they'll appear here." : "Browse opportunities and connect to get started."}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => {
            const config = statusConfig[b.status] || statusConfig.pending;
            const isPending = b.status === "pending";

            return (
              <div key={b.id} className="bg-card rounded-2xl shadow-soft overflow-hidden">
                {/* Main content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold">{b.experience?.title || "Booking"}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" />{b.date}</span>
                        {b.startTime && <span>{b.startTime}</span>}
                        <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{b.durationHours}h</span>
                        <span className="flex items-center gap-0.5 font-medium text-sk-emerald"><IndianRupee className="h-3 w-3" />₹{b.totalAmount}</span>
                      </div>
                    </div>
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold", config.bg, config.color)}>
                      <config.Icon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </div>

                  {/* Message */}
                  {b.message && (
                    <div className="flex gap-2 items-start">
                      <MessageCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-[12px] text-muted-foreground leading-relaxed">{b.message}</p>
                    </div>
                  )}

                  {/* Provider note */}
                  {(b as any).note && (
                    <div className="bg-secondary/60 rounded-lg px-3 py-2">
                      <p className="text-[11px] text-muted-foreground"><strong>Note:</strong> {(b as any).note}</p>
                    </div>
                  )}
                </div>

                {/* Action buttons for provider on pending bookings */}
                {isProvider && isPending && (
                  <div className="flex border-t border-border">
                    <button
                      onClick={() => setNoteModal({ id: b.id, action: "cancelled" })}
                      disabled={actionLoading === b.id}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-medium text-sk-rose hover:bg-sk-rose/5 transition-colors border-r border-border"
                    >
                      <ThumbsDown className="h-3.5 w-3.5" /> Decline
                    </button>
                    <button
                      onClick={() => setNoteModal({ id: b.id, action: "confirmed" })}
                      disabled={actionLoading === b.id}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-medium text-sk-emerald hover:bg-sk-emerald/5 transition-colors"
                    >
                      {actionLoading === b.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ThumbsUp className="h-3.5 w-3.5" />} Approve
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Note modal */}
      {noteModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setNoteModal(null)} />
          <div className="relative w-full max-w-sm bg-card rounded-t-3xl sm:rounded-3xl p-5 pb-24 sm:pb-5 shadow-lifted space-y-4 animate-slide-up">
            <div className="w-10 h-1 rounded-full bg-border mx-auto sm:hidden" />
            <h3 className="text-[17px] font-bold">
              {noteModal.action === "confirmed" ? "Approve booking" : "Decline booking"}
            </h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={noteModal.action === "confirmed" ? "Any message for the experiencer? (optional)" : "Reason for declining (optional)"}
              rows={3}
              className="w-full rounded-xl bg-secondary/60 px-3 py-2.5 text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sk-emerald resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setNoteModal(null); setNote(""); }}
                className="flex-1 rounded-xl bg-secondary py-3 text-[13px] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(noteModal.id, noteModal.action)}
                disabled={actionLoading === noteModal.id}
                className={cn(
                  "flex-1 rounded-xl py-3 text-[13px] font-bold text-white flex items-center justify-center gap-1.5",
                  noteModal.action === "confirmed" ? "bg-sk-emerald" : "bg-sk-rose"
                )}
              >
                {actionLoading === noteModal.id ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                  noteModal.action === "confirmed" ? "Approve" : "Decline"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
