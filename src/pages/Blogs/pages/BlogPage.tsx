import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/pages/Home/sections/CTASection";
import ClientStrip from "@/components/ui/ClientStrip";
import { ArrowRightIcon, XIcon } from "@/components/icons";
import { useLocation } from "react-router-dom";

interface Article {
  tag: string;
  tagColor: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  gradient: string;
  image: string;
}

const featuredArticle = {
  tag: "Cybersecurity",
  tagColor: "bg-brand-blue/20 text-brand-blue border-brand-blue/40",
  title:
    "The State of Cybersecurity in the UAE: What Every Business Owner Needs to Know in 2025",
  excerpt:
    "Ransomware attacks targeting GCC businesses surged 300% in two years. Social engineering losses exceeded $4.7 billion globally. And the average breach cost in the Middle East hit $6.93 million — 69% higher than the global average. This isn't a technology problem. It's a business risk that demands board-level attention.",
  content: `Ransomware attacks targeting GCC businesses surged 300% in two years. Social engineering losses exceeded $4.7 billion globally. And the average breach cost in the Middle East hit $6.93 million — 69% higher than the global average. This isn't a technology problem. It's a business risk that demands board-level attention.

The UAE has positioned itself as a global digital economy hub, but that same connectivity creates an expanded attack surface. Government entities, financial institutions, healthcare providers, and logistics companies are all prime targets for sophisticated threat actors.

Key trends shaping the 2025 threat landscape:

1. AI-Powered Attacks: Threat actors are leveraging AI to craft more convincing phishing campaigns, automate vulnerability scanning, and develop polymorphic malware that evades traditional detection.

2. Supply Chain Compromise: Attackers increasingly target trusted vendors and software providers to gain access to their customers' networks. A single compromised update can affect thousands of organizations.

3. Ransomware-as-a-Service (RaaS): The commoditization of ransomware has lowered the barrier to entry for cybercriminals. Even unskilled attackers can now launch sophisticated ransomware campaigns.

4. Regulatory Pressure: With NESA, ICA, and UAE PDPL enforcement tightening, non-compliance carries significant financial and legal consequences beyond the breach itself.

5. Cloud Security Gaps: Rapid cloud adoption has outpaced security posture management. Misconfigured cloud resources remain one of the top causes of data exposure.

What should businesses do? The answer isn't more tools — it's a coordinated, multi-layered defense strategy that addresses people, processes, and technology. This means regular vulnerability assessments, employee security awareness training, incident response planning, and continuous monitoring through a dedicated SOC.

The cost of prevention is always lower than the cost of recovery. Businesses that invest in proactive security today will be the ones that survive and thrive in the digital economy of tomorrow.`,
  date: "March 12, 2025",
  readTime: "8 min read",
  gradient: "from-brand-blue/20 to-navy-deep",
  image: "/cybermain.jpeg",
};

const articles: Article[] = [
  {
    tag: "Cybersecurity",
    tagColor: "bg-red-500/10 text-red-400 border-red-500/30",
    title: "Why Your Firewall Alone Won't Stop a Ransomware Attack",
    excerpt:
      "Modern ransomware bypasses perimeter defenses entirely. It enters through phishing emails, compromised credentials, and supply chain vendors. Here's what actually works.",
    content: `Modern ransomware bypasses perimeter defenses entirely. It enters through phishing emails, compromised credentials, and supply chain vendors. Here's what actually works.

Your firewall is doing its job — blocking unauthorized traffic at the network edge. But ransomware in 2025 doesn't need to breach your firewall. It walks through the front door.

The anatomy of a modern ransomware attack:

1. Initial Access: A convincing phishing email lands in an employee's inbox. The email appears to come from a trusted vendor or internal colleague. One click downloads a malicious payload.

2. Lateral Movement: The attacker uses the compromised credentials to move laterally across the network, escalating privileges and mapping out high-value targets.

3. Data Exfiltration: Before encryption, attackers exfiltrate sensitive data to use as leverage for double extortion — "pay up, or we publish your data."

4. Encryption: The ransomware deploys across all accessible systems simultaneously, encrypting files and demanding payment in cryptocurrency.

What actually stops ransomware:
- Endpoint Detection and Response (EDR) on every device
- Network segmentation to limit lateral movement
- Email security with advanced threat protection
- Regular, tested, air-gapped backups
- Employee security awareness training
- 24/7 SOC monitoring for anomalous behavior
- Incident response plan tested quarterly

The firewall remains essential — but it's just one layer in a defense-in-depth strategy. Without the other layers, it's a locked front door on a house with open windows.`,
    date: "March 5, 2025",
    readTime: "6 min read",
    gradient: "from-red-950/40 to-navy-deep",
    image: "/cyber1.jpeg",
  },
  {
    tag: "Cloud",
    tagColor: "bg-brand-blue/10 text-brand-blue border-brand-blue/30",
    title: "Cloud Migration Mistakes That Cost UAE Businesses Millions",
    excerpt:
      "60% of cloud migrations exceed budget. 45% miss timelines. We analyzed the six patterns behind failed migrations and what successful ones do differently.",
    content: `60% of cloud migrations exceed budget. 45% miss timelines. We analyzed the six patterns behind failed migrations and what successful ones do differently.

Cloud migration promises reduced costs, increased agility, and improved scalability. But the reality for many UAE businesses has been cost overruns, performance issues, and security gaps that didn't exist on-premises.

The six patterns behind failed migrations:

1. Lift-and-Shift Everything: Moving workloads to the cloud without re-architecting them results in higher costs and worse performance. Not every application belongs in the cloud.

2. Skipping the Assessment Phase: Without a thorough assessment of current infrastructure, dependencies, and data flows, migration plans are built on assumptions rather than facts.

3. Ignoring Security from Day One: Security should be designed into the cloud architecture, not bolted on afterward. Cloud-native security differs fundamentally from on-premises security.

4. Underestimating Data Transfer Costs: Moving large datasets to the cloud and data egress charges can significantly impact the total cost of ownership.

5. No Training Plan: Teams unfamiliar with cloud services make costly mistakes — from leaving S3 buckets public to over-provisioning compute resources.

6. Missing Governance Framework: Without clear policies for resource provisioning, cost management, and access control, cloud sprawl becomes inevitable.

What successful migrations do differently:
- Start with a comprehensive cloud readiness assessment
- Prioritize workloads based on business value and complexity
- Implement a Cloud Center of Excellence (CCoE)
- Use FinOps practices from day one
- Design for resilience with multi-AZ and multi-region architectures
- Establish clear governance and compliance frameworks`,
    date: "February 27, 2025",
    readTime: "7 min read",
    gradient: "from-blue-950/40 to-navy-deep",
    image: "/cyber2.png",
  },
  {
    tag: "Compliance",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    title: "NESA Compliance: A Practical Guide for UAE Businesses",
    excerpt:
      "The National Electronic Security Authority sets security standards for critical infrastructure. But the requirements also apply to any organization that handles sensitive data. Here's how to comply without over-engineering.",
    content: `The National Electronic Security Authority (NESA) sets security standards for critical infrastructure in the UAE. But the requirements extend beyond critical infrastructure — any organization handling sensitive data should align with NESA guidelines.

Understanding NESA's framework:

NESA's Information Assurance Standards cover 188 controls across 12 domains. These include access management, incident response, business continuity, network security, and more.

Practical steps to achieve compliance:

1. Gap Assessment: Compare your current security posture against NESA's requirements. Identify where you fall short and prioritize based on risk.

2. Policy Development: Create or update security policies to align with NESA standards. Policies should be practical and enforceable, not just documentation exercises.

3. Technical Controls: Implement required technical controls including encryption, access management, network segmentation, and logging.

4. Training and Awareness: Ensure all employees understand their role in maintaining security. Regular training and phishing simulations are essential.

5. Incident Response: Develop and regularly test an incident response plan that meets NESA's notification and reporting requirements.

6. Continuous Monitoring: Implement 24/7 monitoring and regular vulnerability assessments to maintain compliance over time.

The key to compliance without over-engineering is proportionality. Apply controls based on the sensitivity of the data you handle and the risks you face. Not every organization needs the same level of protection for every asset.`,
    date: "February 18, 2025",
    readTime: "10 min read",
    gradient: "from-amber-950/40 to-navy-deep",
    image: "/compli.png",
  },
  {
    tag: "Infrastructure",
    tagColor: "bg-brand-purple/10 text-brand-purple border-brand-purple/30",
    title:
      "The $5,600-Per-Minute Problem: Calculating the True Cost of IT Downtime",
    excerpt:
      "Downtime costs more than most businesses estimate. Beyond lost revenue, factor in recovery costs, compliance penalties, customer churn, and reputation damage.",
    content: `Downtime costs more than most businesses estimate. The average cost of IT downtime is $5,600 per minute — but that number varies dramatically based on your industry and business model.

For a financial services firm processing transactions, a minute of downtime could mean tens of thousands in lost revenue. For a healthcare provider, it could mean delayed patient care. For an e-commerce business during peak season, it could mean permanent customer loss.

Components of downtime cost:

1. Lost Revenue: Direct loss of sales, transactions, or billable hours during the outage.

2. Recovery Costs: Emergency IT support, overtime pay, hardware replacement, and data recovery expenses.

3. Compliance Penalties: Regulatory fines for service disruptions, especially in financial services and healthcare.

4. Customer Churn: Customers who experience service disruptions are 3x more likely to switch to a competitor within 12 months.

5. Reputation Damage: Social media amplifies outage visibility. A major outage can take months to recover from in terms of brand perception.

6. Employee Productivity: Every minute of system downtime multiplied by the number of affected employees equals significant lost productivity.

How to reduce downtime:
- Implement redundant systems and failover capabilities
- Use proactive monitoring to catch issues before they cause outages
- Maintain up-to-date disaster recovery plans and test them regularly
- Invest in preventive maintenance through AMC contracts
- Design infrastructure with high availability in mind from the start`,
    date: "February 10, 2025",
    readTime: "5 min read",
    gradient: "from-purple-950/40 to-navy-deep",
    image: "/infra.png",
  },
  {
    tag: "Managed Services",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    title:
      "Build vs. Buy: When Managed IT Services Make More Sense Than Hiring",
    excerpt:
      "A qualified network engineer costs AED 25,000+/month. After visa, insurance, and training, that's AED 400,000 annually. Here's the math on when outsourcing wins.",
    content: `A qualified network engineer costs AED 25,000+/month in the UAE. After visa sponsorship, health insurance, annual flights, training, and benefits, that's approximately AED 400,000 annually — for one person covering one domain.

Now consider that a comprehensive IT team needs expertise across networking, security, cloud, helpdesk, and compliance. That's five to eight full-time hires minimum, totaling AED 2-3 million annually before accounting for turnover, training, and management overhead.

When managed services make more sense:

1. Cost Predictability: Replace variable break-fix costs with a fixed monthly fee. Our clients see an average 60% reduction in total IT spending.

2. 24/7 Coverage: No single hire can provide round-the-clock coverage. Managed services include after-hours monitoring and response as standard.

3. Breadth of Expertise: A managed services provider brings a team of specialists across every IT domain. You get the collective expertise of the entire organization.

4. Scalability: Scale your IT support up or down based on business needs without the delays and costs of hiring or layoffs.

5. Reduced Risk: Managed providers maintain compliance certifications, carry professional liability insurance, and follow established best practices.

When to build in-house:
- When IT is your core business
- When you have highly specialized or proprietary systems
- When regulatory requirements demand on-site personnel
- When you need real-time physical access to systems

For most mid-market businesses, the answer is a hybrid approach: a lean internal team for strategic decisions and vendor management, with managed services handling day-to-day operations, monitoring, and incident response.`,
    date: "February 3, 2025",
    readTime: "6 min read",
    gradient: "from-emerald-950/40 to-navy-deep",
    image: "/manage.jpg",
  },
  {
    tag: "Cybersecurity",
    tagColor: "bg-red-500/10 text-red-400 border-red-500/30",
    title:
      "Social Engineering in the UAE: Why Your Employees Are Your Biggest Vulnerability",
    excerpt:
      "73% of successful breaches start with a human being tricked. Phishing simulations, vishing campaigns, and pretexting attacks reveal gaps that technology alone cannot close.",
    content: `73% of successful breaches start with a human being tricked — not a firewall bypassed or a zero-day exploited. Social engineering remains the most effective attack vector because it targets the one element of your security stack that can't be patched: human psychology.

Common social engineering attacks in the UAE:

1. Business Email Compromise (BEC): Attackers impersonate executives or vendors to authorize fraudulent wire transfers. UAE businesses lost over $1.2 billion to BEC attacks in 2024.

2. Spear Phishing: Targeted emails crafted using information from LinkedIn, company websites, and social media. These emails are nearly indistinguishable from legitimate communications.

3. Vishing (Voice Phishing): Phone calls impersonating banks, government agencies, or IT support. The caller creates urgency to extract credentials or authorize actions.

4. Pretexting: Attackers build a fabricated scenario to gain trust and extract information. This often involves impersonating new employees, auditors, or vendors.

5. Watering Hole Attacks: Compromising websites frequently visited by target employees to deliver malware through trusted channels.

Building human resilience:
- Regular phishing simulations with immediate feedback
- Role-based security awareness training
- Clear reporting channels for suspicious communications
- Two-person authorization for financial transactions
- Verification protocols for vendor payment changes
- Culture that rewards reporting over punishing mistakes

Technology helps — email filters, URL scanning, and AI-powered detection can catch many attacks. But the last line of defense is always the human. Training your employees to recognize and report social engineering is the highest-ROI security investment you can make.`,
    date: "January 25, 2025",
    readTime: "7 min read",
    gradient: "from-red-950/40 to-navy-deep",
    image: "/cyber3.jpg",
  },
];


/* ── Blog Post Modal ── */
function BlogModal({
  article,
  onClose,
}: {
  article: (typeof articles)[0] | typeof featuredArticle;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
        >
          <XIcon className="h-4 w-4" />
        </button>

        {/* Image */}
        <div className="w-full h-[250px] sm:h-[350px] relative overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${article.tagColor}`}
            >
              {article.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 text-xs text-muted mb-4">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{article.readTime}</span>
          </div>

          <h2 className="font-display text-xl font-bold text-heading sm:text-2xl md:text-3xl mb-6 leading-tight">
            {article.title}
          </h2>

          <div className="prose prose-sm sm:prose-base max-w-none text-body leading-relaxed">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState<
    (typeof articles)[0] | typeof featuredArticle | null
  >(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // wait for render
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Blog — Cybersecurity & IT Insights | ArtiflexIT</title>
        <meta
          name="description"
          content="Expert analysis on cybersecurity trends, cloud strategy, and IT infrastructure for UAE businesses. Practical insights from ArtiflexIT's engineering team."
        />
      </Helmet>

      <PageHero
        title={
          <>
            Insights &{" "}
            <span className="gradient-text">Expert Analysis</span>
          </>
        }
        description="Actionable cybersecurity, cloud, and IT infrastructure insights from our engineering team — helping UAE businesses stay protected and make informed decisions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        background="gradient-blinds"
      />

      {/* Featured */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Featured" title="Latest Analysis" />
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_1fr] items-stretch">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-blue/20 via-brand-purple/10 to-navy-deep min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] flex items-end">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-6">
                <span className="inline-flex rounded-full bg-brand-blue/20 border border-brand-blue/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-blue">
                  {featuredArticle.tag}
                </span>
              </div>
              <div className="relative p-6 lg:p-8">
                <div className="flex items-center gap-3 text-xs text-body mb-3">
                  <span>{featuredArticle.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-xl font-bold text-heading sm:text-2xl md:text-3xl mb-3 sm:mb-4 leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-body leading-relaxed mb-6">
                {featuredArticle.excerpt}
              </p>
              <div>
                <button
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-blue-bright transition-colors cursor-pointer"
                >
                  Read Full Article{" "}
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section id="all-articles" className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="All Articles"
            title="More From Our Team"
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div
                key={article.title}
                className="group cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <Card className="p-0 overflow-hidden h-full flex flex-col">
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500 blur-[6px] scale-110 group-hover:blur-none group-hover:scale-100"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-90 group-hover:opacity-0 transition-all duration-500`}
                    />
                    <div className="absolute inset-0 bg-dot-pattern opacity-30 group-hover:opacity-0 transition-all duration-500" />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${article.tagColor}`}
                      >
                        {article.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-muted mb-3">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-heading mb-2 group-hover:text-brand-blue transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-body leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue mt-4 group-hover:gap-2 transition-all">
                      Read more <ArrowRightIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <Card variant="glass" hover={false} className="p-5 sm:p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-heading mb-3">
                Security Briefing, Monthly
              </h2>
              <p className="text-body mb-6">
                One email per month. Threat landscape updates, practical
                recommendations, and analysis from our engineering team. No
                spam. Unsubscribe anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg border border-border-light bg-surface-secondary px-4 py-3 text-sm text-heading placeholder:text-muted focus:border-brand-blue/50 focus:outline-none focus:ring-1 focus:ring-brand-blue/50"
                />
                <button className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-heading hover:bg-brand-blue-bright transition-colors">
                  Subscribe
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <ClientStrip />

      <CTASection
        title="Have a Security Question?"
        description="Our engineering team is available for consultations. Ask about your specific situation — we'll give you a straight answer."
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <BlogModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
