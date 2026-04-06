import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";
import { useContactModal } from "@/components/layout/ContactModal";
import { Link } from "react-router-dom";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
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

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-28 text-center sm:px-6 sm:py-36 md:py-44 lg:py-48">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 sm:gap-8"
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#28B5E1] backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#28B5E1] animate-pulse-dot sm:h-2 sm:w-2" />
              Trusted Technology Partner Since 2012
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUpVariants}
            className="font-display text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-8xl"
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
            className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl"
          >
            Artiflex Information Technology delivers customized software, cybersecurity,
            cloud infrastructure, and managed IT solutions — empowering businesses
            across the UAE and beyond to operate efficiently and grow confidently.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex w-full flex-col items-center gap-3 pt-2 sm:w-auto sm:flex-row sm:gap-4"
          >
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_4px_20px_rgba(255,255,255,0.25)] sm:px-10 sm:py-4 sm:text-base w-full sm:w-auto cursor-pointer"
            >
              Discuss Your Requirements
            </button>

            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-[20px] border-2 border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/5 hover:border-white/30 sm:px-8 sm:py-4 sm:text-base w-full sm:w-auto"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={fadeUpVariants} className="mt-6 sm:mt-10">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
