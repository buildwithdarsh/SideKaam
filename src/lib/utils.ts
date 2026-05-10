import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** a]@gmail.com → a***@g***l.com */
export function maskEmail(email?: string | null): string {
  if (!email) return "";
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***@***.com";
  const maskedLocal = local[0] + "***";
  const parts = domain.split(".");
  const maskedDomain = parts[0]![0] + "***" + (parts.length > 1 ? "." + parts[parts.length - 1] : "");
  return `${maskedLocal}@${maskedDomain}`;
}

/** +919876543210 → +91*****3210 */
export function maskPhone(phone?: string | null): string {
  if (!phone || phone.length < 6) return "****";
  return phone.slice(0, 3) + "*".repeat(phone.length - 7) + phone.slice(-4);
}
