import excTunis from "@/assets/exc-tunis-carthage.jpg";
import excCapBon from "@/assets/exc-cap-bon.jpg";
import excKairouan from "@/assets/exc-kairouan-eljem.jpg";
import excFriguia from "@/assets/exc-friguia.jpg";
import type { Lang } from "@/i18n/types";

export type RichExcursion = {
  key: string;
  image: string;
  /** must match destination name in EXCURSIONS_DATA so they pair up */
  matchesDestination: string;
  title: Record<Lang, string>;
  tagline: Record<Lang, string>;
  description: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
  duration: Record<Lang, string>;
};

export const RICH_EXCURSIONS: RichExcursion[] = [
  {
    key: "tunis-carthage",
    image: excTunis,
    matchesDestination: "Tunis médina, Carthage, Sidi Bou Saïd",
    title: {
      FR: "Tunis · Carthage · Sidi Bou Saïd",
      EN: "Tunis · Carthage · Sidi Bou Saïd",
      DE: "Tunis · Karthago · Sidi Bou Saïd",
      ES: "Túnez · Cartago · Sidi Bou Saïd",
      AR: "تونس · قرطاج · سيدي بوسعيد",
    },
    tagline: {
      FR: "Trois mondes en une journée — antique, médiéval, méditerranéen.",
      EN: "Three worlds in one day — ancient, medieval, Mediterranean.",
      DE: "Drei Welten an einem Tag — antik, mittelalterlich, mediterran.",
      ES: "Tres mundos en un día — antiguo, medieval, mediterráneo.",
      AR: "ثلاثة عوالم في يوم واحد — قديم، عصور وسطى، متوسطي.",
    },
    description: {
      FR: "Plongez dans 3000 ans d'histoire. Marchez sur les ruines puniques et romaines de Carthage, classée UNESCO. Perdez-vous dans les souks parfumés de la médina de Tunis et terminez en beauté à Sidi Bou Saïd, village suspendu entre ciel bleu et mer turquoise, café au jasmin à la main.",
      EN: "Dive into 3000 years of history. Walk through the Punic and Roman ruins of UNESCO-listed Carthage. Get lost in the perfumed souks of the Tunis medina and end the day in Sidi Bou Saïd, a village suspended between blue sky and turquoise sea — jasmine coffee in hand.",
      DE: "Tauchen Sie ein in 3000 Jahre Geschichte. Wandern Sie durch die punischen und römischen Ruinen des UNESCO-Welterbes Karthago, verlieren Sie sich in den duftenden Souks der Medina von Tunis und beenden Sie den Tag in Sidi Bou Saïd, einem Dorf zwischen blauem Himmel und türkisem Meer.",
      ES: "Sumérjase en 3000 años de historia. Camine entre las ruinas púnicas y romanas de Cartago (UNESCO), piérdase en los zocos perfumados de la medina de Túnez y termine el día en Sidi Bou Saïd, pueblo suspendido entre cielo azul y mar turquesa.",
      AR: "اغمس نفسك في 3000 عام من التاريخ. تجوّل في أطلال قرطاج البونيقية والرومانية المُدرجة في اليونسكو، تُه في أسواق المدينة العتيقة بتونس العطرة، واختم يومك في سيدي بوسعيد، القرية المعلّقة بين السماء الزرقاء والبحر الفيروزي.",
    },
    highlights: {
      FR: ["Site archéologique de Carthage (UNESCO)", "Médina de Tunis & souks", "Sidi Bou Saïd & Café des Délices", "Cathédrale Saint-Louis de Byrsa"],
      EN: ["Archaeological site of Carthage (UNESCO)", "Tunis medina & souks", "Sidi Bou Saïd & Café des Délices", "Saint-Louis Cathedral on Byrsa Hill"],
      DE: ["Archäologische Stätte Karthago (UNESCO)", "Medina von Tunis & Souks", "Sidi Bou Saïd & Café des Délices", "Saint-Louis-Kathedrale auf Byrsa"],
      ES: ["Sitio arqueológico de Cartago (UNESCO)", "Medina de Túnez y zocos", "Sidi Bou Saïd y Café des Délices", "Catedral San Luis de Byrsa"],
      AR: ["موقع قرطاج الأثري (اليونسكو)", "المدينة العتيقة بتونس وأسواقها", "سيدي بوسعيد ومقهى الديليس", "كاتدرائية سان لوي ببرصة"],
    },
    duration: { FR: "Journée complète · 8h", EN: "Full day · 8h", DE: "Ganztägig · 8 Std.", ES: "Día completo · 8h", AR: "يوم كامل · 8 ساعات" },
  },
  {
    key: "cap-bon",
    image: excCapBon,
    matchesDestination: "Nabeul, Kélibia, Haouaria, Korbous",
    title: {
      FR: "Cap Bon · Kélibia · Haouaria",
      EN: "Cap Bon · Kelibia · Haouaria",
      DE: "Cap Bon · Kelibia · Haouaria",
      ES: "Cap Bon · Kelibia · Haouaria",
      AR: "رأس الطيب · قليبية · هواريّة",
    },
    tagline: {
      FR: "Falaises sauvages, citadelle byzantine, eaux turquoise.",
      EN: "Wild cliffs, Byzantine fortress, turquoise waters.",
      DE: "Wilde Klippen, byzantinische Festung, türkisfarbenes Wasser.",
      ES: "Acantilados salvajes, fortaleza bizantina, aguas turquesa.",
      AR: "مرتفعات بكر، قلعة بيزنطية، مياه فيروزية.",
    },
    description: {
      FR: "Cap Bon, le secret le mieux gardé de la Tunisie. Visitez la cité punique de Kerkouane (UNESCO), grimpez à la forteresse de Kélibia surplombant la Méditerranée, explorez les grottes mythiques d'El Haouaria et savourez les eaux thermales de Korbous — tout cela ponctué de villages de pêcheurs et de criques préservées.",
      EN: "Cap Bon, Tunisia's best-kept secret. Visit the Punic city of Kerkouane (UNESCO), climb the Kelibia fortress overlooking the Mediterranean, explore the mythical caves of El Haouaria and unwind in the thermal waters of Korbous — all punctuated by fishing villages and untouched coves.",
      DE: "Cap Bon, Tunesiens bestgehütetes Geheimnis. Besuchen Sie die punische Stadt Kerkouane (UNESCO), erklimmen Sie die Festung von Kelibia mit Blick auf das Mittelmeer, erkunden Sie die mythischen Höhlen von El Haouaria und entspannen Sie in den Thermalquellen von Korbous.",
      ES: "Cap Bon, el secreto mejor guardado de Túnez. Visite la ciudad púnica de Kerkouane (UNESCO), suba a la fortaleza de Kelibia con vistas al Mediterráneo, explore las cuevas míticas de El Haouaria y descanse en las aguas termales de Korbous.",
      AR: "رأس الطيب، السر الأفضل حفظًا في تونس. زر مدينة كركوان البونيقية (اليونسكو)، تسلّق قلعة قليبية المُطلّة على المتوسط، استكشف كهوف الهواريّة الأسطورية واسترخِ في حمامات قربص الحرارية.",
    },
    highlights: {
      FR: ["Site punique de Kerkouane (UNESCO)", "Forteresse de Kélibia (XIIIᵉ s.)", "Grottes romaines d'El Haouaria", "Sources thermales de Korbous", "Plages secrètes & criques"],
      EN: ["Punic site of Kerkouane (UNESCO)", "Kelibia fortress (13th c.)", "Roman caves of El Haouaria", "Korbous thermal springs", "Hidden beaches & coves"],
      DE: ["Punische Stätte Kerkouane (UNESCO)", "Festung Kelibia (13. Jh.)", "Römische Höhlen von El Haouaria", "Thermalquellen Korbous", "Versteckte Strände & Buchten"],
      ES: ["Sitio púnico de Kerkouane (UNESCO)", "Fortaleza de Kelibia (s. XIII)", "Cuevas romanas de El Haouaria", "Aguas termales de Korbous", "Playas y calas secretas"],
      AR: ["موقع كركوان البونيقي (اليونسكو)", "قلعة قليبية (القرن 13)", "كهوف الهواريّة الرومانية", "ينابيع قربص الحرارية", "شواطئ وخلجان سرّية"],
    },
    duration: { FR: "Journée complète · 9h", EN: "Full day · 9h", DE: "Ganztägig · 9 Std.", ES: "Día completo · 9h", AR: "يوم كامل · 9 ساعات" },
  },
  {
    key: "kairouan-eljem",
    image: excKairouan,
    matchesDestination: "Kairouan, El Jem, Sousse",
    title: {
      FR: "Kairouan · El Jem · Sousse",
      EN: "Kairouan · El Jem · Sousse",
      DE: "Kairouan · El Jem · Sousse",
      ES: "Kairouan · El Jem · Sousse",
      AR: "القيروان · الجمّ · سوسة",
    },
    tagline: {
      FR: "La quatrième ville sainte de l'Islam et le plus grand colisée romain d'Afrique.",
      EN: "Islam's fourth holy city and Africa's grandest Roman colosseum.",
      DE: "Die vierte heilige Stadt des Islam und das größte römische Kolosseum Afrikas.",
      ES: "La cuarta ciudad santa del Islam y el mayor coliseo romano de África.",
      AR: "رابع أقدس مدن الإسلام وأكبر مدرج روماني في إفريقيا.",
    },
    description: {
      FR: "Une journée à couper le souffle entre civilisations. Kairouan, ville sainte fondée en 670, abrite la Grande Mosquée et sa médina UNESCO. À El Jem, l'imposant amphithéâtre romain (3ᵉ s.) rivalise avec le Colisée de Rome. Terminez à Sousse et son ribat, joyau de l'architecture défensive musulmane.",
      EN: "A breathtaking day across civilizations. Kairouan, holy city founded in 670 AD, hosts the Great Mosque and its UNESCO medina. In El Jem, the towering Roman amphitheater (3rd c.) rivals Rome's Colosseum. End in Sousse with its ribat, a jewel of Islamic defensive architecture.",
      DE: "Ein atemberaubender Tag zwischen Zivilisationen. Kairouan, heilige Stadt, beherbergt die Große Moschee und seine UNESCO-Medina. In El Jem konkurriert das römische Amphitheater (3. Jh.) mit dem Kolosseum Roms. Beenden Sie den Tag in Sousse mit seinem Ribat.",
      ES: "Un día deslumbrante entre civilizaciones. Kairouan, ciudad santa fundada en 670, alberga la Gran Mezquita y su medina UNESCO. En El Jem, el imponente anfiteatro romano (s. III) rivaliza con el Coliseo. Termine en Sousse con su ribat.",
      AR: "يوم خلاب بين الحضارات. القيروان، المدينة المقدسة المؤسَّسة سنة 670، تضمّ الجامع الكبير ومدينتها العتيقة (اليونسكو). في الجمّ، يُنافس المدرج الروماني (القرن 3) كولوسيوم روما. اختم يومك في سوسة ورباطها العريق.",
    },
    highlights: {
      FR: ["Grande Mosquée de Kairouan", "Médina de Kairouan (UNESCO)", "Amphithéâtre d'El Jem (UNESCO)", "Médina & ribat de Sousse", "Bassins des Aghlabides"],
      EN: ["Great Mosque of Kairouan", "Kairouan medina (UNESCO)", "El Jem amphitheater (UNESCO)", "Sousse medina & ribat", "Aghlabid basins"],
      DE: ["Große Moschee von Kairouan", "Medina Kairouan (UNESCO)", "Amphitheater El Jem (UNESCO)", "Medina & Ribat Sousse", "Aghlabidische Bassins"],
      ES: ["Gran Mezquita de Kairouan", "Medina de Kairouan (UNESCO)", "Anfiteatro de El Jem (UNESCO)", "Medina y ribat de Sousse", "Estanques aglabíes"],
      AR: ["جامع القيروان الكبير", "مدينة القيروان العتيقة (اليونسكو)", "مدرج الجمّ (اليونسكو)", "مدينة سوسة العتيقة ورباطها", "أحواض الأغالبة"],
    },
    duration: { FR: "Journée complète · 10h", EN: "Full day · 10h", DE: "Ganztägig · 10 Std.", ES: "Día completo · 10h", AR: "يوم كامل · 10 ساعات" },
  },
  {
    key: "friguia",
    image: excFriguia,
    matchesDestination: "Demi journée Friguia Park",
    title: {
      FR: "Friguia Park · Safari Familial",
      EN: "Friguia Park · Family Safari",
      DE: "Friguia Park · Familien-Safari",
      ES: "Friguia Park · Safari Familiar",
      AR: "حديقة فريجيا · سفاري عائلي",
    },
    tagline: {
      FR: "Le seul vrai zoo-safari d'Afrique du Nord — magique pour les enfants.",
      EN: "North Africa's only true zoo-safari — magical for kids.",
      DE: "Der einzige echte Zoo-Safari Nordafrikas — magisch für Kinder.",
      ES: "El único auténtico zoo-safari del norte de África — mágico para los niños.",
      AR: "حديقة الحيوان السفاري الوحيدة الحقيقية في شمال إفريقيا — ساحرة للأطفال.",
    },
    description: {
      FR: "À mi-chemin entre Hammamet et Sousse, Friguia Park abrite plus de 50 espèces : lions, girafes, zèbres, hippopotames, dans un cadre africain reconstitué. Spectacles de perroquets, otaries et danses traditionnelles. L'idéal pour une demi-journée familiale inoubliable.",
      EN: "Halfway between Hammamet and Sousse, Friguia Park is home to 50+ species: lions, giraffes, zebras, hippos in a reconstituted African setting. Parrot, sea-lion shows and traditional dances. Perfect for an unforgettable family half-day.",
      DE: "Auf halbem Weg zwischen Hammamet und Sousse beherbergt Friguia Park über 50 Arten: Löwen, Giraffen, Zebras, Nilpferde. Papageien-, Seelöwenshows und traditionelle Tänze. Ideal für einen unvergesslichen Familien-Halbtag.",
      ES: "A medio camino entre Hammamet y Sousse, Friguia Park alberga más de 50 especies: leones, jirafas, cebras, hipopótamos. Espectáculos de loros, leones marinos y danzas tradicionales. Ideal para una media jornada familiar inolvidable.",
      AR: "في منتصف الطريق بين الحمامات وسوسة، تضمّ حديقة فريجيا أكثر من 50 نوعًا: أسود، زرافات، حمار وحشي، أفراس النهر. عروض ببغاوات وفقمات ورقصات تقليدية. مثالية لنصف يوم عائلي لا يُنسى.",
    },
    highlights: {
      FR: ["Plus de 50 espèces animales", "Spectacle de perroquets & otaries", "Show traditionnel africain", "Restaurant sur place", "Idéal enfants (3+ ans)"],
      EN: ["50+ animal species", "Parrot & sea-lion show", "Traditional African show", "On-site restaurant", "Perfect for kids (3+)"],
      DE: ["Über 50 Tierarten", "Papageien- & Seelöwenshow", "Traditionelle afrikanische Vorführung", "Restaurant vor Ort", "Ideal für Kinder (3+)"],
      ES: ["Más de 50 especies", "Espectáculo de loros y leones marinos", "Show tradicional africano", "Restaurante en el sitio", "Ideal para niños (3+)"],
      AR: ["أكثر من 50 نوعًا حيوانيًا", "عروض الببغاوات والفقمات", "عرض إفريقي تقليدي", "مطعم في الموقع", "مثالي للأطفال (3+)"],
    },
    duration: { FR: "Demi-journée · 4h", EN: "Half day · 4h", DE: "Halbtägig · 4 Std.", ES: "Media jornada · 4h", AR: "نصف يوم · 4 ساعات" },
  },
];
