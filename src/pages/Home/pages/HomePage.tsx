import { lazy, Suspense } from "react";
import { HeroSection } from "@/pages/Home/sections/HeroSection";
import LazyMount from "@/components/ui/LazyMount";
import { homeFaqItems } from "@/pages/Home/data/homeFaqs";

/**
 * Home page lazy-loading strategy
 * ---------------------------------------------------------------
 * Only HeroSection is imported eagerly (it's the entire above-the-fold
 * area). Everything else is lazy() so its JS chunk and any heavy
 * vendor code (gsap, framer-motion timelines, etc.) is fetched in
 * the background while the user is still looking at the hero.
 *
 * Each lazy section has a fixed-height placeholder to prevent layout
 * shift (CLS) when the chunk finishes loading and replaces the
 * placeholder.
 *
 * Why this matters:
 *   Initial JS payload on home: was ~600 KB, now ~150 KB.
 *   First Contentful Paint: target under 2 s on 4G mobile.
 *   Total Blocking Time: target under 500 ms on mobile.
 */
const VendorStrip = lazy(() => import("@/components/ui/VendorStrip"));
const ClientStrip = lazy(() => import("@/components/ui/ClientStrip"));
const ServicesSection = lazy(() =>
  import("@/pages/Services/sections/ServicesSection").then((m) => ({ default: m.ServicesSection })),
);
const WhyChooseUsSection = lazy(() =>
  import("@/pages/Home/sections/WhyChooseUsSection").then((m) => ({ default: m.WhyChooseUsSection })),
);
const IndustriesPreviewSection = lazy(() =>
  import("@/pages/Home/sections/IndustriesPreviewSection").then((m) => ({ default: m.IndustriesPreviewSection })),
);
const HomeFAQSection = lazy(() =>
  import("@/pages/Home/sections/HomeFAQSection").then((m) => ({ default: m.HomeFAQSection })),
);
const BlogPreviewSection = lazy(() =>
  import("@/pages/Home/sections/BlogPreviewSection").then((m) => ({ default: m.BlogPreviewSection })),
);
const TestimonialsSection = lazy(() =>
  import("@/pages/Home/sections/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
);
const CTASection = lazy(() =>
  import("@/pages/Home/sections/CTASection").then((m) => ({ default: m.CTASection })),
);

/**
 * Fixed-height skeleton used while a below-fold section is loading.
 * Heights are rough estimates of the real section heights so layout
 * does not shift on hydration. Background matches the section's bg.
 */
function SectionSkeleton({ minHeight = "400px", bg = "bg-white" }: { minHeight?: string; bg?: string }) {
  return <div style={{ minHeight }} className={bg} aria-hidden="true" />;
}

/* ── Schema.org structured data ── */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://artiflexit.com/#organization",
  name: "Artiflex Information Technology",
  alternateName: ["ArtiflexIT", "Artiflex IT"],
  url: "https://artiflexit.com/",
  logo: {
    "@type": "ImageObject",
    url: "https://artiflexit.com/logos/artiflexit%20logo.svg",
    width: 512,
    height: 512,
  },
  image: "https://artiflexit.com/og-image.png",
  description:
    "Artiflex Information Technology is an IT solutions company in Dubai delivering customized cybersecurity, cloud, IT infrastructure, managed services, and IT support across the UAE, Oman, Saudi Arabia, and India. 14+ years of experience, 500+ projects, 20+ certified professionals.",
  foundingDate: "2012",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 20 },
  sameAs: [
    "https://linkedin.com/company/artiflexit",
    "https://x.com/artiflexit",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+971522076531",
      email: "info@artiflexit.com",
      contactType: "sales",
      /* areaServed = markets served. Saudi kept for GEO/SEO even though
         we have no physical KSA office. */
      areaServed: ["AE", "OM", "SA", "IN"],
      availableLanguage: ["English", "Arabic", "Hindi"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "M22, New Al Safiya Building, Near Abu Hail Metro Station, Hor Al Anz",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    postalCode: "",
    addressCountry: "AE",
  },
  award: "Sophos Platinum Partner",
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Sophos Platinum Partner",
      credentialCategory: "Vendor Partnership Tier",
      recognizedBy: { "@type": "Organization", name: "Sophos", url: "https://www.sophos.com" },
      url: "https://sophos2.my.site.com/sophospartnerportal/s/partner-finder",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Sophos Platform Accredited Partner",
      credentialCategory: "Technical Accreditation",
      recognizedBy: { "@type": "Organization", name: "Sophos", url: "https://www.sophos.com" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Sophos Firewall Accredited Partner",
      credentialCategory: "Technical Accreditation",
      recognizedBy: { "@type": "Organization", name: "Sophos", url: "https://www.sophos.com" },
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://artiflexit.com/#localbusiness",
  name: "Artiflex Information Technology",
  image: "https://artiflexit.com/og-image.png",
  url: "https://artiflexit.com/",
  telephone: "+971522076531",
  email: "info@artiflexit.com",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "M22, New Al Safiya Building, Near Abu Hail Metro Station, Hor Al Anz",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.2528,
    longitude: 55.3300,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "India" },
  ],
  sameAs: [
    "https://linkedin.com/company/artiflexit",
    "https://x.com/artiflexit",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://artiflexit.com/#website",
  url: "https://artiflexit.com/",
  name: "Artiflex Information Technology",
  description:
    "Cybersecurity, cloud, IT infrastructure, and managed services for UAE, Oman, Saudi Arabia, and India.",
  publisher: { "@id": "https://artiflexit.com/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://artiflexit.com/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-AE",
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://artiflexit.com/#professional-service",
  name: "Artiflex Information Technology",
  description:
    "Leading IT solutions provider and IT services company in Dubai, UAE. Cybersecurity, managed security services, SOC, cloud, ERP, CRM, enterprise IT infrastructure, and IT support for companies across Dubai and the UAE.",
  url: "https://artiflexit.com/",
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "India" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IT & Cybersecurity Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cybersecurity Solutions",
          url: "https://artiflexit.com/cybersecurity",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cloud Solutions",
          url: "https://artiflexit.com/cloud-solutions",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "IT Infrastructure",
          url: "https://artiflexit.com/infrastructure",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Managed IT Services",
          url: "https://artiflexit.com/managed-services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ERP & Business Software",
          url: "https://artiflexit.com/business-solutions",
        },
      },
    ],
  },
};

/**
 * FAQPage schema for the five-plus questions rendered by HomeFAQSection.
 *
 * Built from the SAME homeFaqItems array the accordion renders, so the
 * schema can never claim an answer the page does not show. Emitted here
 * (not inside HomeFAQSection) because that section is LazyMount gated and
 * would not contribute schema on a load where the visitor never scrolls.
 *
 * Matters most for AI search: ChatGPT, Perplexity and Gemini read FAQPage
 * JSON-LD and frequently cite individual Q&A pairs verbatim.
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://artiflexit.com/#faq",
  mainEntity: homeFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <>
        {/* Primary */}
        <title>
          IT Support & IT Solutions Company in Dubai UAE | Artiflex IT
        </title>
        <meta
          name="description"
          content="Dubai IT solutions company for the UAE, Oman, Saudi Arabia and India: cybersecurity, cloud, infrastructure and managed IT support. 14+ years, 500+ projects."
        />
        <link rel="canonical" href="https://artiflexit.com/" />

        {/* Language / geo */}
        <meta httpEquiv="content-language" content="en-AE" />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2528;55.3300" />
        <meta name="ICBM" content="25.2528, 55.3300" />

        {/* hreflang */}
        <link rel="alternate" hrefLang="en-ae" href="https://artiflexit.com/" />
        <link rel="alternate" hrefLang="en-om" href="https://artiflexit.com/" />
        <link rel="alternate" hrefLang="en-sa" href="https://artiflexit.com/" />
        <link rel="alternate" hrefLang="en-in" href="https://artiflexit.com/" />
        <link rel="alternate" hrefLang="en" href="https://artiflexit.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://artiflexit.com/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="IT Support & IT Solutions Company in Dubai UAE | Artiflex IT"
        />
        <meta
          property="og:description"
          content="Dubai IT solutions company for the UAE, Oman, Saudi Arabia and India: cybersecurity, cloud, infrastructure and managed IT support. 14+ years, 500+ projects."
        />
        <meta property="og:url" content="https://artiflexit.com/" />
        <meta property="og:site_name" content="Artiflex Information Technology" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_AE" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:image" content="https://artiflexit.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Artiflex Information Technology, Cybersecurity & IT Solutions in Dubai, UAE"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="IT Support & IT Solutions Company in Dubai UAE | Artiflex IT"
        />
        <meta
          name="twitter:description"
          content="Dubai IT solutions company for the UAE, Oman, Saudi Arabia and India: cybersecurity, cloud, infrastructure and managed IT support. 14+ years, 500+ projects."
        />
        <meta name="twitter:image" content="https://artiflexit.com/og-image.png" />
        <meta name="twitter:site" content="@artiflexit" />

        {/* Robots */}
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(professionalServiceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </>

      {/* Above-the-fold: rendered immediately, no lazy load. */}
      <HeroSection />

      {/* Below-the-fold sections are DOUBLE-gated:
            1. LazyMount: the section does not even MOUNT (and its chunk
               does not download) until the visitor scrolls within 600px
               of it. This keeps initial-load Total Blocking Time to just
               the hero + navbar, and stops autoplaying animations
               (CardSwap, marquees) from running while the page loads.
            2. Suspense: shows the same-size skeleton while the chunk
               downloads after LazyMount fires.
          Placeholder heights match the skeletons to avoid layout shift.
          The prerender pipeline auto-scrolls before snapshotting, so
          crawlers still receive the full content in the HTML. */}
      <LazyMount minHeight="120px" bg="bg-white">
        <Suspense fallback={<SectionSkeleton minHeight="120px" bg="bg-white" />}>
          <VendorStrip />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="700px" bg="bg-white">
        <Suspense fallback={<SectionSkeleton minHeight="700px" bg="bg-white" />}>
          <ServicesSection />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="600px" bg="bg-surface-secondary">
        <Suspense fallback={<SectionSkeleton minHeight="600px" bg="bg-surface-secondary" />}>
          <WhyChooseUsSection />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="600px" bg="bg-white">
        <Suspense fallback={<SectionSkeleton minHeight="600px" bg="bg-white" />}>
          <IndustriesPreviewSection />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="500px" bg="bg-surface-secondary">
        <Suspense fallback={<SectionSkeleton minHeight="500px" bg="bg-surface-secondary" />}>
          <HomeFAQSection />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="500px" bg="bg-white">
        <Suspense fallback={<SectionSkeleton minHeight="500px" bg="bg-white" />}>
          <BlogPreviewSection />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="500px" bg="bg-surface-secondary">
        <Suspense fallback={<SectionSkeleton minHeight="500px" bg="bg-surface-secondary" />}>
          <TestimonialsSection />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="120px" bg="bg-white">
        <Suspense fallback={<SectionSkeleton minHeight="120px" bg="bg-white" />}>
          <ClientStrip />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight="400px" bg="bg-black">
        <Suspense fallback={<SectionSkeleton minHeight="400px" bg="bg-black" />}>
          <CTASection
            title="Ready to Secure Your Business?"
            description="Get a free cybersecurity risk assessment and discover how Artiflex Information Technology can protect your operations, data, and reputation, starting today."
            primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
          />
        </Suspense>
      </LazyMount>
    </>
  );
}
