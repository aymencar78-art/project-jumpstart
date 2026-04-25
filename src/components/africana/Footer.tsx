import type { PageKey } from "@/lib/pages";
import type { Lang, Translation } from "@/i18n/types";
import { isRTL } from "@/i18n/translations";

type Props = { setPage: (p: PageKey) => void; lang: Lang; t: Translation };

const Footer = ({ setPage, lang, t }: Props) => {
  const dir = isRTL(lang) ? "rtl" : "ltr";

  const quickTitle = ({ FR: "ACCÈS RAPIDE", EN: "QUICK LINKS", IT: "ACCESSO RAPIDO", DE: "SCHNELLZUGRIFF", ES: "ACCESO RÁPIDO", AR: "روابط سريعة" } as Record<Lang, string>)[lang];

  const columns = [
    {
      title: quickTitle,
      links: [
        { l: t.nav_home, p: "home" as PageKey },
        { l: t.nav_book, p: "booking" as PageKey },
        { l: t.nav_excursions, p: "excursions" as PageKey },
        { l: t.nav_pricing, p: "pricing" as PageKey },
        { l: t.nav_contact, p: "contact" as PageKey },
      ],
    },
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
      title: ({ FR: "DESTINATIONS", EN: "DESTINATIONS", IT: "DESTINAZIONI", DE: "ZIELE", ES: "DESTINOS", AR: "الوجهات" } as Record<Lang, string>)[lang],
      links: [
        { l: "Hammamet", p: "booking" as PageKey },
        { l: "Sousse", p: "booking" as PageKey },
        { l: "Djerba", p: "booking" as PageKey },
        { l: "Tunis", p: "booking" as PageKey },
      ],
    },
  ];

  return (
    <footer
      dir={dir}
      style={{
        background: "hsl(var(--ink))",
        borderTop: "1px solid hsl(var(--border-gold))",
        padding: "48px 16px 90px",
        color: "hsl(var(--on-ink))",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        {/* Brand */}
        <div style={{ marginBottom: "32px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "1px solid hsl(var(--gold))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                background: "hsl(var(--gold-light))",
                transform: "rotate(45deg)",
                boxShadow: "0 0 10px hsl(var(--gold) / 0.6)",
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                fontWeight: 600,
                letterSpacing: "3px",
                color: "hsl(var(--on-ink))",
                marginBottom: "4px",
              }}
            >
              AFRICA<span className="gold-text">NA</span>
            </div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                color: "hsl(var(--gold))",
                marginBottom: "10px",
                fontFamily: "var(--font-mono)",
              }}
            >
              TUNISIE · PRESTIGE
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "hsl(var(--on-ink-muted))",
                lineHeight: 1.65,
                maxWidth: "420px",
              }}
            >
              {t.footer_tagline}
            </p>
          </div>
        </div>

        {/* Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "32px",
            marginBottom: "36px",
            paddingBottom: "28px",
            borderBottom: "1px solid hsl(var(--border-gold))",
          }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "3px",
                  color: "hsl(var(--gold))",
                  marginBottom: "16px",
                  fontWeight: 700,
                }}
              >
                {col.title.toUpperCase()}
              </div>
              {col.links.map((l) => (
                <button
                  key={l.l}
                  onClick={() => setPage(l.p)}
                  style={{
                    display: "block",
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: "14px",
                    color: "hsl(var(--on-ink-muted))",
                    marginBottom: "10px",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    textAlign: isRTL(lang) ? "right" : "left",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(var(--gold-light))")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(var(--on-ink-muted))")}
                >
                  {l.l}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "hsl(var(--on-ink-muted))",
              fontFamily: "var(--font-body)",
            }}
          >
            {t.footer_rights}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "hsl(var(--gold))",
              fontFamily: "var(--font-mono)",
              letterSpacing: "1px",
            }}
          >
            📞 +216 27 906 446 · ✉ Contact@africana-transfert.com
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
