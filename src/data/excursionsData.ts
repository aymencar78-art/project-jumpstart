// Raw excursion pricing data. First row of each table is headers.
export type PriceTable = string[][];
export type ExcursionDest = {
  destination: string; // FR (default)
  destination_ar: string;
  prices: PriceTable[];
};

export const EXCURSIONS_DATA: ExcursionDest[] = [
  {
    destination: "Tunis médina, Carthage, Sidi Bou Saïd",
    destination_ar: "مدينة تونس، قرطاج، سيدي بوسعيد",
    prices: [
      [
        ["Départ de", "(1 à 3) Passager(s)", "(1 à 7) Passager(s)"],
        ["Hammamet / Nabeul", "90 €", "137 €"],
        ["Sousse / Monastir", "134 €", "156 €"],
        ["Tunis", "91 €", "145 €"],
      ],
      [
        ["Départ de", "(1 à 2) Passager(s)", "(1 à 6) Passager(s)"],
        ["Hammamet / Nabeul", "147 €", "199 €"],
        ["Sousse / Monastir", "201 €", "207 €"],
        ["Tunis", "149 €", "199 €"],
      ],
      [
        ["Départ de", "2 à 3 PAX", "4 à 7 PAX", "8 à 12 PAX", "13 à 16 PAX", "17 à 20 PAX", "21 à 30 PAX"],
        ["Hammamet / Nabeul", "86 €", "55 €", "45 €", "42 €", "37 €", "33 €"],
        ["Sousse / Monastir", "102 €", "64 €", "53 €", "45 €", "40 €", "36 €"],
        ["Tunis", "75 €", "52 €", "37 €", "34 €", "29 €", "27 €"],
      ],
      [
        ["Départ de", "2 PAX (Min)", "4 à 7 PAX", "8 à 12 PAX", "13 à 16 PAX", "17 à 20 PAX", "21 à 30 PAX"],
        ["Hammamet / Nabeul", "110 €", "68 €", "52 €", "46 €", "40 €", "35 €"],
        ["Sousse / Monastir", "127 €", "76 €", "58 €", "49 €", "43 €", "40 €"],
        ["Tunis", "100 €", "64 €", "44 €", "39 €", "33 €", "30 €"],
      ],
    ],
  },
  {
    destination: "Nabeul, Kélibia, Haouaria, Korbous",
    destination_ar: "نابل، قليبية، هواريّة، قربص",
    prices: [
      [
        ["Départ de", "(1 à 3) Passager(s)", "(1 à 8) Passagers"],
        ["Tunis", "128 €", "159 €"],
        ["Nabeul / Hammamet", "95 €", "126 €"],
        ["Sousse / Monastir", "138 €", "159 €"],
      ],
      [
        ["Départ de", "(1 à 2) Passager(s)", "(1 à 6) Passagers"],
        ["Tunis", "179 €", "211 €"],
        ["Nabeul / Hammamet", "146 €", "183 €"],
        ["Sousse / Monastir", "191 €", "220 €"],
      ],
      [
        ["Départ de", "2 à 3 PAX", "4 à 7 PAX", "8 à 12 PAX", "13 à 16 PAX", "17 à 20 PAX", "21 à 30 PAX"],
        ["Hammamet / Nabeul", "71 €", "63 €", "58 €", "48 €", "47 €", "43 €"],
        ["Sousse / Monastir", "88 €", "76 €", "61 €", "54 €", "52 €", "48 €"],
        ["Tunis", "86 €", "74 €", "62 €", "57 €", "49 €", "46 €"],
      ],
      [
        ["Départ de", "2 PAX (Min)", "3 à 6 PAX", "7 à 12 PAX", "13 à 16 PAX", "17 à 20 PAX", "21 à 30 PAX"],
        ["Hammamet / Nabeul", "104 €", "78 €", "71 €", "53 €", "50 €", "46 €"],
        ["Sousse / Monastir", "115 €", "91 €", "76 €", "64 €", "55 €", "51 €"],
        ["Tunis", "120 €", "87 €", "72 €", "62 €", "56 €", "49 €"],
      ],
    ],
  },
  {
    destination: "Kairouan, El Jem, Sousse",
    destination_ar: "القيروان، الجمّ، سوسة",
    prices: [
      [
        ["Départ de", "(1 à 4) Passager(s)", "(4 à 8) Passagers"],
        ["Hammamet / Nabeul", "143 €", "164 €"],
        ["Sousse", "144 €", "157 €"],
        ["Grand Tunis", "172 €", "193 €"],
      ],
      [
        ["Départ de", "(1 à 2) Passager(s)", "(1 à 6) Passager(s)"],
        ["Hammamet / Nabeul", "191 €", "219 €"],
        ["Sousse / Monastir", "195 €", "210 €"],
        ["Tunis", "226 €", "246 €"],
      ],
      [
        ["Départ de", "2 à 3 PAX", "4 à 7 PAX", "8 à 12 PAX", "13 à 16 PAX", "17 à 20 PAX", "21 à 30 PAX"],
        ["Hammamet / Nabeul", "88 €", "72 €", "64 €", "54 €", "51 €", "45 €"],
        ["Sousse / Monastir", "77 €", "65 €", "60 €", "48 €", "47 €", "41 €"],
        ["Tunis", "91 €", "78 €", "66 €", "60 €", "55 €", "52 €"],
      ],
      [
        ["Départ de", "2 PAX (Min)", "3 à 6 PAX", "7 à 12 PAX", "13 à 16 PAX", "17 à 20 PAX", "21 à 30 PAX"],
        ["Hammamet / Nabeul", "116 €", "85 €", "75 €", "60 €", "55 €", "50 €"],
        ["Sousse / Monastir", "105 €", "76 €", "71 €", "53 €", "52 €", "44 €"],
        ["Tunis", "120 €", "89 €", "77 €", "70 €", "59 €", "54 €"],
      ],
    ],
  },
  {
    destination: "Demi journée Friguia Park",
    destination_ar: "نصف يوم في حديقة فريجيا",
    prices: [
      [
        ["Départ de", "(1 à 3) Passager(s)", "(4 à 8) Passagers"],
        ["Hammamet / Nabeul", "70 €", "111 €"],
        ["Sousse", "68 €", "110 €"],
        ["Grand Tunis", "83 €", "118 €"],
      ],
      [
        ["Départ de", "2 à 3 PAX", "4 à 7 PAX", "8 à 12 PAX", "13 à 16 PAX", "17 à 20 PAX", "21 à 27 PAX"],
        ["Hammamet / Nabeul", "36 €", "36 €", "32 €", "25 €", "24 €", "19 €"],
        ["Sousse / Monastir", "38 €", "35 €", "37 €", "30 €", "27 €", "22 €"],
        ["Tunis", "47 €", "42 €", "36 €", "32 €", "29 €", "25 €"],
      ],
    ],
  },
];

export const EUR_TO_GBP = 0.85;

const PLACE_AR: Record<string, string> = {
  "Hammamet / Nabeul": "الحمامات / نابل",
  "Sousse / Monastir": "سوسة / المنستير",
  "Sousse": "سوسة",
  "Tunis": "تونس",
  "Nabeul / Hammamet": "نابل / الحمامات",
  "Grand Tunis": "تونس الكبرى",
};

const HEADER_AR: Record<string, string> = {
  "Départ de": "الانطلاق من",
};

const passengerToAR = (s: string): string => {
  const m1 = s.match(/^\((\d+)\s*à\s*(\d+)\)\s*Passagers?\(s\)?$/i) || s.match(/^\((\d+)\s*à\s*(\d+)\)\s*Passagers?$/i);
  if (m1) return `(${m1[1]} إلى ${m1[2]}) راكب`;
  const m2 = s.match(/^(\d+)\s*à\s*(\d+)\s*PAX$/i);
  if (m2) return `${m2[1]} إلى ${m2[2]} راكب`;
  const m3 = s.match(/^(\d+)\s*PAX\s*\(Min\)$/i);
  if (m3) return `${m3[1]} راكب (الحد الأدنى)`;
  return s;
};

export const translateCell = (
  cell: string,
  lang: "FR" | "EN" | "DE" | "ES" | "AR",
  rowIdx: number,
  colIdx: number,
): string => {
  if (cell.includes("€")) {
    if (lang === "EN") {
      const num = parseFloat(cell.replace(/[^0-9.,]/g, "").replace(",", "."));
      if (!isNaN(num)) {
        const gbp = Math.round(num * EUR_TO_GBP);
        return `£${gbp}`;
      }
    }
    return cell;
  }
  if (lang === "EN" || lang === "FR") return cell;
  if (rowIdx === 0) {
    if (colIdx === 0) return HEADER_AR[cell] || cell;
    return passengerToAR(cell);
  }
  if (colIdx === 0) return PLACE_AR[cell] || cell;
  return cell;
};

export const translateDestination = (
  d: ExcursionDest,
  lang: "FR" | "EN" | "DE" | "ES" | "AR",
): string => {
  if (lang === "FR" || lang === "EN") return d.destination;
  return d.destination_ar;
};

export const tableLabels = (lang: "FR" | "EN" | "DE" | "ES" | "AR"): string[] => {
  if (lang === "EN") return ["One Way", "Round Trip", "Half Day", "Full Day"];
  if (lang === "FR") return ["Aller Simple", "Aller-Retour", "Demi-Journée", "Journée Complète"];
  return ["ذهاب فقط", "ذهاب وإياب", "نصف يوم", "يوم كامل"];
};
