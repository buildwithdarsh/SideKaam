"use client";

import { useAuth } from "@/lib/auth";

export function PlanBadge() {
  const { user } = useAuth();
  const sub = user?.subscription;

  if (!sub || sub.status !== "active") return null;

  const planLabel = sub.plan === "yearly" ? "12 Months" : sub.plan === "half-yearly" ? "6 Months" : "1 Month";
  const expires = sub.expiresAt ? new Date(sub.expiresAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "";

  return (
    <div className="mt-auto rounded-xl bg-sk-emerald/8 p-3 space-y-1">
      <p className="text-xs font-semibold text-sk-emerald">{planLabel} Plan</p>
      {expires && <p className="text-[10px] text-muted-foreground">Valid till {expires}</p>}
    </div>
  );
}
