import type { Lang } from "@/i18n/types";
import type { PageKey } from "@/lib/pages";

export const SUPPORTED_LANGS: Lang[] = ["FR", "EN", "IT", "DE", "ES", "AR"];

export const isSupportedLang = (s: string): s is Lang =>
  (SUPPORTED_LANGS as string[]).includes(s.toUpperCase());

/** Detect best Lang from navigator.languages, fallback to FR */
export const detectBrowserLang = (): Lang => {
  if (typeof navigator === "undefined") return "FR";
  const candidates = (navigator.languages?.length ? navigator.languages : [navigator.language]) || [];
  for (const raw of candidates) {
    const code = (raw || "").slice(0, 2).toUpperCase();
    if (code === "AR") return "AR";
    if (SUPPORTED_LANGS.includes(code as Lang)) return code as Lang;
  }
  return "FR";
};

/** URL slugs per page (English-canonical for SEO simplicity) */
export const PAGE_TO_SLUG: Record<PageKey, string> = {
  home: "",
  booking: "booking",
  excursions: "excursions",
  pricing: "pricing",
  contact: "contact",
};

export const SLUG_TO_PAGE: Record<string, PageKey> = {
  "": "home",
  booking: "booking",
  excursions: "excursions",
  pricing: "pricing",
  contact: "contact",
};

export const buildPath = (lang: Lang, page: PageKey): string => {
  const langSeg = lang.toLowerCase();
  const slug = PAGE_TO_SLUG[page];
  return slug ? `/${langSeg}/${slug}` : `/${langSeg}`;
};
