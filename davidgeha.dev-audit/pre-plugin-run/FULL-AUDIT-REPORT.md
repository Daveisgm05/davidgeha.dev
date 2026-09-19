# SEO Audit: davidgeha.dev

**Date:** 2026-09-19
**Method:** [claude-seo](https://github.com/AgriciDaniel/claude-seo) v2.3.1 scripts (render_page, parse_html, content_quality, agent_ux_check, preload_check, sitemap_discovery, domain_history, commoncrawl_graph, capture_screenshot) + local Lighthouse 13 + live SERP checks.
**Targets:** "AI consultant Lebanon", "AI consulting Lebanon", "AI solutions Lebanon"
**Business type detected:** Local professional service (solo consultant, Beirut, LB)

---

## Executive summary

| Metric | Before | After (this commit) |
|---|---|---|
| **SEO Health Score** | **41 / 100** | **68 / 100** (on-site only; off-site work still pending) |
| Indexed in Google (`site:davidgeha.dev`) | **No — 0 results** | Unchanged until GSC submission (see Action Plan #1) |
| Body word count (rendered) | 331 | 1,053 |
| H1 | "David Geha" | "David Geha — AI Consultant in Lebanon" |
| Keyword-bearing H2s | 1 ("AI consultant") | 4 |
| Visible FAQ matching FAQPage schema | None (schema/content mismatch) | 6 Q&As, 1:1 with schema |
| Schema types | Person, ProfessionalService, WebSite, FAQPage | + WebPage, OfferCatalog (4 Services), City Beirut, geo, email |
| Lighthouse mobile perf / a11y / BP / SEO | 85 / 100 / 100 / 100 (live CDN) | 97 / 96* / 100 / 100 (localhost, not CDN) |
| Render-blocking font CSS | 580 ms | eliminated (preload + swap) |
| Responsive images | none (1280w served at 634px) | 640w / 960w / 1280w srcset |
| Backlinks (Common Crawl web graph) | **domain not present** | unchanged — off-site |
| Sitemap | 1 URL, lastmod 2026-07-05 | 1 URL + 5 image entries, lastmod 2026-09-19 |

\* the a11y drop is Lighthouse catching hero elements mid-fade-in; colors are unchanged from the live site.

### The three things that actually decide whether you rank #1

1. **You are not indexed.** `site:davidgeha.dev` returns nothing and searching your own name + "AI consultant" does not surface the site. No on-page work matters until Google has the URL. This needs Google Search Console (your login) — see Action Plan.
2. **You had 331 words on one URL.** Every page ranking for your targets has 2,000–2,500 words (jonahtebaa.com, lbclouds.com) or is a directory (Clutch, TechBehemoths, Consultancy.org, The Manifest). This commit takes you to ~1,050 words with the right entities. A dedicated long-form page per query is the next step.
3. **You have zero backlinks.** The domain doesn't exist in the Common Crawl web graph. The directories that outrank you accept free listings — that is your fastest authority win.

---

## SERP landscape (live, 2026-09-19)

**"AI consultant Lebanon"** — Zfort (agency landing page), Consultancy.org (directory), Clutch.co (directory), Wikipedia bios, VerifyWise directory, TechBehemoths (directory), Eurisko.
**"AI consulting Lebanon"** — Zfort, Consultancy.org, consultancy-me.com news, Clutch, VerifyWise, TechBehemoths, **jonahtebaa.com/blog (individual practitioner, 2,500-word article)**, Webspot, The Manifest.
**"AI solutions Lebanon"** — SEIDOR, Clutch, Eurisko (×2, incl. a dedicated `/services/artificial-intelligence-ai-development-lebanon/` page), TechBehemoths, NavyBits, **LB Clouds `/services/ai-automation-lebanon/` (2,000 words, FAQ, pricing)**, Webspot.

What wins: (a) directories, (b) dedicated keyword-slugged service pages of ~2,000 words with an FAQ, (c) one individual who published a long-form "landscape" article naming himself as the answer. Your realistic lane is (b) + (c), plus being listed in (a).

---

## Findings by category

### Technical SEO — 82/100 (was 78)
**Works:** HTTPS + HSTS, Vercel CDN, 50 ms TTFB, www→apex 301, canonical set, robots.txt allows all major + AI crawlers, valid sitemap declared in robots, no redirect chains, no console errors, `lang="en"`, viewport OK, single canonical URL.
**Findings:**
- **High — Not indexed.** No GSC property detected (no verification tag, no crawl evidence). *Fix:* verify domain in GSC, submit sitemap, request indexing. *Falsifiable:* `site:davidgeha.dev` shows 1 result within 7 days.
- Medium — Site is a JS SPA (`is_spa: true`); Googlebot renders fine but AI crawlers and Bing are less reliable. *Mitigated* by the expanded `<noscript>` fallback and llms.txt. *Long-term:* prerender to static HTML at build (e.g. `vite-plugin-prerender` or a Playwright post-build step).
- Medium — No IndexNow key. *Fixed:* key file `public/c7c27eae54684c15c350b92dc7577bcb.txt` added; submit after deploy (command in Action Plan).
- Low — No `speculationrules`; irrelevant for a single-page site.
- Low — `x-vercel-cache: HIT` with `age: 613867` (7 days) — Vercel serves stale HTML until redeploy; fine, just redeploy after content changes.

### Content quality / E-E-A-T — 55/100 (was 30)
**Works:** claude-seo `content_quality.py`: filler 0, AI-pattern 0, information density 1.0, overall 96. Voice is specific and first-person. Real client categories (agencies, F&B) and real stack.
**Findings:**
- **Critical (was) — Thin content: 331 words.** *Fixed to 1,053* via Services (4 answer blocks) + FAQ (6) + hero subtitle.
- **High (was) — FAQPage schema with no visible FAQ.** Google's structured-data policy requires marked-up content be visible. *Fixed:* `src/content/faq.js` is the single source; JSON-LD mirrors it.
- High — No proof/experience signals: no client names, numbers, testimonials, screenshots with captions, or dated case studies. *Next:* one case study per "Recent Build" with a metric ("saved 11 h/week", "412 leads sourced in 30 days").
- Medium — No author bio page / about depth beyond one paragraph; no photo alt naming you. *Next:* `/about` with education, timeline, the AUB angle, and a headshot with alt="David Geha, AI consultant in Beirut".
- Medium — Only English. Lebanese searchers also query in French ("consultant IA Liban") and Arabic. *Later:* hreflang'd FR page once the EN page ranks.

### On-page SEO — 80/100 (was 45)
- **High (was) — H1 lacked the keyword** ("David Geha"). *Fixed:* visible name + sr-only " — AI Consultant in Lebanon"; hero H2 now "AI consultant in Lebanon".
- Title *updated* → "AI Consultant in Lebanon | AI Consulting & AI Solutions - David Geha" (64 chars; covers all three targets).
- Meta description *updated* to name all three service phrases + Beirut.
- Image alts *updated* to descriptive form; `width`/`height`/`decoding=async` added.
- Medium — All three targets point at one URL. Google can rank one page for "consultant" + "consulting" (same intent) but "AI solutions Lebanon" is a distinct intent. *Next:* dedicated pages (see Action Plan #4).
- Low — `<meta keywords>` retained; ignored by Google, harmless.

### Schema / structured data — 90/100 (was 70)
**Works:** valid JSON-LD, `@id` graph, Person↔ProfessionalService linked.
- *Added:* `WebPage` (dateModified, primaryImageOfPage), `hasOfferCatalog` with 4 `Service` items, `areaServed` Country + **City Beirut** with Wikidata `sameAs`, `geo`, `email`, `priceRange`, `availableLanguage`, `alternateName`, `knowsLanguage`, AUB `sameAs`.
- Note: FAQPage no longer produces Google rich results (May 2026) — kept because it is still consumed by Bing, AI assistants, and it's now honest (visible).
- Low — Consider `ProfilePage` if you add an `/about` route.

### Performance (CWV) — 88/100 (was 80)
Lab (mobile, simulated): FCP 2.3 s → 1.5 s, LCP 2.4 s → 2.3 s, TBT 280 → 30 ms, CLS 0.005. No field (CrUX) data — the site has too little traffic to have any yet.
- *Fixed:* Google Fonts CSS render-blocking (preload/onload swap).
- *Fixed:* images now `srcset` 640/960/1280 (−190 KiB on mobile).
- Medium — 46 KiB unused JS in the main bundle (GSAP + Lenis). *Later:* dynamic-import Lenis/GSAP after first paint.
- LCP element is the hero name text; TTFB dominates. Nothing to preload.

### AI search readiness (GEO) — 70/100 (was 50)
- **agent_ux_check: 100/100** — semantic landmarks, real anchors, named interactive nodes.
- robots.txt already whitelists GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended.
- *Fixed:* answer-shaped blocks (each service ≈ 60–75 words, each FAQ ≈ 50–80 words) — the citability shape claude-seo scores for.
- *Updated:* llms.txt with services + FAQ.
- High — Entity presence: no Wikipedia/Reddit/YouTube/LinkedIn-article footprint; your name collides with a TV producer of the same name. *Next:* LinkedIn "AI consultant in Lebanon" headline + 2 articles, a Reddit r/lebanon answer, a Clutch profile — all pointing at davidgeha.dev.

### Local SEO — 25/100 (unchanged; off-site)
- **Critical — No Google Business Profile.** For "AI consultant Lebanon" Google shows a local pack for many searchers in LB. A GBP (category: "Business management consultant" or "Consultant", service area: Lebanon) is the single biggest local lever and it's free.
- High — NAP: no phone number on site or schema. Add one (even a WhatsApp Business number) to schema `telephone` and footer.
- High — Citations: not on Clutch, GoodFirms, TechBehemoths, The Manifest, Consultancy.org, LinkedIn Services, Bayt, or Lebanese directories (Yellow Pages Lebanon, Lebanon Business Directory).

### Backlinks / authority — 5/100 (unchanged; off-site)
- Domain absent from Common Crawl host graph (cc-main-2026-jan-feb-mar). Moz/Ahrefs/Bing checks need keys (see below).
- Zero referring domains is the norm for a two-month-old site; the directories above fix it fastest.

---

## Scoring (claude-seo weights)

| Category | Weight | Before | After |
|---|---|---|---|
| Technical | 22% | 78 | 82 |
| Content | 23% | 30 | 55 |
| On-page | 20% | 45 | 80 |
| Schema | 10% | 70 | 90 |
| Performance | 10% | 80 | 88 |
| AI readiness | 10% | 50 | 70 |
| Images | 5% | 60 | 90 |
| **Weighted** | | **≈ 41** *(with indexing/local/backlinks pulling reality lower)* | **≈ 68** |

---

## Checks that could NOT run (need your keys / logins)

| Check | Why it didn't run | What you give me |
|---|---|---|
| PageSpeed Insights + CrUX field data | anonymous PSI quota exhausted ("240 QPM / 25,000 QPD") | Google Cloud API key with PageSpeed Insights API + Chrome UX Report API enabled |
| Google Search Console (index status, URL inspection, queries, sitemap submit) | needs OAuth / service account | GSC OAuth client JSON or a service account added to the property — **and you must first verify davidgeha.dev in GSC yourself** |
| Google Indexing API | same credentials as GSC | same |
| GA4 organic traffic | no property configured | GA4 property ID + same service account |
| Keyword Planner volumes for the 3 targets | needs Google Ads developer token | Ads developer token + customer ID (Tier 3) |
| Bing Webmaster (index + submit) | needs API key | Bing Webmaster API key |
| IndexNow submission | key is ready but the key file isn't live yet | nothing — just deploy, then run the command in the Action Plan |
| Moz DA/PA, backlinks | needs Moz token | Moz API access ID + secret |
| Ahrefs / SE Ranking / Profound / DataForSEO extensions | MCP extensions, each needs a key | respective API keys (optional; DataForSEO is the most useful for live LB SERP positions) |
| PDF report (`google_report.py`) | needs WeasyPrint system libs (pango/cairo) | `brew install pango` then I can render it |
| Full-site crawl (500 pages) | site has 1 URL | n/a |
