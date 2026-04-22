import { useEffect, useRef, useState } from "react";

/**
 * Worldwide location autocomplete using OpenStreetMap Nominatim (free, no API key).
 * Returns a free-text input with a dropdown of suggestions.
 */
type Suggestion = { display_name: string; lat: string; lon: string; place_id: number };

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  id?: string;
  ariaLabel?: string;
};

const LocationAutocomplete = ({ value, onChange, placeholder, id, ariaLabel }: Props) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (!value || value.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = window.setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=6&q=${encodeURIComponent(value)}`,
          { headers: { Accept: "application/json" } }
        );
        const data: Suggestion[] = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
        setOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [value]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <input
        id={id}
        aria-label={ariaLabel}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => suggestions.length && setOpen(true)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "13px 16px",
          background: "#fff",
          border: "1px solid hsl(var(--border-gold))",
          color: "hsl(var(--foreground))",
          fontSize: "14px",
        }}
      />
      {open && (suggestions.length > 0 || loading) && (
        <ul
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 2px)",
            left: 0,
            right: 0,
            zIndex: 30,
            margin: 0,
            padding: 0,
            listStyle: "none",
            background: "#fff",
            border: "1px solid hsl(var(--border-gold))",
            maxHeight: "240px",
            overflowY: "auto",
            boxShadow: "0 8px 24px rgba(0,0,0,.18)",
          }}
        >
          {loading && (
            <li style={{ padding: "10px 14px", fontSize: "12px", color: "hsl(var(--text-muted))" }}>
              …
            </li>
          )}
          {suggestions.map((s) => (
            <li key={s.place_id}>
              <button
                type="button"
                onClick={() => {
                  onChange(s.display_name);
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
                  color: "hsl(var(--foreground))",
                  fontFamily: "var(--font-body)",
                }}
              >
                {s.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
