import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import {
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  ArrowLeft,
  Users,
  Baby,
  Briefcase,
  User,
  Phone,
  Mail,
  Plane,
  MessageSquare,
  ChevronLeft,
  ArrowUpDown,
  Sparkles,
  CreditCard,
  Banknote,
  ShieldCheck,
} from "lucide-react";
import Dust from "@/components/africana/Dust";
import CsvLocationPicker from "@/components/africana/CsvLocationPicker";
import { isRTL } from "@/i18n/translations";
import type { Lang, Translation } from "@/i18n/types";
import sidiBouSaidHero from "@/assets/sidi-bou-said-hero.jpg";
import { findRoute, type VehicleKind } from "@/data/transfers";
import { useBookingDraft } from "@/context/BookingContext";
import carHatchback from "@/assets/car-hatchback.jpg";
import carBerline from "@/assets/car-berline.jpg";
import carMonospace from "@/assets/car-monospace.jpg";

/* ---------- shared visual tokens ---------- */
const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontFamily: "var(--font-body)",
  fontSize: "16px",
  fontWeight: 700,
  color: "hsl(var(--ink))",
  marginBottom: "10px",
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 14px",
  background: "#fff",
  border: "1px solid hsl(var(--border))",
  borderRadius: "10px",
  color: "hsl(var(--ink))",
  fontFamily: "var(--font-body)",
  fontSize: "17px",
  fontWeight: 600,
  outline: "none",
};
const inputErrStyle: React.CSSProperties = {
  ...inputStyle,
  border: "1px solid hsl(var(--destructive))",
};
const errMsgStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "hsl(var(--destructive))",
  marginTop: "4px",
  fontFamily: "var(--font-body)",
  fontWeight: 600,
};

/* ---------- micro-i18n ---------- */
type L = Lang;
const tr = (lang: L, fr: string, en: string, de: string, es: string, ar: string) =>
  ({ FR: fr, EN: en, DE: de, ES: es, AR: ar }[lang] ?? en);

/* ---------- vehicles ---------- */
type CarType = VehicleKind;
type CarDef = {
  id: CarType;
  image: string;
  maxPax: number;
  maxBags: number;
  basePriceEUR: number;
};
const CARS: CarDef[] = [
  { id: "hatchback", image: carHatchback, maxPax: 3, maxBags: 3, basePriceEUR: 30 },
  { id: "berline", image: carBerline, maxPax: 4, maxBags: 4, basePriceEUR: 35 },
  { id: "monospace", image: carMonospace, maxPax: 8, maxBags: 8, basePriceEUR: 44 },
];
const carName = (lang: L, id: CarType) =>
  ({
    hatchback: tr(lang, "Hatchback", "Hatchback", "Hatchback", "Hatchback", "هاتشباك"),
    berline: tr(lang, "Berline", "Sedan", "Limousine", "Berlina", "سيدان"),
    monospace: tr(lang, "Monospace", "Minivan", "Minivan", "Monovolumen", "مونوسباس"),
  }[id]);
const carDesc = (lang: L, id: CarType) =>
  ({
    hatchback: tr(lang, "3 passagers · 3 bagages", "3 passengers · 3 bags", "3 Passagiere · 3 Gepäck", "3 pasajeros · 3 maletas", "3 ركاب · 3 أمتعة"),
    berline: tr(lang, "4 passagers · 4 bagages", "4 passengers · 4 bags", "4 Passagiere · 4 Gepäck", "4 pasajeros · 4 maletas", "4 ركاب · 4 أمتعة"),
    monospace: tr(lang, "8 passagers · 8 bagages", "8 passengers · 8 bags", "8 Passagiere · 8 Gepäck", "8 pasajeros · 8 maletas", "8 ركاب · 8 أمتعة"),
  }[id]);

const currencyFor = (lang: L) => (lang === "EN" ? { code: "GBP", symbol: "£", rate: 0.86 } : { code: "EUR", symbol: "€", rate: 1 });
const fmtPrice = (lang: L, eur: number) => {
  const c = currencyFor(lang);
  return `${Math.round(eur * c.rate)}${c.symbol}`;
};

/* ---------- form types ---------- */
type Step1 = {
  departure: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  adults: number;
  children: number;
  infants: number;
  bags: number;
};
type PaymentMethod = "cash" | "online";
type Step2Form = {
  carType: CarType | "";
  payment: PaymentMethod;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  flightNumber: string;
  notes: string;
};

/** earliest valid datetime = now + 4 hours */
const minDateTime = () => new Date(Date.now() + 4 * 60 * 60 * 1000);

type Props = { lang: Lang; t: Translation };

const BookingPage = ({ lang, t }: Props) => {
  const dir = isRTL(lang) ? "rtl" : "ltr";
  const { draft, setDraft } = useBookingDraft();
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const [s1, setS1] = useState<Step1>({
    departure: draft.departure,
    destination: draft.destination,
    departureDate: draft.departureDate,
    departureTime: draft.departureTime,
    adults: 1,
    children: 0,
    infants: 0,
    bags: 0,
  });
  const [s2, setS2] = useState<Step2Form>({
    carType: "",
    payment: "cash",
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    flightNumber: "",
    notes: "",
  });
  const [errs1, setErrs1] = useState<Record<string, string>>({});
  const [errs2, setErrs2] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // keep draft in sync (so back-and-forth retains state)
  useEffect(() => {
    setDraft({
      departure: s1.departure,
      destination: s1.destination,
      departureDate: s1.departureDate,
      departureTime: s1.departureTime,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s1.departure, s1.destination, s1.departureDate, s1.departureTime]);

  const totalPax = s1.adults + s1.children;
  const tooMany = totalPax > 8;

  const route = useMemo(
    () => (s1.departure && s1.destination ? findRoute(s1.departure, s1.destination) : undefined),
    [s1.departure, s1.destination]
  );
  const priceFor = (id: CarType): number =>
    route?.prices[id] ?? CARS.find((c) => c.id === id)!.basePriceEUR;

  /* zod schema (step 1: full trip + passengers + 4h advance) */
  const step1Schema = useMemo(() => {
    const min4hMsg = tr(
      lang,
      "Réservation possible 4h à l'avance minimum.",
      "Booking must be at least 4 hours in advance.",
      "Buchung mindestens 4 Std. im Voraus.",
      "Reserva con al menos 4h de antelación.",
      "يجب الحجز قبل 4 ساعات على الأقل."
    );
    return z
      .object({
        departure: z.string().trim().min(2, tr(lang, "Lieu de départ requis", "Pickup is required", "Abfahrt erforderlich", "Lugar de salida requerido", "نقطة الانطلاق مطلوبة")),
        destination: z.string().trim().min(2, tr(lang, "Destination requise", "Destination is required", "Ziel erforderlich", "Destino requerido", "الوجهة مطلوبة")),
        departureDate: z.string().min(1, tr(lang, "Date requise", "Date is required", "Datum erforderlich", "Fecha requerida", "التاريخ مطلوب")),
        departureTime: z.string().min(1, tr(lang, "Heure requise", "Time is required", "Uhrzeit erforderlich", "Hora requerida", "الوقت مطلوب")),
        adults: z.number().min(1),
        children: z.number().min(0),
        infants: z.number().min(0),
        bags: z.number().min(0),
      })
      .refine(
        (v) => {
          if (!v.departureDate || !v.departureTime) return true;
          const dt = new Date(`${v.departureDate}T${v.departureTime}`);
          return dt.getTime() >= minDateTime().getTime();
        },
        { message: min4hMsg, path: ["departureTime"] }
      );
  }, [lang]);

  const step2Schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t.err_name_short).max(100),
        phone: z
          .string()
          .trim()
          .min(6, t.err_phone)
          .max(30)
          .regex(/^[\d\s+()-]+$/, t.err_phone),
        whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
        email: z.string().trim().email(t.err_email).max(255).optional().or(z.literal("")),
        flightNumber: z.string().trim().max(20).optional().or(z.literal("")),
        notes: z.string().trim().max(500).optional().or(z.literal("")),
      }),
    [t]
  );

  /* auto-pick smallest fitting vehicle when entering step 2 */
  useEffect(() => {
    if (step !== 2) return;
    if (s2.carType) return;
    const fit = CARS.find((c) => c.maxPax >= totalPax && c.maxBags >= s1.bags);
    if (fit) setS2((p) => ({ ...p, carType: fit.id }));
  }, [step, totalPax, s1.bags, s2.carType]);

  // Step 0 (trip) → Step 1 (passengers)
  const goStep0Next = () => {
    const tripSchema = z
      .object({
        departure: z.string().trim().min(2, tr(lang, "Lieu de départ requis", "Pickup is required", "Abfahrt erforderlich", "Lugar de salida requerido", "نقطة الانطلاق مطلوبة")),
        destination: z.string().trim().min(2, tr(lang, "Destination requise", "Destination is required", "Ziel erforderlich", "Destino requerido", "الوجهة مطلوبة")),
        departureDate: z.string().min(1, tr(lang, "Date requise", "Date is required", "Datum erforderlich", "Fecha requerida", "التاريخ مطلوب")),
        departureTime: z.string().min(1, tr(lang, "Heure requise", "Time is required", "Uhrzeit erforderlich", "Hora requerida", "الوقت مطلوب")),
      })
      .refine(
        (v) => {
          if (!v.departureDate || !v.departureTime) return true;
          const dt = new Date(`${v.departureDate}T${v.departureTime}`);
          return dt.getTime() >= minDateTime().getTime();
        },
        {
          message: tr(lang, "Réservation possible 4h à l'avance minimum.", "Booking must be at least 4 hours in advance.", "Buchung mindestens 4 Std. im Voraus.", "Reserva con al menos 4h de antelación.", "يجب الحجز قبل 4 ساعات على الأقل."),
          path: ["departureTime"],
        }
      );
    const r = tripSchema.safeParse({
      departure: s1.departure,
      destination: s1.destination,
      departureDate: s1.departureDate,
      departureTime: s1.departureTime,
    });
    if (!r.success) {
      const e: Record<string, string> = {};
      r.error.issues.forEach((i) => {
        const k = i.path[0] as string;
        if (!e[k]) e[k] = i.message;
      });
      setErrs1(e);
      return;
    }
    setErrs1({});
    setStep(1);
  };

  // Step 1 (passengers) → Step 2 (vehicle/payment/info)
  const goStep1Next = () => {
    if (tooMany) {
      toast.error(tr(lang, "Maximum 8 passagers", "Maximum 8 passengers", "Max. 8 Passagiere", "Máx. 8 pasajeros", "الحد الأقصى 8 ركاب"));
      return;
    }
    const r = step1Schema.safeParse(s1);
    if (!r.success) {
      const e: Record<string, string> = {};
      r.error.issues.forEach((i) => {
        const k = i.path[0] as string;
        if (!e[k]) e[k] = i.message;
      });
      setErrs1(e);
      return;
    }
    setErrs1({});
    setStep(2);
  };

  const handleSubmit = async () => {
    const r = step2Schema.safeParse(s2);
    if (!r.success) {
      const e: Record<string, string> = {};
      r.error.issues.forEach((i) => {
        const k = i.path[0] as string;
        if (!e[k]) e[k] = i.message;
      });
      setErrs2(e);
      return;
    }
    if (!s2.carType) return;
    setErrs2({});
    setSubmitting(true);
    try {
      await new Promise((ok) => setTimeout(ok, 1400));
      toast.success(
        tr(lang, "Réservation confirmée ✓", "Booking confirmed ✓", "Buchung bestätigt ✓", "Reserva confirmada ✓", "تم تأكيد الحجز ✓"),
        {
          description:
            s2.payment === "online"
              ? tr(lang, "Vous serez redirigé pour le paiement.", "You'll be redirected to payment.", "Sie werden zur Zahlung weitergeleitet.", "Será redirigido al pago.", "ستتم إعادة توجيهك إلى الدفع.")
              : tr(lang, "Payez en cash directement au chauffeur.", "Pay cash directly to the driver.", "Bar beim Fahrer bezahlen.", "Pague en efectivo al conductor.", "ادفع نقدًا مباشرة للسائق."),
        }
      );
      setStep(0);
      setS1({ departure: "", destination: "", departureDate: "", departureTime: "", adults: 1, children: 0, infants: 0, bags: 0 });
      setS2({ carType: "", payment: "cash", name: "", phone: "", whatsapp: "", email: "", flightNumber: "", notes: "" });
    } catch {
      toast.error(tr(lang, "Échec de l'envoi", "Submission failed", "Übermittlung fehlgeschlagen", "Error al enviar", "فشل الإرسال"));
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabels = [
    tr(lang, "Trajet & Passagers", "Trip & Passengers", "Fahrt & Passagiere", "Trayecto y Pasajeros", "الرحلة والركاب"),
    tr(lang, "Véhicule, Paiement & Infos", "Vehicle, Payment & Info", "Fahrzeug, Zahlung & Info", "Vehículo, Pago e Info", "السيارة والدفع والمعلومات"),
  ];

  // duration formatter: "Xh Ymin" when ≥ 60 min, else "Y min"
  const fmtDuration = (mins: number) => {
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const hLabel = tr(lang, "h", "h", "Std.", "h", "س");
    const mLabel = tr(lang, "min", "min", "Min.", "min", "د");
    return m === 0 ? `${h} ${hLabel}` : `${h} ${hLabel} ${m} ${mLabel}`;
  };

  // for the date input min
  const min = useMemo(() => {
    const d = minDateTime();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  return (
    <div dir={dir} style={{ background: "hsl(var(--background))", minHeight: "100vh" }}>
      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          padding: "96px 16px 64px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${sidiBouSaidHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.08) 35%, rgba(255,255,255,0.55) 100%)",
            zIndex: 1,
          }}
        />
        <Dust />

        {/* promo banner removed to optimize top space */}

        {/* card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "720px",
            background: "#fff",
            borderRadius: "24px",
            boxShadow: "0 30px 70px -20px rgba(11,26,47,0.45), 0 10px 24px -10px rgba(0,0,0,0.18)",
            overflow: "hidden",
            textAlign: "left",
            border: "1px solid hsl(var(--border-gold))",
          }}
        >
          {/* card header */}
          <div
            style={{
              background: "linear-gradient(135deg, hsl(var(--ink)) 0%, hsl(var(--ink-soft)) 100%)",
              padding: "20px 24px 18px",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 160,
                height: 160,
                background: "radial-gradient(circle, hsl(var(--gold) / 0.25) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "6px", padding: "4px 10px", borderRadius: "999px", background: "rgba(212,175,55,0.12)", border: "1px solid hsl(var(--gold) / 0.4)" }}>
              <Sparkles size={12} style={{ color: "hsl(var(--gold))" }} />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "1.5px",
                  color: "hsl(var(--gold))",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {tr(lang, "Résa Express", "Express", "Express", "Express", "حجز سريع")}
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 500, margin: 0, lineHeight: 1.2 }}>
              {stepLabels[step]}
            </h2>

            {/* segmented progress */}
            <div style={{ marginTop: "16px", display: "flex", gap: "6px", alignItems: "center" }}>
              {[0, 1].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: "4px",
                    borderRadius: "999px",
                    background:
                      step >= i
                        ? "linear-gradient(90deg,hsl(var(--gold)),hsl(var(--gold-light)))"
                        : "rgba(255,255,255,0.15)",
                    transition: "background .3s",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "1px",
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: step === 0 ? "hsl(var(--gold))" : undefined, fontWeight: step === 0 ? 700 : 500 }}>
                01 · {tr(lang, "Trajet", "Trip", "Fahrt", "Viaje", "الرحلة")}
              </span>
              <span style={{ color: step === 1 ? "hsl(var(--gold))" : undefined, fontWeight: step === 1 ? 700 : 500 }}>
                02 · {tr(lang, "Véhicule", "Vehicle", "Auto", "Auto", "السيارة")}
              </span>
            </div>
          </div>

          <div style={{ padding: "28px 24px 30px" }}>
            <AnimatePresence mode="wait">
              {/* ===================== STEP 1: trip + passengers ===================== */}
              {step === 0 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  {/* one-way badge */}
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 16px",
                        borderRadius: "999px",
                        background: "rgba(212,175,55,0.10)",
                        border: "1px solid hsl(var(--border-gold))",
                      }}
                    >
                      <ArrowRight size={14} style={{ color: "hsl(var(--gold))" }} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2.5px", color: "hsl(var(--ink))", fontWeight: 700, textTransform: "uppercase" }}>
                        {tr(lang, "Aller simple", "One way", "Einfache Fahrt", "Solo ida", "ذهاب فقط")}
                      </span>
                    </div>
                  </div>

                  {/* dep + dest with swap */}
                  <div style={{ position: "relative", marginBottom: "18px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
                      <div>
                        <label htmlFor="dep" style={labelStyle}>
                          <MapPin size={16} style={{ color: "hsl(var(--gold))" }} />
                          {tr(lang, "Lieu de départ *", "Pickup location *", "Abfahrtsort *", "Lugar de recogida *", "نقطة الانطلاق *")}
                        </label>
                        <CsvLocationPicker
                          id="dep"
                          value={s1.departure}
                          onChange={(v) => setS1((p) => ({ ...p, departure: v }))}
                          placeholder={tr(lang, "Ex: Aéroport Tunis-Carthage", "Ex: Tunis-Carthage Airport", "Z. B. Flughafen Tunis-Karthago", "Ej: Aeropuerto Túnez-Cartago", "مثال: مطار تونس قرطاج")}
                          ariaLabel="Pickup location"
                          excludeName={s1.destination}
                        />
                        {errs1.departure && <div style={errMsgStyle}>{errs1.departure}</div>}
                      </div>
                      <div>
                        <label htmlFor="dest" style={labelStyle}>
                          <MapPin size={16} style={{ color: "hsl(var(--gold))" }} />
                          {tr(lang, "Destination *", "Destination *", "Ziel *", "Destino *", "الوجهة *")}
                        </label>
                        <CsvLocationPicker
                          id="dest"
                          value={s1.destination}
                          onChange={(v) => setS1((p) => ({ ...p, destination: v }))}
                          placeholder={tr(lang, "Ex: Hammamet", "Ex: Hammamet", "Z. B. Hammamet", "Ej: Hammamet", "مثال: الحمامات")}
                          ariaLabel="Destination"
                          excludeName={s1.departure}
                        />
                        {errs1.destination && <div style={errMsgStyle}>{errs1.destination}</div>}
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label={tr(lang, "Inverser", "Swap", "Tauschen", "Intercambiar", "بدّل")}
                      onClick={() => setS1((p) => ({ ...p, departure: p.destination, destination: p.departure }))}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "#fff",
                        border: "1px solid hsl(var(--border-gold))",
                        boxShadow: "0 4px 14px -4px rgba(11,26,47,0.25)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "hsl(var(--gold))",
                        zIndex: 5,
                      }}
                    >
                      <ArrowUpDown size={16} />
                    </button>
                  </div>

                  {/* date / time */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "10px" }}>
                    <div>
                      <label htmlFor="dep-date" style={labelStyle}>
                        <CalendarIcon size={16} style={{ color: "hsl(var(--gold))" }} />
                        {tr(lang, "Date *", "Date *", "Datum *", "Fecha *", "التاريخ *")}
                      </label>
                      <input
                        id="dep-date"
                        type="date"
                        min={min}
                        value={s1.departureDate}
                        onChange={(e) => setS1((p) => ({ ...p, departureDate: e.target.value }))}
                        style={errs1.departureDate ? inputErrStyle : inputStyle}
                      />
                      {errs1.departureDate && <div style={errMsgStyle}>{errs1.departureDate}</div>}
                    </div>
                    <div>
                      <label htmlFor="dep-time" style={labelStyle}>
                        <Clock size={16} style={{ color: "hsl(var(--gold))" }} />
                        {tr(lang, "Heure *", "Time *", "Uhrzeit *", "Hora *", "الوقت *")}
                      </label>
                      <input
                        id="dep-time"
                        type="time"
                        value={s1.departureTime}
                        onChange={(e) => setS1((p) => ({ ...p, departureTime: e.target.value }))}
                        style={errs1.departureTime ? inputErrStyle : inputStyle}
                      />
                      {errs1.departureTime && <div style={errMsgStyle}>{errs1.departureTime}</div>}
                    </div>
                  </div>

                  <p style={{ fontSize: "12px", color: "hsl(var(--text-muted))", marginBottom: "18px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ShieldCheck size={14} style={{ color: "hsl(var(--gold))" }} />
                    {tr(lang, "Réservation possible 4h à l'avance minimum.", "Booking must be at least 4 hours in advance.", "Buchung mindestens 4 Std. im Voraus.", "Reserva con al menos 4h de antelación.", "يجب الحجز قبل 4 ساعات على الأقل.")}
                  </p>

                  {/* passengers (merged from old step 2) */}
                  <div style={{ borderTop: "1px solid hsl(var(--border))", paddingTop: "20px", marginBottom: "16px" }}>
                    <div style={{ ...labelStyle, marginBottom: "12px" }}>
                      <Users size={16} style={{ color: "hsl(var(--gold))" }} />
                      {tr(lang, "Passagers & bagages", "Passengers & luggage", "Passagiere & Gepäck", "Pasajeros y equipaje", "الركاب والأمتعة")}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {(
                        [
                          { k: "adults", icon: <Users size={14} style={{ color: "hsl(var(--gold))" }} />, l: tr(lang, "Adultes", "Adults", "Erwachsene", "Adultos", "بالغون"), min: 1, max: 20 },
                          { k: "children", icon: <Users size={14} style={{ color: "hsl(var(--gold))" }} />, l: tr(lang, "Enfants (2–12)", "Children (2–12)", "Kinder (2–12)", "Niños (2–12)", "أطفال (2–12)"), min: 0, max: 20 },
                          { k: "infants", icon: <Baby size={14} style={{ color: "hsl(var(--gold))" }} />, l: tr(lang, "Bébés (0–2)", "Infants (0–2)", "Babys (0–2)", "Bebés (0–2)", "رضّع (0–2)"), min: 0, max: 10 },
                          { k: "bags", icon: <Briefcase size={14} style={{ color: "hsl(var(--gold))" }} />, l: tr(lang, "Bagages", "Luggage", "Gepäck", "Equipaje", "أمتعة"), min: 0, max: 20 },
                        ] as const
                      ).map((f) => (
                        <div key={f.k}>
                          <label htmlFor={`f-${f.k}`} style={{ ...labelStyle, fontSize: "13px" }}>
                            {f.icon}
                            {f.l}
                          </label>
                          <input
                            id={`f-${f.k}`}
                            type="number"
                            min={f.min}
                            max={f.max}
                            value={s1[f.k]}
                            onChange={(e) => {
                              const n = Math.max(f.min, Math.min(f.max, parseInt(e.target.value || "0", 10)));
                              setS1((p) => ({ ...p, [f.k]: n }));
                            }}
                            style={inputStyle}
                          />
                        </div>
                      ))}
                    </div>
                    {tooMany && (
                      <div
                        style={{
                          background: "hsl(var(--destructive) / 0.08)",
                          border: "1px solid hsl(var(--destructive))",
                          color: "hsl(var(--destructive))",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          marginTop: "12px",
                        }}
                      >
                        {tr(
                          lang,
                          "Maximum 8 passagers (adultes + enfants).",
                          "Maximum 8 passengers (adults + children).",
                          "Maximal 8 Passagiere (Erwachsene + Kinder).",
                          "Máximo 8 pasajeros (adultos + niños).",
                          "الحد الأقصى 8 ركاب (بالغون + أطفال)."
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    className="shimmer-btn"
                    onClick={goStep1Next}
                    style={{
                      width: "100%",
                      padding: "18px",
                      background: "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "hsl(var(--ink))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      boxShadow: "0 10px 24px -8px rgba(212,175,55,0.55)",
                    }}
                  >
                    {tr(lang, "Voir les véhicules", "See vehicles", "Fahrzeuge anzeigen", "Ver vehículos", "اعرض السيارات")}
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* ===================== STEP 2: vehicle + payment + info ===================== */}
              {step === 1 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  {/* trip summary — descriptive, bigger fonts, details listed under */}
                  <div
                    style={{
                      background: "linear-gradient(180deg, hsl(var(--bg-surface)) 0%, #fff 100%)",
                      border: "1px solid hsl(var(--border-gold))",
                      borderRadius: "16px",
                      padding: "20px 22px",
                      marginBottom: "24px",
                      textAlign: dir === "rtl" ? "right" : "left",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", gap: "10px", flexDirection: dir === "rtl" ? "row-reverse" : "row" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "2.5px", color: "hsl(var(--gold))", fontWeight: 700, textTransform: "uppercase" }}>
                        {tr(lang, "Récapitulatif du trajet", "Trip summary", "Fahrtübersicht", "Resumen del viaje", "ملخص الرحلة")}
                      </div>
                      <button
                        onClick={() => setStep(0)}
                        style={{ background: "transparent", border: "none", cursor: "pointer", color: "hsl(var(--ink))", fontSize: "15px", display: "flex", alignItems: "center", gap: "4px", fontWeight: 700 }}
                      >
                        <ChevronLeft size={16} />
                        {tr(lang, "Modifier", "Edit", "Ändern", "Modificar", "تعديل")}
                      </button>
                    </div>

                    {/* Headline route line */}
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(20px, 4vw, 26px)",
                        fontWeight: 600,
                        color: "hsl(var(--ink))",
                        lineHeight: 1.3,
                        marginBottom: "12px",
                      }}
                    >
                      {dir === "rtl" ? `${s1.destination || "—"} ← ${s1.departure || "—"}` : `${s1.departure || "—"} → ${s1.destination || "—"}`}
                    </div>

                    {/* Details listed under */}
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "8px" }}>
                      <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", color: "hsl(var(--ink))", fontWeight: 500, flexDirection: dir === "rtl" ? "row-reverse" : "row" }}>
                        <CalendarIcon size={18} style={{ color: "hsl(var(--gold))", flexShrink: 0 }} />
                        <span>
                          <strong style={{ fontWeight: 700 }}>{tr(lang, "Date", "Date", "Datum", "Fecha", "التاريخ")} :</strong> {s1.departureDate || "—"}
                          {" · "}
                          <strong style={{ fontWeight: 700 }}>{tr(lang, "Heure", "Time", "Uhrzeit", "Hora", "الوقت")} :</strong> {s1.departureTime || "—"}
                        </span>
                      </li>
                      <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", color: "hsl(var(--ink))", fontWeight: 500, flexDirection: dir === "rtl" ? "row-reverse" : "row" }}>
                        <Users size={18} style={{ color: "hsl(var(--gold))", flexShrink: 0 }} />
                        <span>
                          <strong style={{ fontWeight: 700 }}>{totalPax}</strong> {tr(lang, "passagers", "passengers", "Passagiere", "pasajeros", "ركاب")}
                          {s1.infants ? <> · <strong style={{ fontWeight: 700 }}>{s1.infants}</strong> {tr(lang, "bébés", "infants", "Babys", "bebés", "رضّع")}</> : null}
                          {" · "}
                          <strong style={{ fontWeight: 700 }}>{s1.bags}</strong> {tr(lang, "bagages", "luggage", "Gepäck", "equipaje", "أمتعة")}
                        </span>
                      </li>
                      {route ? (
                        <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", color: "hsl(var(--ink))", fontWeight: 500, flexDirection: dir === "rtl" ? "row-reverse" : "row" }}>
                          <MapPin size={18} style={{ color: "hsl(var(--gold))", flexShrink: 0 }} />
                          <span>
                            <strong style={{ fontWeight: 700 }}>{route.distance_km} km</strong> · {tr(lang, "environ", "around", "ca.", "aprox.", "حوالي")} <strong style={{ fontWeight: 700 }}>{fmtDuration(route.duration_min)}</strong>
                          </span>
                        </li>
                      ) : (
                        <li
                          style={{
                            marginTop: "4px",
                            padding: "12px 14px",
                            borderRadius: "10px",
                            background: "rgba(212,175,55,0.10)",
                            border: "1px dashed hsl(var(--gold))",
                            fontSize: "15px",
                            color: "hsl(var(--ink))",
                            lineHeight: 1.55,
                            fontWeight: 500,
                          }}
                        >
                          ⚠ {tr(
                            lang,
                            "Ce trajet n'a pas de tarif fixe. Envoyez la demande, nous vous confirmons un devis sur mesure.",
                            "This route has no fixed rate. Submit your request and we'll confirm a tailored quote.",
                            "Für diese Strecke gibt es keinen Festpreis. Senden Sie die Anfrage, wir bestätigen ein individuelles Angebot.",
                            "Esta ruta no tiene tarifa fija. Envíe la solicitud y le confirmaremos un presupuesto a medida.",
                            "هذا المسار ليس له سعر ثابت. أرسل طلبك وسنؤكد لك عرض سعر مخصص."
                          )}
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* vehicle picker (with photos) */}
                  <div style={{ ...labelStyle, marginBottom: "12px", fontSize: "15px" }}>
                    {tr(lang, "Choisissez votre véhicule", "Choose your vehicle", "Wählen Sie Ihr Fahrzeug", "Elija su vehículo", "اختر سيارتك")}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "24px" }}>
                    {CARS.map((c) => {
                      const fits = c.maxPax >= totalPax && c.maxBags >= s1.bags;
                      const sel = s2.carType === c.id;
                      const bothFilled = !!(s1.departure && s1.destination);
                      const unavailablePair = bothFilled && !route;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          disabled={!fits}
                          onClick={() => fits && setS2((p) => ({ ...p, carType: c.id }))}
                          style={{
                            padding: 0,
                            borderRadius: "14px",
                            border: sel ? "2px solid hsl(var(--gold))" : "2px solid hsl(var(--border))",
                            background: sel ? "rgba(212,175,55,0.08)" : "#fff",
                            cursor: fits ? "pointer" : "not-allowed",
                            opacity: fits ? 1 : 0.4,
                            textAlign: "center",
                            transition: "all .2s",
                            boxShadow: sel ? "0 6px 18px -4px rgba(212,175,55,0.45)" : "0 2px 8px -4px rgba(0,0,0,0.1)",
                            overflow: "hidden",
                          }}
                        >
                          <div style={{ aspectRatio: "16/10", background: "hsl(var(--bg-surface))", overflow: "hidden" }}>
                            <img src={c.image} alt={carName(lang, c.id)} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          </div>
                          <div style={{ padding: "12px 10px 14px" }}>
                            <div style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 500, color: "hsl(var(--ink))" }}>{carName(lang, c.id)}</div>
                            <div style={{ fontSize: "12px", color: "hsl(var(--text-muted))", marginTop: "2px", lineHeight: 1.4 }}>{carDesc(lang, c.id)}</div>
                            {unavailablePair ? (
                              <div
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "10px",
                                  fontWeight: 700,
                                  letterSpacing: "1px",
                                  marginTop: "10px",
                                  padding: "4px 6px",
                                  borderRadius: "999px",
                                  background: "rgba(212,175,55,0.12)",
                                  color: "hsl(var(--gold))",
                                  border: "1px solid hsl(var(--border-gold))",
                                  display: "inline-block",
                                }}
                              >
                                {tr(lang, "SUR DEVIS", "ON QUOTE", "AUF ANFRAGE", "A CONSULTAR", "حسب الطلب")}
                              </div>
                            ) : (
                              <div style={{ fontFamily: "var(--font-body)", fontSize: "22px", fontWeight: 700, marginTop: "8px" }} className="gold-text">
                                {!route && (tr(lang, "dès", "from", "ab", "desde", "من") + " ")}{fmtPrice(lang, priceFor(c.id))}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* client form */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                    <div>
                      <label htmlFor="c-name" style={labelStyle}>
                        <User size={16} style={{ color: "hsl(var(--gold))" }} />
                        {tr(lang, "Nom complet *", "Full name *", "Vollständiger Name *", "Nombre completo *", "الاسم الكامل *")}
                      </label>
                      <input id="c-name" type="text" value={s2.name} maxLength={100} onChange={(e) => setS2((p) => ({ ...p, name: e.target.value }))} placeholder={t.name_ph} style={errs2.name ? inputErrStyle : inputStyle} />
                      {errs2.name && <div style={errMsgStyle}>{errs2.name}</div>}
                    </div>
                    <div>
                      <label htmlFor="c-phone" style={labelStyle}>
                        <Phone size={16} style={{ color: "hsl(var(--gold))" }} />
                        {tr(lang, "Téléphone *", "Phone *", "Telefon *", "Teléfono *", "الهاتف *")}
                      </label>
                      <input id="c-phone" type="tel" value={s2.phone} maxLength={30} onChange={(e) => setS2((p) => ({ ...p, phone: e.target.value }))} placeholder="+216 XX XXX XXX" style={errs2.phone ? inputErrStyle : inputStyle} />
                      {errs2.phone && <div style={errMsgStyle}>{errs2.phone}</div>}
                    </div>
                    <div>
                      <label htmlFor="c-wa" style={labelStyle}>
                        <Phone size={16} style={{ color: "hsl(var(--gold))" }} />
                        WhatsApp
                      </label>
                      <input id="c-wa" type="tel" value={s2.whatsapp} maxLength={30} onChange={(e) => setS2((p) => ({ ...p, whatsapp: e.target.value }))} placeholder="+216 XX XXX XXX" style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="c-email" style={labelStyle}>
                        <Mail size={16} style={{ color: "hsl(var(--gold))" }} />
                        Email
                      </label>
                      <input id="c-email" type="email" value={s2.email} maxLength={255} onChange={(e) => setS2((p) => ({ ...p, email: e.target.value }))} placeholder={t.email_ph} style={errs2.email ? inputErrStyle : inputStyle} />
                      {errs2.email && <div style={errMsgStyle}>{errs2.email}</div>}
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label htmlFor="c-flight" style={labelStyle}>
                        <Plane size={16} style={{ color: "hsl(var(--gold))" }} />
                        {tr(lang, "N° de vol", "Flight number", "Flugnummer", "Número de vuelo", "رقم الرحلة")}
                      </label>
                      <input id="c-flight" type="text" value={s2.flightNumber} maxLength={20} onChange={(e) => setS2((p) => ({ ...p, flightNumber: e.target.value }))} placeholder="TU123" style={inputStyle} />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label htmlFor="c-notes" style={labelStyle}>
                        <MessageSquare size={16} style={{ color: "hsl(var(--gold))" }} />
                        {tr(lang, "Commentaires", "Comments", "Kommentare", "Comentarios", "ملاحظات")}
                      </label>
                      <textarea id="c-notes" rows={3} value={s2.notes} maxLength={500} onChange={(e) => setS2((p) => ({ ...p, notes: e.target.value }))} placeholder={t.notes_ph} style={{ ...inputStyle, resize: "none" }} />
                    </div>
                  </div>

                  {/* payment selector — placed at the bottom of the last form, just before action buttons */}
                  <div style={{ borderTop: "1px solid hsl(var(--border))", paddingTop: "20px", marginBottom: "20px" }}>
                    <div style={{ ...labelStyle, marginBottom: "12px", fontSize: "16px" }}>
                      {tr(lang, "Mode de paiement", "Payment method", "Zahlungsart", "Método de pago", "طريقة الدفع")}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {([
                        { id: "cash" as const, icon: <Banknote size={20} />, t1: tr(lang, "Cash", "Cash", "Bar", "Efectivo", "نقدًا"), t2: tr(lang, "Au chauffeur", "To the driver", "An den Fahrer", "Al conductor", "للسائق") },
                        { id: "online" as const, icon: <CreditCard size={20} />, t1: tr(lang, "En ligne", "Online", "Online", "En línea", "عبر الإنترنت"), t2: tr(lang, "Carte sécurisée", "Secure card", "Sichere Karte", "Tarjeta segura", "بطاقة آمنة") },
                      ]).map((opt) => {
                        const sel = s2.payment === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setS2((p) => ({ ...p, payment: opt.id }))}
                            style={{
                              padding: "16px",
                              borderRadius: "14px",
                              border: sel ? "2px solid hsl(var(--gold))" : "2px solid hsl(var(--border))",
                              background: sel ? "rgba(212,175,55,0.08)" : "#fff",
                              cursor: "pointer",
                              textAlign: dir === "rtl" ? "right" : "left",
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              transition: "all .2s",
                              boxShadow: sel ? "0 6px 18px -4px rgba(212,175,55,0.4)" : "none",
                              flexDirection: dir === "rtl" ? "row-reverse" : "row",
                            }}
                          >
                            <div style={{ width: 48, height: 48, borderRadius: 12, background: "hsl(var(--ink))", color: "hsl(var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {opt.icon}
                            </div>
                            <div>
                              <div style={{ fontFamily: "var(--font-body)", fontSize: "17px", fontWeight: 700, color: "hsl(var(--ink))" }}>{opt.t1}</div>
                              <div style={{ fontSize: "13px", color: "hsl(var(--text-muted))", fontWeight: 500 }}>{opt.t2}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => setStep(0)}
                      style={{
                        flexShrink: 0,
                        padding: "16px 22px",
                        background: "#fff",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "hsl(var(--ink))",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <ArrowLeft size={16} />
                      {tr(lang, "Retour", "Back", "Zurück", "Atrás", "رجوع")}
                    </button>
                    <button
                      className="shimmer-btn"
                      onClick={handleSubmit}
                      disabled={submitting || !s2.carType}
                      style={{
                        flex: 1,
                        padding: "16px",
                        background: submitting || !s2.carType ? "hsl(var(--bg-surface))" : "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))",
                        border: "none",
                        borderRadius: "10px",
                        cursor: submitting || !s2.carType ? "not-allowed" : "pointer",
                        fontFamily: "var(--font-body)",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: submitting || !s2.carType ? "hsl(var(--text-muted))" : "hsl(var(--ink))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      {submitting && (
                        <span
                          style={{
                            width: "15px",
                            height: "15px",
                            border: "2px solid hsl(var(--ink))",
                            borderTopColor: "transparent",
                            borderRadius: "50%",
                            animation: "spin .8s linear infinite",
                          }}
                        />
                      )}
                      {submitting
                        ? tr(lang, "En cours…", "Submitting…", "Wird gesendet…", "Enviando…", "جارٍ الإرسال…")
                        : s2.payment === "online"
                        ? tr(lang, "Confirmer & payer", "Confirm & pay", "Bestätigen & zahlen", "Confirmar y pagar", "تأكيد ودفع")
                        : tr(lang, "Confirmer la réservation", "Confirm booking", "Buchung bestätigen", "Confirmar reserva", "تأكيد الحجز")}
                      {!submitting && <ArrowRight size={18} />}
                    </button>
                  </div>

                  <p style={{ fontSize: "12px", color: "hsl(var(--text-muted))", textAlign: "center", marginTop: "14px" }}>{t.secure}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default BookingPage;
