# Local SEO Findings — davidgeha.dev

Audited: 2026-09-19. Baseline = live rendered snapshot (`output_dir/render.json`, fetched from production, Vercel `x-vercel-cache: HIT`). Cross-checked against the uncommitted working-tree `index.html` (git status shows it modified but not deployed) because it materially changes several findings below.

## Local SEO Score: 16 / 100

| Dimension | Weight | Score /100 | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 0 | 0.0 |
| Reviews & Reputation | 20% | 5 | 1.0 |
| Local On-Page SEO | 20% | 45 | 9.0 |
| NAP Consistency & Citations | 15% | 10 | 1.5 |
| Local Schema Markup | 10% | 35 (live) / ~70 (pending, undeployed) | 3.5 |
| Local Link & Authority Signals | 10% | 5 | 0.5 |
| **Total** | | | **15.5 ≈ 16** |

Score is dominated by three zeros: no Google Business Profile exists, no citations exist, and no backlinks exist (consistent with the 2026-09-19 full-site audit's finding that `site:davidgeha.dev` returns 0 results). On-page local signal is the one relative bright spot.

## Business Type Detected: Service-Area Business (SAB) — correct pattern used

- No street address visible anywhere in rendered HTML or schema (appropriate — Google hides exact address for SABs).
- No "we come to you" language, but `areaServed` (Country: Lebanon, live; +City: Beirut with Wikidata `sameAs`, pending) correctly signals SAB coverage.
- No Maps embed, no directions link — expected and correct for a home-based solo SAB.
- **Gap**: no visible on-page copy stating "serving all of Lebanon / remote-first" near the fold — it's implicit in body copy and FAQ but not stated as plainly as it could be for users and crawlers.

## Industry Vertical: Professional services / consulting (IT & business consulting)

No dedicated schema.org subtype exists for "AI/IT consultant" (unlike Restaurant, Dentist, Plumber, etc.). `ProfessionalService` is the correct, most-specific available type — good call, not a "wrong category" situation for schema purposes. Industry-specific checks applied: practice-area-style service listing (via `hasOfferCatalog`, pending only), consultant bio/credentials (`alumniOf` AUB), no licensing/bar-style credential applicable to this vertical.

## NAP Consistency Audit

| Field | Visible HTML (body) | JSON-LD (live/deployed) | JSON-LD (pending, uncommitted) | Meta tags (live) | Meta tags (pending) | GBP |
|---|---|---|---|---|---|---|
| Name | "David Geha" (H1) | "David Geha - AI Consulting & Automation" | "David Geha - AI Consulting & AI Solutions in Lebanon" | — | — | none exists |
| Address | none shown | `addressCountry: LB` only | `addressLocality: Beirut, addressCountry: LB` | `geo.placename: Lebanon` | `geo.placename: Beirut, Lebanon` | n/a |
| Phone | **none** | **none** | **none** | — | — | n/a |

**Discrepancy flagged (Medium):** the live/deployed site and the pending working-tree version disagree on locality granularity (country-only vs. Beirut+country) and on business name (two different keyword-suffix variants: "...AI Consulting & Automation" vs "...AI Consulting & AI Solutions in Lebanon"). Neither has shipped consistently to any external directory yet, so there's no cross-source conflict in the wild today — but this must be locked to **one exact string** before it's used to create a GBP listing or any directory profile, per the "no keyword stuffing, must match GBP exactly" rule. Recommend the canonical form be simply **"David Geha"** or **"David Geha — AI Consultant"** (drop "AI Consulting & AI Solutions in Lebanon" from the literal business/legal name; keep the fuller phrase in `alternateName`/description only).

**Critical gap:** no phone number or WhatsApp number anywhere on the site, in HTML, or in schema (`telephone` property absent from both live and pending JSON-LD). This blocks GBP verification-by-phone workflows, blocks `ClickToCall`/`tel:` conversions, and is a required/near-required field on nearly every Tier-1 and vertical citation source (Clutch, GoodFirms, The Manifest, TechBehemoths all request a phone). The site's own prior action plan (`seo-audit/ACTION-PLAN.md`, item 9) already flags this — it has not been actioned.

## GBP Optimization Checklist

| Item | Status |
|---|---|
| GBP listing exists | **Missing** — confirmed via Bing web search for `"David Geha" AI consultant Lebanon`: zero results referencing the person, the domain, or any directory/Maps panel |
| Primary category | N/A (no listing) — recommend **"Business management consultant"** per existing action plan, secondary "Consultant" / "Software company" |
| Maps embed on site | Missing |
| Place/CID reference on site | Missing |
| Review widget on site | Missing |
| Google Posts indicator | Missing (no GBP) |
| Photo evidence (GBP photos syndicated to site) | Missing |
| Service-area configuration | N/A (no listing) |

Net: **0/8 signals present.** This is the single largest scoring gap (25% weight dimension at 0) and, per Whitespark 2026, primary GBP category is the #1 local ranking factor — so this is also the highest-leverage fix available.

## Review Health Snapshot

- Rating: none. Count: 0. `aggregateRating`: correctly absent from schema (good hygiene — no fabricated ratings).
- No testimonials, case-study quotes, or client-name social proof anywhere in `src/components/*` or `index.html` (checked `Services.jsx`, `MyWork.jsx`, `SelectedWork.jsx`).
- Review velocity / 18-day rule: not yet applicable — there is no review stream to go stale. Flag as a forward risk: once a GBP is created and reviews start, they must land at a steady cadence (roughly 1 every ≤18 days) or the account risks a visibility cliff per Sterling Sky's research.

## Citation Presence (Tier 1 + Industry)

Checked via live web search (Bing) for `"David Geha" AI consultant Lebanon` — zero relevant results (only unrelated ChatGPT/GitHub content surfaced). Combined with the prior full-site audit's "zero backlinks" finding, treat all of the below as **absent** pending verification once each is created:

| Directory | Status | Priority |
|---|---|---|
| Clutch.co | Not found | High |
| GoodFirms | Not found | High |
| The Manifest | Not found | High |
| TechBehemoths | Not found | Medium |
| Consultancy.org | Not found | Medium |
| BBB | Not found | Low (limited relevance outside US/CA; skip unless targeting NA clients) |
| Yelp | Not found / not applicable (not a walk-in business type Yelp indexes well) | Low |
| Crunchbase | Not found | Medium |
| LinkedIn Services page | Not set up (personal profile exists via `sameAs` but no Services marketplace listing) | High |
| Yellow Pages Lebanon (yellowpages.com.lb) | Not found | Medium |
| Bayt.com company/freelancer page | Not found | Medium |
| AUB entrepreneurship center (Darwazah/iPark) feature | Not found | High (`.edu.lb` authority link, already identified in existing action plan) |

3 of the top 5 AI-visibility factors are citation-related per the brief's cited research — zero citations today means davidgeha.dev is likely invisible to AI answer engines (ChatGPT, Perplexity, AI Overviews) for "AI consultant Lebanon"-style queries, independent of traditional ranking.

## Local Schema Validation

**Type**: `ProfessionalService` — correct subtype choice (no more specific option exists for this vertical). Not a "wrong category" situation.

**Live (deployed) state:**
- Required: `name` ✓, `address` ✓ (country-level only)
- Recommended: `geo` ✗ missing, `openingHoursSpecification` ✗ missing, `telephone` ✗ missing, `url` ✓, `priceRange` ✗ missing, `image` ✓ (reused OG image, not a dedicated business photo)
- `areaServed`: present but minimal (Country: Lebanon only, no `sameAs`)

**Pending (uncommitted, undeployed) state — materially better, not yet live:**
- Adds `geo` (33.8938, 35.5018 — **only 4 decimal places, not the recommended 5**; ~11m precision instead of ~1.1m — trivial fix, add one more digit of real precision)
- Adds `priceRange: "$$"`, `hasOfferCatalog` with 4 named services, `areaServed` with both Country and City (Beirut) + Wikidata `sameAs` — this exact pattern matches the reference doc's SAB best practice
- Still missing: `telephone`, `openingHoursSpecification` (lower priority for an email-first solo consultant, but still a "recommended" property and needed once a GBP exists)
- Adds `WebPage` node with `dateModified` — good freshness signal

**Recommendation:** deploying the current working-tree `index.html` alone lifts the Local Schema Markup sub-score from ~35 to ~70 with zero new work — it just needs `git commit` + push. This should be the fastest win in this audit.

## Location Page Quality

Not applicable — single-location (SAB, one homepage), no location pages exist or are needed at this stage. Once the three planned pages ship (`/ai-consulting-lebanon/`, `/ai-solutions-lebanon/`, `/ai-automation-beirut/`, per `seo-audit/ACTION-PLAN.md` Phase 3), re-run the doorway-page swap test and unique-content-% check against each other and against the homepage.

## Top 10 Prioritized Actions

1. **[Critical]** Create a Google Business Profile: name "David Geha" (no keyword stuffing), primary category **Business management consultant**, SAB coverage = Lebanon (Beirut, Mount Lebanon, North, South, Bekaa), website davidgeha.dev, add the 4 services, upload 5+ real photos. This single action addresses the 25%-weight dimension currently at 0.
2. **[Critical]** Add a phone or WhatsApp Business number to the site footer/contact and to `telephone` in schema. Required for GBP verification and most Tier-1 directories; currently absent everywhere.
3. **[Critical]** Deploy the already-written, uncommitted `index.html` schema/meta improvements (geo, priceRange, hasOfferCatalog, areaServed+sameAs, WebPage) — zero new work, immediate schema-completeness gain.
4. **[High]** Lock one canonical business name string before it touches any directory or GBP ("David Geha" or "David Geha — AI Consultant"); stop varying the keyword-suffixed name between live/pending versions.
5. **[High]** File the highest-value citations first: Clutch, GoodFirms, The Manifest, LinkedIn Services page, and pursue the AUB/Darwazah feature for a `.edu.lb` authority link — all currently at zero.
6. **[High]** Ship the three dedicated service-area landing pages (Phase 3 of the existing action plan) — dedicated service pages are the #1 local-organic and #2 AI-visibility ranking factor per the brief's cited research, and none exist today.
7. **[Medium]** Fix `geo` coordinate precision to 5 decimal places once deployed (currently 4, in the pending version).
8. **[Medium]** Add `openingHoursSpecification` (even simple "By appointment" / email-response-window framing) once telephone/contact channel is finalized.
9. **[Medium]** Add 2–3 client testimonials with real names/companies (even without a GBP) to start building review-style trust signal on-page ahead of the first GBP reviews; plan for steady review cadence (≤18 days apart) once GBP reviews begin, to avoid the visibility-cliff risk.
10. **[Low]** Add Lebanese-market directory listings (Yellow Pages Lebanon, Bayt company/freelancer page) and a Crunchbase profile to broaden citation footprint beyond the global B2B directories.

## Limitations Disclaimer

- No DataForSEO or other paid business-listing/SERP API was available in this environment — GBP existence and citation absence were inferred from a live Bing web search plus the prior full-site audit's backlink data, not from Google's My Business API or a local-pack SERP check. Findings should be re-verified once DataForSEO or GSC/GBP dashboard access is available (already flagged as blocked-on-keys in project memory).
- Proximity (55.2% of ranking variance per Search Atlas) is outside this audit's control and outside the site owner's control beyond choosing a GBP address/service-area radius.
- Review velocity and response-rate could not be assessed — no GBP exists yet, so there is no review stream to sample.
- Google Maps rendering/place-panel content could not be directly queried (no Maps API access); absence was inferred from lack of any embed/CID/place reference in the rendered page and from the web-search check.
