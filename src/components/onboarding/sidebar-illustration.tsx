"use client";

import { cn } from "@/lib/utils";

interface Props {
  phase: string;
  step: number;
}

const phaseConfig: Record<string, { title: string; subtitle: string; gradient: string }> = {
  A: { title: "Are you in?", subtitle: "SideKaam is for working professionals who want to explore something on the side", gradient: "from-emerald-500/20 to-teal-500/10" },
  B: { title: "What's your Side Kaam?", subtitle: "Not just tech — literally anything. Panipuri to programming.", gradient: "from-amber-500/20 to-orange-500/10" },
  C: { title: "About your 9-to-5", subtitle: "We'll compare your day job rate with your Side Kaam potential", gradient: "from-teal-500/20 to-cyan-500/10" },
  D: { title: "Your Side Kaam DNA", subtitle: "Understanding your personality helps us match you perfectly", gradient: "from-indigo-500/20 to-violet-500/10" },
  E: { title: "Your matches are ready", subtitle: "AI found Side Kaams that fit your skills, schedule, and passion", gradient: "from-emerald-500/20 to-green-500/10" },
  F: { title: "One last step", subtitle: "Create your profile and unlock your personalized Side Kaam dashboard", gradient: "from-indigo-500/20 to-blue-500/10" },
};

function ProfileIllustration() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px]" aria-hidden="true">
      {/* Person silhouette */}
      <circle cx="140" cy="72" r="32" fill="rgb(16 185 129)" fillOpacity="0.15" stroke="rgb(16 185 129)" strokeOpacity="0.3" strokeWidth="1.5"/>
      <circle cx="140" cy="62" r="14" fill="rgb(16 185 129)" fillOpacity="0.25"/>
      <path d="M118 88c0-12.15 9.85-22 22-22s22 9.85 22 22" stroke="rgb(16 185 129)" strokeOpacity="0.3" strokeWidth="1.5" fill="rgb(16 185 129)" fillOpacity="0.1"/>
      {/* Floating cards */}
      <rect x="32" y="120" width="90" height="60" rx="12" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.1"/>
      <rect x="44" y="134" width="40" height="4" rx="2" fill="white" fillOpacity="0.15"/>
      <rect x="44" y="144" width="60" height="3" rx="1.5" fill="white" fillOpacity="0.08"/>
      <rect x="44" y="153" width="50" height="3" rx="1.5" fill="white" fillOpacity="0.08"/>
      <rect x="158" y="110" width="90" height="60" rx="12" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.1"/>
      <rect x="170" y="124" width="40" height="4" rx="2" fill="rgb(16 185 129)" fillOpacity="0.4"/>
      <rect x="170" y="134" width="60" height="3" rx="1.5" fill="white" fillOpacity="0.08"/>
      <rect x="170" y="143" width="50" height="3" rx="1.5" fill="white" fillOpacity="0.08"/>
      {/* Decorative dots */}
      <circle cx="60" cy="40" r="3" fill="rgb(245 158 11)" fillOpacity="0.4"/>
      <circle cx="220" cy="55" r="4" fill="rgb(99 102 241)" fillOpacity="0.3"/>
      <circle cx="45" cy="100" r="2" fill="rgb(16 185 129)" fillOpacity="0.5"/>
      {/* Connection lines */}
      <path d="M100 85 L77 120" stroke="white" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4"/>
      <path d="M180 85 L198 110" stroke="white" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4"/>
    </svg>
  );
}

function GoalsIllustration() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px]" aria-hidden="true">
      {/* Target */}
      <circle cx="140" cy="100" r="60" fill="rgb(99 102 241)" fillOpacity="0.04" stroke="rgb(99 102 241)" strokeOpacity="0.15" strokeWidth="1.5"/>
      <circle cx="140" cy="100" r="40" fill="rgb(99 102 241)" fillOpacity="0.06" stroke="rgb(99 102 241)" strokeOpacity="0.12" strokeWidth="1"/>
      <circle cx="140" cy="100" r="20" fill="rgb(99 102 241)" fillOpacity="0.1" stroke="rgb(99 102 241)" strokeOpacity="0.2" strokeWidth="1"/>
      <circle cx="140" cy="100" r="6" fill="rgb(99 102 241)" fillOpacity="0.5"/>
      {/* Arrow */}
      <path d="M200 40 L148 92" stroke="rgb(245 158 11)" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M200 40 L190 42 L198 50Z" fill="rgb(245 158 11)" fillOpacity="0.6"/>
      {/* Rising chart */}
      <rect x="40" y="150" width="200" height="50" rx="10" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08"/>
      <path d="M60 185 L100 175 L140 170 L180 158 L220 150" stroke="rgb(16 185 129)" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="220" cy="150" r="3" fill="rgb(16 185 129)" fillOpacity="0.6"/>
      {/* Dots */}
      <circle cx="50" cy="50" r="3" fill="rgb(16 185 129)" fillOpacity="0.3"/>
      <circle cx="240" cy="80" r="2" fill="rgb(245 158 11)" fillOpacity="0.4"/>
    </svg>
  );
}

function LocationIllustration() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px]" aria-hidden="true">
      {/* Map outline */}
      <path d="M60 60 Q140 30 220 60 Q250 120 220 170 Q140 200 60 170 Q30 120 60 60Z" fill="rgb(20 184 166)" fillOpacity="0.05" stroke="rgb(20 184 166)" strokeOpacity="0.15" strokeWidth="1.5"/>
      {/* Pin */}
      <path d="M140 70 C140 70 112 95 112 115 C112 130.46 124.54 143 140 143 C155.46 143 168 130.46 168 115 C168 95 140 70 140 70Z" fill="rgb(16 185 129)" fillOpacity="0.12" stroke="rgb(16 185 129)" strokeOpacity="0.3" strokeWidth="1.5"/>
      <circle cx="140" cy="112" r="10" fill="rgb(16 185 129)" fillOpacity="0.3"/>
      <circle cx="140" cy="112" r="4" fill="rgb(16 185 129)" fillOpacity="0.6"/>
      {/* Radar rings */}
      <circle cx="140" cy="112" r="30" fill="none" stroke="rgb(16 185 129)" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4"/>
      <circle cx="140" cy="112" r="50" fill="none" stroke="rgb(16 185 129)" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4"/>
      {/* City dots */}
      <circle cx="90" cy="90" r="3" fill="rgb(245 158 11)" fillOpacity="0.5"/>
      <circle cx="195" cy="100" r="3" fill="rgb(99 102 241)" fillOpacity="0.4"/>
      <circle cx="120" cy="150" r="2.5" fill="rgb(244 63 94)" fillOpacity="0.4"/>
      <circle cx="175" cy="140" r="2" fill="rgb(20 184 166)" fillOpacity="0.5"/>
      {/* Labels */}
      <rect x="65" y="78" width="35" height="8" rx="4" fill="white" fillOpacity="0.08"/>
      <rect x="180" y="88" width="30" height="8" rx="4" fill="white" fillOpacity="0.08"/>
    </svg>
  );
}

function SkillsIllustration() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px]" aria-hidden="true">
      {/* Hexagonal skill grid */}
      {[
        { cx: 100, cy: 60, fill: "rgb(245 158 11)" },
        { cx: 160, cy: 60, fill: "rgb(99 102 241)" },
        { cx: 70, cy: 110, fill: "rgb(16 185 129)" },
        { cx: 130, cy: 110, fill: "rgb(244 63 94)" },
        { cx: 190, cy: 110, fill: "rgb(20 184 166)" },
        { cx: 100, cy: 160, fill: "rgb(99 102 241)" },
        { cx: 160, cy: 160, fill: "rgb(245 158 11)" },
      ].map((hex, i) => (
        <g key={i}>
          <circle cx={hex.cx} cy={hex.cy} r="24" fill={hex.fill} fillOpacity="0.06" stroke={hex.fill} strokeOpacity="0.15" strokeWidth="1"/>
          <rect x={hex.cx - 10} y={hex.cy - 2} width="20" height="4" rx="2" fill={hex.fill} fillOpacity="0.25"/>
        </g>
      ))}
      {/* Connection lines */}
      <line x1="100" y1="60" x2="160" y2="60" stroke="white" strokeOpacity="0.06" strokeWidth="1"/>
      <line x1="100" y1="60" x2="130" y2="110" stroke="white" strokeOpacity="0.06" strokeWidth="1"/>
      <line x1="160" y1="60" x2="130" y2="110" stroke="white" strokeOpacity="0.06" strokeWidth="1"/>
      <line x1="130" y1="110" x2="100" y2="160" stroke="white" strokeOpacity="0.06" strokeWidth="1"/>
      <line x1="130" y1="110" x2="160" y2="160" stroke="white" strokeOpacity="0.06" strokeWidth="1"/>
      {/* Sparkle */}
      <circle cx="230" cy="40" r="3" fill="rgb(16 185 129)" fillOpacity="0.4"/>
      <circle cx="40" cy="80" r="2" fill="rgb(245 158 11)" fillOpacity="0.3"/>
    </svg>
  );
}

function StyleIllustration() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px]" aria-hidden="true">
      {/* Sliders */}
      {[55, 95, 135].map((y, i) => {
        const positions = [170, 120, 190];
        const colors = ["rgb(244 63 94)", "rgb(99 102 241)", "rgb(16 185 129)"];
        return (
          <g key={i}>
            <rect x="60" y={y} width="160" height="6" rx="3" fill="white" fillOpacity="0.06"/>
            <rect x="60" y={y} width={positions[i] - 60} height="6" rx="3" fill={colors[i]} fillOpacity="0.2"/>
            <circle cx={positions[i]} cy={y + 3} r="10" fill={colors[i]} fillOpacity="0.15" stroke={colors[i]} strokeOpacity="0.3" strokeWidth="1.5"/>
            <circle cx={positions[i]} cy={y + 3} r="4" fill={colors[i]} fillOpacity="0.5"/>
          </g>
        );
      })}
      {/* Personality badge */}
      <rect x="80" y="165" width="120" height="36" rx="18" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1"/>
      <rect x="95" y="178" width="30" height="10" rx="5" fill="rgb(16 185 129)" fillOpacity="0.2"/>
      <rect x="132" y="178" width="22" height="10" rx="5" fill="rgb(99 102 241)" fillOpacity="0.2"/>
      <rect x="161" y="178" width="26" height="10" rx="5" fill="rgb(245 158 11)" fillOpacity="0.2"/>
    </svg>
  );
}

function MatchIllustration() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px]" aria-hidden="true">
      {/* Central spark */}
      <circle cx="140" cy="100" r="50" fill="rgb(16 185 129)" fillOpacity="0.06"/>
      <circle cx="140" cy="100" r="30" fill="rgb(16 185 129)" fillOpacity="0.1"/>
      {/* Sparkle lines */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 140 + Math.cos(rad) * 35;
        const y1 = 100 + Math.sin(rad) * 35;
        const x2 = 140 + Math.cos(rad) * 55;
        const y2 = 100 + Math.sin(rad) * 55;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgb(16 185 129)" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round"/>;
      })}
      {/* Number */}
      <text x="140" y="95" textAnchor="middle" fill="rgb(16 185 129)" fillOpacity="0.6" fontSize="28" fontWeight="700" fontFamily="system-ui">1K+</text>
      <text x="140" y="115" textAnchor="middle" fill="white" fillOpacity="0.3" fontSize="10" fontFamily="system-ui">matches</text>
      {/* Orbiting dots */}
      <circle cx="80" cy="50" r="12" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08"/>
      <circle cx="210" cy="60" r="10" fill="rgb(245 158 11)" fillOpacity="0.06" stroke="rgb(245 158 11)" strokeOpacity="0.15"/>
      <circle cx="70" cy="160" r="8" fill="rgb(99 102 241)" fillOpacity="0.06" stroke="rgb(99 102 241)" strokeOpacity="0.15"/>
      <circle cx="220" cy="150" r="14" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08"/>
    </svg>
  );
}

function PlanIllustration() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px]" aria-hidden="true">
      {/* Key / lock */}
      <circle cx="140" cy="85" r="30" fill="rgb(99 102 241)" fillOpacity="0.08" stroke="rgb(99 102 241)" strokeOpacity="0.2" strokeWidth="1.5"/>
      <circle cx="140" cy="85" r="12" fill="none" stroke="rgb(99 102 241)" strokeOpacity="0.3" strokeWidth="2"/>
      <rect x="137" y="97" width="6" height="25" rx="3" fill="rgb(99 102 241)" fillOpacity="0.2"/>
      <rect x="143" y="110" width="12" height="4" rx="2" fill="rgb(99 102 241)" fillOpacity="0.2"/>
      <rect x="143" y="118" width="8" height="4" rx="2" fill="rgb(99 102 241)" fillOpacity="0.15"/>
      {/* Cards */}
      <rect x="40" y="145" width="60" height="50" rx="10" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1"/>
      <rect x="110" y="140" width="60" height="55" rx="10" fill="rgb(16 185 129)" fillOpacity="0.08" stroke="rgb(16 185 129)" strokeOpacity="0.2"/>
      <rect x="180" y="145" width="60" height="50" rx="10" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1"/>
      {/* Card labels */}
      <rect x="52" y="160" width="36" height="4" rx="2" fill="white" fillOpacity="0.1"/>
      <rect x="122" y="155" width="36" height="4" rx="2" fill="rgb(16 185 129)" fillOpacity="0.3"/>
      <rect x="192" y="160" width="36" height="4" rx="2" fill="white" fillOpacity="0.1"/>
      {/* Star on popular */}
      <circle cx="140" cy="132" r="6" fill="rgb(245 158 11)" fillOpacity="0.3"/>
    </svg>
  );
}

const illustrations: Record<string, () => React.ReactNode> = {
  A: ProfileIllustration,
  B: SkillsIllustration,
  C: LocationIllustration,
  D: StyleIllustration,
  E: MatchIllustration,
  F: PlanIllustration,
};

export function SidebarIllustration({ phase, step }: Props) {
  const config = phaseConfig[phase] || phaseConfig.A;
  const Illustration = illustrations[phase] || illustrations.A;

  return (
    <div className="flex flex-col items-center text-center gap-8">
      {/* Illustration */}
      <div className={cn("relative w-full flex items-center justify-center py-4")}>
        <div className={cn("absolute inset-0 rounded-3xl bg-gradient-to-br opacity-30", config.gradient)} />
        <Illustration />
      </div>

      {/* Phase title */}
      <div className="space-y-2 max-w-xs">
        <h2 className="text-xl xl:text-2xl font-bold text-background leading-snug">
          {config.title}
        </h2>
        <p className="text-sm text-background/50 leading-relaxed">
          {config.subtitle}
        </p>
      </div>
    </div>
  );
}
