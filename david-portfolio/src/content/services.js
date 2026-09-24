// Single source of truth for the Services section. The build-time
// scripts/sync-static.mjs mirrors this (with faq.js) into index.html's
// <noscript> block so non-JS crawlers read the same copy users see.
// `page` is the service's own page, planned by the SEO engine (seo-geo-engine
// config/topics.yaml): the card links there as soon as that page exists
// (site-links.js), and to `href` until then.
export const services = [
    {
        num: '01',
        href: '/ai-consulting-lebanon/',
        cta: 'How the audit works',
        title: 'AI consulting for Lebanese businesses',
        text: 'I start with an audit of how your team actually works: where hours go, which tasks repeat every day, and what data already exists. You get a clear, prioritized map of what AI can take over now, what it should not touch yet, and what it will cost to build. No slide decks about "digital transformation", just a plan you can act on next week.',
    },
    {
        num: '02',
        href: '/ai-solutions-lebanon/',
        page: '/ai-automation-lebanon/',
        cta: 'See the systems',
        title: 'AI automation & AI agents',
        text: 'Not a chatbot bolted onto your website. I build agentic systems that do the work end to end: sourcing and researching leads, writing and sending personalized outreach, generating on-brand ad creatives, compiling daily reports, and clearing back-office busywork. They run on their own, log what they did, and hand you the exceptions.',
    },
    {
        num: '03',
        href: '/ai-solutions-lebanon/#crm',
        cta: 'Custom CRMs and tools',
        title: 'Custom AI solutions & internal tools',
        text: 'When off-the-shelf software does not fit, I design and build the product: custom CRMs, dashboards, client portals, and web apps with AI baked into the workflow. Full stack, from UI/UX to backend and deploy, on a modern, low-maintenance stack of Supabase, Vercel, Claude, and GitHub, so you own the code and the data.',
    },
    {
        num: '04',
        href: '/ai-solutions-lebanon/#research',
        page: '/ai-seo-geo-lebanon/',
        cta: 'How the SEO/GEO pipeline works',
        title: 'AI for SEO & GEO',
        text: 'Being found now means two things: ranking on Google, and being the name ChatGPT, Gemini and Google\'s AI answers give when someone asks who to hire. I build the pipeline that does the research behind both: competitor and content gaps, technical SEO issues, and how each brand shows up in AI answers, refreshed monthly as a brief your team edits instead of writes.',
    },
    {
        num: '05',
        href: '/ai-solutions-lebanon/#outreach',
        page: '/ai-outreach-lebanon/',
        cta: 'See the outreach engine',
        title: 'AI outreach systems',
        text: 'An agent that finds leads matching your ideal customer, researches each one (site, socials, recent news), writes a personal first message and sends it from your own domain on a schedule, logging every reply in your CRM. You approve the sequence once; it runs daily.',
    },
    {
        num: '06',
        href: '/ai-solutions-lebanon/#industries',
        cta: 'Agencies and F&B',
        title: 'AI for marketing agencies & F&B',
        text: 'Most of my work is with marketing agencies and food & beverage operators in Beirut and across Lebanon. Agencies get outreach engines, research pipelines, and ad-creative generation. F&B teams get inventory, reporting, and supplier follow-ups automated. Same approach in every case: find the repeat work, build the system, measure the hours saved.',
    },
];

export const servicesIntro = 'Lebanese businesses run lean. Small teams, tight margins, and a lot of manual work that quietly eats the week. As an independent AI consultant based in Lebanon, I help marketing agencies, F&B operators, and founders replace that work with agentic AI systems built for how they actually operate, not for how a vendor\'s product works. Every engagement starts with a real audit and ends with a system in production and a number for the hours it gives back.';
