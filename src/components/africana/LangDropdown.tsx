import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLAGS, LANG_NAMES, T } from "@/i18n/translations";
import type { Lang } from "@/i18n/types";

type Props = { lang: Lang; setLang: (l: Lang) => void };

const LangDropdown = ({ lang, setLang }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", zIndex: 300 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          background: open ? "rgba(212,175,55,0.18)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${open ? "hsl(var(--gold))" : "hsl(var(--border-gold))"}`,
          padding: "8px 12px",
          cursor: "pointer",
          transition: "all .2s",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "1px",
          color: open ? "hsl(var(--gold-light))" : "hsl(var(--gold) / 0.75)",
          minWidth: "72px",
        }}
      >
        <span style={{ fontSize: "14px" }}>{FLAGS[lang]}</span>
        <span>{lang}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ fontSize: "7px", color: "hsl(var(--gold))", marginLeft: "2px" }}>
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              right: 0,
              background: "#f3f3f3",
              border: "1px solid hsl(var(--border-gold))",
              minWidth: "155px",
              boxShadow: "0 12px 40px rgba(255,255,255,.9)",
              zIndex: 500,
            }}
          >
            {(Object.keys(T) as Lang[]).map((l, i) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "12px 16px",
                  background: lang === l ? "rgba(212,175,55,.1)" : "transparent",
                  border: "none",
                  borderBottom: i < 4 ? "1px solid hsl(var(--border))" : "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: lang === l ? "hsl(var(--gold-light))" : "hsl(var(--accent-dim))",
                  transition: "background .15s",
                }}
              >
                <span style={{ fontSize: "16px" }}>{FLAGS[l]}</span>
                <span>{LANG_NAMES[l]}</span>
                {lang === l && <span style={{ marginLeft: "auto", color: "hsl(var(--gold))", fontSize: "10px" }}>✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LangDropdown;
