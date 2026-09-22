import { lazy, Suspense, useEffect, useState } from "react";
import ShinyText from "@/components/ui/ShinyText";
import { useContactModal } from "@/components/layout/ContactModal";
import { trackEvent } from "@/lib/analytics";

const LightPillar = lazy(() => import("@/components/ui/LightPillar"));

/**
 * Detect low-power devices (mobile, low memory, save-data) so we can skip the
 * WebGL LightPillar background and ship a CSS-only gradient instead.
 *
 * Why: LightPillar pulls in three.js (~500 KB gzip), runs a GPU shader and
 * adds ~5 s of Total Blocking Time on mid-range Android. On those devices
 * the gradient is visually close enough and keeps LCP under 2.5 s.
 *
 * INTERACTION GATE (2026-07-14): even on capable desktops, the pillar now
 * waits for the FIRST user interaction (mouse move, scroll, touch, key).
 * Desktop Lighthouse showed the WebGL startup costing ~2.5 s of Total
 * Blocking Time during page load. Real visitors move the mouse within
 * moments of landing, so they still see the animation almost immediately,
 * but the startup cost no longer lands inside the page-load window. Until
 * then the CSS gradient (StaticHeroBackground) is shown, so there is no
 * blank state and no layout shift when the pillar fades in.
 */
function useShouldRenderWebGL(): boolean {
  const [allow, setAllow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    let disposed = false;
    const events: (keyof WindowEventMap)[] = [
      "pointermove",
      "pointerdown",
      "scroll",
      "touchstart",
      "keydown",
    ];
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
    };
    function onFirstInteraction() {
      cleanup();
      if (!disposed) evaluateCapability();
    }
    function evaluateCapability() {
    // Require a real desktop with comfortable resources.
    // Width >= 1280 covers most laptop+ screens. Memory >= 4 GB filters
    // out cheap Chromebooks and budget laptops where the shader still
    // drops frames. Hardware concurrency >= 4 keeps the WebGL render
    // off the main thread cores.
    const isWide = window.matchMedia("(min-width: 1280px)").matches;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency ?? 0;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const saveData = conn?.saveData === true;
    const slowNet =
      conn?.effectiveType === "slow-2g" ||
      conn?.effectiveType === "2g" ||
      conn?.effectiveType === "3g";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const capable =
      isWide &&
      !saveData &&
      !slowNet &&
      !reducedMotion &&
      (mem === undefined || mem >= 4) &&
      cores >= 4;
    setAllow(capable);
    }

    events.forEach((e) =>
      window.addEventListener(e, onFirstInteraction, { passive: true, once: false })
    );
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);
  return allow;
}

function StaticHeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(40,181,225,0.35) 0%, rgba(4,88,145,0.45) 35%, #000 75%), #000",
      }}
    />
  );
}

/**
 * Hero entrance animations previously used framer-motion's variants
 * + stagger system. Those are now pure CSS keyframes (see globals.css:
 * hero-fade-up* and hero-scroll-* classes) so framer-motion no longer
 * needs to be parsed and executed on the hero's critical render path.
 * ShinyText still uses framer-motion internally, so that lib is lazy
 * loaded after first paint instead of synchronously with the hero.
 */
export function HeroSection() {
  const { openModal } = useContactModal();
  const useWebGL = useShouldRenderWebGL();

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      {/* Hero background. The CSS gradient is ALWAYS rendered as the base
          layer. On capable devices, after first interaction, the WebGL
          pillar mounts ON TOP of it inside .hero-pillar-fade, which
          cross-fades it in over ~2s (see globals.css) instead of the
          previous single-frame pop when the chunk finished loading. */}
      <div className="absolute inset-0 z-0">
        <StaticHeroBackground />
        {useWebGL && (
          <Suspense fallback={null}>
            <div className="hero-pillar-fade absolute inset-0">
              <LightPillar
                topColor="#28B5E1"
                bottomColor="#045891"
                intensity={1.2}
                rotationSpeed={0.3}
                interactive
                glowAmount={0.004}
                pillarWidth={3}
                pillarHeight={0.4}
                noiseIntensity={0.4}
                quality="high"
              />
            </div>
          </Suspense>
        )}
      </div>

      {/* Content, vertically centered below fixed navbar, above scroll indicator */}
      <div className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center px-5 pt-32 pb-32 sm:px-6 sm:pt-36 sm:pb-36 md:pt-40 md:pb-40">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 text-center sm:gap-8 md:gap-10">
          {/* Badge */}
          <div className="hero-fade-up hero-fade-up-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-[#28B5E1] backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#28B5E1] animate-pulse-dot sm:h-2 sm:w-2" />
              Trusted Technology Partner Since 2012
            </span>
          </div>

          {/* Brand statement, styled large but not the document H1 (SEO heading lives below) */}
          <div
            aria-hidden="true"
            className="hero-fade-up hero-fade-up-2 font-display font-bold tracking-tight text-white leading-[1.10] text-[3rem] sm:text-[clamp(6rem,min(9.5vw,13vh),9rem)]"
          >
            <span className="block">Innovate.</span>
            <span className="block">
              <ShinyText
                text="Secure."
                speed={3}
                color="#28B5E1"
                shineColor="#ffffff"
                spread={120}
                className="font-display"
              />
            </span>
            <span className="block">Transform.</span>
          </div>

          {/* Real SEO H1, visually a subheadline */}
          <h1 className="hero-fade-up hero-fade-up-3 font-display font-semibold tracking-tight text-white/90 leading-snug text-[clamp(1rem,1.8vw,1.5rem)]">
            Secure, Modern IT Solutions Company in Dubai &amp; Across the UAE
          </h1>

          {/* Description */}
          <p className="hero-fade-up hero-fade-up-3 mx-auto max-w-2xl leading-relaxed text-slate-300 text-[clamp(1rem,1.6vw,1.25rem)]">
            Artiflex Information Technology, as a trusted IT solutions provider in Dubai,
            delivers customized software, cybersecurity, cloud infrastructure, managed
            IT support, and end-to-end IT solutions, empowering businesses across the UAE
            and beyond to operate efficiently and grow confidently.
          </p>

          {/* CTA Buttons */}
          <div className="hero-fade-up hero-fade-up-4 flex w-full flex-col items-center gap-3 pt-1 sm:w-auto sm:flex-row sm:gap-4 sm:pt-2">
            <button
              onClick={() => {
                trackEvent("cta_click", { location: "hero", label: "discuss_requirements" });
                openModal();
              }}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_4px_20px_rgba(255,255,255,0.25)] sm:w-auto sm:px-9 sm:py-3.5 sm:text-base cursor-pointer"
            >
              Discuss Your Requirements
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator, pinned to section bottom */}
      <div className="hero-scroll-indicator pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center sm:bottom-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="pointer-events-auto flex flex-col items-center gap-1.5 text-white/40 transition-colors hover:text-white/70"
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-70">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
