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
  /**
   * Author byline. Required for AI engines (ChatGPT, Perplexity, Gemini)
   * to treat the page as authoritative. Defaults to the editorial team
   * so every page has *some* author, which is the minimum bar.
   */
  author?: string;
  /**
   * ISO 8601 publish date, e.g. "2026-01-15T00:00:00Z".
   * Defaults to start of current year so AI engines treat content as
   * fresh. Override on blog posts with the real publish date.
   */
  datePublished?: string;
  /**
   * ISO 8601 last-modified date. Defaults to today (build time).
   * Helps AI engines prefer recent content when ranking citations.
   */
  dateModified?: string;
};

// Defaults computed at module load (build time for prerender)
const DEFAULT_AUTHOR = "Artiflex IT Editorial Team";
const DEFAULT_PUBLISHED = "2026-01-01T00:00:00Z";
const DEFAULT_MODIFIED = new Date().toISOString();

export default function SEO({
  title,
  description,
  path,
  image = `${SITE}/og-image.png`,
  noindex = false,
  schema = [],
  ogType = "website",
  author = DEFAULT_AUTHOR,
  datePublished = DEFAULT_PUBLISHED,
  dateModified = DEFAULT_MODIFIED,
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

      {/*
        Authorship + freshness, critical for AI Search (ChatGPT,
        Perplexity, Gemini, Copilot) and Google E-E-A-T signals.
        Pages without an author or published date get demoted by
        recent ranking systems and rarely appear in AI citations.
      */}
      <meta name="author" content={author} />
      <meta property="article:author" content={author} />
      <meta property="article:published_time" content={datePublished} />
      <meta property="article:modified_time" content={dateModified} />
      <meta property="og:updated_time" content={dateModified} />

      {/* Language + geo (UAE primary market) */}
      <meta httpEquiv="content-language" content="en-AE" />
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.2528;55.3300" />
      <meta name="ICBM" content="25.2528, 55.3300" />

      {/* hreflang, Artiflex serves UAE (primary), Oman, Saudi Arabia, India */}
      <link rel="alternate" hrefLang="en-ae" href={canonical} />
      <link rel="alternate" hrefLang="en-om" href={canonical} />
      <link rel="alternate" hrefLang="en-sa" href={canonical} />
      <link rel="alternate" hrefLang="en-in" href={canonical} />
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
