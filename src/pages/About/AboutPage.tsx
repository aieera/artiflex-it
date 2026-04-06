import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import StatsBar from "@/components/ui/StatsBar";
import ClientStrip from "@/components/ui/ClientStrip";
import { CTASection } from "@/pages/Home/sections/CTASection";
import {
  EyeIcon,
  ShieldIcon,
  BarChartIcon,
  UsersIcon,
  GlobeIcon,
  TargetIcon,
} from "@/components/icons";

/* ── Schema.org structured data ── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Artiflex Information Technology",
  alternateName: ["ArtiflexIT", "Artiflex IT"],
  url: "https://artiflexit.com",
  logo: "https://artiflexit.com/logos/artiflexit%20logo.svg",
  description:
    "Artiflex Information Technology is a global IT solutions and cybersecurity company with over 14 years of experience, delivering customized software, secure cloud infrastructure, and managed IT services across the Middle East, South Asia, and GCC.",
  foundingDate: "2012",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 20 },
  sameAs: [
    "https://linkedin.com/company/artiflexit",
    "https://x.com/artiflexit",
  ],
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
      streetAddress:
        "National Insurance Building, Office 603, Opposite Deira City Center, Deira",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Muscat",
      addressCountry: "OM",
    },
    {
      "@type": "PostalAddress",
      addressCountry: "SA",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971522076531",
    email: "meghna@artiflexit.com",
    contactType: "sales",
    areaServed: ["AE", "OM", "SA", "IN"],
    availableLanguage: ["English", "Arabic", "Hindi"],
  },
  knowsAbout: [
    "Cybersecurity",
    "Cloud Solutions",
    "IT Infrastructure",
    "Custom Software Development",
    "Managed IT Services",
    "VAPT",
    "SOC as a Service",
  ],
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "India" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Artiflex Information Technology do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Artiflex Information Technology (ArtiflexIT) delivers customized, secure, and scalable IT solutions including cybersecurity, cloud infrastructure, managed IT services, and custom software development. With over 14 years of experience and 500+ completed projects, we serve industries from energy to fintech across the UAE, Oman, Saudi Arabia, and beyond.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Artiflex Information Technology located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Artiflex Information Technology is headquartered in Dubai, UAE (Deira, opposite Deira City Center). We operate globally with branches in four countries: Artiflex Information Technology in Dubai, Artiflex Manchi in Oman, and Artiflex Metal World in Saudi Arabia.",
      },
    },
    {
      "@type": "Question",
      name: "How many years of experience does ArtiflexIT have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ArtiflexIT has over 14 years of industry experience, having completed more than 500 projects across cybersecurity, cloud migration, IT infrastructure, and custom software development for organizations worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "What industries does ArtiflexIT serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ArtiflexIT serves a wide range of industries including energy, fintech, logistics, real estate, retail, healthcare, and government. Our solutions are tailored to meet the unique regulatory and operational requirements of each sector.",
      },
    },
  ],
};

const values = [
  {
    icon: EyeIcon,
    title: "Transparency",
    description:
      "No hidden costs. No ambiguous SLAs. Every contract spells out exactly what you get, what it costs, and how we measure success. We do what we say — and if something goes wrong, you hear about it from us first.",
  },
  {
    icon: ShieldIcon,
    title: "Cyber Resilience",
    description:
      "We don\u2019t just defend — we build resilience. Our proactive approach ensures your business can withstand, recover from, and adapt to evolving cyber threats. Prevention costs less than recovery, and we engineer every engagement around that principle.",
  },
  {
    icon: BarChartIcon,
    title: "Business-First Innovation",
    description:
      "Technology should fuel growth, not block it. We design architectures and solutions that let you move fast without exposing your business. Every recommendation ties back to efficiency, scalability, and measurable outcomes.",
  },
  {
    icon: UsersIcon,
    title: "Customer Commitment",
    description:
      "Our team goes above and beyond to respond quickly, adapt to your needs, and deliver long-term value. When you engage Artiflex, you benefit from the collective expertise of our entire organization — not just a single consultant.",
  },
  {
    icon: GlobeIcon,
    title: "Global Reach, Local Expertise",
    description:
      "With offices in four countries and deep knowledge of regional regulations — NESA, ICA, ADHICS, CBUAE — we combine international best practices with the local insight needed to support clients with agility.",
  },
  {
    icon: TargetIcon,
    title: "Excellence in Execution",
    description:
      "We strive to build a reputable organization that positively impacts our clients and communities through innovation and excellence. Over 500 successfully completed projects stand as proof of this commitment.",
  },
];

const aboutStats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 14, suffix: "+", label: "Years of Experience" },
  { value: 20, suffix: "+", label: "Certified Professionals" },
  { value: 4, suffix: "", label: "Countries" },
];

const cardFade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>
          About Artiflex Information Technology — 14+ Years of IT Solutions &
          Cybersecurity | Dubai, Oman, Saudi Arabia
        </title>
        <meta
          name="description"
          content="Artiflex Information Technology (ArtiflexIT) has over 14 years of experience delivering customized cybersecurity, cloud, and IT solutions. 500+ projects completed. Offices in Dubai, Oman, and Saudi Arabia. 20+ certified professionals."
        />
        <meta
          name="keywords"
          content="Artiflex Information Technology, ArtiflexIT, IT solutions Dubai, cybersecurity company UAE, managed IT services Oman, IT company Saudi Arabia, custom software development Middle East, cloud solutions GCC"
        />
        <link rel="canonical" href="https://artiflexit.com/about" />
        <meta
          property="og:title"
          content="About Artiflex Information Technology — Global IT Solutions & Cybersecurity"
        />
        <meta
          property="og:description"
          content="14+ years of industry experience. 500+ projects. 20+ certified professionals. Offices across 4 countries. Discover why organizations worldwide trust ArtiflexIT."
        />
        <meta property="og:url" content="https://artiflexit.com/about" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <PageHero
        title={
          <>
            Innovating IT Solutions.{" "}
            <span className="gradient-text">Securing Digital Futures.</span>
          </>
        }
        description="With over 14 years of industry experience and 500+ successful projects, Artiflex Information Technology is a trusted global technology partner — delivering customized, secure, and scalable IT solutions from Dubai to the world."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        background="gradient-blinds"
      />

      {/* ─── Who We Are ─── */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          {/* Team image banner */}
          <div className="mb-12 rounded-2xl overflow-hidden h-[200px] sm:h-[280px] lg:h-[340px]">
            <img
              src="/images/team.jpg"
              alt="Artiflex Information Technology Team"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <SectionHeader
                label="Who We Are"
                title="A Trusted Technology Partner to Organizations Worldwide"
              />
              <div className="space-y-5 text-body leading-relaxed">
                <p>
                  At Artiflex, we are committed to delivering high-quality,
                  innovative IT solutions that fuel business growth and long-term
                  success. With over 14 years of industry experience, we have
                  established ourselves as a trusted technology partner to
                  organizations around the world.
                </p>
                <p>
                  We specialize in crafting custom software and IT solutions
                  tailored to meet the unique needs of each client. Our focus on
                  efficiency, scalability, and security ensures that your
                  technology is not only robust today but ready for the future.
                </p>
                <p>
                  Backed by a team of 20+ certified full-time professionals, we
                  have successfully completed over 500 projects across various
                  industries — from energy and fintech to logistics and
                  healthcare. Our global presence, with offices in four
                  countries, allows us to support clients with agility and local
                  insight.
                </p>
              </div>
            </div>

            <Card variant="glass" hover={false} className="p-5 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                    <span className="font-display text-lg font-bold text-brand-blue">
                      01
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-heading">
                      The Challenge We Identified
                    </h3>
                    <p className="mt-1 text-sm text-body">
                      Businesses struggling with fragmented IT vendors,
                      inconsistent service quality, and solutions that
                      didn&apos;t scale with their growth ambitions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-cyan/10">
                    <span className="font-display text-lg font-bold text-brand-cyan">
                      02
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-heading">
                      What We Built
                    </h3>
                    <p className="mt-1 text-sm text-body">
                      A unified IT practice — cybersecurity, cloud
                      infrastructure, custom software, and managed services —
                      all under one roof. One partner. One SLA. Complete
                      accountability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-purple/10">
                    <span className="font-display text-lg font-bold text-brand-purple">
                      03
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-heading">
                      Where We Are Today
                    </h3>
                    <p className="mt-1 text-sm text-body">
                      500+ projects delivered, 20+ certified professionals,
                      offices in 4 countries, and a reputation built on trust,
                      innovation, and results across the UAE and beyond.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── Achievements ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-light" />

        {/* Glow effect */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-blue/20 blur-[120px] rounded-full" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 text-center">

          <SectionHeader
            label="Track Record"
            title={
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Numbers That Reflect Real Work
              </span>
            }
            centered
          />

          {/* Stats grid */}
          <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-8">
            {aboutStats.map((stat, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 hover:scale-[1.05] hover:border-brand-blue/40 hover:shadow-[0_10px_40px_rgba(27,138,199,0.2)]"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 opacity-0 group-hover:opacity-100 transition duration-300" />

                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white">
                    {stat.value}
                    {stat.suffix}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-300">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Vision & Mission ─── */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Purpose" title="Vision & Mission" centered />
          <div className="grid gap-4 sm:gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl border border-border-light bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-8 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-brand-cyan" />
              <h3 className="font-display text-xl font-bold text-heading mb-4">
                Our Vision
              </h3>
              <p className="text-body leading-relaxed">
                Empowering businesses with trust through cyber resilience. We
                envision a world where every organization — regardless of size
                or industry — operates with the confidence that their digital
                assets, operations, and reputation are protected by
                best-in-class technology.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl border border-border-light bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-8 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple to-brand-purple-light" />
              <h3 className="font-display text-xl font-bold text-heading mb-4">
                Our Mission
              </h3>
              <p className="text-body leading-relaxed">
                To deliver customized, secure, and scalable IT solutions that
                empower industries — from energy to fintech — to operate
                efficiently and grow confidently. We believe a growing business
                deserves the same protection methodology and innovation as a
                Fortune 500, scaled to fit its operations and budget.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Our Commitment ─── */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              label="Our Promise"
              title="Our Commitment to Customers"
              centered
            />
            <Card variant="glass" hover={false} className="p-5 sm:p-8 text-left">
              <p className="text-body leading-relaxed mb-4">
                Our commitment to customers is what makes us unique. We strive
                to build a reputable organization and a desirable place to work
                — positively impacting our clients and communities through
                innovation and excellence.
              </p>
              <p className="text-body leading-relaxed mb-4">
                We do what we say. Our team goes above and beyond to respond
                quickly, adapt to customer needs, and deliver long-term value.
                When you engage Artiflex, you benefit from the collective
                expertise of our entire organization — not just a single point
                of contact.
              </p>
              <p className="text-body leading-relaxed">
                From initial consultation to ongoing support, we measure our
                success by your success. Every solution we deliver is designed
                to be robust today and ready for the challenges of tomorrow.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Our Values"
            title="What Guides Every Decision"
            description="These aren't wall posters. They're the principles that determine who we hire, how we scope projects, and how we deliver results for every client."
            centered
          />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                variants={cardFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card variant="service" className="p-6 h-full">
                  <value.icon className="w-8 h-8 text-brand-blue mb-4" />
                  <h3 className="font-display text-lg font-semibold text-heading mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ClientStrip />

      <CTASection
        title="Ready to Work With a Partner Who Puts Your Success First?"
        description="Schedule a consultation to see how Artiflex Information Technology can streamline your IT operations, strengthen your security posture, and accelerate your digital transformation."
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />
    </>
  );
}
