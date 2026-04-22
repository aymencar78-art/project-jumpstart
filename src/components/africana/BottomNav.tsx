import type { PageKey } from "@/lib/pages";
import type { Translation } from "@/i18n/types";

type Props = { page: PageKey; setPage: (p: PageKey) => void; t: Translation };

const BottomNav = ({ page, setPage, t }: Props) => {
  const items: { k: PageKey; icon: string; l: string; primary?: boolean }[] = [
    { k: "home", icon: "🏠", l: t.nav_home },
    { k: "excursions", icon: "🗺", l: t.nav_excursions },
    { k: "booking", icon: "✈", l: t.book_cta, primary: true },
    { k: "pricing", icon: "💰", l: t.nav_pricing },
    { k: "contact", icon: "📞", l: t.nav_contact },
  ];
  return (
    <>
      <div
        id="bottom-nav"
        style={{
          display: "none",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 150,
          background: "hsl(var(--ink) / 0.96)",
          borderTop: "1px solid hsl(var(--border-gold))",
          backdropFilter: "blur(20px)",
          padding: `8px 0 max(8px,env(safe-area-inset-bottom))`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          {items.map((item) => (
            <button
              key={item.k}
              onClick={() => setPage(item.k)}
              style={{
                background: item.primary ? "linear-gradient(135deg,hsl(var(--gold)),hsl(var(--gold-light)))" : "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
                padding: item.primary ? "8px 14px" : "6px 8px",
                minWidth: "48px",
              }}
            >
              <span style={{ fontSize: "19px", lineHeight: 1 }}>{item.icon}</span>
              <span
                style={{
                  fontSize: "8px",
                  letterSpacing: ".5px",
                  color: item.primary ? "hsl(var(--ink))" : page === item.k ? "hsl(var(--gold-light))" : "hsl(var(--on-ink-muted))",
                  fontWeight: item.primary || page === item.k ? 600 : 400,
                }}
              >
                {item.l}
              </span>
            </button>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){#bottom-nav{display:block!important;}}`}</style>
    </>
  );
};

export default BottomNav;
