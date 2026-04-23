import { Helmet } from "react-helmet-async";
import type { Lang } from "@/i18n/types";
import type { PageKey } from "@/lib/pages";
import { SUPPORTED_LANGS, buildPath } from "@/lib/i18nRoutes";

type Props = {
  page: PageKey;
  lang: Lang;
  /** Optional override title/description. Falls back to page-defaults below. */
  title?: string;
  description?: string;
  /** Extra JSON-LD schema(s) to inject for this page */
  schema?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE_NAME = "Africana Tunisia";
const ORIGIN =
  typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : "https://start-happy-hatch.lovable.app";

/** Localized titles/descriptions per page + lang. Each combination is unique for SEO. */
const META: Record<PageKey, Record<Lang, { title: string; description: string; keywords: string }>> = {
  home: {
    FR: {
      title: "Africana Tunisie | Transfert Aéroport & VTC Privé",
      description: "Transferts aéroport en Tunisie au prix fixe : Tunis-Carthage, Enfidha, Djerba vers Hammamet, Sousse, Djerba. Chauffeurs certifiés, service 24/7.",
      keywords: "transfert aéroport tunisie, taxi privé tunis, vtc hammamet, navette aéroport carthage",
    },
    EN: {
      title: "Africana Tunisia | Airport Transfer & Private Chauffeur",
      description: "Fixed-price Tunisia airport transfers from Tunis-Carthage, Enfidha, Djerba to Hammamet, Sousse, Djerba. Certified drivers, 24/7 service.",
      keywords: "tunisia airport transfer, private taxi tunis, hammamet shuttle, carthage airport transfer",
    },
    IT: {
      title: "Africana Tunisia | Trasferimento Aeroporto & NCC Privato",
      description: "Trasferimenti aeroportuali in Tunisia a prezzo fisso: Tunisi-Cartagine, Enfidha, Djerba verso Hammamet, Sousse, Djerba. Autisti certificati, servizio 24/7.",
      keywords: "trasferimento aeroporto tunisia, taxi privato tunisi, navetta hammamet, ncc cartagine",
    },
    DE: {
      title: "Africana Tunesien | Flughafentransfer & Privater Fahrer",
      description: "Flughafentransfers in Tunesien zum Festpreis: Tunis-Karthago, Enfidha, Djerba nach Hammamet, Sousse, Djerba. Zertifizierte Fahrer, 24/7-Service.",
      keywords: "flughafentransfer tunesien, privates taxi tunis, hammamet shuttle, karthago transfer",
    },
    ES: {
      title: "Africana Túnez | Traslado Aeropuerto & Chófer Privado",
      description: "Traslados al aeropuerto en Túnez a precio fijo: Túnez-Cartago, Enfidha, Djerba a Hammamet, Sousse, Djerba. Conductores certificados, 24/7.",
      keywords: "traslado aeropuerto tunez, taxi privado tunez, lanzadera hammamet, cartago aeropuerto",
    },
    AR: {
      title: "أفريكانا تونس | نقل المطار وسائق خاص",
      description: "نقل من المطار في تونس بسعر ثابت: تونس قرطاج، النفيضة، جربة إلى الحمامات وسوسة. سائقون معتمدون، خدمة 24/7.",
      keywords: "نقل مطار تونس, تاكسي خاص, نقل قرطاج, مكوك الحمامات",
    },
  },
  booking: {
    FR: {
      title: "Réservation Transfert Aéroport Tunisie | Africana",
      description: "Réservez en ligne votre transfert aéroport en Tunisie en 3 étapes. Prix fixe, paiement sécurisé, annulation gratuite 24h avant.",
      keywords: "réservation transfert tunisie, booking taxi aéroport, réserver vtc tunis",
    },
    EN: {
      title: "Book Tunisia Airport Transfer | Africana",
      description: "Book your Tunisia airport transfer online in 3 easy steps. Fixed price, secure payment, free cancellation up to 24h.",
      keywords: "book tunisia transfer, airport taxi booking, reserve chauffeur tunis",
    },
    IT: {
      title: "Prenota Trasferimento Aeroporto Tunisia | Africana",
      description: "Prenota il tuo trasferimento aeroportuale in Tunisia in 3 semplici passaggi. Prezzo fisso, pagamento sicuro, cancellazione gratuita 24h.",
      keywords: "prenotazione trasferimento tunisia, booking taxi aeroporto, prenota ncc tunisi",
    },
    DE: {
      title: "Flughafentransfer Tunesien Buchen | Africana",
      description: "Buchen Sie Ihren Flughafentransfer in Tunesien online in 3 Schritten. Festpreis, sichere Zahlung, kostenlose Stornierung 24h vorher.",
      keywords: "tunesien transfer buchen, flughafen taxi booking, fahrer tunis reservieren",
    },
    ES: {
      title: "Reservar Traslado Aeropuerto Túnez | Africana",
      description: "Reserva online tu traslado al aeropuerto en Túnez en 3 pasos. Precio fijo, pago seguro, cancelación gratuita 24h antes.",
      keywords: "reservar traslado tunez, booking taxi aeropuerto, reservar chofer tunez",
    },
    AR: {
      title: "حجز نقل المطار في تونس | أفريكانا",
      description: "احجز نقل المطار في تونس عبر الإنترنت في 3 خطوات. سعر ثابت، دفع آمن، إلغاء مجاني قبل 24 ساعة.",
      keywords: "حجز نقل تونس, حجز تاكسي مطار, حجز سائق",
    },
  },
  excursions: {
    FR: {
      title: "Excursions Privées en Tunisie | Africana",
      description: "Excursions privées en Tunisie : Cap Bon, Kairouan, El Jem, Tunis, Carthage, Sidi Bou Saïd, Dougga, Friguia. Véhicule + chauffeur dédié.",
      keywords: "excursions tunisie, visite kairouan, tour carthage, sidi bou said, friguia park",
    },
    EN: {
      title: "Private Excursions in Tunisia | Africana",
      description: "Private excursions in Tunisia: Cap Bon, Kairouan, El Jem, Tunis, Carthage, Sidi Bou Said, Dougga, Friguia. Dedicated vehicle & driver.",
      keywords: "tunisia excursions, kairouan tour, carthage tour, sidi bou said, friguia park",
    },
    IT: {
      title: "Escursioni Private in Tunisia | Africana",
      description: "Escursioni private in Tunisia: Cap Bon, Kairouan, El Jem, Tunisi, Cartagine, Sidi Bou Said, Dougga, Friguia. Veicolo e autista dedicato.",
      keywords: "escursioni tunisia, tour kairouan, tour cartagine, sidi bou said, friguia park",
    },
    DE: {
      title: "Private Ausflüge in Tunesien | Africana",
      description: "Private Ausflüge in Tunesien: Cap Bon, Kairouan, El Jem, Tunis, Karthago, Sidi Bou Said, Dougga, Friguia. Eigenes Fahrzeug & Fahrer.",
      keywords: "tunesien ausflüge, kairouan tour, karthago tour, sidi bou said, friguia park",
    },
    ES: {
      title: "Excursiones Privadas en Túnez | Africana",
      description: "Excursiones privadas en Túnez: Cap Bon, Kairouan, El Jem, Túnez, Cartago, Sidi Bou Said, Dougga, Friguia. Vehículo y conductor dedicado.",
      keywords: "excursiones tunez, tour kairouan, tour cartago, sidi bou said, friguia park",
    },
    AR: {
      title: "رحلات خاصة في تونس | أفريكانا",
      description: "رحلات خاصة في تونس: الوطن القبلي، القيروان، الجم، تونس، قرطاج، سيدي بوسعيد، دڨة، فريقية. سيارة وسائق مخصص.",
      keywords: "رحلات تونس, جولة قرطاج, جولة القيروان, سيدي بوسعيد",
    },
  },
  pricing: {
    FR: {
      title: "Tarifs Transferts Tunisie - Prix Fixes | Africana",
      description: "Grille tarifaire transparente : prix fixes par trajet et véhicule (hatchback, berline, monospace). Aucun supplément, taxes incluses.",
      keywords: "tarifs transfert tunisie, prix taxi aéroport, tarif vtc hammamet",
    },
    EN: {
      title: "Tunisia Transfer Rates - Fixed Prices | Africana",
      description: "Transparent rate sheet: fixed prices per route and vehicle (hatchback, sedan, minivan). No extras, all taxes included.",
      keywords: "tunisia transfer prices, airport taxi rates, hammamet chauffeur fares",
    },
    IT: {
      title: "Tariffe Trasferimenti Tunisia - Prezzi Fissi | Africana",
      description: "Listino trasparente: prezzi fissi per tratta e veicolo (hatchback, berlina, monovolume). Nessun supplemento, tasse incluse.",
      keywords: "tariffe trasferimento tunisia, prezzo taxi aeroporto, tariffe ncc hammamet",
    },
    DE: {
      title: "Transfer-Tarife Tunesien - Festpreise | Africana",
      description: "Transparente Preisliste: Festpreise pro Strecke und Fahrzeug (Hatchback, Limousine, Van). Keine Aufschläge, alle Steuern inklusive.",
      keywords: "tunesien transfer preise, flughafen taxi tarife, hammamet fahrer kosten",
    },
    ES: {
      title: "Tarifas Traslados Túnez - Precios Fijos | Africana",
      description: "Tabla tarifaria transparente: precios fijos por trayecto y vehículo (hatchback, berlina, monovolumen). Sin extras, impuestos incluidos.",
      keywords: "tarifas traslado tunez, precio taxi aeropuerto, tarifas chofer hammamet",
    },
    AR: {
      title: "أسعار النقل في تونس - أسعار ثابتة | أفريكانا",
      description: "جدول أسعار شفاف: أسعار ثابتة لكل مسار ومركبة. بدون رسوم إضافية، الضرائب مشمولة.",
      keywords: "أسعار نقل تونس, تعرفة تاكسي مطار, أسعار سائق",
    },
  },
  contact: {
    FR: {
      title: "Contact Africana Tunisie | +216 27 906 446",
      description: "Contactez Africana Tunisie 24/7 : téléphone, WhatsApp, email. Notre équipe vous répond sous 24h.",
      keywords: "contact africana tunisie, téléphone taxi tunis, whatsapp transfert",
    },
    EN: {
      title: "Contact Africana Tunisia | +216 27 906 446",
      description: "Contact Africana Tunisia 24/7: phone, WhatsApp, email. Our team replies within 24h.",
      keywords: "contact africana tunisia, phone taxi tunis, whatsapp transfer",
    },
    IT: {
      title: "Contatti Africana Tunisia | +216 27 906 446",
      description: "Contatta Africana Tunisia 24/7: telefono, WhatsApp, email. Il nostro team risponde entro 24h.",
      keywords: "contatti africana tunisia, telefono taxi tunisi, whatsapp trasferimento",
    },
    DE: {
      title: "Kontakt Africana Tunesien | +216 27 906 446",
      description: "Kontaktieren Sie Africana Tunesien 24/7: Telefon, WhatsApp, E-Mail. Antwort innerhalb von 24 Std.",
      keywords: "kontakt africana tunesien, telefon taxi tunis, whatsapp transfer",
    },
    ES: {
      title: "Contacto Africana Túnez | +216 27 906 446",
      description: "Contacta con Africana Túnez 24/7: teléfono, WhatsApp, email. Nuestro equipo responde en 24h.",
      keywords: "contacto africana tunez, teléfono taxi tunez, whatsapp traslado",
    },
    AR: {
      title: "اتصل بأفريكانا تونس | 446 906 27 216+",
      description: "تواصل مع أفريكانا تونس 24/7: الهاتف، واتساب، البريد الإلكتروني. فريقنا يرد خلال 24 ساعة.",
      keywords: "اتصال أفريكانا تونس, هاتف تاكسي, واتساب",
    },
  },
};

const SeoHead = ({ page, lang, title, description, schema }: Props) => {
  const meta = META[page][lang];
  const finalTitle = title ?? meta.title;
  const finalDesc = description ?? meta.description;
  const canonical = `${ORIGIN}${buildPath(lang, page)}`;

  // hreflang map (canonical for each lang + x-default → FR)
  const alternates = SUPPORTED_LANGS.map((l) => ({
    lang: l.toLowerCase(),
    href: `${ORIGIN}${buildPath(l, page)}`,
  }));

  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <html lang={lang.toLowerCase()} dir={lang === "AR" ? "rtl" : "ltr"} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={meta.keywords} />
      <link rel="canonical" href={canonical} />
      {alternates.map((a) => (
        <link key={a.lang} rel="alternate" hrefLang={a.lang} href={a.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${ORIGIN}${buildPath("FR", page)}`} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={lang === "AR" ? "ar_TN" : `${lang.toLowerCase()}_${lang === "EN" ? "GB" : lang}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
};

export default SeoHead;
