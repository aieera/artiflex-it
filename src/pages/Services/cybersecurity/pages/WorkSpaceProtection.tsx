import React, { useState } from "react";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import FAQAccordion from "@/components/ui/FAQAccordion";
import FeatureHighlightGrid from "@/components/ui/FeatureHighlightGrid";


const workspaceDrivers = [
  {
    title: "Hybrid Workforce",
    desc: "Employees work from anywhere — security must follow every device and location.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
  },
  {
    title: "Cloud & SaaS",
    desc: "Applications now live outside traditional networks, bypassing legacy security.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
  },
  {
    title: "Data Protection",
    desc: "Sensitive data resides in cloud platforms and needs continuous control.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800",
  },
  {
    title: "Zero Trust",
    desc: "Every access request is verified — no implicit trust.",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=800",
  },
];

const workspaceFaqs = [
  {
    question: "What is Workspace Protection?",
    answer:
      "Workspace protection secures users, devices, and applications across cloud, SaaS, and remote environments using SSE, SASE, and CASB.",
  },
  {
    question: "What is the difference between SSE and SASE?",
    answer:
      "SSE focuses on security services like ZTNA, CASB, and SWG, while SASE combines SSE with networking (SD-WAN) in a unified platform.",
  },
  {
    question: "Why is CASB important?",
    answer:
      "CASB provides visibility and control over SaaS applications, preventing data leaks and managing shadow IT.",
  },
  {
    question: "What is Zero Trust in workspace security?",
    answer:
      "Zero Trust ensures that no user or device is trusted by default — every access request is continuously verified.",
  },
];

const capabilities = [
  {
    title: "ZTNA",
    short: "VPN replacement",
    desc: "Zero Trust Network Access replaces VPN by giving users access only to specific applications — not the full network. Eliminates lateral movement risk.",
  },
  {
    title: "CASB",
    short: "SaaS visibility",
    desc: "Cloud Access Security Broker provides visibility and control over SaaS apps, detects shadow IT, enforces DLP policies, and monitors risky user behavior.",
  },
  {
    title: "SWG",
    short: "Web protection",
    desc: "Secure Web Gateway inspects web traffic for malware, phishing, and command-and-control attacks, enforcing safe browsing from any location.",
  },
  {
    title: "FWaaS",
    short: "Cloud firewall",
    desc: "Firewall-as-a-Service delivers NGFW-level protection from the cloud, securing remote users, branches, and cloud workloads without hardware.",
  },
  {
    title: "DLP",
    short: "Data protection",
    desc: "Data Loss Prevention prevents sensitive data from being uploaded, shared, or leaked across web and cloud channels with consistent policies.",
  },
  {
    title: "DNS Security",
    short: "Early threat block",
    desc: "Blocks malicious and phishing domains at the DNS layer before connections are established, protecting all applications and protocols.",
  },
  {
    title: "RBI",
    short: "Safe browsing",
    desc: "Remote Browser Isolation executes web sessions in the cloud, preventing malware and zero-day exploits from reaching user devices.",
  },
  {
    title: "SSPM",
    short: "SaaS posture",
    desc: "Security Posture Management continuously audits SaaS configurations to detect misconfigurations, excessive permissions, and compliance risks.",
  },
];

function WorkSpaceProtection() {
  const [activeCap, setActiveCap] = useState(0);
  return (
    <>
      {/* HERO */}
      <PageHero
        title={
          <>
            Workspace Protection{" "}
            <span className="gradient-text">(SSE / SASE / CASB)</span>
          </>
        }
        description="Secure users, applications, and data across cloud, SaaS, and hybrid work environments."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "Workspace Protection", href: "/workspace" },
        ]}
      />

      {/* 🔥 ORIGIN */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">

          <div className="flex flex-col justify-center">
            <SectionHeader
              label="Origin"
              title={
                <>
                  Why <span className="gradient-text">Workspace Security Exists</span>
                </>
              }
              description="The corporate network disappeared — security had to follow users everywhere."
            />

            <p className="text-sm text-gray-600 mt-6 leading-relaxed max-w-md">
              With cloud apps, SaaS platforms, and remote work, users no longer
              operate inside a fixed network. Traditional VPN and firewall-based
              security cannot protect this environment. Modern workspace
              protection ensures security follows users, devices, and data
              wherever they operate.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative min-h-[350px]">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute bottom-0 p-8 text-white">
              <p className="text-xs opacity-70">Key Insight</p>
              <h3 className="text-xl font-semibold">
                Security must move with the user — not the network.
              </h3>
            </div>
          </div>

        </div>
      </section>

      {/* 🚀 CORE DRIVERS (CARD SWAP PREMIUM) */}
      <section className="py-28 bg-[#020617] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <SectionHeader
            label="Why It Matters"
            title={
              <>
                <span className="text-blue-100">The Shift to</span>{" "}
                <span className="gradient-text">Workspace Security</span>
              </>
            }
            description="Four key drivers forcing organizations to adopt SSE / SASE / CASB."
            centered
          />

          <div className="mt-16">
            <FeatureHighlightGrid items={workspaceDrivers} />
          </div>

        </div>
      </section>

      {/* 🧠 CAPABILITIES GRID */}

      {/* 🔥 SSE / SASE CAPABILITY EXPERIENCE */}
      <section className="relative py-28 bg-[#020617] text-white overflow-hidden">

        <div className="max-w-6xl mx-auto px-6">

          <SectionHeader
            label="Capabilities"
            title={
              <>
                <span className="text-blue-100">What</span> <span className="gradient-text">SSE / SASE Delivers</span>
              </>
            }
            description="Security follows the user — across devices, apps, and networks — not the old perimeter."
            centered
          />

          {/* 🔥 SCROLLABLE STRIP */}
          <div className="mt-16 flex gap-6 overflow-x-auto pb-4">

            {capabilities.map((item, index) => {
              const isActive = activeCap === index;

              return (
                <div
                  key={index}
                  onClick={() => setActiveCap(index)}
                  className={`group relative min-w-[250px] cursor-pointer rounded-2xl p-6 transition-all duration-300 border overflow-hidden
    ${isActive
                      ? "bg-gradient-to-br from-[#045891] to-[#0d4b6c] border-transparent scale-105 shadow-xl shadow-blue-500/20"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-500/10"
                    }`}
                >
                  {/* ✨ subtle glow layer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-blue-500/10 to-cyan-400/10" />

                  {/* ✨ top highlight line */}
                  <div className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300
    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />

                  <h3 className={`text-lg font-semibold transition-colors duration-300
    ${isActive ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                    {item.title}
                  </h3>

                  <p className={`text-xs mt-2 transition-colors duration-300
    ${isActive ? "text-white/90" : "text-white/60 group-hover:text-white/80"}`}>
                    {item.short}
                  </p>

                  {/* 👇 keep a hint of desc even when inactive */}
                  {!isActive && (
                    <p className="text-xs mt-3 text-white/40 line-clamp-2 group-hover:text-white/60 transition">
                      {item.desc}
                    </p>
                  )}

                  {/* Active Expand */}
                  {isActive && (
                    <p className="text-sm mt-4 text-white/95 leading-relaxed">
                      {item.desc}
                    </p>
                  )}

                  {/* ✨ bottom glow accent */}
                  <div className={`mt-4 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300
    ${isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"}`} />
                </div>
              );
            })}

          </div>

          {/* 🔥 INSIGHT PANEL */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-sm text-white/70 leading-relaxed">
              SSE/SASE replaces fragmented security tools with a{" "}
              <span className="text-white font-semibold">
                unified cloud-delivered security layer
              </span>{" "}
              — protecting users, applications, and data anywhere.
            </p>
          </div>

        </div>
      </section>
      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6">

          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">Asked</span> Questions
              </>
            }
            centered
          />

          <FAQAccordion items={workspaceFaqs} />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Secure Your Modern Workspace"
        description="Adopt SSE, SASE, and CASB to protect users, data, and applications anywhere."
        primaryButton={{ text: "Get Started", action: "modal" }}
      />
    </>
  );
}

export default WorkSpaceProtection;