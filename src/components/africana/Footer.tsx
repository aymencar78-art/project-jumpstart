import type { PageKey } from "@/lib/pages";
import type { Lang, Translation } from "@/i18n/types";
import { isRTL } from "@/i18n/translations";

type Props = { setPage: (p: PageKey) => void; lang: Lang; t: Translation };

const Footer = ({ setPage, lang, t }: Props) => (
  <footer style={{ background: "hsl(var(--bg-surface))", borderTop: "1px solid hsl(var(--border))", padding: "36px 16px 80px" }} dir={isRTL(lang) ? "rtl" : "ltr"}>
    <div style={{ maxWidth: "860px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, marginBottom: "5px" }}>
          AFRICA<span className="gold-text">NA</span>
        </div>
        <div style={{ fontSize: "11px", fontStyle: "italic", color: "hsl(var(--accent-dim))", marginBottom: "8px" }}>{t.tagline}</div>
        <p style={{ fontSize: "11px", color: "hsl(var(--text-muted))", lineHeight: 1.6 }}>{t.footer_tagline}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "24px", marginBottom: "24px" }}>
        {[
          {
            title: t.footer_services_col,
            links: [
              { l: t.footer_airport_link, p: "booking" as PageKey },
              { l: t.footer_excursions_link, p: "excursions" as PageKey },
              { l: t.footer_vip_link, p: "booking" as PageKey },
            ],
          },
          {
            title: t.footer_info_col,
            links: [
              { l: t.nav_pricing, p: "pricing" as PageKey },
              { l: t.nav_contact, p: "contact" as PageKey },
            ],
          },
          {
            title: "DESTINATIONS",
            links: [
              { l: "Transfert Hammamet", p: "booking" as PageKey },
              { l: "Taxi Sousse", p: "booking" as PageKey },
              { l: "Navette Djerba", p: "booking" as PageKey },
              { l: "VTC Tunis", p: "booking" as PageKey },
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "7px", letterSpacing: "3px", color: "hsl(var(--gold))", marginBottom: "12px" }}>{col.title.toUpperCase()}</div>
            {col.links.map((l) => (
              <div key={l.l} onClick={() => setPage(l.p)} style={{ fontSize: "12px", color: "hsl(var(--text-muted))", marginBottom: "7px", cursor: "pointer" }}>
                {l.l}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid hsl(var(--border))", paddingTop: "18px", display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ fontSize: "10px", color: "hsl(var(--text-muted))" }}>{t.footer_rights}</div>
        <div style={{ fontSize: "10px", color: "hsl(var(--accent-dim))", fontFamily: "var(--font-mono)" }}>📞 +216 XX XXX XXX · ✉ contact@africana.tn</div>
      </div>
    </div>
  </footer>
);

export default Footer;
