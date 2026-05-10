import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Briefcase, Users, BarChart3 } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: "/admin/dashboard", Icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/jobs", Icon: Briefcase, label: "Jobs" },
    { href: "/admin/users", Icon: Users, label: "Users" },
    { href: "/admin/analytics", Icon: BarChart3, label: "Analytics" },
  ];

  return (
    <div className="min-h-dvh flex bg-background">
      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 flex flex-col border-r border-border bg-card h-dvh sticky top-0 p-4">
        <div className="flex items-center gap-2 px-3 py-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-sk-rose flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">A</span>
          </div>
          <span className="text-[14px] font-semibold tracking-tight">Admin Panel</span>
        </div>
        <Link href="/feed" className="flex items-center gap-2 px-3 py-2 mb-4 text-[11px] text-muted-foreground hover:text-foreground transition-colors" aria-label="Back to main application">
          <ArrowLeft className="h-3 w-3" /> Back to App
        </Link>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ href, Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
