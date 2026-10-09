// /ai-consultant-dubai-gulf/ — service page for businesses in Dubai, the UAE and the Gulf (the owner, 2026-10-09:
// show up in the Gulf). Primary: "AI consultant Dubai". Secondaries: AI consultant UAE, AI automation agency Dubai,
// AI agent development UAE, Lebanese AI consultant, AI consultant Saudi Arabia / Riyadh / Qatar.
// Facts: seo-geo-engine/intake/articles/ai-consultant-dubai-gulf.yaml (no Gulf client is named or implied).
import { label, rail, tags } from './_kit.js';

const GULF = [
    ['United Arab Emirates', 'Q878'], ['Saudi Arabia', 'Q851'], ['Qatar', 'Q846'],
    ['Kuwait', 'Q817'], ['Bahrain', 'Q398'], ['Oman', 'Q842'],
];

const systems = [
    {
        id: 'email-agent', title: 'AI email agent',
        tags: ['Scoped in the audit', 'Teams that run on email'],
        text: 'It lives in your company\'s email: it reviews the reports that come in, generates the reports management reads, and prepares and sends invoices. Anything unusual waits for a person.',
        href: '/ai-solutions-lebanon/#email',
    },
    {
        id: 'crm', title: 'A custom CRM with AI agent employees',
        tags: ['2 × 2-week sprints', 'Agencies, founders, service businesses'],
        text: 'A CRM built around how your team sells and delivers, with AI agents working inside it like members of staff. Your team sees every action they take.',
        href: '/ai-agents-lebanon/#crm-agents',
    },
    {
        id: 'outreach', title: 'AI outreach systems',
        tags: ['2-week sprint', 'Marketing agencies, founders'],
        text: 'Leads sourced against your ideal-customer profile, researched one by one, sent a personalised first email from your domain, with every reply logged in your CRM.',
        href: '/ai-outreach-lebanon/',
    },
    {
        id: 'receptionist', title: 'AI receptionist for hotels',
        tags: ['Scoped in the audit', 'Hotels'],
        text: 'It answers your hotel\'s phone calls and responds to guests\' questions, and passes anything that needs the team to them.',
        href: '/ai-solutions-lebanon/#receptionist',
    },
    {
        id: 'seo-geo', title: 'AI for SEO and GEO',
        tags: ['Scoped in the audit', 'Any business that sells online'],
        text: 'Being found on Google and recommended by ChatGPT, Gemini, Perplexity and Claude when buyers ask for a business like yours.',
        href: '/ai-seo-geo-lebanon/',
    },
    {
        id: 'websites', title: 'Custom AI that builds high-end websites',
        tags: ['Scoped in the audit', 'Brands that need a site that stands out'],
        text: 'The same custom AI I used to build this site, put to work on yours.',
        href: '/#services',
    },
];

export default {
    path: '/ai-consultant-dubai-gulf/',
    title: 'AI Consultant for Dubai, the UAE and the Gulf | David Geha',
    ogTitle: 'An AI Consultant for Businesses in Dubai and the Gulf',
    description: 'An AI consultant in Beirut for businesses in Dubai, the UAE and the Gulf: a 48-hour audit, then AI systems built in your own accounts.',
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
    about: 'service',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'AI Consultant for Dubai and the Gulf' }],
    navLabel: 'Dubai and the Gulf',
    word: 'Gulf',
    eyebrow: 'AI consultant · Dubai, the UAE and the Gulf',
    h1: 'An AI Consultant for Businesses in Dubai and the Gulf',
    lead: 'I am David Geha, an independent AI consultant based in Beirut, and I take on projects with businesses in Dubai, the rest of the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman. I find the work your team repeats every day and build AI systems that take it over, in accounts you own, after a 48-hour audit that gives you a fixed price before anything is built.',
    meta: 'Based in Beirut · Projects across the Gulf · English, Arabic, French',
    hero: {
        work: 'work-receptionist',
        alt: 'An AI receptionist answering a hotel phone call and responding to a guest',
        caption: 'One of the systems I build: an AI receptionist that answers a hotel\'s phone calls.',
    },
    body: `
  <section class="container" style="padding-top:2.5rem">
    <dl class="glance reveal-stagger">
      <div><dt>Based in</dt><dd>Beirut, Lebanon</dd></div>
      <div><dt>Works with</dt><dd>The UAE and the Gulf</dd></div>
      <div><dt>Languages</dt><dd>English, Arabic, French</dd></div>
      <div><dt>Starts with</dt><dd>A 48-hour audit</dd></div>
    </dl>
  </section>

  <section class="section container" id="work-from-beirut">
    <div class="section__grid">
      ${label('Working together', 'Can an AI consultant in Beirut work with a business in Dubai?')}
      <div class="prose reveal">
        <p>Yes. The work is the same wherever your office is: understand which jobs your team repeats, decide which of them software should take over, and build that software where you control it. Everything I build runs in your own Supabase and Vercel accounts, with the code in your GitHub and no licence, so nothing depends on where I sit.</p>
        <p>The time difference is small. Dubai, Abu Dhabi and Muscat are two hours ahead of Beirut in winter and one hour ahead in summer; Riyadh, Doha, Kuwait City and Manama are one hour ahead in winter and on the same time in summer. A working day in Beirut covers most of a working day in the Gulf.</p>
        <p>I work in English, Arabic and French, so the people who do the work can explain it in the language they use every day, and the systems can read and write the messages your customers actually send.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="systems">
    <div class="section__head reveal"><span class="eyebrow">What I build</span><h2>AI systems I build for businesses in the UAE and the Gulf</h2><p>The same six systems I build in Lebanon. Each one takes over a job someone on your team does by hand today and leaves the decisions to a person.</p></div>
    <div class="cards cards--2 reveal-stagger">
${systems.map((x) => `      <article class="card" id="${x.id}">
        <h3>${x.title}</h3>
        ${tags(x.tags)}
        <p>${x.text}</p>
        <a class="more" href="${x.href}"><span>How it works</span> →</a>
      </article>`).join('\n')}
    </div>
  </section>

  <section class="section container" id="why-independent">
    <div class="section__grid">
      ${label('Who you work with', 'Why hire an independent AI consultant rather than an agency in Dubai?')}
      <div class="prose reveal">
        <p>With an independent consultant, the person who maps your work is the person who builds the system and hands it to your team. Nothing is lost between a sales team, a project manager and developers you never meet, and the project stays the size of the problem it solves.</p>
        <p>An agency suits you better if you need many systems across departments at once, enterprise compliance work or a team on call around the clock. The <a href="/blog/ai-consulting-in-lebanon-guide/#firms">guide to AI consulting firms</a> explains where each kind of provider fits; it is written for Lebanon, but the trade-offs are the same in the Gulf. For a hotel, an agency or a small team, one person who audits and builds keeps the price within reach.</p>
        <p>More about who I am and how I work is on the <a href="/about/">about page</a>, and the <a href="/ai-consulting-lebanon/">AI consulting page</a> covers the audit in detail.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="how">
    <div class="section__head reveal">
      <span class="eyebrow">Engagement</span>
      <h2>How a project with a business in the Gulf works</h2>
      <p>Every project starts with the <a href="/ai-consulting-lebanon/#audit">48-hour audit</a>. It ranks your repeated tasks by payback and comes back with a fixed price for the first build, so you know the number before anything is built. There is no price list and no licence.</p>
    </div>
    ${rail([
        { num: '01', title: 'The audit', text: 'Two working days with the people who do the repeated work, ranking each task by payback and pricing the first system.' },
        { num: '02', title: 'The build, in your accounts', text: 'A fixed-price two-week sprint, or 2 × 2-week sprints for a CRM with agent employees, in your own Supabase, Vercel and GitHub from the first day.' },
        { num: '03', title: 'Handover', text: 'Logs, a dashboard and a handover session for the people who will use it. The system is measured by the hours it gives back.' },
    ])}
  </section>`,
    faqTitle: 'Questions from businesses in Dubai and the Gulf',
    faq: [
        { q: 'Do you work with companies in Saudi Arabia, Qatar and Kuwait, or only in the UAE?', a: 'Across the Gulf: the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman. The audit, the build and the handover work the same way for each, and the systems run in your own accounts.' },
        { q: 'What time zone do you work in?', a: 'Beirut time. Dubai is two hours ahead of Beirut in winter and one hour ahead in summer; Riyadh, Doha and Kuwait City are one hour ahead in winter and on the same time in summer, so most of the working day overlaps.' },
        { q: 'Can the systems work in Arabic?', a: 'Yes. I work in English, Arabic and French, and the systems are built to read and write the language your team and your customers use.' },
        { q: 'Who owns the system once it is built?', a: 'You do. It is deployed in your own Supabase and Vercel accounts, the code is in your GitHub, and there is no licence. If we stop working together, it keeps running.' },
        { q: 'How much does it cost?', a: 'There is no price list. The 48-hour audit comes back with a fixed price for the first build, so you know the number before anything is built, and you can stop after the audit.' },
    ],
    ctaTitle: 'Tell me what your team repeats every day.',
    ctaText: 'One message from Dubai, Riyadh or Doha about a task your team does by hand is enough to start. The 48-hour audit turns it into a scoped plan and a fixed price.',
    extraSchema: (url) => [{
        '@type': 'Service',
        '@id': url + '#gulf',
        name: 'AI consulting for businesses in Dubai, the UAE and the Gulf',
        serviceType: 'AI consulting',
        provider: { '@id': 'https://davidgeha.dev/#david-geha' },
        areaServed: GULF.map(([name, q]) => ({ '@type': 'Country', name, sameAs: `https://www.wikidata.org/wiki/${q}` })),
        availableLanguage: ['English', 'Arabic', 'French'],
        url,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'AI systems for businesses in the Gulf',
            itemListElement: systems.map((x) => ({ '@type': 'Offer', name: x.title, description: x.text })),
        },
    }],
};
