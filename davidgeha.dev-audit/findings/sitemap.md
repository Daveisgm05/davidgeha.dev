# Sitemap Audit — davidgeha.dev

Audited: 2026-09-19
Site type: single-page React SPA (one canonical URL, in-page anchor sections: `#top`, `#work`, `#about`, `#services`, `#builds`, `#faq`, `#contact`). No client-side router / no additional routes exist in `src/App.jsx`.

## Score: 90 / 100

## Discovery
- `robots.txt` declares `Sitemap: https://davidgeha.dev/sitemap.xml` — found, HTTP 200, valid `urlset`.
- No sitemap index, no `sitemap-index.xml` / `wp-sitemap.xml` (404s as expected — single small site doesn't need one).

## Validation Results

| Check | Result | Notes |
|---|---|---|
| XML well-formed | PASS | Valid `urlset` + `image` namespace extension |
| URL count vs 50,000 limit | PASS | 1 URL |
| File size vs 50MB limit | PASS | <1KB |
| `news:` sitemap present | N/A | Not a news site |
| Listed URL returns 200 | PASS | `https://davidgeha.dev/` → 200 |
| Referenced `image:loc` URLs return 200 | PASS | og-image.jpg, work-outreach-v2.webp, work-research-v2.webp, work-ads-v2.webp, work-crm-v3.webp all 200 |
| Noindexed URL in sitemap | PASS (none found) | — |
| Redirected URL in sitemap | PASS (none) | Listed URL is already the canonical form |
| Deprecated tags | **INFO — present** | `<priority>1.0</priority>` and `<changefreq>monthly</changefreq>` are both ignored by Google. Harmless but can be removed to slim the file. |
| `lastmod` format | PASS | `2026-09-19`, valid W3C date (date-only form is allowed) |
| `lastmod` accuracy | **LOW finding** | Sitemap `lastmod` was just bumped to today (2026-09-19) alongside real content changes (new `Services.jsx`/`Faq.jsx` sections, reworked work-card images) — this is legitimate, *not* boilerplate-churn. However these changes are currently **uncommitted/undeployed** (`git status` shows modified `index.html`, `App.jsx`, `Header.jsx`, `MyWork.jsx`, `SelectedWork.jsx`, `index.css`, `sitemap.xml`). The live site's actual `Last-Modified` header is still **2026-09-12**. Make sure the deploy ships the same day the sitemap is pushed, or the `lastmod` will overstate freshness until deploy catches up. |
| All identical `lastmod` | N/A | Only 1 URL |
| Crawled pages vs sitemap coverage | PASS | Site has exactly one indexable document (the SPA shell); sitemap lists exactly that one URL. No missing pages. |
| Extra/orphaned sitemap entries | PASS | None |

## Canonical / duplicate-host finding (Medium, adjacent to sitemap correctness)
- `https://www.davidgeha.dev/` resolves with **HTTP 200** (not redirected) and serves identical content to the apex domain, but correctly self-declares `<link rel="canonical" href="https://davidgeha.dev/">`. This mitigates duplicate-content risk but is not a substitute for a real redirect.
- `http://davidgeha.dev/` correctly 308-redirects to `https://davidgeha.dev/`. 
- **Recommendation:** Add a 301/308 redirect from `www.davidgeha.dev` → `davidgeha.dev` at the Vercel/DNS level so there is only one servable host, matching the single URL declared in the sitemap.

## Location Page Quality Gates
- **Not applicable / no violation.** The site has 0 dedicated location pages — it is a single local-service business page targeting one market ("AI consultant Lebanon") via on-page content (`llms.txt`, hero copy, FAQ), not programmatic city pages.
- **Explicit warning against scaling this the wrong way:** given the SEO goal is "#1 for AI consultant Lebanon," the tempting-but-risky move is to spin up near-duplicate pages like `/ai-consultant-beirut`, `/ai-consultant-tripoli`, `/ai-consultant-jounieh` with only the city name swapped. That pattern trips Google's doorway-page/thin-content detection at even a handful of pages (WARNING gate starts at 30 pages, HARD STOP at 50, but a single-business site doesn't need volume to get penalized — 3-4 near-identical pages with no unique service area content already reads as manipulative). **Do not add location pages unless each one has genuinely unique content** (specific case study, specific client testimonial, specific service scope for that area) — otherwise keep Lebanon-wide targeting on the one canonical page.

## Missing Pages / Recommended URL Set
Given this is intentionally a single-page site, no *new sitemap URLs* are recommended at this time. If the site later adds real, non-doorway pages, add them to the sitemap in this priority order:
1. `https://davidgeha.dev/` (existing — homepage/hub, all services+FAQ+work sections)
2. *(only if built with real unique content)* a dedicated **case-study page per project** (e.g. `/work/lead-outreach-pipelines`, `/work/custom-crm-dashboards`) — these are "Safe at Scale" per the Integration/Product-page pattern, since each has genuinely distinct technical detail, not swapped keywords.
3. *(optional)* a standalone `/faq` or `/services` URL only if content is meaningfully expanded beyond what's already on the homepage — otherwise keep as anchor sections to avoid thin duplicate pages competing with the homepage for the same query.

## Recommended Cleanup (Info, non-blocking)
- Remove `<priority>` and `<changefreq>` tags — no ranking effect, and Google Search Console explicitly ignores them.
- Keep `lastmod` accurate: only bump it on commits that ship the same day (already true here, just confirm deploy timing).
