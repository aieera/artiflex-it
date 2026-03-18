import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageHero from "@/components/sections/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRightIcon } from "@/components/icons";

const featuredArticle = { tag: "Cybersecurity", title: "The State of Cybersecurity in the UAE: What Every Business Owner Needs to Know in 2025", excerpt: "Ransomware attacks targeting GCC businesses surged 300% in two years. Social engineering losses exceeded $4.7 billion globally. And the average breach cost in the Middle East hit $6.93 million — 69% higher than the global average. This isn't a technology problem. It's a business risk that demands board-level attention.", date: "March 12, 2025", readTime: "8 min read" };

const articles = [
  { tag: "Cybersecurity", tagColor: "bg-red-500/10 text-red-400 border-red-500/30", title: "Why Your Firewall Alone Won't Stop a Ransomware Attack", excerpt: "Modern ransomware bypasses perimeter defenses entirely. It enters through phishing emails, compromised credentials, and supply chain vendors. Here's what actually works.", date: "March 5, 2025", readTime: "6 min read", gradient: "from-red-950/40 to-navy-deep" },
  { tag: "Cloud", tagColor: "bg-brand-blue/10 text-brand-blue border-brand-blue/30", title: "Cloud Migration Mistakes That Cost UAE Businesses Millions", excerpt: "60% of cloud migrations exceed budget. 45% miss timelines. We analyzed the six patterns behind failed migrations and what successful ones do differently.", date: "February 27, 2025", readTime: "7 min read", gradient: "from-blue-950/40 to-navy-deep" },
  { tag: "Compliance", tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/30", title: "NESA Compliance: A Practical Guide for UAE Businesses", excerpt: "The National Electronic Security Authority sets security standards for critical infrastructure. But the requirements also apply to any organization that handles sensitive data. Here's how to comply without over-engineering.", date: "February 18, 2025", readTime: "10 min read", gradient: "from-amber-950/40 to-navy-deep" },
  { tag: "Infrastructure", tagColor: "bg-brand-purple/10 text-brand-purple border-brand-purple/30", title: "The $5,600-Per-Minute Problem: Calculating the True Cost of IT Downtime", excerpt: "Downtime costs more than most businesses estimate. Beyond lost revenue, factor in recovery costs, compliance penalties, customer churn, and reputation damage.", date: "February 10, 2025", readTime: "5 min read", gradient: "from-purple-950/40 to-navy-deep" },
  { tag: "Managed Services", tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", title: "Build vs. Buy: When Managed IT Services Make More Sense Than Hiring", excerpt: "A qualified network engineer costs AED 25,000+/month. After visa, insurance, and training, that's AED 400,000 annually. Here's the math on when outsourcing wins.", date: "February 3, 2025", readTime: "6 min read", gradient: "from-emerald-950/40 to-navy-deep" },
  { tag: "Cybersecurity", tagColor: "bg-red-500/10 text-red-400 border-red-500/30", title: "Social Engineering in the UAE: Why Your Employees Are Your Biggest Vulnerability", excerpt: "73% of successful breaches start with a human being tricked. Phishing simulations, vishing campaigns, and pretexting attacks reveal gaps that technology alone cannot close.", date: "January 25, 2025", readTime: "7 min read", gradient: "from-red-950/40 to-navy-deep" },
];

export default function BlogPage() {
  return (
    <>
      <Helmet><title>Blog — Cybersecurity & IT Insights | ArtiflexIT</title><meta name="description" content="Expert analysis on cybersecurity trends, cloud strategy, and IT infrastructure for UAE businesses. Practical insights from ArtiflexIT's engineering team." /></Helmet>

      <PageHero title={<>Insights That Sharpen <span className="gradient-text">Your Security Posture</span></>} description="Practical analysis from our engineering team. No marketing fluff. No vendor pitches. Just real-world insights that help you make better security and IT decisions." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} background="gradient-blinds" />

      <section className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Featured" title="Latest Analysis" />
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_1fr] items-stretch">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-blue/20 via-brand-purple/10 to-navy-deep min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] flex items-end">
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              <div className="absolute top-6 left-6"><span className="inline-flex rounded-full bg-brand-blue/20 border border-brand-blue/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-blue">{featuredArticle.tag}</span></div>
              <div className="relative p-6 lg:p-8">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3"><span>{featuredArticle.date}</span><span className="w-1 h-1 rounded-full bg-slate-600" /><span>{featuredArticle.readTime}</span></div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl md:text-3xl mb-3 sm:mb-4 leading-tight">{featuredArticle.title}</h2>
              <p className="text-slate-400 leading-relaxed mb-6">{featuredArticle.excerpt}</p>
              <div><Link to="#" className="inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-blue-bright transition-colors">Read Full Article <ArrowRightIcon className="w-4 h-4" /></Link></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-navy sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="All Articles" title="More From Our Team" centered />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link to="#" key={article.title} className="group">
                <Card className="p-0 overflow-hidden h-full flex flex-col">
                  <div className={`h-48 bg-gradient-to-br ${article.gradient} relative`}>
                    <div className="absolute inset-0 bg-dot-pattern opacity-30" />
                    <div className="absolute top-4 left-4"><span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${article.tagColor}`}>{article.tag}</span></div>
                  </div>
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3"><span>{article.date}</span><span className="w-1 h-1 rounded-full bg-slate-600" /><span>{article.readTime}</span></div>
                    <h3 className="font-display text-base font-semibold text-white mb-2 group-hover:text-brand-blue transition-colors leading-snug">{article.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed flex-1">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue mt-4 group-hover:gap-2 transition-all">Read more <ArrowRightIcon className="w-3.5 h-3.5" /></span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <Card variant="glass" hover={false} className="p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-white mb-3">Security Briefing, Monthly</h2>
              <p className="text-slate-400 mb-6">One email per month. Threat landscape updates, practical recommendations, and analysis from our engineering team. No spam. Unsubscribe anytime.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" placeholder="your@email.com" className="flex-1 rounded-lg border border-white/10 bg-navy-deep/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-blue/50 focus:outline-none focus:ring-1 focus:ring-brand-blue/50" />
                <button className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue-bright transition-colors">Subscribe</button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <CTASection title="Have a Security Question?" description="Our engineering team is available for consultations. Ask about your specific situation — we'll give you a straight answer." primaryButton={{ text: "Schedule Consultation", action: "modal" }} secondaryButton={{ text: "View FAQ", href: "/faq" }} />
    </>
  );
}
