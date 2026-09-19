// /ai-solutions-lebanon/ — catalog-style service page.
// Primary: "AI solutions Lebanon". Secondaries: AI automation Lebanon, AI services
// Lebanon, custom AI solutions Lebanon, AI implementation services Lebanon,
// AI agents for business Lebanon, AI for small business / SMEs Lebanon.
const solutions = [
    {
        id: 'outreach', num: '01', title: 'Lead-outreach engine',
        problem: 'Someone spends afternoons finding leads, reading their websites, and writing first emails that mostly go unanswered.',
        what: 'An agent that sources leads against your ideal-customer profile, researches each one (site, socials, recent news), writes a personalised first message, sends it from your domain on a schedule, and logs replies into your CRM. You approve the sequence once; it runs daily.',
        stack: 'Supabase · Vercel cron · Claude · your email domain (SPF/DKIM set up properly)',
        time: '2-week sprint', for: 'Marketing agencies, B2B founders',
    },
    {
        id: 'research', num: '02', title: 'Research and SEO/GEO pipeline',
        problem: 'Competitor audits, keyword research and client briefs take a day each and are out of date a month later.',
        what: 'A pipeline that takes a client or competitor list and produces the brief: positioning, content gaps, technical SEO issues, and how each brand shows up in AI answers (ChatGPT, Perplexity, Google AI Overviews). Runs on demand or monthly, outputs a document your team edits rather than writes.',
        stack: 'Supabase · Claude · search and crawl APIs · Google Docs/Notion export',
        time: '2-week sprint', for: 'Marketing agencies, SEO teams',
    },
    {
        id: 'ads', num: '03', title: 'Ad-creative pipeline',
        problem: 'Every campaign needs twenty variations of a visual, and the designer is the bottleneck.',
        what: 'From a brief and your brand assets to a set of on-brand, UGC-style visuals and copy variants, sized for Meta and Instagram, with a review step before anything is exported. Your designer approves and adjusts instead of producing from zero.',
        stack: 'Image generation models · Claude for copy · brand-asset library in Supabase · Meta-ready export',
        time: '2-week sprint', for: 'Agencies, e-commerce, F&B brands',
    },
    {
        id: 'crm', num: '04', title: 'Custom AI CRM and dashboards',
        problem: 'Off-the-shelf CRMs cost per seat, do half of what you need, and nobody updates them.',
        what: 'A CRM built around how your team actually sells and delivers: clients, deals, delivery status, and the AI doing the data entry from email and WhatsApp. Dashboards that answer the owner\'s questions without a weekly spreadsheet.',
        stack: 'Supabase (Postgres + auth) · Vercel · Claude for extraction and summaries',
        time: '2 × 2-week sprints', for: 'Agencies, service businesses, founders',
    },
    {
        id: 'fnb', num: '05', title: 'F&B reporting and inventory automation',
        problem: 'Daily sales summaries, inventory counts and supplier follow-ups are done by hand across outlets, late and inconsistently.',
        what: 'The morning report produced automatically from your POS export, inventory variances flagged, and supplier reorder messages drafted in Arabic or English and waiting for a tap to send. Works with the tools you already have, including WhatsApp.',
        stack: 'POS CSV/API · Supabase · Claude · WhatsApp Business API or approval queue',
        time: '2-week sprint', for: 'Restaurants, cafés, cloud kitchens, F&B consultancies',
    },
    {
        id: 'backoffice', num: '06', title: 'WhatsApp and back-office agents',
        problem: 'Small teams lose hours to intake, scheduling, document handling and follow-ups that are simple but constant.',
        what: 'Internal agents that read incoming messages and documents, extract what matters, update the right system, and draft the reply, with a person approving anything that leaves the building. Built one workflow at a time so each one is measurable.',
        stack: 'Supabase · Claude · WhatsApp / email / Google Drive connectors',
        time: '2-week sprint per workflow', for: 'Any small team with repeat admin',
    },
];

export default {
    path: '/ai-solutions-lebanon/',
    title: 'AI Solutions & Automation for Businesses in Lebanon | David Geha',
    ogTitle: 'AI Solutions & Automation for Businesses in Lebanon',
    description: 'Custom AI solutions for businesses in Lebanon: lead-outreach engines, research pipelines, ad-creative generation, custom AI CRMs, F&B reporting automation and back-office agents. Built in Beirut, fixed price, you own the code.',
    about: 'service',
    schemaType: 'CollectionPage',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'AI Solutions in Lebanon' }],
    h1: 'AI Solutions &amp; Automation for Businesses in Lebanon',
    lead: 'Six systems I build for Lebanese agencies, F&amp;B operators and founders. Each one replaces a specific piece of repeated manual work, runs in accounts you own, and ships in a two-week sprint at a fixed price.',
    meta: 'Custom-built · Supabase, Vercel, Claude, GitHub · English, Arabic, French',
    body: `
  <section class="container" style="padding-top:2.5rem">
    <dl class="glance">
      <div><dt>Delivery</dt><dd>2-week sprints</dd></div>
      <div><dt>Ownership</dt><dd>Your accounts, your code</dd></div>
      <div><dt>Runs on</dt><dd>Supabase · Vercel · Claude</dd></div>
      <div><dt>Support</dt><dd>WhatsApp, optional retainer</dd></div>
    </dl>
  </section>

  <section class="section container">
    <div class="section__grid">
      <div class="section__label"><span class="eyebrow">Approach</span><h2>Solutions, not software licences</h2></div>
      <div class="prose">
        <p>Most <strong>AI solutions offered in Lebanon</strong> are either a large vendor's platform resold with local support, or a chatbot on your website. Both charge per seat or per month, and both ask you to change how you work to fit the product. For a small team that is usually the wrong trade.</p>
        <p>What I build is narrower and more useful: one <strong>custom AI system</strong> per repeated task, designed around the tools you already use, deployed in your own Supabase and Vercel accounts, and measured by the hours it gives back. There is no licence. When the sprint is done the system is yours, the code is in your GitHub, and you can hand it to anyone.</p>
        <p>If you are not sure which of these you need, start with the <a href="/ai-consulting-lebanon/#audit">48-hour audit</a>: it ranks your repeated tasks by payback and comes back with a fixed price for the first build.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="solutions">
    <div class="section__label" style="margin-bottom:2.5rem"><span class="eyebrow">Catalog</span><h2>What I build</h2></div>
    <div class="cards cards--2">
${solutions.map((s) => `      <article class="card" id="${s.id}">
        <span class="num">${s.num}</span>
        <h3>${s.title}</h3>
        <p class="price">${s.time} · ${s.for}</p>
        <p><strong>The problem.</strong> ${s.problem}</p>
        <p><strong>What it does.</strong> ${s.what}</p>
        <p class="price" style="text-transform:none;letter-spacing:0">Stack: ${s.stack}</p>
      </article>`).join('\n')}
    </div>
  </section>

  <section class="section container" id="smes">
    <div class="section__grid">
      <div class="section__label"><span class="eyebrow">Small teams</span><h2>AI for SMEs and small teams in Lebanon</h2></div>
      <div class="prose">
        <p>Almost every business I work with in Lebanon has fewer than thirty people. That changes what "AI solutions" should mean. You do not need a data lake or a transformation office. You need the three tasks that eat your afternoon handled by something reliable, and you need to see the hours come back within the first month.</p>
        <h2>Which processes should a small business automate first?</h2>
        <ol>
          <li><strong>Anything produced daily from data you already have</strong>: sales summaries, inventory variances, client status reports. Highest payback, lowest risk.</li>
          <li><strong>Outbound that follows a pattern</strong>: lead research and first-touch emails, supplier reorders, appointment reminders. High volume, easy to review.</li>
          <li><strong>Intake and data entry</strong>: reading emails, WhatsApp messages and PDFs into the CRM or sheet. Tedious for people, easy for an agent, always with a human approval step where money or commitments are involved.</li>
        </ol>
        <p>What I do <em>not</em> recommend automating first: anything customer-facing that a mistake would embarrass you in, and anything you have not yet done by hand long enough to know the rules.</p>
        <h2>Can it run on the tools we already use?</h2>
        <p>Yes, and it should. WhatsApp, Google Sheets, your POS export, Meta Ads, Notion, HubSpot and plain email are the usual connection points. The system sits beside your tools and moves data between them; it does not replace them.</p>
        <h2>What happens when the internet or power drops?</h2>
        <p>The systems run on Vercel and Supabase, so they keep working when your office does not. Scheduled jobs run on time whether anyone is at a desk; queued messages wait for approval and send when you are back online. Nothing depends on a laptop in Beirut staying on.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="industries">
    <div class="section__grid">
      <div class="section__label"><span class="eyebrow">Industries</span><h2>Where these systems already run</h2></div>
      <div class="prose">
        <h2>Marketing agencies</h2>
        <p>Outreach engines, research pipelines and ad-creative generation, usually in that order. Agencies feel the payback fastest because the same work repeats for every client. See the <a href="/#work">selected work</a> for the outreach engine and the ad-creative pipeline.</p>
        <h2>Restaurants and F&amp;B</h2>
        <p>Daily reporting and inventory automation for an F&amp;B consultancy managing multiple outlets, with supplier follow-ups drafted for approval. Arabic and English, working over WhatsApp.</p>
        <h2>Founders and service businesses</h2>
        <p>Custom CRMs and internal agents that clear back-office work for teams of two to ten. The <a href="/ai-consulting-lebanon/">consulting page</a> explains how an engagement is scoped and priced.</p>
      </div>
    </div>
  </section>`,
    faqTitle: 'Questions about AI automation in Lebanon',
    faq: [
        { q: 'How much does AI automation cost in Lebanon?', a: 'Each system above is delivered as a fixed-price two-week sprint, scoped in a 48-hour audit so the price is known before work starts. Larger builds like a full CRM are two consecutive sprints. Publicly listed prices from other Lebanese providers range from about $2,000 for a basic chatbot to $25,000 and up for enterprise workflow automation; the <a href="/blog/ai-consulting-in-lebanon-guide/#cost">consulting guide</a> compares the bands.' },
        { q: 'Chatbot vs AI agent: what is the difference?', a: 'A chatbot answers questions inside a chat window. An agent does work: it reads data, decides what to do next, takes actions in your tools, and reports back. Everything on this page is an agent or a pipeline. A chatbot is occasionally one component of a larger workflow, rarely the whole solution.' },
        { q: 'Do you offer AI implementation services for software we already bought?', a: 'Sometimes. If you have a CRM, POS or marketing platform with an API, I can build the agents that feed and use it. If the tool has no API and no export, the honest answer is that it will limit what is possible, and the audit will say so.' },
        { q: 'Which AI models do you use?', a: 'Claude for reasoning, extraction and writing, current image models for creative generation, and whatever search or crawl APIs the task needs. Models are swapped when a better one appears; the system is designed so that is a configuration change, not a rebuild.' },
        { q: 'Can I see it working before I commit?', a: 'The audit produces a scoped plan, not a demo. But the first sprint is built in your accounts from day one, so you watch it come together over the two weeks and can stop at any point.' },
        { q: 'Do you build AI solutions for companies outside Lebanon?', a: 'Yes. Most clients are in Beirut and across Lebanon, but the systems are remote-first by nature and I work with teams in the GCC and with Lebanese founders abroad in the same way.' },
    ],
    ctaTitle: 'Pick the task. I will scope the system.',
    ctaText: 'One message describing the work your team repeats most is enough to start. You get a fixed price for the first build within a few days.',
    extraSchema: (url) => [{
        '@type': 'ItemList',
        '@id': url + '#solutions',
        name: 'AI solutions for businesses in Lebanon',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: solutions.length,
        itemListElement: solutions.map((s, i) => ({
            '@type': 'ListItem', position: i + 1,
            item: { '@type': 'Service', '@id': url + '#' + s.id, name: s.title, description: s.what, serviceType: 'AI automation', provider: { '@id': 'https://davidgeha.dev/#david-geha' }, areaServed: { '@type': 'Country', name: 'Lebanon' }, audience: { '@type': 'BusinessAudience', name: s.for } },
        })),
    }],
};
