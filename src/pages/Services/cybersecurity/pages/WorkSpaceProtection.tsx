import React from "react";
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

function WorkSpaceProtection() {
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <SectionHeader
            label="Capabilities"
            title={
              <>
                What <span className="gradient-text">SSE / SASE Provides</span>
              </>
            }
            centered
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-16">

            {[
              { title: "ZTNA", desc: "Secure app-level access without VPN." },
              { title: "CASB", desc: "Control and monitor SaaS applications." },
              { title: "SWG", desc: "Protect users from web threats." },
              { title: "FWaaS", desc: "Cloud-delivered firewall protection." },
              { title: "DLP", desc: "Prevent sensitive data leaks." },
              { title: "DNS Security", desc: "Block malicious domains early." },
              { title: "RBI", desc: "Safe browsing in isolated environments." },
              { title: "SSPM", desc: "Monitor SaaS misconfigurations." },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border bg-white hover:shadow-md transition"
              >
                <h3 className="font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {item.desc}
                </p>
              </div>
            ))}

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