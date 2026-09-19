# SXO Findings: davidgeha.dev

Audit date: 2026-09-19
Target: https://davidgeha.dev/ (rendered snapshot: `render.json`, Playwright, mode=rendered, is_spa=true, last-modified 2026-09-12)
Keywords: "AI consultant Lebanon", "AI consulting Lebanon", "AI solutions Lebanon"
Analyst note: live site == git HEAD. Uncommitted `Services.jsx` / `Faq.jsx` in the working tree are NOT deployed and are scored separately below.

---

## SXO Gap Score: 43 / 100

(Separate from the SEO Health Score. Measures how far the page is from what Google rewards for these keywords.)

| Dimension | Score | Evidence |
|---|---|---|
| Page Type | 6 / 15 | Single-page portfolio landing vs. SERP consensus of Service Pages + Directories |
| Content Depth | 3 / 15 | 392 visible words (parse: 331). Ranking pages: tarekrjeily 650, lbclouds ~1,800, eurisko ~2,200, jonahtebaa ~2,500 |
| UX Signals | 8 / 15 | Fast (Vercel, brotli), clean layout, 4 breakpoints OK. But single CTA type (mailto x3), no WhatsApp/booking, no FAQ or services section visible, nav = Work/About/Contact only, `#services` anchor lands on "Recent Builds" |
| Schema | 9 / 15 | Person + ProfessionalService + WebSite + FAQPage present. FAQPage has 4 Q/As with NO matching visible FAQ (structured-data policy risk). ProfessionalService lacks addressLocality, telephone, priceRange, geo, hasOfferCatalog; no Service/Offer entities |
| Media | 7 / 15 | 4 WebP work images, lazy, no width/height (CLS), 4 duplicates with empty alt, no headshot in DOM text, no outcome screenshots/video |
| Authority | 3 / 15 | Zero testimonials, zero named clients, zero metrics, not listed on any directory that ranks (Clutch, TechBehemoths, Sortlist, Manifest, Consultancy.org). Brand query `"David Geha" AI consultant` does not surface davidgeha.dev; entity collision with David Geha (TV producer) |
| Freshness | 7 / 10 | Timeline entries through June 2026; last-modified Sep 2026; no dateModified/datePublished on any content |

If the uncommitted Services + FAQ sections ship as written: est. +9 (Content Depth +4, Page Type +2, UX +2, Schema +1) -> ~52 / 100. Still one page; the ceiling for a single URL against this SERP is roughly 60.

---

## 1. PRIMARY FINDING: Page-Type Mismatch (Severity: HIGH)

**Target classification (taxonomy):** Landing Page (personal portfolio variant). Signals: hero + single value prop, minimal nav, CTA-heavy (3x mailto), work grid, 3-step process. Fails Service Page requirements (no case studies with outcomes, no pricing/packages, no testimonial, no FAQ visible) and Local Page requirements (no NAP, no map, country-only address).

**SERP consensus per keyword:**

| Keyword | Directory | Service / agency page | Article / news | Person entity (Wikipedia) | Dominant type | Mismatch |
|---|---|---|---|---|---|---|
| AI consultant Lebanon | 4/9 (44%) Consultancy.org, Clutch, VerifyWise, TechBehemoths | 2/9 (22%) zfort.com city page, eurisko.net/en-lb | 0 | 3/9 (33%) Sehnaoui, Bukhalid, Farra | Directory (44%) with strong Person-entity secondary | HIGH |
| AI consulting Lebanon | 5/9 (56%) Consultancy.org, Clutch, VerifyWise, TechBehemoths, Manifest | 2/9 (22%) zfort, webspot.me | 2/9 (22%) consultancy-me news, jonahtebaa.com practitioner article | 0 | Directory (56%) | HIGH |
| AI solutions Lebanon | 3/9 (33%) Clutch, TechBehemoths, Entasher | 6/9 (67%) seidor.com/en-lb, eurisko x2, navybits, lbclouds, webspot | 0 | 0 | Service Page (67%) | HIGH |
| (adjacent) AI automation consultant Beirut | 3/9 Clutch, TechBehemoths, Sortlist | 5/9 incl. two solo practitioners: aliawdeh.com, tarekrjeily.com/services/ai-agents-automation | 1/9 autonoly programmatic guide | 0 | Service Page, solo practitioners viable | MEDIUM |

**Why this matters:**
- Two of three target SERPs are majority aggregator/directory. A single URL cannot become a directory, so the realistic #1 path is (a) rank the best *service page* in the non-directory slots and (b) be listed on the directories that already own positions 2-6.
- "AI consultant Lebanon" returns three Wikipedia person entries. Google reads "consultant" partly as a person entity. davidgeha.dev already has Person schema; this is the one keyword where a person-branded site is structurally aligned, but the entity is currently ambiguous (TV-producer collision) and thin.
- "AI solutions Lebanon" is 67% dedicated service pages with H1s like "AI Automation Services in Lebanon" and "AI Development Lebanon", 1,800-2,500 words, FAQ, industries list, process, pricing hints. The homepage has none of that structure.

**Depth benchmark of ranking non-directory pages:**

| Page | Type | Words | Pricing | Process | FAQ | Case studies | CTA |
|---|---|---|---|---|---|---|---|
| lbclouds.com/services/ai-automation-lebanon | Service | ~1,800 | Yes ($2,000 chatbot, $25k+ enterprise, $39/mo) | 5 steps | 7 Qs (cost, time, staff, industries, data safety) | None | "Get a Free AI Consultation" |
| eurisko.net AI dev service | Service | ~2,200 | No | 4 capability areas | 6 Qs (definitional) | None named | "Book A Call" |
| jonahtebaa.com practitioner article | Hybrid article | ~2,500 | No | 5-phase engagement model | 9 Qs | Webspot references | Cal.com booking |
| tarekrjeily.com/services/ai-agents-automation | Service (solo) | ~650 | Yes ($1,500 audit, $4,500 sprint, $800/mo) | 3 steps | 5 Qs (cost, chatbot vs agent, Arabic, time-to-live) | 3 named | WhatsApp wa.me + /hire |
| **davidgeha.dev** | **Portfolio landing** | **392** | **No** | **3 labels, no detail** | **Schema only, not visible** | **6 one-liners, no outcomes** | **mailto x3** |

---

## 2. SERP Signals Observed

- **Ads / commercial:** No ad blocks surfaced via WebSearch (cannot confirm; see Limitations). Published prices on 2 of 4 ranking service pages act as the de-facto commercial anchor.
- **PAA / question proxies:** "How much does AI automation cost in Lebanon?", "How long does it take to implement?", "Do I need technical staff?", "Is data safe?" (lbclouds FAQ); "What can an AI agent do for a business in Lebanon?", "Chatbot vs AI agent?", "Will it speak Lebanese Arabic and English?" (tarekrjeily FAQ); "Who is the leading AI consultant in Lebanon?", "What to look for in an AI strategy partner" (jonahtebaa H2s).
- **Related-search journey:** "AI automation consultant Beirut" (narrowing to city + automation), "how much does an AI consultant cost in Lebanon" (price stage), "Top/Best AI companies Lebanon" (shortlist stage; Clutch/TechBehemoths/Sortlist/Manifest titles all use "Top 20+" / "10 Best" / "Rankings").
- **Directory columns = the buyer's mental checklist:** location (Beirut/Jounieh/Adma), min project ($1,000+ to $50,000+), hourly rate ($25-$149), team size (2-9), reviews. None of these facts exist on davidgeha.dev.
- **Featured snippet:** none observed for the three heads (format opportunity: a paragraph "direct answer" block, which jonahtebaa.com explicitly uses as its first H2).
- **AI Overview:** not observable through this tool.

---

## 3. User Stories (derived from SERP signals)

1. **As a Beirut marketing-agency owner**, I want someone to take the repetitive outreach/reporting/CRM work off my team, because we are losing hours every day to busywork, but I'm blocked by a **trust gap**: I can't see who has actually shipped this for an agency like mine.
   *(Signals: tarekrjeily "custom CRMs" + named clients; lbclouds "Workflow & Business Process Automation"; Clutch profiles lead with "client testimonials" and "project examples"; related search "AI automation consultant Beirut".)* Stage: Consideration -> Decision.

2. **As an F&B / hospitality operator**, I want to know what AI can realistically automate in my restaurant or kitchen ops and what it costs, because margins are thin and I can't fund an experiment, but I'm blocked by **price sensitivity** and jargon.
   *(Signals: PAA-proxy "How much does AI automation cost in Lebanon?"; lbclouds lists "Hospitality & Tourism" as an industry; Clutch min-project column from $1,000+; leanware cost guide ranking for the cost query.)* Stage: Awareness -> Consideration.

3. **As a startup founder / technical evaluator**, I want a builder who owns the full stack and ships production systems rather than decks, because I need something live in weeks, but I'm blocked by **technical confusion** about whether a "consultant" actually builds.
   *(Signals: jonahtebaa "partners who have deployed functioning production systems"; tarekrjeily "2-week Agent Sprint", "no agency handoff between sales and delivery"; aliawdeh.com "production-ready AI systems"; Eurisko "supporting startups".)* Stage: Decision.

4. **As a vendor shortlister** (ops manager or exec assistant asked to "find 3 options"), I want a comparable at-a-glance profile (location, rate, min project, team, reviews), because I have to justify the pick internally, but I'm blocked by **comparison fatigue** and by profiles that don't expose those facts.
   *(Signals: 4-5 of 9 results are directories with exactly those columns; "Top 20+", "10 Best", "Rankings" in 5 titles.)* Stage: Consideration.

5. **As a strategy-minded executive**, I want to understand what serious AI adoption looks like in Lebanon (governance, roadmap, training) before choosing anyone, because I've read the Roland Berger / OMSITAI news, but I'm blocked by an **information gap**: most local pages sell, few explain.
   *(Signals: consultancy-me.com Roland Berger story; verifywise governance directory; jonahtebaa H2 "What serious AI strategy looks like in Lebanon"; Eurisko definitional FAQs.)* Stage: Awareness.

---

## 4. Persona Scores for https://davidgeha.dev/

Weighting: Directory/shortlist intent ~45%, service/automation buyer ~35%, article/strategy ~20% (from SERP composition).

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Beirut Agency Owner | 18 | 14 | 7 | 12 | 51 | Needs Work |
| Founder / Technical Evaluator | 16 | 13 | 10 | 13 | 52 | Needs Work |
| F&B Operator | 12 | 8 | 6 | 10 | 36 | Critical Mismatch |
| Strategy-Minded Executive | 7 | 9 | 5 | 8 | 29 | Critical Mismatch |
| Vendor Shortlister | 6 | 8 | 4 | 8 | 26 | Critical Mismatch |

**Evidence per persona**
- *Agency Owner:* Relevance is the page's strength (About copy names "marketing agencies", work items = outreach engine, CRM, ad creatives). Clarity drops because the hero ("I find the repetitive work in your business") is generic and agency framing only appears mid-page; no "For marketing agencies" section. Trust: no named agency, no "saved X hours/week", no quote. Action: "Let's talk" / "Start a project" both `mailto:` only; Lebanese SMB buyers expect WhatsApp (tarekrjeily uses wa.me; lbclouds offers free consultation).
- *Founder / Technical:* Stack marquee (Supabase, Vercel, Claude Code, GitHub) and GitHub link help. "Civil & Environmental Engineering student at AUB" is honest but unframed; for this persona it needs "why that makes me a better builder" context. No repo, no architecture screenshot, no delivery timeline ("live in 2 weeks").
- *F&B Operator:* One line in About ("F&B teams") and one timeline entry ("daily reporting and inventory busywork for an F&B consultancy"). Nothing on what gets automated in a restaurant (inventory, supplier follow-ups, daily sales report, reservations), no price anchor, no Arabic/French mention, no WhatsApp.
- *Strategy Exec:* No explanation of approach beyond three 3-word labels; no audit offer, no roadmap language, no writing.
- *Shortlister:* Cannot fill a single directory column from this page: no city, no rate/min project, no team size, no reviews, no founded date, no languages.

**Weakest persona (weight-adjusted): Vendor Shortlister (26/100)**
Top issue: the page exposes none of the comparison facts the SERP trains buyers to look for, and the brand is absent from every directory that ranks.
Recommended fix: (1) list on Clutch, TechBehemoths, Sortlist, The Manifest, Consultancy.org (free tiers), matching NAP + service description; (2) add an "At a glance" block under the hero: *Based in Beirut, Lebanon · Working with agencies & F&B since 2025 · Projects from $1,500 · 2-week build sprints · English / Arabic / French · Solo builder, no handoffs*.

**Systemic issues**
- Trust is the lowest dimension for every persona (avg 6.4/25): no testimonial, no named client, no outcome metric, no third-party listing.
- Action is one-size (mailto) for all stages: no low-friction entry (WhatsApp, 15-min call link, free 48-hour audit) and no awareness-stage path (guide/article).
- Clarity: services are implied by work thumbnails, never stated as offers.

**Priority actions**
1. Ship the working-tree `Services.jsx` + `Faq.jsx` immediately (fixes the invisible-FAQPage policy risk and adds ~500 words of service copy), then add the "At a glance" facts block.
2. Add 3 outcome-bearing case studies (client type, problem, what was built, measurable result, quote) and a WhatsApp CTA next to every mailto.
3. Build the dedicated page set below; the homepage alone cannot carry three commercial heads against 1,800-2,500-word service pages.

---

## 5. Recommended Page Set to Rank #1

The site is a Vite/React SPA with a single route and a 1-URL sitemap. Raw HTML is 7.4 KB vs 21.7 KB rendered; Google renders it, but every new page below must be pre-rendered/SSG (e.g., vite-plugin-ssr, `vite-react-ssg`, or a build-time prerender step) so content, headings and schema exist in the initial HTML for all crawlers, including AI crawlers that do not execute JS.

| # | URL | Type | Target keyword(s) | Must contain | Benchmarks |
|---|---|---|---|---|---|
| 1 | `/` (homepage, keep) | Hub / brand landing | "David Geha", brand + entity | At-a-glance facts block, services teaser linking to 2-3, 3 case-study cards linking to 5, visible FAQ, WhatsApp + email CTAs, Person/ProfessionalService with addressLocality "Beirut", telephone, priceRange, hasOfferCatalog | -- |
| 2 | `/ai-consulting-lebanon/` | Service Page | "AI consulting Lebanon", "AI consultant Lebanon" | H1 "AI Consulting in Lebanon"; direct-answer paragraph; who it's for (agencies, F&B, founders); 3 offers with prices (48-hr workflow audit, 2-week build sprint, monthly retainer); 5-step process; industries; 6-8 FAQ (cost, timeline, do I need tech staff, data safety, Arabic support, consultant vs agency); 2 case studies inline; Service + FAQPage schema; WhatsApp CTA | lbclouds (1,800w), tarekrjeily (650w + prices), jonahtebaa (structure) |
| 3 | `/ai-solutions-lebanon/` (or `/ai-automation-lebanon/`) | Service Page (solutions catalog) | "AI solutions Lebanon", "AI automation Lebanon" | H1 "AI Solutions for Businesses in Lebanon"; one H2 per solution: lead-outreach engine, research/SEO-GEO pipeline, ad-creative pipeline, custom CRM, F&B reporting & inventory automation, back-office agents; each with problem / what it does / stack / typical timeline / from-price; industries; FAQ; ItemList + Service schema | eurisko AI dev page, navybits, lbclouds |
| 4 | `/blog/ai-consulting-in-lebanon-guide/` | Practitioner article (Hybrid) | "AI consulting Lebanon" (article slot), "how much does an AI consultant cost in Lebanon" | 2,000+ words: market tiers (agencies vs strategy firms vs practitioners), real price bands in USD, what to ask a consultant, red flags, what an agentic system is vs a chatbot, Lebanon-specific constraints (payments, connectivity, Arabic), author box linking to Person entity, Article schema with dates | jonahtebaa.com (2,500w, 9 FAQs, ranks #7 for "AI consulting Lebanon") |
| 5 | `/work/<slug>/` x 3-4 | Case studies | Long-tail + trust for all heads | Client type + location, before/after, build, result metric, quote, screenshots with alt, CreativeWork/Article schema; link back to 2 and 3 | tarekrjeily "Proof" section; Clutch "project examples" |
| 6 | `/about/` | Person entity page | "David Geha AI consultant" (disambiguation) | Full bio, AUB, photo, timeline, talks/posts, sameAs (LinkedIn, GitHub, Instagram, directory profiles), Person schema as main entity; resolves collision with the TV producer | Wikipedia person entries ranking for head term |
| 7 (phase 2) | `/ai-for-marketing-agencies-lebanon/`, `/ai-for-restaurants-lebanon/` | Industry service pages | "AI for marketing agencies Lebanon", "restaurant automation Lebanon" | Persona-specific pain list, 3 automations each, mini case study, FAQ, WhatsApp | lbclouds industries section |

**Off-page requirements (needed to displace directory slots, not optional):** Clutch, TechBehemoths, Sortlist, The Manifest, Consultancy.org profiles; Google Business Profile as a service-area business in Beirut (enables local pack for "AI consultant Beirut"); 2-3 client reviews on GBP/Clutch; LinkedIn headline "AI Consultant in Lebanon" pointing at davidgeha.dev.

---

## 6. Cross-Skill Recommendations
- Trust / E-E-A-T gaps (no testimonials, no author entity page, student framing): run `/seo content` on `/` and the new `/about/`.
- Schema gaps (FAQPage without visible content; ProfessionalService missing address/telephone/priceRange/offers; no Service/Article entities): run `/seo schema`.
- Local intent ("Beirut" variant, directory location columns, GBP absent): run `/seo local`.
- Thin content (392 words): run `/seo page` after Services/FAQ ship.

## 7. Limitations
- WebSearch does not expose ad blocks, PAA boxes, AI Overviews, featured snippets, or the local pack. PAA/related-search signals above are inferred from ranking pages' FAQ/H2 structures and from the adjacent queries that were searchable.
- Result sets were 9 URLs per keyword, not 10; positions are approximate and not geo-localized to Lebanon (US-only search endpoint). A Lebanon-localized SERP may weight webspot.me, eurisko.net and GBP results higher.
- Search volumes are unknown; persona weights are derived from SERP composition, not volume data.
- Depth figures for competitor pages are estimates from fetched content.
- Rendered snapshot is the 2026-09-12 deploy; local working-tree changes (Services, FAQ, new title tag) were reviewed from source but not scored as live.

Generate a PDF report? Use `/seo google report`.

---

## Structured findings (audit-data.json, category: Search Experience)

```json
{
  "category": "search_experience",
  "sxo_gap_score": 43,
  "sxo_gap_score_if_working_tree_shipped": 52,
  "dimensions": {
    "page_type": {"score": 6, "max": 15},
    "content_depth": {"score": 3, "max": 15},
    "ux_signals": {"score": 8, "max": 15},
    "schema": {"score": 9, "max": 15},
    "media": {"score": 7, "max": 15},
    "authority": {"score": 3, "max": 15},
    "freshness": {"score": 7, "max": 10}
  },
  "target_page_type": "landing_page_portfolio",
  "target_word_count": 392,
  "serp": [
    {"keyword": "AI consultant Lebanon", "dominant_type": "directory", "dominant_share": 0.44, "secondary_type": "person_entity", "secondary_share": 0.33, "service_share": 0.22, "mismatch": "HIGH"},
    {"keyword": "AI consulting Lebanon", "dominant_type": "directory", "dominant_share": 0.56, "secondary_type": "service_page", "secondary_share": 0.22, "article_share": 0.22, "mismatch": "HIGH"},
    {"keyword": "AI solutions Lebanon", "dominant_type": "service_page", "dominant_share": 0.67, "secondary_type": "directory", "secondary_share": 0.33, "mismatch": "HIGH"}
  ],
  "mismatch_severity": "HIGH",
  "personas": [
    {"name": "Beirut Agency Owner", "relevance": 18, "clarity": 14, "trust": 7, "action": 12, "total": 51, "rating": "Needs Work"},
    {"name": "Founder / Technical Evaluator", "relevance": 16, "clarity": 13, "trust": 10, "action": 13, "total": 52, "rating": "Needs Work"},
    {"name": "F&B Operator", "relevance": 12, "clarity": 8, "trust": 6, "action": 10, "total": 36, "rating": "Critical Mismatch"},
    {"name": "Strategy-Minded Executive", "relevance": 7, "clarity": 9, "trust": 5, "action": 8, "total": 29, "rating": "Critical Mismatch"},
    {"name": "Vendor Shortlister", "relevance": 6, "clarity": 8, "trust": 4, "action": 8, "total": 26, "rating": "Critical Mismatch"}
  ],
  "critical_issues": [
    "FAQPage schema present with no visible FAQ content on the live page (structured-data policy risk)",
    "Single-URL SPA competing against 1,800-2,500 word service pages and 4-5 directories per SERP",
    "No testimonials, named clients, metrics or third-party listings; brand query does not return davidgeha.dev; entity collision with David Geha (TV producer)",
    "Only CTA is mailto; no WhatsApp or booking path"
  ],
  "recommended_pages": [
    "/ (hub: at-a-glance facts, services teaser, case-study cards, visible FAQ, WhatsApp CTA)",
    "/ai-consulting-lebanon/ (service page, priced offers, process, FAQ)",
    "/ai-solutions-lebanon/ (solutions catalog service page)",
    "/blog/ai-consulting-in-lebanon-guide/ (2,000+ word practitioner article incl. cost bands)",
    "/work/<slug>/ x3-4 (outcome case studies)",
    "/about/ (Person entity / disambiguation page)",
    "/ai-for-marketing-agencies-lebanon/, /ai-for-restaurants-lebanon/ (phase 2)"
  ],
  "off_page": ["Clutch", "TechBehemoths", "Sortlist", "The Manifest", "Consultancy.org", "Google Business Profile (Beirut service-area)"],
  "prerequisite": "Pre-render/SSG all routes; raw HTML currently 7.4KB vs 21.7KB rendered"
}
```
