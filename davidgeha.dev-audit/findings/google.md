# Google API Findings — davidgeha.dev

Data source: Google API (field/lab data). Credential tier: **Tier 1** (API key + service account: PSI, CrUX, CrUX History, GSC, URL Inspection, Indexing API all available). GA4 not configured (no `ga4_property_id`) — GA4 checks skipped.

Run date: 2026-09-19. GSC property: `sc-domain:davidgeha.dev`.

## 1. Indexation Status (GSC URL Inspection API)

| URL | Verdict | Coverage State | Last Crawl | Google Canonical | Referring URLs |
|---|---|---|---|---|---|
| https://davidgeha.dev/ | PASS | Submitted and indexed | 2026-09-09 | https://davidgeha.dev/ (self) | https://www.davidgeha.dev/index.html; **https://www.ultraenvirotech.com/solutions/gentoo** |
| https://www.davidgeha.dev/ | NEUTRAL | Alternate page with proper canonical tag | 2026-09-03 | https://davidgeha.dev/ (correctly points to apex) | https://davidgeha.dev/ |

- Homepage is indexed and healthy: `robots_txt_state: ALLOWED`, `indexing_state: INDEXING_ALLOWED`, `page_fetch_state: SUCCESSFUL`.
- `www` correctly canonicalizes to the apex domain — no www/apex duplicate-content risk.
- Notable: an external referring URL was surfaced for the apex homepage — `https://www.ultraenvirotech.com/solutions/gentoo`. This is a live external link Google has discovered (not in the Moz backlink data captured earlier in this audit) — worth confirming manually and potentially adding to the backlink profile inventory.
- Mobile usability verdict is `VERDICT_UNSPECIFIED` (no issues data currently returned for this property).

## 2. Sitemap Status (GSC Sitemaps API)

| Sitemap | Last Submitted | Pending | Errors | Warnings | Web URLs Submitted | Image URLs Submitted |
|---|---|---|---|---|---|---|
| https://davidgeha.dev/sitemap.xml | 2026-09-19 15:34 UTC | No | 0 | 0 | 1 | 5 |

- Sitemap processed successfully (no longer pending as of this check), 0 errors/warnings.
- Only 1 web URL is listed in the sitemap, consistent with this being a single-page portfolio site.
- Note: sitemap `submitted` counts are not the same as indexation truth — URL Inspection above confirms the homepage itself is indexed.

## 3. Search Performance (GSC Search Analytics)

| Window | Clicks | Impressions | CTR | Avg Position | Totals Complete |
|---|---|---|---|---|---|
| Last 90 days (2026-06-21 to 2026-09-16) | 0 | 0 | 0 | 0 | true |
| Last ~16 months / 480d (2025-05-27 to 2026-09-16) | 0 | 0 | 0 | 0 | true |
| Country x Device breakdown (90d) | 0 rows | — | — | — | true |

- **Zero clicks and zero impressions** across every dimension tested (query×page, country×device) and every window available (90-day and the full ~16-month history GSC retains).
- This is consistent with a newly-indexed, low-authority page that has not yet started ranking for any query with search volume, and matches the CrUX "insufficient traffic" result below.
- GSC flagged a **known logging anomaly**: "GSC impressions logging error affected impressions, CTR, and average position from 2025-05-13 through 2026-04-27; clicks were not affected." This does not change the 0-click reality but means any historical impression data in that window (had there been any) would be unreliable — not a concern here since there were no clicks either.
- No query or page rows returned — there is nothing to rank yet, so no query-level opportunities to report this cycle.

## 4. CrUX (Field Data) — Origin and History

| Check | Result |
|---|---|
| CrUX (current, origin) | No data — "insufficient Chrome traffic volume for eligibility" |
| CrUX History (origin) | No data — same reason |

- Expected given 0 organic impressions/clicks; the origin does not yet have enough real Chrome user traffic to populate CrUX. Field CWV data is unavailable until traffic grows — lab data (PSI) is the only performance signal available for now.

## 5. PageSpeed Insights — Lab Data (from `psi-both.json`, captured post-deploy, not re-run this session)

| Metric | Mobile | Desktop |
|---|---|---|
| Performance score | 88/100 | 96/100 |
| Accessibility | 100/100 | 100/100 |
| Best Practices | 100/100 | 100/100 |
| SEO | 100/100 | 100/100 |
| LCP (lab) | 2.9s (score 0.81) | 0.8s (score 0.98) |
| FCP (lab) | 2.9s (score 0.53) | 0.8s (score 0.96) |
| CLS (lab) | 0 | 0.001 |
| TBT (lab) | 0ms | 0ms |
| Speed Index | 4.5s (score 0.72) | 1.8s (score 0.69) |
| Total page weight | 591 KiB | 577 KiB |

CWV rating vs. thresholds (lab estimate, no field data available yet): Mobile LCP 2.9s falls in "Needs Improvement" band (2,500–4,000ms); Desktop LCP 0.8s is "Good." CLS is "Good" on both. TBT/INP proxy is excellent (0ms) on both.

### Opportunities / Diagnostics with estimated savings

| Issue | Platform | Estimated Savings | Detail |
|---|---|---|---|
| Reduce unused JavaScript | Mobile + Desktop | ~47–48 KiB | Single bundle `index-DxKamTGI.js` (107 KB total, ~48 KB unused) |
| Render-blocking requests | Mobile | ~300ms | `index-O-imZ1pG.css` (6.6 KB) blocks first render |
| Render-blocking requests | Desktop | ~20–95ms | Same CSS file, smaller impact on faster desktop connection |
| Improve image delivery | Mobile | ~39 KiB | `work-research-v2-640.webp` (21.5 KB wasted) and `work-outreach-v2-640.webp` (18.4 KB wasted) — likely served larger than displayed size or missing responsive `srcset` |
| Network dependency chain | Mobile + Desktop | Not quantified | Flagged as failing insight (score 0) — critical request chain could be shortened |

### Largest assets (total byte weight)

1. `david_transparent.webp` — 211.5 KB (largest single asset on the page)
2. `index-DxKamTGI.js` — 107.9 KB
3. `david_depth.png` — 71.5 KB
4. Google Fonts (Inter + Playfair Display, 3 files) — ~112 KB combined, loaded from `fonts.gstatic.com`/`fonts.googleapis.com`

### Security/hardening diagnostics (not scored in the 88/96, but flagged as failing insight audits)

- No CSP (Content-Security-Policy) header — flagged High severity for both Trusted-Types XSS mitigation and general CSP-XSS protection.
- No COOP (Cross-Origin-Opener-Policy) header — flagged High severity for origin isolation.
- HSTS present but missing `includeSubDomains` and `preload` directives — Medium severity.

These don't affect the Lighthouse Best Practices score of 100/100 in this version of the tool (they're newer "insight" audits reported separately), but are worth fixing as low-cost, low-risk hardening — add response headers at the hosting/CDN layer (Vercel config or middleware).

## 6. GA4

Not available — no `ga4_property_id` configured for this credential set. Skip organic traffic and landing-page reports until a GA4 property is added.

## Priority Summary

| Priority | Item |
|---|---|
| High | None outstanding from Google API data this cycle — indexation and sitemap are healthy; the 0-impressions state is expected for a brand-new domain and will resolve with time + external links, not a technical fix. |
| Medium | Trim the JS bundle (~47 KB unused) and defer/inline the render-blocking CSS to close the Mobile LCP gap (2.9s → target ≤2.5s for "Good"). Right-size/compress the two work-sample WebP images (~39 KB combined savings). |
| Medium | Investigate the `https://www.ultraenvirotech.com/solutions/gentoo` referring URL surfaced by GSC — confirm it's a legitimate inbound link and add to the backlink inventory tracked in `findings/backlinks.md`. |
| Low | Add CSP, COOP, and HSTS `includeSubDomains`/`preload` headers for security hardening (no direct SEO impact but low-effort, low-risk). |

## Monitoring Cadence Recommendation

- **GSC Search Analytics (clicks/impressions/queries)**: re-check weekly for the next 4–6 weeks. A brand-new domain with a sitemap just processed today typically needs 1–3 weeks before impressions start appearing, longer before clicks. If still 0 impressions after 4 weeks, revisit off-page signals (backlinks, IndexNow/Bing submission status per SEO goal memory) rather than on-page technical factors, since indexation and sitemap health are already confirmed good.
- **GSC URL Inspection**: re-run on the homepage after ~7 days to confirm the index stays fresh post-sitemap-resubmission; no action needed on `www` (already correctly neutral/canonicalized).
- **CrUX / CrUX History**: do not re-check more than monthly — the site needs sustained real-user Chrome traffic before CrUX has enough samples to report (28-day rolling eligibility threshold). Revisit once GSC starts showing meaningful impressions/clicks.
- **PSI (lab data)**: re-run only after a code/deploy change targeting the flagged Mobile LCP/JS-bundle/image issues, or at most monthly otherwise — avoid redundant runs per API quota guidance.
- **GA4**: configure a GA4 property and add `ga4_property_id` to unlock organic-traffic and landing-page reporting; currently a blind spot for behavioral data.

## Data Freshness Notes

- CrUX: 28-day rolling window; currently ineligible (insufficient traffic).
- GSC: 2–3 day reporting lag; sitemap and inspection data reflect real-time API state as of this run.
- PSI: lab data captured 2026-09-19T15:03–15:04 UTC (from `psi-both.json`), not re-run this session per instruction to avoid duplicate PSI calls.
- GA4: not applicable (not configured).
