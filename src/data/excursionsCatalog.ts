import type { Lang } from "@/i18n/types";

import capBon1 from "@/assets/excursions/cap-bon-1.jpg";
import capBon2 from "@/assets/excursions/cap-bon-2.jpg";
import capBon3 from "@/assets/excursions/cap-bon-3.jpg";
import kairouan1 from "@/assets/excursions/kairouan-1.jpg";
import kairouan2 from "@/assets/excursions/kairouan-2.jpg";
import kairouan3 from "@/assets/excursions/kairouan-3.jpg";
import tunis1 from "@/assets/excursions/tunis-1.jpg";
import tunis2 from "@/assets/excursions/tunis-2.jpg";
import tunis3 from "@/assets/excursions/tunis-3.jpg";
import dougga1 from "@/assets/excursions/dougga-1.jpg";
import dougga2 from "@/assets/excursions/dougga-2.jpg";
import dougga3 from "@/assets/excursions/dougga-3.jpg";
import friguia1 from "@/assets/excursions/friguia-1.jpg";
import friguia2 from "@/assets/excursions/friguia-2.jpg";
import friguia3 from "@/assets/excursions/friguia-3.jpg";

export type PriceRow = {
  /** Departure city / area key, localized below */
  fromKey: "tunis" | "hammamet_nabeul" | "sousse_monastir" | "sousse";
  /** Price in EUR for 1-4 passengers vehicle */
  price1to4: number;
  /** Price in EUR for 4-8 passengers vehicle */
  price4to8: number;
};

export type Excursion = {
  key: string;
  /** 3 real images for gallery */
  images: [string, string, string];
  title: Record<Lang, string>;
  destinations: Record<Lang, string>;
  description: Record<Lang, string>;
  duration: Record<Lang, string>;
  priceRows: PriceRow[];
};

/* ------------------------------------------------------------------ */
/*  CATALOGUE — built from official PDF (Tunisia_Excursions_Report)    */
/* ------------------------------------------------------------------ */

export const EXCURSIONS: Excursion[] = [
  {
    key: "cap-bon",
    images: [capBon1, capBon2, capBon3],
    title: {
      FR: "Excursion Cap Bon",
      EN: "Cap Bon Excursion",
      DE: "Ausflug Cap Bon",
      ES: "Excursión Cap Bon",
      AR: "رحلة الوطن القبلي",
    },
    destinations: {
      FR: "Hammamet (Médina) · Nabeul (Artisanat & Poterie) · Haouaria (Grottes) · Korbous (Sources thermales)",
      EN: "Hammamet (Medina) · Nabeul (Crafts & Pottery) · Haouaria (Caves) · Korbous (Thermal springs)",
      DE: "Hammamet (Medina) · Nabeul (Kunsthandwerk & Keramik) · Haouaria (Grotten) · Korbous (Thermalquellen)",
      ES: "Hammamet (Medina) · Nabeul (Artesanía y cerámica) · Haouaria (Grutas) · Korbous (Termas)",
      AR: "الحمامات (المدينة العتيقة) · نابل (الحرف والفخار) · هوارية (المغارات) · قربص (الينابيع الحارة)",
    },
    description: {
      FR: "Une journée riche entre artisanat berbère, médina pittoresque, falaises sculptées par la mer et bains thermaux ancestraux.",
      EN: "A full day between Berber craftsmanship, a picturesque medina, sea-carved cliffs and ancestral thermal baths.",
      DE: "Ein voller Tag zwischen Berberhandwerk, malerischer Medina, vom Meer geformten Klippen und uralten Thermalbädern.",
      ES: "Un día completo entre artesanía bereber, medina pintoresca, acantilados esculpidos por el mar y baños termales ancestrales.",
      AR: "يوم كامل بين الحرف البربرية، المدينة العتيقة الخلابة، المنحدرات البحرية والحمامات الحارة العريقة.",
    },
    duration: { FR: "1 jour", EN: "1 day", DE: "1 Tag", ES: "1 día", AR: "يوم واحد" },
    priceRows: [
      { fromKey: "tunis", price1to4: 133, price4to8: 167 },
      { fromKey: "hammamet_nabeul", price1to4: 95, price4to8: 137 },
      { fromKey: "sousse_monastir", price1to4: 142, price4to8: 167 },
    ],
  },
  {
    key: "kairouan-eljem-sousse",
    images: [kairouan1, kairouan2, kairouan3],
    title: {
      FR: "Kairouan, El Jem & Sousse",
      EN: "Kairouan, El Jem & Sousse",
      DE: "Kairouan, El Jem & Sousse",
      ES: "Kairouan, El Jem y Sousse",
      AR: "القيروان، الجم وسوسة",
    },
    destinations: {
      FR: "Kairouan (Grande Mosquée) · El Jem (Amphithéâtre romain) · Sousse (Médina/Ribat) · Port El Kantaoui",
      EN: "Kairouan (Great Mosque) · El Jem (Roman Amphitheatre) · Sousse (Medina/Ribat) · Port El Kantaoui",
      DE: "Kairouan (Große Moschee) · El Jem (Römisches Amphitheater) · Sousse (Medina/Ribat) · Port El Kantaoui",
      ES: "Kairouan (Gran Mezquita) · El Jem (Anfiteatro romano) · Sousse (Medina/Ribat) · Port El Kantaoui",
      AR: "القيروان (الجامع الكبير) · الجم (المدرّج الروماني) · سوسة (المدينة/الرباط) · القنطاوي",
    },
    description: {
      FR: "Trois cités millénaires en une journée : la sainte Kairouan, le colossal amphithéâtre d'El Jem et le charme méditerranéen de Sousse.",
      EN: "Three millennia-old cities in one day: holy Kairouan, the colossal El Jem amphitheatre and the Mediterranean charm of Sousse.",
      DE: "Drei jahrtausendealte Städte an einem Tag: das heilige Kairouan, das gewaltige Amphitheater von El Jem und der mediterrane Charme von Sousse.",
      ES: "Tres ciudades milenarias en un día: la santa Kairouan, el colosal anfiteatro de El Jem y el encanto mediterráneo de Sousse.",
      AR: "ثلاث مدن أثرية في يوم واحد: القيروان المقدسة، مدرج الجم العملاق وسحر سوسة المتوسطي.",
    },
    duration: { FR: "1 jour", EN: "1 day", DE: "1 Tag", ES: "1 día", AR: "يوم واحد" },
    priceRows: [
      { fromKey: "hammamet_nabeul", price1to4: 142, price4to8: 167 },
      { fromKey: "sousse", price1to4: 142, price4to8: 167 },
      { fromKey: "tunis", price1to4: 171, price4to8: 196 },
    ],
  },
  {
    key: "grand-tunis",
    images: [tunis1, tunis2, tunis3],
    title: {
      FR: "Excursion Grand Tunis",
      EN: "Grand Tunis Excursion",
      DE: "Ausflug Groß-Tunis",
      ES: "Excursión Grand Tunis",
      AR: "رحلة تونس الكبرى",
    },
    destinations: {
      FR: "Médina de Tunis · Site archéologique de Carthage · Sidi Bou Saïd",
      EN: "Tunis Medina · Carthage archaeological site · Sidi Bou Saïd",
      DE: "Medina von Tunis · Archäologische Stätte Karthago · Sidi Bou Saïd",
      ES: "Medina de Túnez · Sitio arqueológico de Cartago · Sidi Bou Saïd",
      AR: "المدينة العتيقة بتونس · موقع قرطاج الأثري · سيدي بوسعيد",
    },
    description: {
      FR: "L'essence de la capitale : souks animés de la médina, vestiges puniques de Carthage et le bleu et blanc inoubliable de Sidi Bou Saïd.",
      EN: "The essence of the capital: vibrant medina souks, the Punic ruins of Carthage and the unforgettable blue-and-white of Sidi Bou Saïd.",
      DE: "Das Herz der Hauptstadt: lebhafte Souks der Medina, punische Ruinen Karthagos und das unvergessliche Blau-Weiß von Sidi Bou Saïd.",
      ES: "La esencia de la capital: vibrantes zocos de la medina, las ruinas púnicas de Cartago y el inolvidable azul y blanco de Sidi Bou Saïd.",
      AR: "جوهر العاصمة: أسواق المدينة العتيقة النابضة، آثار قرطاج البونية، والأزرق والأبيض الخلاب لسيدي بوسعيد.",
    },
    duration: { FR: "1 jour", EN: "1 day", DE: "1 Tag", ES: "1 día", AR: "يوم واحد" },
    priceRows: [
      { fromKey: "hammamet_nabeul", price1to4: 95, price4to8: 147 },
      { fromKey: "sousse_monastir", price1to4: 133, price4to8: 167 },
      { fromKey: "tunis", price1to4: 95, price4to8: 147 },
    ],
  },
  {
    key: "dougga-bulla-regia",
    images: [dougga1, dougga2, dougga3],
    title: {
      FR: "Dougga & Bulla Regia",
      EN: "Dougga & Bulla Regia",
      DE: "Dougga & Bulla Regia",
      ES: "Dougga y Bulla Regia",
      AR: "دڨة وبُلاّ ريجيا",
    },
    destinations: {
      FR: "Dougga (Site UNESCO) · Bulla Regia (Villas romaines souterraines)",
      EN: "Dougga (UNESCO Site) · Bulla Regia (Underground Roman villas)",
      DE: "Dougga (UNESCO-Welterbe) · Bulla Regia (Unterirdische römische Villen)",
      ES: "Dougga (Patrimonio UNESCO) · Bulla Regia (Villas romanas subterráneas)",
      AR: "دڨة (موقع يونسكو) · بلا ريجيا (الفيلات الرومانية الأرضية)",
    },
    description: {
      FR: "Plongée dans l'Empire romain : la majestueuse Dougga classée UNESCO et les fascinantes maisons souterraines de Bulla Regia.",
      EN: "A dive into the Roman Empire: the majestic UNESCO-listed Dougga and the fascinating underground houses of Bulla Regia.",
      DE: "Eintauchen in das Römische Reich: das majestätische UNESCO-Welterbe Dougga und die faszinierenden unterirdischen Häuser von Bulla Regia.",
      ES: "Una inmersión en el Imperio Romano: la majestuosa Dougga, declarada Patrimonio UNESCO, y las fascinantes casas subterráneas de Bulla Regia.",
      AR: "غوص في الإمبراطورية الرومانية: دڨة المهيبة المُصنّفة من اليونسكو ومنازل بلا ريجيا الجوفية المذهلة.",
    },
    duration: { FR: "1 jour", EN: "1 day", DE: "1 Tag", ES: "1 día", AR: "يوم واحد" },
    priceRows: [
      { fromKey: "hammamet_nabeul", price1to4: 209, price4to8: 236 },
      { fromKey: "sousse_monastir", price1to4: 218, price4to8: 246 },
      { fromKey: "tunis", price1to4: 209, price4to8: 236 },
    ],
  },
  {
    key: "friguia-park",
    images: [friguia1, friguia2, friguia3],
    title: {
      FR: "Friguia Park (Demi-journée)",
      EN: "Friguia Park (Half-Day)",
      DE: "Friguia Park (Halbtag)",
      ES: "Friguia Park (Medio día)",
      AR: "حديقة فريقية (نصف يوم)",
    },
    destinations: {
      FR: "Parc animalier Friguia · Spectacles d'otaries",
      EN: "Friguia Animal Park · Sea Lion Shows",
      DE: "Tierpark Friguia · Seelöwen-Shows",
      ES: "Parque zoológico Friguia · Espectáculos de leones marinos",
      AR: "حديقة حيوانات فريقية · عروض أسود البحر",
    },
    description: {
      FR: "Une demi-journée magique en famille : safari africain, plus de 50 espèces et spectacles inoubliables au cœur de la Tunisie.",
      EN: "A magical half-day with the family: African safari, more than 50 species and unforgettable shows in the heart of Tunisia.",
      DE: "Ein magischer halber Tag mit der Familie: afrikanische Safari, über 50 Tierarten und unvergessliche Shows im Herzen Tunesiens.",
      ES: "Media jornada mágica en familia: safari africano, más de 50 especies y espectáculos inolvidables en el corazón de Túnez.",
      AR: "نصف يوم ساحر مع العائلة: سفاري أفريقي، أكثر من 50 نوعًا وعروض لا تُنسى في قلب تونس.",
    },
    duration: { FR: "Demi-journée", EN: "Half-day", DE: "Halbtag", ES: "Medio día", AR: "نصف يوم" },
    priceRows: [
      { fromKey: "hammamet_nabeul", price1to4: 72, price4to8: 119 },
      { fromKey: "sousse", price1to4: 72, price4to8: 119 },
      { fromKey: "tunis", price1to4: 86, price4to8: 128 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Localization helpers                                               */
/* ------------------------------------------------------------------ */

export const FROM_LABEL: Record<PriceRow["fromKey"], Record<Lang, string>> = {
  tunis: {
    FR: "Tunis (Grand Tunis)",
    EN: "Tunis (Grand Tunis)",
    DE: "Tunis (Groß-Tunis)",
    ES: "Túnez (Grand Tunis)",
    AR: "تونس الكبرى",
  },
  hammamet_nabeul: {
    FR: "Hammamet / Nabeul",
    EN: "Hammamet / Nabeul",
    DE: "Hammamet / Nabeul",
    ES: "Hammamet / Nabeul",
    AR: "الحمامات / نابل",
  },
  sousse_monastir: {
    FR: "Sousse / Monastir",
    EN: "Sousse / Monastir",
    DE: "Sousse / Monastir",
    ES: "Sousse / Monastir",
    AR: "سوسة / المنستير",
  },
  sousse: {
    FR: "Sousse",
    EN: "Sousse",
    DE: "Sousse",
    ES: "Sousse",
    AR: "سوسة",
  },
};

export const TABLE_HEADERS: Record<"from" | "v1to4" | "v4to8", Record<Lang, string>> = {
  from: {
    FR: "Départ depuis",
    EN: "Departure from",
    DE: "Abfahrt ab",
    ES: "Salida desde",
    AR: "الانطلاق من",
  },
  v1to4: {
    FR: "Véhicule (1-4 pers.)",
    EN: "Vehicle (1-4 pax)",
    DE: "Fahrzeug (1-4 Pers.)",
    ES: "Vehículo (1-4 pax)",
    AR: "سيارة (1-4 ركاب)",
  },
  v4to8: {
    FR: "Véhicule (4-8 pers.)",
    EN: "Vehicle (4-8 pax)",
    DE: "Fahrzeug (4-8 Pers.)",
    ES: "Vehículo (4-8 pax)",
    AR: "سيارة (4-8 ركاب)",
  },
};

export const INCLUSIONS: Record<"included" | "excluded", Record<Lang, string[]>> = {
  included: {
    FR: [
      "Transport privé climatisé",
      "Services d'un chauffeur professionnel",
      "Carburant et péages d'autoroute",
      "Assurance passagers",
      "Eau minérale pour chaque passager",
      "Wi-Fi à bord",
    ],
    EN: [
      "Private air-conditioned transport",
      "Professional driver services",
      "Fuel and highway tolls",
      "Passenger insurance",
      "Mineral water for each passenger",
      "Onboard Wi-Fi",
    ],
    DE: [
      "Privater klimatisierter Transport",
      "Professioneller Fahrerservice",
      "Kraftstoff und Autobahngebühren",
      "Passagierversicherung",
      "Mineralwasser für jeden Passagier",
      "WLAN an Bord",
    ],
    ES: [
      "Transporte privado con aire acondicionado",
      "Servicios de un conductor profesional",
      "Combustible y peajes de autopista",
      "Seguro para pasajeros",
      "Agua mineral para cada pasajero",
      "Wi-Fi a bordo",
    ],
    AR: [
      "نقل خاص مكيّف",
      "خدمات سائق محترف",
      "الوقود ورسوم الطرق السيارة",
      "تأمين الركاب",
      "مياه معدنية لكل راكب",
      "واي-فاي على متن السيارة",
    ],
  },
  excluded: {
    FR: [
      "Frais d'entrée aux musées et sites archéologiques",
      "Déjeuner et boissons personnelles",
      "Dépenses personnelles et pourboires",
    ],
    EN: [
      "Entrance fees to museums and archaeological sites",
      "Lunch and personal beverages",
      "Personal expenses and tips",
    ],
    DE: [
      "Eintrittsgebühren für Museen und archäologische Stätten",
      "Mittagessen und persönliche Getränke",
      "Persönliche Ausgaben und Trinkgelder",
    ],
    ES: [
      "Entradas a museos y sitios arqueológicos",
      "Almuerzo y bebidas personales",
      "Gastos personales y propinas",
    ],
    AR: [
      "رسوم الدخول إلى المتاحف والمواقع الأثرية",
      "الغداء والمشروبات الشخصية",
      "المصاريف الشخصية والإكراميات",
    ],
  },
};

export const SECTION_LABELS: Record<
  "pricing" | "included" | "excluded" | "destinations" | "book",
  Record<Lang, string>
> = {
  pricing: {
    FR: "Tarifs",
    EN: "Pricing",
    DE: "Preise",
    ES: "Tarifas",
    AR: "الأسعار",
  },
  included: {
    FR: "Inclus dans le tarif",
    EN: "Included in the price",
    DE: "Im Preis inbegriffen",
    ES: "Incluido en el precio",
    AR: "ما يشمله السعر",
  },
  excluded: {
    FR: "Non inclus",
    EN: "Not included",
    DE: "Nicht inbegriffen",
    ES: "No incluido",
    AR: "غير مشمول",
  },
  destinations: {
    FR: "Étapes du voyage",
    EN: "Trip destinations",
    DE: "Reisestationen",
    ES: "Etapas del viaje",
    AR: "محطات الرحلة",
  },
  book: {
    FR: "Réserver cette excursion",
    EN: "Book this excursion",
    DE: "Diese Tour buchen",
    ES: "Reservar esta excursión",
    AR: "احجز هذه الرحلة",
  },
};
