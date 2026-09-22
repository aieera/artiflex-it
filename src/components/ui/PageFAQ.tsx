import FAQAccordion from "./FAQAccordion";

/**
 * <PageFAQ />
 *
 * Drop-in FAQ block for any page. Renders the visual accordion AND
 * automatically emits FAQPage JSON-LD so Google and AI engines can
 * surface the Q&A as rich results / citation snippets.
 *
 * Usage:
 *   const faqs = [
 *     { question: "What is X?", answer: "..." },
 *     { question: "How much does X cost in UAE?", answer: "..." },
 *   ];
 *   <PageFAQ
 *     heading="Frequently Asked Questions"
 *     subheading="Common questions from UAE buyers"
 *     items={faqs}
 *   />
 *
 * Why this exists:
 *   - 80% of cybersecurity pages had visible FAQs in the body but no
 *     FAQPage schema. That kills the rich-result eligibility.
 *   - This component couples the visual FAQ with the schema so they
 *     can never drift out of sync.
 *   - Optimizing for AI search: ChatGPT / Perplexity / Gemini index
 *     FAQPage JSON-LD and often cite individual Q&A pairs verbatim.
 */
export interface PageFAQItem {
  question: string;
  answer: string;
}

interface PageFAQProps {
  /** FAQ items. 4-8 recommended; rich results need at least 2. */
  items: PageFAQItem[];
  /** Section heading. Defaults to "Frequently Asked Questions". */
  heading?: string;
  /** Optional sub-heading or eyebrow text. */
  subheading?: string;
  /**
   * Optional className for the outer <section>. Use to control bg/padding.
   * Default: zero padding so the parent page chooses spacing.
   */
  className?: string;
  /**
   * When true, the FAQPage JSON-LD is emitted INSIDE the visible section
   * (React 19 hoists it to <head> automatically). Set false on pages that
   * already emit FAQPage schema separately to avoid duplicate FAQPage tags.
   */
  emitSchema?: boolean;
}

export default function PageFAQ({
  items,
  heading = "Frequently Asked Questions",
  subheading,
  className = "",
  emitSchema = true,
}: PageFAQProps) {
  if (!items || items.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className={`relative bg-white ${className}`}>
      {emitSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        {subheading && (
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B8AC7]">
            {subheading}
          </p>
        )}
        <h2 className="mb-8 font-display text-2xl font-bold leading-tight text-heading sm:mb-10 sm:text-3xl lg:text-4xl">
          {heading}
        </h2>
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}
