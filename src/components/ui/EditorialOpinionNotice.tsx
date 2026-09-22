/* ───────── EDITORIAL OPINION NOTICE ─────────
   Standard italic disclaimer rendered once at the END of every vendor
   comparison page (below the final CTA), presented as a frosted glass card.
   Clarifies that the ratings reflect Artiflex's independent professional
   opinion, not a vendor endorsement, and covers every comparison table above.

   It is pulled up with a negative top margin so it sits inside the empty lower
   half of the tall CTA section above it (instead of leaving a black void), and
   reuses the CTA section's cyan glow on a dark base so the two blend into one
   cohesive block before the footer.

   Placement: render as the LAST element of the page (after the final CTA
   section, before the page root closes). Self-contained <section> with its own
   `.shell` — do NOT nest it inside another section's `.shell`. */

export default function EditorialOpinionNotice() {
  return (
    <section className="relative -mt-20 overflow-hidden bg-black pb-12 pt-4 sm:-mt-24 sm:pb-16">
      {/* cyan glow pillar, echoing the CTA section's blue shade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(40,181,225,0.30)_0%,rgba(27,138,199,0.12)_32%,rgba(4,88,145,0.05)_55%,transparent_75%)] blur-3xl"
      />
      <div className="shell relative">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-6 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/10 backdrop-blur-xl sm:px-10 sm:py-8">
          <p className="text-center text-xs italic leading-relaxed text-slate-300 sm:text-[13px]">
            <span className="font-semibold text-white">Editorial Opinion Notice:</span> The ratings and
            comparisons shown above in this page represent the independent professional opinions of the
            Artiflex IT Solutions team based on available information and evaluation criteria at
            the time of publication. They are provided for informational purposes only and are
            not intended to promote, disparage, or misrepresent any vendor, product, or service.
            Readers should independently evaluate solutions before making business or purchasing
            decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
