"use client";

import { useEffect, useState } from "react";
import { adminListProfiles, type MarketplaceProfile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function AdminUsersPage() {
  const [profiles, setProfiles] = useState<MarketplaceProfile[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminListProfiles().then((data: any) => {
      setProfiles(data?.items || []);
      setTotal(data?.total || 0);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">{total} marketplace profiles</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 text-sk-emerald animate-spin" /></div>
      ) : (
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Profile</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">City</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Categories</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Trust</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {profiles.map((p) => (
                  <tr key={p.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sk-emerald/10 flex items-center justify-center text-xs font-bold text-sk-emerald">
                          {(p.headline || p.userType)[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-[13px] font-medium">{p.headline || `${p.userType} profile`}</p>
                          <p className="text-[11px] text-muted-foreground">{p.userId.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize",
                        p.userType === "experiencer" ? "bg-sk-indigo/10 text-sk-indigo" : "bg-sk-amber/10 text-sk-amber"
                      )}>
                        {p.userType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px]">{p.city}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {p.categories.slice(0, 2).map((c) => (
                          <span key={c} className="px-2 py-0.5 rounded-full bg-secondary text-[10px] capitalize">{c}</span>
                        ))}
                        {p.categories.length > 2 && <span className="text-[10px] text-muted-foreground">+{p.categories.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-border overflow-hidden">
                          <div className={cn(
                            "h-full rounded-full",
                            p.trustScore >= 80 ? "bg-sk-emerald" : p.trustScore >= 50 ? "bg-sk-amber" : "bg-sk-rose"
                          )} style={{ width: `${p.trustScore}%` }} />
                        </div>
                        <span className="text-[11px] tabular-nums text-muted-foreground">{Math.round(p.trustScore)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-semibold",
                        p.isActive ? "bg-sk-emerald/10 text-sk-emerald" : "bg-secondary text-muted-foreground"
                      )}>
                        {p.isActive ? "Active" : "Paused"}
                      </span>
                    </td>
                  </tr>
                ))}
                {profiles.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-sm text-muted-foreground">No profiles found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
