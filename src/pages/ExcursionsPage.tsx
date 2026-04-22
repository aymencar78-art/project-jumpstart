import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles, Check, ArrowRight } from "lucide-react";
import { EXCURSIONS_DATA, translateCell, translateDestination, tableLabels } from "@/data/excursionsData";
import { RICH_EXCURSIONS } from "@/data/excursionsRich";
import type { Lang, Translation } from "@/i18n/types";
import type { PageKey } from "@/lib/pages";
import { isRTL } from "@/i18n/translations";

type Props = { setPage: (p: PageKey) => void; lang: Lang; t: Translation };

const ExcursionsPage = ({ setPage, lang, t }: Props) => {
  const [activeDest, setActiveDest] = useState(0);
  const [activeTable, setActiveTable] = useState(0);
  const rtl = isRTL(lang);
  const labels = tableLabels(lang);
  const dest = EXCURSIONS_DATA[activeDest];
  const table = dest.prices[activeTable] || dest.prices[0];
  const rich = RICH_EXCURSIONS.find((r) => r.matchesDestination === dest.destination) || RICH_EXCURSIONS[0];

  const handleDestChange = (i: number) => {
    setActiveDest(i);
    setActiveTable(0);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", background: "hsl(var(--background))" }} dir={rtl ? "rtl" : "ltr"}>
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "36px 16px 140px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "4px", color: "hsl(var(--gold))", marginBottom: "10px" }}>
            {t.exc_label}
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,8vw,56px)", fontWeight: 300, marginBottom: "10px" }}>
            {t.exc_title}
          </h1>
          <p style={{ fontSize: "16px", color: "hsl(var(--text-muted))", marginBottom: "28px", maxWidth: "720px", lineHeight: 1.6 }}>
            {lang === "FR" && "Des journées sur mesure conduites par nos chauffeurs francophones — confort, sécurité et émerveillement garantis."}
            {lang === "EN" && "Tailor-made days driven by our English-speaking chauffeurs — comfort, safety and wonder guaranteed."}
            {lang === "DE" && "Maßgeschneiderte Tage mit deutschsprachigen Chauffeuren — Komfort, Sicherheit und Staunen inklusive."}
            {lang === "ES" && "Jornadas a medida con conductores hispanohablantes — confort, seguridad y asombro garantizados."}
            {lang === "AR" && "أيام مُصمّمة خصيصًا مع سائقين متعدّدي اللغات — راحة وأمان وإبهار مضمون."}
          </p>

          {/* Destination tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
            {EXCURSIONS_DATA.map((d, i) => {
              const active = i === activeDest;
              return (
                <button
                  key={i}
                  onClick={() => handleDestChange(i)}
                  style={{
                    padding: "11px 18px",
                    borderRadius: "999px",
                    border: `1px solid ${active ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
                    background: active ? "hsl(var(--ink))" : "#fff",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: active ? "hsl(var(--gold))" : "hsl(var(--ink))",
                    letterSpacing: ".5px",
                    fontWeight: active ? 700 : 500,
                    transition: "all .2s",
                  }}
                >
                  {translateDestination(d, lang)}
                </button>
              );
            })}
          </div>

          {/* Rich hero card */}
          <motion.div
            key={rich.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .35 }}
            style={{
              background: "#fff",
              border: "1px solid hsl(var(--border-gold))",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 18px 40px -18px rgba(11,26,47,0.30)",
              marginBottom: "28px",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)", gap: 0 }} className="exc-hero-grid">
              <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", minHeight: "260px" }}>
                <img src={rich.image} alt={rich.title[lang]} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />
                <div style={{ position: "absolute", left: 16, top: 16, padding: "6px 12px", borderRadius: "999px", background: "rgba(11,26,47,.85)", color: "hsl(var(--gold))", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "2px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Clock size={12} /> {rich.duration[lang]}
                </div>
              </div>
              <div style={{ padding: "26px 28px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "3px", color: "hsl(var(--gold))", marginBottom: "8px", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Sparkles size={12} /> {lang === "FR" ? "EXPÉRIENCE PRIVÉE" : lang === "EN" ? "PRIVATE EXPERIENCE" : lang === "DE" ? "PRIVATES ERLEBNIS" : lang === "ES" ? "EXPERIENCIA PRIVADA" : "تجربة خاصة"}
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 500, marginBottom: "8px", color: "hsl(var(--ink))", lineHeight: 1.2 }}>{rich.title[lang]}</h2>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "hsl(var(--gold))", fontSize: "15px", marginBottom: "14px" }}>{rich.tagline[lang]}</p>
                <p style={{ fontSize: "14px", color: "hsl(var(--ink))", lineHeight: 1.65, marginBottom: "16px" }}>{rich.description[lang]}</p>
                <div style={{ display: "grid", gap: "8px" }}>
                  {rich.highlights[lang].map((h) => (
                    <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <Check size={16} style={{ color: "hsl(var(--gold))", marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: "14px", color: "hsl(var(--ink))" }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Table type tabs */}
          {dest.prices.length > 1 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
              {dest.prices.map((_, i) => {
                const active = i === activeTable;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTable(i)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "8px",
                      border: `1px solid ${active ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
                      background: active ? "hsl(var(--gold))" : "transparent",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: active ? "hsl(var(--ink))" : "hsl(var(--text-muted))",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontWeight: active ? 700 : 500,
                      transition: "all .2s",
                    }}
                  >
                    {labels[i] || `#${i + 1}`}
                  </button>
                );
              })}
            </div>
          )}

          {/* Pricing table */}
          <motion.div
            key={`${activeDest}-${activeTable}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "#fff",
              border: "1px solid hsl(var(--border-gold))",
              borderRadius: "14px",
              overflow: "auto",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "520px" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))" }}>
                  {table[0].map((h, ci) => (
                    <th
                      key={ci}
                      style={{
                        padding: "14px 12px",
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        color: "hsl(var(--ink))",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        textAlign: rtl ? "right" : "left",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {translateCell(h, lang, 0, ci)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.slice(1).map((row, ri) => (
                  <tr
                    key={ri}
                    style={{
                      borderBottom: "1px solid hsl(var(--border))",
                      background: ri % 2 === 0 ? "transparent" : "hsl(var(--bg-surface) / 0.4)",
                    }}
                  >
                    {row.map((cell, ci) => {
                      const isFirst = ci === 0;
                      const isPrice = cell.includes("€");
                      return (
                        <td
                          key={ci}
                          style={{
                            padding: "14px 12px",
                            fontFamily: "var(--font-body)",
                            fontSize: isPrice ? "18px" : "14px",
                            color: isFirst ? "hsl(var(--ink))" : isPrice ? "hsl(var(--gold))" : "hsl(var(--text-muted))",
                            fontWeight: isFirst ? 600 : isPrice ? 700 : 400,
                            textAlign: rtl ? "right" : "left",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {translateCell(cell, lang, ri + 1, ci)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Book CTA */}
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <button
              className="shimmer-btn"
              onClick={() => setPage("booking")}
              style={{
                padding: "16px 36px",
                background: "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                letterSpacing: "3px",
                fontWeight: 700,
                color: "hsl(var(--ink))",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 10px 24px -8px rgba(212,175,55,0.55)",
              }}
            >
              {t.book_cta} <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .exc-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default ExcursionsPage;
