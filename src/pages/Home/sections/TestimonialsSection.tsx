import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "As a growing enterprise, we needed a technology partner who could scale with us. Artiflex IT's managed services have been instrumental in supporting our 300% growth over two years.",
    name: "Jennifer Williams",
    role: "CTO",
    company: "Energy Dynamics Corp",
    initials: "JW",
    accent: "#045891",
  },
  {
    id: 2,
    quote:
      "Artiflex IT transformed our entire infrastructure. Their team's expertise in cloud migration saved us 40% in operational costs while improving our system reliability to 99.99% uptime.",
    name: "Sarah Chen",
    role: "VP Engineering",
    company: "FinTech Global",
    initials: "SC",
    accent: "#1B8AC7",
  },
  {
    id: 3,
    quote:
      "The cybersecurity audit Artiflex conducted uncovered vulnerabilities we had no idea existed. Their SOC team now monitors our systems 24/7 — we haven't had a single incident since.",
    name: "Ahmed Al Mansoori",
    role: "IT Director",
    company: "Gulf Logistics Group",
    initials: "AA",
    accent: "#28B5E1",
  },
  {
    id: 4,
    quote:
      "We evaluated five IT providers before choosing Artiflex. What sealed it was their honesty — they recommended what we actually needed, not the most expensive package.",
    name: "Priya Sharma",
    role: "CISO",
    company: "MedCare Health Systems",
    initials: "PS",
    accent: "#045891",
  },
  {
    id: 5,
    quote:
      "Their team helped us achieve full NESA compliance in just 8 weeks. The documentation alone would have taken our internal team months. Highly professional.",
    name: "Khalid Bin Zayed",
    role: "Managing Director",
    company: "National Construction Co.",
    initials: "KZ",
    accent: "#1B8AC7",
  },
  {
    id: 6,
    quote:
      "Switching from multiple vendors to Artiflex's single-SLA model eliminated the finger-pointing that used to delay every incident resolution. One team, complete accountability.",
    name: "Fatima Al Hashimi",
    role: "Operations Head",
    company: "Retail Solutions UAE",
    initials: "FH",
    accent: "#28B5E1",
  },
  {
    id: 7,
    quote:
      "The AMC contract has paid for itself three times over. Preventive maintenance eliminated the quarterly breakdowns. Our uptime hasn't dropped below 99.9% since we started.",
    name: "Rajesh Patel",
    role: "Finance Director",
    company: "TechVentures DMCC",
    initials: "RP",
    accent: "#045891",
  },
  {
    id: 8,
    quote:
      "From endpoint security to cloud management — Artiflex handles everything so our internal team can focus on strategic initiatives instead of firefighting IT issues.",
    name: "Layla Hassan",
    role: "CEO",
    company: "Horizon Real Estate",
    initials: "LH",
    accent: "#1B8AC7",
  },
];

/* ── Marquee row that scrolls infinitely ── */
function MarqueeRow({
  items,
  reverse = false,
  speed = 40,
  onSelect,
}: {
  items: typeof testimonials;
  reverse?: boolean;
  speed?: number;
  onSelect: (t: (typeof testimonials)[0]) => void;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden group">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-secondary to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-secondary to-transparent sm:w-24" />

      <div
        className={`flex gap-5 ${
          reverse ? "animate-vendor-scroll-reverse" : "animate-vendor-scroll"
        } group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((t, i) => (
          <div
            key={`${t.id}-${i}`}
            onClick={() => onSelect(t)}
            className="shrink-0 w-[260px] sm:w-[320px] md:w-[380px] cursor-pointer"
          >
            <div className="rounded-2xl border border-border-light bg-white p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(4,88,145,0.12)] hover:border-[#045891]/25 hover:-translate-y-1 h-full">
              {/* Top row — avatar + info */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white font-display font-bold text-sm"
                  style={{ backgroundColor: t.accent }}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-heading truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted truncate">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <svg
                    key={j}
                    className="h-3.5 w-3.5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-body leading-relaxed line-clamp-4">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Expanded testimonial modal ── */
function TestimonialModal({
  t,
  onClose,
}: {
  t: (typeof testimonials)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[92vw] sm:w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent bar */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${t.accent}, ${t.accent}88, ${t.accent}44)`,
          }}
        />

        <div className="p-5 sm:p-8 md:p-10">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center text-muted hover:bg-surface-secondary hover:text-heading transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Large quote mark */}
          <svg
            className="h-10 w-10 mb-6"
            style={{ color: t.accent }}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          {/* Stars */}
          <div className="flex gap-1 mb-5">
            {[...Array(5)].map((_, j) => (
              <svg
                key={j}
                className="h-5 w-5 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Full quote */}
          <p className="text-base sm:text-lg text-heading leading-relaxed mb-6 sm:mb-8 font-medium">
            &ldquo;{t.quote}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center gap-4 pt-6 border-t border-border-light">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white font-display font-bold text-lg"
              style={{ backgroundColor: t.accent }}
            >
              {t.initials}
            </div>
            <div>
              <p className="font-display text-base font-bold text-heading">
                {t.name}
              </p>
              <p className="text-sm text-muted">
                {t.role}
              </p>
              <p className="text-sm font-medium" style={{ color: t.accent }}>
                {t.company}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main section ── */
export function TestimonialsSection() {
  const [selected, setSelected] = useState<(typeof testimonials)[0] | null>(null);
  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section className="bg-surface-secondary py-14 sm:py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#045891]/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#045891] mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#045891]" />
            Testimonials
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15] mx-auto max-w-2xl">
            Trusted by Businesses Across the Region
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-body sm:text-base lg:text-lg mx-auto max-w-xl">
            Don&apos;t take our word for it — hear from the teams we&apos;ve helped secure, scale, and transform.
          </p>
        </div>
      </div>

      {/* Two-row marquee */}
      <div className="space-y-5">
        <MarqueeRow items={row1} speed={45} onSelect={setSelected} />
        <MarqueeRow items={row2} speed={50} reverse onSelect={setSelected} />
      </div>

      {/* Expanded modal */}
      <AnimatePresence>
        {selected && (
          <TestimonialModal t={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
