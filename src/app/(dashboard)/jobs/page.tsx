"use client";

import { useState, useEffect, useMemo } from "react";
import { searchOpportunities, getCategories, type Opportunity } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Search, MapPin, Clock, IndianRupee, Flame, SlidersHorizontal, Users, Calendar, Briefcase, Loader2 } from "lucide-react";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "rate">("recent");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories from config
  useEffect(() => {
    getCategories().then((cats) => setCategories(["All", ...cats]));
  }, []);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Fetch opportunities (only on category/search change, NOT sort)
  const [rawOpportunities, setRawOpportunities] = useState<Opportunity[]>([]);
  useEffect(() => {
    setLoading(true);
    const params: any = {};
    if (category !== "All") params.category = category;
    if (debouncedSearch) params.search = debouncedSearch;

    searchOpportunities(params).then(({ items, total }) => {
      setRawOpportunities(items);
      setTotal(total);
    }).finally(() => setLoading(false));
  }, [category, debouncedSearch]);

  // Client-side sort (no API call)
  const opportunities = useMemo(() => {
    const sorted = [...rawOpportunities];
    if (sortBy === "rate") sorted.sort((a, b) => b.hourlyBudget - a.hourlyBudget);
    else sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return sorted;
  }, [rawOpportunities, sortBy]);

  function timeAgo(date: string) {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Illustrated header */}
      <div className="px-4 lg:px-8 pt-4 pb-2">
        <div className="relative bg-gradient-to-br from-sk-emerald/15 via-sk-emerald/8 to-sk-emerald/[0.02] overflow-hidden rounded-2xl p-3">
          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Briefcase className="h-3.5 w-3.5 text-sk-emerald" />
              <p className="text-[11px] font-medium text-sk-emerald/70 uppercase tracking-wider">Explore</p>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Opportunities</h1>
            <p className="text-sm text-muted-foreground">Find your next gig</p>
          </div>
          {/* Illustration */}
          <svg viewBox="0 0 140 120" fill="none" className="absolute -right-2 -bottom-2 w-32 h-28 opacity-20" aria-hidden="true">
            <circle cx="70" cy="60" r="45" fill="rgb(var(--sk-emerald))" fillOpacity="0.12" />
            <rect x="50" y="38" width="40" height="32" rx="4" fill="none" stroke="rgb(var(--sk-emerald))" strokeWidth="2.5" />
            <path d="M56 38 V32 Q56 28 60 28 H80 Q84 28 84 32 V38" fill="none" stroke="rgb(var(--sk-emerald))" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="58" y1="50" x2="82" y2="50" stroke="rgb(var(--sk-emerald))" strokeWidth="2" strokeLinecap="round" />
            <line x1="58" y1="58" x2="74" y2="58" stroke="rgb(var(--sk-emerald))" strokeWidth="2" strokeLinecap="round" />
            <circle cx="40" cy="42" r="3" fill="rgb(var(--sk-emerald))" fillOpacity="0.2" />
            <circle cx="102" cy="48" r="2.5" fill="rgb(var(--sk-emerald))" fillOpacity="0.15" />
            <circle cx="96" cy="78" r="3.5" fill="rgb(var(--sk-emerald))" fillOpacity="0.1" />
          </svg>
        </div>
      </div>

      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg px-4 lg:px-8 pt-3 pb-2 space-y-2.5">
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search opportunities..."
              className="w-full rounded-xl bg-card shadow-soft pl-9 pr-3 py-2.5 text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sk-emerald transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors relative shrink-0",
              showFilters ? "bg-foreground text-background" : "bg-card shadow-soft text-muted-foreground"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Category pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all shrink-0 capitalize",
                category === cat ? "bg-foreground text-background" : "bg-card shadow-soft text-muted-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + count */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">{total}</span> opportunities
          </span>
          <div className="flex items-center gap-1">
            {(["recent", "rate"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={cn(
                  "px-2 py-1 rounded-md text-[10px] font-medium transition-colors",
                  sortBy === s ? "bg-foreground text-background" : "text-muted-foreground"
                )}
              >
                {s === "rate" ? "Highest Pay" : "Newest"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities */}
      <div className="px-4 lg:px-8 pb-6 space-y-2.5">
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 text-sk-emerald animate-spin" /></div>
        ) : opportunities.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <Briefcase className="h-8 w-8 text-muted-foreground/20 mx-auto" />
            <p className="text-sm text-muted-foreground">No opportunities found</p>
            {category !== "All" && (
              <button onClick={() => setCategory("All")} className="text-xs text-sk-emerald font-medium">Clear filters</button>
            )}
          </div>
        ) : (
          opportunities.map((opp) => (
            <Link
              key={opp.id}
              href={`/jobs/${opp.id}`}
              className="block bg-card rounded-2xl p-4 shadow-soft hover:shadow-card transition-all group"
            >
              <div className="space-y-2.5">
                {/* Badges */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {opp.isRecurring && (
                    <span className="px-2 py-0.5 rounded-full bg-sk-emerald/10 text-sk-emerald text-[10px] font-semibold">Recurring</span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-[10px] text-muted-foreground capitalize">{opp.category}</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-[10px] text-muted-foreground">{opp.workMode}</span>
                </div>

                {/* Title */}
                <h3 className="text-[14px] font-semibold leading-snug group-hover:text-sk-emerald transition-colors">
                  {opp.title}
                </h3>

                {/* Description preview */}
                {opp.description && (
                  <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">{opp.description}</p>
                )}

                {/* Meta */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1.5 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <IndianRupee className="h-3 w-3 text-sk-emerald/60" />
                    <span className="font-medium text-foreground/80">₹{opp.hourlyBudget}/hr</span>
                  </span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{opp.hoursNeeded} hrs</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{opp.city}</span>
                  {opp.scheduledDate && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{opp.scheduledDate}</span>}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-muted-foreground">{opp.applicants} applicants</span>
                  <span className="text-[10px] text-muted-foreground">{timeAgo(opp.createdAt)}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
