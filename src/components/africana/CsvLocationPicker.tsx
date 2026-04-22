import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Plane, MapPin } from "lucide-react";
import { TRANSFER_LOCATIONS, type TransferLocation } from "@/data/transfers";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  id?: string;
  ariaLabel?: string;
  /** when true, exclude this exact name from the dropdown */
  excludeName?: string;
};

/**
 * Curated picker over the CSV transfer locations.
 * - Free-text input (you can type anything).
 * - When focused / typing, shows matching airports + cities grouped.
 * - Picking a suggestion sets the value to the exact CSV name so route lookup works.
 */
const CsvLocationPicker = forwardRef<HTMLDivElement, Props>(({ value, onChange, placeholder, id, ariaLabel, excludeName }, _ref) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    return TRANSFER_LOCATIONS
      .filter((l) => l.name !== excludeName)
      .filter((l) => !q || l.name.toLowerCase().includes(q));
  }, [value, excludeName]);

  const airports = filtered.filter((l) => l.kind === "airport");
  const cities = filtered.filter((l) => l.kind === "city");

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const renderRow = (loc: TransferLocation) => (
    <li key={`${loc.kind}:${loc.name}`}>
      <button
        type="button"
        onMouseDown={(e) => {
          // mouseDown so it fires before input blur
          e.preventDefault();
          onChange(loc.name);
          setOpen(false);
        }}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "10px 14px",
          background: "transparent",
          border: "none",
          borderBottom: "1px solid hsl(var(--border))",
          cursor: "pointer",
          fontSize: "13px",
          color: "hsl(var(--ink))",
          fontFamily: "var(--font-body)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {loc.kind === "airport" ? (
          <Plane size={14} style={{ color: "hsl(var(--gold))" }} />
        ) : (
          <MapPin size={14} style={{ color: "hsl(var(--gold))" }} />
        )}
        <span>{loc.name}</span>
      </button>
    </li>
  );

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <input
        id={id}
        aria-label={ariaLabel}
        autoComplete="off"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "16px 14px",
          background: "#fff",
          border: "1px solid hsl(var(--border))",
          borderRadius: "8px",
          color: "hsl(var(--ink))",
          fontFamily: "var(--font-body)",
          fontSize: "17px",
          fontWeight: 600,
          outline: "none",
        }}
      />
      {open && (airports.length > 0 || cities.length > 0) && (
        <ul
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 30,
            margin: 0,
            padding: 0,
            listStyle: "none",
            background: "#fff",
            border: "1px solid hsl(var(--border-gold))",
            borderRadius: "10px",
            maxHeight: "260px",
            overflowY: "auto",
            boxShadow: "0 14px 30px rgba(0,0,0,.15)",
          }}
        >
          {airports.length > 0 && (
            <>
              <li
                style={{
                  padding: "8px 14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "2px",
                  color: "hsl(var(--gold))",
                  textTransform: "uppercase",
                  background: "hsl(var(--bg-surface))",
                }}
              >
                Airports
              </li>
              {airports.map(renderRow)}
            </>
          )}
          {cities.length > 0 && (
            <>
              <li
                style={{
                  padding: "8px 14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "2px",
                  color: "hsl(var(--gold))",
                  textTransform: "uppercase",
                  background: "hsl(var(--bg-surface))",
                }}
              >
                Cities
              </li>
              {cities.map(renderRow)}
            </>
          )}
        </ul>
      )}
    </div>
  );
});
CsvLocationPicker.displayName = "CsvLocationPicker";

export default CsvLocationPicker;
