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
    heading: "Who we are",
    body: [
      "This Privacy Policy explains how Artiflex Information Technology LLC (\"Artiflex\", \"we\", \"us\") collects, uses, and protects personal information when you use artiflexit.com or contact us. We are based in Dubai, United Arab Emirates, and you can reach us at info@artiflexit.com.",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "We collect information you provide directly, such as your name, email address, phone number, company name, and the details of your enquiry when you submit a contact form or request a consultation.",
      "We also collect limited technical information automatically when you browse the site, including your IP address, browser type, device information, pages visited, and referring source. This is collected through standard web logs and analytics.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use the information you provide to respond to your enquiry, prepare proposals, deliver the services you request, and keep you informed about matters directly related to your request.",
      "We use technical and analytics data to operate the site, understand how it is used, improve content and performance, and keep the site secure.",
    ],
  },
  {
    heading: "Legal basis and consent",
    body: [
      "We process your personal information on the basis of your consent (which you give by submitting a form), to take steps at your request before entering an agreement, and for our legitimate interest in operating and improving our business. You can withdraw consent at any time by contacting us.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "This site may use cookies and similar technologies for essential functionality and to measure traffic and performance. You can control or disable cookies through your browser settings, though some features of the site may not work as intended if you do.",
    ],
  },
  {
    heading: "Sharing your information",
    body: [
      "We do not sell your personal information. We may share it with trusted service providers who help us operate the site and deliver our services (for example, hosting and analytics providers), and only to the extent needed for them to perform that work.",
      "We may also disclose information where required by law or to protect our legal rights.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We keep personal information only for as long as needed for the purposes described in this policy, to maintain our business records, and to comply with legal obligations. When it is no longer needed, we delete or anonymise it.",
    ],
  },
  {
    heading: "How we protect your data",
    body: [
      "As a cybersecurity and IT services provider, we apply appropriate technical and organisational measures to protect personal information against unauthorised access, loss, or misuse. No method of transmission over the internet is completely secure, but we take reasonable steps to safeguard the data you share with us.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Subject to applicable law, you may request access to the personal information we hold about you, ask us to correct or delete it, or object to certain processing. To make a request, contact us at info@artiflexit.com and we will respond within a reasonable time.",
    ],
  },
  {
    heading: "Third-party links",
    body: [
      "Our site references and links to third-party vendors and resources. We are not responsible for the privacy practices or content of those external sites. We encourage you to review their privacy policies.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "This Privacy Policy is governed by the laws of the United Arab Emirates, and any dispute shall be subject to the exclusive jurisdiction of the courts of Dubai.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. The version published on this page, with the date shown above, is the current version. We encourage you to review it periodically.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | Artiflex IT"
        description="Privacy Policy for artiflexit.com, explaining what personal information Artiflex collects, how we use and protect it, and your rights."
        path="/privacy"
      />

      <PageHero
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information when you use this website or contact us."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy" },
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
        title="Questions About Your Data?"
        description="If you would like to access, correct, or delete the information we hold about you, our team is here to help."
        primaryButton={{ text: "Talk to our Consultant", action: "modal" }}
      />
    </>
  );
}
