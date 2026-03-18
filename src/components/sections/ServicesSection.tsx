import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/ui/SectionHeader";
import { ShieldIcon, CloudIcon, ServerIcon, GearIcon } from "@/components/icons";

const services = [
  {
    number: "01",
    icon: ShieldIcon,
    title: "Cybersecurity",
    description:
      "Stop threats before they reach your data. Our layered defense strategy covers everything from perimeter firewalls to endpoint detection, backed by a 24/7 security operations center.",
    href: "/services/cybersecurity",
  },
  {
    number: "02",
    icon: CloudIcon,
    title: "Cloud Solutions",
    description:
      "Move to the cloud without the migration headaches. We design, migrate, and manage cloud environments across AWS, Azure, and GCP with zero-downtime guarantees.",
    href: "/services/cloud-solutions",
  },
  {
    number: "03",
    icon: ServerIcon,
    title: "IT Infrastructure",
    description:
      "Build networks that scale with your ambitions. From structured cabling to SD-WAN deployment, we design infrastructure that eliminates bottlenecks and future-proofs your operations.",
    href: "/services/infrastructure",
  },
  {
    number: "04",
    icon: GearIcon,
    title: "Managed Services",
    description:
      "Focus on your business while we handle your IT. Proactive monitoring, patch management, and help desk support — all under one predictable monthly fee.",
    href: "/services/managed-services",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function ServicesSection() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          label="What We Deliver"
          title="End-to-End IT Solutions, Zero Gaps"
          centered
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group rounded-2xl bg-white border border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 hover:shadow-[0_8px_30px_rgba(27,138,199,0.08)] hover:border-brand-blue/25 hover:-translate-y-0.5 transition-all duration-500"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="inline-block rounded-full bg-surface-secondary px-2.5 py-0.5 text-xs font-semibold text-muted font-mono">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-heading">
                    {service.title}
                  </h3>

                  <p className="text-sm text-body leading-relaxed">
                    {service.description}
                  </p>

                  <Link
                    to={service.href}
                    className="mt-auto inline-flex items-center gap-1 text-brand-blue text-sm font-medium transition-colors duration-200 hover:text-brand-blue-bright"
                  >
                    Learn More
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
