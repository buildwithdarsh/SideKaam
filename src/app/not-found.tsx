import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <nav className="px-5 py-3.5">
        <Link href="/">
          <Logo size="sm" />
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center px-5">
        <div className="text-center space-y-4 max-w-sm">
          <svg
            viewBox="0 0 200 160"
            fill="none"
            className="w-48 h-auto mx-auto"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="80"
              r="60"
              fill="rgb(var(--sk-emerald))"
              fillOpacity="0.04"
              stroke="rgb(var(--sk-emerald))"
              strokeOpacity="0.12"
              strokeWidth="1.5"
            />
            <rect
              x="72"
              y="55"
              width="56"
              height="50"
              rx="8"
              fill="rgb(var(--sk-emerald))"
              fillOpacity="0.06"
              stroke="rgb(var(--sk-emerald))"
              strokeOpacity="0.15"
              strokeWidth="1.5"
            />
            <path
              d="M85 72h30M85 82h20"
              stroke="rgb(var(--sk-emerald))"
              strokeOpacity="0.2"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="100"
              cy="95"
              r="3"
              fill="rgb(var(--sk-emerald))"
              fillOpacity="0.3"
            />
          </svg>
          <h1 className="text-2xl font-bold tracking-tight">
            Page not found
          </h1>
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-foreground text-background px-6 py-3 text-[14px] font-semibold active:scale-[0.98] transition-all"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
