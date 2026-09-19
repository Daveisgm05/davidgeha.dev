# GEO / AI Search Readiness - davidgeha.dev

Audited: 2026-09-19. Live build = Vercel deploy last-modified 2026-09-12 (uncommitted local
changes to Faq.jsx, Services.jsx, index.html noscript, llms.txt are NOT yet live and were
scored separately in the "Pending deploy" section).

Goal: be the cited answer for "AI consultant Lebanon", "AI consulting Lebanon",
"AI solutions Lebanon", "who is a good AI consultant in Lebanon" in ChatGPT, Perplexity,
Google AI Mode/AIO, Copilot.

## GEO Readiness Score: 40 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 30 | 7.5 |
| Structural Readability | 20% | 45 | 9.0 |
| Multi-Modal Content | 15% | 40 | 6.0 |
| Authority & Brand Signals | 20% | 30 | 6.0 |
| Technical Accessibility | 20% | 55 | 11.0 |
| **Total** | | | **39.5 -> 40** |

Platform-specific estimates (0-100):

| Platform | Score | Why |
|---|---|---|
| Google AI Overviews / AI Mode | 45 | Googlebot renders the SPA, sees all 218 words + JSON-LD; content is thin, no question headings visible, no third-party corroboration. |
| ChatGPT Search (OAI-SearchBot) | 30 | Allowed in robots.txt, but the crawler does not execute JS, so it sees only the 46-word noscript block. |
| Perplexity (PerplexityBot) | 25 | Allowed, no JS execution (46 words), and Perplexity leans hard on Reddit/YouTube/directories where the brand has zero footprint. |
| Bing Copilot | 35 | Bingbot renders partially; Bing query "David Geha" AI consultant Lebanon returned no result for the site or any profile. |

## 1. AI crawler access (robots.txt) - PASS

https://davidgeha.dev/robots.txt returns 200, `User-agent: * Allow: /`, sitemap declared.

| Crawler | Governs | Status |
|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | Allowed (explicit) |
| ChatGPT-User | ChatGPT on-demand browsing | Allowed (explicit) |
| Claude-SearchBot | Claude search citations | Allowed (via `*` fallback only; not listed explicitly) |
| PerplexityBot | Perplexity citations | Allowed (explicit) |
| Googlebot | Google Search + AI Overviews + AI Mode | Allowed (via `*`) |
| Bingbot | Bing + Copilot | Allowed (via `*`) |
| Applebot | Siri / Spotlight / Safari discoverability | Allowed (via `*`) |
| GPTBot | OpenAI training only | Allowed (explicit) |
| ClaudeBot | Anthropic training only | Allowed (explicit) |
| Google-Extended | Gemini training/grounding only | Allowed (explicit) |
| Applebot-Extended | Apple Intelligence training only | Allowed (explicit) |
| CCBot / cohere-ai | Training | Allowed (via `*`) |

Notes:
- `Claude-Web` and `anthropic-ai` are legacy tokens; harmless but dead. Add `Claude-SearchBot`
  explicitly so the posture is documented (Low severity, 2 min).
- Allowing training bots is a deliberate, reasonable choice for a solo consultant who wants
  entity recall inside models; no change recommended.
- No RSL 1.0 licensing block present. Not needed for this goal; skip.

## 2. llms.txt - PRESENT, well-formed

https://davidgeha.dev/llms.txt returns 200 text/plain, valid llms.txt shape (H1, blockquote
summary, H2 sections, contact links). `/llms-full.txt` 404 (fine for a one-page site).

Evidence-based posture: llms.txt is not confirmed to be read by OpenAI, Anthropic, Google or
Perplexity crawlers. Treat it as a zero-cost hedge, not a ranking lever. It costs nothing to
keep accurate; do not spend more effort on it beyond keeping it in sync with the page.

Live version gaps (already fixed in the uncommitted local copy): no "Beirut", no LinkedIn
link, no pricing/FAQ content, no "AI consulting / AI solutions" phrasing.

## 3. Passage-level citability - WEAK (30/100)

Rendered, boilerplate-stripped text = 218 words total for the whole site. Breakdown:

| Block | Words | Citable as a standalone answer? |
|---|---|---|
| Hero: "I find the repetitive work in your business and build agentic AI systems that run it for you." | 18 | Too short, first person, no entity name or location |
| About paragraph ("I'm David, a Civil & Environmental Engineering student at AUB...") | 59 | Best passage on the page; but first person ("I'm David") with no surname, so an LLM cannot attribute it to "David Geha" without context |
| Process steps (Find / Build / Automate & scale) | 3 x ~4 | Labels only, no explanation |
| Recent Builds (6 cards) | 11-16 each | Sentence fragments, no client, no metric, no outcome |
| noscript block (only thing non-JS crawlers see) | 37 + 7 | The single third-person, entity-named passage. 46 words total. |

Findings:
- Zero passages in the 134-167 word sweet spot. Zero passages that name "David Geha" +
  "Lebanon" + a service + a proof point in one extractable block.
- Zero question-based H2/H3 on the live page. The FAQPage JSON-LD (4 Q/As) has no matching
  visible content on the page -- schema/content mismatch. Google's guidance requires the
  marked-up FAQ to be visible to users; the LLM crawlers that don't render JS cannot see it
  either way. (High severity; fixed by the pending Faq.jsx deploy.)
- No statistics, no named clients, no dates on the About section, no numbers ("saved X
  hours/week", "N automations shipped", "since 2025"). LLMs prefer passages with specifics.
- Almost all body copy is first person. AI answers are written in third person; third-person
  passages ("David Geha is an AI consultant in Beirut, Lebanon, who...") are lifted verbatim
  far more often.
- H3s on Recent Builds are full sentences ("Outreach engine that sources leads...") -- fine
  for humans, but the name of the thing built is missing, so nothing is entity-anchored.

## 4. Structure - PARTIAL (45/100)

- Title: "AI Consultant in Lebanon - David Geha | Agentic AI Automation" -- good.
- Meta description names the entity, location, niches, services -- good.
- H1 in rendered DOM is the logo wordmark "DavidGeha" (two spans concatenated). A second H1
  "David Geha - AI Consultant in Lebanon" lives inside <noscript> (only seen by non-JS
  crawlers). Net effect: JS-rendering engines get a keyword-free H1; non-JS engines get the
  good one. Recommend making the visible H1 the descriptive one (or add sr-only H1 text) and
  demoting the wordmark.
- H2s are slogans ("An engineer's approach to AI automation.", "Let's automate the work you
  shouldn't be doing.") -- not queries anyone asks.
- Lists: 2 (nav + process). No tables, no definition blocks, no TL;DR/summary box.
- Only one URL in the sitemap; there is no deeper page for any service, so every target query
  competes on the same 218-word document.

## 5. Multi-modal - WEAK (40/100)

- 8 <img>: 4 have alt = project title (ok), 4 duplicates have empty alt (decorative, ok if
  intentional).
- No video, no diagrams with captions, no before/after screenshots with descriptive alt.
  YouTube presence is the strongest correlate of AI citation (~0.74) and the brand has none.
- og:image present (og-image.jpg).

## 6. Authority, entity and brand-mention footprint - WEAK (30/100)

On-page:
- JSON-LD @graph: Person (jobTitle AI Consultant, alumniOf AUB, sameAs LinkedIn/GitHub/
  Instagram, address LB), ProfessionalService (areaServed Lebanon), WebSite, FAQPage. Valid,
  well linked via @id. Good foundation.
- Missing from Person/ProfessionalService: `addressLocality: Beirut`, `alternateName`,
  `email`, `foundingDate`/`since`, `hasOfferCatalog` for services, `sameAs` to any
  third-party listing that can disambiguate the entity.
- No testimonials, client names, case-study metrics, or dates on the page.

Off-page (checked 2026-09-19):

| Surface | Result |
|---|---|
| Wikipedia | No article. "David Geha" appears only as a character name in "Terror in the Mall" (1998). |
| Brave web search "David Geha" | Top 15 results = 100% David Geha, Emmy-winning Senior Producer at "Extra" (Warner Bros, LA): IMDb, LinkedIn, Muck Rack, X @ExtraGeha, Facebook, people-search sites. davidgeha.dev absent. |
| Brave "David Geha" AI consultant | Still 7/7 results the TV producer. davidgeha.dev absent. |
| Brave "David Geha Lebanon" | TV producer + MAD (Paris) results. davidgeha.dev absent. |
| Bing "David Geha" AI consultant Lebanon | No result for the site or any profile. |
| YouTube "David Geha" | All results = the TV producer (MAD Music Arts Design interview, Maura Soden clips). 0 for the consultant. |
| YouTube "AI consultant Lebanon" | 0 mentions of Geha. |
| Reddit | Not fetchable from this environment; no evidence of presence. |
| GitHub Daveisgm05 | 5 public repos, pinned: davidgeha.dev, lead-outreach-system, jarvis, claude-remote. Profile has no bio/location/website set. |
| LinkedIn /in/david-geha/ | Exists (HTTP 999 = LinkedIn bot wall); cannot verify headline. |
| Instagram @david.geha | 200 OK. |
| Directories (Clutch LB, TechBehemoths, Sortlist, Consultancy.org, The Manifest) | Competitors listed; David Geha absent from all. |

Entity verdict: for LLMs, "David Geha" currently resolves to the Extra TV producer. Nothing on
the open web, other than davidgeha.dev itself, asserts "David Geha = AI consultant in Beirut".
Until at least 3-5 independent pages say so, ChatGPT/Perplexity will either name the producer
or say they have no information. This is the single biggest blocker for the "who is a good
AI consultant in Lebanon" goal.

Competitive picture for the target queries (Brave, "AI consultant Lebanon" / "AI consulting
Lebanon" / "AI solutions Lebanon"):
- #1 in both consulting queries: jonahtebaa.com/blog/ai-consulting-lebanon-practitioners-2026.html
  -- a solo practitioner's long-form article whose question headings ("Who is the leading AI
  consultant in Lebanon?", "What AI consulting firms operate in Lebanon?", "What does an AI
  strategy consultant do in Lebanon?") are surfacing as separate sitelinks. This is exactly
  the format that gets cited.
- Directories: TechBehemoths, Clutch, Sortlist, The Manifest, Consultancy.org.
- Agencies: Webspot, Eurisko, Zaka.ai, NavyBits, lbclouds.com (AI automation Lebanon page
  with "How much does AI automation cost in Lebanon?" FAQ sitelinks).
- davidgeha.dev: not in the top 12 for any of the three queries.

## 7. Technical accessibility - PARTIAL (55/100)

- Vite/React SPA. Raw HTML = 7.4 KB, 46 visible words (all inside <noscript>) + 3.9 KB
  JSON-LD. Full content requires JS (Playwright render 3.9 s, no console errors).
- Googlebot and (partially) Bingbot render; OAI-SearchBot, PerplexityBot, Claude-SearchBot,
  ChatGPT-User do not execute JS. For them the page IS the noscript block.
- The noscript hedge is a smart move and is why the score isn't lower, but 46 words is not
  enough to be cited for anything.
- Sitemap lastmod 2026-07-05 vs. deploy last-modified 2026-09-12: stale, update on deploy.
- Canonical, lang="en", HTTPS, HSTS, brotli, Vercel edge cache all fine.
- `render.json` publication_date=2026-01-01 was inferred from "JANUARY 2026" card text; there
  is no real datePublished/dateModified on the page.

## Pending deploy (uncommitted local changes) - what it will fix

The working tree already contains: Faq.jsx using native <details> (answers stay in DOM),
6 FAQ questions incl. "How much does AI consulting cost in Lebanon?" and "Do you build AI
solutions for companies outside Lebanon?", Services.jsx with H2 "AI consulting & AI solutions
in Lebanon", JSON-LD FAQPage expanded to 6 Qs, noscript expanded to 129 words with an H2, and
a rewritten llms.txt with Beirut/LinkedIn/pricing. Shipping this as-is would move the site to
roughly 52-55/100 (citability ~50, structure ~60, technical ~60). It does not touch the
off-page entity problem, which caps Authority at ~30 regardless.

## Top 5 highest-impact changes

1. **Ship the pending FAQ + Services + noscript build, and make the visible H1 descriptive.**
   Severity: High. Effort: 1-2 h (mostly already done). Also: put the third-person
   "David Geha is an AI consultant in Beirut, Lebanon..." paragraph in the visible About
   section (not only in noscript), expand each FAQ answer to 60-120 words that restate the
   entity + location in the first sentence, and bump sitemap lastmod on deploy.

2. **Build the off-page entity: 5 corroborating pages that say "David Geha, AI consultant,
   Beirut".** Severity: Critical (blocks the core goal). Effort: 3-6 h spread over 2 weeks.
   In order of LLM-visibility payoff: (a) LinkedIn headline "AI Consultant in Beirut,
   Lebanon | Agentic AI automation for agencies & F&B" + About that mirrors the site;
   (b) GitHub profile bio/location/website + README opening line; (c) free listings on
   TechBehemoths, Clutch (LB), Sortlist, The Manifest, Consultancy.org -- these are the
   pages already ranking for the target queries and Perplexity/ChatGPT cite them;
   (d) Crunchbase person + org profile; (e) an AUB student-project / club / news mention if
   obtainable. Add every one of these to Person.sameAs.

3. **Publish one long-form, question-structured page per target query.** Severity: High.
   Effort: 4-8 h. E.g. /ai-consultant-lebanon ("Who is a good AI consultant in Lebanon?
   How much does it cost? What do they automate? How to choose?"), /ai-solutions-lebanon,
   /ai-consulting-for-marketing-agencies-lebanon. Each H2 a real question, each answer
   134-167 words, third person, with at least one number (hours saved, days to ship, price
   band) and a dated "last updated". Add datePublished/dateModified + Article/author schema.
   Pre-render or SSG these routes (Vite SSG / vite-plugin-ssr / move to static HTML) so
   OAI-SearchBot and PerplexityBot get full text without JS. This is what jonahtebaa.com did
   and it holds #1.

4. **Add proof points and disambiguation to the entity itself.** Severity: High. Effort:
   2-3 h. Rename the About H2 to "About David Geha, AI consultant in Beirut", add 2-3 named
   or anonymised case studies with numbers, add addressLocality "Beirut", email,
   hasOfferCatalog, and `disambiguatingDescription: "Not the American television producer of
   the same name"` to Person JSON-LD. Add a dated "Updated September 2026" line.

5. **Seed Reddit and YouTube.** Severity: Medium. Effort: ongoing, 1-2 h/week. Answer 2-3
   threads/month in r/lebanon, r/Beirut, r/artificial, r/automation, r/smallbusiness with
   substantive help and a profile that says "AI consultant, Beirut" (no link-dropping). Post
   3-5 short YouTube walkthroughs of the outreach/CRM/ad pipelines titled "David Geha - AI
   automation for [agencies] in Lebanon". YouTube is the strongest correlate of AI citation
   and currently the name on YouTube is 100% the TV producer.

## What already works

- robots.txt is fully open to every search and answer-engine crawler; nothing to unblock.
- llms.txt exists, is valid, and the local rewrite is better than the live one.
- noscript fallback with entity-named third-person copy + email is exactly the right hedge
  for a SPA; it just needs to be larger.
- JSON-LD @graph is clean, valid, interlinked, and already declares Person -> AUB, Lebanon,
  jobTitle, sameAs, ProfessionalService.areaServed Lebanon.
- Title/meta description are query-aligned ("AI Consultant in Lebanon").
- No render errors, fast edge delivery, canonical + HSTS correct.
- The niche positioning (agencies + F&B, agentic automation, Beirut) is specific enough that
  a well-structured page can plausibly win the long-tail versions of the query.

## Structured findings (for audit-data.json, category: AI Search Readiness)

```json
{
  "category": "AI Search Readiness",
  "url": "https://davidgeha.dev",
  "audited": "2026-09-19",
  "geo_score": 40,
  "dimensions": {
    "citability": 30, "structure": 45, "multimodal": 40, "authority": 30, "technical": 55
  },
  "platform_scores": {"google_aio": 45, "chatgpt_search": 30, "perplexity": 25, "bing_copilot": 35},
  "crawler_access": {
    "OAI-SearchBot": "allowed", "ChatGPT-User": "allowed", "Claude-SearchBot": "allowed (wildcard)",
    "PerplexityBot": "allowed", "Googlebot": "allowed", "Bingbot": "allowed", "Applebot": "allowed",
    "GPTBot": "allowed (training)", "ClaudeBot": "allowed (training)", "Google-Extended": "allowed (training)",
    "Applebot-Extended": "allowed (training)", "CCBot": "allowed (training)"
  },
  "llms_txt": "present, valid; live copy outdated vs. local",
  "rsl_licensing": "absent (not required)",
  "rendered_word_count": 218,
  "nojs_word_count": 46,
  "passages_in_134_167_range": 0,
  "question_headings_visible": 0,
  "faq_schema_visible_content_match": false,
  "brand_footprint": {
    "wikipedia": "none", "reddit": "none found", "youtube": "none (name = TV producer)",
    "linkedin": "profile exists", "github": "5 repos, no bio", "directories": "absent"
  },
  "entity_collision": "David Geha = Emmy-winning Extra TV producer in 100% of name SERPs",
  "findings": [
    {"severity": "critical", "id": "geo-entity-collision", "title": "Name resolves to a TV producer; zero third-party corroboration of 'AI consultant in Beirut'"},
    {"severity": "high", "id": "geo-thin-nojs", "title": "Non-JS AI crawlers (OAI-SearchBot, PerplexityBot) see only 46 words"},
    {"severity": "high", "id": "geo-faq-schema-mismatch", "title": "FAQPage JSON-LD has no visible FAQ content on live page"},
    {"severity": "high", "id": "geo-no-question-headings", "title": "No question-based H2/H3; H2s are slogans"},
    {"severity": "high", "id": "geo-no-citable-passage", "title": "No 134-167 word third-person passage naming entity + location + service + proof"},
    {"severity": "medium", "id": "geo-h1-wordmark", "title": "Rendered H1 is the logo wordmark, descriptive H1 only in noscript"},
    {"severity": "medium", "id": "geo-no-proof", "title": "No client names, metrics, testimonials, or dates"},
    {"severity": "medium", "id": "geo-single-url", "title": "One URL competes for every target query; no service/topic pages"},
    {"severity": "low", "id": "geo-sitemap-stale", "title": "sitemap lastmod 2026-07-05 vs deploy 2026-09-12"},
    {"severity": "low", "id": "geo-claude-searchbot", "title": "Claude-SearchBot not listed explicitly (allowed via wildcard); legacy Claude-Web/anthropic-ai tokens"}
  ]
}
```
