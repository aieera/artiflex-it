import { useState } from "react";
import { CLIENT_LOGOS } from "@/lib/constants";

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cs-100:   #e8f4fb;
    --cs-300:   #6aafd4;
    --cs-500:   #045891;
    --cs-700:   #033d66;
    --cs-muted: #5a7a8f;
    --cs-surf:  #f6fafd;
  }

  .cs-wrap * { box-sizing: border-box; }
  .cs-wrap { font-family: 'DM Sans', sans-serif; }

  /* ── Scroll ── */
  @keyframes cs-scroll-right {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .cs-scroll-rev {
    animation: cs-scroll-right 36s linear infinite;
  }
  .cs-scroll-rev:hover { animation-play-state: paused; }

  /* ── Logo card ── */
  .cs-card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px 28px;
    border-radius: 14px;
    border: 1px solid transparent;
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow:
      0 2px 8px rgba(0,0,0,0.04),
      0 0 0 1px rgba(4,88,145,0.08) inset;
    cursor: pointer;
    transition:
      transform        0.45s cubic-bezier(0.34,1.56,0.64,1),
      box-shadow       0.35s ease,
      border-color     0.35s ease,
      background-color 0.35s ease;
    overflow: hidden;
  }
  .cs-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      115deg,
      transparent 30%,
      rgba(4,88,145,0.12) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  .cs-card:hover::before { transform: translateX(100%); }
  .cs-card:hover {
    transform: translateY(-4px) scale(1.03);
    border-color: rgba(4,88,145,0.35);
    background: rgba(255,255,255,0.88);
    box-shadow:
      0 12px 28px rgba(0,0,0,0.08),
      0 0 0 1px rgba(4,88,145,0.25) inset,
      0 0 18px rgba(4,88,145,0.12);
  }

  /* ── Logo image ── */
 .cs-img {
  height: 28px;
  width: auto;
  max-width: 110px;
  object-fit: contain;
  filter: none !important;   
  opacity: 1 !important;
}
  .cs-card:hover .cs-img {
    transform: scale(1.06);
  }

  /* ── Fallback text ── */
  .cs-text {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--cs-muted);
    transition: color 0.3s ease;
    white-space: nowrap;
  }
  .cs-card:hover .cs-text { color: var(--cs-700); }

  /* ── Fade masks ── */
  .cs-fade-l { background: linear-gradient(to right, var(--cs-surf) 0%, transparent 100%); }
  .cs-fade-r { background: linear-gradient(to left,  var(--cs-surf) 0%, transparent 100%); }

  /* ── Divider ── */
  .cs-divider {
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(4,88,145,0.3) 20%,
      rgba(4,88,145,0.5) 50%,
      rgba(4,88,145,0.3) 80%,
      transparent
    );
  }

  /* ── Badge ── */
  .cs-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 14px;
    border-radius: 100px;
    border: 1px solid rgba(4,88,145,0.3);
    background: rgba(232,244,251,0.7);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.16em;
    color: var(--cs-700);
    text-transform: uppercase;
  }
  .cs-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--cs-500);
    box-shadow: 0 0 0 2px rgba(4,88,145,0.25);
    animation: cs-pulse 2.4s ease-in-out infinite;
  }
  @keyframes cs-pulse {
    0%, 100% { box-shadow: 0 0 0 2px rgba(4,88,145,0.25); }
    50%       { box-shadow: 0 0 0 5px rgba(4,88,145,0.08); }
  }

  /* ── Glow orb ── */
  .cs-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(60px);
    opacity: 0.18;
  }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function LogoCard({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="cs-card" style={{ margin: "0 10px" }}>
      {failed ? (
        <span className="cs-text">{name}</span>
      ) : (
        <img
          src={src}
          alt={name}
          className="cs-img"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ClientStrip() {
  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      className="cs-wrap"
      style={{
        position: "relative",
        background: "var(--cs-surf)",
        borderTop: "1px solid rgba(4,88,145,0.12)",
        borderBottom: "1px solid rgba(4,88,145,0.12)",
        padding: "52px 0",
        overflow: "hidden",
      }}
    >
      <style>{STYLE}</style>

      {/* Ambient glow orbs */}
      <div className="cs-orb" style={{ width: 400, height: 400, background: "#045891", top: -120, right: "10%" }} />
      <div className="cs-orb" style={{ width: 300, height: 300, background: "#6aafd4", bottom: -100, left: "15%" }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div className="cs-badge">
          <span className="cs-dot" />
          Trusted by leading enterprises
        </div>
      </div>

      {/* Reverse-scrolling row */}
      <div style={{ position: "relative", overflow: "hidden", padding: "10px 0" }}>
        <div className="cs-fade-l" style={{ position: "absolute", inset: "0 auto 0 0", width: 120, zIndex: 10 }} />
        <div className="cs-fade-r" style={{ position: "absolute", inset: "0 0 0 auto", width: 120, zIndex: 10 }} />

        <div
          className="cs-scroll-rev"
          style={{ display: "flex", alignItems: "center", width: "max-content" }}
        >
          {items.map((logo, i) => (
            <LogoCard key={`${logo.name}-${i}`} name={logo.name} src={logo.src} />
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="cs-divider" style={{ margin: "40px auto 0", maxWidth: 600 }} />
    </section>
  );
}