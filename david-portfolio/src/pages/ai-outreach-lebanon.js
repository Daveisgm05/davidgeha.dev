// /ai-outreach-lebanon/ — service page for the outreach system (goal: AI outreach systems in Lebanon).
// Primary: "AI outreach system Lebanon". Secondaries: AI lead generation Lebanon, AI outreach
// Lebanon, B2B lead generation Lebanon, lead generation agency Lebanon, cold email automation
// for agencies. Facts: seo-geo-engine/intake/articles/ai-outreach-lebanon.yaml. Email only:
// no other channel is claimed; the only results published are David's own screening figures.
import { figure, label, rail } from './_kit.js';

export default {
    path: '/ai-outreach-lebanon/',
    title: 'AI Lead Generation Lebanon & AI Outreach System',
    ogTitle: 'AI Lead Generation in Lebanon — David Geha',
    description: 'AI lead generation in Lebanon by David Geha, AI consultant in Beirut: an agent finds fitting leads, researches each and emails from your domain. From $1,000.',
    datePublished: '2026-10-07',
    dateModified: '2026-11-16',
    about: 'service',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'AI Outreach Systems in Lebanon' }],
    navLabel: 'AI outreach systems',
    word: 'Outreach',
    eyebrow: 'AI outreach · Beirut, Lebanon',
    h1: 'AI Lead Generation in Lebanon: AI Outreach System and Cold Email',
    lead: 'AI lead generation in Lebanon is what I build: David Geha, an independent AI consultant in Beirut, available for hire to build custom AI lead generation and cold email outreach systems for marketing agencies and B2B founders across Lebanon and the Gulf. One agent finds leads that fit your ideal customer, researches each one, writes a personal first email and sends it from your own domain on a schedule, with replies logged in your CRM. You approve the sequence once; it runs daily.',
    meta: 'Email from your own domain · Supabase, Vercel, Claude · English, Arabic, French',
    hero: {
        work: 'work-outreach-v2',
        alt: 'The lead-outreach engine: an agentic pipeline that sources, researches and emails leads for a marketing agency in Lebanon',
        caption: 'Already running for a marketing agency in Lebanon: approved once, it sources, researches and emails leads every day.',
    },
    body: `
  <section class="container" style="padding-top:2.5rem">
    <dl class="glance reveal-stagger">
      <div><dt>Built for</dt><dd>Agencies · B2B founders</dd></div>
      <div><dt>Engagement</dt><dd>48-h audit → 2-week sprint</dd></div>
      <div><dt>Sends from</dt><dd>Your own domain</dd></div>
      <div><dt>Ownership</dt><dd>Your accounts, no licence</dd></div>
    </dl>
  </section>

  <section class="section container" id="how">
    <div class="section__head reveal">
      <span class="eyebrow">How it works</span>
      <h2>What an AI outreach system does, step by step</h2>
      <p>An AI outreach system takes over the slow part of new business: it finds companies that fit, reads up on each one, writes the first email and sends it from your domain, every day. You approve the sequence once, and replies come back to your CRM for a person to answer.</p>
    </div>
    ${rail([
        { num: '01', title: 'Find leads that fit', text: 'Leads are sourced against your ideal-customer profile, the description of who you sell to that we agree before anything runs.' },
        { num: '02', title: 'Research each one', text: 'The agent reads each lead\'s website, socials and recent news, so the first email can say something true and specific about them.' },
        { num: '03', title: 'Write the first message', text: 'A personalised first email, written from that research and the sequence you approved, not a template with the name swapped in.' },
        { num: '04', title: 'Send from your domain on a schedule', text: 'Emails go out from your own domain, with SPF and DKIM set up properly, on a daily schedule run by Vercel cron.' },
        { num: '05', title: 'Log replies in your CRM', text: 'Every reply is logged in your CRM, where someone on your team picks up the conversation.' },
    ])}
  </section>

  <section class="section container" id="proof">
    <div class="section__grid">
      ${label('Proof', 'Screening and deliverability from my own outreach')}
      <div class="prose reveal">
        <h2>What AI lead generation in Lebanon includes</h2>
        <p>It includes four jobs in one system: finding companies that fit your ideal customer, checking that each one has a real decision-maker and a working address, researching it, and sending a personal first email from your own domain. Replies are logged in your CRM for a person to answer. It does not include answering those replies or deciding your offer.</p>
        <h2>What results has the system produced?</h2>
        <p>The outreach system I run for my own consultancy screened 26,170 businesses automatically and sent 7,279 personalised first emails between May and November 2026. Over that period 10,290 emails were delivered, with 1 spam complaint, and 24 people replied interested.</p>
        <p>The number that matters most to me is 18,891: the leads that failed a check, such as no proven decision-maker or a bad address, and were dropped instead of being sent a weaker email. That is the difference between AI lead generation and a mass email blast. The system screens hard and sends less. These are my own figures, not a promise of what your list will do.</p>
        <p>The same engine also runs for a marketing agency in Lebanon; the <a href="/#work">selected work on the homepage</a> shows it, and the <a href="/ai-solutions-lebanon/#outreach">AI solutions page</a> describes it next to the other builds.</p>
        <h2>How do AI outreach systems protect sender domain reputation?</h2>
        <p>They send from your own domain with SPF and DKIM set up properly, and they drop leads that fail a check instead of emailing them anyway. Fewer bad addresses and fewer irrelevant emails mean fewer bounces and complaints, which is what damages a domain.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="questions">
    <div class="section__grid">
      ${label('Common questions', 'AI for lead generation, in plain terms')}
      <div class="prose reveal">
        <h2>Is there any AI for lead generation?</h2>
        <p>Yes. AI can find companies that match a profile, read their websites and news, and write a first message for each. Ready-made tools do parts of this; I build a custom system when you want all of it in one place, running in your own accounts.</p>
        <h2>Can ChatGPT do lead generation?</h2>
        <p>ChatGPT can help with parts of it, such as drafting an email or summarising a company page, but it does not run a pipeline by itself. Someone still has to feed it leads, check addresses, send on a schedule and log replies. The outreach system I build uses Claude for the reading and writing and does the rest around it automatically.</p>
        <h2>What are some of the top artificial intelligence companies in Lebanon?</h2>
        <p>I can't rank them fairly, since I am one of the providers. Directories such as Sortlist, Clutch and TechBehemoths list AI firms in Lebanon, and they are a fair place to compare. I am an independent consultant who builds, so choose a larger firm if you need a big team on call. The <a href="/blog/ai-consulting-in-lebanon-guide/#cost">consulting guide</a> compares the market.</p>
        <h2>How can I make money online in Lebanon?</h2>
        <p>I can't advise on personal income, and I won't invent a figure. For a business, the route this page covers is steadier new business: more qualified first conversations from outreach that runs every day. If you sell B2B services, that is where AI lead generation pays back.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="agencies">
    <div class="section__grid">
      ${label('Agencies', 'Lead outreach for marketing agencies in Beirut', figure('consulting-who', {
        alt: 'Small marketing agency team in a planning session at a whiteboard',
        caption: 'New business competes with client work for the same people\'s time. The outreach system takes the searching, the reading and the first emails off the team.',
    }))}
      <div class="prose reveal">
        <h2>Who can help a marketing agency in Beirut automate lead outreach with AI?</h2>
        <p>I can. I build the outreach system in a two-week sprint for marketing agencies and B2B founders, and one already runs for a marketing agency in Lebanon. It takes over finding prospects, reading up on them and writing first emails, and leaves your team the replies.</p>
        <p>Without it, the work usually falls to one person: afternoons spent finding leads, reading their websites and writing first emails that mostly go unanswered. When a client deadline lands, that is the first job to stop. An agent that runs daily keeps going through the busy weeks.</p>
        <p>Results depend on your offer and your list as much as on the software, so what I promise is a system that does the work every day and logs what it did, not a reply rate. The engine is in the <a href="/#work">selected work on the homepage</a>.</p>
        <h2>AI lead generation and cold email automation, in one system</h2>
        <p>Lead generation and cold email are often bought as two separate tools: one finds names, the other sends a sequence to a list. The outreach system covers both, plus the slow step between them: researching each lead and writing a first email from what it found.</p>
        <p>If you already have a clean list and a template you are happy with, a standard cold email tool may be all you need, and the audit will say so. A custom system is worth building when finding and researching leads is the slow part, or when you want it running in your own accounts with no licence.</p>
        <p>For agencies, the other usual first builds are a <a href="/ai-solutions-lebanon/#crm">custom CRM with AI agent employees</a> and <a href="/ai-seo-geo-lebanon/">AI for SEO and GEO</a>.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="emails">
    <div class="section__grid">
      ${label('Writing & sending', 'Personalised emails, sent from your own domain')}
      <div class="prose reveal">
        <h2>Who can build an AI system that writes personalised outreach emails?</h2>
        <p>I build it, as the writing step of the outreach system. For every lead, the agent reads the company's website, socials and recent news, then writes a first email from what it found, so each message is about that company rather than a segment. The rules for what an email may say come from the sequence you approve.</p>
        <p>Personal here means specific, not long. If a company on your list was in the news last week, the first email can start there instead of with your agency's credentials. The research and writing run on Claude; the leads and drafts sit in your own Supabase database.</p>
        <h2>What makes outreach emails land in the inbox?</h2>
        <p>Sending from your own domain, with SPF and DKIM set up properly. SPF and DKIM are the DNS records that let a receiving mail server check that an email really came from your domain, and the system is set up with both before the first email goes out.</p>
        <p>Reaching the inbox is only half of it. Whether anyone reads and answers depends on whether the email is relevant to them, which is why the research step exists. Outreach is still a numbers-and-relevance game: the system keeps both going every day, and no setup can promise a reply.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="setup">
    <div class="section__grid">
      ${label('Working with me', 'An outreach system set up in your own accounts')}
      <div class="prose reveal">
        <h2>Who can set up an AI lead generation and outreach system for a company in Lebanon?</h2>
        <p>I set it up myself, as an independent consultant: I scope it, write the code and deploy it in your accounts, so you deal with the person who built it. It runs on Supabase for the data, Vercel cron for the daily schedule, Claude for the reading and writing, and your own email domain for sending. The code lives in your GitHub and there is no licence.</p>
        <p>For a B2B company outside the agency world the shape is the same. What changes is the ideal-customer profile and the sequence: who the agent looks for, and what the first email offers. The outreach agent is one of the <a href="/ai-agents-lebanon/">AI agents I build for businesses in Lebanon</a>; the <a href="/ai-solutions-lebanon/#outreach">AI solutions page</a> lists it with the other systems.</p>
        <h2>What stays a person's job?</h2>
        <p>Two things: approving the sequence, once, and the replies. The agent finds, researches, writes and sends; when someone answers, the reply is logged in your CRM and a person on your team takes the conversation from there.</p>
        <p>Approving the sequence is where you decide who counts as a fit and what a first email may and may not say. Replies stay with people because a reply is the start of a sales conversation, and that is the part of outreach worth a person's time.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="engagement">
    <div class="section__grid">
      ${label('Engagement', 'How an engagement works, and what it costs')}
      <div class="prose reveal">
        <h2>How an engagement works, and what it costs</h2>
        <p>It starts with the <a href="/ai-consulting-lebanon/#audit">48-hour audit</a>, which is free: it ranks your repeated tasks by payback and comes back with a fixed price for the first build. Fixed-price projects start from $1,000. If outreach comes out on top, the system is built in a two-week sprint in your own accounts, and the price is fixed before anything is built.</p>
        <p>You own everything. The code is in your GitHub, the system runs in your accounts, and there is no software licence fee.</p>
        <ol>
          <li><strong>The 48-hour audit.</strong> How leads are found and first emails written today, ranked by payback against the other tasks your team repeats.</li>
          <li><strong>The two-week sprint.</strong> The system is built in your Supabase, Vercel and GitHub accounts and connected to your email domain and CRM.</li>
          <li><strong>Approval, then daily runs.</strong> You approve the sequence once; replies arrive in your CRM from then on.</li>
        </ol>
        <p>For what other providers in Lebanon publicly charge for AI work, the <a href="/blog/ai-consulting-in-lebanon-guide/#cost">consulting guide compares the market bands</a>.</p>
        <p>If outreach turns out not to be your slowest task, the audit points at the one that is; the other builds are on the <a href="/ai-automation-lebanon/">AI automation page</a>.</p>
      </div>
    </div>
  </section>`,
    faqTitle: 'Questions about AI outreach in Lebanon',
    faq: [
        { q: 'Can you automate lead outreach for a marketing agency in the UAE?', a: 'Yes. I work from Beirut with businesses across the Gulf, including the UAE, in English, Arabic or French. The outreach system is built in your own accounts and sends from your own domain, so it works the same way wherever your agency is based.' },
        { q: 'How much does an AI outreach system cost in Lebanon?', a: 'Fixed-price projects start from $1,000, and the exact price is set in the free 48-hour audit, so you know the number before any work starts. For the range other Lebanese providers publicly list for AI work, see the <a href="/blog/ai-consulting-in-lebanon-guide/#cost">cost section of the consulting guide</a>.' },
        { q: 'How long does it take to set up AI lead generation and outreach?', a: 'The build is a two-week sprint, and it starts after the 48-hour audit that scopes and prices it. Everything is built in your own accounts from the start, so you can watch it come together. Once you approve the sequence, it runs every day.' },
        { q: 'Will it work with the CRM we already use?', a: 'If your CRM has an API, yes: replies are logged straight into it. A CRM with no API and no export limits what is possible, and the audit will tell you before you commit to a build. Teams without a CRM worth keeping can have a custom one with AI agent employees built to hold the replies.' },
        { q: 'Do I own the outreach system, or pay a monthly licence?', a: 'You own it. It runs in your own Supabase, Vercel and email accounts, the code sits in your GitHub, and there is no licence fee. You can hand it to another developer whenever you like.' },
        { q: 'Can the outreach emails be written in Arabic or French?', a: 'Yes. The systems I build handle English, Arabic and French, and an email can be written in the language the recipient uses. Tell me which language each list should get, and that goes into the sequence you approve.' },
        { q: 'How does AI lead generation differ from mass email blasting?', a: 'A blast sends one message to a whole list. AI lead generation screens each company first, researches it and writes the email from what it found. In my own outreach, 18,891 leads that failed a check were dropped rather than sent a weaker email.' },
        { q: 'How do AI outreach systems protect sender domain reputation?', a: 'The system sends from your own domain with SPF and DKIM set up properly, and it skips leads with no proven decision-maker or a bad address. In my own outreach, 10,290 emails were delivered with 1 spam complaint. That result comes from my own list and is not a promise for yours.' },
        { q: 'Is AI cold email the same as spam?', a: 'It should not be. Spam is one message sent to everyone; this system writes each first email from research on one company that fits your ideal-customer profile, and sends it from your own domain. It cannot make an irrelevant offer interesting, so choosing who to contact and what to offer stays your call.' },
    ],
    ctaTitle: 'Start with the outreach you do by hand.',
    ctaText: 'Send one message about who you sell to and how first emails get written today. If outreach is the right first build, the 48-hour audit comes back with a fixed price for it.',
    extraSchema: (url) => [{
        '@type': 'Service',
        '@id': url + '#outreach',
        name: 'AI outreach systems in Lebanon',
        serviceType: 'AI lead generation and outreach',
        description: 'An agent that sources leads against your ideal-customer profile, researches each one, writes a personalised first message, sends it from your own domain on a schedule and logs replies into your CRM. Built in a two-week sprint after a 48-hour audit.',
        provider: { '@id': 'https://davidgeha.dev/#david-geha' },
        areaServed: [{ '@type': 'Country', name: 'Lebanon' }, { '@type': 'City', name: 'Beirut' }],
        availableLanguage: ['English', 'Arabic', 'French'],
        audience: { '@type': 'BusinessAudience', name: 'Marketing agencies, B2B founders' },
        url,
    }],
};
