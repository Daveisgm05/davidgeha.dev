# Schema.org Audit — davidgeha.dev

Date: 2026-09-19
Method: `render_page.py --mode auto` (Playwright fallback triggered, `is_spa: true`), JSON-LD confirmed present in **raw** (pre-JS) HTML too — server-rendered, not client-injected. Cross-checked against local repo source (`david-portfolio/index.html`, `src/content/faq.js`, `src/components/Services.jsx`).

## Important context: two versions exist

- **Live/deployed** (`https://davidgeha.dev`, Vercel cache, last-modified 2026-09-12): Person, ProfessionalService, WebSite, FAQPage.
- **Local working tree** (`david-portfolio/index.html`, uncommitted per `git status`): a materially more complete graph — adds `WebPage`, `hasOfferCatalog`/`Offer`/`Service`, `geo`, richer `Person`/`ProfessionalService` fields — that has **not been deployed yet**. Findings below cover both; the live site is what's actually indexable today.

## Detection results

### Live site graph (`@graph`, 1 valid JSON-LD block, 3919 bytes)
`Person`, `ProfessionalService`, `WebSite`, `FAQPage` (4 Q&As).

### Local pending graph (not live yet)
`Person`, `ProfessionalService` (+`hasOfferCatalog` with 4 `Offer`→`Service` items), `WebSite`, `WebPage`, `FAQPage` (6 Q&As).

No deprecated types found in either version (no HowTo, SpecialAnnouncement, CourseInfo, EstimatedSalary, LearningVideo).

## Validation results

| Check | Live | Local (pending) |
|---|---|---|
| `@context` = `https://schema.org` | Pass | Pass |
| Valid, non-deprecated `@type`s | Pass | Pass |
| Required properties present per type | Pass | Pass |
| Property value types correct | Pass | Pass |
| No placeholder text | Pass | Pass |
| Absolute URLs | Pass | Pass |
| ISO 8601 dates | N/A (no date field) | Pass (`dateModified: 2026-09-19`) |
| JSON parses cleanly | Pass | Pass (verified with `json.loads`) |

Minor nit (both versions): `email` is stored as `"mailto:david@osgdev.com"` rather than the plain address `"david@osgdev.com"`. Not a validator error and Google doesn't require either form, but schema.org's own examples use the bare address — worth cleaning up for consistency, not urgent.

### FAQPage-specific check (both versions)
- Structurally valid `FAQPage`/`Question`/`Answer` — no schema errors.
- **Content/schema consistency: confirmed genuine.** Fetched the rendered page and matched question/answer text verbatim in `content` — the FAQ is real, visible on-page copy, not schema-only stuffing. The local repo even enforces this with a code comment in `src/content/faq.js`: *"Single source of truth for the on-page FAQ... Google treats schema that isn't visible on the page as a mismatch, so keep the two in sync."* This is correctly implemented.
- **Per current policy: Google retired FAQ rich results for all sites (May 7, 2026, superseding the Aug 2023 gov/health-only restriction).** This markup will **not** produce a SERP rich result regardless of how well-formed or on-page-matched it is. Flagging as **Info priority**, not Critical — keep it only if the site owner accepts that any AI/GEO-assistant citation benefit is unconfirmed. No action required; do not invest further effort expanding FAQPage for search-result purposes.
- Not a candidate for `QAPage` — this is business-authored marketing FAQ, not user-submitted Q&A, so `FAQPage` remains the semantically correct type even though it has no rich-result payoff.

### ProfessionalService / LocalBusiness completeness
- Required-for-eligibility fields present: `name`, `image`, `url`, `address`. Local version adds `geo` (lat/long) and `priceRange`.
- No `telephone` — acceptable since the business model (per the FAQ) is explicitly email/call-first and remote; don't fabricate a phone number that doesn't exist.
- `hasOfferCatalog` (local only) correctly cross-checked against `src/components/Services.jsx`: all four `Offer → Service` names match the four on-page service titles verbatim. Good practice, not a rich-result trigger by itself but strengthens topical/entity signals for AI/GEO and Knowledge Graph disambiguation.
- No `AggregateRating`/`Review` present — correct call not to fabricate; only add once real, attributable client testimonials exist.

### ProfilePage
- Not recommended. `ProfilePage`'s Google rich-result requirements center on `interactionStatistic` (follower/post counts) for social-profile-style pages. This is a consulting service homepage, not a social profile — forcing `ProfilePage`/`interactionStatistic` here would mean fabricating metrics. Correctly not present.

### BreadcrumbList / WebSite SearchAction
- Not applicable — single-page SPA with anchor-based sections, no additional indexable routes and no on-site search. Skip.

## Missing opportunities (net, after accounting for the pending local update)

1. **Ship the pending local `index.html` changes.** This is the single highest-leverage action: it already adds `WebPage`, `hasOfferCatalog`, `geo`, and richer `Person` data that the live site is currently missing. Nothing further needs to be generated for this — it's already written, just uncommitted/undeployed.
2. **Minor cleanup**: drop the `mailto:` prefix from the `email` property values (cosmetic, not a validator failure).
3. **Optional, only if true**: add `telephone` to `ProfessionalService` if David takes calls/WhatsApp for Lebanon-based leads — improves Local Business panel eligibility. Do not add if it isn't a real, monitored number.

## Generated JSON-LD for the one concrete fix (email format)

Apply to both `Person` (`#david-geha`) and `ProfessionalService` (`#service`) nodes in `david-portfolio/index.html`:

```diff
-        "email": "mailto:david@osgdev.com",
+        "email": "david@osgdev.com",
```

No other new JSON-LD blocks are recommended right now — the pending local graph already covers WebPage, OfferCatalog, and geo; adding ProfilePage, BreadcrumbList, or expanded FAQPage would either misrepresent the site type or chase a rich-result feature (FAQ) that no longer exists on Google.

## Score

- **Live site (as currently deployed): 76/100.** Clean, valid, non-deprecated schema with correct content/FAQ consistency, but missing `WebPage`, `OfferCatalog`, and `geo` that are already written locally.
- **Local pending version once deployed: ~90/100.** Comprehensive, internally consistent (Services ↔ OfferCatalog ↔ page copy; FAQ ↔ FAQPage), valid JSON, ISO dates, absolute URLs. Remaining gap is only the FAQPage rich-result deprecation, which is a Google policy change outside the site's control, and the trivial `mailto:` cosmetic fix.

## What works well (call out explicitly)

- JSON-LD is server-rendered in raw HTML, not client-injected — no crawler/render-budget risk.
- `@id`-based entity graph (`#david-geha`, `#service`, `#website`, `#webpage`, `#faq`) correctly cross-references nodes instead of duplicating data.
- Deliberate, code-enforced content/schema parity for both the FAQ and the Services/OfferCatalog sections — this is the exact discipline most sites get wrong, and it's already built here.
- No deprecated schema types anywhere.
