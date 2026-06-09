/* ───────── SHARED VENDOR COMPARISON MATRIX ─────────
   The star-rating "Vendor comparison for X buyers" table used on the
   cybersecurity comparison pages. Mirrors the layout pioneered on the
   Firewalls & Network Security page so every comparison page renders the
   same buyer-facing table alongside its Gartner-style capability grid. */

export type ComparisonStarCell = { stars: number; note: string };
export type ComparisonVerdictCell = { recommended?: boolean; rank?: string; text: string };
export type ComparisonRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: ComparisonStarCell[] }
  | { label: string; type: "verdict"; cells: ComparisonVerdictCell[] };

export type ComparisonVendor = { name: string; recommended?: boolean; rank?: string };

type Props = {
  /** Plain heading text before the highlighted span, e.g. "Vendor comparison for". */
  heading: string;
  /** Highlighted (gradient) span, e.g. "Firewall buyers". */
  highlight: string;
  intro: string;
  vendors: ComparisonVendor[];
  rows: ComparisonRow[];
  onContact: () => void;
  /** Optional anchor id (defaults to "vendor-comparison"). */
  id?: string;
  /** Label for the CTA button. */
  ctaLabel?: string;
  /** When true, render only the table (no section wrapper, heading, or CTA).
   *  Use when the host page already provides its own heading + CTA. */
  bare?: boolean;
};

function ComparisonTable({ vendors, rows }: { vendors: ComparisonVendor[]; rows: ComparisonRow[] }) {
  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
      <div className="overflow-x-auto">
        <table
          className="w-full table-fixed border-collapse text-center text-sm"
          style={{ minWidth: Math.max(640, 150 + vendors.length * 116) }}
        >
          <thead>
            <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
              <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                Criteria
              </th>
              {vendors.map((v) => (
                <th
                  key={v.name}
                  className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom"
                >
                  {v.recommended && (
                    <span className="mb-1.5 inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-100">
                      ✓ Recommended
                    </span>
                  )}
                  <p className="font-display text-sm font-semibold text-white sm:text-base">
                    {v.name}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr
                key={row.label}
                className={`transition-colors ${
                  row.type === "verdict"
                    ? "border-t-2 border-[#28B5E1]/30 bg-gradient-to-r from-[#04101E] to-[#0A3D6B]"
                    : `border-t border-[#0A3D6B]/20 hover:bg-[#28B5E1]/[0.04] ${
                        rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`
                }`}
              >
                <th
                  scope="row"
                  className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold ${
                    row.type === "verdict"
                      ? "bg-[#04101E] uppercase tracking-wider text-[#28B5E1]"
                      : `${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"} text-slate-900`
                  }`}
                >
                  {row.label}
                </th>
                {row.cells.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-2 py-3 align-middle sm:px-4 sm:py-4 ${
                      row.type === "verdict"
                        ? "border-l border-white/10 text-slate-300"
                        : "border-l border-[#0A3D6B]/20 text-slate-700"
                    }`}
                  >
                    {row.type === "stars" ? (
                      <div>
                        <span aria-label={`${(cell as ComparisonStarCell).stars} out of 5`} className="text-amber-500">
                          {"★".repeat((cell as ComparisonStarCell).stars)}
                          <span className="text-slate-300">
                            {"★".repeat(5 - (cell as ComparisonStarCell).stars)}
                          </span>
                        </span>
                        <p className="mt-1 text-xs leading-snug text-slate-600">
                          {(cell as ComparisonStarCell).note}
                        </p>
                      </div>
                    ) : row.type === "verdict" ? (
                      <div className="space-y-1.5">
                        {(cell as ComparisonVerdictCell).recommended && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                            ✓ Recommended
                          </span>
                        )}
                        <p className="text-xs leading-relaxed text-slate-300">
                          {(cell as ComparisonVerdictCell).text}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs leading-snug text-slate-700">
                        {cell as string}
                      </p>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function VendorComparisonMatrix({
  heading,
  highlight,
  intro,
  vendors,
  rows,
  onContact,
  id = "vendor-comparison",
  ctaLabel = "Talk to our Consultant",
  bare = false,
}: Props) {
  if (bare) return <ComparisonTable vendors={vendors} rows={rows} />;
  return (
    <section id={id} className="relative bg-white py-16 scroll-mt-20 sm:py-24">
      <div className="shell">
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <h2 className="mx-auto max-w-3xl font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {heading}{" "}
            <span className="gradient-text">{highlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
            {intro}
          </p>
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <button
            onClick={onContact}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
          >
            {ctaLabel}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <ComparisonTable vendors={vendors} rows={rows} />
      </div>
    </section>
  );
}
