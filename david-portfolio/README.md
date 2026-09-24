# davidgeha.dev

The site of David Geha, AI consultant in Beirut: a Vite + React home page plus static content pages generated at
build time (so crawlers and AI fetchers that don't run JavaScript read the full copy).

```bash
npm install
npm run dev       # sync-static + build-pages, then the Vite dev server
npm run build     # the same, then the production build to dist/ (Vercel runs this)
npm run lint
```

## How pages are made

- `index.html` + `src/` — the home page (React). `scripts/sync-static.mjs` keeps its FAQPage JSON-LD and the
  `<noscript>` crawl mirror in step with `src/content/*.js`.
- `src/pages/*.js` — one module per content page: `path`, `title`, `description`, `datePublished`, `dateModified`,
  `h1`, `lead`, `body`, `faq`, `extraSchema`. `scripts/build-pages.mjs` renders each to `<path>/index.html` (schema,
  breadcrumbs, FAQ, CTA) and rewrites `public/sitemap.xml`. Update `dateModified` whenever a page's content changes:
  it is the schema `dateModified` and the sitemap `lastmod` (never the build date).
- No orphan pages: with two or more articles the build generates the `/blog/` index, and every page outside the
  nav (engine-generated service/industry pages, `/blog/`, `/work/`) is linked from the footer of every page. The
  home page follows too: `scripts/site-links.mjs` lists the content pages, `sync-static.mjs` writes it to
  `src/content/site-links.js` (the React header menu and footer read it) and into the `<noscript>` mirror, and the
  "Guide" link becomes "Guides" → `/blog/` once the hub exists — no hand edits when the engine publishes.
- Generated page folders (`about/`, `ai-*/`, `blog/`, `work/`) are git-ignored and rebuilt on every build.

## SEO / GEO

Run by the private `seo-geo-engine` repo: it opens PRs that add or edit `src/pages/*.js` (merging is publishing), and
`.github/workflows/notify-engine.yml` tells it which URLs changed after a merge. `VITE_GA4_ID` in the Vercel env turns
on GA4 and `VITE_CLARITY_ID` Microsoft Clarity (each only when set); every page sends `generate_lead` (`method`: email /
whatsapp / phone / booking) to whichever is on when a contact link is clicked — the engine counts leads by landing page
and channel from GA4 (`method` is a built-in dimension), and Clarity tags those sessions so the recordings of visits
that led to contact are one filter away.
