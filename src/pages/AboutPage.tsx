import { Helmet } from "react-helmet-async";
import PageHero from "@/components/sections/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import StatsBar from "@/components/ui/StatsBar";
import { CTASection } from "@/components/sections/CTASection";
import {
  EyeIcon,
  ShieldIcon,
  BarChartIcon,
  UsersIcon,
} from "@/components/icons";

const values = [
  {
    icon: EyeIcon,
    title: "Transparency",
    description:
      "No hidden costs. No ambiguous SLAs. Every contract spells out exactly what you get, what it costs, and how we measure success. If something goes wrong, you hear about it from us before you notice it yourself.",
  },
  {
    icon: ShieldIcon,
    title: "Proactive Defense",
    description:
      "We fix vulnerabilities before they become incidents. Our monitoring catches anomalies at 2 AM so your team doesn't get a call at 6 AM. Prevention costs less than recovery — we build every engagement around that principle.",
  },
  {
    icon: BarChartIcon,
    title: "Business-First Thinking",
    description:
      "Security should enable growth, not block it. We design architectures that let you move fast without exposing your business. Every recommendation ties back to a measurable business outcome.",
  },
  {
    icon: UsersIcon,
    title: "Regional Expertise",
    description:
      "We understand NESA, ICA, ADHICS, and CBUAE because we've implemented them. Our team lives and works in the UAE — we know the regulatory landscape, the vendor ecosystem, and the talent market.",
  },
];

const aboutStats = [
  { value: 150, suffix: "+", label: "Enterprise Clients" },
  { value: 12000, suffix: "+", label: "Threats Neutralized Monthly" },
  { value: 99.97, suffix: "%", label: "Uptime Maintained" },
  { value: 40, suffix: "+", label: "Certified Engineers" },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About ArtiflexIT — Our Story, Mission & Values</title>
        <meta name="description" content="ArtiflexIT was founded by security professionals who saw UAE businesses struggling with fragmented IT vendors. Learn our mission to make enterprise-grade security accessible across the Middle East." />
      </Helmet>

      <PageHero
        title={
          <>
            Built on Trust.{" "}
            <span className="gradient-text">Driven by Security.</span>
          </>
        }
        description="We started ArtiflexIT because mid-market businesses in the UAE deserved better than fragmented vendors and enterprise pricing for basic protection."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        background="gradient-blinds"
      />

      {/* Our Story */}
      <section className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <SectionHeader
                label="Our Story"
                title="From Frustration to Foundation"
              />
              <div className="space-y-5 text-slate-400 leading-relaxed">
                <p>
                  In 2015, our founding team — three security engineers and a network architect — kept seeing the same pattern across Dubai&apos;s business districts. Companies were juggling five or more IT vendors. Their firewall team didn&apos;t talk to their cloud team. Their endpoint provider had never met their compliance auditor. And in the gaps between each vendor&apos;s scope sat vulnerabilities that attackers exploited reliably.
                </p>
                <p>
                  One incident stood out. A mid-sized logistics firm had invested heavily in perimeter security but left their wireless network on default configurations. A red team exercise proved that any visitor in the lobby could reach their ERP system within 20 minutes. Five vendors. Zero coordination. Total exposure.
                </p>
                <p>
                  ArtiflexIT was built to eliminate that gap. One partner. One SLA. One team that sees your entire technology stack — from endpoint to edge to cloud — and takes responsibility for all of it.
                </p>
              </div>
            </div>

            <Card variant="glass" hover={false} className="p-8 lg:p-10">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                    <span className="font-display text-lg font-bold text-brand-blue">01</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">The Problem We Saw</h3>
                    <p className="mt-1 text-sm text-slate-400">Businesses paying five vendors, getting zero coordination, and living with gaps between each service scope.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-cyan/10">
                    <span className="font-display text-lg font-bold text-brand-cyan">02</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">What We Built</h3>
                    <p className="mt-1 text-sm text-slate-400">A unified IT security practice — cybersecurity, cloud, infrastructure, and managed services under one roof, one SLA, one team.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-purple/10">
                    <span className="font-display text-lg font-bold text-brand-purple">03</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">Where We Are Now</h3>
                    <p className="mt-1 text-sm text-slate-400">150+ enterprise clients, 40 certified engineers, and a 99.97% uptime record across the UAE and GCC.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-16 bg-navy sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Purpose"
            title="Mission & Vision"
            centered
          />
          <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
            <div className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-navy-light/40 to-navy-deep/60 p-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-brand-cyan" />
              <h3 className="font-display text-xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed">
                To make enterprise-grade security accessible to every business in the Middle East — without enterprise-grade complexity or pricing. We believe a 50-person company deserves the same protection methodology as a Fortune 500, scaled to fit their operations and budget.
              </p>
            </div>
            <div className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-navy-light/40 to-navy-deep/60 p-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple to-brand-purple-light" />
              <h3 className="font-display text-xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-slate-400 leading-relaxed">
                A region where no business loses revenue, reputation, or operational continuity to a preventable cyber threat. We&apos;re working toward a Middle East where security infrastructure is as reliable and expected as electricity — invisible when it works, but always there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              label="The Gap"
              title="Why ArtiflexIT Exists"
              centered
            />
            <Card variant="glass" hover={false} className="p-8 text-left">
              <p className="text-slate-400 leading-relaxed mb-4">
                There&apos;s a gap in the UAE market that hasn&apos;t closed. Enterprise security vendors build solutions for organizations with 5,000+ employees, dedicated security teams, and seven-figure budgets. Consumer-grade tools leave businesses exposed to threats they can&apos;t detect, much less respond to.
              </p>
              <p className="text-slate-400 leading-relaxed">
                The mid-market — companies with 20 to 500 employees — gets stuck choosing between overpaying for enterprise platforms they&apos;ll never fully use, or under-investing with tools that don&apos;t cover their actual attack surface. ArtiflexIT fills that space. We deliver enterprise methodology at mid-market scale, with pricing models built for businesses that measure IT budgets carefully.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="relative py-16 bg-navy sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Track Record"
            title="Numbers That Reflect Real Work"
            centered
          />
          <StatsBar stats={aboutStats} />
        </div>
      </section>

      {/* Values */}
      <section className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Our Values"
            title="What Guides Every Decision"
            description="These aren't wall posters. They're the principles that determine who we hire, how we scope projects, and when we say no to work that doesn't fit."
            centered
          />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} variant="service" className="p-6">
                <value.icon className="w-8 h-8 text-brand-blue mb-4" />
                <h3 className="font-display text-lg font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Work With a Partner Who Puts Your Security First?"
        description="Schedule a consultation to see how ArtiflexIT consolidates your IT operations, reduces vendor complexity, and strengthens your security posture — under one SLA."
        primaryButton={{ text: "Schedule Consultation", action: "modal" }}
        secondaryButton={{ text: "View Our Services", href: "/services" }}
      />
    </>
  );
}
