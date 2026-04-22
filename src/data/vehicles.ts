import type { LocalizedString, LocalizedArray } from "@/i18n/types";

export type Vehicle = {
  id: string;
  emoji: string;
  cat: string;
  base: number;
  pkm: number;
  pax: string;
  bags: number;
  color: string;
  badge: LocalizedString;
  name: LocalizedString;
  features: LocalizedArray;
};

export const VEHICLES: Vehicle[] = [
  {
    id: "sedan", emoji: "🚗", cat: "SEDAN", base: 35, pkm: 0.8, pax: "1-3", bags: 3, color: "#0e1221",
    badge: { FR: "LE PLUS POPULAIRE", EN: "MOST POPULAR", DE: "BELIEBTESTE", ES: "MÁS POPULAR", AR: "الأكثر شعبية" },
    name: { FR: "Berline Prestige", EN: "Prestige Sedan", DE: "Prestige-Limousine", ES: "Berlina Prestigio", AR: "سيارة بريستيج" },
    features: {
      FR: ["Mercedes E-Class / BMW 5", "Cuir pleine fleur", "Climatisation", "WiFi", "Eau minérale"],
      EN: ["Mercedes E-Class / BMW 5", "Full-grain leather", "Air conditioning", "WiFi", "Mineral water"],
      DE: ["Mercedes E-Class / BMW 5", "Vollleder", "Klimaanlage", "WiFi", "Mineralwasser"],
      ES: ["Mercedes E-Class / BMW 5", "Cuero de primera calidad", "Climatización", "WiFi", "Agua mineral"],
      AR: ["مرسيدس E-Class / BMW 5", "جلد طبيعي", "تكييف هواء", "واي فاي", "مياه معدنية"],
    },
  },
  {
    id: "van", emoji: "🚐", cat: "VAN", base: 55, pkm: 1.1, pax: "4-7", bags: 7, color: "#0e1e0e",
    badge: { FR: "IDÉAL FAMILLE", EN: "FAMILY IDEAL", DE: "IDEAL FAMILIEN", ES: "IDEAL FAMILIA", AR: "مثالي للعائلات" },
    name: { FR: "Van Business", EN: "Business Van", DE: "Business-Van", ES: "Van Business", AR: "فان بزنس" },
    features: {
      FR: ["Mercedes V-Class", "8 places VIP", "Espace bagages", "Sièges inclinables", "USB"],
      EN: ["Mercedes V-Class", "8 VIP seats", "Ample luggage", "Reclining seats", "USB ports"],
      DE: ["Mercedes V-Class", "8 VIP-Sitze", "Großes Gepäckabteil", "Verstellbare Sitze", "USB-Anschlüsse"],
      ES: ["Mercedes V-Class", "8 asientos VIP", "Amplio maletero", "Asientos reclinables", "Puertos USB"],
      AR: ["مرسيدس V-Class", "8 مقاعد VIP", "مساحة أمتعة واسعة", "مقاعد قابلة للإمالة", "منافذ USB"],
    },
  },
  {
    id: "minibus", emoji: "🚌", cat: "MINIBUS", base: 90, pkm: 1.4, pax: "8-15", bags: 15, color: "#1e0e0e",
    badge: { FR: "GROUPES & ÉVÉNEMENTS", EN: "GROUPS & EVENTS", DE: "GRUPPEN & EVENTS", ES: "GRUPOS & EVENTOS", AR: "مجموعات وفعاليات" },
    name: { FR: "Minibus Grand Luxe", EN: "Luxury Minibus", DE: "Luxus-Minibus", ES: "Minibús de Lujo", AR: "ميني باص فاخر" },
    features: {
      FR: ["Sprinter / Hiace", "16 passagers max", "Sonorisation", "Vitres teintées", "Assistant"],
      EN: ["Sprinter / Hiace", "16 passengers max", "Sound system", "Tinted windows", "Assistant"],
      DE: ["Sprinter / Hiace", "Max. 16 Passagiere", "Soundsystem", "Getönte Scheiben", "Assistent"],
      ES: ["Sprinter / Hiace", "Máx. 16 pasajeros", "Sistema de sonido", "Cristales tintados", "Asistente"],
      AR: ["سبرينتر / هيأس", "16 راكباً كحد أقصى", "نظام صوتي", "زجاج معتم", "مساعد"],
    },
  },
];
