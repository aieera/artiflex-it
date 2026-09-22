import { useState } from "react";
import { PARTNER_LOGOS } from "@/lib/constants";

// ─── Styles injected once ─────────────────────────────────────────────────────
const STYLE = `
  :root {
    --gold-100: #e8f4fb;
    --gold-300: #6aafd4;
    --gold-500: #045891;
    --gold-700: #033d66;
    --ink:      #0a1520;
    --muted:    #5a7a8f;
    --surface:  #f6fafd;
  }

  .vs-wrap * { box-sizing: border-box; }
  /* Plus Jakarta Sans is the site font, self-hosted + already loaded.
     DM Sans was dropped 2026-07-13: its Google Fonts @import added a
     render-delaying third-party CSS fetch for a 13px label. */
  .vs-wrap { font-family: 'Plus Jakarta Sans', sans-serif; }

  /* ── Scroll tracks ── */
  @keyframes scroll-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scroll-right {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  .scroll-fwd  { animation: scroll-left  70s linear infinite; }
  .scroll-rev  { animation: scroll-right 60s linear infinite; }
  .scroll-fwd:hover,
  .scroll-rev:hover { animation-play-state: paused; }

  /* ── Logo card ── */
  .logo-card {
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

  /* shimmer pseudo */
  .logo-card::before {
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

  .logo-card:hover::before {
    transform: translateX(100%);
  }

  .logo-card:hover {
    transform: translateY(-4px) scale(1.03);
    border-color: rgba(4,88,145,0.35);
    background: rgba(255,255,255,0.88);
    box-shadow:
      0 12px 28px rgba(0,0,0,0.08),
      0 0 0 1px rgba(4,88,145,0.25) inset,
      0 0 18px rgba(4,88,145,0.12);
  }

  /* ── Logo image ── */
  .logo-img {
    height: 28px;
    width: auto;
    max-width: 110px;
    object-fit: contain;
    filter: none !important;  
  opacity: 1 !important;
    transition:
      transform 0.4s ease;
  }
  .logo-card:hover .logo-img {
    transform: scale(1.06);
  }

  /* ── Fallback text ── */
  .logo-text {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--muted);
    transition: color 0.3s ease;
    white-space: nowrap;
  }
  .logo-card:hover .logo-text { color: var(--gold-700); }

  /* ── Fade masks ── */
  .fade-left  { background: linear-gradient(to right, var(--surface) 0%, transparent 100%); }
  .fade-right { background: linear-gradient(to left,  var(--surface) 0%, transparent 100%); }

  /* ── Divider line ── */
  .divider-line {
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
  .partner-badge {
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
    color: var(--gold-700);
    text-transform: uppercase;
  }
  .badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--gold-500);
    box-shadow: 0 0 0 2px rgba(4,88,145,0.25);
    animation: pulse-dot 2.4s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 2px rgba(4,88,145,0.25); }
    50%       { box-shadow: 0 0 0 5px rgba(4,88,145,0.08); }
  }

  /* ── Glow orb ── */
  .glow-orb {
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
    <div className="logo-card" style={{ margin: "0 20px" }}>
      {failed ? (
        <span className="logo-text">{name}</span>
      ) : (
        <img
          src={src}
          alt={name}
          className="logo-img"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function LogoTrack({
  logos,
  reverse = false,
}: {
  logos: ReadonlyArray<{ name: string; src: string }>;
  reverse?: boolean;
}) {
  const doubled = [...logos, ...logos];
  return (
    <div style={{ position: "relative", overflow: "hidden", padding: "10px 0" }}>
      {/* fade masks */}
      <div className="fade-left" style={{ position: "absolute", inset: "0 auto 0 0", width: 150, zIndex: 10 }} />
      <div className="fade-right" style={{ position: "absolute", inset: "0 0 0 auto", width: 150, zIndex: 10 }} />

      <div
        className={reverse ? "scroll-rev" : "scroll-fwd"}
        style={{ display: "flex", alignItems: "center", width: "max-content" }}
      >
        {doubled.map((logo, i) => (
          <LogoCard key={`${logo.name}-${i}`} name={logo.name} src={logo.src} />
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function VendorStrip() {
  return (
    <section
      className="vs-wrap"
      style={{
        position: "relative",
        background: "var(--surface)",
        borderTop: "1px solid rgba(4,88,145,0.12)",
        borderBottom: "1px solid rgba(4,88,145,0.12)",
        padding: "52px 0",
        overflow: "hidden",
      }}
    >
      <style>{STYLE}</style>

      {/* Ambient glow orbs */}
      <div className="glow-orb" style={{ width: 400, height: 400, background: "#045891", top: -120, left: "10%" }} />
      <div className="glow-orb" style={{ width: 300, height: 300, background: "#6aafd4", bottom: -100, right: "15%" }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div className="partner-badge" style={{ display: "inline-flex" }}>
          <span className="badge-dot" />
          Trusted by global partners
        </div>
      </div>

      {/* Partner credentials (Sophos Platinum, Hexnode Premium), visible above the fold */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginBottom: 36, padding: "0 16px" }}>
        <a
          href="/vendors/sophos"
          aria-label="ArtiflexIT is a Sophos Platinum Partner in UAE"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 20px",
            borderRadius: 14,
            border: "1px solid rgba(4,88,145,0.18)",
            background: "rgba(255,255,255,0.85)",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <img
            src="/sophos-platinum-partner/Sophos-Platinum-Partner.svg"
            alt="Sophos Platinum Partner UAE Dubai"
            style={{ height: 56, width: "auto" }}
            loading="lazy"
            width={56}
            height={56}
          />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--gold-700)", letterSpacing: "0.02em" }}>
            Sophos Platinum Partner
            <span style={{ display: "block", fontSize: 11, fontWeight: 400, color: "var(--muted)", letterSpacing: "0.04em" }}>
              Authorized in UAE | Dubai
            </span>
          </span>
        </a>
        <a
          href="/cybersecurity/mobile-security/hexnode"
          aria-label="ArtiflexIT is a Hexnode Premium Partner in UAE"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 20px",
            borderRadius: 14,
            border: "1px solid rgba(4,88,145,0.18)",
            background: "rgba(255,255,255,0.85)",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <img
            src="/logos/Hexnode.png"
            alt="Hexnode Premium Partner UAE Dubai"
            style={{ height: 40, width: "auto" }}
            loading="lazy"
            width={119}
            height={40}
          />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--gold-700)", letterSpacing: "0.02em" }}>
            Hexnode Premium Partner
            <span style={{ display: "block", fontSize: 11, fontWeight: 400, color: "var(--muted)", letterSpacing: "0.04em" }}>
              Authorized in UAE | Dubai
            </span>
          </span>
        </a>
      </div>

      {/* Single scrolling row */}
      <LogoTrack logos={PARTNER_LOGOS} />

      {/* Bottom rule */}
      <div className="divider-line" style={{ margin: "40px auto 0", maxWidth: 600 }} />
    </section>
  );
}