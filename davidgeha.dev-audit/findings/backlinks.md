# Backlink Profile Findings — davidgeha.dev

Audited: 2026-09-19 (Tier 2 session — Moz + Bing Webmaster + Common Crawl + verification crawler). `backlinks_auth.py --check` confirms **Tier 2** capability, but Moz's API returned `403 access denied` on **every** call made during this pass (own-domain metrics re-check, own-domain `domains`, and metrics for all 7 competitor domains) — most likely the free-tier monthly quota was exhausted by the earlier 2026-09-19T16:06Z pull (own-domain metrics + `domains` succeeded then; that cached data is still valid and is reused below). New Moz calls should be retried once the quota resets (unknown reset date on the free plan). This is reported as a **data-source limitation**, not a rate limit (HTTP 403, not 429).

## 1. Executive Summary

- **Backlink Health Score: 11 / 100 (Critical — toxic profile).** Confidence-weighted across 4 of 7 factors that have data (see §5). This is not "no backlinks" — it is actively **harmful** backlinks: virtually the entire tracked referring-domain set (57 domains via Moz, cached 2026-09-19T16:06Z) is a purchased/PBN casino-pharma-fake-news link package, not organic growth.
- **Domain registered 2026-02-10.** A brand-new solo-consultant site acquiring 57 referring domains within ~7 months, with every domain linking exactly 2 or 4 times and average Moz spam score 8.4 (16/50 sampled domains ≥10), is not an organic pattern — it is diagnostic of a purchased link package or negative-SEO attack.
- **One verified, legitimate, live backlink exists**: `https://www.ultraenvirotech.com/solutions/gentoo` → `https://davidgeha.dev`, anchor text "David Geha", dofollow (`rel="noopener noreferrer"`, no `nofollow`), confirmed live via `verify_backlinks.py` today (HTTP 200, target found). This domain is **not** among the 57 Moz-tracked referring domains, meaning Moz's crawl (taken while davidgeha.dev was mid-redirect) may be missing legitimate links that landed after that snapshot, on top of over-representing the spam package.
- Google Search Console lists only 2 referring URLs total: `www.davidgeha.dev` (self, not an external signal) and `ultraenvirotech.com`. Google is not yet showing the 57-domain PBN package in GSC's own referrer list — consistent with, but not proof of, Google already discounting or not having crawled most of it.
- **Disavow recommendation: YES — proceed with `disavow-draft.txt` after one confirmation step.** See §6.
- Competitor gap analysis for shared referring domains **could not be completed this pass** — Moz `domains` calls for every competitor failed with the same 403 error described above. See §4 for what Common Crawl alone can and cannot substitute.

## 2. Data Source Coverage & Tier

| Source | Status this pass | Confidence | Notes |
|---|---|---|---|
| Moz API — own domain (cached) | Success (reused from 2026-09-19T16:06:53Z) | 0.85 | DA/PA/spam/RD/nofollow counts + 50-domain referring-domains sample. Fresh re-pull today: 403 access denied. |
| Moz API — competitors (7 domains) | **Failed — 403 access denied, all 7** | — | `eurisko.net, webspot.me, lbclouds.com, jonahtebaa.com, zfort.com, tarekrjeily.com, aliawdeh.com` — `metrics` and `domains` both denied. Same 403 also hit a fresh own-domain re-check, confirming this is account-level (quota), not domain-specific. |
| Bing Webmaster | Success | 0.70 | `https://davidgeha.dev/` shows 0 inbound links — site was registered to Bing today, no crawl history yet. Cannot be used for competitor domains (not registered to this account, per skill rules). |
| Common Crawl Web Graph | Success (6 domains cached, 2 freshly fetched) | 0.50 | Domain-level PageRank / harmonic centrality / presence only, `cc-main-2026-jan-feb-mar` release, quarterly. Does **not** substitute for referring-domain counts, anchors, or toxicity. |
| Verification crawler | Success | 0.95 (per-link) | 1/1 known Google-referrer URL verified live. |
| DataForSEO | Not available (Tier 3 not enabled) | — | Would be the only source for link-velocity trend and the highest-confidence source for every other factor; also the only realistic path to a genuine competitor referring-domain gap table given Moz's current outage. |

**Action to unblock the rest of this task:** retry `moz_api.py domains <competitor>` once free-tier quota resets (unknown cadence — monitor for a day and retry), or install the DataForSEO extension (`./extensions/dataforseo/install.sh`) for reliable, quota-independent competitor link data.

## 3. Own-Domain Profile — davidgeha.dev

| Metric | Value | Source |
|---|---|---|
| Domain Authority (DA) | 9 | Moz (cached 2026-09-19T16:06Z, confidence: 0.85) |
| Page Authority (PA) | 27 | Moz (confidence: 0.85) |
| Spam Score | 4 | Moz (confidence: 0.85) |
| Linking root domains | 57 | Moz (confidence: 0.85) |
| External links | 124 | Moz (confidence: 0.85) |
| Nofollow domains | 7 (≈12% of 57) | Moz (confidence: 0.85) |
| Bing inbound links | 0 | Bing Webmaster (confidence: 0.70) — site added today, no crawl yet |
| In Common Crawl graph | false | Common Crawl (confidence: 0.50) — too new, expected given Feb-2026 registration |
| GSC referring URLs (Google's own list) | 2 (`www.davidgeha.dev` self, `ultraenvirotech.com`) | GSC inspection (carried over from prior audit pass) |
| Verified live external backlinks | 1 of 1 checked | `verify_backlinks.py` (confidence: 0.95) |

**DA 9 is expected and not itself a problem** for a 7-month-old solo-consultant domain — the concern is entirely about the *composition* of the 57 referring domains, not their count.

### Referring-domain composition (Moz, 50-domain sample of 57 total, confidence: 0.85)

- Average spam score: **8.4**; 16/50 (32%) domains scored ≥10 (Moz's higher-risk band).
- Every sampled domain links exactly 2 or 4 times — a mechanical, template-driven pattern inconsistent with organic editorial linking.
- Category mix: casino/betting (`casinooftheking.com`, `bestnz-poker-casinoslot.com`, `hotonlinegaming.com`, `ufabettererm4.com`), pharma (`canadapsilocybin.com`, `onvaxs.com`), fake-brand "news" (`theforbestimes.com`, `forbesstories.com`, `primenewsartical.com`, `bazerdaily.com`), and generic PBN blogs with superficially inflated DA (39–63) — a classic expired-domain PBN signature, not genuine authority.
- Zero topical relevance to AI consulting, Lebanon, or professional services in any of the 50 sampled domains.

## 4. Competitor Comparison — degraded to Common Crawl only this pass

Moz `metrics`/`domains` for all 7 named competitors failed with 403 this session (see §2). The table below is **Common Crawl presence/rank only** — it is a directional authority signal, not a substitute for referring-domain counts, DA, or the requested overlap/gap analysis.

| Domain | In CC crawl | In CC rankings | PageRank | PageRank rank | Harmonic centrality rank | n_hosts |
|---|---|---|---|---|---|---|
| **davidgeha.dev** (target) | false | false | — | — | — | — |
| zfort.com | true | true | 7.11e-08 | 423,479 | 580,843 | 2 |
| eurisko.net | true | true | 3.48e-08 | 1,086,664 | 3,362,389 | 3 |
| webspot.me | false | false | — | — | — | — |
| lbclouds.com | false | false | — | — | — | — |
| jonahtebaa.com | false | false | — | — | — | — |
| tarekrjeily.com | false | false | — | — | — | — |
| aliawdeh.com | false | false | — | — | — | — |

Source: Common Crawl Web Graph, `cc-main-2026-jan-feb-mar` release (confidence: 0.50, domain-level only). Lower rank numbers = stronger position.

**Reading this table (per CC methodology — absence ≠ low authority):**
- **zfort.com** is the strongest measured competitor (best PageRank rank and harmonic-centrality rank of the set).
- **eurisko.net** is present but materially weaker than zfort.com.
- The other **5 of 7** named competitors (`webspot.me, lbclouds.com, jonahtebaa.com, tarekrjeily.com, aliawdeh.com`) are absent from Common Crawl, same as the target domain — do not read this as "these competitors have no backlinks"; CC coverage gaps happen for reasons unrelated to link count (small crawl budget, niche/geo-TLD under-sampling). It does mean CC provides no evidence any of them is ahead of davidgeha.dev.

**Competitor referring-domain gap table: INSUFFICIENT DATA this pass.** The requested "which domains link to 2+ competitors and could plausibly link to a solo Lebanese AI consultant" analysis requires a referring-domains data source for each competitor (Moz `domains` or DataForSEO). Moz denied every competitor `domains` call today. **Do not treat the §7 target list below as a data-derived gap list** — it is carried forward from general Lebanese-tech-ecosystem knowledge (Berytech, UK-Lebanon Tech Hub, ArabNet, Clutch, AUB, etc.), the same set used in the prior Tier-0 pass, not from verified competitor backlink overlap. Re-run this specific deliverable once Moz quota resets or DataForSEO is installed.

## 5. Confidence-Weighted Scoring — Backlink Health Score: 11/100

Ran through `validate_backlink_report.py`: **status PASS** (0 errors, 1 info note reiterating the CC-absence interpretation rule, already reflected in §3–4).

| Factor | Weight | Data available? | Source used | Raw score (0–100) | Redistributed weight |
|---|---|---|---|---|---|
| Referring domain count | 20% | Yes | Moz (0.85) | 15 — 57 RDs exist, but this reflects a mechanical purchased package, not organic breadth, so the *count itself* is not credited as healthy | 30.8% |
| Domain quality distribution | 20% | Yes | Moz DA/spam distribution (0.85) | 10 — DA 39–63 is superficially high but is an expired-domain PBN signature; zero topical relevance | 30.8% |
| Anchor text naturalness | 15% | **No** | Moz anchors endpoint access-denied on free tier | — | redistributed |
| Toxic link ratio | 20% | Yes | Moz spam score (0.85) | 5 — 32% of sampled domains at high-risk spam score, plus categorical toxicity (casino/pharma/fake-news) beyond the numeric score alone | 30.8% |
| Link velocity trend | 10% | **No** | DataForSEO-only factor, not available | — | redistributed |
| Follow/nofollow ratio | 5% | Yes | Moz (0.85) | 25 — ~88% dofollow is consistent with a manipulative link scheme (PBNs link dofollow to pass authority) rather than a natural editorial mix | 7.7% |
| Geographic relevance | 10% | **No** | Bing shows 0 inbound links (site registered today); no country-level data from any source | — | redistributed |

**Factors with data: 4 of 7** (≥4 threshold met, so a numeric score is reported per the scoring rules — this is not an INSUFFICIENT DATA case).

Weighted score = (15 + 10 + 5) × 0.3077 + 25 × 0.0769 ≈ **11.15 → 11/100**

**Interpretation:** 11/100 is a *Critical* score. This is meaningfully worse than "no backlinks" (which would simply be unscored/neutral) — it reflects an off-page profile that is actively composed of manipulative, low-relevance, purchased-pattern links layered onto a domain with almost no offsetting legitimate signal (1 verified real link vs. 57 tracked junk domains).

## 6. Verification / Toxic Link Status — Disavow Recommendation: YES

- **Verified via `verify_backlinks.py`:** `https://www.ultraenvirotech.com/solutions/gentoo` → confirmed live, HTTP 200, target found, anchor "David Geha", dofollow. This is a real, keepable link — **do not disavow it, do not include it in the disavow file.**
- The other GSC-listed "referrer," `www.davidgeha.dev`, is the domain referring to itself (internal/self-canonical signal) and was not run through the external-link verifier — it is not an inbound backlink and requires no action.
- **Toxic assessment of the 50-domain Moz sample:** avg spam score 8.4, 32% at high-risk spam ≥10, mechanical 2x/4x link pattern, casino/pharma/fake-news category mix, all apparently built within a ~4-month window since domain registration. This matches the QRG §4.6.7 / link-spam pattern for a purchased PBN package, not negative SEO from a competitor (negative-SEO patterns typically show more randomized anchor/domain variety; this shows suspiciously uniform mechanics).
- **Recommendation — proceed with disavow, with one confirmation step first:** before uploading `disavow-draft.txt`, confirm with the site owner (David Geha) that none of these 57 domains were knowingly purchased (e.g., via a cut-rate "SEO package" reseller) — if they were purchased unknowingly, disavow is still the correct remedy; if somehow intentional, that's a different (non-technical) conversation. Absent any indication these were legitimately acquired, and given the domain is brand-new with no marketing history that would explain organic PBN-style links, **disavow all 50 sampled domains** (extend to the full 57 once the remaining 7 are identified — re-run Moz `domains` with pagination once quota resets, or note them for the DataForSEO pass).
  - Upload target: `https://search.google.com/search-console/disavow-links` (property: davidgeha.dev)
  - File: `/Users/davidsmac/Projects/david geha portfolio/davidgeha.dev-audit/disavow-draft.txt` (50 domains, ready; update header note once owner confirms purchase origin)
  - Do check GSC → Security & Manual Actions first (not confirmed done in this pass) — if a manual action already exists, that changes urgency but not the recommendation.
- This is not urgent enough to block other work (GSC lists only 2 referrers, suggesting the PBN package hasn't materially poisoned Google's own view of the site yet), but it should not be left indefinitely — disavow filings take effect on Google's next re-crawl of the disavowed domains, so earlier is better while the real profile is still this thin (1 real link) and easy to keep clean.

## 7. Prioritized Link-Acquisition List — Solo AI Consultant, Lebanon

Carried forward from the Tier-0 pass (§2/§4 above explain why this is not yet a Moz/DataForSEO-verified competitor-gap list). Target anchor-text mix once real links start landing (Local Service benchmark, `backlink-quality.md`): **Branded 45–60%** ("David Geha"), **URL 10–15%**, **Generic 15–20%**, **Exact/partial match 10–20%** combined ("AI consultant Lebanon"/"AI consulting Lebanon") — do not front-load exact-match anchors; the existing profile is already over-indexed on manipulative patterns.

### Top 10 gap/acquisition targets (Critical + High priority)

| # | Target | Why |
|---|---|---|
| 1 | **AUB (American University of Beirut)** — entrepreneurship center / alumni feature | `.edu.lb`, high-trust local TLD; site's own schema already claims `alumniOf` AUB — a real link corroborates that claim |
| 2 | **Google Business Profile** (once created) | Foundational citation/NAP anchor; blocking dependency per `findings/local.md` |
| 3 | **LinkedIn Services page** | High-DA, indexes well, direct "AI consultant" intent match, free |
| 4 | **Berytech** (Lebanon's leading tech incubator) | High local relevance/authority in the exact Beirut tech scene |
| 5 | **UK-Lebanon Tech Hub** | Government-backed Lebanese tech program, strong local + international authority |
| 6 | **ArabNet / Menabytes** | Regional MENA tech visibility, editorial coverage potential |
| 7 | **Clutch.co** | High-authority global B2B directory, "AI consulting" category exists |
| 8 | **GoodFirms** | Same category as Clutch, easier approval bar |
| 9 | **Bayt.com** company/freelancer profile | Largest MENA jobs/business platform, strong regional trust |
| 10 | **Wamda** (MENA startup/business news) | Editorial byline on AI trends in Lebanon/MENA — genuine editorial link, not a directory listing |

Medium/low priority (Yellow Pages Lebanon, TechBehemoths, Executive Magazine, Crunchbase, BBB/Yelp) unchanged from the prior pass — see git history of this file for the full table if needed.

**Sequencing note (unchanged):** lock the canonical "David Geha" NAP string (flagged in `findings/local.md`) before submitting to any directory above.

---

## Data files / paths referenced

- This report: `/Users/davidsmac/Projects/david geha portfolio/davidgeha.dev-audit/findings/backlinks.md`
- Prior Moz pull: `/Users/davidsmac/Projects/david geha portfolio/davidgeha.dev-audit/findings/backlinks-moz-2026-09-19.md`, `/Users/davidsmac/Projects/david geha portfolio/davidgeha.dev-audit/moz-linking-domains.json` (57 RD, 50 sampled, cached 2026-09-19T16:06:53Z)
- Disavow file (ready to upload pending owner confirmation): `/Users/davidsmac/Projects/david geha portfolio/davidgeha.dev-audit/disavow-draft.txt`
- Common Crawl raw pulls (this pass): `/Users/davidsmac/Projects/david geha portfolio/davidgeha.dev-audit/tmp-competitors/cc-*.json`
- Verification result (this pass): `verify_backlinks.py --target https://davidgeha.dev` — 1/1 verified live
- Validator run (this pass): PASS, 0 errors, 1 info note (CC-absence interpretation, reflected in §3–4)
- Cross-referenced: `/Users/davidsmac/Projects/david geha portfolio/davidgeha.dev-audit/findings/local.md` (NAP/GBP/citation checklist — coordinate NAP string, don't duplicate)
- Memory context used: `seo-goal-ai-consultant-lebanon.md` (Moz/Bing keys were pending as of the memory note; both are now configured, though Moz is currently quota-exhausted per §2)
- **Known limitation to flag to the user/orchestrator:** the competitor referring-domain gap analysis and full 57-domain (vs. 50-sampled) toxic list remain open items pending Moz quota reset or DataForSEO — see §2 and §4.
