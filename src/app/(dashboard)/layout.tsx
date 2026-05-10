import type { Metadata } from "next";
import Link from "next/link";
import { Home, Search, Send, User, Settings } from "lucide-react";
import { DashboardNav } from "@/components/dashboard/nav";
import { Logo } from "@/components/logo";
import { AuthProvider, RequireAuth } from "@/lib/auth";
import { PlanBadge } from "@/components/dashboard/plan-badge";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
    <RequireAuth>
    <div className="min-h-dvh flex flex-col lg:flex-row bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-[240px] xl:w-[260px] shrink-0 flex-col border-r border-border bg-card h-dvh sticky top-0 p-4">
        {/* Logo */}
        <Link href="/feed" className="px-3 py-2 mb-6">
          <Logo size="sm" />
        </Link>
        <DashboardNav />
        <PlanBadge />
      </aside>

      {/* Main content */}
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {[
            { href: "/feed", Icon: Home, label: "Feed" },
            { href: "/jobs", Icon: Search, label: "Jobs" },
            { href: "/pitches", Icon: Send, label: "Pitches" },
            { href: "/profile", Icon: User, label: "Profile" },
            { href: "/settings", Icon: Settings, label: "More" },
          ].map(({ href, Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
    </RequireAuth>
    </AuthProvider>
  );
}
