import React from "react";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import FeatureFlow from "@/components/ui/FeatureFlow";
import PremiumCardStrip from "@/components/ui/PremiumCardStrip";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { Helmet } from "react-helmet-async";

const ndrImportance = [
  {
    title: "See What Firewalls Miss",
    desc: "Traditional tools detect known threats. NDR uncovers hidden attacks already operating inside your network.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
  },
  {
    title: "Detect Lateral Movement",
    desc: "Attackers move quietly across systems after entry — NDR tracks this internal movement in real time.",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=800",
  },
  {
    title: "Understand Network Behavior",
    desc: "Builds a baseline of normal activity and instantly flags deviations, even for unknown threats.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800",
  },
  {
    title: "Stop Data Exfiltration Early",
    desc: "Detect unusual outbound data patterns before sensitive information leaves your environment.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800",
  },
];

const ndrFaqs = [
  {
    question: "What is Network Detection & Response (NDR)?",
    answer:
      "NDR is a cybersecurity solution that analyzes network traffic to detect advanced threats, anomalies, and suspicious behavior within an organization.",
  },
  {
    question: "How is NDR different from firewalls and IDS/IPS?",
    answer:
      "Firewalls and IDS/IPS rely on known signatures, while NDR uses behavioral analysis to detect unknown and emerging threats inside the network.",
  },
  {
    question: "What threats can NDR detect?",
    answer:
      "NDR detects lateral movement, command-and-control activity, insider threats, data exfiltration, and advanced persistent threats (APTs).",
  },
  {
    question: "Can NDR analyze encrypted traffic?",
    answer:
      "Yes. NDR uses metadata, traffic patterns, and behavioral analysis to detect threats even within encrypted communications.",
  },
  {
    question: "Is NDR suitable for cloud and hybrid environments?",
    answer:
      "Yes. Modern NDR solutions support cloud, on-premise, and hybrid environments, providing full visibility across all network layers.",
  },
  {
    question: "Do small and mid-sized businesses need NDR?",
    answer:
      "Yes. As cyber threats become more sophisticated, NDR provides critical visibility and protection even for smaller organizations.",
  },
];

function NDRPage() {
  return (
    <>
      <Helmet>
        <title>

          Network Detection and Response (NDR) Solutions Guide</title>
        <meta
          name="description"
          content="Network detection and response (NDR) solutions covering threat visibility, behavioural analysis, vendor comparison, and enterprise network security use cases."
        />
      </Helmet>

      {/* HERO */}
      <PageHero
        title={
          <>
            Network Detection and Response{" "}
            <span className="gradient-text">(NDR) Solutions</span>{" "} Guide


          </>
        }
        description="Detect advanced threats inside your network that traditional security tools cannot see."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "NDR", href: "/ndr" },
        ]}
      />

      {/* 🔥 ORIGIN (Aurora Story Inspired) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">

          <div className="flex flex-col justify-center">
            <SectionHeader
              label="Origin"
              title={
                <>
                  Why <span className="gradient-text">NDR Exists</span>
                </>
              }
              description="Firewalls detect known threats. NDR detects the unknown."
            />

            <p className="text-sm text-gray-600 mt-6 leading-relaxed max-w-md">
              In 2009, attackers infiltrated enterprise networks for months
              without triggering alerts. Traditional systems failed because
              the traffic looked normal. NDR was born to detect anomalies —
              not just known signatures.
            </p>
          </div>

          {/* Image overlay same style */}
          <div className="relative w-full h-full min-h-[350px]">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"
              alt="Network traffic monitoring"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <p className="text-xs opacity-70">Key Insight</p>
              <h3 className="text-xl font-semibold">
                Threats already inside your network are the most dangerous.
              </h3>
            </div>
          </div>

        </div>
      </section>

      {/* 🧠 CORE CAPABILITIES (NEW COMPONENT) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <SectionHeader
            label="Capabilities"
            title={
              <>
                What <span className="gradient-text">NDR Does</span>
              </>
            }
            centered
          />

          <FeatureFlow
            items={[
              {
                title: "East-West Traffic Monitoring",
                desc: "Detects lateral movement inside networks where attackers spread.",
              },
              {
                title: "Behavioural AI Detection",
                desc: "Builds baseline of normal activity and detects anomalies.",
              },
              {
                title: "Encrypted Traffic Analysis",
                desc: "Identifies threats even inside SSL/TLS encrypted traffic.",
              },
              {
                title: "Data Exfiltration Detection",
                desc: "Detects unusual data transfers leaving the network.",
              },
            ]}
          />

        </div>
      </section>


      {/* ⚡ WHY NDR MATTERS */}
      <section className="py-15 bg-[#020617] text-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header centered */}
          <SectionHeader
            label="Importance"
            title={
              <>
                <span className="text-blue-100">Why</span> <span className="gradient-text">NDR Matters</span>
              </>
            }
            description="Modern threats operate inside your network — NDR provides visibility where traditional tools fail."
            centered
          />

          {/* Center the strip properly */}
          <div className="mt-9 flex justify-center">
            <PremiumCardStrip items={ndrImportance} />
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">Asked</span> Questions
              </>
            }
            centered
          />

          <FAQAccordion items={ndrFaqs} />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="See What Your Network Is Hiding"
        description="Deploy NDR to detect hidden threats and secure your internal network."
        primaryButton={{ text: "Get Started", action: "modal" }}
      />
    </>
  );
}

export default NDRPage;