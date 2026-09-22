import { Link } from "react-router-dom";

type Props = {
  /**
   * Which accreditation badge to show inline.
   * - `firewall`: Sophos Firewall Accredited Partner (use on NGFW page).
   * - `platform`: Sophos Platform Accredited Partner (use on EDR/XDR, Email, SASE, DLP).
   */
  variant: "firewall" | "platform";
  /** Optional tagline that follows the heading. */
  caption?: string;
};

const BADGES = {
  firewall: {
    src: "/sophos-platinum-partner/Firewall_Partner.svg",
    alt: "Sophos Firewall Accredited Partner UAE",
    title: "Sophos Firewall Accredited Partner",
    defaultCaption:
      "Deployed by a Sophos Platinum Partner certified in network protection across the UAE, Oman, Saudi Arabia and India.",
  },
  platform: {
    src: "/sophos-platinum-partner/PartnerPlatform_Partner.svg",
    alt: "Sophos Platform Accredited Partner Dubai",
    title: "Sophos Platform Accredited Partner",
    defaultCaption:
      "Deployed by a Sophos Platinum Partner with deep expertise across the Sophos adaptive cybersecurity ecosystem, serving the UAE, Oman, Saudi Arabia and India.",
  },
} as const;

/**
 * Inline trust strip surfaced near the hero of cybersecurity service pages.
 * Pairs the relevant accreditation badge with the Platinum Partner badge
 * and a direct link to the canonical Sophos vendor page.
 */
export default function SophosAccreditationBadge({ variant, caption }: Props) {
  const b = BADGES[variant];
  return (
    <section
      className="relative bg-white py-6 sm:py-8"
      aria-label="Sophos accreditation"
    >
      <div className="shell">
        <Link
          to="/vendors/sophos"
          className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl border border-[#045891]/15 bg-white px-5 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-colors hover:border-[#045891]/35 sm:flex-row sm:items-center sm:gap-6 sm:px-8"
        >
          <div className="flex shrink-0 items-center gap-4">
            <img
              src="/sophos-platinum-partner/Sophos-Platinum-Partner.svg"
              alt="Sophos Platinum Partner UAE Dubai"
              className="h-16 w-auto sm:h-20"
              loading="lazy"
              width={64}
              height={64}
            />
            <img
              src={b.src}
              alt={b.alt}
              className="h-16 w-auto sm:h-20"
              loading="lazy"
              width={64}
              height={64}
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-display text-sm font-semibold text-[#045891] sm:text-base">
              Sophos Platinum Partner | {b.title}
            </p>
            <p className="mt-1 text-xs text-body sm:text-sm">
              {caption ?? b.defaultCaption}
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
