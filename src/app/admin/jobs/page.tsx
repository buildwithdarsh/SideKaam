"use client";

import { useEffect, useState } from "react";
import { adminListOpportunities, type Opportunity } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Plus, Search, Eye, Edit3, Trash2, Loader2 } from "lucide-react";

export default function AdminJobsPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminListOpportunities().then((data: any) => {
      setOpportunities(data?.items || []);
      setTotal(data?.total || 0);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = search
    ? opportunities.filter((o) => o.title.toLowerCase().includes(search.toLowerCase()))
    : opportunities;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Opportunities</h1>
          <p className="text-sm text-muted-foreground">{total} total</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-sk-emerald text-white px-4 py-2.5 text-[13px] font-semibold shadow-soft hover:shadow-card active:scale-[0.98] transition-all">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-xl bg-card shadow-soft pl-10 pr-4 py-2.5 text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sk-emerald transition-all"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 text-sk-emerald animate-spin" /></div>
      ) : (
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Title</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">City</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Rate</th>
                  <th className="text-left px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((opp) => (
                  <tr key={opp.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-[13px] font-medium">{opp.title}</p>
                      <p className="text-[11px] text-muted-foreground">{opp.workMode} · {opp.hoursNeeded} hrs</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-[11px] font-medium text-muted-foreground capitalize">{opp.category}</span>
                    </td>
                    <td className="px-4 py-3 text-[13px]">{opp.city}</td>
                    <td className="px-4 py-3 text-[13px] tabular-nums">₹{opp.hourlyBudget}/hr</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize",
                        opp.status === "active" ? "bg-sk-emerald/10 text-sk-emerald" :
                        opp.status === "closed" ? "bg-sk-rose/10 text-sk-rose" :
                        "bg-secondary text-muted-foreground"
                      )}>
                        {opp.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground"><Eye className="h-3.5 w-3.5" /></button>
                        <button className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button className="w-7 h-7 rounded-lg hover:bg-sk-rose/10 flex items-center justify-center text-muted-foreground hover:text-sk-rose"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-sm text-muted-foreground">No opportunities found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
