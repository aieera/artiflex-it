import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useContactModal } from "@/components/layout/ContactModal";

const Beams = lazy(() => import("@/components/ui/Beams"));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function HeroSection() {
  const { openModal } = useContactModal();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Beams 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="h-full w-full bg-navy-deep" />
          }
        >
          <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#1B8AC7"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={0}
            backgroundColor="#04101E"
          />
        </Suspense>
      </div>

      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/80"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center sm:px-6 sm:py-32 md:py-40 lg:py-48">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 sm:gap-8"
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-brand-blue-bright backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse-dot sm:h-2 sm:w-2" />
              Defending Digital Frontiers Since 2015
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUpVariants}
            className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-7xl"
          >
            Your Business Deserves Security That
            <br className="hidden sm:block" />
            <span className="gradient-text"> Never Sleeps</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl"
          >
            Every day, businesses across the UAE face sophisticated cyber threats
            targeting their data, operations, and reputation. ArtiflexIT provides
            round-the-clock cybersecurity monitoring, cloud infrastructure, and IT
            management — so you can focus on growth, not vulnerabilities.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Button variant="gradient" size="lg" onClick={openModal} className="w-full sm:w-auto">
              Schedule Security Audit
            </Button>
            <Button variant="outline" size="lg" href="/services" className="w-full sm:w-auto">
              Explore Services
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
