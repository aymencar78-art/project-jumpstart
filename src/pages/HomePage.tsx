import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import type { Lang, Translation } from "@/i18n/types";
import type { PageKey } from "@/lib/pages";
import { isRTL } from "@/i18n/translations";
import BookingPage from "@/pages/BookingPage";

type Props = { setPage: (p: PageKey) => void; lang: Lang; t: Translation };

const HomePage = ({ setPage, lang, t }: Props) => {
  return (
  <div style={{ background: "hsl(var(--background))" }} dir={isRTL(lang) ? "rtl" : "ltr"}>
    {/* HERO + full booking form (identical to /booking) */}
    <BookingPage lang={lang} t={t} />

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
