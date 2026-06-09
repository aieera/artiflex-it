import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";
import { useContactModal } from "@/components/layout/ContactModal";

const LightPillar = lazy(() => import("@/components/ui/LightPillar"));

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export function HeroSection() {
  const { openModal } = useContactModal();

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      {/* LightPillar background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-black" />}>
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
        </Suspense>
      </div>

      {/* Content, vertically centered below fixed navbar, above scroll indicator */}
      <div className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center px-5 pt-32 pb-32 sm:px-6 sm:pt-36 sm:pb-36 md:pt-40 md:pb-40">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 text-center sm:gap-8 md:gap-10"
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-[#28B5E1] backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#28B5E1] animate-pulse-dot sm:h-2 sm:w-2" />
              Trusted Technology Partner Since 2012
            </span>
          </motion.div>

          {/* Heading, scales with both viewport width and height so it never overflows */}
          <motion.h1
            variants={fadeUpVariants}
            className="font-display font-bold tracking-tight text-white leading-[1.10] text-[3rem] sm:text-[clamp(6rem,min(9.5vw,13vh),9rem)]"
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
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            className="mx-auto max-w-2xl leading-relaxed text-slate-300 text-[clamp(1rem,1.6vw,1.25rem)]"
          >
            Artiflex Information Technology delivers customized software, cybersecurity,
            cloud infrastructure, and managed IT solutions, empowering businesses
            across the UAE and beyond to operate efficiently and grow confidently.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex w-full flex-col items-center gap-3 pt-1 sm:w-auto sm:flex-row sm:gap-4 sm:pt-2"
          >
            <button
              onClick={openModal}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_4px_20px_rgba(255,255,255,0.25)] sm:w-auto sm:px-9 sm:py-3.5 sm:text-base cursor-pointer"
            >
              Discuss Your Requirements
            </button>

          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator, pinned to section bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center sm:bottom-8"
      >
        <motion.button
          type="button"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="pointer-events-auto flex flex-col items-center gap-1.5 text-white/40 transition-colors hover:text-white/70"
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-70">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
}
