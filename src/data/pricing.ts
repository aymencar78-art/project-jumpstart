export type PricingRow = {
  to: string;
  km: number;
  s: number; // sedan
  v: number; // van
  m: number; // minibus
  b: number; // bus
};

export const PRICING_ROWS: PricingRow[] = [
  { to: "Tunis Centre", km: 8, s: 35, v: 55, m: 90, b: 130 },
  { to: "Hammamet", km: 65, s: 87, v: 127, m: 181, b: 240 },
  { to: "Nabeul", km: 72, s: 93, v: 134, m: 191, b: 252 },
  { to: "Bizerte", km: 66, s: 88, v: 128, m: 182, b: 241 },
  { to: "El Kantaoui", km: 143, s: 149, v: 212, m: 290, b: 370 },
  { to: "Sousse", km: 138, s: 145, v: 207, m: 283, b: 362 },
  { to: "Monastir", km: 160, s: 163, v: 231, m: 314, b: 399 },
  { to: "Sfax", km: 270, s: 251, v: 352, m: 468, b: 588 },
  { to: "Djerba", km: 490, s: 427, v: 594, m: 776, b: 960 },
  { to: "Tozeur", km: 450, s: 395, v: 550, m: 720, b: 895 },
];
