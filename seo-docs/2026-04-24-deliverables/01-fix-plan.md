# Artiflex IT — SEO Fix Plan (post-prerender audit)

Generated 24 April 2026 from `dist/_seo-audit.json`. The prerender pipeline is clean; these are the content-level issues the audit surfaced.

## Snapshot

| Metric | Value |
|---|---|
| Total prerendered pages | 32 |
| Duplicate titles | 0 |
| Duplicate descriptions | 0 |
| Average word count | 1,752 |
| Thin pages (<300 words) | 0 |
| Pages with parse-error schema | 0 |
| Pages missing H1 | 0 |
| Pages missing alt text | 0 |

The content baseline is strong. The issues below are metadata gaps and over-long tags — fixable in one focused sprint.

---

## Priority 1 — ship before next deploy

### 1A. Add canonical + og:image + JSON-LD schema to 8 orphan pages

These 8 pages render with no schema and (8 of them) no canonical. Highest-impact fix on the board because they're all navigation hubs or lead-capture pages.

| Route | Add canonical | Add og:image | Add schema |
|---|---|---|---|
| `/blog` | ✓ | ✓ | `WebPage`, `Blog`, `BreadcrumbList` |
| `/cloud-solutions` | ✓ | ✓ | `Service`, `FAQPage`, `BreadcrumbList` |
| `/contact` | ✓ | ✓ | `ContactPage`, `LocalBusiness`, `BreadcrumbList` |
| `/cybersecurity/email-security-vendors` | ✓ | ✓ | `Article`, `ItemList`, `BreadcrumbList` |
| `/disaster-recovery-solutions-dubai` | ✓ | ✓ | `Service`, `FAQPage`, `LocalBusiness`, `BreadcrumbList` |
| `/infrastructure` | ✓ | ✓ | `Service`, `FAQPage`, `BreadcrumbList` |
| `/managed-services` | ✓ | ✓ | `Service`, `FAQPage`, `BreadcrumbList` |
| `/services` | ✓ | ✓ | `CollectionPage`, `ItemList`, `BreadcrumbList` |

**Fix pattern** (from existing working pages — copy from `ErpSoftware.tsx`):
```tsx
<link rel="canonical" href="https://artiflexit.com/<route>" />
<meta property="og:image" content="/og/<slug>.png" />
<script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
<script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
<script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
```

### 1B. Shorten 15 over-length titles to ≤60 chars

Google truncates titles around 580 pixels (~60 characters). Every truncated title loses brand + keyword visibility in the SERP.

Proposed rewrites:

| Route | Current (len) | Proposed (≤60) |
|---|---|---|
| `/about` | 109 | `About Artiflex IT — 14 Years of UAE IT & Cybersecurity` |
| `/amc-services` | 88 | `AMC Services Dubai — IT Maintenance Contracts UAE \| Artiflex` |
| `/application-security-solutions` | 91 | `Application Security UAE — VAPT, API, WAF \| Artiflex IT` |
| `/business-solutions` | 85 | `Business Software Solutions UAE \| Artiflex IT` |
| `/business-solutions/crm-software` | 69 | `CRM Software UAE — Sales & Service Automation \| Artiflex` |
| `/business-solutions/document-management-system` | 74 | `Document Management System UAE — Cloud DMS \| Artiflex IT` |
| `/business-solutions/erp-software` | 97 | `ERP Software UAE — Finance, Inventory, Supply Chain \| Artiflex` |
| `/business-solutions/finance-accounting-software` | 85 | `Accounting Software UAE — Cloud Finance & Invoicing \| Artiflex` |
| `/business-solutions/hr-management-software` | 86 | `HRMS UAE — Payroll, Leave & Attendance \| Artiflex IT` |
| `/business-solutions/sales-management-software` | 76 | `Sales Management Software UAE — Pipeline & CRM \| Artiflex` |
| `/business-solutions/unified-firewall-management` | 88 | `Unified Firewall Management UAE \| Artiflex IT` |
| `/cybersecurity` | 89 | `Cybersecurity UAE — NGFW, EDR, SASE, MDR \| Artiflex IT` |
| `/services` | 81 | `IT Services UAE — Cybersecurity, Cloud, AMC \| Artiflex` |

Keep the trailing `| Artiflex IT` or `| Artiflex` as brand anchor. Lead with the primary keyword. UAE/Dubai geo-modifier in the first 35 chars.

### 1C. Trim 10 over-length descriptions to 140–160 chars

Pattern: lead with the primary keyword, include a 1–2 word geo modifier (UAE/Dubai), end with a concrete benefit or CTA. Target 145–155 chars for optimal truncation resistance.

| Route | Current len | Target len |
|---|---|---|
| `/` | 206 | 155 |
| `/about` | 234 | 155 |
| `/amc-services` | 172 | 155 |
| `/business-solutions` | 213 | 155 |
| `/business-solutions/crm-software` | 167 | 155 |
| `/business-solutions/erp-software` | 172 | 155 |
| `/business-solutions/unified-firewall-management` | 179 | 155 |
| `/cloud-solutions` | 192 | 155 |
| `/cybersecurity` | 235 | 155 |
| `/infrastructure` | 170 | 155 |
| `/services` | 190 | 155 |

One page goes the opposite direction:
- `/application-security-solutions` is 54 chars. Pad to 130+ and include target keywords "VAPT UAE", "API security Dubai".

---

## Priority 2 — next sprint

### 2A. Migrate all 31 inline-metadata pages to the `<SEO />` component

Only the homepage renders hreflang alternates. The other 31 pages set title/meta inline, so they ship without hreflang. The `<SEO />` component in `src/components/SEO.tsx` already emits consistent en-ae / en-om / en-sa / x-default hreflang tags.

Refactor each page to call:
```tsx
<SEO
  title="..."
  description="..."
  path="/cybersecurity"
  image="/og/cybersecurity.png"
  schema={[serviceSchema, faqSchema, breadcrumbSchema]}
/>
```

This collapses ~25 lines of inline JSX per page into one component call and guarantees hreflang + OG + Twitter + geo meta ships on every route.

### 2B. Deepen 4 thin hub pages

These are top-of-funnel landing pages that currently underperform their content depth:

- `/managed-services` (453 words) — expand to 1,500+ with: SLA tiers, response time matrix, service categories, AMC vs MSP comparison, 3–5 case blurbs.
- `/services` (581 words) — expand to 1,500+ with: service overview grid, industries served, compliance credentials (NESA, SAMA, ISO 27001 alignment), 3 outcome metrics.
- `/infrastructure` (622 words) — expand to 1,500+ with: vendor partnerships, typical architectures, network/server/virtualization sub-sections, 2 case studies.
- `/blog` (499 words) — normal for an index page. Add intro paragraph + category descriptions + recent-posts section to push past 800.

---

## Priority 3 — nice to have

- Merge `/cybersecurity` and `/cybersecurity/cybersecurity-solutions` if the content overlaps. Two URLs competing for the same keyword dilute each other.
- Add an `og:image` per route folder. 1200×630, under 300 KB, text-first (service name + Artiflex logo). I can spec these for the design team.
- Add `article:published_time` + `article:author` meta on blog posts when the blog is live.

---

## Execution sequence

**Day 1 (code):** 1A schema + canonical patches on 8 pages. Rebuild. Redeploy. Should land a clean audit rerun.

**Day 2 (content):** 1B title rewrites + 1C description rewrites. Rebuild. Redeploy.

**Day 3 (GBP + Bing):** see `02-google-business-profile-setup.md` and `03-bing-webmaster-setup.md`.

**Week 2 (refactor):** 2A SEO component migration. Touches every page file but each is mechanical.

**Week 3–4 (content):** 2B thin-page expansions.

After all of this re-ships, the audit output should show `pagesWithIssues: 0`.
