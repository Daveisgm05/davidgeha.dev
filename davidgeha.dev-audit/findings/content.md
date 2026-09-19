# Content Quality Findings: https://davidgeha.dev/

Audited: 2026-09-19 | Source: `render.json` (Playwright-rendered SPA, `mode_used: rendered`) plus a diff against the uncommitted local source in `david-portfolio/src` so recommendations do not duplicate work already in progress.
Targets: "AI consultant Lebanon", "AI consulting Lebanon", "AI solutions Lebanon". Competitor benchmark: 2,000-2,500 words (lbclouds.com AI automation page, jonahtebaa.com practitioners guide).

## Score

| Metric | Live site | Projected after pending local changes ship |
|---|---|---|
| Content quality score (0-100) | **42** | ~58 |
| E-E-A-T (weighted) | 41 | ~48 |
| AI citation readiness | 45 | ~65 |
| Main-copy word count (trafilatura `extracted_text`) | 205 | ~960 |
| Words seen by non-JS crawlers (`raw_content`) | 46 | 46 (unchanged unless prerendered) |

Score composition (internal model): topical coverage 25%, E-E-A-T 25%, target keyword/entity coverage 15%, AI citation readiness 15%, readability 10%, freshness and AI-content hygiene 10%.

## E-E-A-T breakdown

| Factor | Weight | Score | Evidence |
|---|---|---|---|
| Experience | 20% | 50 | Six dated builds (Sep 2025 to Jun 2026) with concrete one-line descriptions and a named stack (Supabase, Vercel, Claude, GPT Image 2.0). No client names, no before/after numbers, no screenshots with captions, no testimonials. Every build is a claim, not a demonstration. |
| Expertise | 25% | 40 | Author is named and credentialed honestly ("Civil & Environmental Engineering student at AUB"). `Person.knowsAbout` in schema. But the credential is not in AI/CS, there is no explanation of *how* the systems are built (architecture, evals, guardrails, handover), no writing, no talks, no certifications. For a B2B buyer comparing against agencies, "student" without a track record reads as low expertise. |
| Authoritativeness | 25% | 25 | `sameAs` to LinkedIn, GitHub, Instagram only. No reviews, no press, no Google Business Profile link, no external citations, no directory listings, single-page site with no blog or resource that could earn links. |
| Trustworthiness | 30% | 50 | HTTPS, canonical, honest bio, `mailto:david@osgdev.com` on CTAs. Weak points: no visible email/phone/address in rendered page (the email text lives only in `<noscript>`), no privacy or terms page, no business registration or location beyond `addressCountry: LB`, email domain (osgdev.com) does not match site domain (davidgeha.dev) and osgdev.com is never explained on the page. |
| **Weighted total** | | **41** | |

## Findings (by severity)

### HIGH

1. **Thin content for the query intent.** The rendered page has 205 words of main copy (359 including nav, marquee, footer). This page is simultaneously the homepage (500 min), the service page (800 min) and the location page (500-600 min) for the whole business. Competitors ranking for the three targets run 2,000-2,500 words with sections on services, process, pricing, use cases and FAQs. The gap is not a word-count problem per se, it is that the page never answers what a searcher for "AI consulting Lebanon" wants: what is offered, for whom, how it works, what it costs, what results it produced.
   - Pending local `Services.jsx` (~330 words) and `Faq.jsx` (~400 words) bring main copy to ~960 words. That is a good first step but still well under the competitive floor.

2. **Target keyword coverage in visible copy is near zero.** Counts in the *rendered visible body* (what Googlebot indexes after JS):
   - "AI consultant" + "Lebanon" as one phrase: 0 (only in `<title>`, meta description, JSON-LD and `<noscript>`). Visible copy has "AI Consultant" (header, H2) and "Lebanon" (about paragraph, hero tagline) separately.
   - "AI consulting": 0. "AI solutions": 0. "Beirut": 0. "Lebanese": 0.
   - Pending local changes fix most of this (Services H2 "AI consulting & AI solutions in Lebanon", "Beirut" x2, "Lebanese" x3, "AI consulting" x3, "AI solutions" x3, "AI consultant in Lebanon" x1). Still missing after they ship: an H2/H3 that literally contains "AI consulting Lebanon" or "AI consulting in Lebanon", and "AI solutions Lebanon" in a heading.

3. **FAQPage schema with no visible FAQ on the live page.** JSON-LD declares four Q&As; none are rendered in the DOM. This violates Google's structured data content policy (markup must describe content visible to users) and is the kind of mismatch that gets structured data ignored or manually actioned. The uncommitted `Faq.jsx` + `content/faq.js` resolve this and the comment in `faq.js` correctly notes the sync requirement. Ship it before anything else, or remove the FAQPage block until it ships.

4. **Non-JS crawlers see 46 words.** `raw_content` (pre-render HTML) contains only the `<noscript>` block. GPTBot, ClaudeBot, PerplexityBot, and most citation-oriented crawlers do not execute JavaScript, so for AI answer engines the entire site is one paragraph plus an email. The `<noscript>` fallback and `llms.txt` are smart mitigations, but they cannot carry the "AI consulting Lebanon" argument on their own. Prerendering or static HTML export (Vite SSG / `vite-plugin-prerender` / build-time HTML snapshot) is the structural fix; the second-best option is expanding the `<noscript>` block to mirror the Services and FAQ copy word for word.

### MEDIUM

5. **No proof of results anywhere.** Zero numbers on the page: no hours saved, no response rates from the outreach engine, no ad volumes from the image pipeline, no report time reduced for the F&B client. The pending Services copy repeatedly promises "a number for the hours it gives back" and "measure the hours saved" but the page never shows one. Even a single anonymised line per build ("F&B consultancy: daily inventory report went from ~45 min manual to zero, Mar 2026") converts each build card from a claim to a quotable fact and directly feeds AI citation.

6. **No case study depth.** Each "Recent Build" is one sentence. Selected Work cards have a title, a category and a year, no description. For a services business, the work section is where Experience is demonstrated; it currently demonstrates only that work exists.

7. **Two H1s and a split-word H1.** Rendered H1 text is "DavidGeha" (two spans, no space) plus a second H1 inside `<noscript>`. The visible H1 carries no target keyword. Recommend a single H1 such as "David Geha, AI Consultant in Lebanon" (keep the visual split with CSS, add a space or `aria-label`).

8. **Trust page basics missing.** No visible email address, no phone, no city (Beirut appears nowhere in live rendered copy), no privacy notice, no explanation of osgdev.com. For a "consultant in Lebanon" query Google's local/YMYL-adjacent expectations include a verifiable location.

9. **No freshness signal beyond the build dates.** No `dateModified`/`datePublished` in `WebPage` schema (pending local index.html adds a `WebPage` node; confirm it carries `dateModified`). The dated build timeline (through June 2026) is a genuinely strong freshness cue and should stay.

### LOW

10. **Readability is fine but the pending copy trends long.** Live main copy: Flesch Reading Ease 33-45, grade 9-12 (short but dense sentences). Pending Services/FAQ copy: FRE 57, grade 10, avg 18 words/sentence, 11 sentences over 25 words. Break the longest FAQ answers into two sentences; target 15-17 words average.

11. **Repetition in rendered DOM.** `content_quality.py` on the full rendered HTML flags `repetitive` (repetition_score 30) because the marquee is duplicated (`aria-hidden` clone for the loop). Harmless for users, slightly dilutes token-level uniqueness; no action beyond keeping the clone `aria-hidden`.

12. **Meta keywords tag present.** Ignored by Google since 2009; harmless but signals dated SEO practice. Optional removal.

## What works

- Honest, specific, first-person bio with a real institution (AUB) and real stack. `content_quality.py`: filler 0, AI-pattern 0, information density 0.71 on main copy. No generic "unlock the power of AI" prose. This is exactly the anti-pattern the Sept 2025 QRG rewards avoiding.
- Dated build timeline is a strong Experience and freshness signal, and each entry is written as a quotable one-liner.
- Title tag is well targeted ("AI Consultant in Lebanon - David Geha | Agentic AI Automation") and metadata is not templated (`metadata_template.py`: `site_risk: low`, no flags).
- Entity graph is above average for a solo consultant: Person + ProfessionalService + WebSite linked by `@id`, `alumniOf`, `knowsAbout`, `sameAs`. Pending local changes add Beirut, geo coordinates, Wikidata `sameAs` for Lebanon/Beirut, OfferCatalog and languages, which is the right direction for entity disambiguation.
- `<noscript>` fallback and `llms.txt` show the author already thought about non-JS and AI crawlers.
- Pending Services copy is written in the right register for GEO: each block is a self-contained answer with a named audience and a named outcome.

## Keyword and entity coverage matrix (rendered visible copy)

| Term | Live | After pending changes | Where it should live |
|---|---|---|---|
| AI consultant Lebanon / in Lebanon | 0 (title/meta/noscript only) | 1 | H1, first paragraph, FAQ Q1 |
| AI consulting Lebanon | 0 | 0 exact ("AI consulting" x3, "Lebanon" nearby) | Services H2 should read "AI consulting in Lebanon: ..." |
| AI solutions Lebanon | 0 | 0 exact ("AI solutions" x3) | Service 03 heading: "Custom AI solutions in Lebanon" |
| Beirut | 0 | 2 | About paragraph, footer, contact block |
| Lebanese | 0 | 3 | Fine |
| Agentic AI | 7 | 12 | Fine, watch density |
| AUB / American University of Beirut | 1 | 1 | Spell out once in About for entity match with schema |
| Pricing / cost | 0 | 5 | FAQ, fine |
| Results / hours saved / % | 0 | 1 (promise, not a number) | Build cards, Services 04 |

## AI citation readiness: 45/100 (live), ~65 projected

- Present: Person/ProfessionalService/FAQPage/WebSite schema, `llms.txt`, `<noscript>` summary, canonical, `max-snippet:-1`, quotable one-line build descriptions.
- Missing: any content in raw HTML beyond 46 words; visible definitional sentences ("An AI consultant in Lebanon is..."); numeric facts; a visible FAQ; author page or bio anchor (`#about` with `Person` `mainEntityOfPage`); `dateModified`; an "As seen on / clients include" line; comparison content (in-house vs agency vs independent consultant in Lebanon), which is what jonahtebaa.com is ranking with.

## Prioritised recommendations

1. Ship the pending Services + FAQ + index.html/llms.txt changes (resolves FAQ schema mismatch, adds ~750 words, adds "AI consulting" / "AI solutions" / "Beirut").
2. Fix rendering for non-JS crawlers: prerender to static HTML at build time, or expand `<noscript>` to mirror Services and FAQ verbatim. Without this, AI answer engines will keep citing competitors.
3. Add a "Results" line to each of the six builds with one concrete, anonymised number and a 2-3 sentence problem/solution/outcome expansion (adds ~300-400 words of genuine Experience content).
4. Add a proper location/contact block: "Based in Beirut, Lebanon", visible email, working languages (EN/AR/FR are already in pending schema), optional WhatsApp. Explain osgdev.com in one clause or move email to @davidgeha.dev.
5. Single H1 containing "AI Consultant in Lebanon"; put exact-match "AI consulting in Lebanon" and "AI solutions in Lebanon" in H2/H3s.
6. Add a 600-900 word section that competitors have and this page does not: "How AI consulting works in Lebanon" (typical engagement, timelines, what Lebanese SMEs automate first, why agentic vs chatbot, data ownership, payment/currency practicalities). This is the fastest route from ~960 to ~1,800 words with content that is actually useful rather than padded.
7. Add `dateModified` to the `WebPage` node and update it on each content change; keep the dated build timeline current.
8. Long-term Authoritativeness: one or two off-site signals (LinkedIn articles, a GitHub README for an open-sourced pipeline, a listing on a Lebanese tech directory, a client testimonial with name and company) linked via `sameAs`/`citation`.

## Script outputs

- `metadata_template.py`: templated false, site_risk low, no flags.
- `content_quality.py` (extracted_text): overall 83, filler 0, ai_pattern 0, density 0.708, repetition 9, flags `thin-content`, tokens 212 / unique 136.
- `content_quality.py` (rendered HTML): overall 96, repetition 30, flags `repetitive` (marquee clone).
- Readability (computed): live main copy FRE 32.8 / FK grade 11.7; live visible body FRE 45.1 / grade 9.3; projected FRE 54.6 / grade 9.2.
- `nlp_analyze.py` not run (requires Google Cloud NL API key).
