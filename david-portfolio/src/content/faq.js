// Single source of truth for the on-page FAQ. The FAQPage JSON-LD in
// index.html mirrors these answers word for word — Google treats schema
// that isn't visible on the page as a mismatch, so keep the two in sync.
export const faq = [
    {
        q: 'What does an AI consultant in Lebanon actually do?',
        a: 'As an AI consultant based in Lebanon, I find the repetitive, manual work inside a business and replace it with custom agentic AI systems that run on their own. That covers the audit, the design of the system, the build, and the handover, so your team spends less time on busywork and more on the work that grows the business.',
    },
    {
        q: 'How much does AI consulting cost in Lebanon?',
        a: 'It depends on scope. A focused automation, such as a lead-outreach pipeline or a reporting workflow, is a fixed-price project measured in weeks, not months. Larger builds like a custom CRM or a client-facing app are scoped after a short audit. You always get a price before any work starts, and every project is sized against the hours it will save you.',
    },
    {
        q: 'What kind of businesses do you work with?',
        a: 'Mainly marketing agencies and F&B businesses in Beirut and across Lebanon, plus founders who want to automate outreach, research, reporting, and other repeat tasks with AI. If your team does the same thing every day by hand, it is probably a fit.',
    },
    {
        q: 'What can you automate with AI?',
        a: 'Lead-outreach pipelines, competitive research and SEO/GEO pipelines, image-ad generation, custom CRMs and dashboards, and back-office workflows. Everything is built on a modern stack: Supabase, Vercel, Claude, and GitHub, so you own the code and the data.',
    },
    {
        q: 'Do you build AI solutions for companies outside Lebanon?',
        a: 'Yes. I am based in Lebanon and most of my clients are here, but the systems I build are remote-first by nature. I work with teams across the Middle East and with Lebanese founders abroad in the same way, over calls, shared repos, and a live dashboard of what the system is doing.',
    },
    {
        q: 'How do we get started?',
        a: 'Email david@osgdev.com or WhatsApp +961 76 412 978 with one or two sentences about the work your team repeats most. We map that work together on a short call, I come back with a scoped plan and a price, and then I design and build the agentic system that automates it and measure the productivity gain.',
    },
];
