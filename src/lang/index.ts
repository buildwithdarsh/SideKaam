import { en, type LangKeys } from "./en";
import { hi } from "./hi";
import { hinglish } from "./hinglish";

export type Locale = "en" | "hi" | "hinglish";

const locales: Record<Locale, Record<LangKeys, string>> = { en, hi, hinglish };

export const localeLabels: Record<Locale, string> = {
  en: "English",
  hi: "हिंदी",
  hinglish: "Hinglish",
};

export function t(key: LangKeys, locale: Locale = "en", params?: Record<string, string | number>): string {
  let text = locales[locale]?.[key] || locales.en[key] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  return text;
}

export type { LangKeys };
