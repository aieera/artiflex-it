import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/ui/SectionHeader";
import { ArrowRightIcon } from "@/components/icons"; // ✅ ADD THIS

const posts = [
  {
    tag: "Cybersecurity",
    tagColor: "text-brand-blue",
    title: "The State of Cybersecurity in the UAE: 2025",
    excerpt:
      "The UAE faces a 78% increase in sophisticated cyber threats this year. From evolving ransomware strains targeting critical infrastructure to new regulatory mandates reshaping compliance.",
    readTime: "6 min read",
    href: "/blog",
    image: "/cybermain.jpeg",
  },
  {
    tag: "Cloud",
    tagColor: "text-brand-cyan",
    title: "Cloud Migration Checklist: 7 Steps Most Companies Skip",
    excerpt:
      "Most cloud migrations fail not because of technology but because of planning gaps. From dependency mapping to rollback strategies — the seven steps that matter.",
    readTime: "5 min read",
    href: "/blog",
    image: "/cyber2.png",
  },
  {
    tag: "Infrastructure",
    tagColor: "text-brand-purple-light",
    title: "5 Signs Your Network Infrastructure Needs an Upgrade",
    excerpt:
      "Slow file transfers, frequent outages, and rising help desk tickets are more than annoyances — they are warning signs that your network has outgrown its capacity.",
    readTime: "4 min read",
    href: "/blog",
    image: "/infra.png",
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
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          label="Latest Insights"
          title="From the Artiflex Blog"
          description="Expert analysis on cybersecurity, cloud, and IT infrastructure — written for business leaders, not just engineers."
          centered
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-6 md:grid-cols-3 md:gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(27,138,199,0.08)] hover:border-brand-blue/25 hover:-translate-y-0.5 transition-all duration-500">

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-4">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${post.tagColor} bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-0.5`}>
                      {post.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-muted">{post.readTime}</span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-heading leading-snug transition-colors duration-200 group-hover:text-[#045891]">
                    {post.title}
                  </h3>

                  <p className="text-sm text-body leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/*  3D PREMIUM BUTTON */}
                  <div className="mt-4">
                    <Link
                      to="/blog#all-articles"
                      className="relative inline-flex px-5 py-2.5 rounded-full text-sm font-medium text-white overflow-hidden group/button"
                    >
                      {/* Border */}
                      <span className="absolute inset-0 rounded-full border border-blue-500/40 group-hover/button:border-blue-400 transition" />

                      {/* Glow animation */}
                      <span className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,transparent,rgba(59,130,246,0.6),transparent)] opacity-0 group-hover/button:opacity-100 blur-md animate-[shine_2s_linear_infinite]" />

                      {/* Base */}
                      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-800 to-cyan-600 shadow-[0_8px_25px_rgba(59,130,246,0.4)] group-hover/button:shadow-[0_12px_40px_rgba(59,130,246,0.6)] transition" />

                      {/* Text */}
                      <span className="relative flex items-center gap-2 group-hover/button:translate-x-1 transition">
                        Read more
                        <ArrowRightIcon className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>

                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/*  BUTTON ANIMATION */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}