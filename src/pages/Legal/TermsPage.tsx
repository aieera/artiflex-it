import PageHero from "@/pages/About/section/PageHero";
import SEO from "@/components/SEO";
import { CTASection } from "@/pages/Home/sections/CTASection";

const LAST_UPDATED = "6 June 2026";

interface Clause {
  heading: string;
  body: string[];
}

const clauses: Clause[] = [
  {
    heading: "Acceptance of these terms",
    body: [
      "These Terms of Use govern your access to and use of artiflexit.com and all related pages, content, and services operated by Artiflex Information Technology LLC (\"Artiflex\", \"we\", \"us\"). By accessing or using this website, you agree to be bound by these terms. If you do not agree, please do not use the site.",
    ],
  },
  {
    heading: "Ownership of content",
    body: [
      "All material on this website, including text, copywriting, page layouts, comparison tables, graphics, logos, icons, images, page structure, and the selection and arrangement of information, is owned by or licensed to Artiflex Information Technology LLC and is protected by copyright, trademark, and other intellectual property laws of the United Arab Emirates and international treaties.",
      "Third-party vendor names, product names, and logos referenced on this site remain the property of their respective owners and are used for identification and comparison purposes only.",
    ],
  },
  {
    heading: "Permitted use",
    body: [
      "You may view, browse, and print pages from this website for your own personal, non-commercial reference, provided you do not remove any copyright or proprietary notices.",
      "Any other use requires our prior written permission.",
    ],
  },
  {
    heading: "Restrictions: no copying or republishing",
    body: [
      "Except as expressly permitted above, you may not copy, reproduce, republish, scrape, harvest, mirror, frame, translate, adapt, distribute, sell, or otherwise exploit any part of this website or its content, in any medium, without our prior written consent.",
      "Automated access, including the use of bots, crawlers, or scrapers to extract content for republication or for training datasets, is prohibited.",
      "Reproducing our content (in whole or in part) on another website, in marketing material, or in any commercial context without authorisation is an infringement of our rights and may result in legal action, including a takedown request and a claim for damages.",
    ],
  },
  {
    heading: "Trademarks",
    body: [
      "The Artiflex name, the Artiflex logo, and related brand marks are trademarks of Artiflex Information Technology LLC. They may not be used without our prior written permission.",
    ],
  },
  {
    heading: "Reporting infringement",
    body: [
      "If you believe content has been copied from this website and republished elsewhere, or that material on this site infringes your rights, contact us at info@artiflexit.com with details and we will respond promptly.",
    ],
  },
  {
    heading: "Accuracy and availability",
    body: [
      "We aim to keep the information on this site accurate and current, but we make no warranty that it is complete, error-free, or continuously available. Vendor comparisons and recommendations reflect our professional assessment and are provided for general guidance, not as a binding commitment.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Artiflex shall not be liable for any indirect, incidental, or consequential loss arising from your use of, or inability to use, this website.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the United Arab Emirates, and any dispute shall be subject to the exclusive jurisdiction of the courts of Dubai.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these Terms of Use from time to time. The version published on this page, with the date shown above, is the current version. Continued use of the site after changes are posted constitutes acceptance of the revised terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Use | Artiflex IT"
        description="Terms of Use for artiflexit.com, covering ownership of content, permitted use, and restrictions on copying or republishing Artiflex material."
        path="/terms"
      />

      <PageHero
        title="Terms of Use"
        description="The terms that govern access to this website and the use of its content, including our copyright and intellectual property rights."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Use", href: "/terms" },
        ]}
        background="gradient-blinds"
      />

      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <p className="mb-12 text-sm font-medium text-slate-500">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="grid gap-10 lg:gap-12">
            {clauses.map((clause, index) => (
              <div
                key={clause.heading}
                className="border-l-2 border-brand-blue/30 pl-5 sm:pl-7"
              >
                <h2 className="font-display text-xl font-semibold tracking-tight text-navy-deep sm:text-2xl">
                  <span className="mr-2 text-brand-blue">{index + 1}.</span>
                  {clause.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {clause.body.map((para, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-slate-600 sm:text-base"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Questions About These Terms?"
        description="If you would like to use our content, license material, or report a copyright concern, our team is happy to help."
        primaryButton={{ text: "Talk to our Consultant", action: "modal" }}
      />
    </>
  );
}
