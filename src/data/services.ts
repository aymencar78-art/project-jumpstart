import type { LocalizedString } from "@/i18n/types";
import svcAirport from "@/assets/svc-airport.jpg";
import svcHotel from "@/assets/svc-hotel.jpg";
import svcExcursion from "@/assets/svc-excursion.jpg";
import svcBusiness from "@/assets/svc-business.jpg";
import svcEvents from "@/assets/svc-events.jpg";
import svcPort from "@/assets/svc-port.jpg";

export type Service = {
  icon: string; // legacy fallback
  image: string;
  name: LocalizedString;
  sub: LocalizedString;
};

export const SERVICES: Service[] = [
  {
    icon: "✈",
    image: svcAirport,
    name: { FR: "Transferts Aéroport", EN: "Airport Transfers", DE: "Flughafentransfers", ES: "Traslados Aeropuerto", AR: "نقل المطار" },
    sub: { FR: "Arrivée & départ, 24h/7j", EN: "Arrivals & departures, 24/7", DE: "Ankünfte & Abflüge, 24/7", ES: "Llegadas y salidas, 24h/7días", AR: "وصول ومغادرة، على مدار الساعة" },
  },
  {
    icon: "🏨",
    image: svcHotel,
    name: { FR: "Hôtel → Hôtel", EN: "Hotel to Hotel", DE: "Hotel zu Hotel", ES: "Hotel a Hotel", AR: "فندق إلى فندق" },
    sub: { FR: "Liaison inter-hôtel VIP", EN: "VIP inter-hotel transfer", DE: "VIP Hotel-Transfer", ES: "Traslado VIP inter-hotel", AR: "نقل VIP بين الفنادق" },
  },
  {
    icon: "🌅",
    image: svcExcursion,
    name: { FR: "Excursions Privées", EN: "Private Excursions", DE: "Private Ausflüge", ES: "Excursiones Privadas", AR: "رحلات خاصة" },
    sub: { FR: "Sahara · Carthage · Djerba", EN: "Sahara · Carthage · Djerba", DE: "Sahara · Karthago · Djerba", ES: "Sahara · Cartago · Djerba", AR: "صحراء · قرطاج · جربة" },
  },
  {
    icon: "💼",
    image: svcBusiness,
    name: { FR: "Transferts Affaires", EN: "Business Transfers", DE: "Geschäftsreisen", ES: "Traslados de Negocios", AR: "نقل الأعمال" },
    sub: { FR: "Ponctualité & discrétion", EN: "Punctuality & discretion", DE: "Pünktlichkeit & Diskretion", ES: "Puntualidad y discreción", AR: "الدقة في المواعيد والتميز" },
  },
  {
    icon: "🎊",
    image: svcEvents,
    name: { FR: "Événements VIP", EN: "VIP Events", DE: "VIP-Veranstaltungen", ES: "Eventos VIP", AR: "فعاليات VIP" },
    sub: { FR: "Mariages · Galas · Conférences", EN: "Weddings · Galas · Conferences", DE: "Hochzeiten · Galas · Konferenzen", ES: "Bodas · Galas · Conferencias", AR: "أعراس · حفلات · مؤتمرات" },
  },
  {
    icon: "🛳",
    image: svcPort,
    name: { FR: "Port → Hôtel", EN: "Port to Hotel", DE: "Hafen zum Hotel", ES: "Puerto a Hotel", AR: "الميناء إلى الفندق" },
    sub: { FR: "Accueil croisières Tunis", EN: "Cruise ship welcome Tunis", DE: "Kreuzfahrt-Transfer Tunis", ES: "Bienvenida cruceros Túnez", AR: "استقبال رحلات البحر تونس" },
  },
];
