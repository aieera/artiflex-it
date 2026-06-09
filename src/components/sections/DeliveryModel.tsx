/* ───────── SHARED "OUR DELIVERY MODEL" SECTION ─────────
   The firewalls-page "assess, design, deploy, manage" delivery section,
   reused across the infrastructure pages so every page carries the same
   firewall-style delivery model before the "Why Artiflex IT" section. */

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const stages = [
  {
    title: "Assess",
    duration: "1–2 weeks",
    summary:
      "Audit of your current estate, requirements, capacity and constraints, mapped against business goals, compliance and budget.",
    deliverable:
      "Current-state report, vendor recommendation with rationale, three-year TCO comparison.",
  },
  {
    title: "Design",
    duration: "1–3 weeks",
    summary:
      "Reference architecture for your specific environment: topology, redundancy and capacity sizing, integration points, and a phased migration plan with rollback at each stage.",
    deliverable:
      "Approved design, bill of materials, signed-off rollout sequence and change-management plan.",
  },
  {
    title: "Deploy",
    duration: "2–6 weeks",
    summary:
      "Phased implementation with validation at every stage, off-hours cutover where needed, minimal disruption and day-1 hypercare.",
    deliverable:
      "Live, validated deployment, audit-ready as-built documentation and runbooks for your team.",
  },
  {
    title: "Manage",
    duration: "Ongoing",
    summary:
      "24/7 monitoring, maintenance, firmware and patch lifecycle, capacity reviews and SLA-backed support, with monthly reporting and quarterly architecture reviews.",
    deliverable:
      "Operational estate with SLAs you can actually rely on. Or a clean handover to your team.",
  },
];

export default function DeliveryModel({ description }: { description?: string }) {
  return (
    <section className="relative bg-surface-secondary py-16 sm:py-24">
      <div className="shell">
        <SectionHeader
          label="How we work"
          title={
            <>
              Our <span className="gradient-text">delivery model</span>
            </>
          }
          description={
            description ??
            "We don't sell boxes. We deliver outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
          }
          centered
        />

        <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
          {stages.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border-light bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(27,138,199,0.10)] sm:p-6"
            >
              <div className="flex items-baseline justify-end">
                <span className="rounded-full border border-border-light bg-surface-secondary px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                  {s.duration}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-heading">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">{s.summary}</p>
              <div className="mt-4 border-t border-border-light pt-3">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                  You get
                </p>
                <p className="mt-1 text-xs leading-relaxed text-body/85">
                  {s.deliverable}
                </p>
              </div>
              {idx < 3 && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block"
                >
                  <div className="h-px w-6 bg-gradient-to-r from-brand-blue/40 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
