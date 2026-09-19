# Technical SEO Findings — davidgeha.dev

Audit date: 2026-09-19
Method: source inspection (raw fetch vs. Playwright-rendered), sitemap_discovery.py, preload_check.py, agent_ux_check.py, live curl checks (headers, redirects, robots.txt, sitemap.xml, asset sizes). PageSpeed API not available (no key) — CWV assessed from source only, not lab/field data.

## Technical Score: 68 / 100

Solid schema/meta/crawlability foundation, but a real content-parity gap for non-JS crawlers, an undeployed IndexNow key, and a few CWV/security gaps pull the score down.

---

## 1. Crawlability — PASS
- `robots.txt` (https://davidgeha.dev/robots.txt): `Allow: /` for all UAs, plus explicit allow rules for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended. This is exactly the right GEO posture for an AI-consultant business.
- `Sitemap:` directive present and correct.
- `sitemap_discovery.py` confirms: declared in robots.txt, fetched at `https://davidgeha.dev/sitemap.xml`, status 200, valid `urlset`, 1 URL (homepage only — correct for a single-page site). No stale/broken sitemap references found.
- No `noindex` anywhere; `meta name="robots"` = `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` — good, maximizes AI-snippet/preview eligibility.

## 2. Indexability — MEDIUM ISSUES
- Canonical tag present and self-referencing (`https://davidgeha.dev/`) on both the apex and the `www` host — good, this is the correct fallback.
- **Issue (Medium): `www.davidgeha.dev` resolves and serves 200 instead of 301/308 redirecting to the apex.** `http://davidgeha.dev` correctly 308s to `https://davidgeha.dev/`, but `https://www.davidgeha.dev/` does not redirect — it serves the full page with a canonical pointing back to the apex. Canonical tags mitigate this for Google, but it's an avoidable duplicate crawlable URL, wastes crawl budget, and some AI crawlers / secondary search engines are less reliable about honoring canonicals. **Fix: add a Vercel redirect (apex ⟷ www consolidation) so www 308s to the apex.**
- **Issue (Critical): FAQPage structured data has no matching visible content on the live site.** The homepage `<script type="application/ld+json">` includes a full `FAQPage` block (4 Q&As: "What does an AI consultant in Lebanon do?", etc.), but the live rendered DOM has no visible FAQ section — the questions/answers exist only inside the JSON-LD, not as on-page text. Google's structured-data guidelines require FAQ markup to reflect visible page content; a mismatch risks the rich result being ignored or, in stricter cases, a manual action. It also means LLM/AI crawlers extracting visible text (many don't parse embedded JSON-LD as prose) miss this Q&A content entirely.
  - **Root cause identified in repo:** `david-portfolio/src/components/Faq.jsx` and `Faq.css` exist locally and are wired into `App.jsx` (uncommitted/untracked per git status), but the version currently live on davidgeha.dev does not render a visible FAQ section (confirmed: rendered DOM has only `work`, `about`, and `services`(id)/"Recent Builds" sections — no FAQ heading or answer text). **Action: deploy the pending Faq component** so the visible DOM matches the JSON-LD, and this issue resolves itself.
  - Similarly, `Services.jsx`/`Services.css` are new/untracked locally; the section currently living at `id="services"` in production is actually the "Recent Builds" work-card list, not a dedicated services section. Confirm intent before deploy so `id="services"` anchor semantics stay consistent with nav (if any).

## 3. Security — LOW/MEDIUM
- HTTPS enforced site-wide; HTTP → HTTPS redirect confirmed (308, `Strict-Transport-Security: max-age=63072000`).
- **Missing security headers (Low-Medium):** No `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, or `Permissions-Policy` observed on the document response (Vercel defaults don't add these). Not an SEO ranking factor directly, but worth hardening — add via `vercel.json` headers config. Low priority relative to content/indexing issues, but cheap to fix.
- `Access-Control-Allow-Origin: *` is present on the HTML document itself — unusual but harmless for a static marketing page.

## 4. URL Structure — MOSTLY PASS
- Single clean URL (`/`), no query params, no redirect chains beyond the one intentional http→https 308.
- www duplicate issue noted above (Section 2) is really a URL-structure/redirect gap as much as an indexability one.

## 5. Mobile-Friendliness — PASS
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` present.
- Responsive breakpoints (`@media`) present in Header.css, SelectedWork.css, MyWork.css (3 each), plus Services/Marquee/Contact/Faq/About/Reveal CSS (1 each) — reasonable component-level responsive coverage.
- No blocking viewport/zoom-disabling meta, no fixed-width layout containers detected in source.

## 6. Core Web Vitals (source-inspection only, no PSI/CrUX available) — NEEDS IMPROVEMENT
- **LCP risk (Medium-High): work/preview images have no `width`/`height` attributes** and no `fetchpriority="high"` on the presumed LCP candidate. `preload_check.py` confirms: `preload_lcp_candidate: false`, `fetchpriority_high: 0`, `preload_hints: 0`. Recommend: add explicit `width`/`height` (or `aspect-ratio` CSS) to all `<img>` tags, and `fetchpriority="high"` + `<link rel="preload">` for whichever image/asset paints first (hero portrait canvas draws via JS — if a static image is the actual LCP element instead, prioritize that).
- **CLS risk (Medium): missing intrinsic dimensions on all 8 `<img>` tags** (`work-outreach-v2.webp`, `work-research-v2.webp`, `work-ads-v2.webp`, `work-crm-v3.webp`, each used twice — mobile thumb + preview stack). Without `width`/`height` or CSS `aspect-ratio`, these will shift layout as they load, especially on slower mobile connections.
- **Opportunity already in progress:** `david-portfolio/public/` has new `-640.webp`/`-960.webp` responsive image variants (work-ads-v2, work-crm-v3, work-outreach-v2, work-research-v2) sitting untracked/unused — the live site still serves single-size `.webp` files (43–85KB each) with no `srcset`/`sizes`. Wiring these into `<img srcset>` will materially help LCP on mobile once deployed.
- **JS payload (Low-Medium):** main bundle `index-BE7mlwOu.js` is 304KB uncompressed (brotli-compressed in transit — good, `content-encoding: br` confirmed), CSS bundle 19.9KB. Not alarming for a React SPA but worth code-splitting if it grows; the hero canvas portrait + entrance animations (GSAP-style inline transform styles visible in rendered HTML) add JS execution cost before content is interactive.
- Hero content is animated in via JS (elements start with `opacity: 0; visibility: hidden;` inline styles, transformed on load) — this is a common INP/perceived-performance risk if the animation library blocks the main thread on lower-end mobile devices. Source inspection can't measure actual INP; flagging as a watch item.
- `preload_check.py` score: 50/100. Recommendations returned: add `<script type="speculationrules">` for prefetch/prerender on top navigation paths (low value for a single-page site, skip), and mark the LCP image `fetchpriority="high"` (actionable, do this).

## 7. Structured Data — PASS (with the caveat in Section 2)
- Valid JSON-LD `@graph` with `Person`, `ProfessionalService`, `WebSite`, `FAQPage` types — well-suited to local/solo-consultant SEO and AI-answer eligibility (geo targeting via `geo.region`, `geo.placename`, `areaServed: Lebanon` is a nice touch for "AI consultant Lebanon" targeting).
- Structured data is present in the **raw, unrendered HTML** (confirmed via `raw_content` vs `content` diff) — this is correctly crawlable by engines/bots that don't execute JavaScript, including the AI crawlers explicitly allow-listed in robots.txt. This is the single most important thing this site gets right for GEO.
- Only issue: FAQPage content not mirrored in visible DOM (see Section 2, Critical).

## 8. JavaScript Rendering — HIGH PRIORITY ISSUE
- `render_page.py --mode auto` detected `is_spa: true` and had to spin up Playwright — confirms this is a client-rendered React/Vite SPA (`<div id="root"></div>` is empty in the raw HTML fetch).
- **The `<noscript>` fallback is thin relative to the full page.** It contains only an H1, one descriptive paragraph, and a mailto contact link — it omits the About/process section, the 4 selected-work case studies, the 6 "Recent Builds" entries, and (once deployed) the FAQ answers. For crawlers/agents that fetch but don't render JS — which includes most of the AI crawlers this site's robots.txt explicitly welcomes (GPTBot, PerplexityBot, ClaudeBot behavior varies by product and changes over time; many LLM-facing fetchers do not execute JS) — the noscript block plus the static JSON-LD is *all* they see. The JSON-LD covers structured facts well, but prose detail (the work-list descriptions, the process steps, the "Recent Builds" project write-ups) is only available after JS execution.
- **Recommendation:** expand the `<noscript>` block to include the key differentiator content already used elsewhere (About paragraph, process steps, the 4 work-row titles/descriptions, and — once live — the FAQ Q&As), or move toward SSR/prerendering (e.g., `vite-plugin-ssr`, prerendering to static HTML at build time via `vite-plugin-prerender`/Vercel's static export) so the full content is present without requiring JS execution at all. Given this is a single static page with no dynamic data, prerendering to fully static HTML is low-effort and would resolve this, the FAQ mismatch, and most of the CWV/LCP concerns simultaneously.
- No console errors, no render diagnostics flagged, render completed in ~3.9s via `playwright-chromium` — rendering itself is not broken, it's a content-parity/strategy issue for non-rendering consumers.

## 9. IndexNow Protocol — HIGH PRIORITY, ACTION PENDING
- **IndexNow key file is not live: `https://davidgeha.dev/c7c27eae54684c15c350b92dc7577bcb.txt` returns 404.** The key file exists locally at `david-portfolio/public/c7c27eae54684c15c350b92dc7577bcb.txt` (untracked in git per repo status) but has not been deployed. This matches the standing memory note ("IndexNow key, keys still needed").
- **Action needed:** commit and deploy the key file so it resolves at the site root, then submit the homepage URL via the IndexNow API (Bing/Yandex/Naver share the protocol) — `indexnow_submit.py` in this plugin can do the submission once the key file is confirmed live. Until the key file 200s, any IndexNow submission will fail key verification.

---

## Prioritized Issues

**Critical**
1. FAQPage JSON-LD has no matching visible on-page content — deploy the pending `Faq.jsx` component (already built locally, just not shipped) so structured data reflects visible text and Google's FAQ rich-result eligibility isn't at risk.

**High**
2. Thin `<noscript>` fallback vs. full SPA content — non-JS-rendering AI crawlers only see a fraction of the page's substance. Expand noscript content or move to prerendered/SSR static HTML (recommended given this is a static single-pager).
3. IndexNow key file returns 404 in production — deploy `c7c27eae54684c15c350b92dc7577bcb.txt` to the site root and submit via IndexNow before relying on it for fast Bing/Yandex/Naver indexing.
4. Missing `width`/`height` (or `aspect-ratio`) on all 8 `<img>` tags — real CLS risk; also no `fetchpriority="high"` on the LCP candidate (`preload_check.py` score 50/100).

**Medium**
5. `www.davidgeha.dev` serves 200 instead of redirecting to the apex (canonical tag mitigates but doesn't eliminate the duplicate-URL/crawl-budget issue) — add a Vercel redirect rule.
6. New responsive image variants (`-640.webp`/`-960.webp`) exist in `public/` but aren't wired into `srcset` yet — finish that work to cut mobile image payload.
7. `Services.jsx`/`Services.css` added locally but not reflected as a distinct section in production (current `id="services"` anchor holds the "Recent Builds" list) — confirm intended IA before deploying so anchors/nav stay consistent.

**Low**
8. Missing `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` headers — add via `vercel.json` for defense-in-depth (not a ranking factor, but cheap hygiene).
9. `preload_check.py` also suggests `<script type="speculationrules">` for prefetch/prerender — low value for a single-page site with no internal navigation, safe to skip.

## What's Working Well
- robots.txt explicitly allow-lists all major AI/GEO crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, etc.) — best-practice posture for the site's AI-consultant positioning.
- Sitemap valid, correctly declared, appropriately scoped to the single real URL.
- Canonical tags correct and self-referencing on both apex and www.
- Rich, well-targeted JSON-LD (`Person` + `ProfessionalService` + `WebSite` + `FAQPage`) with Lebanon geo-targeting (`geo.region`, `areaServed`), served statically in raw HTML — crawlable without JS execution.
- HTTPS/HSTS correctly enforced, http→https redirect clean (single hop, 308).
- Meta robots, Open Graph, and Twitter Card tags all complete and consistent.
- `llms.txt` present at `/llms.txt` with a clear, well-structured summary of services/stack/process/contact — good practice for LLM-based discovery.
- Responsive CSS breakpoints present across all major components; correct mobile viewport meta.
- `agent_ux_check.py` returned a perfect 100/100 — no div-as-button anti-patterns, no unlabeled inputs, 18 semantic landmarks, all interactive elements properly named in the accessibility tree.
