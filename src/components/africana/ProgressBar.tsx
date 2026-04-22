import type { Translation } from "@/i18n/types";

type Props = { step: number; t: Translation };

const ProgressBar = ({ step, t }: Props) => {
  const steps = [t.step1, t.step2, t.step3];
  return (
    <div style={{ padding: "18px 16px", borderBottom: "1px solid hsl(var(--border))", background: "hsl(var(--bg-surface))" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", alignItems: "center" }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "0 0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 600,
                  border: `1px solid ${i <= step ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: i < step ? "hsl(var(--gold))" : "transparent",
                  color: i < step ? "#050505" : i === step ? "hsl(var(--gold))" : "hsl(var(--text-muted))",
                  transition: "all .5s",
                }}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: "8px", letterSpacing: "1px", textTransform: "uppercase", color: i === step ? "hsl(var(--gold))" : "hsl(var(--text-muted))", whiteSpace: "nowrap" }}>{s}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: "1px", margin: "0 6px", marginBottom: "20px", background: i < step ? "hsl(var(--gold))" : "hsl(var(--border))", transition: "background .5s" }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
