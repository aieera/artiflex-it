import Button from "@/components/ui/Button";
import { ShieldIcon } from "@/components/icons";
import { sophosBenefits, sophosProducts } from "@/pages/Services/cybersecurity/data/sophos";

type Props = {
  /** Click handler for the bottom CTA. Typically opens the contact modal. */
  onCtaClick: () => void;
};

/**
 * Sophos Cybersecurity Platform showcase.
 * Renders the partner badge, header, stats grid, product portfolio
 * and Sophos Site-in-a-Box iframe. Used on the Sophos firewall vendor
 * detail page and the dedicated /vendors/sophos page.
 */
export default function SophosShowcase({ onCtaClick }: Props) {
  return (
    <section id="sophos" className="relative py-16 bg-surface-secondary overflow-hidden sm:py-24">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple" />

      <div className="shell">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#045891]/8 border border-[#045891]/15 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#045891]">
            <ShieldIcon className="w-4 h-4" />
            Featured Solution: Platinum Sophos Partner
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
          <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
            Sophos Cybersecurity Platform
          </h2>
          <p className="text-base text-body leading-relaxed max-w-3xl mx-auto sm:text-lg">
            A complete, pre-configured security stack from one vendor: firewall, endpoint, email, wireless, MDR, XDR, SASE, and unified management. Defending 600,000+ organizations and 100 million+ users globally.
          </p>
        </div>

        {/* Benefits Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 max-w-4xl mx-auto mb-10 sm:mb-16">
          {sophosBenefits.map((b) => (
            <div key={b.label} className="text-center">
              <span className="font-display text-2xl font-bold text-[#045891] sm:text-3xl">{b.value}</span>
              <p className="mt-1 text-xs text-body">{b.label}</p>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div id="sophos-portfolio" className="mb-16 scroll-mt-24">
          <h3 className="font-display text-xl font-semibold text-heading text-center mb-8">
            Complete Sophos Product Portfolio
          </h3>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {sophosProducts.map((product) => (
              <div
                key={product.title}
                className="group rounded-2xl border border-border-light bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] lg:p-3.5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#045891]/8 text-[#045891] transition-colors group-hover:bg-[#045891] group-hover:text-white">
                  <product.icon className="h-4 w-4" />
                </div>
                <h4 className="font-display text-sm font-semibold leading-tight text-heading mb-2">{product.title}</h4>
                <p className="text-[11px] leading-relaxed text-body lg:text-[11.5px]">{product.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sophos iframe embed */}
        <div className="mb-12">
          <h3 className="font-display text-xl font-semibold text-heading text-center mb-2">
            Explore Sophos Solutions in Detail
          </h3>
          <p className="text-sm text-muted text-center mb-8">
            Browse the full Sophos product catalog and configure your security stack directly.
          </p>
          <div className="relative rounded-2xl border border-white/[0.08] bg-white/50 overflow-hidden shadow-2xl shadow-black/30">
            <iframe
              src="https://www.sophos.com/en-us/site-in-a-box?partner_referral_id=0014w000047pf2XAAQ"
              title="Sophos Site-in-a-Box: Configure your complete cybersecurity stack"
              className="w-full border-0"
              style={{ height: "min(800px, 80vh)", minHeight: "400px" }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="gradient" size="lg" onClick={onCtaClick}>
            Request Deployment Plan
          </Button>
          <p className="mt-3 text-xs text-muted">
            ArtiflexIT is a Platinum Sophos partner serving the UAE and Middle East.
          </p>
        </div>
      </div>
    </section>
  );
}
