import { Link } from "react-router-dom";
import SectionHeader from "@/components/ui/SectionHeader";
import { ShieldIcon } from "@/components/icons";
import { CYBER_PILLARS } from "@/lib/cyberPillars";

/**
 * Home: "Cybersecurity solutions" grid linking all 11 pillar pages.
 *
 * Deliberately NOT lazy / LazyMount gated: it is the home page's main
 * internal-link hub into the cybersecurity pillars, so its links must be
 * in the initial render (and therefore in the prerendered HTML) without
 * depending on scroll. It is plain markup with no animation library, so
 * rendering it eagerly costs almost nothing.
 */
export function CyberPillarsSection() {
  return (
    <section className="bg-surface-secondary py-14 sm:py-20 lg:py-24" aria-labelledby="home-cyber-pillars">
      <div className="shell">
        <SectionHeader
          label="Cybersecurity"
          title={<span id="home-cyber-pillars">Cybersecurity Solutions for UAE Businesses</span>}
          description="Explore each security pillar: vendor comparisons, sizing guidance and managed services from a Dubai-based team."
          centered
        />

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {CYBER_PILLARS.map((p) => (
            <li key={p.href}>
              <Link
                to={p.href}
                className="group flex h-full items-start gap-3.5 rounded-2xl border border-border-light bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-[0_8px_30px_rgba(27,138,199,0.08)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#045891]/10 text-[#045891] transition-colors duration-300 group-hover:bg-[#045891] group-hover:text-white">
                  <ShieldIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[15px] font-semibold leading-snug text-heading transition-colors group-hover:text-brand-blue">
                    {p.label}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-body">{p.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-body">
          New to our security practice? Start with the{" "}
          <Link to="/cybersecurity" className="font-semibold text-brand-blue hover:underline">
            cybersecurity services overview
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
