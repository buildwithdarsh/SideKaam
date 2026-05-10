export default function AnalyticsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
      <p className="text-sm text-muted-foreground">Coming soon — detailed onboarding funnels, match rates, and revenue analytics.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Onboarding Completion", value: "47%", sub: "of users complete all 30 screens" },
          { label: "Screen 28 Drop-off", value: "8%", sub: "users who leave at paywall" },
          { label: "Avg. Match Score", value: "78%", sub: "across all active matches" },
          { label: "D7 Retention", value: "38%", sub: "users active after 7 days" },
        ].map(({ label, value, sub }, i) => (
          <div key={i} className="bg-card rounded-2xl p-5 shadow-soft space-y-2">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="text-3xl font-bold tabular-nums">{value}</p>
            <p className="text-[12px] text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
