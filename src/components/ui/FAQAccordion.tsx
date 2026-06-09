import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeFaq, setActiveFaq] = useState(0);

  if (!items.length) return null;
  const active = items[activeFaq] ?? items[0];

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Questions list (left) */}
      <ul className="flex flex-col gap-2 lg:col-span-6">
        {items.map((faq, idx) => {
          const isActive = activeFaq === idx;
          return (
            <li key={faq.question}>
              <button
                type="button"
                onClick={() => setActiveFaq(idx)}
                aria-pressed={isActive}
                aria-controls="faq-answer-panel"
                className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200 sm:px-5 sm:text-[15px] ${
                  isActive
                    ? "border-transparent bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow-[0_8px_24px_-8px_rgba(27,138,199,0.55)]"
                    : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-slate-50 hover:text-[#1B8AC7]"
                }`}
              >
                <span className="leading-snug">{faq.question}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                    isActive
                      ? "translate-x-0.5"
                      : "opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100"
                  }`}
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Answer panel (right) */}
      <div className="lg:col-span-6">
        <div
          id="faq-answer-panel"
          role="region"
          aria-live="polite"
          className="lg:sticky lg:top-24"
        >
          <div className="overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-[#045891] to-[#054466] p-6 shadow-[0_18px_40px_-18px_rgba(27,138,199,0.55)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white">
                Faq
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent"
              />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
              {active.question}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              {active.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
