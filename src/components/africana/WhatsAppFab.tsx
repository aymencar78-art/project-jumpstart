const PHONE = "+216 27 906 446";
const WA_NUMBER = "21627906446";

const WhatsAppFab = () => {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp ${PHONE}`}
      className="wa-fab"
      style={{
        position: "fixed",
        right: "18px",
        bottom: "calc(86px + env(safe-area-inset-bottom))",
        zIndex: 160,
        width: "58px",
        height: "58px",
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
      {/* Official WhatsApp glyph */}
      <svg
        viewBox="0 0 32 32"
        width="30"
        height="30"
        style={{ position: "relative", zIndex: 1 }}
        aria-hidden="true"
      >
        <path
          fill="#fff"
          d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.255.59 4.46 1.71 6.404L3.2 28.8l6.55-1.717a12.77 12.77 0 0 0 6.252 1.62h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.633-3.75-9.052A12.717 12.717 0 0 0 16.003 3.2zm0 23.36h-.004a10.6 10.6 0 0 1-5.404-1.48l-.388-.23-3.886 1.02 1.038-3.79-.252-.39a10.59 10.59 0 0 1-1.624-5.69c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.51 1.107 7.518 3.116a10.56 10.56 0 0 1 3.114 7.52c0 5.86-4.77 10.63-10.742 10.63zm5.83-7.96c-.32-.16-1.89-.93-2.183-1.037-.293-.107-.506-.16-.72.16-.213.32-.826 1.037-1.013 1.25-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.572-1.587-.95-.847-1.59-1.893-1.776-2.213-.187-.32-.02-.493.14-.652.144-.144.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.624-.524-.54-.72-.55l-.613-.01a1.18 1.18 0 0 0-.853.4c-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.094 1.306 3.307.16.213 2.255 3.443 5.467 4.83.764.33 1.36.527 1.825.674.767.244 1.466.21 2.018.127.616-.092 1.89-.773 2.157-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z"
        />
      </svg>
      <style>{`
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: .55; }
          80% { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @media(min-width:769px){
          .wa-fab{ bottom: 24px !important; right: 24px !important; }
        }
      `}</style>
    </a>
  );
};

export default WhatsAppFab;
