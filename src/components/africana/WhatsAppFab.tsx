import { MessageCircle } from "lucide-react";

const PHONE = "+216 27 906 446";
const WA_NUMBER = "21627906446";

const WhatsAppFab = () => {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp ${PHONE}`}
      style={{
        position: "fixed",
        right: "18px",
        bottom: "calc(78px + env(safe-area-inset-bottom))",
        zIndex: 160,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(37,211,102,.45), 0 0 0 1px rgba(255,255,255,.08)",
        textDecoration: "none",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "#25D366",
          opacity: 0.45,
          animation: "wa-pulse 2.2s ease-out infinite",
        }}
      />
      <MessageCircle size={26} strokeWidth={2.2} color="#fff" style={{ position: "relative", zIndex: 1 }} />
      <style>{`
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: .55; }
          80% { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @media(min-width:769px){
          a[aria-label="WhatsApp ${PHONE}"]{ bottom: 24px !important; right: 24px !important; }
        }
      `}</style>
    </a>
  );
};

export default WhatsAppFab;
