import React from "react";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CheckIcon } from "@/components/icons";

/* ───────── DATA ───────── */

const features = [
    { title: "Automated Backup", desc: "Continuous protection across cloud & on-prem systems." },
    { title: "Failover Systems", desc: "Instant switchover during outages or failures." },
    { title: "Real-Time Replication", desc: "Live sync across regions with zero data loss." },
    { title: "Rapid Recovery", desc: "Restore systems in minutes, not hours." },
];

const process = [
  {
    step: "01",
    title: "Assessment & Risk Analysis",
    desc: "Identify critical business systems, dependencies, and potential risks including cyber threats, hardware failures, and natural disruptions.",
  },
  {
    step: "02",
    title: "Strategy & Planning",
    desc: "Define recovery objectives (RTO & RPO), select recovery models, and design a tailored disaster recovery architecture aligned with business goals.",
  },
  {
    step: "03",
    title: "Solution Design",
    desc: "Architect secure backup, replication, and failover mechanisms across cloud, on-premise, or hybrid environments.",
  },
  {
    step: "04",
    title: "Implementation & Deployment",
    desc: "Deploy automated backup systems, real-time replication, and failover infrastructure ensuring seamless integration with existing systems.",
  },
  {
    step: "05",
    title: "Testing & Validation",
    desc: "Continuously test recovery processes through simulations to ensure reliability, compliance, and readiness during real incidents.",
  },
  {
    step: "06",
    title: "Monitoring & Optimization",
    desc: "Enable continuous monitoring, performance tuning, and proactive issue detection to improve recovery efficiency over time.",
  },
  {
    step: "07",
    title: "Recovery & Continuity",
    desc: "Execute rapid failover and restoration processes to ensure minimal downtime and uninterrupted business operations during disruptions.",
  },
];

const drInsights = [
    {
        title: "Why Disaster Recovery Matters",
        desc: "Downtime affects revenue, trust, and operations. A strong DR strategy ensures continuity even during cyberattacks, outages, or system failures.",
    },
    {
        title: "Recovery Models",
        desc: "Cloud, on-premise, and hybrid recovery models provide flexibility, scalability, and control based on business needs.",
    },
    {
        title: "RTO & RPO Strategy",
        desc: "Define how fast systems recover (RTO) and how much data loss is acceptable (RPO) to align with business risk tolerance.",
    },
    {
        title: "AI-Powered Resilience",
        desc: "Leverage predictive analytics and automation to detect failures early and trigger intelligent recovery workflows.",
    },
    {
        title: "Immutable Backups",
        desc: "Protect against ransomware with tamper-proof backups that cannot be altered or deleted.",
    },
    {
        title: "Geo-Redundant Infrastructure",
        desc: "Distribute workloads across multiple regions to ensure availability even during large-scale outages.",
    },
];

const faqs = [
    {
        question: "What is disaster recovery?",
        answer:
            "Disaster recovery ensures systems, applications, and data can be restored quickly after failures or cyber incidents.",
    },
    {
        question: "Backup vs disaster recovery?",
        answer:
            "Backup stores data copies, while disaster recovery restores full business operations.",
    },
    {
        question: "What is RTO and RPO?",
        answer:
            "RTO defines recovery time, while RPO defines acceptable data loss.",
    },
    {
        question: "Is cloud disaster recovery secure?",
        answer:
            "Yes, with encryption, redundancy, and global infrastructure.",
    },
];

/* ───────── PAGE ───────── */

export default function DisasterRecoveryPage() {
    return (
        <>
            {/* HERO */}
            <PageHero
                title={
                    <>
                        Disaster Recovery{" "}
                        <span className="gradient-text">Solutions</span>
                    </>
                }
                description="Eliminate downtime risks with intelligent backup, real-time recovery, and enterprise-grade resilience."
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Services", href: "/services" },
                    { label: "Disaster Recovery", href: "/disaster-recovery-solutions" },
                ]}
            />

            {/* 🔥 PREMIUM FEATURE CARDS */}
            <section className="relative py-28 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.08),transparent_70%)]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <SectionHeader
                        label="Capabilities"
                        title={
                            <>
                                Intelligent <span className="gradient-text">Recovery Systems</span>
                            </>
                        }
                        centered
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="group relative p-6 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-xl hover:shadow-[0_20px_60px_rgba(4,88,145,0.15)] transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#045891]/10 to-[#1B8AC7]/10" />

                                <h3 className="relative font-semibold text-heading text-lg">
                                    {f.title}
                                </h3>
                                <p className="relative text-sm text-body mt-2">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ⚡ SPLIT PREMIUM SECTION */}
            <section className="relative py-28 bg-[#020617] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,138,199,0.15),transparent_70%)]" />

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 relative z-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                            Downtime Isn’t Just Technical — It’s <span className="gradient-text">Business Critical</span>
                        </h2>

                        <p className="mt-6 text-sm text-slate-300 leading-relaxed max-w-md">
                            A single failure can impact revenue, reputation, and operations.
                            Disaster recovery ensures your business continues — no matter what happens.
                        </p>

                        <ul className="mt-8 space-y-4">
                            {[
                                "Instant system recovery",
                                "Zero data loss architecture",
                                "Cloud + hybrid resilience",
                                "Continuous availability",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <CheckIcon className="w-4 h-4 text-[#1B8AC7]" />
                                    <span className="text-sm text-slate-200">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative rounded-2xl border border-white/10 overflow-hidden group">

                        {/* IMAGE FULL COVER */}
                        <img
                            src="https://images.ricoh-usa.com/j2jqn9lauv41/2aznVOioJDV2HuBzFQYPWj/4337da204e6a0fd4806e48ac262d462d/OG-Social-SaS-Business-Continuity--Disaster-Recovery.jpg"
                            alt="Disaster recovery business continuity"
                            className="w-full h-full object-cover min-h-[320px] transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* DARK OVERLAY FOR PREMIUM LOOK */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-[#020617]/40 to-transparent" />

                        {/* OPTIONAL SUBTLE TEXT (BOTTOM FADE - NOT BOX) */}
                        <div className="absolute bottom-0 p-6">
                            <p className="text-xs text-slate-300 opacity-80">
                                Business continuity & disaster recovery infrastructure
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* 🚀 PREMIUM TIMELINE (UPGRADED UI) */}
            <section className="relative py-28 bg-white overflow-hidden">

                {/* SUBTLE BG EFFECT */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.08),transparent_70%)]" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">

                    <SectionHeader
                        label="Process"
                        title={
                            <>
                                Recovery <span className="gradient-text">Lifecycle</span>
                            </>
                        }
                        centered
                    />

                    <div className="mt-20 relative">

                        {/* CENTER LINE */}
                        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#045891]/40 via-[#1B8AC7] to-transparent" />

                        {process.map((p, i) => (
                            <div key={p.step} className="relative flex items-start gap-8 mb-16 group">

                                {/* STEP ICON */}
                                <div className="relative z-10">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-full 
              bg-gradient-to-br from-[#045891] to-[#1B8AC7] text-white text-sm font-semibold
              shadow-lg group-hover:scale-110 transition duration-300">
                                        {p.step}
                                    </div>

                                    {/* PULSE EFFECT */}
                                    <div className="absolute inset-0 rounded-full bg-[#1B8AC7]/20 blur-md opacity-0 group-hover:opacity-100 transition" />
                                </div>

                                {/* CARD */}
                                <div className="relative flex-1 p-6 rounded-2xl border border-slate-200 bg-white 
            shadow-sm hover:shadow-[0_15px_50px_rgba(4,88,145,0.15)] 
            transition-all duration-300 group-hover:-translate-y-1">

                                    {/* TOP LINE ACCENT */}
                                    <div className="absolute top-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#045891] to-[#1B8AC7] group-hover:w-full transition-all duration-500 rounded-t-2xl" />

                                    <h3 className="font-semibold text-heading text-lg">
                                        {p.title}
                                    </h3>

                                    <p className="text-sm text-body mt-2 leading-relaxed max-w-md">
                                        {p.desc}
                                    </p>

                                    {/* CONNECTOR DOT */}
                                    <div className="absolute -left-[38px] top-7 w-3 h-3 rounded-full bg-[#1B8AC7] border-4 border-white shadow" />

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* 🔥 NEXT-GEN INSIGHTS UI */}
            <section className="relative py-28 bg-[#020617] text-white overflow-hidden">

                {/* BACKGROUND GLOW */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.15),transparent_70%)]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    <SectionHeader
                        label="Deep Insights"
                        title={
                            <>
                                <span className="text-blue-100">Modern</span> <span className="gradient-text">Disaster Recovery</span>
                            </>
                        }
                        centered
                    />

                    {/* GRID */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

                        {drInsights.map((item, i) => (
                            <div
                                key={i}
                                className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-[#045891] to-[#1B8AC7]"
                            >
                                {/* INNER CARD */}
                                <div className="relative h-full bg-[#020617] rounded-2xl p-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(27,138,199,0.3)]">

                                    {/* NUMBER BADGE */}
                                    <div className="absolute top-4 right-4 text-xs text-slate-500 group-hover:text-[#1B8AC7] transition">
                                        0{i + 1}
                                    </div>

                                    {/* TITLE */}
                                    <h3 className="text-lg font-semibold text-white">
                                        {item.title}
                                    </h3>

                                    {/* DESC */}
                                    <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                                        {item.desc}
                                    </p>

                                    {/* HOVER GLOW LINE */}
                                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#045891] to-[#1B8AC7] group-hover:w-full transition-all duration-500" />

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* FAQ (UNCHANGED LIKE NDR) */}
            <section className="relative py-20 bg-surface-secondary">
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

                    <FAQAccordion items={faqs} />

                </div>
            </section>

            {/* CTA */}
            <CTASection
                title="Be Ready Before Disaster Happens"
                description="Implement a resilient disaster recovery strategy and ensure uninterrupted operations."
                primaryButton={{ text: "Get Started", action: "modal" }}
            />
        </>
    );
}