"use client";

import { useEffect, useState } from "react";
import { getAdminStats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Users, CreditCard, Briefcase, Zap, TrendingUp, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 text-sk-emerald animate-spin" /></div>;
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Marketplace admin overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: stats?.totalUsers || stats?.totalProfiles || 0, Icon: Users, color: "text-sk-indigo", bg: "bg-sk-indigo/8" },
          { label: "Active Subscriptions", value: stats?.activeSubscriptions || 0, Icon: CreditCard, color: "text-sk-emerald", bg: "bg-sk-emerald/8" },
          { label: "Total Jobs", value: stats?.totalJobs || stats?.totalOpportunities || 0, Icon: Briefcase, color: "text-sk-amber", bg: "bg-sk-amber/8" },
          { label: "Matches This Week", value: stats?.matchesThisWeek || stats?.totalBookings || 0, Icon: Zap, color: "text-sk-teal", bg: "bg-sk-teal/8" },
          { label: "Revenue (MRR)", value: stats?.revenue ? `₹${(stats.revenue / 100000).toFixed(1)}L` : "₹0", Icon: TrendingUp, color: "text-sk-emerald", bg: "bg-sk-emerald/8" },
          { label: "Conversion Rate", value: stats?.conversionRate ? `${stats.conversionRate}%` : "—", Icon: TrendingUp, color: "text-sk-rose", bg: "bg-sk-rose/8" },
        ].map(({ label, value, Icon, color, bg }, i) => (
          <div key={i} className="bg-card rounded-2xl p-5 shadow-soft space-y-3">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", bg)}>
              <Icon className={cn("h-4 w-4", color)} />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums">{typeof value === "number" ? value.toLocaleString("en-IN") : value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
