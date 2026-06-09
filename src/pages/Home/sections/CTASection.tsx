import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContactModal } from "@/components/layout/ContactModal";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: { text: string; action?: string; href?: string };
  secondaryButton?: { text: string; href: string };
}

/**
 * CTASection
 * ────────────────────────────────────────────────────────────────
 * Used at the bottom of every page. Previously rendered a 504 KB
 * three.js LightPillar scene as the background, that single
 * decision was responsible for the heaviest chunk on every page
 * load and was the single biggest Core Web Vitals regression.
 *
 * Replaced with a pure-CSS gradient + animated radial glow that
 * delivers ~95% of the visual effect at ~0 KB. No JS, no GPU
 * thrash, no LCP penalty.
 *
 * The keyframe animation uses transform/opacity only, so it stays
 * GPU-accelerated and won't trigger layout reflows.
 * ────────────────────────────────────────────────────────────────
 */
export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
}: CTASectionProps) {
  const { openModal } = useContactModal();

  return (
    <section
      className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-black sm:min-h-[80vh] md:min-h-[85vh]"
      aria-label="Call to action"
    >
      {/* CSS-driven background, replaces the 504 KB three.js LightPillar */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        {/* Deep base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#04101E] to-black" />

        {/* Vertical light pillar, soft, glowing, animated */}
        <div className="cta-pillar absolute left-1/2 top-1/2 h-[140%] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(40,181,225,0.55)_0%,rgba(27,138,199,0.28)_28%,rgba(4,88,145,0.10)_55%,transparent_75%)] blur-3xl" />

        {/* Secondary glow for depth */}
        <div className="cta-pillar-aux absolute left-1/2 top-1/2 h-[80%] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(40,181,225,0.4),transparent_70%)] blur-2xl" />

        {/* Top + bottom vignettes for cinematic edge */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />

        {/* Subtle grain via SVG noise, pure CSS, no asset request */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.5\'/></svg>")',
          }}
        />
      </div>

      <style>{`
        @keyframes cta-pillar-pulse {
          0%, 100% { opacity: 1;   transform: translate(-50%, -50%) scale(1);    }
          50%      { opacity: 0.85; transform: translate(-50%, -50%) scale(1.04); }
        }
        @keyframes cta-pillar-aux-drift {
          0%, 100% { opacity: 0.85; transform: translate(-50%, -50%) scale(1);    }
          50%      { opacity: 0.55; transform: translate(-48%, -52%) scale(1.06); }
        }
        .cta-pillar     { animation: cta-pillar-pulse     8s ease-in-out infinite; will-change: transform, opacity; }
        .cta-pillar-aux { animation: cta-pillar-aux-drift 10s ease-in-out infinite; will-change: transform, opacity; }
        @media (prefers-reduced-motion: reduce) {
          .cta-pillar, .cta-pillar-aux { animation: none; }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold text-white tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto sm:mt-5 sm:text-base md:text-lg">
              {description}
            </p>
            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
              {primaryButton.action === "modal" ? (
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] sm:px-10 sm:py-4 sm:text-base w-full sm:w-auto cursor-pointer"
                >
                  {primaryButton.text}
                </button>
              ) : primaryButton.href ? (
                <Link
                  to={primaryButton.href}
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] sm:px-10 sm:py-4 sm:text-base w-full sm:w-auto"
                >
                  {primaryButton.text}
                </Link>
              ) : null}
              {secondaryButton && (
                <Link
                  to={secondaryButton.href}
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/5 hover:border-white/40 sm:px-10 sm:py-4 sm:text-base w-full sm:w-auto"
                >
                  {secondaryButton.text}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
