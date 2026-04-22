/**
 * Floating gold dust particles used in the hero section.
 * Pure decoration — uses the `dust` keyframe defined in index.css.
 */
const Dust = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
    {Array.from({ length: 14 }, (_, i) => ({
      i,
      l: Math.random() * 100,
      sz: Math.random() * 2 + 0.8,
      del: Math.random() * 12,
      dur: Math.random() * 14 + 16,
      op: Math.random() * 0.3 + 0.1,
    })).map((p) => (
      <div
        key={p.i}
        style={{
          position: "absolute",
          bottom: "-6px",
          left: `${p.l}%`,
          width: `${p.sz}px`,
          height: `${p.sz}px`,
          borderRadius: "50%",
          background: `rgba(212,175,55,${p.op})`,
          boxShadow: `0 0 ${p.sz * 4}px rgba(212,175,55,${p.op * 0.7})`,
          animation: `dust ${p.dur}s ${p.del}s infinite linear`,
        }}
      />
    ))}
  </div>
);

export default Dust;
