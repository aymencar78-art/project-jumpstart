export const PAGES = ["home", "booking", "excursions", "pricing", "contact"] as const;
export type PageKey = (typeof PAGES)[number];
