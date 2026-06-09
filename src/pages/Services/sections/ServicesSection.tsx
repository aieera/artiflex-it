import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  {
    title: "Cybersecurity",
    description:
      "Stop threats before they reach your data. Our layered defense strategy covers everything from perimeter firewalls to endpoint detection, backed by a 24/7 security operations center.",
    href: "/cybersecurity",
    image: "/images/cybersecurity.jpg",
  },
  {
    title: "Cloud Solutions",
    description:
      "Move to the cloud without the migration headaches. We design, migrate, and manage cloud environments across AWS, Azure, and GCP with zero-downtime guarantees.",
    href: "/cloud-solutions",
    image: "/images/cloud.jpg",
  },
  {
    title: "IT Infrastructure",
    description:
      "Build networks that scale with your ambitions. From structured cabling to SD-WAN deployment, we design infrastructure that eliminates bottlenecks and future-proofs your operations.",
    href: "/infrastructure",
    image: "/images/infrastructure.jpg",
  },
  {
    title: "Managed Services",
    description:
      "Focus on your business while we handle your IT. Proactive monitoring, patch management, and help desk support, all under one predictable monthly fee.",
    href: "/managed-services",
    image: "/images/managed-services.jpg",
  },
  {
    title: "Application Security",
    description:
      "Protect your web applications and APIs with penetration testing, secure code review, WAF management, and DAST scanning, aligned with OWASP Top 10 standards.",
    href: "/application-security-solutions",
    image: "/images/app-security.jpg",
  },
  {
    title: "Business Solutions",
    description:
      "Run your business on software that actually works as one. We implement and integrate ERP, CRM, finance, and HR platforms with vendor-neutral advice grounded in real 7-year TCO, so your data flows end to end.",
    href: "/business-solutions",
    image: "/images/office.jpg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function ServicesSection() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="shell">
        <SectionHeader
          label="What We Deliver"
          title="End-to-End IT Solutions, Zero Gaps"
          centered
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Link
                to={service.href}
                className="group rounded-2xl bg-white border border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgba(27,138,199,0.08)] hover:border-brand-blue/25 hover:-translate-y-0.5 transition-all duration-500 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="flex flex-col gap-3 p-5 flex-1">
                  <h3 className="font-display text-lg font-semibold text-heading">
                    {service.title}
                  </h3>

                  <p className="text-sm text-body leading-relaxed flex-1">
                    {service.description}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1 text-[#045891] text-sm font-medium transition-colors duration-200 group-hover:text-[#1B8AC7]">
                    Learn More
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
