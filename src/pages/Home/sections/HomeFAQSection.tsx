import SectionHeader from "@/components/ui/SectionHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { homeFaqItems } from "@/pages/Home/data/homeFaqs";

/**
 * The question/answer content lives in @/pages/Home/data/homeFaqs so the
 * same array also feeds the FAQPage JSON-LD emitted by HomePage. Edit the
 * data module, never a copy here, or the schema and the visible copy will
 * drift and Google will flag a content mismatch.
 */
export function HomeFAQSection() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="shell">
        <SectionHeader
          label="FAQ"
          title="Frequently Asked Questions"
          description="Quick answers to the questions we hear most from businesses in Dubai and across the UAE."
          centered
        />

        <div className="mt-12">
          <FAQAccordion items={homeFaqItems} />
        </div>
      </div>
    </section>
  );
}
