import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/ui/SectionHeader";
import { ShieldIcon, CloudIcon, ServerIcon } from "@/components/icons";

const posts = [
  {
    tag: "Cybersecurity",
    tagColor: "text-brand-blue",
    title: "The State of Cybersecurity in the UAE: 2025",
    excerpt:
      "The UAE faces a 78% increase in sophisticated cyber threats this year. From evolving ransomware strains targeting critical infrastructure to new regulatory mandates reshaping compliance — here is what every CISO needs to know.",
    readTime: "6 min read",
    href: "/blog",
    icon: ShieldIcon,
    gradientFrom: "from-brand-blue/20",
    gradientTo: "to-brand-cyan/20",
  },
  {
    tag: "Cloud",
    tagColor: "text-brand-cyan",
    title: "Cloud Migration Checklist: 7 Steps Most Companies Skip",
    excerpt:
      "Most cloud migrations fail not because of technology but because of planning gaps. From dependency mapping to rollback strategies, these are the seven steps that separate seamless migrations from costly disasters.",
    readTime: "5 min read",
    href: "/blog",
    icon: CloudIcon,
    gradientFrom: "from-brand-cyan/20",
    gradientTo: "to-brand-blue/20",
  },
  {
    tag: "Infrastructure",
    tagColor: "text-brand-purple-light",
    title: "5 Signs Your Network Infrastructure Needs an Upgrade",
    excerpt:
      "Slow file transfers, frequent outages, and rising help desk tickets are more than annoyances — they are warning signs. Learn how to tell when your network has outgrown its capacity and what to do about it.",
    readTime: "4 min read",
    href: "/blog",
    icon: ServerIcon,
    gradientFrom: "from-brand-purple/20",
    gradientTo: "to-brand-blue/20",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function BlogPreviewSection() {
  return (
    <section className="bg-surface-secondary py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          label="Latest Insights"
          title="From the ArtiflexIT Blog"
          description="Expert analysis on cybersecurity, cloud, and IT infrastructure — written for business leaders, not just engineers."
          centered
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-6 md:grid-cols-3 md:gap-8">
          {posts.map((post, i) => {
            const Icon = post.icon;
            return (
              <motion.article
                key={post.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <Link
                  to={post.href}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(27,138,199,0.08)] hover:border-brand-blue/25 hover:-translate-y-0.5 transition-all duration-500"
                >
                  {/* Gradient header image area */}
                  <div
                    className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${post.gradientFrom} ${post.gradientTo}`}
                  >
                    <Icon className="h-12 w-12 text-white/20" />
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`font-semibold uppercase tracking-wider ${post.tagColor}`}>
                        {post.tag}
                      </span>
                      <span className="text-muted">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-semibold text-heading leading-snug transition-colors duration-200 group-hover:text-brand-blue-bright">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-body leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
