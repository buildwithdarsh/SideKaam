export interface OnboardingData {
  // Screen 1: Path
  user_type: "seeker" | "finder" | "";

  // Seeker path
  sidekaam_categories: string[];
  sidekaam_subcategories: string[];
  hourly_rate_band: string;
  sidekaam_hours_band: string;
  schedule_slots: string[];
  city: string;
  sidekaam_work_mode: string;
  about_pitch: string;

  // Finder path
  need_categories: string[];
  need_description: string;
  budget_band: string;
  need_when: string;
  need_where: string;

  // Shared
  email: string;
  auth_provider: string;
  selected_plan: string;
}

export type ScreenType =
  | "path-selector"
  | "question-single"
  | "question-multi"
  | "question-chips"
  | "question-search"
  | "question-input"
  | "transition"
  | "motivation"
  | "loading"
  | "reveal"
  | "projection"
  | "email-capture"
  | "account-creation"
  | "paywall";

export interface ScreenOption {
  id: string;
  icon: string;
  label: string;
  sublabel?: string;
}

export interface ScreenConfig {
  id: string; // "s1", "s2" for seeker; "f1", "f2" for finder; "1" for shared
  type: ScreenType;
  path?: "seeker" | "finder" | "shared";
  dataKey?: keyof OnboardingData;
  title?: string;
  subtitle?: string;
  options?: ScreenOption[];
  mascotMessage?: string;
  dynamicCopy?: Record<string, string>;
  conditionalOn?: { key: keyof OnboardingData; value: string };
  gateRedirect?: { value: string; message: string };
  statement?: string;
  reactions?: Record<string, string>;
  motivationProps?: { icon: string; color: string; bg: string; headline: string; message: string };
}
