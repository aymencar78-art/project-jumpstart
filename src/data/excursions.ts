import type { LocalizedString } from "@/i18n/types";

export const EXC_CATS = {
  desert: "cat_desert",
  culture: "cat_culture",
  island: "cat_island",
  nature: "cat_nature",
} as const;

export type Excursion = {
  slug: string;
  catKey: keyof typeof EXC_CATS;
  dur: LocalizedString;
  price: number;
  emoji: string;
  title: LocalizedString;
  desc: LocalizedString;
};

export const EXCURSIONS: Excursion[] = [
  {
    slug: "sahara", catKey: "desert",
    dur: { FR: "2 jours", EN: "2 days", DE: "2 Tage", ES: "2 días", AR: "يومان" },
    price: 290, emoji: "🐪",
    title: { FR: "Sahara - Douz & Dunes", EN: "Sahara - Douz & Dunes", DE: "Sahara - Douz & Dünen", ES: "Sahara - Douz y Dunas", AR: "الصحراء - دوز والكثبان" },
    desc: { FR: "Nuit en camp berbère, dunes infinies, coucher de soleil d'or.", EN: "Berber camp night, infinite dunes, golden sunset.", DE: "Nacht im Berberlager, endlose Dünen, goldener Sonnenuntergang.", ES: "Noche en campamento bereber, dunas infinitas, puesta de sol dorada.", AR: "ليلة في المخيم البربري، كثبان لا نهاية لها، غروب ذهبي." },
  },
  {
    slug: "carthage", catKey: "culture",
    dur: { FR: "1 jour", EN: "1 day", DE: "1 Tag", ES: "1 día", AR: "يوم واحد" },
    price: 95, emoji: "🏛",
    title: { FR: "Carthage & Sidi Bou Saïd", EN: "Carthage & Sidi Bou Saïd", DE: "Karthago & Sidi Bou Saïd", ES: "Cartago & Sidi Bou Saïd", AR: "قرطاج وسيدي بوسعيد" },
    desc: { FR: "Site antique, musée du Bardo, village bleu et blanc.", EN: "Ancient site, Bardo Museum, blue and white village.", DE: "Antike Stätte, Bardo-Museum, blau-weißes Dorf.", ES: "Sitio antiguo, museo del Bardo, pueblo azul y blanco.", AR: "الموقع الأثري، متحف باردو، القرية الزرقاء والبيضاء." },
  },
  {
    slug: "djerba", catKey: "island",
    dur: { FR: "1 jour", EN: "1 day", DE: "1 Tag", ES: "1 día", AR: "يوم واحد" },
    price: 180, emoji: "🏝",
    title: { FR: "Djerba - L'île des Rêves", EN: "Djerba - Dream Island", DE: "Djerba - Trauminsel", ES: "Djerba - Isla de los Sueños", AR: "جربة - جزيرة الأحلام" },
    desc: { FR: "La Ghriba, Houmt Souk, plages infinies de la Méditerranée.", EN: "La Ghriba, Houmt Souk, endless Mediterranean beaches.", DE: "La Ghriba, Houmt Souk, endlose Mittelmeerstrände.", ES: "La Ghriba, Houmt Souk, playas mediterráneas infinitas.", AR: "الغريبة، حومة السوق، شواطئ البحر الأبيض المتوسط اللانهائية." },
  },
  {
    slug: "tozeur", catKey: "desert",
    dur: { FR: "2 jours", EN: "2 days", DE: "2 Tage", ES: "2 días", AR: "يومان" },
    price: 260, emoji: "🌅",
    title: { FR: "Tozeur & Chott el-Jerid", EN: "Tozeur & Chott el-Jerid", DE: "Tozeur & Chott el-Jerid", ES: "Tozeur & Chott el-Jerid", AR: "توزر وشط الجريد" },
    desc: { FR: "Oasis de palmiers, lac salé miroir, villages berbères.", EN: "Palm oasis, mirror salt lake, Berber villages.", DE: "Palmenoase, Salzsee-Spiegel, Berberdörfer.", ES: "Oasis de palmas, lago salado espejo, pueblos bereberes.", AR: "واحة النخيل، بحيرة الملح المرآة، القرى البربرية." },
  },
  {
    slug: "capbon", catKey: "nature",
    dur: { FR: "1 jour", EN: "1 day", DE: "1 Tag", ES: "1 día", AR: "يوم واحد" },
    price: 110, emoji: "🌿",
    title: { FR: "Cap Bon & Kerkouane", EN: "Cap Bon & Kerkouane", DE: "Cap Bon & Kerkouane", ES: "Cap Bon & Kerkouane", AR: "رأس الطيب وكركوان" },
    desc: { FR: "Cité punique UNESCO, Kelibia et plages vierges.", EN: "UNESCO Punic city, Kelibia and virgin beaches.", DE: "UNESCO-Punierstätte, Kelibia und unberührte Strände.", ES: "Ciudad púnica UNESCO, Kelibia y playas vírgenes.", AR: "مدينة قرطاجية يونسكو، قليبية وشواطئ بكر." },
  },
  {
    slug: "kairouan", catKey: "culture",
    dur: { FR: "1 jour", EN: "1 day", DE: "1 Tag", ES: "1 día", AR: "يوم واحد" },
    price: 120, emoji: "🕌",
    title: { FR: "Kairouan Sainte", EN: "Holy Kairouan", DE: "Heiliges Kairouan", ES: "Kairouan Sagrada", AR: "القيروان المقدسة" },
    desc: { FR: "Grande Mosquée, médina UNESCO, artisanat traditionnel.", EN: "Grand Mosque, UNESCO medina, traditional crafts.", DE: "Große Moschee, UNESCO-Medina, traditionelles Handwerk.", ES: "Gran Mezquita, medina UNESCO, artesanía tradicional.", AR: "الجامع الكبير، المدينة العتيقة يونسكو، الصناعات التقليدية." },
  },
];
