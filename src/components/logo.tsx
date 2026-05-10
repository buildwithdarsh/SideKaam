import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: "w-6 h-6", text: "text-sm", gap: "gap-1.5", radius: "rounded-md" },
  md: { icon: "w-8 h-8", text: "text-lg", gap: "gap-2", radius: "rounded-lg" },
  lg: { icon: "w-10 h-10", text: "text-xl", gap: "gap-2.5", radius: "rounded-xl" },
  xl: { icon: "w-14 h-14", text: "text-2xl", gap: "gap-3", radius: "rounded-2xl" },
};

export function LogoMark({ size = "md", className }: { size?: LogoProps["size"]; className?: string }) {
  const s = sizes[size!];
  return (
    <div className={cn(s.icon, s.radius, "relative overflow-hidden shrink-0", className)}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-label="SideKaam logo" role="img">
        {/* Background */}
        <rect width="48" height="48" rx="12" fill="#10B981" />

        {/* Two paths crossing — represents provider <-> customer exchange */}
        {/* Left path going right-down */}
        <path
          d="M12 16L24 24L12 32"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        {/* Right path going left-down */}
        <path
          d="M36 16L24 24L36 32"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />

        {/* Center dot — the connection point */}
        <circle cx="24" cy="24" r="3" fill="white" />

        {/* Spark accent */}
        <circle cx="37" cy="12" r="2.5" fill="#FCD34D" />
      </svg>
    </div>
  );
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const s = sizes[size!];
  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <LogoMark size={size} />
      {showText && (
        <span className={cn(s.text, "font-bold tracking-tight")}>
          Side<span className="text-sk-emerald">Kaam</span>
        </span>
      )}
    </div>
  );
}
