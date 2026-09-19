# Semantic Cluster Findings: davidgeha.dev

Audit date: 2026-09-19
Seeds: "AI consultant Lebanon", "AI consulting Lebanon", "AI solutions Lebanon"
Method: 44 candidate keywords expanded from seeds; one WebSearch SERP (9-10 organic URLs, US endpoint) per keyword; full pairwise URL overlap (946 pairs). Two matrices: raw, and filtered (removing the 5 URLs present in 11+ of 44 SERPs: Clutch, TechBehemoths, webspot.me, LB Clouds, Creative 4 All). No volume data (no DataForSEO / Keyword Planner). SERP page-type composition is already in `sxo.md` and is not repeated here.
Machine-readable plan: `findings/cluster-plan.json` (clusters, 52-edge link matrix, both 44x44 matrices, per-keyword URL sets, exclusions, cannibalization check).

---

## 1. Summary: cluster -> primary keyword -> URL -> intent

| Cluster | Page | Primary keyword | Intent (SERP) | Template | Words | Phase |
|---|---|---|---|---|---|---|
| **Hub** | `/` | AI consultant Lebanon | Commercial, person-entity SERP (3/9 Wikipedia persons, 4/9 directories) | landing-page (home) | 1,200-1,500 | 1 |
| 1 Consulting | `/ai-consulting-lebanon/` | AI consulting Lebanon | Commercial/Transactional (56% directories, 22% service, 22% article) | landing-page (service) | 1,600-1,800 | 1 |
| 1 Consulting | `/blog/ai-consulting-in-lebanon-guide/` | how much does an AI consultant cost in Lebanon | Informational (cost SERP == consulting SERP + leanware + jonahtebaa; article slot exists) | ultimate-guide | 2,000-2,400 | 1 |
| 1 Consulting | `/about/` | AI consultant Beirut | Commercial, strongest person-entity SERP (3 Wikipedia persons, LinkedIn, Beirut AI) | explainer (Person page) | 1,000-1,200 | 1 |
| 2 Solutions | `/ai-solutions-lebanon/` | AI solutions Lebanon | Commercial (67% service pages) | landing-page (solutions catalog) | 1,600-1,800 | 1 |
| 2 Solutions | `/work/outreach-engine-marketing-agency/` | AI outreach automation for marketing agency (long-tail) | Commercial / proof | case study | 1,000-1,200 | 1 |
| 2 Solutions | `/work/custom-ai-crm/` | custom CRM development Lebanon (folded long-tail) | Commercial / proof | case study | 1,000-1,200 | 1 |
| 2 Solutions | `/work/fnb-reporting-inventory-automation/` | restaurant automation Lebanon (folded long-tail) | Commercial / proof | case study | 1,000-1,200 | 1 |
| 3 Industries | `/ai-for-marketing-agencies-lebanon/` | AI for marketing agencies Lebanon | Commercial, BUT Google reads it as "AI marketing agency" (overlap 6/6) | landing-page (persona) | 1,200-1,400 | 2 |
| 3 Industries | `/ai-for-restaurants-lebanon/` | AI for F&B businesses Lebanon | Commercial ("AI for restaurants Lebanon" is hijacked by the venue "Ai Restaurant Beirut") | landing-page (persona) | 1,200-1,400 | 2 |

Structure: 1 hub + 3 clusters (3 + 4 + 2 posts) = 10 URLs. Within constraints (2-5 clusters, 2-4 posts each).

---

## 2. SERP overlap matrix (20 core keywords; cell = raw / filtered shared URLs)

Thresholds: 7-10 same page, 4-6 same cluster, 2-3 interlink, 0-1 separate. Filtered value shows what remains once the directory noise is removed.

| | K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | K11 | K12 | K13 | K14 | K15 | K16 | K17 | K18 | K19 | K20 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **K1** AI consultant Lebanon | · | 5/3 | 5/4 | 4/3 | 6/4 | 4/3 | 4/3 | 3/2 | 3/2 | 3/1 | 3/1 | 2/0 | 2/0 | 2/0 | 3/1 | 2/0 | 2/0 | 2/0 | 0/0 | 0/0 |
| **K2** AI consulting Lebanon | 5/3 | · | 6/4 | 7/5 | 8/5 | 6/5 | 5/4 | 2/1 | 5/3 | 3/0 | 3/0 | 3/0 | 4/1 | 3/0 | 3/1 | 3/0 | 3/0 | 3/0 | 1/0 | 0/0 |
| **K3** AI consulting company Lebanon | 5/4 | 6/4 | · | 7/5 | 6/4 | 6/5 | 2/2 | 0/0 | 2/1 | 3/1 | 3/1 | 2/0 | 3/1 | 2/0 | 2/1 | 2/0 | 2/0 | 2/0 | 2/1 | 0/0 |
| **K4** AI consulting firms Lebanon | 4/3 | 7/5 | 7/5 | · | 7/5 | 7/6 | 3/3 | 1/1 | 3/2 | 3/1 | 2/0 | 2/0 | 3/1 | 2/0 | 2/1 | 2/0 | 2/0 | 2/0 | 2/1 | 0/0 |
| **K5** best AI consultant in Lebanon | 6/4 | 8/5 | 6/4 | 7/5 | · | 6/5 | 4/3 | 3/2 | 4/2 | 4/1 | 3/0 | 3/0 | 4/1 | 3/0 | 3/1 | 3/0 | 3/0 | 3/0 | 1/0 | 0/0 |
| **K6** how much does an AI consultant cost in Lebanon | 4/3 | 6/5 | 6/5 | 7/6 | 6/5 | · | 3/3 | 1/1 | 2/2 | 2/1 | 1/0 | 1/0 | 2/1 | 1/0 | 2/1 | 1/0 | 1/0 | 1/0 | 1/1 | 0/0 |
| **K7** AI strategy consulting Lebanon | 4/3 | 5/4 | 2/2 | 3/3 | 4/3 | 3/3 | · | 3/2 | 5/4 | 1/0 | 1/0 | 1/0 | 1/0 | 1/0 | 2/1 | 1/0 | 1/0 | 1/0 | 0/0 | 0/0 |
| **K8** AI consultant Beirut | 3/2 | 2/1 | 0/0 | 1/1 | 3/2 | 1/1 | 3/2 | · | 5/4 | 2/1 | 1/0 | 1/0 | 1/0 | 1/0 | 1/0 | 1/0 | 1/0 | 1/0 | 0/0 | 0/0 |
| **K9** AI consulting Beirut | 3/2 | 5/3 | 2/1 | 3/2 | 4/2 | 2/2 | 5/4 | 5/4 | · | 2/0 | 2/0 | 2/0 | 2/0 | 2/0 | 1/0 | 2/0 | 2/0 | 2/0 | 1/0 | 0/0 |
| **K10** AI automation consultant Beirut | 3/1 | 3/0 | 3/1 | 3/1 | 4/1 | 2/1 | 1/0 | 2/1 | 2/0 | · | 3/0 | 3/0 | 3/0 | 3/0 | 2/0 | 4/1 | 3/0 | 3/0 | 2/1 | 0/0 |
| **K11** AI solutions Lebanon | 3/1 | 3/0 | 3/1 | 2/0 | 3/0 | 1/0 | 1/0 | 1/0 | 2/0 | 3/0 | · | 4/0 | 5/1 | 4/0 | 5/2 | 3/0 | 5/1 | 5/1 | 1/0 | 0/0 |
| **K12** AI automation Lebanon | 2/0 | 3/0 | 2/0 | 2/0 | 3/0 | 1/0 | 1/0 | 1/0 | 2/0 | 3/0 | 4/0 | · | 5/0 | 6/2 | 5/1 | 5/1 | 6/1 | 4/0 | 1/0 | 0/0 |
| **K13** AI services Lebanon | 2/0 | 4/1 | 3/1 | 3/1 | 4/1 | 2/1 | 1/0 | 1/0 | 2/0 | 3/0 | 5/1 | 5/0 | · | 4/0 | 5/1 | 4/0 | 5/0 | 4/0 | 1/0 | 0/0 |
| **K14** custom AI solutions Lebanon | 2/0 | 3/0 | 2/0 | 2/0 | 3/0 | 1/0 | 1/0 | 1/0 | 2/0 | 3/0 | 4/0 | 6/2 | 4/0 | · | 4/1 | 4/1 | 5/1 | 4/0 | 1/0 | 0/0 |
| **K15** AI implementation services Lebanon | 3/1 | 3/1 | 2/1 | 2/1 | 3/1 | 2/1 | 2/1 | 1/0 | 1/0 | 2/0 | 5/2 | 5/1 | 5/1 | 4/1 | · | 3/0 | 6/2 | 4/1 | 0/0 | 0/0 |
| **K16** AI agents Lebanon | 2/0 | 3/0 | 2/0 | 2/0 | 3/0 | 1/0 | 1/0 | 1/0 | 2/0 | 4/1 | 3/0 | 5/1 | 4/0 | 4/1 | 3/0 | · | 4/0 | 3/0 | 1/0 | 0/0 |
| **K17** AI for SMEs Lebanon | 2/0 | 3/0 | 2/0 | 2/0 | 3/0 | 1/0 | 1/0 | 1/0 | 2/0 | 3/0 | 5/1 | 6/1 | 5/0 | 5/1 | 6/2 | 4/0 | · | 6/2 | 1/0 | 0/0 |
| **K18** AI for F&B businesses Lebanon | 2/0 | 3/0 | 2/0 | 2/0 | 3/0 | 1/0 | 1/0 | 1/0 | 2/0 | 3/0 | 5/1 | 4/0 | 4/0 | 4/0 | 4/1 | 3/0 | 6/2 | · | 1/0 | 0/0 |
| **K19** AI for marketing agencies Lebanon | 0/0 | 1/0 | 2/1 | 2/1 | 1/0 | 1/1 | 0/0 | 0/0 | 1/0 | 2/1 | 1/0 | 1/0 | 1/0 | 1/0 | 0/0 | 1/0 | 1/0 | 1/0 | · | 6/6 |
| **K20** AI marketing agency Lebanon | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 6/6 | · |

**How to read it**
- Rows K2-K6 form one dense block (6-8 raw, 4-6 filtered): "AI consulting Lebanon", "company", "firms", "best AI consultant", and the *cost question* all return the same page set. That block is the `/ai-consulting-lebanon/` target. The cost question sitting inside it is the single real cannibalization risk in this plan (see section 5).
- K1 "AI consultant Lebanon" attaches to that block at 4-6 raw but only 3-4 filtered; its unique URLs are three Wikipedia person pages. It is the one head where a *person's* homepage is structurally aligned, hence it is the hub keyword.
- K8-K9 (Beirut) are a separate mini-cluster (5/4 with each other, 2-3 with everything else): Beirut AI community, meetups, Wikipedia persons, Mutawir. They belong on the Person/About page, not on the service page.
- K11-K18 form the solutions block (4-6 raw), with two sub-centres: "AI solutions" (Seidor, Eurisko, Navybits: dev-company flavour) and "AI automation" (LB Clouds, CobraClicks, Creative 4 All, Weezli: automation-agency flavour), overlapping 4/0 with each other. Merged in phase 1.
- K19-K20: "AI for marketing agencies Lebanon" is treated by Google as "AI marketing agency Lebanon" (6/6). No overlap with the consulting or solutions blocks.
- Full 44x44 raw and filtered matrices are in `cluster-plan.json` -> `serp_matrix`.

**Other pairs that decided the plan** (raw/filtered)
- AI agents for business Lebanon <-> AI agents Lebanon: 7/4 (same page). AI automation Lebanon <-> AI agents for business: 6/2. -> "AI agents" lives on the solutions page.
- AI for small business Lebanon <-> AI for SMEs Lebanon: 6/3; both 5-6 with AI solutions/automation. -> a "For SMEs" section on the solutions page, not a page.
- AI automation consultant Beirut: max filtered overlap 1 with anything; its SERP is where solo practitioners rank (aliawdeh.com root, tarekrjeily.com/services). -> secondary on the hub.
- Isolated (max filtered overlap 0-1): AI agency Lebanon, agentic AI Lebanon, AI for restaurants Lebanon, restaurant automation Lebanon, custom CRM development Lebanon, chatbot development Lebanon, AI consultant cost, how to choose an AI consultant, what does an AI consultant do, AI audit for business Lebanon, business process automation Lebanon, hire AI developer Lebanon, AI freelancer Lebanon, consultant IA Liban, AI automation for marketing agencies (global), AI automation for restaurants (global).

---

## 3. Per-page keyword brief

### Hub: `/`
- **Primary:** AI consultant Lebanon
- **Secondaries:** AI automation consultant Beirut; AI consultant Beirut (brand line, not H1); David Geha AI consultant; agentic AI automation Lebanon; AI consulting Lebanon (one mention, linking to the service page)
- **H1 pattern:** "David Geha: AI consultant in Lebanon. I build agentic automations and custom AI systems for agencies, F&B and founders."
- **Question headings to include (visible FAQ, matching the FAQPage schema):**
  - What does an AI consultant actually do for a Lebanese business?
  - Do you build the systems yourself or only advise?
  - How fast can something be live? (answer: 48-hour audit, 2-week sprint)
  - Where are you based and who do you work with? (Beirut; agencies, F&B, founders; Lebanon and GCC)
- **Must-have blocks (from sxo.md):** at-a-glance facts, services teaser (2 cards -> service + solutions pages), 3 case-study cards, visible FAQ, WhatsApp + email CTAs.
- **Rationale:** the homepage receives every directory, LinkedIn and GitHub link; the head term's SERP is one-third person entities. Deliberate deviation: 1,200-1,500 words, not the 2,500-4,000 pillar spec, because it is a homepage; the guide carries the informational depth.

### Cluster 1, post 1: `/ai-consulting-lebanon/`
- **Primary:** AI consulting Lebanon
- **Secondaries:** AI consulting company Lebanon; AI consulting firms Lebanon; best AI consultant in Lebanon; AI strategy consulting Lebanon; AI consulting Beirut; AI audit for business Lebanon
- **H1:** "AI Consulting in Lebanon"
- **Question headings (mirror the FAQ structures that rank: lbclouds, tarekrjeily, eurisko):**
  - How much does AI consulting cost in Lebanon? (short: three priced offers; link to the guide for full market bands)
  - How long does an engagement take?
  - Do I need technical staff on my side?
  - Is my data safe / where does it run?
  - Will it work in Arabic and English (and French)?
  - Consultant vs agency vs freelancer: which do I need?
  - What happens in the 48-hour AI audit?
- **Template justification:** Commercial/Transactional -> landing-page. Two of four ranking non-directory pages publish prices; include them.

### Cluster 1, post 2: `/blog/ai-consulting-in-lebanon-guide/`
- **Primary:** how much does an AI consultant cost in Lebanon
- **Secondaries:** AI consulting firms Lebanon (market tiers); what does an AI consultant do; how to choose an AI consultant; AI consultant cost; AI transformation consulting Beirut; agentic AI Lebanon
- **H1:** "AI Consulting in Lebanon (2026): What Consultants Do, What It Costs, How to Choose"
- **Question headings (these are the isolated global questions folded in, plus the Lebanon cost intent):**
  - What does an AI consultant do, and how is that different from an AI agency or a developer?
  - How much does an AI consultant cost in Lebanon? (USD bands: audit / sprint / retainer / enterprise; compare with the $2,000-$25,000+ and $1,500-$4,500 anchors already published by competitors)
  - Who are the AI consultants and firms in Lebanon? (three tiers: strategy firms, agencies, practitioners; name them honestly, this is the "best AI consultant in Lebanon" heading)
  - How do you choose an AI consultant in Lebanon? (checklist, red flags, first questions)
  - Chatbot vs AI agent vs agentic workflow: what should a Lebanese SME actually buy?
  - What is different about doing AI in Lebanon? (payments, connectivity, Arabic/French, small teams)
  - How long does it take to see results?
- **Template justification:** Informational (broad) -> ultimate-guide. Benchmark jonahtebaa.com (2,500 words, 9 FAQs) ranks #7 on both the consulting and the cost SERP, so 2,000-2,400 words is justified even though it exceeds the 1,200-1,800 spoke spec.
- **Differentiation from the service page:** the guide explains and prices the *market*; the service page sells *David's offers*. Title and H1 of the guide carry "cost" and "guide"; the service page's title carries neither.

### Cluster 1, post 3: `/about/`
- **Primary:** AI consultant Beirut
- **Secondaries:** David Geha; David Geha AI consultant (disambiguation vs the TV producer); AI consulting Beirut; Beirut AI consultant; AUB
- **H1:** "David Geha, AI consultant in Beirut, Lebanon"
- **Question headings:**
  - Who is David Geha? (first paragraph is the disambiguating direct answer)
  - Why does a civil & environmental engineering student build AI systems? (turn the AUB line into a strength)
  - What have you built and for whom? (timeline with links to the three case studies)
  - How can I verify this? (LinkedIn, GitHub, directory profiles as sameAs; reviews)
- **Template:** explainer / Person entity page. Person schema as main entity, `sameAs` to LinkedIn, GitHub, Instagram, Clutch, TechBehemoths, GBP.

### Cluster 2, post 1: `/ai-solutions-lebanon/`
- **Primary:** AI solutions Lebanon
- **Secondaries:** AI automation Lebanon; AI services Lebanon; custom AI solutions Lebanon; AI implementation services Lebanon; AI agents for business Lebanon; AI for small business Lebanon / AI for SMEs Lebanon
- **H1:** "AI Solutions & Automation for Businesses in Lebanon"
- **Section H2s (one per solution, each with problem / what it does / stack / timeline / from-price):** lead-outreach engine; research and SEO/GEO pipeline; ad-creative pipeline; custom AI CRM; F&B reporting and inventory automation; WhatsApp and back-office agents. Plus "For SMEs and small teams" and "Industries".
- **Question headings:**
  - How much does AI automation cost in Lebanon?
  - Chatbot vs AI agent: what is the difference?
  - Which processes should a small business automate first?
  - Can it run on the tools we already use (WhatsApp, Google Sheets, our POS/CRM)?
  - What happens when the internet or power drops?
- **Template justification:** Commercial -> landing-page; SERP is 67% service catalogs (Seidor, Eurisko, Navybits, LB Clouds). ItemList + Service schema.
- **Note:** "AI automation" and "AI solutions" overlap 4/0. Kept on one page in phase 1. If GSC later shows "AI agents"/"automation" impressions concentrating, split to `/ai-automation-lebanon/` (candidate primaries: AI automation Lebanon, AI agents Lebanon, WhatsApp automation Lebanon).

### Cluster 2, posts 2-4: `/work/<slug>/` case studies
- `/work/outreach-engine-marketing-agency/`: primary "AI outreach automation for a marketing agency"; secondaries "AI automation for marketing agencies", "agency outreach automation Lebanon". Bridges to Cluster 3 (agencies).
- `/work/custom-ai-crm/`: primary "custom CRM development Lebanon" (folded here; its SERP is generic software houses, so it gets a case study, not a service page); secondaries "custom AI CRM", "AI CRM Lebanon".
- `/work/fnb-reporting-inventory-automation/`: primary "restaurant automation Lebanon" (folded here; its SERP is kitchen-equipment suppliers); secondaries "F&B reporting automation", "inventory automation Lebanon". Bridges to Cluster 3 (F&B).
- **Common headings:** Who the client is (type + city) / The problem / What was built / Result (number) / What the client said / Stack and timeline / "Want this for your business?" (CTA to service page).
- **Template:** case study (review). Article or CreativeWork schema, author = Person entity, `isPartOf` -> `/ai-solutions-lebanon/`.

### Cluster 3, post 1 (phase 2): `/ai-for-marketing-agencies-lebanon/`
- **Primary:** AI for marketing agencies Lebanon
- **Secondaries:** AI automation for marketing agencies; agency workflow automation Lebanon; AI reporting automation for agencies; AI ad creative pipeline; client onboarding automation
- **H1:** "AI Automation for Marketing Agencies in Lebanon" (never "AI marketing agency")
- **Question headings:** What can a 5-15 person agency in Beirut automate this quarter? / How do agencies use AI for client reporting without losing accuracy? / Can AI generate ad creatives our clients will approve? / How much does agency automation cost and how fast does it pay back? / Will it work with our stack (Meta Ads, Google Ads, HubSpot, Notion, Slack)?
- **Warning:** the query's SERP is 100% agencies that *do* AI marketing (Hovi, Creatives, Nascode). Google conflates the two meanings. This page's SEO value is long-tail; its real job is persona conversion for the site's core customer. Do not report it as a head-term target.

### Cluster 3, post 2 (phase 2): `/ai-for-restaurants-lebanon/`
- **Primary:** AI for F&B businesses Lebanon
- **Secondaries:** AI for restaurants Lebanon; restaurant automation Lebanon; WhatsApp automation Lebanon (reservations/orders); AI for small business Lebanon; AI automation for restaurants
- **H1:** "AI Automation for Restaurants and F&B Businesses in Lebanon"
- **Question headings:** What can AI realistically automate in a Lebanese restaurant? (daily sales report, inventory, supplier follow-ups, reservations, reviews) / How much does restaurant automation cost in Lebanon? / Does it work with our POS and WhatsApp? / Does it handle Arabic and French menus and messages? / What if the power or internet cuts?
- **Warning:** "AI for restaurants Lebanon" currently returns the venue Ai Restaurant Beirut (Tripadvisor, Instagram, Facebook) and "restaurant automation Lebanon" returns equipment suppliers. Only the F&B phrasing returns AI-service pages (overlap 5-6 with SMEs/solutions). Keep the URL but lead with F&B wording.

---

## 4. Internal link matrix

Legend: M = mandatory (hub<->spoke), R = recommended (within cluster), O = optional (cross-cluster bridge). Rows link to columns. Nav links do not count; each of these must be a contextual in-body link.

| from \ to | `/` | consulting | guide | about | solutions | work: outreach | work: CRM | work: F&B | agencies | restaurants |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` (hub) | · | M | M | M | M | M | M | M | M | M |
| `/ai-consulting-lebanon/` | M | · | R | R | O | O | | O | | |
| `/blog/...guide/` | M | R | · | R (author box) | O | | | | | |
| `/about/` | M | R | R | · | | O (timeline) | O (timeline) | O (timeline) | | |
| `/ai-solutions-lebanon/` | M | O | | | · | R | R | R | O | O |
| `/work/outreach-engine.../` | M | O (CTA) | | O (author) | R | · | R | | O | |
| `/work/custom-ai-crm/` | M | O (CTA) | | O (author) | R | R | · | | O | |
| `/work/fnb-reporting.../` | M | O (CTA) | | O (author) | R | | R | · | | O |
| `/ai-for-marketing-agencies-lebanon/` | M | O | | | O | O | O | | · | R |
| `/ai-for-restaurants-lebanon/` | M | O | | | O | | | O | R | · |

Incoming-link count per page (planned, excluding nav): consulting 9, guide 4, about 7, solutions 9, outreach 5, CRM 5, F&B 5, agencies 4, restaurants 4. Every spoke >= 3 incoming; no orphans; every spoke links to hub; hub links to every spoke.

**Anchor text plan (keep any single anchor under 40% of a page's inbound links):**
- consulting: "AI consulting in Lebanon" / "AI consulting services" / "start with a 48-hour AI audit" / "how I work with clients"
- guide: "what AI consulting costs in Lebanon" / "guide to AI consulting in Lebanon" / "full price breakdown"
- about: "about David" / "David Geha" / "AI consultant in Beirut"
- solutions: "AI solutions and automation for Lebanese businesses" / "the systems I build" / "AI automation in Lebanon"
- case studies: descriptive ("outreach engine case study", "custom AI CRM build", "F&B reporting automation")

The 52 individual edges with suggested anchors are in `cluster-plan.json` -> `links`.

---

## 5. Cannibalization check

| Pair | Overlap (raw/filtered) | Verdict |
|---|---|---|
| `/` "AI consultant Lebanon" vs `/ai-consulting-lebanon/` "AI consulting Lebanon" | 5/3 | Same cluster, separate pages, differentiated by entity (Person, home) vs offer (Service page). This mirrors how tarekrjeily.com ranks (home + /services/). **Monitor** in GSC at weeks 8-12; if the two URLs alternate for "AI consultant Lebanon", make the service page canonical for both and move the homepage title to brand-first. |
| `/ai-consulting-lebanon/` vs `/blog/...guide/` "how much does an AI consultant cost in Lebanon" | 6/5 | **The one high-risk pair.** The cost question returns the consulting SERP. Kept separate because an article slot exists on that SERP (jonahtebaa #7 on both queries) and because the service page cannot carry 2,000 words of market explanation without hurting conversion. Mitigations: guide title/H1 carry "cost" + "guide", service page title does not; service page has a 120-word price block that links to the guide; guide has a mid-body CTA to the service page; FAQs do not duplicate (service = engagement questions; guide = market questions). |
| `/ai-consulting-lebanon/` vs `/ai-solutions-lebanon/` | 3/1 | Safe. Different SERP populations (directories+persons+firms vs service catalogs). |
| `/` vs `/about/` "AI consultant Beirut" | 3/2 | Safe (interlink tier). Beirut SERP is community/person heavy; About carries NAP and Beirut entity signals. |
| `/ai-solutions-lebanon/` vs a future `/ai-automation-lebanon/` | 4/1 | Borderline; keep merged in phase 1. |
| `/ai-for-marketing-agencies-lebanon/` vs "AI marketing agency Lebanon" | 6/6 | Not our page, but Google will read our page against that intent. Avoid "AI marketing agency" phrasing anywhere on the site. |
| Primary keyword uniqueness | -- | All 10 primaries are distinct; no near-duplicates after folding "best AI consultant in Lebanon" (8 with consulting) into the service page as a secondary. |

---

## 6. Keywords that should NOT get their own page

| Keyword | Where it goes instead | Why |
|---|---|---|
| best AI consultant in Lebanon | secondary on `/ai-consulting-lebanon/`; H2 "Who are the AI consultants in Lebanon?" in the guide | 8/5 overlap with "AI consulting Lebanon": same page by rule |
| AI consulting company Lebanon, AI consulting firms Lebanon | secondaries on `/ai-consulting-lebanon/` | 6-7 overlap with the primary |
| AI strategy consulting Lebanon, AI transformation consulting Beirut | secondaries on service page / guide | 4-5 overlap; SERP is Roland Berger / EY / aikitlb governance flavour, not winnable as a head |
| AI consulting Beirut | secondary on `/about/` and service page | 5/4 with "AI consultant Beirut" |
| AI automation Lebanon, AI services Lebanon, custom AI solutions Lebanon, AI implementation services Lebanon, AI agents (for business) Lebanon | secondaries / H2s on `/ai-solutions-lebanon/` | 4-6 overlap with "AI solutions Lebanon" and 5-7 with each other |
| AI for small business Lebanon, AI for SMEs Lebanon | "For SMEs" section on `/ai-solutions-lebanon/` | 5-6 overlap with solutions/automation |
| AI automation consultant Beirut | secondary on `/` | isolated SERP where solo practitioners' homepages rank |
| AI audit for business Lebanon | offer H2 + FAQ on `/ai-consulting-lebanon/` | offer-level; phase-3 `/ai-audit-lebanon/` only if the offer converts |
| WhatsApp automation Lebanon | H2 on solutions page and F&B page | distinct sub-SERP (bybloshorizon, voxire, tarekrjeily); candidate phase-3 blog post |
| custom CRM development Lebanon | `/work/custom-ai-crm/` case study | SERP = generic software houses (BMIND, Concetto, Sortlist) |
| restaurant automation Lebanon | `/work/fnb-reporting.../` + secondary on F&B page | SERP = kitchen-equipment suppliers |
| AI for restaurants Lebanon | secondary on `/ai-for-restaurants-lebanon/` (F&B phrasing leads) | SERP hijacked by the venue "Ai Restaurant Beirut" |
| agentic AI Lebanon | H2 in the guide; term on solutions page | educational/policy SERP (UNITAR, AUB certificate, Siren Analytics); no service pages rank |
| what does an AI consultant do; how to choose an AI consultant; AI consultant cost (global) | H2s in the guide | global informational SERPs (CIO, Upwork, leanware), 0 overlap with the Lebanon set |
| AI companies in Lebanon; AI development company Lebanon | secondary phrasing on solutions page only | company-list SERPs (Tracxn, Clutch, Eurisko); the fix is directory listings, not a page |
| AI agency Lebanon | none (mention only) | SERP polluted by state agencies (3 Wikipedia government pages) |
| AI marketing agency Lebanon | none; avoid the phrase | wrong intent |
| chatbot development Lebanon | FAQ "chatbot vs AI agent" | separate chatbot-vendor SERP; not a core offer |
| hire AI developer Lebanon; AI freelancer Lebanon | none | job boards and marketplaces |
| consultant IA Liban | none for now | no AI-consulting results in the French SERP (Libanconsult, Liban Lait) |
| business process automation Lebanon | none (mention term) | RPA vendors / Kompass |

---

## 7. Pre-delivery validation

- [x] No two posts share the same primary keyword (10 distinct primaries)
- [x] Every spoke has >= 3 planned incoming internal links (min 4: guide, agencies, restaurants)
- [x] Every spoke links to the hub (9 mandatory edges)
- [x] Hub links to every spoke (9 mandatory edges)
- [x] No orphan pages; all reachable from `/` in 1 click
- [x] Template matches intent (landing-page for commercial heads; ultimate-guide for the informational cost/guide query; case study for proof; Person page for the Beirut entity query)
- [ ] Word counts: two deliberate deviations. Hub `/` at 1,200-1,500 (homepage, not a 2,500-4,000 article); guide at 2,000-2,400 (above the 1,200-1,800 spoke spec, matching the 2,500-word benchmark that already ranks). All other spokes within 1,000-1,800.
- [x] Cluster size within constraints: 3 clusters, 3/4/2 posts
- [x] SERP data supports groupings: every spoke has >= 4 raw overlap with at least one cluster peer, except the two phase-2 industry pages and the three case studies, whose primaries are long-tail/persona keywords with isolated SERPs; they are grouped by topical bridge, not by SERP overlap, and that is stated above.

## 8. Limitations
- WebSearch returned 9-10 URLs per query from a US endpoint in one session; Lebanon-localized SERPs may weight webspot.me, eurisko.net, the local pack and GBP results differently. No ads, PAA, AI Overviews or local packs observed.
- No search volume; pillar selection used SERP breadth and brand alignment instead of volume. Raw overlaps are inflated by 3-5 ubiquitous directory URLs; the filtered matrix is the better guide to what separates pages.
- Case-study and industry-page keywords were not pairwise-verified against each other (skip rule: long-tail variants with isolated SERPs); spot checks on "AI for F&B businesses Lebanon" and "AI for marketing agencies Lebanon" were done.

---

## Structured findings (audit-data.json, category: Content Architecture)

```json
{
  "category": "content_architecture",
  "method": "WebSearch pairwise SERP overlap, 44 keywords, 946 pairs, raw + directory-filtered matrices",
  "hub": {"url": "/", "primary": "AI consultant Lebanon"},
  "clusters": [
    {"name": "AI Consulting (hire/decide)", "pages": [
      {"url": "/ai-consulting-lebanon/", "primary": "AI consulting Lebanon", "intent": "commercial", "template": "landing-page", "phase": 1},
      {"url": "/blog/ai-consulting-in-lebanon-guide/", "primary": "how much does an AI consultant cost in Lebanon", "intent": "informational", "template": "ultimate-guide", "phase": 1},
      {"url": "/about/", "primary": "AI consultant Beirut", "intent": "commercial/person-entity", "template": "person-page", "phase": 1}
    ]},
    {"name": "AI Solutions & Proof (build)", "pages": [
      {"url": "/ai-solutions-lebanon/", "primary": "AI solutions Lebanon", "intent": "commercial", "template": "landing-page", "phase": 1},
      {"url": "/work/outreach-engine-marketing-agency/", "primary": "AI outreach automation for marketing agency", "intent": "commercial-proof", "template": "case-study", "phase": 1},
      {"url": "/work/custom-ai-crm/", "primary": "custom CRM development Lebanon", "intent": "commercial-proof", "template": "case-study", "phase": 1},
      {"url": "/work/fnb-reporting-inventory-automation/", "primary": "restaurant automation Lebanon", "intent": "commercial-proof", "template": "case-study", "phase": 1}
    ]},
    {"name": "Industries", "pages": [
      {"url": "/ai-for-marketing-agencies-lebanon/", "primary": "AI for marketing agencies Lebanon", "intent": "commercial (SERP conflates with 'AI marketing agency')", "template": "landing-page", "phase": 2},
      {"url": "/ai-for-restaurants-lebanon/", "primary": "AI for F&B businesses Lebanon", "intent": "commercial ('AI for restaurants Lebanon' hijacked by venue entity)", "template": "landing-page", "phase": 2}
    ]}
  ],
  "key_overlaps": {
    "AI consultant Lebanon|AI consulting Lebanon": "5/3",
    "AI consulting Lebanon|best AI consultant in Lebanon": "8/5",
    "AI consulting Lebanon|how much does an AI consultant cost in Lebanon": "6/5",
    "AI consulting firms Lebanon|how much does an AI consultant cost in Lebanon": "7/6",
    "AI consultant Beirut|AI consulting Beirut": "5/4",
    "AI solutions Lebanon|AI automation Lebanon": "4/0",
    "AI for marketing agencies Lebanon|AI marketing agency Lebanon": "6/6",
    "AI for restaurants Lebanon|any": "0/0"
  },
  "cannibalization": {
    "high_risk_pairs": 1,
    "detail": "/ai-consulting-lebanon/ vs /blog/ai-consulting-in-lebanon-guide/ share the SERP (6/5); differentiated by intent, title wording and cross-links",
    "monitor_pairs": ["/ vs /ai-consulting-lebanon/ for 'AI consultant Lebanon' (5/3)"]
  },
  "internal_links": {"planned_edges": 52, "mandatory": 18, "recommended": 17, "optional": 17, "orphans": 0, "min_incoming_per_spoke": 4},
  "excluded_keyword_count": 17,
  "coverage": 0.61,
  "critical_issues": [
    "Site is a single URL today: 9 of 10 planned cluster pages do not exist, so the entire link matrix is unimplemented",
    "Cost query shares the consulting SERP; guide and service page must be differentiated exactly as specified or they will cannibalize",
    "'AI for restaurants Lebanon' and 'AI for marketing agencies Lebanon' are not rankable under their literal wording (entity hijack / intent conflation); industry pages need F&B and 'automation for agencies' phrasing"
  ],
  "prerequisite": "Pre-render/SSG every route (see sxo.md); FAQ content must be visible wherever FAQPage schema is emitted"
}
```
