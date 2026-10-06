// Single source of truth for the Services section. The build-time
// scripts/sync-static.mjs mirrors this (with faq.js) into index.html's
// <noscript> block so non-JS crawlers read the same copy users see.
// `page` is the service's own page, planned by the SEO engine (seo-geo-engine
// config/topics.yaml): the card links there as soon as that page exists
// (site-links.js), and to `href` until then.
export const services = [
    {
        num: '01',
        href: '/ai-solutions-lebanon/#email',
        page: '/ai-automation-lebanon/',
        cta: 'How the email agent works',
        title: 'AI email agents',
        text: 'An AI agent that lives in your company\'s email. It reviews the reports that come in, generates the reports your team and management need, and prepares and sends invoices from the same inbox. It works inside the email account you already use, logs everything it does, and leaves anything unusual for a person to approve.',
    },
    {
        num: '02',
        href: '/ai-solutions-lebanon/#crm',
        cta: 'Custom CRMs and their agents',
        title: 'Custom CRMs with AI agent employees',
        text: 'A CRM designed around how your team actually sells and delivers, with AI agents working inside it like members of staff: they keep records up to date, follow up on deals and prepare the next tasks, while your team sees every action and can step in. Full stack, from UI/UX to backend and deploy, on Supabase, Vercel, Claude and GitHub, so you own the code and the data.',
    },
    {
        num: '03',
        href: '/ai-solutions-lebanon/#outreach',
        page: '/ai-outreach-lebanon/',
        cta: 'See the outreach engine',
        title: 'AI outreach systems',
        text: 'An agent that finds leads matching your ideal customer, researches each one (site, socials, recent news), writes a personal first message and sends it from your own domain on a schedule, logging every reply in your CRM. You approve the sequence once; it runs daily.',
    },
    {
        num: '04',
        href: '/ai-solutions-lebanon/#seo-geo',
        page: '/ai-seo-geo-lebanon/',
        cta: 'How the SEO/GEO pipeline works',
        title: 'AI for SEO & GEO',
        text: 'Being found now means two things: ranking on Google, and being the name ChatGPT, Gemini and Google\'s AI answers give when someone asks who to hire. I build the pipeline that does the research behind both: competitor and content gaps, technical SEO issues, and how each brand shows up in AI answers, refreshed monthly as a brief your team edits instead of writes.',
    },
    {
        num: '05',
        href: '/ai-solutions-lebanon/#receptionist',
        cta: 'Meet the AI receptionist',
        title: 'AI receptionists for hotels',
        text: 'An AI receptionist that answers your hotel\'s phone calls. It picks up when guests call, responds to their questions, and passes on anything that needs your team, so calls still get answered at night, at weekends and when the front desk is busy.',
    },
    {
        num: '06',
        href: '/ai-solutions-lebanon/#websites',
        cta: 'How the website AI works',
        title: 'AI that builds high-end websites',
        text: 'A custom AI system that designs and builds high-end, motion-rich websites: layout, typography, 3D and animation, with the SEO built in from the first page. I used it to build this portfolio, the site you are on now.',
    },
];

export const servicesIntro = 'Lebanese businesses run lean. Small teams, tight margins, and a lot of manual work that quietly eats the week. As an independent AI consultant based in Lebanon, I help hotels, marketing agencies and founders replace that work with AI agents and systems built for how they actually operate, not for how a vendor\'s product works. Every engagement starts with a real audit and ends with a system in production and a number for the hours it gives back.';
