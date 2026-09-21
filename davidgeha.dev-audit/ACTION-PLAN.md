# Action Plan: davidgeha.dev → #1 for "AI consultant / consulting / solutions Lebanon"

Health 56 → 74 (deployed 2026-09-19; PSI post-deploy: mobile 88 / desktop 96). Getting to #1 is then ~20% on-site and ~80% off-site (index, entity, GBP, links, dedicated pages).
✅ done in working tree · ☐ you · 🤖 me, once unblocked

## Phase 1 — Critical fixes (Week 1)

| # | Action | Owner | How we know it worked |
|---|---|---|---|
| 1 | ✅ Deployed (`a22b896`, `dcc7205`) | done | `curl -sI https://davidgeha.dev/c7c27eae54684c15c350b92dc7577bcb.txt` → 200; Last-Modified changes |
| 2 | ✅ GSC domain property verified; service account added (Full); sitemap submitted via API. Finding: already indexed (last crawl 09-09) but **0 impressions in 90 days**. ☐ Still to click: URL Inspection → **Request indexing** so Google fetches today's version | ☐ 1 click | GSC → Pages shows crawl date ≥ 09-19; first impressions appear within 2–4 weeks |
| 3 | ✅ IndexNow submitted (`/`, `/sitemap.xml`, `/llms.txt`) → 202 to Bing/Yandex/Naver/Seznam/Yep/Amazon | done | — |
| 4 | Bing Webmaster Tools → "Import from GSC" | ☐ after #2 | Bing shows the URL indexed |
| 5 | ✅ www → apex 308 redirect set in Vercel (verified: `www.davidgeha.dev/*` → `https://davidgeha.dev/*`) | done | — |
| 6 | Profiles: ✅ Instagram `@dave.automates` wired site-wide (handle corrected 2026-09-21) · ✅ GitHub name/bio/website/location/socials set (verified via API) · ✅ LinkedIn headline + website updated (user-confirmed) | ✅ | Brave/Bing for "David Geha AI consultant" surfaces a profile that links to the site |
| ✅ | H1/H2/title/meta, Services + FAQ (~1,000 words), schema graph, noscript mirror (726 words), security headers, IndexNow key, images/WebP, robots Claude-SearchBot | done | live on davidgeha.dev |

## Phase 2 — High-impact (Weeks 2–3)

| # | Action | Owner |
|---|---|---|
| 7 | ✅ **Google Business Profile created 2026-09-19** — `David Geha - AI Consultant`, SAB (Lebanon + cities), Business management consultant, +961 76 412 978, WhatsApp `wa.me/96176412978`, https://davidgeha.dev/. ☐ **Pending verification** (video) — listing is invisible until it passes. ☐ Then: photos (logo, cover, headshot, 4 work mockups), 4 services, and ask 3 clients for reviews mentioning "AI" + "Lebanon", ≤18 days apart | ☐ verify |
| 8 | ✅ Phone `+961 76 412 978` (WhatsApp link) in footer NAP line, schema `telephone` + `contactPoint`, noscript, llms.txt, FAQ | done |
| 9 | ✅ Canonical NAP: `David Geha - AI Consultant` · Beirut, Lebanon · david@osgdev.com · +961 76 412 978 · https://davidgeha.dev/ — use exactly this on GBP and every directory | done |
| 10 | Directory citations — ✅ Clutch submitted 2026-09-21 (pending 7–10 day validation; add URL to sameAs when live). Remaining, in this order (each also shows up on page 1 for your queries): Clutch → GoodFirms → The Manifest → LinkedIn Services page → TechBehemoths → Consultancy.org → Sortlist → Crunchbase → Bayt → Yellow Pages Lebanon. Copy/paste kit in `LISTINGS-KIT.md`. Send me each URL → I verify with `verify_backlinks.py` and add to `Person.sameAs` | ☐ → 🤖 |
| 11 | **AUB**: ask CEE dept / Darwazah Center / iPark for a student-founder listing or story (`.edu.lb` link corroborates `alumniOf` and outweighs every directory) | ☐ |
| 12 | Berytech, UK-Lebanon Tech Hub, ArabNet/Menabytes founder listings | ☐ |
| 13 | ✅ Fonts self-hosted (8 latin woff2, 2 preloaded, immutable cache); Google Fonts chain removed | done |
| 14 | ✅ Loader now plays once per browser session (sessionStorage); first-visit intro untouched | done |
| 15 | ✅ Native mobile menu added to home header and all content pages. ☐ Hero CTA still below the fold on 812-px phones — needs a portrait/name resize at ≤768 px (design call) | partial |
| 16 | ✅ `/about/` is the third-person entity page (disambiguation, AUB, timeline, verification links); home About paragraph keeps its first-person voice and links to it | done |

## Phase 3 — Content & authority (Month 2)

Everything must be **pre-rendered/static HTML** (raw HTML is what Bing and AI fetchers read). Keyword targets, secondaries, question headings and the 52-link internal matrix are in `findings/cluster.md` / `cluster-plan.json` — build from those.

| # | Page | Targets | Spec |
|---|---|---|---|
| 17 | ✅ **LIVE** `/ai-consulting-lebanon/` (1,620 words, Service+OfferCatalog schema, 7 FAQs). ☐ Add your real prices to the three offer cards | AI consulting Lebanon | Spec was: 1,800–2,500 words. Direct answer ¶ · Lebanon market reality (lean teams, USD pricing, infra) · 3 **priced** offers (48-h audit / 2-week sprint / retainer — SERP winners all show prices) · 5-step process · industries · 6–8 FAQ (cost, timeline, do I need tech staff, data safety, Arabic support) · 2 inline case studies · Service + FAQPage schema |
| 18 | ✅ **LIVE** `/ai-solutions-lebanon/` (1,590 words, CollectionPage+ItemList of 6 Services, 6 FAQs) | AI solutions Lebanon | Catalog page: one H2 per solution (outreach engine, research/SEO-GEO pipeline, ad-creative pipeline, custom CRM, F&B reporting/inventory, back-office agents) with problem / what / stack / timeline / from-price |
| 19 | ✅ **LIVE** `/blog/ai-consulting-in-lebanon-guide/` (2,420 words, Article schema, price-band table, 3-tier market map, 6 FAQs) | "how much does an AI consultant cost in Lebanon" | Spec was 2,000+ words: market tiers, USD bands, what to ask, chatbot vs agent, question-form H2s |
| 20 | ☐ **Drafted, needs your numbers** → `CASE-STUDY-DRAFTS.md`. `/work/outreach-engine-marketing-agency/`, `/work/custom-ai-crm/`, `/work/fnb-reporting-inventory-automation/` | proof long-tails | Reply with the bracketed facts and I publish them |
| 21 | ✅ **LIVE** `/about/` (840 words, ProfilePage+Person schema, disambiguation FAQ) | **AI consultant Beirut** | Person entity page; AUB, timeline, photo alt "David Geha, AI consultant in Beirut"; ProfilePage schema if you add follower counts |
| 22 | Later: `/ai-for-marketing-agencies-lebanon/`, `/ai-for-restaurants-lebanon/`, FR `/fr/consultant-ia-liban/` with hreflang | | only with genuinely distinct content — **no city-swapped doorway pages** |
| 23 | 3–5 YouTube walkthroughs titled "<pipeline> — David Geha, AI consultant in Lebanon" (strongest AI-citation correlate; the name on YouTube is currently 100% the producer) | ☐ |
| 24 | One LinkedIn article/month; one genuine r/lebanon or r/Beirut answer/week when AI help is asked | ☐ |

## Phase 4 — Monitoring (ongoing)

| # | Action |
|---|---|
| 25 | ✅ Google API key configured → monthly `/seo google` (PSI now; CrUX + GSC once eligible/verified) |
| 26 | ✅ Moz + Bing keys configured (Tier 2; Moz free quota exhausts fast — competitor gap table pending next reset). **Finding:** DA 9, 57 referring domains — but they're a PBN/casino link package built Feb–Jun 2026 (see `findings/backlinks-moz-2026-09-19.md`). ✅ Owner confirmed links were unsolicited; URL-prefix property `https://davidgeha.dev/` added; `disavow-draft.txt` (50 domains) uploaded 2026-09-19. Google processes disavows over weeks — no action needed. |
| 27 | `/seo drift compare https://davidgeha.dev` after every deploy (baseline captured 2026-09-19) |
| 28 | Re-run `/seo audit` after Phase 3. Targets: Health ≥ 85 · `site:` shows ≥ 5 URLs · GSC impressions for all three queries · one directory listing on page 1 pointing at you |

## Not done, and why

- **www redirect, loader timing, mobile nav/hero, About rewrite, font self-hosting** — production config or design decisions; ready to do on your word.
- **Bot traffic** — not built. Rankings don't move on raw visits; it would pollute analytics and risk invalid-traffic flags. Phase 1–2 above is what moves them.

## Autonomous engine (2026-09-21)

The ongoing work above is now run by **`seo-geo-engine/`** (private repo `Daveisgm05/seo-geo-engine`):
daily/weekly/monthly GitHub Actions jobs (collect → analyse → tasks → reports), publishing through PRs only,
and Claude Code commands (`/weekly-review`, `/new-case-study`, `/monthly-review`, `/quarterly-entity-audit`,
`/publish`, `/run-audit`, `/onboard`). What David still has to prepare is listed in
`seo-geo-engine/docs/PREREQUISITES.md`; the switch-on steps are in `seo-geo-engine/docs/RUNBOOK.md`.
First live crawl found and fixed: 5 over-long meta descriptions, 4 over-long titles, missing Article headline.
