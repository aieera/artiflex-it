import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ProcessFlow from "@/components/ui/ProcessFlow";
import { CTASection } from "@/pages/Home/sections/CTASection";
import FAQAccordion from "@/components/ui/FAQAccordion";
import PremiumScrollStory from "@/components/ui/PremiumScrollStory";
import { useState } from "react";
import { motion } from "framer-motion";


const firewallStory = [
  {
    title: "The Internet Was Open",
    desc: "Early networks were built on trust. No protection, no boundaries — just open communication.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop", // early computing / open systems
  },
  {
    title: "The Morris Worm (1988)",
    desc: "One of the first cyber incidents spread rapidly, exposing how vulnerable connected systems were.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1920&auto=format&fit=crop", // hacking / system attack
  },
  {
    title: "The Need for Control",
    desc: "Organizations realized they needed a way to monitor and restrict traffic between networks.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop", // monitoring / network traffic
  },
  {
    title: "Birth of the Firewall",
    desc: "Inspired by physical fire barriers, firewalls became digital gates controlling network access.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920&auto=format&fit=crop", // barrier / protection concept
  },
  {
    title: "From Rules to Intelligence",
    desc: "Modern firewalls evolved into intelligent systems capable of detecting and stopping advanced threats.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop", // AI/network intelligence
  },
];

/* ───────── EVOLUTION ───────── */

const evolution = [
  {
    title: "Packet Filtering (1988)",
    desc: "The first firewall concept introduced basic filtering based on IP, port, and protocol rules.",
  },
  {
    title: "Stateful Inspection (1993)",
    desc: "Firewalls evolved to track active sessions, understanding connections instead of isolated packets.",
  },
  {
    title: "Application Layer (1994)",
    desc: "Deep inspection of application data allowed firewalls to detect threats hidden inside traffic.",
  },
  {
    title: "UTM Era (2000)",
    desc: "Unified Threat Management combined firewall, antivirus, intrusion prevention, and more in one system.",
  },
  {
    title: "NGFW & Cloud Era",
    desc: "Modern firewalls provide application awareness, user identity tracking, and cloud-based protection.",
  },
];

/* ───────── TYPES ───────── */

const firewallTypes = [
  {
    title: "Packet Filtering Firewall",
    desc: "Basic filtering based on IP, port, protocol.",
    details:
      "The earliest firewall (1988) operating at Layer 3/4. It inspects packets using simple rules but lacks context or memory, making it vulnerable to spoofing and modern attacks.",
  },
  {
    title: "Stateful Firewall",
    desc: "Tracks active sessions and connections.",
    details:
      "Introduced in 1993, it monitors full sessions instead of individual packets. It understands whether traffic belongs to a valid connection, significantly improving security.",
  },
  {
    title: "Proxy Firewall",
    desc: "Deep inspection of application-layer traffic.",
    details:
      "Operates at Layer 7 and inspects actual content (HTTP, FTP, SMTP). It blocks hidden threats inside traffic but may introduce latency.",
  },
  {
    title: "UTM Firewall",
    desc: "All-in-one security platform.",
    details:
      "Combines firewall, antivirus, intrusion prevention, web filtering, and more into one system. Simplifies security for businesses with centralized management.",
  },
  {
    title: "Next-Generation Firewall (NGFW)",
    desc: "Advanced firewall with app & user awareness.",
    details:
      "The modern gold standard. NGFW provides application awareness (App-ID), user identity tracking (User-ID), deep packet inspection, SSL/TLS decryption, and real-time threat intelligence. It can identify thousands of applications regardless of port or encryption and prevent zero-day attacks, making it a complete security intelligence platform.",
  },
  {
    title: "Web Application Firewall (WAF)",
    desc: "Protects web apps from attacks.",
    details:
      "Secures web applications against OWASP Top 10 threats like SQL injection, XSS, and CSRF. Essential for APIs, portals, and e-commerce platforms.",
  },
  {
    title: "FWaaS (Cloud Firewall)",
    desc: "Cloud-based firewall solution.",
    details:
      "Delivered via cloud, protecting users and apps anywhere. Core part of SASE architecture, ideal for remote work and distributed environments.",
  },
];

const ngfwFeatures = [
  {
    title: "Application Awareness",
    subtitle: "App-ID",
    desc: "Identifies and controls applications regardless of port, protocol, or encryption — even evasive apps.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31", // network infrastructure (clean, different)
  },
  {
    title: "User Identity Control",
    subtitle: "User-ID",
    desc: "Applies security policies based on user identity instead of IP address — enabling Zero Trust access.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d", // people/team identity
  },
  {
    title: "Deep Packet Inspection",
    subtitle: "Content-ID",
    desc: "Inspects actual traffic content to detect malware, intrusions, and hidden threats in real time.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4", // coding terminal (DIFFERENT from earlier)
  },
  {
    title: "SSL/TLS Decryption",
    subtitle: "Encrypted Traffic Visibility",
    desc: "Decrypts and inspects encrypted traffic where 80%+ threats hide — without performance loss.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3", // lock/security visual (different)
  },
];


/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "What is a firewall in cybersecurity?",
    answer:
      "A firewall is a security system that monitors and controls incoming and outgoing network traffic based on predefined security rules.",
  },
  {
    question: "What is the difference between NGFW and traditional firewall?",
    answer:
      "NGFW provides application awareness, user identity tracking, and deep inspection, unlike traditional firewalls which only filter based on ports and IP.",
  },
  {
    question: "Why are firewalls important for businesses?",
    answer:
      "They prevent unauthorized access, block cyber threats, and protect sensitive business data from breaches.",
  },
];

/* ───────── PAGE ───────── */

export default function FirewallNetworkPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  return (
    <>
      <Helmet>
        <title>Firewall & Network Security Solutions</title>
      </Helmet>

      {/* HERO */}
      <PageHero
        title={
          <>
            Firewall &{" "}
            <span className="gradient-text">Network Security</span>
          </>
        }
        description="Protect your network with advanced firewall technologies designed to detect, prevent, and respond to modern cyber threats."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "Firewall Security", href: "/firewall-network-security" },
        ]}
      />


      {/* EVOLUTION */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Evolution"
            title={
              <>
                Firewall <span className="gradient-text">Evolution</span>
              </>
            }
            centered
          />

          <ProcessFlow
            steps={evolution.map((item, index) => ({
              number: index + 1,
              title: item.title,
              description: item.desc,
            }))}
          />
        </div>
      </section>

      {/* STORY */}
      <section className="relative">
        <PremiumScrollStory items={firewallStory} />

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
      </section>

      {/* TYPES */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Types"
            title={
              <>
                Types of <span className="gradient-text">Firewalls</span>
              </>
            }
            centered
          />



          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {firewallTypes.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.title}
                  className={`rounded-xl border transition-all duration-300 ${isOpen
                    ? "border-brand-blue/30 bg-brand-blue/5"
                    : "border-border-light hover:border-slate-300"
                    }`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-heading mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-body">{item.desc}</p>
                      </div>

                      {/* Toggle Button */}
                      <button
                        onClick={() =>
                          setOpenIndex(isOpen ? null : index)
                        }
                        className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${isOpen
                          ? "rotate-45 border-brand-blue/50 bg-brand-blue/10 text-brand-blue"
                          : "border-border-light text-muted"
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-4 w-4"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>

                    {/* Expandable Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-4" : "max-h-0"
                        }`}
                    >
                      <p className="text-sm text-body leading-relaxed">
                        {item.details}
                      </p>

                      {/* Close Button */}
                      <button
                        onClick={() => setOpenIndex(null)}
                        className="mt-4 text-xs text-brand-blue font-medium hover:underline"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      

      {/* MODERN */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">

          <SectionHeader
            label="Next-Level Security"
            title={
              <>
                Experience the Power of{" "}
                <span className="gradient-text">NGFW</span>
              </>
            }
            description="Modern firewalls are no longer static — they are intelligent, adaptive, and user-aware."
            centered
          />

          <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE — INTERACTIVE LIST */}
            <div className="space-y-4">
              {ngfwFeatures.map((feature, index) => {
                const isActive = activeFeature === index;

                return (
                  <div
                    key={feature.title}
                    onClick={() => setActiveFeature(index)}
                    className={`cursor-pointer rounded-xl border p-5 transition-all duration-300 ${isActive
                      ? "border-brand-blue bg-brand-blue/5 shadow-md"
                      : "border-border-light hover:border-slate-300"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-heading">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-muted">
                          {feature.subtitle}
                        </p>
                      </div>

                      {/* Indicator */}
                      <div
                        className={`h-2 w-2 rounded-full ${isActive ? "bg-brand-blue" : "bg-gray-300"
                          }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT SIDE — DYNAMIC CONTENT */}


            <div className="relative">

              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-2xl border border-border-light overflow-hidden bg-surface-secondary"
              >

                {/* IMAGE */}
                <div className="h-52 w-full overflow-hidden">
                  <img
                    src={ngfwFeatures[activeFeature].image}
                    alt={ngfwFeatures[activeFeature].title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* TEXT */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-heading mb-3">
                    {ngfwFeatures[activeFeature].title}
                  </h3>

                  <p className="text-sm text-body leading-relaxed mb-4">
                    {ngfwFeatures[activeFeature].desc}
                  </p>

                  <div className="h-1 w-20 bg-gradient-to-r from-[#045891] to-[#1B8AC7] rounded-full" />
                </div>

              </motion.div>

              {/* Glow */}
              <div className="absolute -z-10 top-10 left-10 w-40 h-40 bg-[#1B8AC7]/10 blur-3xl rounded-full" />

            </div>

          </div>

          {/* 🔥 Bottom Statement */}
          <div className="mt-20 text-center max-w-3xl mx-auto">
            <p className="text-sm text-body leading-relaxed">
              NGFW is not just a firewall — it is a{" "}
              <span className="font-semibold text-heading">
                real-time security intelligence platform
              </span>{" "}
              capable of identifying applications, users, and threats instantly.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-2xl px-5 sm:px-6">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">Asked</span> Questions
              </>
            }
            centered
          />

          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Secure Your Network"
        description="Deploy advanced firewall solutions to protect your business from cyber threats."
        primaryButton={{ text: "Get Started", action: "modal" }}
      />
    </>
  );
}