import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import StatsBar from "@/components/ui/StatsBar";
import ProcessFlow from "@/components/ui/ProcessFlow";
import { CTASection } from "@/pages/Home/sections/CTASection";
import FAQAccordion from "@/components/ui/FAQAccordion";
import PremiumScrollStory from "@/components/ui/PremiumScrollStory";


const firewallStory = [
  {
    title: "The Internet Was Open",
    desc: "Early networks were built on trust. No protection, no boundaries — just open communication.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    title: "The Morris Worm (1988)",
    desc: "One of the first cyber incidents spread rapidly, exposing how vulnerable connected systems were.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
  },
  {
    title: "The Need for Control",
    desc: "Organizations realized they needed a way to monitor and restrict traffic between networks.",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
  },
  {
    title: "Birth of the Firewall",
    desc: "Inspired by physical fire barriers, firewalls became digital gates controlling network access.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  },
  {
    title: "From Rules to Intelligence",
    desc: "Modern firewalls evolved into intelligent systems capable of detecting and stopping advanced threats.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
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
  { title: "Packet Filtering", desc: "Basic filtering with no context." },
  { title: "Stateful Firewall", desc: "Tracks active sessions and connections." },
  { title: "Proxy Firewall", desc: "Deep inspection of application-layer data." },
  { title: "UTM Firewall", desc: "Multiple security features in one device." },
  { title: "NGFW", desc: "Advanced firewall with app and user awareness." },
  { title: "WAF", desc: "Protects web applications from attacks." },
  { title: "FWaaS", desc: "Cloud-based firewall for distributed environments." },
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
            {firewallTypes.map((item) => (
              <Card
                key={item.title}
                variant="service"
                className="p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-display text-lg font-semibold text-heading mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      {/* STORY */}

      <PremiumScrollStory items={firewallStory} />

      {/* MODERN */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 text-center">
          <SectionHeader
            label="Modern Security"
            title={
              <>
                Next-Generation <span className="gradient-text">Firewall</span>
              </>
            }
            centered
          />

          <p className="text-sm text-body leading-relaxed mt-6">
            Next-Generation Firewalls (NGFW) go beyond traditional security by
            providing application awareness, user identity tracking, deep packet
            inspection, and SSL decryption. They enable businesses to detect,
            prevent, and respond to advanced cyber threats in real time.
          </p>
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