import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plane, MapPin, Search, ArrowRight, Clock, Route as RouteIcon } from "lucide-react";
import Dust from "@/components/africana/Dust";
import { TRANSFER_ROUTES, TRANSFER_LOCATIONS } from "@/data/transfers";
import type { Lang, Translation } from "@/i18n/types";
import type { PageKey } from "@/lib/pages";
import { isRTL } from "@/i18n/translations";
import sidiBouSaidHero from "@/assets/sidi-bou-said-hero.jpg";

type Props = { setPage: (p: PageKey) => void; lang: Lang; t: Translation };

/* currency: EN → GBP, others → EUR (matches BookingPage) */
const currencyFor = (lang: Lang) =>
  lang === "EN" ? { symbol: "£", rate: 0.86 } : { symbol: "€", rate: 1 };
const fmt = (lang: Lang, eur: number) => {
  const c = currencyFor(lang);
  return `${Math.round(eur * c.rate)}${c.symbol}`;
};

const tr = (lang: Lang, fr: string, en: string, de: string, es: string, ar: string) =>
  ({ FR: fr, EN: en, DE: de, ES: es, AR: ar }[lang] ?? en);

const promoText = (lang: Lang) =>
  tr(
    lang,
    "✦ TARIFS FIXES · TRANSFERTS PRIVÉS PREMIUM ✦",
    "✦ FIXED RATES · PREMIUM PRIVATE TRANSFERS ✦",
    "✦ FESTPREISE · PREMIUM-PRIVATTRANSFERS ✦",
    "✦ TARIFAS FIJAS · TRASLADOS PRIVADOS PREMIUM ✦",
    "✦ أسعار ثابتة · نقل خاص فاخر ✦"
  );

/* shared input style (matches HomePage / BookingPage) */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "#fff",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--ink))",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  outline: "none",
};
const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  fontWeight: 600,
  color: "hsl(var(--ink))",
  marginBottom: "8px",
};

const PricingPage = ({ setPage, lang, t }: Props) => {
  const dir = isRTL(lang) ? "rtl" : "ltr";
  const [origin, setOrigin] = useState<string>("Aéroport International Tunis-Carthage (TUN)");
  const [search, setSearch] = useState("");

  const origins = useMemo(() => {
    const set = new Set(TRANSFER_ROUTES.map((r) => r.origin));
    return Array.from(set).sort();
  }, []);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TRANSFER_ROUTES
      .filter((r) => r.origin === origin)
      .filter((r) => !q || r.destination.toLowerCase().includes(q))
      .sort((a, b) => a.distance_km - b.distance_km);
  }, [origin, search]);

  const isAirport = (name: string) =>
    TRANSFER_LOCATIONS.find((l) => l.name === name)?.kind === "airport";

  return (
    <div dir={dir} style={{ background: "hsl(var(--background))", minHeight: "100vh" }}>
      {/* ========== HERO (mirrors HomePage) ========== */}
      <section
        style={{
          position: "relative",
          minHeight: "62svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          padding: "96px 16px 36px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${sidiBouSaidHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 35%, rgba(255,255,255,0.55) 100%)",
            zIndex: 1,
          }}
        />
        <Dust />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
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
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              letterSpacing: "1.5px",
              color: "hsl(var(--gold))",
              fontWeight: 600,
            }}
          >
            {promoText(lang)}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "760px" }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "4px",
              color: "hsl(var(--gold))",
              marginBottom: "10px",
            }}
          >
            {t.pricing_label}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px,8vw,58px)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "hsl(var(--ink))",
            }}
          >
            {t.pricing_title}
          </h1>
          <p
            style={{
              color: "hsl(var(--ink-soft))",
              marginTop: "10px",
              fontSize: "14px",
              opacity: 0.92,
            }}
          >
            {t.pricing_sub}
          </p>
        </motion.div>
      </section>

      {/* ========== MAIN PRICING CARD ========== */}
      <section style={{ padding: "0 16px 100px", marginTop: "-40px", position: "relative", zIndex: 5 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "20px",
            boxShadow:
              "0 25px 60px -15px rgba(0,0,0,0.35), 0 8px 20px -8px rgba(0,0,0,0.2)",
            padding: "26px 22px",
          }}
        >
          {/* Vehicle legend */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {[
              { emoji: "🚗", name: tr(lang, "Hatchback", "Hatchback", "Hatchback", "Hatchback", "هاتشباك"), cap: "3 / 3" },
              { emoji: "🚙", name: tr(lang, "Berline", "Sedan", "Limousine", "Berlina", "سيدان"), cap: "4 / 4" },
              { emoji: "🚐", name: tr(lang, "Monospace", "Minivan", "Minivan", "Monovolumen", "مونوسباس"), cap: "8 / 8" },
            ].map((v) => (
              <div
                key={v.name}
                style={{
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  padding: "10px 8px",
                  textAlign: "center",
                  background: "hsl(var(--bg-surface))",
                }}
              >
                <div style={{ fontSize: "22px" }}>{v.emoji}</div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "hsl(var(--ink))",
                  }}
                >
                  {v.name}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "hsl(var(--text-muted))",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "1px",
                  }}
                >
                  👥 {v.cap.split(" / ")[0]} · 🧳 {v.cap.split(" / ")[1]}
                </div>
              </div>
            ))}
          </div>

          {/* Origin selector + destination search */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px", marginBottom: "18px" }}>
            <div>
              <label htmlFor="origin-sel" style={labelStyle}>
                <Plane size={16} style={{ color: "hsl(var(--gold))" }} />
                {tr(lang, "Lieu de départ", "From", "Abfahrt von", "Salida desde", "نقطة الانطلاق")}
              </label>
              <select
                id="origin-sel"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}
              >
                {origins.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dest-search" style={labelStyle}>
                <Search size={16} style={{ color: "hsl(var(--gold))" }} />
                {tr(lang, "Filtrer la destination", "Filter destination", "Ziel filtern", "Filtrar destino", "تصفية الوجهة")}
              </label>
              <input
                id="dest-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={tr(lang, "Ex: Hammamet, Sousse…", "Ex: Hammamet, Sousse…", "z. B. Hammamet, Sousse…", "Ej: Hammamet, Sousse…", "مثال: الحمامات، سوسة…")}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Routes list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {rows.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "hsl(var(--text-muted))",
                  fontSize: "13px",
                  background: "hsl(var(--bg-surface))",
                  borderRadius: "12px",
                }}
              >
                {tr(lang, "Aucune destination trouvée", "No destination found", "Keine Ziele gefunden", "Sin destinos", "لم يتم العثور على وجهة")}
              </div>
            )}
            {rows.map((r, i) => (
              <motion.div
                key={`${r.origin}-${r.destination}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 12) * 0.03 }}
                style={{
                  background: "#fff",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "14px",
                  padding: "14px 16px",
                  transition: "all .2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "10px",
                    marginBottom: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {isAirport(r.destination) ? (
                      <Plane size={16} style={{ color: "hsl(var(--gold))" }} />
                    ) : (
                      <MapPin size={16} style={{ color: "hsl(var(--gold))" }} />
                    )}
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "17px",
                        fontWeight: 500,
                        color: "hsl(var(--ink))",
                      }}
                    >
                      {r.destination}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "hsl(var(--text-muted))",
                    }}
                  >
                    <span
                      style={{
                        padding: "3px 8px",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "999px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <RouteIcon size={11} /> {r.distance_km} km
                    </span>
                    <span
                      style={{
                        padding: "3px 8px",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "999px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Clock size={11} /> {r.duration_min} min
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "8px",
                  }}
                >
                  {(["hatchback", "berline", "monospace"] as const).map((kind) => {
                    const price = r.prices[kind];
                    const emoji =
                      kind === "hatchback" ? "🚗" : kind === "berline" ? "🚙" : "🚐";
                    return (
                      <div
                        key={kind}
                        style={{
                          background: "hsl(var(--bg-surface))",
                          padding: "10px 6px",
                          textAlign: "center",
                          borderRadius: "10px",
                          border: "1px solid hsl(var(--border-gold))",
                        }}
                      >
                        <div style={{ fontSize: "16px", marginBottom: "2px" }}>{emoji}</div>
                        <div
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "20px",
                            fontWeight: 700,
                            color: "hsl(var(--ink))",
                          }}
                          className="gold-text"
                        >
                          {price !== undefined ? fmt(lang, price) : "—"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Notes */}
          <div
            style={{
              marginTop: "20px",
              padding: "14px 16px",
              border: "1px solid hsl(var(--border-gold))",
              background: "rgba(212,175,55,.05)",
              borderRadius: "12px",
              display: "grid",
              gap: "6px",
            }}
          >
            {[t.pnote1, t.pnote2, t.pnote3, t.pnote4].map((n) => (
              <div key={n} style={{ fontSize: "12px", color: "hsl(var(--ink-soft))", lineHeight: 1.5 }}>
                · {n}
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="shimmer-btn"
            onClick={() => setPage("booking")}
            style={{
              marginTop: "22px",
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontWeight: 600,
              color: "hsl(var(--ink))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {t.book_cta}
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default PricingPage;
