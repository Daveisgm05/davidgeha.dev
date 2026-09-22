# Listings kit — copy/paste for every directory

Use these exact values everywhere. Same spelling, same phone format, same website. Google cross-checks them against your Google Business Profile; mismatches hurt.

## The fields

| Field | Paste this |
|---|---|
| Business / company name | `David Geha - AI Consultant` |
| Your name | `David Geha` |
| Title / role | `AI Consultant` |
| Website | `https://davidgeha.dev` |
| Phone | `+961 76 412 978` |
| City / Country | `Beirut`, `Lebanon` |
| Founded | `2025` |
| Team size | `1` (or "1–10" if that's the smallest option) |
| Category | `Artificial Intelligence` → if not available: `AI Consulting`, `AI Development`, `Business Consulting`, `Software Development` |
| Services (pick all that exist) | AI Consulting · AI Development · Automation · Custom Software · CRM Development |
| Industries served | Marketing & Advertising · Hospitality (F&B) · Small business |
| Languages | English, Arabic, French |
| Hourly rate / min. project | Skip if optional. If required, put your real audit price. |
| LinkedIn | `https://www.linkedin.com/in/david-geha/` |
| Instagram | `https://www.instagram.com/dave.automates/` |
| GitHub | `https://github.com/Daveisgm05` |
| Logo / photo | Your portrait from the site (`david-portfolio/public/david_transparent.webp` — export as PNG if the site rejects webp) |

## Tagline (short description, ~100 chars)
```
AI consultant in Beirut, Lebanon. Agentic AI systems for agencies, F&B and founders.
```

## Description (long, ~600 chars — same as GBP)
```
David Geha is an independent AI consultant based in Beirut, Lebanon. He offers AI consulting, agentic AI automation and custom AI solutions to marketing agencies, F&B businesses and founders in Lebanon and across the Middle East.

Every engagement starts with an audit of how your team actually works, then a fixed-price build of the system that removes the repetitive work: lead-outreach engines, research and reporting pipelines, ad-creative generation, custom CRMs and back-office agents. Systems are built in your own accounts and handed over running.
```

## Directories — where to click

Do one or two a week. Each takes ~10 minutes: create account → "add/list your company" → paste the fields above → verify by email → done.

| # | Site | Go to | Notes |
|---|---|---|---|
| 1 | Clutch | https://clutch.co/get-listed | Most important. They'll ask for 1–3 client references for "verified reviews" — optional, skip for now. |
| 2 | GoodFirms | https://www.goodfirms.co/get-listed | Straightforward form. |
| 3 | Sortlist | https://www.sortlist.com/ → bottom "I'm an agency" | Free plan is enough. |
| 4 | TechBehemoths | https://techbehemoths.com/company/register | Lebanon has a dedicated page; you'll be one of very few AI listings there. |
| 5 | The Manifest | https://themanifest.com/ | Uses your Clutch profile automatically once Clutch is approved — nothing to do. |
| 6 | Crunchbase | https://www.crunchbase.com/ → "Add an organization" | Company name `David Geha - AI Consultant`, type: Company. |
| 7 | DesignRush | https://www.designrush.com/agency/get-listed | Has an "AI" category. |
| 8 | Yellow Pages Lebanon | https://www.yellowpages.com.lb/ → "Add your business" | Local citation; helps GBP. |

### The three nobody does (do these next — they feed the AI engines directly)

| # | Site | Go to | Why it matters |
|---|---|---|---|
| 9 | **Bing Places** | https://www.bingplaces.com → "Import from Google Business Profile" | 5 minutes: it pulls your GBP. Bing's index is what **ChatGPT and Copilot search**. Without it you do not exist to them locally. |
| 10 | **Apple Business Connect** | https://businessconnect.apple.com | Free, ~10 min. Feeds Apple Maps and Siri; nobody in Lebanon bothers. |
| 11 | **Wikidata** | https://www.wikidata.org → "Create a new item" | A structured entity ("David Geha, AI consultant, Beirut") with `official website` = davidgeha.dev and links to LinkedIn/GitHub. Google and every LLM read Wikidata. Keep it factual, no marketing language, or it gets deleted. |

### Worth it after those

| # | Site | Go to | Notes |
|---|---|---|---|
| 12 | Wellfound (AngelList) | https://wellfound.com | Consultant/startup profile; well crawled. |
| 13 | F6S | https://www.f6s.com | Founder/startup directory, free, indexes fast. |
| 14 | Lebanon business chambers / Berytech / SmartESA directories | search each site for "member directory" / "add your startup" | Local `.lb` links — the closest thing to an AUB link outside AUB. |

**Not worth your time:** paid "top 10 AI agency" placements, G2 (software products only), any directory that asks for money to list, anything promising backlinks.

### When a listing goes live

Say "done" with the profile URL. I check the listing is live and the NAP matches, then record it so the engine measures what it did:

```bash
cd seo-geo-engine && .venv/bin/python src/engine.py memory mark listing_live --subject <domain> --note "<profile url>"
```

That closes the task, opens a measured off-site change, and from then on the Monday run compares the AI engines' answers before and after that listing.

## AUB — the one email

An `.edu.lb` link is worth more than every directory above combined. Send this to your department (CEE) admin or the AUB Entrepreneurship / Center for Research and Innovation office. Adjust the name.

**Subject:** CEE student venture — request to be listed

```
Dear [Name],

I'm David Geha, a fourth-year Civil & Environmental Engineering student at AUB. Alongside my studies I run an AI consultancy in Beirut, building automation systems for Lebanese agencies and F&B businesses (https://davidgeha.dev).

Does the department or the entrepreneurship office keep a page for student ventures or alumni/student businesses? If so, I'd be grateful to be listed with a short line and a link to the site. I'm happy to send a one-paragraph blurb and a photo in whatever format you need, or to write up the project as a short case for the department newsletter if that's useful.

Thank you,
David Geha
+961 76 412 978
```

If they say yes and ask for a blurb, use the "Tagline" above plus the first paragraph of the Description.
