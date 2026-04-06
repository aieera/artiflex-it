import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const reasons = [
  {
    title: "14+ Years, 500+ Projects Delivered",
    description:
      "With over 14 years of industry experience and more than 500 successfully completed projects, Artiflex has established a proven track record across cybersecurity, cloud, and IT infrastructure — serving industries from energy to fintech.",
  },
  {
    title: "Global Presence, Local Expertise",
    description:
      "Offices in four countries — including Dubai, Oman, and Saudi Arabia — mean we combine international best practices with deep local knowledge of regional regulations like NESA, ICA, and ADHICS.",
  },
  {
    title: "One Partner, Complete Coverage",
    description:
      "Stop juggling multiple IT vendors with fragmented SLAs. Artiflex Information Technology delivers cybersecurity, cloud, infrastructure, custom software, and managed services through a single contract and a single point of accountability.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function WhyChooseUsSection() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          label="Why Artiflex"
          title="Why Businesses Trust Artiflex"
          description="Three reasons our clients choose us — and stay."
          centered
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-6 md:grid-cols-3 md:gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group rounded-2xl bg-surface-secondary border border-border-light p-5 sm:p-8 hover:bg-white hover:shadow-[0_8px_30px_rgba(27,138,199,0.08)] hover:border-brand-blue/25 transition-all duration-500"
            >
              {/* Top accent line */}
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan mb-4 sm:mb-6" />

              <h3 className="text-heading font-display text-lg font-semibold">
                {reason.title}
              </h3>

              <p className="mt-4 text-body text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
