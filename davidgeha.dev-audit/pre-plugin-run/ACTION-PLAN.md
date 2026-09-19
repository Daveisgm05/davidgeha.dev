# Action Plan: davidgeha.dev → #1 for "AI consultant / consulting / solutions Lebanon"

Ordered by impact. ✅ = done in this commit. ☐ = you, or me once you hand over the key/login.

## Phase 1 — This week (indexing + deploy)

1. ☐ **Deploy this commit** (`git add -A && git commit && git push` → Vercel). Nothing below works until the new HTML is live.
2. ☐ **Google Search Console** — add `davidgeha.dev` as a *Domain* property (DNS TXT record at your registrar, or use the HTML-tag method and I'll add the tag to `index.html`). Then: Sitemaps → submit `https://davidgeha.dev/sitemap.xml`; URL Inspection → `https://davidgeha.dev/` → **Request indexing**.
   *How we know it worked:* `site:davidgeha.dev` returns the homepage within ~7 days.
3. ☐ **IndexNow (Bing / Yandex / Seznam / Naver)** — after deploy, run:
   ```bash
   cd <claude-seo>/ && .venv/bin/python scripts/indexnow_submit.py \
     --host davidgeha.dev --key c7c27eae54684c15c350b92dc7577bcb \
     --urls https://davidgeha.dev/ --json
   ```
   (or tell me it's deployed and I'll run it — no API key needed).
4. ☐ **Bing Webmaster Tools** — import from GSC once #2 is done (one click).
5. ✅ H1 / title / meta / hero copy carry the target phrases.
6. ✅ 1,053 words of answer-shaped Services + FAQ content, schema synced.
7. ✅ Non-blocking fonts, responsive images, sitemap + llms.txt refreshed.

## Phase 2 — Weeks 2–3 (local + citations = your first backlinks)

8. ☐ **Google Business Profile** — create one. Name: "David Geha – AI Consultant"; primary category: *Business management consultant* (secondary: *Consultant*, *Software company*); service-area business covering Lebanon (Beirut, Mount Lebanon, North, South, Bekaa); website: davidgeha.dev; add the 4 services with the exact descriptions from the site; upload 5+ photos. Ask 3 past clients for a review that mentions "AI" + "Lebanon".
9. ☐ **Add a phone/WhatsApp number** to the footer and I'll add `telephone` to the schema (NAP completeness).
10. ☐ **Free directory listings** (each is a followed or brand-mention link and several rank on page 1 for your targets): Clutch.co, TechBehemoths, GoodFirms, The Manifest, Consultancy.org (firm listing), DesignRush, LinkedIn Services page, Bayt company page, Yellow Pages Lebanon, Lebanon Business Directory, Crunchbase, F6S. Use identical name/description/URL everywhere.
11. ☐ **LinkedIn** — headline: "AI Consultant in Lebanon | Agentic AI automation for agencies & F&B"; Featured link → davidgeha.dev; publish 2 articles (below) natively with a link back.
12. ☐ **AUB** — ask the CEE department / AUB entrepreneurship centre (Darwazah / iPark) to list you or feature a student-founder story. A `.edu.lb` link is worth more than every directory combined.

## Phase 3 — Month 2 (content that can actually outrank 2,000-word competitors)

13. ☐ **Three dedicated pages** (Vite multi-page: `ai-consulting-lebanon/index.html`, `ai-solutions-lebanon/index.html`, `ai-automation-beirut/index.html`), each 1,800–2,500 words, H1 = the query, FAQ, 1 case study, internal links to/from home. Content briefs:
    - **/ai-consulting-lebanon/** — "AI Consulting in Lebanon: what it costs, what it delivers, how to choose a consultant (2026)". Sections: Direct answer (what an AI consultant does) · Lebanon market reality (lean teams, dollarised costs, unreliable infra → why agentic > SaaS) · What a good engagement looks like (audit → build → measure) · Pricing bands · Agencies vs freelancers vs me · 8 FAQs · CTA.
    - **/ai-solutions-lebanon/** — "AI Solutions for Lebanese Businesses: 6 systems that pay for themselves". One section per Recent Build with a metric, stack, timeline. Compare to off-the-shelf tools.
    - **/ai-automation-beirut/** — city page: Beirut-specific (agencies in Hamra/Gemmayzeh/Badaro, F&B in Mar Mikhael/Achrafieh), 1 case study, GBP embed, FAQ.
14. ☐ **Case studies** — one per Recent Build, each with a number. This is the E-E-A-T gap every competitor also has; you can win it.
15. ☐ **Prerender to static HTML at build** so Bing and AI crawlers don't depend on JS execution (I can add a Playwright post-build step in ~30 lines).
16. ☐ **French page** (`/fr/consultant-ia-liban/`) with hreflang once the EN page has impressions.

## Phase 4 — Ongoing

17. ☐ Give me the Google API key → I run PSI/CrUX + GSC query reports monthly and a claude-seo drift baseline so regressions are caught.
18. ☐ One Reddit (r/lebanon, r/Beirut) or Facebook-group answer per week on AI questions, linking only when genuinely relevant — that's the entity footprint AI assistants use.
19. ☐ Re-run this audit after Phase 3 ships; target: Health ≥ 85, `site:` shows 4 URLs, GSC impressions for all three targets.

## What I did NOT do, and why

- **Did not commit or push.** You didn't ask me to; the diff is staged in your working tree for review. See the file list in the audit report.
- **Did not generate bot traffic to the site** (the "thousand Haiku agents opening sessions" ask). Google doesn't rank on raw visits — it ranks on indexing, relevance, links, and real engagement signals from Chrome/Search users. Scripted hits from one machine or a fleet of agents don't register as engagement; they inflate Vercel bandwidth and pollute any analytics you set up, and if they're detected as invalid traffic on GA/Ads they can get properties flagged. The real "traffic" levers are #2, #8 and #10 above.
