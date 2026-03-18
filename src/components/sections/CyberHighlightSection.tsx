import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import {
  ShieldIcon,
  ServerIcon,
  GearIcon,
  CheckIcon,
} from "@/components/icons";

const capabilities = [
  {
    icon: ShieldIcon,
    title: "VAPT",
    description: "Identify vulnerabilities before attackers do",
  },
  {
    icon: ServerIcon,
    title: "SOC Monitoring",
    description: "24/7 threat detection and response",
  },
  {
    icon: GearIcon,
    title: "Endpoint Security",
    description: "Protection on every device, everywhere",
  },
  {
    icon: ShieldIcon,
    title: "Firewall Management",
    description: "Next-gen firewalls, expertly configured",
  },
  {
    icon: CheckIcon,
    title: "Data Protection",
    description: "Encryption, DLP, and compliance mapping",
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.45, ease: "easeOut" as const },
  }),
};

export function CyberHighlightSection() {
  return (
    <section className="bg-surface-secondary py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left column — Content */}
          <div className="flex flex-col gap-6">
            <SectionLabel text="Our Core Strength" />

            <h2 className="font-display text-2xl font-bold leading-tight text-heading sm:text-3xl md:text-4xl lg:text-5xl">
              Cybersecurity Is Not Optional — It&rsquo;s Your First Line of
              Defense
            </h2>

            <p className="max-w-lg text-base text-body leading-relaxed sm:text-lg">
              The UAE is one of the most targeted regions in the world for
              cyberattacks. From ransomware disrupting healthcare operations to
              phishing campaigns targeting financial institutions, the threat
              landscape evolves daily. Without a proactive, multi-layered defense
              strategy, your business is one breach away from operational
              shutdown, regulatory penalties, and irreversible reputational
              damage.
            </p>

            <div className="mt-2">
              <Button variant="gradient" size="lg" href="/services/cybersecurity">
                Explore Cybersecurity Services
              </Button>
            </div>
          </div>

          {/* Right column — Capability cards */}
          <div className="flex flex-col gap-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="group flex items-start gap-4 rounded-xl bg-white border border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 hover:shadow-[0_6px_20px_rgba(27,138,199,0.06)] hover:border-brand-blue/20 transition-all duration-400"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-heading">
                      {cap.title}
                    </h4>
                    <p className="mt-1 text-sm text-body leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
