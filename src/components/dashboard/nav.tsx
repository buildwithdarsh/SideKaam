"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Search, Send, User, Settings, BarChart3, Inbox } from "lucide-react";

const navItems = [
  { href: "/feed", Icon: Home, label: "Feed" },
  { href: "/jobs", Icon: Search, label: "Opportunities" },
  { href: "/pitches", Icon: Inbox, label: "Bookings" },
  { href: "/matches", Icon: BarChart3, label: "Matches" },
  { href: "/profile", Icon: User, label: "Profile" },
  { href: "/settings", Icon: Settings, label: "Settings" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ href, Icon, label }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors",
              active
                ? "bg-sk-emerald/10 text-sk-emerald"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
