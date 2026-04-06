import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContactModal } from "@/components/layout/ContactModal";

const LightPillar = lazy(() => import("@/components/ui/LightPillar"));

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: { text: string; action?: string; href?: string };
  secondaryButton?: { text: string; href: string };
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
}: CTASectionProps) {
  const { openModal } = useContactModal();

  return (
    <section className="relative min-h-[70vh] sm:min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-black">
      {/* LightPillar background — same as hero */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-black" />}>
          <LightPillar
            topColor="#28B5E1"
            bottomColor="#045891"
            intensity={0.8}
            rotationSpeed={0.2}
            interactive
            glowAmount={0.003}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.3}
            quality="medium"
          />
        </Suspense>
      </div>

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
