"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TZ } from "@/lib/tz";
import { X, Calendar, Clock, Send, Loader2, CheckCircle, IndianRupee } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  /** For opportunity bookings */
  opportunity?: { id: string; title: string; hourlyBudget: number; city: string };
  /** For profile connections */
  profile?: { id: string; headline: string; hourlyRateMin: number; city: string };
}

export function BookingSheet({ open, onClose, onSuccess, opportunity, profile }: Props) {
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("10:00");
  const [hours, setHours] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const title = opportunity?.title || profile?.headline || "Connect";
  const rate = opportunity?.hourlyBudget || profile?.hourlyRateMin || 0;
  const total = rate * hours;
  const city = opportunity?.city || profile?.city || "";


  const handleSubmit = async () => {
    if (!date) { setError("Pick a date"); return; }
    setLoading(true);
    setError("");

    try {
      if (opportunity) {
        // Create a real booking via SDK
        await Promise.resolve(TZ.storefront.marketplace.createBooking({
          opportunityId: opportunity.id,
          date,
          startTime: time,
          durationHours: hours,
          message: message || undefined,
        }));
      } else if (profile) {
        // Create real booking via connect endpoint
        await Promise.resolve(TZ.storefront.marketplace.connect({
          profileId: profile.id,
          date,
          startTime: time,
          durationHours: hours,
          message: message || undefined,
        }));
      }
      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.message || "Failed to book. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  // Success state
  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-md bg-card rounded-t-3xl sm:rounded-3xl p-6 pb-24 sm:pb-6 shadow-lifted space-y-6 animate-slide-up">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-sk-emerald/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-sk-emerald" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">You&apos;re connected!</h2>
              <p className="text-[13px] text-muted-foreground">
                {opportunity
                  ? `Your booking for "${title}" has been sent. The provider will confirm shortly.`
                  : `Your connection request has been sent. They'll get back to you soon.`}
              </p>
            </div>
            {opportunity && (
              <div className="bg-secondary/60 rounded-xl p-3 w-full text-[13px] space-y-1">
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{date}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{time}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{hours} hr{hours > 1 ? "s" : ""}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-bold text-sk-emerald">₹{total.toLocaleString("en-IN")}</span></div>
              </div>
            )}
            <button onClick={onClose} className="w-full rounded-2xl bg-foreground text-background py-3.5 text-[14px] font-semibold active:scale-[0.98] transition-all">
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card rounded-t-3xl sm:rounded-3xl p-5 pb-24 sm:pb-5 shadow-lifted space-y-4 animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Handle bar (mobile) */}
        <div className="w-10 h-1 rounded-full bg-border mx-auto sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[17px] font-bold">Book a session</h2>
            <p className="text-[12px] text-muted-foreground truncate max-w-[250px]">{title} · {city}</p>
          </div>
          <button onClick={onClose} aria-label="Close booking sheet" className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">When</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl bg-secondary/60 pl-9 pr-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-sk-emerald"
              />
            </div>
            <div className="relative w-28">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl bg-secondary/60 pl-9 pr-2 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-sk-emerald appearance-none"
              >
                {["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Duration</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((h) => (
              <button
                key={h}
                onClick={() => setHours(h)}
                className={cn(
                  "flex-1 py-2.5 rounded-xl text-[13px] font-medium transition-all",
                  hours === h ? "bg-sk-emerald text-white" : "bg-secondary/60 text-muted-foreground"
                )}
              >
                {h} hr{h > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Message (optional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi! I'd love to connect..."
            rows={2}
            className="w-full rounded-xl bg-secondary/60 px-3 py-2.5 text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sk-emerald resize-none"
          />
        </div>

        {/* Summary */}
        {rate > 0 && (
          <div className="flex items-center justify-between bg-sk-emerald/5 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <IndianRupee className="h-3.5 w-3.5" />
              ₹{rate}/hr × {hours} hr{hours > 1 ? "s" : ""}
            </div>
            <span className="text-[15px] font-bold text-sk-emerald">₹{total.toLocaleString("en-IN")}</span>
          </div>
        )}

        {error && <p className="text-[12px] text-destructive text-center">{error}</p>}

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={cn(
            "w-full rounded-2xl py-3.5 text-[15px] font-bold",
            "bg-sk-emerald text-white shadow-soft",
            "active:scale-[0.98] transition-all",
            "flex items-center justify-center gap-2",
            loading && "opacity-70 cursor-not-allowed"
          )}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
            <><Send className="h-4 w-4" /> {opportunity ? "Book Session" : "Send Connection"}</>
          )}
        </button>
      </div>
    </div>
  );
}
