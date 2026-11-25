import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContactModal } from "@/components/layout/ContactModal";
import { ArrowRightIcon } from "@/components/icons";

const PAGE_URL = "https://artiflexit.com/corporate-training";
const PAGE_TITLE = "Corporate IT Training | Artiflex IT";
const PAGE_DESCRIPTION =
  "Corporate IT training: hands-on, industry-led programmes that build the technology skills your teams need to raise productivity and drive business growth, delivered wherever you are.";

function HeroCTA() {
  const { openModal } = useContactModal();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
      <button
        onClick={openModal}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-8 sm:py-3.5 sm:text-base cursor-pointer"
      >
        Contact Us
        <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}

export default function CorporateTrainingPage() {
  return (
    <>
      <>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        <meta httpEquiv="content-language" content="en" />

        <link rel="alternate" hrefLang="en" href={PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />

        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="Artiflex Information Technology" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://artiflexit.com/og/pages/corporate-training.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Artiflex IT corporate IT training" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content="https://artiflexit.com/og/pages/corporate-training.jpg" />
        <meta name="twitter:site" content="@artiflexit" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Corporate IT Training",
          serviceType: "Corporate IT Training",
          provider: { "@type": "Organization", name: "Artiflex IT", url: "https://artiflexit.com" },
          areaServed: "Worldwide",
          url: PAGE_URL,
          description: PAGE_DESCRIPTION,
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://artiflexit.com/" },
            { "@type": "ListItem", position: 2, name: "Corporate Training", item: PAGE_URL },
          ],
        })}</script>
      </>

      {/* ═══════════════════════════════════════
          HERO: CORPORATE TRAINING
          ═══════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-light">
        {/* Background image */}
        <div className="absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
          <img
            src="/images/Corporate-training.png"
            alt="Corporate IT training by Artiflex IT"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center opacity-55 [mask-image:radial-gradient(120%_90%_at_60%_45%,black_55%,transparent_100%)]"
          />
        </div>

        {/* Readability tint */}
        <div
          className="absolute inset-0 z-[3] bg-gradient-to-r from-navy-deep/90 via-navy-deep/65 to-navy-deep/25 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-[3] bg-gradient-to-b from-navy-deep/55 via-transparent to-navy-deep/80 pointer-events-none"
          aria-hidden="true"
        />

        <div className="shell relative z-10 flex w-full flex-1 flex-col pt-20 pb-6 sm:pt-24 sm:pb-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 sm:text-xs">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <span className="font-medium text-[#28B5E1]">Corporate Training</span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-1 flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex max-w-4xl flex-col justify-center py-4"
            >
              <p className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-8xl">
                Corporate Training
              </p>

              <div className="mt-6 sm:mt-8 lg:mt-8 xl:mt-10">
                <h1 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-white sm:mt-3 sm:text-2xl md:text-3xl lg:text-[1.6rem] xl:text-4xl">
                  <span className="gradient-text">Upskill Your Teams in the Technologies That Matter</span>
                </h1>

                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-300 sm:mt-4 sm:text-sm md:text-base lg:text-sm xl:text-base">
                  Empowering professionals with industry-leading IT training, hands-on expertise, and the latest technology skills to enhance productivity and business growth.
                </p>
                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm md:text-base lg:text-sm xl:text-base">
                  Contact us for your training requirements. Tell us the teams, technologies and outcomes you have in mind, and we will shape a programme around them.
                </p>

                <div className="mt-5 sm:mt-6">
                  <HeroCTA />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
