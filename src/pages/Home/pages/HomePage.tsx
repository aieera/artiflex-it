import { HeroSection } from "@/pages/Home/sections/HeroSection";
import VendorStrip from "@/components/ui/VendorStrip";
import ClientStrip from "@/components/ui/ClientStrip";
import { ServicesSection } from "@/pages/Services/sections/ServicesSection";
import { WhyChooseUsSection } from "@/pages/Home/sections/WhyChooseUsSection";
import { IndustriesPreviewSection } from "@/pages/Home/sections/IndustriesPreviewSection";
import { HomeFAQSection } from "@/pages/Home/sections/HomeFAQSection";
import { BlogPreviewSection } from "@/pages/Home/sections/BlogPreviewSection";
import { TestimonialsSection } from "@/pages/Home/sections/TestimonialsSection";
import { CTASection } from "@/pages/Home/sections/CTASection";

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
    "Artiflex Information Technology delivers customized cybersecurity, cloud, IT infrastructure, and managed services across the UAE, Oman, and Saudi Arabia. 14+ years of experience, 500+ projects, 20+ certified professionals.",
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
      areaServed: ["AE", "OM", "SA", "IN"],
      availableLanguage: ["English", "Arabic", "Hindi"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Malik Saeed Suhail Saeed Bin Daliwi Al-Kutbi - Bardab - First Commercial Center 45B - Office No.102",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    postalCode: "",
    addressCountry: "AE",
  },
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
  priceRange: "$$-$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Malik Saeed Suhail Saeed Bin Daliwi Al-Kutbi - Bardab - First Commercial Center 45B - Office No.102",
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
    "Cybersecurity, cloud, IT infrastructure, and managed services for UAE, Oman, and Saudi Arabia.",
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
    "Leading cybersecurity and IT solutions provider in Dubai, UAE. Managed security services, SOC, cloud, ERP, CRM, and enterprise IT infrastructure.",
  url: "https://artiflexit.com/",
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Saudi Arabia" },
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

export default function HomePage() {
  return (
    <>
      <>
        {/* Primary */}
        <title>
          Cybersecurity & IT Solutions Company in Dubai, UAE | Artiflex IT
        </title>
        <meta
          name="description"
          content="Dubai-based cybersecurity and IT solutions company serving UAE, Oman, Saudi Arabia. 14+ years, 500+ projects, 20+ certified experts. Free consultation."
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
        <link rel="alternate" hrefLang="en" href="https://artiflexit.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://artiflexit.com/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Cybersecurity & IT Solutions Company in Dubai, UAE | Artiflex IT"
        />
        <meta
          property="og:description"
          content="14+ years of experience. 500+ projects. 20+ certified professionals. Artiflex delivers customized cybersecurity, cloud, and IT solutions across UAE, Oman, and Saudi Arabia."
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
          content="Cybersecurity & IT Solutions Company in Dubai, UAE | Artiflex IT"
        />
        <meta
          name="twitter:description"
          content="Trusted Dubai-based cybersecurity and IT solutions. 14+ years, 500+ projects across UAE, Oman, and Saudi Arabia."
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
      </>

      <HeroSection />

      <VendorStrip />

      <ServicesSection />

      <WhyChooseUsSection />

      <IndustriesPreviewSection />

      <HomeFAQSection />

      <BlogPreviewSection />

      <TestimonialsSection />

      <ClientStrip />

      <CTASection
        title="Ready to Secure Your Business?"
        description="Get a free cybersecurity risk assessment and discover how Artiflex Information Technology can protect your operations, data, and reputation, starting today."
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />
    </>
  );
}
