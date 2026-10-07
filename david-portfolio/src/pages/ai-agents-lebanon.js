// /ai-agents-lebanon/ — service page (goal: "AI agents in Lebanon").
// Primary: "AI agents Lebanon". Secondaries: AI agent development Lebanon, AI agents
// for business Lebanon, agentic AI automation Lebanon, custom AI agents Lebanon,
// AI chatbot Lebanon (answered as agent vs chatbot).
// Facts: seo-geo-engine/intake/articles/ai-agents-lebanon.yaml.
import { figure, label, rail, tags, workImg } from './_kit.js';

const agents = [
    {
        id: 'email-agent', title: 'AI email agent',
        tags: ['Scoped in the audit', 'Hotels, agencies, teams that run on email'],
        media: workImg('work-email-agent', 'An AI email agent working in a company inbox: incoming reports reviewed, reports generated and invoices prepared'),
        job: 'It lives in your company\'s email. It reviews the reports that come in, generates the reports your team and management need, and prepares and sends invoices from the same inbox.',
        person: 'Anything unusual waits for a person to approve it.',
        more: { href: '/ai-solutions-lebanon/#email', text: 'How the email agent works' },
    },
    {
        id: 'crm-agents', title: 'AI agent employees in a custom CRM',
        tags: ['2 × 2-week sprints', 'Agencies, founders, service businesses'],
        media: workImg('work-crm-v3', 'A custom CRM with AI agent employees: clients, deals and delivery in one view, with the agents\' actions visible to the team'),
        job: 'The agents work inside a CRM built around how your team sells and delivers, like members of staff: they keep records current, follow up on deals and prepare the next tasks.',
        person: 'Your team sees every action an agent takes and can step in at any point.',
        more: { href: '/ai-solutions-lebanon/#crm', text: 'The CRM with AI agent employees' },
    },
    {
        id: 'outreach-agent', title: 'AI outreach agent',
        tags: ['2-week sprint', 'Marketing agencies, founders'],
        media: workImg('work-outreach-v2', 'An AI outreach agent pipeline: leads sourced against an ideal-customer profile, researched and sent a personalised first email'),
        job: 'It sources leads against your ideal-customer profile, researches each one (site, socials, recent news), writes a personalised first message, sends it from your domain on a schedule and logs replies into your CRM.',
        person: 'You approve the sequence before it runs, and every reply lands in the CRM for your team.',
        more: { href: '/ai-outreach-lebanon/', text: 'AI outreach systems in Lebanon' },
    },
    {
        id: 'receptionist', title: 'AI receptionist for hotels',
        tags: ['Scoped in the audit', 'Hotels and guesthouses'],
        media: workImg('work-receptionist', 'An AI receptionist answering a hotel phone call and responding to a guest'),
        job: 'It answers your hotel\'s phone calls and responds to guests\' questions.',
        person: 'Anything that needs the team is passed on to them.',
        more: { href: '/ai-solutions-lebanon/#receptionist', text: 'The hotel AI receptionist' },
    },
];

export default {
    path: '/ai-agents-lebanon/',
    title: 'Custom AI Agents for Businesses in Lebanon',
    ogTitle: 'AI Agents for Businesses in Lebanon',
    description: 'AI agents for businesses in Lebanon that do one job end to end and hand a person the exceptions: email, CRM, outreach and hotel receptionist agents.',
    datePublished: '2026-10-07',
    dateModified: '2026-10-07',
    about: 'service',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'AI Agents in Lebanon' }],
    navLabel: 'AI agents',
    word: 'Agents',
    eyebrow: 'Custom AI agents · Lebanon',
    h1: 'AI Agents for Businesses in Lebanon',
    lead: 'I build AI agents for businesses in Lebanon: software that takes one job from start to finish, such as the reports and invoices in your inbox or the follow-ups in your CRM, and hands a person anything unusual. Each agent runs in accounts you own, logs every action, and gets a fixed price in a 48-hour audit before anything is built.',
    meta: 'David Geha, an AI consultant in Beirut · Built in your own Supabase and Vercel accounts · English, Arabic, French',
    hero: {
        work: 'work-crm-v3',
        alt: 'Screenshot of a custom CRM showing clients, deals and delivery in one view, with AI agent employees working inside it',
        caption: 'AI agents work inside this CRM like members of staff, and the team sees every action they take.',
    },
    body: `
  <section class="container" style="padding-top:2.5rem">
    <dl class="glance reveal-stagger">
      <div><dt>An agent</dt><dd>Does one job end to end</dd></div>
      <div><dt>Exceptions</dt><dd>Go to a person</dd></div>
      <div><dt>Runs in</dt><dd>Your Supabase and Vercel</dd></div>
      <div><dt>Starts with</dt><dd>A 48-hour audit</dd></div>
    </dl>
  </section>

  <section class="section container" id="agent-vs-chatbot">
    <div class="section__grid">
      ${label('Agent or chatbot', 'What is an AI agent, and how is it different from a chatbot?', figure('guide-agent', {
        alt: 'Hands typing on a laptop keyboard',
        caption: 'An agent takes over work done at a keyboard every day and leaves the exceptions to a person.',
    }))}
      <div class="prose reveal">
        <p>An <strong>AI agent</strong> does a job; a chatbot holds a conversation. A chatbot answers questions in a window and waits for the next one, so the work behind each question is still yours. An agent reads what comes in, decides the next step, acts in your tools and hands a person whatever falls outside its rules, so the only work left for your team is the exceptions.</p>
        <p>Take the reports that land in a company's inbox every week. A chatbot could summarise one if somebody pasted it in. An email agent reviews each one as it arrives, produces the reports management reads, prepares the invoices, and stops for a person when something looks unusual.</p>
        <p>That difference is also the honest test of whether you need an agent. If the job is answering the same few questions, a clear page on your website may be enough. If it is reading, checking, writing and sending every day, an agent is the right shape; when a chatbot helps, it is a small part of a larger agent.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="agents">
    <div class="section__head reveal"><span class="eyebrow">What I build</span><h2>Four AI agents I build for businesses in Lebanon</h2><p>Each one takes over a job someone on your team does by hand today and passes anything unusual to a person. The CRM and the outreach engine run for clients; the other two pictures illustrate the systems.</p></div>
    <div class="cards cards--2 reveal-stagger">
${agents.map((a) => `      <article class="card" id="${a.id}">
        ${a.media ? `<div class="card__media">${a.media}</div>` : ''}
        <h3>${a.title}</h3>
        ${tags(a.tags)}
        <p><strong>The job.</strong> ${a.job}</p>
        <p><strong>Where a person stays in.</strong> ${a.person}</p>
        <a class="more" href="${a.more.href}"><span>${a.more.text}</span> →</a>
      </article>`).join('\n')}
    </div>
  </section>

  <section class="section container" id="who-builds">
    <div class="section__grid">
      ${label('Who builds it', 'Who can build a custom AI agent for my business in Lebanon?')}
      <div class="prose reveal">
        <p>I do. I am an independent AI consultant in Beirut, and the person who maps your work in the audit is the person who writes the agent, deploys it and trains your team to use it. Each agent is built for one repeated task, in your own Supabase and Vercel accounts, with the code in your GitHub and no licence.</p>
        <p>A packaged agent asks your team to work its way. A custom one starts from how the work is done today: which inbox the reports arrive in, who approves an invoice, which deals need a follow-up. The audit sets those rules, and the agent follows them. Because nothing is rented, the agent carries on if we stop working together. More about how I work is on the <a href="/about/">about page</a>.</p>
        <h2>When a larger firm is the better choice</h2>
        <p>If you need agents across many departments at once, enterprise compliance work or a team on call around the clock, a larger firm suits you better; the <a href="/blog/ai-consulting-in-lebanon-guide/#firms">guide to AI consulting firms in Lebanon</a> explains where each kind of provider fits. For a hotel, an agency or a small team, one person who audits and builds keeps the project small and the price within reach.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="first-agent">
    <div class="section__grid">
      ${label('Ground rules', 'What should a first AI agent do, and what should it not do?')}
      <div class="prose reveal">
        <p>A first agent should take over a frequent job with clear rules, such as reading emails, WhatsApp messages and PDFs into your CRM or a sheet. It should never move money or commit you to anything on its own: wherever either is involved, there is a human approval step. And it should log every action where your team can read it.</p>
        <p>A good first agent:</p>
        <ul>
          <li><strong>Repeats often.</strong> Daily intake, follow-ups and reports pay back sooner than a task that comes up now and then.</li>
          <li><strong>Follows rules you can state.</strong> If your team can say what a good result looks like, an agent can work to the same standard.</li>
          <li><strong>Hands exceptions to a named person.</strong> The agent clears the routine cases and sends the rest to someone who decides.</li>
        </ul>
        <p>What it should not do: make a payment, a refund or a promise in your name without an approval step, or run a process that only lives in one person's head. Those rules get written down before an agent touches the work.</p>
        <h2>What happens to an AI agent when the internet or power drops?</h2>
        <p>It keeps working. The agents run on Vercel and Supabase rather than on a computer in your office, so a power cut or a dead connection does not stop them. Messages queued for approval wait, and send once someone is back online to approve them.</p>
        <p>That is what makes <strong>agentic AI automation</strong> practical in Lebanon. A fixed automation runs the same steps every time; an agent reads each case and picks the next step, so it carries the job forward while the office is dark and leaves the decisions for when the team is back. Which work to hand over first is covered in <a href="/ai-automation-lebanon/">AI automation in Lebanon</a>.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="how">
    <div class="section__head reveal">
      <span class="eyebrow">Engagement</span>
      <h2>How an AI agent project works, and what it costs</h2>
      <p>Every agent starts with the <a href="/ai-consulting-lebanon/#audit">48-hour audit</a>, which ranks your repeated tasks by payback and comes back with a fixed price for the first build. There is no price list and no licence, so you know the number before anything is built. For what other providers in Lebanon publicly charge, the <a href="/blog/ai-consulting-in-lebanon-guide/#cost">guide to AI consulting costs</a> compares the market bands.</p>
    </div>
    ${rail([
        { num: '01', title: 'Find the job worth an agent', text: 'I sit with the people doing the repeated work, rank each task by payback and price the first agent.' },
        { num: '02', title: 'Build it in your accounts', text: 'A fixed-price two-week sprint, or 2 × 2-week sprints for a CRM with agent employees, in your own accounts. You can stop at any point.' },
        { num: '03', title: 'Hand over and measure', text: 'Logs, a dashboard and a handover session for the people who will use it. The agent is measured by the hours it gives back.' },
    ])}
  </section>`,
    faqTitle: 'Questions about AI agents in Lebanon',
    faq: [
        { q: 'Can an AI agent read WhatsApp messages and put them in our CRM?', a: 'Yes. Reading WhatsApp messages, emails and PDFs into a CRM or a sheet is intake work, and intake suits agents because it is tedious for people and follows clear rules. Wherever a message involves money or a commitment, a person approves it before it goes any further.' },
        { q: 'Will AI agents replace my staff?', a: 'No. An agent takes one repeated job off someone\'s desk and hands back the cases that need judgement. Even in a custom CRM, where agents work like members of staff, your team sees every action they take and can step in whenever it wants.' },
        { q: 'Who owns the AI agent once it is built?', a: 'You do. It is deployed in your own Supabase and Vercel accounts, the code is in your GitHub, and there is no licence. If we stop working together, the agent keeps running.' },
        { q: 'How long does it take to build an AI agent?', a: 'The audit takes two working days, and the first agent is built in a two-week sprint after it, in your accounts from the start. A custom CRM with agent employees takes two consecutive two-week sprints.' },
        { q: 'What if an AI agent is not the right answer for my business?', a: 'Then the audit says so. If none of your repeated tasks is worth an agent, you leave with a clear answer and a written reason instead of a build. Sometimes a simpler fix does the job better.' },
    ],
    ctaTitle: 'Tell me the job. I will tell you if an agent should do it.',
    ctaText: 'One message about a task your team repeats every day is enough to start. The 48-hour audit turns it into a scoped plan and a fixed price for the first agent.',
    extraSchema: (url) => [{
        '@type': 'Service',
        '@id': url + '#agents',
        name: 'AI agent development in Lebanon',
        serviceType: 'AI agent development',
        provider: { '@id': 'https://davidgeha.dev/#david-geha' },
        areaServed: [{ '@type': 'Country', name: 'Lebanon' }, { '@type': 'City', name: 'Beirut' }],
        availableLanguage: ['English', 'Arabic', 'French'],
        url,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'AI agents',
            itemListElement: agents.map((a) => ({ '@type': 'Offer', name: a.title, description: a.job.replace(/<[^>]+>/g, '') })),
        },
    }],
};
