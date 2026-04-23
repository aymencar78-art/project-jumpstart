import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Mail } from "lucide-react";
import LangDropdown from "./LangDropdown";
import { T, FLAGS, LANG_NAMES, isRTL } from "@/i18n/translations";
import type { Lang } from "@/i18n/types";
import type { PageKey } from "@/lib/pages";

type Props = {
  page: PageKey;
  setPage: (p: PageKey) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  scrolled: boolean;
};

const Navbar = ({ page, setPage, lang, setLang, scrolled }: Props) => {
  const [drawer, setDrawer] = useState(false);
  const t = T[lang];
  const dir = isRTL(lang) ? "rtl" : "ltr";
  const navItems: { k: PageKey; l: string }[] = [
    { k: "home", l: t.nav_home },
    { k: "booking", l: t.nav_book },
    { k: "excursions", l: t.nav_excursions },
    { k: "pricing", l: t.nav_pricing },
    { k: "contact", l: t.nav_contact },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        dir={dir}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: "72px",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "hsl(var(--ink))",
          borderBottom: "1px solid hsl(var(--border-gold))",
          backdropFilter: "blur(20px)",
          transition: "all .4s",
        }}
      >
        {/* Logo */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", flexShrink: 0 }}
          onClick={() => {
            setPage("home");
            setDrawer(false);
          }}
        >
          <div style={{ width: "30px", height: "30px", border: "1px solid hsl(var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ width: "14px", height: "14px", background: "hsl(var(--gold-light))", transform: "rotate(45deg)", boxShadow: "0 0 8px hsl(var(--gold) / 0.6)" }} />
            <div style={{ position: "absolute", inset: "3px", background: "linear-gradient(135deg,rgba(212,175,55,.2),transparent)" }} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 600, letterSpacing: "3px", color: "hsl(var(--on-ink))", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>AFRICA<span className="gold-text">NA</span></span>
              <span style={{ display: "inline-block", width: "6px", height: "6px", background: "hsl(var(--gold-light))", transform: "rotate(45deg)" }} />
            </div>
          </div>
        </div>

        {/* Desktop links */}
        <div id="desk-nav" style={{ display: "none", alignItems: "center", gap: "28px" }}>
          {navItems.map((n) => (
            <button
              key={n.k}
              onClick={() => setPage(n.k)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "2px",
                color: page === n.k ? "hsl(var(--gold-light))" : "hsl(var(--gold) / 0.7)",
                textTransform: "uppercase",
                transition: "color .3s",
                position: "relative",
                padding: "4px 0",
              }}
            >
              {n.l}
              {page === n.k && (
                <motion.div
                  layoutId="nav-ind"
                  style={{
                    position: "absolute",
                    bottom: "-8px",
                    left: "50%",
                    marginLeft: "-3px",
                    width: "6px",
                    height: "6px",
                    background: "hsl(var(--gold-light))",
                    transform: "rotate(45deg)",
                    boxShadow: "0 0 6px hsl(var(--gold) / 0.7)",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <LangDropdown lang={lang} setLang={setLang} />
          <button
            id="desk-book"
            className="shimmer-btn"
            onClick={() => setPage("booking")}
            style={{
              display: "none",
              padding: "11px 22px",
              background: "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              letterSpacing: "2px",
              color: "#050505",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {t.book_cta}
          </button>
          <button
            id="hamburger"
            onClick={() => setDrawer((o) => !o)}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid hsl(var(--border-gold))",
              width: "40px",
              height: "40px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "10px",
              flexShrink: 0,
            }}
          >
            <motion.div animate={{ rotate: drawer ? 45 : 0, y: drawer ? 6 : 0 }} style={{ width: "16px", height: "1.5px", background: "hsl(var(--gold-light))", transformOrigin: "center" }} />
            <motion.div animate={{ opacity: drawer ? 0 : 1 }} style={{ width: "16px", height: "1.5px", background: "hsl(var(--gold-light))" }} />
            <motion.div animate={{ rotate: drawer ? -45 : 0, y: drawer ? -6 : 0 }} style={{ width: "16px", height: "1.5px", background: "hsl(var(--gold-light))", transformOrigin: "center" }} />
          </button>
        </div>
      </motion.nav>

      <style>{`
        @media(min-width:769px){
          #desk-nav{display:flex!important;}
          #desk-book{display:flex!important;}
          #hamburger{display:none!important;}
        }
      `}</style>

      {/* Drawer */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            dir={dir}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 199,
              width: "min(300px,88vw)",
              background: "hsl(var(--ink-soft))",
              borderLeft: "1px solid hsl(var(--border-gold))",
              padding: "80px 28px 32px",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {navItems.map((n, i) => (
              <motion.button
                key={n.k}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => {
                  setPage(n.k);
                  setDrawer(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid hsl(var(--border-gold))",
                  padding: "20px 0",
                  cursor: "pointer",
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 300,
                  color: page === n.k ? "hsl(var(--gold-light))" : "hsl(var(--on-ink-muted))",
                  textAlign: isRTL(lang) ? "right" : "left",
                  letterSpacing: "1px",
                }}
              >
                {n.l}
              </motion.button>
            ))}

            {/* Language grid */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} style={{ marginTop: "28px" }}>
              <div style={{ fontSize: "9px", letterSpacing: "3px", color: "hsl(var(--gold))", marginBottom: "12px" }}>{t.lang_label}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {(Object.keys(T) as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setDrawer(false);
                    }}
                    style={{
                      padding: "11px 10px",
                      border: `1px solid ${lang === l ? "hsl(var(--gold))" : "hsl(var(--border-gold))"}`,
                      background: lang === l ? "rgba(212,178,64,.14)" : "rgba(255,255,255,.03)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: lang === l ? "hsl(var(--gold-light))" : "hsl(var(--on-ink-muted))",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>{FLAGS[l]}</span>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: "10px", letterSpacing: "1px" }}>{l}</div>
                      <div style={{ fontSize: "9px", color: "hsl(var(--text-muted))" }}>{LANG_NAMES[l]}</div>
                    </div>
                    {lang === l && <span style={{ marginLeft: "auto", color: "hsl(var(--gold))", fontSize: "10px" }}>✓</span>}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Contact block */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }} style={{ marginTop: "24px", display: "grid", gap: "8px" }}>
              <div style={{ fontSize: "9px", letterSpacing: "3px", color: "hsl(var(--gold))", marginBottom: "4px" }}>CONTACT</div>
              {[
                { Icon: Phone, label: "+216 27 906 446", href: "tel:+21627906446", color: "hsl(var(--gold-light))" },
                { Icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/21627906446", color: "#25D366" },
                { Icon: Mail, label: "carlito@africana.com", href: "mailto:carlito@africana.com", color: "hsl(var(--gold-light))" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => setDrawer(false)}
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", border: "1px solid hsl(var(--border-gold))", background: "rgba(255,255,255,.03)", color: "hsl(var(--on-ink))", textDecoration: "none", fontSize: "12px", letterSpacing: ".5px" }}
                >
                  <c.Icon size={16} color={c.color} strokeWidth={1.8} />
                  <span>{c.label}</span>
                </a>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="shimmer-btn"
              onClick={() => {
                setPage("booking");
                setDrawer(false);
              }}
              style={{
                marginTop: "auto",
                paddingTop: "24px",
                width: "100%",
                padding: "18px",
                background: "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                letterSpacing: "3px",
                fontWeight: 600,
                color: "#050505",
                textTransform: "uppercase",
              }}
            >
              {t.book_cta}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {drawer && (
        <div
          onClick={() => setDrawer(false)}
          style={{ position: "fixed", inset: 0, zIndex: 198, background: "hsl(var(--ink) / 0.55)", backdropFilter: "blur(4px)" }}
        />
      )}
    </>
  );
};

export default Navbar;
