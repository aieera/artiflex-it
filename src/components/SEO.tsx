/**
 * <SEO />
 *
 * Reusable meta + hreflang + schema wrapper so every route ships
 * consistent SEO without copy-pasting 40 lines of <meta> tags.
 *
 * Usage:
 *   <SEO
 *     title="ERP Software in Dubai, UAE | Artiflex IT"
 *     description="..."
 *     path="/business-solutions/erp-software"
 *     image="https://artiflexit.com/og-images/erp.png"
 *     schema={[serviceSchema, breadcrumbSchema, faqSchema]}
 *   />
 */

const SITE = "https://artiflexit.com";
const SITE_NAME = "Artiflex Information Technology";

type SEOProps = {
  title: string;
  description: string;
  /** Route path starting with `/`. e.g. "/cybersecurity" */
  path: string;
  /** Absolute URL to an OG image (1200x630 recommended) */
  image?: string;
  /** Set to true for non-indexable pages (admin, thank-you, etc.) */
  noindex?: boolean;
  /** Array of JSON-LD objects to inject */
  schema?: Record<string, unknown>[];
  /** Override the OG type. Defaults to "website" */
  ogType?: "website" | "article" | "product";
};

export default function SEO({
  title,
  description,
  path,
  image = `${SITE}/og-image.png`,
  noindex = false,
  schema = [],
  ogType = "website",
}: SEOProps) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${SITE}${cleanPath === "/" ? "/" : cleanPath.replace(/\/$/, "")}`;

  return (
    <>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      />

      {/* Language + geo (UAE primary market) */}
      <meta httpEquiv="content-language" content="en-AE" />
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.2528;55.3300" />
      <meta name="ICBM" content="25.2528, 55.3300" />

      {/* hreflang, Artiflex serves UAE, Oman, Saudi Arabia */}
      <link rel="alternate" hrefLang="en-ae" href={canonical} />
      <link rel="alternate" hrefLang="en-om" href={canonical} />
      <link rel="alternate" hrefLang="en-sa" href={canonical} />
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="en_AE" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@artiflexit" />

      {/* JSON-LD */}
      {schema.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
}
