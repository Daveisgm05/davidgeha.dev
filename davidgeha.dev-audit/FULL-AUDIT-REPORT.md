# Full SEO Audit: davidgeha.dev

**Date:** 2026-09-19
**Tool:** claude-seo v2.3.1 (`/seo audit`), 10 specialist agents run in parallel + orchestrator synthesis
**Target queries:** "AI consultant Lebanon" · "AI consulting Lebanon" · "AI solutions Lebanon"
**Business type detected:** Local service-area business (SAB) — solo AI consultant, Beirut, Lebanon; professional services vertical
**Pages crawled:** 1 (single-URL React/Vite SPA; all internal links are fragments)
**Specialists run:** technical, content, schema, sitemap, performance, visual, geo, sxo, local, backlinks (Tier 0 → re-run at Tier 2), google, cluster
**Skipped at run time, completed afterwards:** google (PSI 88/96 with key; GSC verified later the same day — see corrected finding #1), maps (no DataForSEO), cluster (no content hub), drift (baseline captured today, no prior), ecommerce (n/a)

---

## Executive summary

### SEO Health Score

| | Live site (deployed 2026-09-12) | Working tree (uncommitted, verified in local build) |
|---|---|---|
| **Health Score** | **56 / 100** | **74 / 100** |

The 18-point gap is entirely work already sitting in `git status` — deploying is the single highest-leverage action.

Off-site dimensions the health score does *not* weight, reported separately because they are what actually decides #1:

| Dimension | Score | One-line |
|---|---|---|
| Local SEO | **16 / 100** | No Google Business Profile, no phone, zero citations |
| Backlinks | **Not assessable** (Tier 0) | Domain absent from Common Crawl graph; zero known links. Niche is open: only zfort.com and eurisko.net register at all |
| SXO (search experience) | **43 / 100**, ceiling ≈ 60 for one URL | Page type is "portfolio landing"; SERPs reward directories + 650–2,500-word service pages |
| GEO (AI answers) | **40 / 100** | "David Geha" on the open web = the *Extra* TV producer; nothing corroborates the AI-consultant entity |

### Top 5 critical issues

1. **Indexed but invisible** — *(corrected after GSC verification, 2026-09-19)*: URL Inspection says "Submitted and indexed", last crawl 2026-09-09, canonical OK — but Search Analytics shows **0 impressions and 0 clicks across 90 days** for any query. The earlier "not indexed" call came from a non-Google `site:` probe and was wrong. The problem is authority/relevance, not crawlability. Google has one referring URL on record: `ultraenvirotech.com/solutions/gentoo`.
2. **Entity collision with zero corroboration** — no directory, profile, or article on the web asserts "David Geha = AI consultant in Beirut". LLMs and Google will keep resolving the name to the producer.
3. **Wrong page type for the SERPs** — a 205-word portfolio hero cannot outrank 2,000-word priced service pages and directories. Even fully optimized, one URL caps around 60/100 SXO.
4. **No Google Business Profile / NAP** — local pack eligibility is zero; no phone anywhere on site or in schema.
5. **Live FAQPage schema with no visible FAQ** — structured-data policy violation on the deployed site (fixed in working tree).

### Top 5 quick wins

1. **Deploy the working tree** — +18 health points, fixes the FAQ policy issue, ships 726 words of noscript content, IndexNow key, security headers, 1.2 MB lighter hero.
2. **Verify in GSC → submit sitemap → request indexing**; add `jaris-agent@jarvis-project-495313.iam.gserviceaccount.com` as a user so the plugin can read GSC data next run.
3. **Create GBP** as a service-area business (name exactly `David Geha - AI Consultant`, category Business management consultant, area = Lebanon).
4. **Fill your own profiles** — GitHub bio/location/website (currently empty), LinkedIn headline + website, Instagram bio → all pointing at davidgeha.dev; add each to `Person.sameAs`.
5. **Fix the www duplicate host** — `www.davidgeha.dev` serves 200; the `vercel.json` redirect isn't applied in production. Set the project-level domain redirect in Vercel (www → apex, 308).

---

## Live SERP landscape (from `seo-sxo`)

| Keyword | Directory | Service / agency page | Article | Person entity (Wikipedia) | Dominant type |
|---|---|---|---|---|---|
| AI consultant Lebanon | 44% | 22% | 0 | 33% | Directory + entity |
| AI consulting Lebanon | 56% | 22% | 22% (incl. jonahtebaa.com solo practitioner) | 0 | Directory |
| AI solutions Lebanon | 33% | 67% (eurisko ×2, seidor, navybits, lbclouds, webspot) | 0 | 0 | Service page |
| AI automation consultant Beirut | 33% | 56% (two solo practitioners: aliawdeh.com, tarekrjeily.com) | 11% | 0 | Service page |

Ranking non-directory pages share: 650–2,500 words, **priced offers** (lbclouds $2k–$25k+; tarekrjeily $1,500 audit / $4,500 sprint / $800 mo), 4–9 FAQs (cost, timeline, do I need tech staff, data safety, Arabic support), 3–5 step process, industries list, WhatsApp/booking CTA. Persona scoring: Trust is the lowest dimension for every persona (avg 6.4/25); the highest-SERP-weight persona ("vendor shortlister") scores 26/100.

---

## Findings by category

### Technical SEO — 68 (live) → ~80 (working tree)  ·  weight 22%
**Works:** HTTPS + HSTS, 50–56 ms TTFB, http→https 308, self-referencing canonical on both hosts, robots.txt allow-lists every major AI crawler, valid sitemap declared in robots, `agent_ux_check` 100/100, no console errors.
- **Critical (live):** FAQPage JSON-LD with no visible FAQ. *Fixed in tree* (`Faq.jsx` + `content/faq.js`, JSON-LD generated from it).
- **High:** SPA — raw HTML shows 46 words to non-JS crawlers. *Fixed in tree:* `scripts/sync-static.mjs` (prebuild) mirrors Services + FAQ into `<noscript>` → 726 words. *Still recommended:* true prerender/SSG once the intro choreography is adapted.
- **High:** IndexNow key 404 in production. *Fixed in tree* (`public/c7c27eae…txt`); submit after deploy.
- **High:** images lacked width/height; no LCP hint. *Fixed in tree* (dimensions + srcset); LCP element is text, no preload needed.
- **Medium:** `www.davidgeha.dev` 200 instead of redirect (verified, cache-busted). Both domains attached to project `david-portfolio`; the `vercel.json` host rule isn't effective. **Fix:** Vercel → Settings → Domains → www → "Redirect to davidgeha.dev" (308). *Needs your approval; not changed.*
- **Low:** missing security headers. *Fixed in tree* (`vercel.json`: nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy). CSP deliberately omitted.
- **Note:** nameservers are at the registrar (not Vercel DNS) — GSC DNS verification happens there.

### Content Quality — 42 (live) → ~58 (working tree)  ·  weight 23%
E-E-A-T (live): Experience 50 · Expertise 40 · Authoritativeness 25 · Trustworthiness 50.
**Works:** `content_quality.py` filler 0, AI-pattern 0, density 0.71; honest first-person bio; dated builds timeline; `metadata_template.py` risk low.
- **High:** 205 words main copy (rendered 359; raw 46) vs 2,000+ competitors. Working tree → ~960; still under the competitive floor for a single URL.
- **High:** target phrases absent from live visible copy ("AI consulting" 0, "AI solutions" 0, "Beirut" 0). *Fixed in tree* (Services H2 "AI consulting & AI solutions in Lebanon", FAQ H2, hero H2 "AI consultant in Lebanon").
- **Medium:** zero proof — no metrics, testimonials, client names, dates. Pending copy *promises* "hours saved" but never shows one. → one anonymised metric + 2–3 sentence case study per build.
- **Medium:** readability FRE 33 / grade 11.7 live; pending copy FRE 55 / grade 9.2 but 11 sentences > 25 words.
- **Medium:** no visible contact block (email/phone/city); `osgdev.com` email domain vs `davidgeha.dev` unexplained.
- **Low:** `<meta keywords>` (ignored); marquee clone triggers a harmless "repetitive" flag.

### On-Page SEO — 45 (live) → ~78 (working tree)  ·  weight 20%
- **High (live):** rendered H1 is the wordmark "DavidGeha"; descriptive H1 only in noscript. *Fixed in tree:* H1 = name + sr-only " — AI Consultant in Lebanon".
- Title/meta *updated in tree* to cover all three targets (64 chars).
- **Medium:** nav `#services` anchor landed on "Recent Builds" (live). *Fixed in tree* (`#builds`; new `#services` section).
- **Medium:** three intents on one URL — "AI solutions Lebanon" is a catalog intent, distinct from "consultant". → dedicated pages (Phase 3).
- **Low:** image alts were bare titles. *Fixed in tree.*

### Schema / Structured Data — 76 (live) → ~90 (working tree)  ·  weight 10%
**Works:** valid JSON-LD `@graph`, server-rendered in raw HTML, Person↔ProfessionalService↔WebSite linked by `@id`, no deprecated types.
- *Added in tree:* `WebPage` (dateModified), `hasOfferCatalog` (4 Services, titles match `Services.jsx` verbatim), `areaServed` Country + City Beirut (Wikidata), `geo` (5-decimal), `email` (plain, `mailto:` removed per agent), `priceRange`, `availableLanguage`, `disambiguatingDescription` ("not the American television producer"), clean NAP `name` = `David Geha - AI Consultant` with keyword variants in `alternateName`.
- **Info:** FAQPage produces no Google rich result since 2026-05-07; kept (now visible-content-honest) for Bing/AI consumers.
- **Not recommended:** `telephone` fabricated (add when you publish a real number), `ProfilePage` (needs follower metrics), `openingHoursSpecification` (remote-first).

### Performance (CWV) — 79 mobile / 95 desktop (pre-deploy) → **88 mobile / 96 desktop (PageSpeed Insights, post-deploy 2026-09-19)**  ·  weight 10%
Pre-deploy lab (Lighthouse 13.5): LCP 3.6 s mobile / 0.9 s desktop · TBT 0 ms · CLS 0 / 0.013. **Post-deploy PSI (Google, with API key):** mobile perf 88 · a11y 100 · BP 100 · SEO 100 — LCP 2.9 s, TBT 0 ms, CLS 0, SI 4.5 s; desktop perf 96 — LCP 0.8 s, CLS 0.001. TTFB 53–56 ms. **CrUX field data: none yet** — origin below Chrome traffic eligibility threshold (checked via CrUX API + CrUX History with the key); will populate once real traffic arrives.
- **Critical (UX/perceived):** intro curtain is 2,450 ms on *every* visit (4,500 ms fallback); trace frames show real content at 3,722 ms mobile. *Not changed — design decision.* Low-risk option: gate to once per session (`sessionStorage`) and/or shorten.
- **High:** 1.43 MB `david_transparent.png` = 74% of page weight. *Fixed in tree:* WebP q92 (205 KB), verified rendering in WebGL; PNG removed. Page ≈ 1.94 MB → ≈ 0.7 MB.
- **High:** Google Fonts 3-hop chain still ~1.8 s render-blocking on mobile despite the preload swap. → self-host Inter 400/500 + Playfair 400/italic with `<link rel=preload as=font>`; also removes the 0.013 CLS.
- **Medium:** srcset was selecting 1280w on mobile. *Fixed in tree:* `sizes="(max-width: 768px) calc(100vw - 48px), 640px"`.
- **Medium:** 48.5 KB unused JS. → dynamic-import `HeroPortrait` WebGL + below-fold sections.

### Images — 55 (live) → ~90 (working tree)  ·  weight 5%
WebP already; lazy loading. *Fixed in tree:* 640/960/1280 variants + srcset + dimensions + descriptive alts; hero PNG → WebP. *Remaining:* fonts CLS (above), OG image is a JPG (fine).

### AI Search Readiness (GEO) — 40 (live) → ~55 (working tree)  ·  weight 10%
Citability 30 · Structure 45 · Multi-modal 40 · Authority 30 · Technical 55. Platform: Google AIO 45 · ChatGPT 30 · Perplexity 25 · Copilot 35.
**Works:** robots.txt open to all answer engines (Claude-SearchBot now explicit), llms.txt present (kept as zero-cost hedge; not a ranking lever), entity-named noscript, interlinked JSON-LD.
- **Critical:** entity collision + zero corroboration (Brave/Bing/YouTube for "David Geha" + "AI"/"Lebanon" = 100% the producer; GitHub profile has no bio/site).
- **High:** zero question-based headings live; zero 134–167-word passages; About is first-person "I'm David", no surname. *Partially fixed in tree* (FAQ questions as H3s; service blocks 60–75 words). → make the About paragraph third-person, entity + location first.
- **Medium:** no proof points/dates. → dated "Updated" line, `dateModified` (added), case-study metrics.
- **Recommendation with highest AI-citation correlation:** 3–5 YouTube walkthroughs titled with name + "AI consultant Lebanon" — that name on YouTube is currently 100% the producer.

### Local SEO — 16 / 100 (unweighted; off-site)
GBP 0 · Reviews 5 · Local on-page 45 · NAP/citations 10 · Local schema 35→~70 · Local links 5. SAB pattern correctly signalled; `ProfessionalService` is the right type; `gbp_deprecation_lint` clean.
- **Critical:** no GBP; no phone/WhatsApp anywhere; zero citations on any Tier-1 or industry directory.
- **High:** business name was inconsistent between live and pending schema. *Fixed in tree* → lock to `David Geha - AI Consultant` everywhere before the first listing.
- **Medium:** no `openingHoursSpecification`; no testimonials.
- **Forward risk:** once reviews start, keep cadence ≤ 18 days (velocity cliff).

### Backlinks — Tier 2 after Moz/Bing keys (unweighted; off-site)
**Update 2026-09-19 (Moz):** DA 9 · PA 27 · spam 4 · **57 linking root domains / 124 links** — but the top 50 are a purchased-looking PBN set (casino, pharma, fake-news brands; each exactly 2–4 links; avg spam 8.4). Domain registered 2026-02-10; links built while parked. Google's own inspection lists only 2 referring URLs, so Google is likely discounting them. Draft disavow prepared at `disavow-draft.txt` — upload only after confirming origin and checking GSC Manual Actions. Details: `findings/backlinks-moz-2026-09-19.md`.

*Original Tier-0 findings:*
`validate_backlink_report.py`: PASS. Common Crawl `cc-main-2026-jan-feb-mar`:

| Domain | In crawl | PageRank rank | Harmonic rank | n_hosts |
|---|---|---|---|---|
| davidgeha.dev | no | — | — | — |
| zfort.com | yes | 423,479 | 580,843 | 2 |
| eurisko.net | yes | 1,086,664 | 3,362,389 | 3 |
| webspot.me / lbclouds.com / jonahtebaa.com | no | — | — | — |

No incumbent is deeply linked; a handful of relevant links moves you into the top tier of this niche. A free Moz key unlocks 4 of 5 currently-unscoreable factors.

### Visual / above-the-fold — 80 / 100
Desktop fold is correct (H1, eyebrow, H2, subtitle, both CTAs visible at 1920×1080). Contrast passes AA. No horizontal scroll.
- **High:** mobile hero CTA "Let's collaborate" starts at y=824 on an 812-px viewport — 100% below the fold.
- **High:** no mobile/tablet nav at all (`.nav__links{display:none}` ≤1024 px, no hamburger).
- **Medium:** mobile value-prop text sits in the last ~150 px of the viewport.
- **Low:** nav "Let's talk" pill is 43 px tall (target ≥ 44–48).

### Sitemap — 90 / 100
Valid, declared, 1 URL + image entries, all 200. `priority`/`changefreq` ignored by Google (harmless). Location-page gates not violated — and the agent explicitly warns **against** city-swapped doorway pages; only build pages with genuinely distinct content.

---

## Changes made in the working tree during this audit (not committed)

Earlier batch: Services + FAQ sections, keyword H1/H2s, title/meta, OfferCatalog schema, srcset images, non-blocking fonts, sitemap/llms.txt, IndexNow key.
This run: schema `email` cleanup · clean NAP name + `alternateName` · 5-decimal geo (schema + meta) · `disambiguatingDescription` · `Claude-SearchBot` in robots.txt · security headers in `vercel.json` · `scripts/sync-static.mjs` as `prebuild` (FAQ JSON-LD + 726-word noscript generated from `src/content/*.js`) · services copy moved to `src/content/services.js` · hero portrait PNG → WebP (−1.2 MB) · tighter `sizes`.
Build verified: `npm run build` OK, JSON-LD valid, 5 graph nodes, FAQ 6/6 parity, portrait renders in WebGL, no console errors.

## Blocked checks (need you)

| Check | Blocker | Unblock |
|---|---|---|
| ~~GSC~~ | **unblocked 2026-09-19** — `sc-domain:davidgeha.dev` verified, service account has Full access | inspection + analytics ran; sitemap submitted via API |
| ~~PageSpeed Insights + CrUX~~ | **unblocked 2026-09-19** — key in `~/.config/claude-seo/google-api.json` | PSI ran (88/96); CrUX has no data until the site has Chrome traffic |
| GA4 organic | no property | GA4 property ID |
| Keyword volumes | no Ads token | Google Ads developer token |
| Moz DA / referring domains | no key | free Moz API key |
| Bing Webmaster | no key | Bing Webmaster API key (after Bing verification — import from GSC) |
| DataForSEO (live LB SERPs, maps grid, AI visibility) | extension not installed | DataForSEO login + `/seo dataforseo setup` |
| Google NL entity analysis | NL API needs billing on the project | optional; low value for a 1-page site |
| IndexNow submit | key file not live | deploy, then run the command in ACTION-PLAN |
| www → apex redirect | production config change | approve, or set it in Vercel → Domains |
| PDF report | see below | — |

## Artifacts

- `findings/*.md` — 10 specialist reports (+ `content.json`, `performance.json`)
- `screenshots/` — desktop/mobile above-fold + full page (live site)
- `traces/` — Lighthouse filmstrip frames showing the loader curtain timeline
- `lighthouse-mobile.json`, `lighthouse-desktop.json` — live site
- `render.json` — Playwright render of the live homepage
- `pre-plugin-run/` — the earlier manual audit (before the plugin was installed), incl. before/after Lighthouse of the working tree
- `audit-data.json` — structured envelope for `google_report.py`
- Drift baseline stored (`drift_baseline.py`, CWV skipped) — run `/seo drift compare https://davidgeha.dev` after deploy

---

## Final pass (same day, after keys + GSC verification)

### Google APIs (`seo-google`) — `findings/google.md`
- **Indexation:** `/` PASS, "Submitted and indexed", last crawl 2026-09-09. `www.` = "Alternate page with proper canonical" → no duplication issue; the www redirect is tidy-up only.
- **Sitemap:** processed 2026-09-19 15:34 UTC, 0 errors, 1 URL + 5 images.
- **Search Analytics:** **0 clicks / 0 impressions** for every dimension across the full ~16-month retention window (`totals_complete: true`). The site has never appeared in a Google result.
- **CrUX / History:** no data (ineligible). **PSI:** mobile 88 / desktop 96; remaining lab opportunities: ~48 KiB unused JS, ~39 KiB on two 640w WebPs, mobile LCP 2.9 s.
- **Cadence:** GSC weekly for 6 weeks; URL Inspection again ~09-26; CrUX monthly at most.

### Backlinks at Tier 2 (`seo-backlinks`, Moz + Bing) — `findings/backlinks.md`
- **Score 11/100 — toxic profile.** DA 9 / PA 27 / 57 RDs / 124 links; sampled 50 RDs avg spam 8.4, 32 % ≥ 10, mechanical 2×/4× pattern, casino/pharma/fake-news mix, all acquired within ~4 months of registration (2026-02-10). Purchased-package signature.
- **Legit link verified:** `ultraenvirotech.com/solutions/gentoo` → live, dofollow, anchor "David Geha" (not in Moz's crawl).
- **Disavow: YES, gated** on (a) owner confirms the links weren't knowingly built for a purpose worth keeping, (b) GSC *Security & Manual Actions* checked. File: `disavow-draft.txt` (50 of 57 RDs).
- **Limitation:** Moz free quota exhausted after the own-domain pulls; competitor DA/RD and the shared-referrer gap table could not be built this month. Retry after quota reset or via DataForSEO.

### Keyword clusters (`seo-cluster`, 44 keywords, 946 SERP pairs) — `findings/cluster.md`, `cluster-plan.json`
| Cluster | Primary | URL | Intent |
|---|---|---|---|
| Hub | AI consultant Lebanon | `/` | commercial / person-entity |
| Consulting | AI consulting Lebanon | `/ai-consulting-lebanon/` | commercial (directory-heavy) |
| Consulting | how much does an AI consultant cost in Lebanon | `/blog/ai-consulting-in-lebanon-guide/` | informational (article slot exists) |
| Consulting | AI consultant Beirut | `/about/` | person / community SERP |
| Solutions | AI solutions Lebanon (+ AI automation, custom AI, AI agents, SMEs as H2s) | `/ai-solutions-lebanon/` | commercial (service catalogs) |
| Solutions | proof long-tails | `/work/outreach-engine-marketing-agency/`, `/work/custom-ai-crm/`, `/work/fnb-reporting-inventory-automation/` | proof |
| Industries (phase 2) | AI for marketing agencies Lebanon · AI for F&B businesses Lebanon | `/ai-for-marketing-agencies-lebanon/`, `/ai-for-restaurants-lebanon/` | commercial |

- 10 URLs, 52 planned internal links, no orphans. One cannibalization pair to manage: service page vs guide (same SERP) — guide title carries "cost" + "guide", service page doesn't; cross-link both ways; non-overlapping FAQs.
- **Fold, don't build:** best AI consultant in Lebanon · AI consulting company/firms · AI strategy consulting · AI automation Lebanon · AI services · custom AI solutions · AI agents Lebanon · AI for SMEs · AI audit · WhatsApp automation · custom CRM development · restaurant automation · agentic AI Lebanon.
- **Avoid site-wide:** "AI agency Lebanon" (state agencies), "AI marketing agency" (wrong intent), "consultant IA Liban" (no FR AI-consulting SERP), "AI for restaurants Lebanon" as a lead phrase (hijacked by a venue named *Ai Restaurant Beirut*).

### On-site shipped in this pass
Self-hosted fonts (8 latin woff2, 2 preloaded, immutable cache; Google Fonts chain removed) · COOP header · Instagram `@dave.automate` wired · IndexNow submitted (202) · sitemap submitted via GSC API · Moz/Bing/Google keys configured for the plugin.

### Still yours
GBP · GitHub/LinkedIn profiles · www redirect (blocked for me by permission policy — Vercel → Domains → www → Redirect to davidgeha.dev, 308) · disavow confirmation · design calls (loader once-per-session, mobile hero/nav, third-person About).
