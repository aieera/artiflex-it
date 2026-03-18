import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  HeartIcon,
  BuildingIcon,
  TruckIcon,
  BriefcaseIcon,
  CheckIcon,
} from "@/components/icons";

const industries = [
  {
    icon: HeartIcon,
    title: "Healthcare",
    stat: "2x",
    statLabel: "higher breach cost",
    description:
      "Protecting patient data and ensuring clinical system uptime under ADHICS and DHA compliance. Patient records sell for $250 each on the dark web — making healthcare the #1 targeted sector.",
    features: [
      "ADHICS compliance frameworks",
      "Medical device network segmentation",
      "EHR security & SOC monitoring",
    ],
  },
  {
    icon: BuildingIcon,
    title: "Finance & Banking",
    stat: "$5.9M",
    statLabel: "avg. breach cost",
    description:
      "Securing transactions and meeting CBUAE cybersecurity regulations with zero-trust architecture. Financial institutions face 300x more cyberattacks than other sectors.",
    features: [
      "Zero-trust network architecture",
      "PCI-DSS & CBUAE compliance",
      "Privileged access management",
    ],
  },
  {
    icon: TruckIcon,
    title: "Logistics & Supply Chain",
    stat: "742%",
    statLabel: "attack increase since 2020",
    description:
      "Safeguarding supply chain operations across multi-site environments with unified security, API gateway protection, and IoT device management.",
    features: [
      "Multi-site Sophos Site-in-a-Box",
      "API & partner integration security",
      "IoT and OT device protection",
    ],
  },
  {
    icon: BriefcaseIcon,
    title: "SMEs",
    stat: "60%",
    statLabel: "close within 6 months of breach",
    description:
      "Enterprise-grade protection at SME-friendly pricing. 43% of cyberattacks target small businesses — we deliver managed SOC and endpoint protection without requiring in-house expertise.",
    features: [
      "Managed SOC (no team needed)",
      "Employee security training",
      "Predictable monthly pricing",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function IndustriesPreviewSection() {
  return (
    <section className="bg-surface-secondary py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          label="Industries We Protect"
          title="Specialized Security for Every Sector"
          description="Tailored cybersecurity and IT solutions built for the regulatory and operational demands of your industry."
          centered
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group rounded-2xl bg-white border border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-8 hover:shadow-[0_8px_30px_rgba(27,138,199,0.08)] hover:border-brand-blue/25 hover:-translate-y-0.5 transition-all duration-500"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2 sm:gap-3">
                      <h3 className="font-display text-base font-semibold text-heading sm:text-lg">
                        {industry.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue/8 px-2.5 py-0.5 text-xs font-semibold text-brand-blue">
                        {industry.stat}
                        <span className="text-[10px] font-normal text-muted">{industry.statLabel}</span>
                      </span>
                    </div>

                    <p className="text-sm text-body leading-relaxed mb-4">
                      {industry.description}
                    </p>

                    <ul className="flex flex-wrap gap-2">
                      {industry.features.map((f) => (
                        <li
                          key={f}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-surface-secondary px-2.5 py-1 text-xs text-body"
                        >
                          <CheckIcon className="h-3 w-3 text-brand-blue shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
