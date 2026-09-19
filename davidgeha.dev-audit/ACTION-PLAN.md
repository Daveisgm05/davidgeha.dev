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
| 5 | www → apex redirect: Vercel → david-portfolio → Settings → Domains → `www.davidgeha.dev` → Redirect to `davidgeha.dev` (308) | ☐ (or say "do it" and I'll set it) | `curl -sI https://www.davidgeha.dev/` → 308 |
| 6 | Profiles: ✅ Instagram `@dave.automate` wired site-wide · ☐ GitHub (token lacks `user` scope — run `gh auth refresh -h github.com -s user` or paste bio/website/location at github.com/settings/profile) · ☐ LinkedIn headline "AI Consultant in Lebanon · agentic AI automation for agencies & F&B" + website | ☐ | Brave/Bing for "David Geha AI consultant" surfaces a profile that links to the site |
| ✅ | H1/H2/title/meta, Services + FAQ (~1,000 words), schema graph, noscript mirror (726 words), security headers, IndexNow key, images/WebP, robots Claude-SearchBot | done | live on davidgeha.dev |

## Phase 2 — High-impact (Weeks 2–3)

| # | Action | Owner |
|---|---|---|
| 7 | **Google Business Profile** — service-area business. Name exactly `David Geha - AI Consultant`. Primary: Business management consultant; secondary: Consultant, Software company. Areas: Beirut, Mount Lebanon, North, South, Bekaa. Website davidgeha.dev. 4 services with the exact site descriptions. 5+ photos. Then ask 3 clients for reviews mentioning "AI" + "Lebanon"; space reviews ≤18 days apart | ☐ |
| 8 | Publish a phone/WhatsApp number → I add `telephone` to schema + footer, and a WhatsApp CTA (SERP-winning pages all have one) | ☐ → 🤖 |
| 9 | Decide the NAP string once and use it everywhere: `David Geha - AI Consultant` · Beirut, Lebanon · david@osgdev.com · <phone> | ☐ |
| 10 | Directory citations, in this order (each also shows up on page 1 for your queries): Clutch → GoodFirms → The Manifest → LinkedIn Services page → TechBehemoths → Consultancy.org → Sortlist → Crunchbase → Bayt → Yellow Pages Lebanon. Send me each URL → I verify with `verify_backlinks.py` and add to `Person.sameAs` | ☐ → 🤖 |
| 11 | **AUB**: ask CEE dept / Darwazah Center / iPark for a student-founder listing or story (`.edu.lb` link corroborates `alumniOf` and outweighs every directory) | ☐ |
| 12 | Berytech, UK-Lebanon Tech Hub, ArabNet/Menabytes founder listings | ☐ |
| 13 | Self-host fonts (Inter 400/500, Playfair 400/400i) with `<link rel=preload as=font>` → removes ~1.8 s mobile render-block + the only CLS | 🤖 (say go) |
| 14 | Loader curtain: gate to once per session and/or cut 2,450 → ≤800 ms. Keeps the first-visit intro; stops repeat visitors waiting 3.7 s | 🤖 (design call — say go) |
| 15 | Mobile: hero CTA is below the fold; no nav on ≤1024 px. Shrink portrait/name at ≤768 px; add a minimal menu | 🤖 (design call — say go) |
| 16 | Rewrite About in third person, entity + location first ("David Geha is an AI consultant in Beirut…"); add a dated "Updated <month>" line | 🤖 (say go) |

## Phase 3 — Content & authority (Month 2)

Everything must be **pre-rendered/static HTML** (raw HTML is what Bing and AI fetchers read).

| # | Page | Targets | Spec |
|---|---|---|---|
| 17 | `/ai-consulting-lebanon/` | AI consulting Lebanon, AI consultant Lebanon | 1,800–2,500 words. Direct answer ¶ · Lebanon market reality (lean teams, USD pricing, infra) · 3 **priced** offers (48-h audit / 2-week sprint / retainer — SERP winners all show prices) · 5-step process · industries · 6–8 FAQ (cost, timeline, do I need tech staff, data safety, Arabic support) · 2 inline case studies · Service + FAQPage schema |
| 18 | `/ai-solutions-lebanon/` | AI solutions Lebanon | Catalog page: one H2 per solution (outreach engine, research/SEO-GEO pipeline, ad-creative pipeline, custom CRM, F&B reporting/inventory, back-office agents) with problem / what / stack / timeline / from-price |
| 19 | `/blog/ai-consulting-in-lebanon-guide/` | "how much does an AI consultant cost in Lebanon", the article slot jonahtebaa.com holds | 2,000+ words: market tiers, USD bands, what to ask, chatbot vs agent, question-form H2s |
| 20 | `/work/<slug>/` ×3–4 | long-tail + E-E-A-T | outcome case studies with one metric each and a quote |
| 21 | `/about/` | brand / disambiguation | Person entity page; AUB, timeline, photo alt "David Geha, AI consultant in Beirut"; ProfilePage schema if you add follower counts |
| 22 | Later: `/ai-for-marketing-agencies-lebanon/`, `/ai-for-restaurants-lebanon/`, FR `/fr/consultant-ia-liban/` with hreflang | | only with genuinely distinct content — **no city-swapped doorway pages** |
| 23 | 3–5 YouTube walkthroughs titled "<pipeline> — David Geha, AI consultant in Lebanon" (strongest AI-citation correlate; the name on YouTube is currently 100% the producer) | ☐ |
| 24 | One LinkedIn article/month; one genuine r/lebanon or r/Beirut answer/week when AI help is asked | ☐ |

## Phase 4 — Monitoring (ongoing)

| # | Action |
|---|---|
| 25 | ✅ Google API key configured → monthly `/seo google` (PSI now; CrUX + GSC once eligible/verified) |
| 26 | Free Moz key → `/seo backlinks` gets a real numeric score and competitor gap |
| 27 | `/seo drift compare https://davidgeha.dev` after every deploy (baseline captured 2026-09-19) |
| 28 | Re-run `/seo audit` after Phase 3. Targets: Health ≥ 85 · `site:` shows ≥ 5 URLs · GSC impressions for all three queries · one directory listing on page 1 pointing at you |

## Not done, and why

- **www redirect, loader timing, mobile nav/hero, About rewrite, font self-hosting** — production config or design decisions; ready to do on your word.
- **Bot traffic** — not built. Rankings don't move on raw visits; it would pollute analytics and risk invalid-traffic flags. Phase 1–2 above is what moves them.
