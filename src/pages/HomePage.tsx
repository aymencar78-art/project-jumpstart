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

    {/* STATS — bigger, premium presentation */}
    <section style={{ padding: "72px 16px", borderTop: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))", background: "linear-gradient(180deg, hsl(var(--bg-surface)) 0%, hsl(var(--background)) 100%)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", maxWidth: "1100px", margin: "0 auto" }}>
        {[{ v: "12+", l: t.stat1 }, { v: "8,400+", l: t.stat2 }, { v: "4.97★", l: t.stat3 }, { v: "24/7", l: t.stat4 }].map((s, i) => (
          <motion.div
            key={s.v}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{
              textAlign: "center",
              padding: "28px 18px",
              background: "rgba(255,255,255,0.55)",
              border: "1px solid hsl(var(--border-gold))",
              borderRadius: "18px",
              boxShadow: "0 6px 20px -10px rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 9vw, 88px)", fontWeight: 500, lineHeight: 1 }} className="gold-text">{s.v}</div>
            <div style={{ fontSize: "16px", letterSpacing: "2px", color: "hsl(var(--ink))", textTransform: "uppercase", marginTop: "12px", fontWeight: 700 }}>{s.l}</div>
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

    {/* FAQ SEO (localized) */}
    <section style={{ padding: "60px 16px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "4px", color: "hsl(var(--gold))", marginBottom: "10px", fontWeight: 700 }}>
          {lang === "FR" ? "QUESTIONS FRÉQUENTES" : lang === "EN" ? "FREQUENTLY ASKED" : lang === "IT" ? "DOMANDE FREQUENTI" : lang === "DE" ? "HÄUFIGE FRAGEN" : lang === "ES" ? "PREGUNTAS FRECUENTES" : "أسئلة شائعة"}
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,38px)", fontWeight: 400 }}>
          {lang === "FR" ? <>Tout savoir sur nos <span className="gold-text">Transferts</span></>
            : lang === "EN" ? <>Everything about our <span className="gold-text">Transfers</span></>
            : lang === "IT" ? <>Tutto sui nostri <span className="gold-text">Trasferimenti</span></>
            : lang === "DE" ? <>Alles über unsere <span className="gold-text">Transfers</span></>
            : lang === "ES" ? <>Todo sobre nuestros <span className="gold-text">Traslados</span></>
            : <><span className="gold-text">كل ما تحتاج معرفته</span> عن خدمات النقل</>}
        </h2>
      </div>
      <div style={{ display: "grid", gap: "16px" }}>
        {(
          lang === "FR" ? [
            { q: "Quel est le prix d'un transfert Tunis-Hammamet ?", a: "Le prix fixe pour un transfert privé de l'aéroport de Tunis vers Hammamet commence à partir de 39€ pour un hatchback." },
            { q: "Puis-je payer en cash au chauffeur ?", a: "Oui. Vous choisissez entre paiement en ligne sécurisé ou paiement cash directement au chauffeur lors de la course." },
            { q: "Combien de temps à l'avance dois-je réserver ?", a: "Une réservation doit être effectuée au minimum 4 heures avant l'heure de prise en charge." },
            { q: "Comment retrouver mon chauffeur à l'aéroport ?", a: "Votre chauffeur vous attendra dans le hall des arrivées avec une pancarte à votre nom. Nous suivons votre vol en temps réel." },
          ] : lang === "EN" ? [
            { q: "How much is a Tunis–Hammamet transfer?", a: "The fixed price for a private transfer from Tunis Airport to Hammamet starts at €39 for a hatchback." },
            { q: "Can I pay the driver in cash?", a: "Yes. You can choose between secure online payment or paying the driver directly in cash on the day." },
            { q: "How far in advance should I book?", a: "Bookings must be made at least 4 hours before the pickup time." },
            { q: "How will I find my driver at the airport?", a: "Your driver will wait in the arrivals hall with a sign showing your name. We track your flight in real time." },
          ] : lang === "IT" ? [
            { q: "Quanto costa un trasferimento Tunisi–Hammamet?", a: "Il prezzo fisso per un trasferimento privato dall'aeroporto di Tunisi a Hammamet parte da 39€ per una hatchback." },
            { q: "Posso pagare l'autista in contanti?", a: "Sì. Puoi scegliere tra pagamento online sicuro o pagamento in contanti direttamente all'autista il giorno stesso." },
            { q: "Con quanto anticipo devo prenotare?", a: "Le prenotazioni devono essere effettuate almeno 4 ore prima dell'orario di prelievo." },
            { q: "Come troverò il mio autista in aeroporto?", a: "Il tuo autista ti aspetterà nella sala arrivi con un cartello con il tuo nome. Seguiamo il tuo volo in tempo reale." },
          ] : lang === "DE" ? [
            { q: "Was kostet ein Transfer Tunis–Hammamet?", a: "Der Festpreis für einen privaten Transfer vom Flughafen Tunis nach Hammamet beginnt bei 39 € für ein Hatchback." },
            { q: "Kann ich den Fahrer bar bezahlen?", a: "Ja. Sie wählen zwischen sicherer Online-Zahlung und Barzahlung direkt beim Fahrer." },
            { q: "Wie weit im Voraus muss ich buchen?", a: "Buchungen müssen mindestens 4 Stunden vor der Abholzeit erfolgen." },
            { q: "Wie finde ich meinen Fahrer am Flughafen?", a: "Ihr Fahrer wartet in der Ankunftshalle mit einem Schild mit Ihrem Namen. Wir verfolgen Ihren Flug in Echtzeit." },
          ] : lang === "ES" ? [
            { q: "¿Cuánto cuesta un traslado Túnez–Hammamet?", a: "El precio fijo para un traslado privado desde el aeropuerto de Túnez hasta Hammamet comienza en 39 € para un hatchback." },
            { q: "¿Puedo pagar al conductor en efectivo?", a: "Sí. Puede elegir entre pago en línea seguro o pago al conductor directamente en efectivo." },
            { q: "¿Con cuánta antelación debo reservar?", a: "Las reservas deben hacerse al menos 4 horas antes de la hora de recogida." },
            { q: "¿Cómo encontraré a mi conductor en el aeropuerto?", a: "Su conductor le esperará en la sala de llegadas con un cartel con su nombre. Hacemos seguimiento de su vuelo en tiempo real." },
          ] : [
            { q: "ما هو سعر النقل من تونس إلى الحمامات؟", a: "السعر الثابت للنقل الخاص من مطار تونس إلى الحمامات يبدأ من 39€ لسيارة هاتشباك." },
            { q: "هل يمكنني الدفع نقداً للسائق؟", a: "نعم. يمكنك الاختيار بين الدفع الآمن عبر الإنترنت أو الدفع نقداً مباشرة للسائق." },
            { q: "كم من الوقت يجب أن أحجز مسبقاً؟", a: "يجب الحجز قبل 4 ساعات على الأقل من وقت الاستلام." },
            { q: "كيف أجد سائقي في المطار؟", a: "سينتظرك السائق في صالة الوصول حاملاً لافتة باسمك. نحن نتابع رحلتك في الوقت الفعلي." },
          ]
        ).map((item, idx) => (
          <div key={idx} style={{ background: "hsl(var(--bg-card))", border: "1px solid hsl(var(--border))", padding: "22px", borderRadius: "12px" }}>
            <h3 style={{ fontSize: "17px", color: "hsl(var(--ink))", marginBottom: "10px", fontWeight: 700 }}>Q: {item.q}</h3>
            <p style={{ fontSize: "16px", color: "hsl(var(--text-muted))", lineHeight: 1.65 }}>{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
  );
};

export default HomePage;
