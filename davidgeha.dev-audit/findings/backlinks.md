# Backlink Profile Findings — davidgeha.dev

Audited: 2026-09-19. Tier: **0 (Basic — Common Crawl + verification crawler only)**. Moz, Bing Webmaster, Keywords Everywhere, and DataForSEO are not configured on this machine and were not retried. No candidate backlink URLs were supplied for this run, so `verify_backlinks.py` was not invoked (there is nothing to verify).

## 1. Executive Summary

- **Backlink Health Score: Not Assessed (no numeric score).** Common Crawl supplies domain-level rank/presence signals only — it does **not** measure referring-domain counts, anchor text, toxic-link ratio, link velocity, or follow/nofollow ratio. Per the confidence-weighted scoring rules, 0 of the 7 scoring factors have a data source at this tier, so a numeric 0–100 score would be misleading and is deliberately withheld (validated programmatically — see §5).
- `davidgeha.dev` is **not present in the Common Crawl web graph** (`cc-main-2026-jan-feb-mar` release). This is consistent with, and corroborates, the 2026-09-19 site audit finding that `site:davidgeha.dev` returns 0 Google results and the domain has zero known backlinks — the domain is essentially invisible to any web-graph crawler right now, not merely "low authority."
- Of the 5 named competitors, only **2 (eurisko.net, zfort.com)** appear in Common Crawl at all; **3 (webspot.me, lbclouds.com, jonahtebaa.com)** are equally absent. This is a meaningfully positive finding: the "AI consultant Lebanon" competitive set does not have a dominant, deeply-linked incumbent by CC's measure — the opportunity is open, not saturated.
- The single highest-leverage action remains identical to the local-SEO finding: **davidgeha.dev has zero inbound links today.** Every recommendation below is a net-new acquisition target, not a cleanup task — there is no toxic-link or disavow work to do because there is no link profile yet.

## 2. Data Source Coverage & Tier

| Source | Status | Confidence | Notes |
|---|---|---|---|
| Common Crawl Web Graph | Available (public, no key) | 0.50 | Domain-level PageRank / harmonic centrality only; quarterly release (`cc-main-2026-jan-feb-mar`); source: https://commoncrawl.org/web-graphs |
| Verification crawler | Available (local) | 0.95 (per-link) | Not run this pass — no candidate URLs supplied |
| Moz API | Not configured | — | Would add DA/PA, spam score, referring domains, anchor text at confidence 0.85 |
| Bing Webmaster | Not configured | — | Only usable for properties registered to the user's own Bing account, not competitors |
| DataForSEO | Not configured | — | Would be the highest-fidelity source (confidence 1.00) for every scoring factor below |

**Action to unblock Tier 1:** register a free Moz API key (2,500 rows/month, https://moz.com/products/api) — this alone would unlock referring-domain counts, DA/PA, spam score, and anchor text distribution, closing 4 of the 5 currently-unscoreable factors. This mirrors the existing memory note that Moz/Bing/DataForSEO keys are still pending from the user.

## 3. Own-Domain Common Crawl Metrics — davidgeha.dev

| Metric | Value | Source |
|---|---|---|
| In crawl | **false** | Common Crawl (confidence: 0.50) |
| In rankings | **false** | Common Crawl (confidence: 0.50) |
| PageRank | null (not computed — domain absent from graph) | Common Crawl (confidence: 0.50) |
| Harmonic centrality | null | Common Crawl (confidence: 0.50) |
| n_hosts | null | Common Crawl (confidence: 0.50) |

**Correct interpretation (per CC methodology):** absence from the Common Crawl graph means the crawler has not yet encountered the domain via any indexed page's outbound links — it does **not** by itself mean "low authority" (a domain can be new, niche, or under-linked without being penalized). In this case the interpretation is straightforward: it lines up exactly with the zero-backlinks / zero-Google-index state already documented for this site. There is nothing to link *to* it from, so CC's crawler (which discovers pages by following links) has no path to it yet.

## 4. Competitor Comparison — Common Crawl

| Domain | In crawl | In rankings | PageRank | PageRank rank | Harmonic centrality | Harmonic centrality rank | n_hosts |
|---|---|---|---|---|---|---|---|
| **davidgeha.dev** (target) | false | false | — | — | — | — | — |
| eurisko.net | true | true | 3.48e-08 | 1,086,664 | 14,265,524 | 3,362,389 | 3 |
| zfort.com | true | true | 7.11e-08 | 423,479 | 14,855,497 | 580,843 | 2 |
| webspot.me | false | false | — | — | — | — | — |
| lbclouds.com | false | false | — | — | — | — | — |
| jonahtebaa.com | false | false | — | — | — | — | — |

Source for all rows: Common Crawl Web Graph, `cc-main-2026-jan-feb-mar` release (confidence: 0.50, domain-level only). Lower rank numbers = stronger position; PageRank/harmonic centrality values are raw CC graph scores, not comparable to Moz DA or Google's internal metrics.

**Reading the table:**
- **zfort.com** is the strongest of the five by CC's measure — its PageRank rank (423,479) and especially its harmonic-centrality rank (580,843, meaning it sits closer to the "center" of the crawled web graph) both beat eurisko.net by a wide margin despite having fewer detected hosts (2 vs 3).
- **eurisko.net** is present and ranked but materially weaker than zfort.com on both metrics — a mid-tier presence, not a dominant one.
- **webspot.me, lbclouds.com, jonahtebaa.com** are all absent from CC, exactly like the target domain. Do not read this as "these three have no backlinks" (CC coverage gaps happen for reasons unrelated to link count, e.g. small crawl budget, geo-TLD under-sampling, or the domain simply not being reachable from CC's seed set) — but it does mean CC provides no evidence they are ahead of davidgeha.dev either.
- **Bottom line for the client:** among 5 named competitors, at most 2 have any measurable web-graph presence, and neither is overwhelming. This is a winnable niche for link acquisition, not one requiring a takedown of an entrenched authority site.

## 5. Confidence-Weighted Scoring — INSUFFICIENT DATA

Ran through `validate_backlink_report.py` (status: **PASS**, 1 info-level note reflected in §3 above). Result: **no numeric Backlink Health Score is reported.**

| Factor | Weight | Preferred source | Data available at Tier 0? |
|---|---|---|---|
| Referring domain count | 20% | DataForSEO > Moz | No |
| Domain quality distribution | 20% | DataForSEO > Moz DA distribution | No |
| Anchor text naturalness | 15% | DataForSEO > Moz > Bing | No |
| Toxic link ratio | 20% | DataForSEO > Moz spam score > verify crawler | No (no candidate links supplied to verify) |
| Link velocity trend | 10% | DataForSEO only | No |
| Follow/nofollow ratio | 5% | DataForSEO > Bing | No |
| Geographic relevance | 10% | DataForSEO > Bing country data | No |

**Factors with data: 0 of 7.** Per the scoring rules, this must be reported as **Not Assessed / Insufficient Data**, not as a numeric score (e.g. not "15/100" — the validator explicitly flags fabricated scores built on Common Crawl alone as an error). Common Crawl's PageRank/harmonic-centrality figures in §3–4 are presence/rank signals, useful for competitive context, but are deliberately excluded from the weighted score above because they don't measure any of the 7 listed factors directly.

## 6. Verification / Toxic Link Status

- No known or candidate backlink URLs were provided in this task, so the local verification crawler was not run.
- Toxic-link assessment: **not applicable** — there is no link profile to assess (0 known inbound links, consistent with §3). No disavow action is warranted or possible.
- If/when any backlinks are acquired (see §7) or discovered via a future Moz/DataForSEO pull, re-run `verify_backlinks.py --target https://davidgeha.dev --links <file> --json` and cross-check against the 30-pattern toxic-link checklist in `skills/seo/references/backlink-quality.md` before counting them as assets.

## 7. Prioritized Link-Acquisition List — Solo AI Consultant, Lebanon

Target anchor-text mix once links start landing (Local Service benchmark from `backlink-quality.md`): **Branded 45–60%** ("David Geha"), **URL 10–15%** (bare davidgeha.dev), **Generic 15–20%** ("this AI consultant," "learn more"), **Exact/partial match 10–20%** combined ("AI consultant Lebanon" / "AI consulting Lebanon") — do not front-load exact-match anchors from the first few links; that pattern reads as manipulative at this domain's current zero-link baseline.

### Critical priority

| Target | Why | Action |
|---|---|---|
| **AUB (American University of Beirut) — entrepreneurship center / Darwazah iPark, or alumni feature** | `.edu.lb` is one of the few high-trust local TLDs available to this domain; site's own schema already claims `alumniOf` AUB, so a real AUB-hosted mention/link corroborates that claim instead of leaving it as an unverifiable assertion | Pitch a short "alumni spotlight" or startup/consulting feature to AUB's entrepreneurship center or continuing-education program; low cost, high relevance, already flagged in the existing local-SEO findings and action plan |
| **Google Business Profile (once created)** | GBP website-link field is a foundational citation, not primarily an SEO backlink, but it's the anchor every other Lebanese local directory checks NAP against | Create GBP first (blocking dependency already identified in `findings/local.md`) — do this before pursuing directory listings below so every citation matches one canonical NAP string |
| **LinkedIn Services page (in addition to existing personal profile)** | High-DA, indexes well, directly targets "AI consultant" search intent, free to set up | Set up LinkedIn Services listing under David Geha's existing profile with matching NAP/description |

### High priority (Lebanese tech ecosystem + AI/IT niche directories)

| Target | Why |
|---|---|
| **Berytech** (Lebanon's leading tech incubator/accelerator network) | High local relevance and authority in the exact Beirut tech scene this consultant operates in |
| **UK-Lebanon Tech Hub** | Government-backed Lebanese tech program; strong local + international authority |
| **ArabNet** (MENA tech conference/directory + Menabytes editorial coverage) | Regional tech-industry visibility beyond Lebanon alone, relevant to "AI solutions" positioning |
| **Clutch.co** | High-authority global B2B directory, "AI development / consulting" category exists, already flagged in local findings |
| **GoodFirms** | Same category coverage as Clutch, easier initial approval bar |

### Medium priority

| Target | Why |
|---|---|
| **Bayt.com company/freelancer profile** | Largest MENA jobs/business platform; strong regional trust signal |
| **Yellow Pages Lebanon (yellowpages.com.lb)** | Standard Lebanese local-business citation |
| **TechBehemoths** | Niche IT/AI agency directory, moderate authority |
| **Wamda** (MENA startup/business news) | Editorial feature or guest byline on AI trends in Lebanon/MENA — earns a genuine editorial link, not just a directory listing |
| **Executive Magazine (Lebanon business publication)** | Local press feature — high relevance, credible for a Beirut-based consultant |

### Low priority / optional

| Target | Why |
|---|---|
| **Crunchbase** | Useful for investor-facing visibility but limited direct SEO lift for a solo consultant |
| **BBB, Yelp** | Low relevance outside North America / non-walk-in business types — skip unless targeting NA clients |
| **General/global business directories not industry- or geo-specific** | Marginal value; deprioritize versus the Lebanon- and AI-specific targets above |

**Sequencing note:** lock the canonical business name/locality string first (already flagged as a Medium-severity discrepancy in `findings/local.md` — "David Geha" vs. two different keyword-suffixed variants) before submitting to *any* directory on this list, so NAP consistency doesn't have to be corrected retroactively across a dozen citations.

---

## Data files / paths referenced

- This report: `/Users/davidsmac/Projects/david geha portfolio/davidgeha.dev-audit/findings/backlinks.md`
- Cross-referenced: `/Users/davidsmac/Projects/david geha portfolio/davidgeha.dev-audit/findings/local.md` (NAP, GBP, citation checklist — do not duplicate directory-approval work, coordinate NAP string with that file)
- Validator run output: PASS (0 errors, 0 warnings, 1 info note — reflected in §3)
- Memory context used: `seo-goal-ai-consultant-lebanon.md` (confirms zero backlinks / not indexed as of 2026-09-19, Moz/Bing/DataForSEO keys still pending from user)
