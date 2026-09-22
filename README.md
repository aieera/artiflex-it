# Artiflex IT website

Marketing site for Artiflex Information Technology (artiflexit.com).
React 19 + TypeScript + Vite 8, Tailwind CSS 4, React Router 7,
Framer Motion. Static output, prerendered per route, hosted on Apache
(Hostinger) via manual upload of `dist/`.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR, opens the browser |
| `npm run build` | Type-check (`tsc -b`) then production bundle into `dist/` |
| `npm run build:seo` | `build`, then OG images, then prerender. Use this for a deployable `dist/` |
| `npm run og` | Renders one 1200x630 OG card per blog post into `public/og/blog/` |
| `npm run prerender` | Walks the sitemaps, renders each route with Playwright, writes static HTML into `dist/` |
| `npm run qa` | Playwright QA pass over the built site (meta, headings, screenshots) |
| `npm run lint` | ESLint |
| `npm run preview` | Serves `dist/` locally |

Playwright browsers must be installed once: `npx playwright install chromium`.

## Layout

```
index.html              Shell: critical CSS, GTM stub, favicon, fonts
public/                 Served as-is at site root
  .htaccess             Apache: 301s, caching, proper 404
  sitemap*.xml          Drives prerender and search engines. New pages MUST be added
  og/blog/              Generated OG cards (one per post), committed
  logos/                Vendor logos referenced by the comparison pages
  images/               Page imagery
scripts/
  prerender.mjs         Static HTML per route (wired to npm run prerender)
  generate-og-images.mjs  OG cards for blog posts (npm run og)
  qa-audit.mjs          QA pass (npm run qa)
  audit-*.mjs, verify-faq-*.mjs, mobile-audit.mjs
                        Ad-hoc audits, run directly with node
src/
  App.tsx               All routes, pages lazy-loaded
  components/           Shared layout, sections, UI primitives
  content/blog/         Blog registry (see below)
  pages/                One folder per site section
  styles/               Tailwind entry
```

## Blog posts

Posts are discovered automatically from `src/content/blog/posts/<slug>/`:

- `meta.ts` exports `meta` (title, excerpt, date, image, ogImage, related, author). Always bundled.
- `content.ts` exports `content` (the article body blocks). Loaded on demand.

To add a post: create the folder with both files, add a `<url>` entry to
`public/sitemap-blog.xml`, then run `npm run build:seo`.

## Deploy

1. `npm run build:seo`
2. Upload the contents of `dist/` to the Apache document root, including `.htaccess`.

Routes not listed in a sitemap are not prerendered and will 404 in production.
