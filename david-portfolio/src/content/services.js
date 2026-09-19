// Single source of truth for the Services section. The build-time
// scripts/sync-static.mjs mirrors this (with faq.js) into index.html's
// <noscript> block so non-JS crawlers read the same copy users see.
export const services = [
    {
        num: '01',
        title: 'AI consulting for Lebanese businesses',
        text: 'I start with an audit of how your team actually works: where hours go, which tasks repeat every day, and what data already exists. You get a clear, prioritized map of what AI can take over now, what it should not touch yet, and what it will cost to build. No slide decks about "digital transformation", just a plan you can act on next week.',
    },
    {
        num: '02',
        title: 'Agentic AI automation',
        text: 'Not a chatbot bolted onto your website. I build agentic systems that do the work end to end: sourcing and researching leads, writing and sending personalized outreach, generating on-brand ad creatives, compiling daily reports, and clearing back-office busywork. They run on their own, log what they did, and hand you the exceptions.',
    },
    {
        num: '03',
        title: 'Custom AI solutions & internal tools',
        text: 'When off-the-shelf software does not fit, I design and build the product: custom CRMs, dashboards, client portals, and web apps with AI baked into the workflow. Full stack, from UI/UX to backend and deploy, on a modern, low-maintenance stack of Supabase, Vercel, Claude, and GitHub, so you own the code and the data.',
    },
    {
        num: '04',
        title: 'AI for marketing agencies & F&B',
        text: 'Most of my work is with marketing agencies and food & beverage operators in Beirut and across Lebanon. Agencies get outreach engines, research pipelines, and ad-creative generation. F&B teams get inventory, reporting, and supplier follow-ups automated. Same approach in every case: find the repeat work, build the system, measure the hours saved.',
    },
];

export const servicesIntro = 'Lebanese businesses run lean. Small teams, tight margins, and a lot of manual work that quietly eats the week. As an independent AI consultant based in Lebanon, I help marketing agencies, F&B operators, and founders replace that work with agentic AI systems built for how they actually operate, not for how a vendor\'s product works. Every engagement starts with a real audit and ends with a system in production and a number for the hours it gives back.';
