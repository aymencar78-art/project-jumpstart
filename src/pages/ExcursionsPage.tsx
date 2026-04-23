import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Check, X, ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import {
  EXCURSIONS,
  FROM_LABEL,
  TABLE_HEADERS,
  INCLUSIONS,
  SECTION_LABELS,
} from "@/data/excursionsCatalog";
import type { Lang, Translation } from "@/i18n/types";
import type { PageKey } from "@/lib/pages";
import { isRTL } from "@/i18n/translations";

type Props = { setPage: (p: PageKey) => void; lang: Lang; t: Translation };

const ExcursionsPage = ({ setPage, lang, t }: Props) => {
  const [active, setActive] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const rtl = isRTL(lang);
  const exc = EXCURSIONS[active];

  const switchExc = (i: number) => {
    setActive(i);
    setImgIdx(0);
  };

  const nextImg = () => setImgIdx((p) => (p + 1) % exc.images.length);
  const prevImg = () => setImgIdx((p) => (p - 1 + exc.images.length) % exc.images.length);

  return (
    <div
      style={{ minHeight: "100vh", paddingTop: "64px", background: "hsl(var(--background))" }}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "36px 16px 140px" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              letterSpacing: "4px",
              color: "hsl(var(--gold))",
              marginBottom: "10px",
              fontWeight: 700,
            }}
          >
            {t.exc_label}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px,9vw,68px)",
              fontWeight: 300,
              marginBottom: "12px",
              lineHeight: 1.05,
            }}
          >
            {t.exc_title}
          </h1>
          <p
            style={{
              fontSize: "19px",
              color: "hsl(var(--text-muted))",
              marginBottom: "32px",
              maxWidth: "780px",
              lineHeight: 1.65,
            }}
          >
            {lang === "FR" &&
              "Excursions privées avec chauffeur professionnel — confort, sécurité et émerveillement garantis à travers la Tunisie."}
            {lang === "EN" &&
              "Private excursions with a professional driver — comfort, safety and wonder guaranteed across Tunisia."}
            {lang === "IT" &&
              "Escursioni private con autista professionista — comfort, sicurezza e meraviglia garantiti in tutta la Tunisia."}
            {lang === "DE" &&
              "Private Ausflüge mit professionellem Fahrer — Komfort, Sicherheit und Staunen garantiert in ganz Tunesien."}
            {lang === "ES" &&
              "Excursiones privadas con conductor profesional — confort, seguridad y asombro garantizados por toda Túnez."}
            {lang === "AR" &&
              "رحلات خاصة مع سائق محترف — راحة وأمان وإبهار مضمون عبر تونس."}
          </p>
        </motion.div>

        {/* Excursion tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "28px" }}>
          {EXCURSIONS.map((e, i) => {
            const isActive = i === active;
            return (
              <button
                key={e.key}
                onClick={() => switchExc(i)}
                style={{
                  padding: "12px 20px",
                  borderRadius: "999px",
                  border: `1px solid ${isActive ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
                  background: isActive ? "hsl(var(--ink))" : "#fff",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  color: isActive ? "hsl(var(--gold))" : "hsl(var(--ink))",
                  letterSpacing: ".5px",
                  fontWeight: isActive ? 700 : 500,
                  transition: "all .2s",
                }}
              >
                {e.title[lang]}
              </button>
            );
          })}
        </div>

        {/* Main card */}
        <motion.div
          key={exc.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: "#fff",
            border: "1px solid hsl(var(--border-gold))",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 18px 40px -18px rgba(11,26,47,0.30)",
          }}
        >
          {/* Gallery */}
          <div style={{ position: "relative", aspectRatio: "16/9", background: "hsl(var(--ink))" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIdx}
                src={exc.images[imgIdx]}
                alt={`${exc.title[lang]} ${imgIdx + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                }}
              />
            </AnimatePresence>

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.55) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Duration badge */}
            <div
              style={{
                position: "absolute",
                left: 18,
                top: 18,
                padding: "8px 14px",
                borderRadius: "999px",
                background: "rgba(11,26,47,.88)",
                color: "hsl(var(--gold))",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "2px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Clock size={14} /> {exc.duration[lang]}
            </div>

            {/* Arrows */}
            <button
              onClick={prevImg}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.92)",
                color: "hsl(var(--ink))",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextImg}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.92)",
                color: "hsl(var(--ink))",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              }}
            >
              <ChevronRight size={22} />
            </button>

            {/* Dots */}
            <div
              style={{
                position: "absolute",
                bottom: 18,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 8,
              }}
            >
              {exc.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  aria-label={`Image ${i + 1}`}
                  style={{
                    width: i === imgIdx ? 28 : 10,
                    height: 10,
                    borderRadius: 999,
                    border: "none",
                    background: i === imgIdx ? "hsl(var(--gold))" : "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    transition: "all .25s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "32px clamp(20px, 4vw, 40px)" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 5vw, 40px)",
                fontWeight: 500,
                marginBottom: "14px",
                color: "hsl(var(--ink))",
                lineHeight: 1.15,
              }}
            >
              {exc.title[lang]}
            </h2>

            <p
              style={{
                fontSize: "18px",
                color: "hsl(var(--ink))",
                lineHeight: 1.7,
                marginBottom: "28px",
                maxWidth: "860px",
              }}
            >
              {exc.description[lang]}
            </p>

            {/* Destinations */}
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "3px",
                  color: "hsl(var(--gold))",
                  marginBottom: "12px",
                  fontWeight: 700,
                }}
              >
                <MapPin size={14} /> {SECTION_LABELS.destinations[lang]}
              </div>
              <p
                style={{
                  fontSize: "17px",
                  color: "hsl(var(--ink))",
                  lineHeight: 1.7,
                  fontWeight: 500,
                }}
              >
                {exc.destinations[lang]}
              </p>
            </div>

            {/* Pricing table */}
            <div
              style={{
                background: "hsl(var(--bg-surface) / 0.5)",
                borderRadius: "16px",
                padding: "22px",
                marginBottom: "28px",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  letterSpacing: "3px",
                  color: "hsl(var(--gold))",
                  marginBottom: "16px",
                  fontWeight: 700,
                }}
              >
                {SECTION_LABELS.pricing[lang]}
              </h3>

              {/* Two stacked tables — no horizontal scroll on mobile */}
              {([
                { header: TABLE_HEADERS.v1to4, getPrice: (r: typeof exc.priceRows[number]) => r.price1to4 },
                { header: TABLE_HEADERS.v4to8, getPrice: (r: typeof exc.priceRows[number]) => r.price4to8 },
              ]).map((tbl, ti) => (
                <div key={ti} style={{ marginTop: ti === 0 ? 0 : "18px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "2px",
                      color: "hsl(var(--gold))",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      textAlign: rtl ? "right" : "left",
                    }}
                  >
                    {tbl.header[lang]}
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                    <thead>
                      <tr
                        style={{
                          background: "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))",
                        }}
                      >
                        <th
                          style={{
                            padding: "12px 12px",
                            fontFamily: "var(--font-body)",
                            fontSize: "12px",
                            letterSpacing: "1.2px",
                            color: "hsl(var(--ink))",
                            textTransform: "uppercase",
                            fontWeight: 700,
                            textAlign: rtl ? "right" : "left",
                            width: "62%",
                          }}
                        >
                          {TABLE_HEADERS.from[lang]}
                        </th>
                        <th
                          style={{
                            padding: "12px 12px",
                            fontFamily: "var(--font-body)",
                            fontSize: "12px",
                            letterSpacing: "1.2px",
                            color: "hsl(var(--ink))",
                            textTransform: "uppercase",
                            fontWeight: 700,
                            textAlign: rtl ? "left" : "right",
                            width: "38%",
                          }}
                        >
                          {tbl.header[lang]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {exc.priceRows.map((row, ri) => (
                        <tr
                          key={ri}
                          style={{
                            borderBottom: "1px solid hsl(var(--border))",
                            background: ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.5)",
                          }}
                        >
                          <td
                            style={{
                              padding: "14px 12px",
                              fontFamily: "var(--font-body)",
                              fontSize: "15px",
                              color: "hsl(var(--ink))",
                              fontWeight: 600,
                              textAlign: rtl ? "right" : "left",
                              wordBreak: "break-word",
                            }}
                          >
                            {FROM_LABEL[row.fromKey][lang]}
                          </td>
                          <td
                            style={{
                              padding: "14px 12px",
                              fontFamily: "var(--font-body)",
                              fontSize: "20px",
                              color: "hsl(var(--gold))",
                              fontWeight: 700,
                              textAlign: rtl ? "left" : "right",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {tbl.getPrice(row)} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* Inclusions */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  background: "hsl(140 30% 96%)",
                  borderRadius: "14px",
                  padding: "20px",
                  border: "1px solid hsl(140 30% 85%)",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    letterSpacing: "2.5px",
                    color: "hsl(140 60% 28%)",
                    marginBottom: "14px",
                    fontWeight: 700,
                  }}
                >
                  ✓ {SECTION_LABELS.included[lang]}
                </h4>
                <ul style={{ display: "grid", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                  {INCLUSIONS.included[lang].map((inc) => (
                    <li
                      key={inc}
                      style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "15px", color: "hsl(var(--ink))" }}
                    >
                      <Check
                        size={16}
                        style={{ color: "hsl(140 60% 35%)", marginTop: 3, flexShrink: 0 }}
                      />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: "hsl(0 30% 97%)",
                  borderRadius: "14px",
                  padding: "20px",
                  border: "1px solid hsl(0 30% 88%)",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    letterSpacing: "2.5px",
                    color: "hsl(0 55% 38%)",
                    marginBottom: "14px",
                    fontWeight: 700,
                  }}
                >
                  ✗ {SECTION_LABELS.excluded[lang]}
                </h4>
                <ul style={{ display: "grid", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                  {INCLUSIONS.excluded[lang].map((exc2) => (
                    <li
                      key={exc2}
                      style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "15px", color: "hsl(var(--ink))" }}
                    >
                      <X
                        size={16}
                        style={{ color: "hsl(0 55% 45%)", marginTop: 3, flexShrink: 0 }}
                      />
                      <span>{exc2}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Book CTA */}
            <div style={{ textAlign: "center" }}>
              <button
                className="shimmer-btn"
                onClick={() => setPage("booking")}
                style={{
                  padding: "18px 42px",
                  background:
                    "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  letterSpacing: "3px",
                  fontWeight: 700,
                  color: "hsl(var(--ink))",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 10px 24px -8px rgba(212,175,55,0.55)",
                }}
              >
                {SECTION_LABELS.book[lang]} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExcursionsPage;
