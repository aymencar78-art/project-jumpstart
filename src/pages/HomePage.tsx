import { motion } from "framer-motion";
import { MapPin, Calendar as CalendarIcon, Clock, ArrowRight, CreditCard, Banknote, ShieldCheck, Sparkles } from "lucide-react";
import Dust from "@/components/africana/Dust";
import CsvLocationPicker from "@/components/africana/CsvLocationPicker";
import { SERVICES } from "@/data/services";
import type { Lang, Translation } from "@/i18n/types";
import type { PageKey } from "@/lib/pages";
import { isRTL } from "@/i18n/translations";
import sidiBouSaidHero from "@/assets/sidi-bou-said-hero.jpg";
import { useBookingDraft } from "@/context/BookingContext";

type Props = { setPage: (p: PageKey) => void; lang: Lang; t: Translation };

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  fontWeight: 600,
  color: "hsl(var(--ink))",
  marginBottom: "8px",
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 14px",
  background: "#fff",
  border: "1px solid hsl(var(--border))",
  borderRadius: "10px",
  color: "hsl(var(--ink))",
  fontFamily: "var(--font-body)",
  fontSize: "15px",
  outline: "none",
};

/** earliest valid date+time = now + 4h, returns the local "YYYY-MM-DDTHH:mm" pieces */
const earliestSlot = () => {
  const d = new Date(Date.now() + 4 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
};

const HomePage = ({ setPage, lang, t }: Props) => {
  const { draft, setDraft } = useBookingDraft();
  const min = earliestSlot();

  const handleContinue = () => {
    // ensure we have at least the bare minimum, then jump to /booking which reads the same draft
    setPage("booking");
  };

  return (
  <div style={{ background: "hsl(var(--background))" }} dir={isRTL(lang) ? "rtl" : "ltr"}>
    {/* HERO */}
    <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "hidden", padding: "80px 16px 60px" }}>
      {/* Background image */}
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
      {/* Soft overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 35%, rgba(255,255,255,0.55) 100%)",
          zIndex: 1,
        }}
      />
      <Dust />

      {/* Promo tagline */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          zIndex: 2,
          marginBottom: "20px",
          textAlign: "center",
          padding: "10px 18px",
          background: "rgba(11, 26, 47, 0.85)",
          border: "1px solid hsl(var(--gold))",
          borderRadius: "999px",
          backdropFilter: "blur(6px)",
        }}
      >
        <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", letterSpacing: "1.5px", color: "hsl(var(--gold))", fontWeight: 600 }}>
          ✦ {lang === "FR" ? "PAIEMENT CASH OU EN LIGNE" : lang === "EN" ? "PAY CASH OR ONLINE" : lang === "DE" ? "BARZAHLUNG ODER ONLINE" : lang === "ES" ? "EFECTIVO O EN LÍNEA" : "ادفع نقدًا أو عبر الإنترنت"} ✦
        </span>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} style={{ textAlign: "center", position: "relative", zIndex: 2, width: "100%", maxWidth: "560px" }}>

        {/* BOOKING BOX */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 25px 60px -15px rgba(0,0,0,0.35), 0 8px 20px -8px rgba(0,0,0,0.2)",
            overflow: "hidden",
            textAlign: "left",
            border: "1px solid hsl(var(--border-gold))",
          }}
        >
          {/* dark header */}
          <div style={{ background: "linear-gradient(135deg, hsl(var(--ink)) 0%, hsl(var(--ink-soft)) 100%)", padding: "18px 24px", color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
            <Sparkles size={16} style={{ color: "hsl(var(--gold))" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "3px", color: "hsl(var(--gold))", fontWeight: 700, textTransform: "uppercase" }}>
              {lang === "FR" ? "Réservation Express" : lang === "EN" ? "Express Booking" : lang === "DE" ? "Express-Buchung" : lang === "ES" ? "Reserva Express" : "حجز سريع"}
            </span>
          </div>

          <div style={{ padding: "26px 24px 28px" }}>
          {/* Pickup */}
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="pickup-loc" style={labelStyle}>
              <MapPin size={16} style={{ color: "hsl(var(--gold))" }} />
              {lang === "FR" ? "Lieu de départ *" : lang === "EN" ? "Pickup location *" : lang === "DE" ? "Abfahrtsort *" : lang === "ES" ? "Lugar de recogida *" : "نقطة الانطلاق *"}
            </label>
            <CsvLocationPicker
              id="pickup-loc"
              value={draft.departure}
              onChange={(v) => setDraft({ departure: v })}
              placeholder={lang === "FR" ? "Ex: Aéroport Tunis-Carthage" : lang === "EN" ? "Ex: Tunis-Carthage Airport" : t.pickup_loc_ph}
              ariaLabel="Pickup location"
              excludeName={draft.destination}
            />
          </div>

          {/* Dropoff */}
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="dropoff-loc" style={labelStyle}>
              <MapPin size={16} style={{ color: "hsl(var(--gold))" }} />
              {lang === "FR" ? "Destination" : lang === "EN" ? "Destination" : lang === "DE" ? "Ziel" : lang === "ES" ? "Destino" : "الوجهة"}
            </label>
            <CsvLocationPicker
              id="dropoff-loc"
              value={draft.destination}
              onChange={(v) => setDraft({ destination: v })}
              placeholder={lang === "FR" ? "Ex: Hammamet" : lang === "EN" ? "Ex: Hammamet" : t.dropoff_loc_ph}
              ariaLabel="Drop-off location"
              excludeName={draft.departure}
            />
          </div>

          {/* Date / Time row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div>
              <label htmlFor="pickup-date" style={labelStyle}>
                <CalendarIcon size={16} style={{ color: "hsl(var(--gold))" }} />
                {lang === "FR" ? "Date *" : lang === "EN" ? "Date *" : lang === "DE" ? "Datum *" : lang === "ES" ? "Fecha *" : "التاريخ *"}
              </label>
              <input id="pickup-date" type="date" min={min.date} value={draft.departureDate} onChange={(e) => setDraft({ departureDate: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label htmlFor="pickup-time" style={labelStyle}>
                <Clock size={16} style={{ color: "hsl(var(--gold))" }} />
                {lang === "FR" ? "Heure *" : lang === "EN" ? "Time *" : lang === "DE" ? "Uhrzeit *" : lang === "ES" ? "Hora *" : "الوقت *"}
              </label>
              <input id="pickup-time" type="time" value={draft.departureTime} onChange={(e) => setDraft({ departureTime: e.target.value })} style={inputStyle} />
            </div>
          </div>

          <p style={{ fontSize: "12px", color: "hsl(var(--text-muted))", marginBottom: "20px", display: "flex", alignItems: "center", gap: "6px" }}>
            <ShieldCheck size={14} style={{ color: "hsl(var(--gold))" }} />
            {lang === "FR" ? "Réservation possible 4h à l'avance minimum." : lang === "EN" ? "Booking must be at least 4 hours in advance." : lang === "DE" ? "Buchung mindestens 4 Std. im Voraus." : lang === "ES" ? "La reserva debe hacerse con 4h de antelación." : "يجب الحجز قبل 4 ساعات على الأقل."}
          </p>

          <button
            className="shimmer-btn"
            onClick={handleContinue}
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
            {lang === "FR" ? "Continuer" : lang === "EN" ? "Continue" : lang === "DE" ? "Weiter" : lang === "ES" ? "Continuar" : "متابعة"}
            <ArrowRight size={18} />
          </button>

          {/* payment options promo */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "16px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", padding: "6px 12px", background: "hsl(var(--bg-surface))", borderRadius: "999px", color: "hsl(var(--ink))", fontWeight: 600 }}>
              <CreditCard size={14} style={{ color: "hsl(var(--gold))" }} />
              {lang === "FR" ? "Paiement en ligne" : lang === "EN" ? "Pay online" : lang === "DE" ? "Online zahlen" : lang === "ES" ? "Pago en línea" : "الدفع عبر الإنترنت"}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", padding: "6px 12px", background: "hsl(var(--bg-surface))", borderRadius: "999px", color: "hsl(var(--ink))", fontWeight: 600 }}>
              <Banknote size={14} style={{ color: "hsl(var(--gold))" }} />
              {lang === "FR" ? "Paiement cash" : lang === "EN" ? "Pay cash" : lang === "DE" ? "Barzahlung" : lang === "ES" ? "Pago en efectivo" : "الدفع نقدًا"}
            </span>
          </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ marginTop: "18px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          {[t.b1, t.b2, t.b3].map((b) => (
            <span key={b} style={{ fontSize: "11px", color: "hsl(var(--ink))", background: "rgba(255,255,255,0.85)", padding: "4px 10px", borderRadius: "999px", fontWeight: 500 }}>{b}</span>
          ))}
        </motion.div>
      </motion.div>
    </section>

    {/* STATS */}
    <section style={{ padding: "44px 16px", borderTop: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", maxWidth: "520px", margin: "0 auto" }}>
        {[{ v: "12+", l: t.stat1 }, { v: "8,400+", l: t.stat2 }, { v: "4.97★", l: t.stat3 }, { v: "24/7", l: t.stat4 }].map((s, i) => (
          <motion.div key={s.v} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: 300 }} className="gold-text">{s.v}</div>
            <div style={{ fontSize: "12px", letterSpacing: "1.5px", color: "hsl(var(--accent-dim))", textTransform: "uppercase", marginTop: "4px" }}>{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* SERVICES — visual cards with photos, 20% bigger */}
    <section style={{ padding: "64px 16px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "4px", color: "hsl(var(--gold))", marginBottom: "12px" }}>{t.services_title.toUpperCase()}</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,8vw,58px)", fontWeight: 300 }}>{t.services_sub}</h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
        {SERVICES.map((s, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setPage("booking")}
            whileHover={{ y: -4 }}
            style={{
              borderRadius: "18px",
              overflow: "hidden",
              background: "#fff",
              border: "1px solid hsl(var(--border))",
              cursor: "pointer",
              textAlign: isRTL(lang) ? "right" : "left",
              padding: 0,
              boxShadow: "0 6px 20px -10px rgba(0,0,0,0.18)",
              transition: "all .3s",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
              <img src={s.image} alt={s.name[lang] || s.name.EN} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.45) 100%)" }} />
            </div>
            <div style={{ padding: "20px 22px 24px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 500, marginBottom: "6px", color: "hsl(var(--ink))" }}>{s.name[lang] || s.name.EN}</div>
              <div style={{ fontSize: "14px", color: "hsl(var(--text-muted))", lineHeight: 1.55, marginBottom: "12px" }}>{s.sub[lang] || s.sub.EN}</div>
              <div style={{ fontSize: "12px", color: "hsl(var(--gold))", letterSpacing: "2px", fontWeight: 700, textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                {t.book_cta} <ArrowRight size={14} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding: "60px 16px", textAlign: "center" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,6vw,48px)", fontWeight: 300, marginBottom: "24px" }}>
        {t.cta_ready} <em className="gold-text">{t.cta_elegance}</em>
      </h2>
      <button className="shimmer-btn" onClick={() => setPage("booking")} style={{ background: "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))", border: "none", cursor: "pointer", padding: "16px 44px", fontFamily: "var(--font-body)", fontSize: "13px", letterSpacing: "3px", fontWeight: 600, color: "#050505", textTransform: "uppercase", borderRadius: "10px" }}>
        {t.book_cta}
      </button>
    </section>

    {/* FAQ SEO */}
    <section style={{ padding: "60px 16px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "4px", color: "hsl(var(--gold))", marginBottom: "10px" }}>QUESTIONS FRÉQUENTES</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300 }}>Tout savoir sur nos <span className="gold-text">Transferts</span></h2>
      </div>
      <div style={{ display: "grid", gap: "16px" }}>
        {[
          { q: "Quel est le prix d'un transfert Tunis-Hammamet ?", a: "Le prix fixe pour un transfert privé de l'aéroport de Tunis vers Hammamet commence à partir de 39€ pour un hatchback." },
          { q: "Puis-je payer en cash au chauffeur ?", a: "Oui. Vous choisissez entre paiement en ligne sécurisé ou paiement cash directement au chauffeur lors de la course." },
          { q: "Combien de temps à l'avance dois-je réserver ?", a: "Une réservation doit être effectuée au minimum 4 heures avant l'heure de prise en charge." },
          { q: "Comment retrouver mon chauffeur à l'aéroport ?", a: "Votre chauffeur vous attendra dans le hall des arrivées avec une pancarte à votre nom. Nous suivons votre vol en temps réel." },
        ].map((item, idx) => (
          <div key={idx} style={{ background: "hsl(var(--bg-card))", border: "1px solid hsl(var(--border))", padding: "20px", borderRadius: "10px" }}>
            <h3 style={{ fontSize: "15px", color: "hsl(var(--gold-light))", marginBottom: "8px", fontWeight: 600 }}>Q: {item.q}</h3>
            <p style={{ fontSize: "14px", color: "hsl(var(--text-muted))", lineHeight: 1.6 }}>{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
  );
};

export default HomePage;
