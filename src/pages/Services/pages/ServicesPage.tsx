import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/pages/Home/sections/CTASection";
import {
  CheckIcon,
  ArrowRightIcon,
} from "@/components/icons";
import ShinyText from "@/components/ui/ShinyText";

const services = [
  {
    name: "Cybersecurity",
    href: "/cybersecurity",
    image: "/images/cybersecurity.jpg",
    description:
      "End-to-end cybersecurity solutions including threat intelligence, vulnerability management, SOC-as-a-Service, and compliance frameworks tailored for the Middle East.",
    features: [
      "VAPT & Penetration Testing",
      "24/7 SOC Monitoring",
      "Endpoint Detection & Response",
      "Next-Gen Firewall Management",
      "Data Loss Prevention",
    ],
    outcome: "Clients reduce mean time to detect from 197 days to under 4 hours.",
  },
  {
    name: "Cloud Solutions",
    href: "/cloud-solutions",
    image: "/images/cloud.jpg",
    description:
      "Secure cloud migration, multi-cloud architecture, and managed cloud services across AWS, Azure, and private cloud environments.",
    features: [
      "Cloud Migration & Strategy",
      "Multi-Cloud Architecture",
      "Cloud Cost Optimization (FinOps)",
      "Disaster Recovery & Continuity",
      "Cloud-Native Security",
    ],
    outcome: "Average 35% reduction in cloud spend within 90 days of optimization.",
  },
  {
    name: "IT Infrastructure",
    href: "/infrastructure",
    image: "/images/infrastructure.jpg",
    description:
      "Enterprise networking, data center design, structured cabling, and next-generation firewall deployments for mission-critical environments.",
    features: [
      "Network Architecture & Cabling",
      "Server & Storage Solutions",
      "Virtualization (VMware, Hyper-V)",
      "Enterprise Wireless Design",
      "Performance Monitoring",
    ],
    outcome: "Clients achieve 99.97% infrastructure uptime with proactive monitoring.",
  },
  {
    name: "Managed Services",
    href: "/managed-services",
    image: "/images/managed-services.jpg",
    description:
      "Proactive 24/7 monitoring, incident response, patch management, and IT operations outsourcing with guaranteed SLAs.",
    features: [
      "24/7 Infrastructure Monitoring",
      "Patch Management & Updates",
      "Incident Response & Escalation",
      "Help Desk (L1/L2/L3)",
      "Annual Maintenance Contracts",
    ],
    outcome: "60% average reduction in IT operational overhead for managed clients.",
  },
  {
    name: "Application Security",
    href: "/application-security-solutions",
    image: "/images/app-security.jpg",
    description:
      "Web application penetration testing, API security, secure code review, WAF management, and DAST scanning for UAE businesses.",
    features: [
      "OWASP Top 10 Testing",
      "API Security Assessment",
      "Secure Code Review",
      "WAF Management",
      "DAST & SAST Scanning",
    ],
    outcome: "Identify and remediate critical vulnerabilities before they reach production.",
  },
  {
    name: "AMC Services",
    href: "/amc-services",
    image: "/images/amc.jpg",
    description:
      "Annual Maintenance Contracts with preventive maintenance, 24/7 monitoring, patch management, and hardware lifecycle management.",
    features: [
      "Preventive Maintenance",
      "24/7 System Monitoring",
      "Hardware Lifecycle Management",
      "Backup Testing & Validation",
      "Priority Support & SLAs",
    ],
    outcome: "Predictable IT costs with zero unplanned downtime from preventable failures.",
  },
];

const whyOneProvider = [
  {
    title: "Single SLA, Full Accountability",
    description:
      "When an issue spans your firewall and your cloud environment, you don't need two vendors pointing fingers. You need one team that owns the whole resolution path.",
  },
  {
    title: "No Finger-Pointing",
    description:
      "With multiple vendors, incident investigations stall while teams argue about whose scope the problem falls under. We eliminate that entirely — our team sees the full picture.",
  },
  {
    title: "Consolidated Reporting",
    description:
      "One dashboard. One monthly report. One set of metrics that covers security posture, infrastructure health, cloud spend, and operational efficiency.",
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

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>
          IT Services — Cybersecurity, Cloud, Infrastructure, Managed Services |
          ArtiflexIT
        </title>
        <meta
          name="description"
          content="ArtiflexIT delivers cybersecurity, cloud solutions, IT infrastructure, managed services, application security, and AMC under one SLA. Serving UAE businesses with enterprise-grade protection."
        />
      </Helmet>

      <PageHero
        title={
          <>
            <ShinyText
              text="Security "
              speed={3}
              color="#28B5E1"
              shineColor="#ffffff"
              spread={120}
              className="inline-block font-display"
            />
            ,Cloud and {""}
            <ShinyText
              text="Infrastructure  "
              speed={3}
              color="#28B5E1"
              shineColor="#ffffff"
              spread={120}
              className="inline-block font-display"
            />
            {""} - Under One Roof

          </>
        }
        description="Six core IT disciplines delivered by one team, under one SLA, with one point of accountability. No vendor gaps. No finger-pointing. No blind spots."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      {/* All 6 Services Overview */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Our Services"
            title="Everything Your Business Needs"
            description="From cybersecurity to cloud migration, infrastructure to managed IT — we deliver comprehensive solutions tailored to your business."
            centered
          />

          <div className="space-y-8 sm:space-y-12">
            {services.map((service, idx) => (
              <motion.div
                key={service.name}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group rounded-2xl border border-border-light bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] hover:border-[#045891]/20 transition-all duration-500"
              >
                <div
                  className={`grid gap-0 lg:grid-cols-[1fr_1fr] ${idx % 2 !== 0 ? "lg:[direction:rtl]" : ""
                    }`}
                >
                  {/* Image */}
                  <Link to={service.href} className="relative h-56 sm:h-64 lg:h-auto lg:min-h-[320px] overflow-hidden block">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
                  </Link>

                  {/* Content */}
                  <div
                    className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-center ${idx % 2 !== 0 ? "lg:[direction:ltr]" : ""
                      }`}
                  >
                    <Link to={service.href} className="block">
                      <h3 className="font-display text-xl font-bold text-heading sm:text-2xl mb-3 hover:text-[#045891] transition-colors">
                        {service.name}
                      </h3>
                    </Link>

                    <p className="text-body leading-relaxed mb-5">
                      {service.description}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                      {service.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-body"
                        >
                          <CheckIcon className="w-4 h-4 text-[#045891] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="rounded-lg bg-[#045891]/5 border border-[#045891]/10 p-3 mb-5">
                      <p className="text-sm font-medium text-heading">
                        {service.outcome}
                      </p>
                    </div>

                    <Link
                      to={service.href}
                      className="inline-flex items-center gap-2 text-[#045891] font-semibold hover:text-[#1B8AC7] transition-colors group-hover:gap-3"
                    >
                      Learn More
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why One Provider */}
      <section className="relative py-14 bg-surface-secondary sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="The Advantage"
            title="Why One Provider Changes Everything"
            centered
          />
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {whyOneProvider.map((item) => (
              <Card key={item.title} className="p-6">
                <h3 className="font-display text-lg font-semibold text-[#045891] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Stop Juggling Vendors. Start Moving Forward."
        description="Get a unified IT assessment that identifies gaps between your current vendors and shows how consolidation strengthens security while reducing cost."
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />
    </>
  );
}
