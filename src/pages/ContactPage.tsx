import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import type { Lang, Translation } from "@/i18n/types";
import type { PageKey } from "@/lib/pages";
import { isRTL } from "@/i18n/translations";

type Props = { setPage: (p: PageKey) => void; lang: Lang; t: Translation };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: "#fff",
  border: "1px solid hsl(var(--border-gold))",
  color: "hsl(var(--foreground))",
  fontSize: "14px",
  borderRadius: 0,
};
const inputErrStyle: React.CSSProperties = { ...inputStyle, border: "1px solid hsl(var(--destructive))" };
const labelStyle: React.CSSProperties = {
  fontSize: "9px",
  letterSpacing: "3px",
  color: "hsl(var(--gold))",
  display: "block",
  marginBottom: "6px",
  fontFamily: "var(--font-mono)",
};
const errMsgStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "hsl(var(--destructive))",
  marginTop: "4px",
};

const buildSchema = (t: Translation) =>
  z.object({
    name: z.string().trim().min(2, t.err_name_short).max(100),
    email: z.string().trim().email(t.err_email).max(255),
    message: z.string().trim().min(10, t.err_message_short).max(1000),
  });

const ContactPage = ({ setPage, lang, t }: Props) => {
  const dir = isRTL(lang) ? "rtl" : "ltr";
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const schema = useMemo(() => buildSchema(t), [t]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => {
        const k = i.path[0] as string;
        if (!errs[k]) errs[k] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    // TODO: hook up to a contact edge function later
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{ minHeight: "100vh", paddingTop: "64px", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 16px 120px" }} dir={dir}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", maxWidth: "420px" }}>
          <div style={{ width: "68px", height: "68px", border: "2px solid hsl(var(--gold))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", margin: "0 auto 20px", boxShadow: "var(--glow-gold)" }}>✓</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "30px", fontWeight: 300, marginBottom: "10px" }}>{t.contact_sent}</h2>
          <p style={{ color: "hsl(var(--text-muted))", fontSize: "13px" }}>{t.contact_sent_sub}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "104px 16px 120px" }} dir={dir}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ display: "inline-flex", width: "56px", height: "56px", borderRadius: "50%", border: "1px solid hsl(var(--gold))", alignItems: "center", justifyContent: "center", marginBottom: "14px", boxShadow: "0 0 18px hsl(var(--gold) / .25)" }}>
              <Phone size={22} color="hsl(var(--gold-light))" strokeWidth={1.8} />
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,7vw,40px)", fontWeight: 300, marginBottom: "8px" }}>{t.contact_title}</h1>
            <p style={{ fontSize: "13px", color: "hsl(var(--text-muted))" }}>{t.contact_sub}</p>
          </div>

          {/* Quick contact info */}
          <div style={{ display: "grid", gap: "8px", marginBottom: "24px" }}>
            {[
              { Icon: Phone, v: "+216 27 906 446", href: "tel:+21627906446", color: "hsl(var(--gold-light))" },
              { Icon: MessageCircle, v: "WhatsApp +216 27 906 446", href: "https://wa.me/21627906446", color: "#25D366" },
              { Icon: Mail, v: "Contact@africana-transfert.com", href: "mailto:Contact@africana-transfert.com", color: "hsl(var(--gold-light))" },
              { Icon: MapPin, v: "Tunis 1080, Tunisie", href: undefined, color: "hsl(var(--gold-light))" },
            ].map((c) => (
              <a
                key={c.v}
                href={c.href || "#"}
                target={c.href?.startsWith("http") ? "_blank" : undefined}
                rel={c.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ display: "flex", gap: "12px", padding: "12px 14px", background: "#fff", border: "1px solid hsl(var(--border-gold))", alignItems: "center", textDecoration: "none", color: "hsl(var(--foreground))" }}
              >
                <c.Icon size={18} color={c.color} strokeWidth={1.8} />
                <span style={{ fontSize: "13px" }}>{c.v}</span>
              </a>
            ))}
          </div>


          {/* Contact form */}
          <form onSubmit={submit} style={{ background: "hsl(var(--bg-card))", border: "1px solid hsl(var(--border-gold))", padding: "22px", display: "grid", gap: "14px" }} noValidate>
            <div>
              <label htmlFor="ct-name" style={labelStyle}>{t.contact_form_name} <span style={{ color: "hsl(var(--destructive))" }}>*</span></label>
              <input id="ct-name" type="text" value={form.name} maxLength={100} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder={t.name_ph} style={errors.name ? inputErrStyle : inputStyle} />
              {errors.name && <div style={errMsgStyle}>{errors.name}</div>}
            </div>
            <div>
              <label htmlFor="ct-email" style={labelStyle}>{t.contact_form_email} <span style={{ color: "hsl(var(--destructive))" }}>*</span></label>
              <input id="ct-email" type="email" value={form.email} maxLength={255} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder={t.email_ph} style={errors.email ? inputErrStyle : inputStyle} />
              {errors.email && <div style={errMsgStyle}>{errors.email}</div>}
            </div>
            <div>
              <label htmlFor="ct-msg" style={labelStyle}>{t.contact_form_message} <span style={{ color: "hsl(var(--destructive))" }}>*</span></label>
              <textarea id="ct-msg" rows={5} value={form.message} maxLength={1000} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder={t.contact_form_message_ph} style={{ ...(errors.message ? inputErrStyle : inputStyle), resize: "vertical" }} />
              {errors.message && <div style={errMsgStyle}>{errors.message}</div>}
              <div style={{ fontSize: "10px", color: "hsl(var(--text-muted))", textAlign: "right", marginTop: "4px" }}>{form.message.length}/1000</div>
            </div>
            <button type="submit" className="shimmer-btn" disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? "hsl(var(--bg-surface))" : "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))", border: "1px solid hsl(var(--gold))", cursor: loading ? "not-allowed" : "pointer", fontFamily: "var(--font-body)", fontSize: "12px", letterSpacing: "3px", fontWeight: 600, color: loading ? "hsl(var(--text-muted))" : "#050505", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              {loading && <div style={{ width: "14px", height: "14px", border: "2px solid #050505", borderTopColor: "transparent", borderRadius: "50%", animation: "spin .8s linear infinite" }} />}
              {loading ? t.contact_sending : t.contact_send}
            </button>
          </form>

          <button onClick={() => setPage("booking")} style={{ marginTop: "16px", width: "100%", padding: "14px", background: "transparent", border: "1px solid hsl(var(--border))", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "2px", color: "hsl(var(--foreground))", textTransform: "uppercase" }}>
            {t.book_cta} →
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
