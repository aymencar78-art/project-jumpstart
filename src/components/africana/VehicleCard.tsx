import { useState } from "react";
import type { Vehicle } from "@/data/vehicles";
import type { Lang, Translation } from "@/i18n/types";

type Props = {
  v: Vehicle;
  selected: boolean;
  onSelect: (v: Vehicle) => void;
  dist: number;
  lang: Lang;
  t: Translation;
};

const VehicleCard = ({ v, selected, onSelect, dist, lang, t }: Props) => {
  const [flipped, setFlipped] = useState(false);
  const price = Math.round(v.base + (dist || 0) * v.pkm);
  const badge = v.badge[lang] || v.badge.EN;
  const name = v.name[lang] || v.name.EN;
  const feats = v.features[lang] || v.features.EN;

  return (
    <div
      className={`flip-card snap-item ${flipped ? "flipped" : ""}`}
      style={{ width: "272px", height: "340px", flexShrink: 0, cursor: "pointer", position: "relative" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="flip-inner" style={{ width: "100%", height: "100%" }}>
        {/* FRONT */}
        <div
          className="flip-front"
          style={{
            background: `linear-gradient(145deg,hsl(var(--bg-card)),${v.color})`,
            border: `1px solid ${selected ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
            boxShadow: selected ? "var(--glow-gold)" : "none",
            padding: "22px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ alignSelf: "flex-start", background: "hsl(var(--gold))", color: "#050505", fontSize: "7.5px", letterSpacing: "1.5px", padding: "3px 8px", fontWeight: 600, lineHeight: 1.4 }}>{badge}</div>
          <div style={{ textAlign: "center", fontSize: "56px", animation: "float 4s ease-in-out infinite" }}>{v.emoji}</div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "2px", color: "hsl(var(--gold))", marginBottom: "3px" }}>{v.cat}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, marginBottom: "8px" }}>{name}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <span style={{ fontSize: "11px", color: "hsl(var(--accent-dim))" }}>👥 {v.pax}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 600, lineHeight: 1 }} className="gold-text">
                  {dist ? `${price}€` : `${t.starts_from} ${v.base}€`}
                </div>
                {dist > 0 && <div style={{ fontSize: "9px", color: "hsl(var(--accent-dim))" }}>{dist} km</div>}
              </div>
            </div>
          </div>
          <div style={{ fontSize: "9px", color: "hsl(var(--text-muted))", textAlign: "center", letterSpacing: ".5px" }}>{t.flip_hint}</div>
        </div>
        {/* BACK */}
        <div
          className="flip-back"
          style={{
            background: "hsl(var(--bg-card))",
            border: `1px solid ${selected ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
            padding: "22px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 400, marginBottom: "14px" }}>{t.features}</div>
            {feats.map((f) => (
              <div key={f} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
                <div style={{ width: "4px", height: "4px", background: "hsl(var(--gold))", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "hsl(var(--accent))" }}>{f}</span>
              </div>
            ))}
            <div style={{ marginTop: "10px", fontSize: "11px", color: "hsl(var(--accent-dim))" }}>🧳 {v.bags} {t.bags}</div>
          </div>
          <button
            className="shimmer-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(v);
            }}
            style={{
              width: "100%",
              padding: "13px",
              background: selected ? "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))" : "transparent",
              border: `1px solid ${selected ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              letterSpacing: "2px",
              color: selected ? "#050505" : "#000",
              fontWeight: selected ? 600 : 400,
              textTransform: "uppercase",
            }}
          >
            {selected ? t.selected : t.select_vehicle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
