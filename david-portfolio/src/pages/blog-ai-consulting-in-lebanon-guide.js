// /blog/ai-consulting-in-lebanon-guide/ — informational "ultimate guide".
// Primary: "how much does an AI consultant cost in Lebanon". Secondaries: AI
// consulting firms Lebanon, what does an AI consultant do, how to choose an AI
// consultant, AI consultant cost, AI transformation consulting Beirut, agentic AI
// Lebanon. Title/H1 carry "cost" and "guide" to differentiate from the service page.
import { figure, label } from './_kit.js';

const sections = [
    { id: 'short', label: 'The short version' },
    { id: 'what', label: 'What an AI consultant does' },
    { id: 'cost', label: 'What it costs in Lebanon' },
    { id: 'firms', label: 'Who the firms are' },
    { id: 'choose', label: 'How to choose' },
    { id: 'chatbot-vs-agent', label: 'Chatbot, agent or workflow' },
    { id: 'lebanon', label: 'What is different in Lebanon' },
    { id: 'results', label: 'How long results take' },
    { id: 'faq', label: 'FAQ' },
];

export default {
    path: '/blog/ai-consulting-in-lebanon-guide/',
    title: 'AI Consulting in Lebanon: 2026 Guide to Costs & Choosing',
    ogTitle: 'AI Consulting in Lebanon: the 2026 guide to costs, firms and how to choose',
    description: 'A 2026 guide to AI consulting in Lebanon: what consultants do, USD price bands from an audit to an enterprise programme, who the firms are, and how to choose.',
    ogType: 'article',
    ogImage: '/img/og-guide.jpg',
    schemaType: 'Article',
    datePublished: '2026-09-19',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Guide', href: '/blog/ai-consulting-in-lebanon-guide/' }, { label: 'AI Consulting in Lebanon (2026)' }],
    word: 'Guide',
    eyebrow: 'AI consulting · Lebanon · 2026 guide',
    h1: 'AI Consulting in Lebanon (2026): What Consultants Do, What It Costs, How to Choose',
    lead: 'Written for owners and managers in Lebanon who are being pitched "AI" from every direction and want a straight answer: what you are actually buying, what it should cost in dollars, who sells it here, and how to tell a good engagement from an expensive one.',
    meta: 'By David Geha, AI consultant in Beirut · Published 19 September 2026 · ~12 minute read',
    hero: {
        image: 'guide-hero',
        alt: 'Beirut skyline in monochrome, where most AI consulting firms and consultants in Lebanon are based',
        caption: 'Beirut. Lebanon\'s AI consulting market is small, concentrated in the capital, and better than its size suggests.',
    },
    body: `
  <section class="toc container">
    <div class="toc__inner reveal">
      <div><span class="eyebrow">In this guide</span><p class="hero__meta" style="margin-top:0">Nine questions, answered in order. Jump to the one you came for.</p></div>
      <ol>${sections.map((s) => `<li><a href="#${s.id}">${s.label}</a></li>`).join('')}</ol>
    </div>
  </section>

  <section class="section container" id="short">
    <div class="section__grid">
      ${label('Direct answer', 'The short version')}
      <div class="prose reveal">
        <div class="answer-box">
          <p><strong>An AI consultant in Lebanon should do three things:</strong> find the repetitive work in your business that a system can take over, design that system around the tools you already use, and either build it or specify it well enough that a developer can. In 2026 the realistic price for a small or mid-sized Lebanese business runs from a few hundred dollars for a short audit to the low five figures for a multi-sprint build; enterprise transformation programmes from international firms are a different market with a different budget. The market splits into three tiers, strategy firms, agencies and independent practitioners, and the right choice depends far more on the size of your problem than on the size of the firm.</p>
        </div>
        <p>The rest of this guide expands each of those points. I am an <a href="/about/">independent AI consultant based in Beirut</a>, so I have an obvious interest here; I have tried to write it the way I would want to read it if I were on the other side of the table, including where a larger firm is the better call.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="what">
    <div class="section__grid">
      ${label('Definitions', 'What does an AI consultant do, and how is that different from an agency or a developer?', figure('guide-consultant', {
        alt: 'Two consultants mapping a business process as a flow diagram on a whiteboard',
        caption: 'Diagnosis before prescription: a consultant maps which tasks repeat and what they cost before anything is built.',
    }))}
      <div class="prose reveal">
        <p>The label is used loosely, so it helps to separate three roles that are often sold under it.</p>
        <h2>A developer builds what you specify</h2>
        <p>You describe the system; they build it. This works well when you already know exactly what you need and have someone on your side who can write a clear brief and test the result. It goes wrong when the brief is "add AI to our process" and nobody has worked out which process or what "add AI" means.</p>
        <h2>An agency sells you an outcome, usually through their product</h2>
        <p>AI agencies and AI solution companies in Lebanon typically have a platform, a partner stack (Microsoft, AWS, Google, SAP) or a repeatable service like chatbots or content generation. You get capacity, support and a proven template. You also get a solution shaped by what the agency sells, and often per-seat or per-month licensing.</p>
        <h2>A consultant works out what you should build</h2>
        <p>The consultant's job is diagnosis before prescription: which tasks repeat, how many hours they consume, what the error cost is, what data exists, and therefore what to automate first and what to leave alone. Some consultants stop at the recommendation. Others, including me, then build it. The second model, sometimes called a practitioner or builder-consultant, is what most small Lebanese businesses actually need, because there is rarely a separate team waiting to implement a deck.</p>
        <h2>What "agentic AI" means in practice</h2>
        <p>You will hear "agentic AI" and "AI agents" a lot in 2026. In plain terms: a chatbot answers questions in a window; an agent does work. It reads your data, decides the next step, takes actions in your tools (sends the email, updates the CRM, drafts the reorder) and reports back, usually with a person approving anything consequential. For a Lebanese SME the difference matters because agents replace hours, while chatbots mostly add a channel.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="cost">
    <div class="section__grid">
      ${label('Pricing', 'How much does an AI consultant cost in Lebanon?', figure('guide-cost', {
        alt: 'Counting US dollar bills beside a laptop and a calculator: AI consulting in Lebanon is priced in USD',
        caption: 'AI consulting in Lebanon is quoted in US dollars, from a few hundred for an audit to five figures for a multi-sprint build.',
        tilt: 'right',
    }))}
      <div class="prose reveal">
        <p>Prices in Lebanon are quoted in US dollars and vary enormously by tier. The bands below are built from prices publicly listed by Lebanese providers in 2026 and the way this work is usually scoped. Treat them as orientation, not quotes; every serious provider will price your specific situation after a short audit.</p>
        <table>
          <thead><tr><th>Engagement</th><th>Typical 2026 range (USD)</th><th>What you should get</th></tr></thead>
          <tbody>
            <tr><td>Workflow / AI audit (1–3 days)</td><td>Several hundred to about $1,500</td><td>A written map of repeated tasks ranked by payback, and a scoped, priced plan for the first build. Should be reusable with any builder.</td></tr>
            <tr><td>Single automation or chatbot</td><td>~$2,000 – $6,000</td><td>One system in production: an outreach engine, a reporting pipeline, a support or booking bot. Two to four weeks.</td></tr>
            <tr><td>Build sprint (2 weeks, one agentic system)</td><td>~$3,000 – $8,000</td><td>Designed, built, deployed in your accounts, with logs and handover.</td></tr>
            <tr><td>Custom CRM / internal platform</td><td>~$6,000 – $20,000</td><td>Multi-sprint build, integrations with your existing tools, training.</td></tr>
            <tr><td>Monthly retainer</td><td>~$500 – $2,500 / month</td><td>Ongoing improvements, new automations, priority support. Should be cancellable month to month.</td></tr>
            <tr><td>Enterprise workflow automation</td><td>$25,000 and up</td><td>Agency or firm engagement, multiple departments, compliance and change management. Different market.</td></tr>
            <tr><td>Strategy programme (international firm)</td><td>Six figures</td><td>National or corporate AI strategy. Lebanon's government engaged Roland Berger for its national AI ambitions in 2026; this tier is not for SMEs.</td></tr>
          </tbody>
        </table>
        <p>Two Lebanese providers publish their prices openly, which is useful for calibration: one lists chatbots from about $2,000 and enterprise workflow automation from $25,000; an independent practitioner in Beirut lists a $1,500 audit, a $4,500 sprint and an $800 monthly retainer. Those are consistent with the table.</p>
        <h2>What drives the price up or down</h2>
        <ul>
          <li><strong>Data readiness.</strong> If your sales are in a POS export and your leads in a spreadsheet, you are ready. If they are in someone's head, the audit is longer.</li>
          <li><strong>Integrations.</strong> Tools with an API (HubSpot, Meta Ads, most modern POS systems, Google Workspace) are cheap to connect. Tools with no export are expensive or impossible.</li>
          <li><strong>Approval steps.</strong> Anything that sends money, signs, or speaks to customers needs a human-in-the-loop design. Worth paying for; do not skip it to save a few hundred dollars.</li>
          <li><strong>Who owns the result.</strong> A fixed-price build in your own accounts costs more up front than a monthly licence and far less over two years.</li>
        </ul>
        <h2>How to judge value rather than price</h2>
        <p>Ask for the hours-saved estimate per task before the build, and the measured figure after. A $4,000 sprint that removes ten hours a week of manual reporting pays back in weeks at Lebanese salary levels; a $400 chatbot nobody uses does not. My own offers and how they are priced are on the <a href="/ai-consulting-lebanon/#offers">AI consulting page</a>.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="firms">
    <div class="section__grid">
      ${label('The market', 'Who are the AI consultants and firms in Lebanon?', figure('guide-firms', {
        alt: 'Downtown Beirut street with the Mohammad Al-Amin Mosque, the district where Lebanon\'s consulting firms and software houses cluster',
        caption: 'Downtown Beirut. Strategy firms, software houses and independent practitioners all work within a few kilometres of here.',
    }))}
      <div class="prose reveal">
        <p>Lebanon's AI consulting market is small, concentrated in Beirut, and better than its size suggests, partly because so many Lebanese engineers work for GCC and international clients. It sorts into three tiers.</p>
        <h2>Tier 1: strategy-led firms and international consultancies</h2>
        <p>Roland Berger, engaged by the Lebanese government in 2026 on its national AI strategy, and the regional offices of the big consultancies. Also Beirut-based firms that lead with strategy and governance, some with published books and executive training. Right for ministries, banks, large groups and anyone who needs an AI strategy signed off at board level. Wrong for a twelve-person agency.</p>
        <h2>Tier 2: software houses and AI agencies</h2>
        <p>Established Lebanese development companies such as Eurisko, Webspot, NavyBits and SEIDOR's Lebanon office, plus AI-automation specialists like LB Clouds and Zfort's Lebanon practice. They offer AI development, custom models, chatbots and workflow automation, usually with team capacity and long-term support contracts. Right when you need a large build, a partner stack, or an SLA. Prices start in the low thousands and scale to enterprise.</p>
        <h2>Tier 3: independent practitioners</h2>
        <p>A growing group of solo consultants in Beirut who audit, design and build themselves, typically for agencies, F&amp;B, clinics, real estate and founders. This is where I sit, alongside a handful of others you will find on LinkedIn and in the local AI community. Right when the problem is specific, the team is small, and you want the person who diagnoses the work to also build the system. Wrong when you need a team of five on site.</p>
        <p>Directories like Clutch, TechBehemoths, GoodFirms and Consultancy.org list many of the Tier 2 firms with reviews; they are a reasonable place to start a shortlist, keeping in mind that they mostly list companies large enough to have been reviewed.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="choose">
    <div class="section__grid">
      ${label('Choosing', 'How do you choose an AI consultant in Lebanon?', figure('guide-choose', {
        alt: 'Handshake over a signed proposal: agreeing a fixed-price AI consulting engagement',
        caption: 'Five questions in the first call tell you more than any proposal deck.',
        tilt: 'right',
    }))}
      <div class="prose reveal">
        <h2>Five questions to ask in the first call</h2>
        <ol>
          <li><strong>"Which of my tasks would you automate first, and why not the others?"</strong> A good consultant asks about your week before answering. A weak one describes their product.</li>
          <li><strong>"Where will it run, and who owns it when we stop working together?"</strong> The answer should be your accounts and your code. Be wary of anything that only works while you pay.</li>
          <li><strong>"What happens when it makes a mistake?"</strong> You want to hear about logs, approval steps and exceptions handed to a person, not "it won't".</li>
          <li><strong>"Can you show me one you built and the number it produced?"</strong> Case studies with hours or revenue attached, not feature lists.</li>
          <li><strong>"What is the fixed price, and what is not included?"</strong> Hourly billing on a scoping problem is how small projects become large invoices.</li>
        </ol>
        <h2>Red flags</h2>
        <ul>
          <li>A proposal before anyone has watched your team work.</li>
          <li>"AI transformation" or "digital transformation" as the deliverable, with no named task.</li>
          <li>Per-seat licensing for a small team, or a platform you have to migrate everything into.</li>
          <li>No mention of Arabic, French or WhatsApp when your customers use all three.</li>
          <li>Confidence that nothing needs human approval.</li>
        </ul>
        <h2>Green flags</h2>
        <ul>
          <li>An audit step with its own small price and a deliverable you can take elsewhere.</li>
          <li>A stack you have heard of (Postgres, a normal hosting provider, a major model vendor) and could hire for later.</li>
          <li>A promise measured in hours saved per week, reviewed after go-live.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section container" id="chatbot-vs-agent">
    <div class="section__grid">
      ${label('Buying', 'Chatbot, AI agent or agentic workflow: what should a Lebanese SME actually buy?', figure('guide-agent', {
        alt: 'Developer writing the code of an AI agent on a laptop in a dark room',
        caption: 'A chatbot answers questions in a window. An agent does the work: reads data, takes actions in your tools, reports back.',
    }))}
      <div class="prose reveal">
        <p>Most first purchases in Lebanon are chatbots, because they are easy to demo. Most first <em>wins</em> are pipelines and agents, because they remove hours. A useful way to decide:</p>
        <ul>
          <li><strong>Buy a chatbot</strong> if your real bottleneck is inbound questions at volume (reservations, FAQs, order status) and you already have clean answers to give it.</li>
          <li><strong>Buy an agent</strong> if a person is doing the same multi-step job daily: find leads, research, write, send, log; or export, reconcile, summarise, chase.</li>
          <li><strong>Buy an agentic workflow</strong> (several agents with approval steps) if the job crosses tools and people: intake on WhatsApp, data entry into the CRM, a draft reply, a manager's approval, a scheduled follow-up.</li>
        </ul>
        <p>For a catalogue of the agents and pipelines I build most often, with the problem each solves, see <a href="/ai-solutions-lebanon/">AI solutions for businesses in Lebanon</a>.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="lebanon">
    <div class="section__grid">
      ${label('Context', 'What is different about doing AI in Lebanon?', figure('guide-lebanon', {
        alt: 'Beirut apartment building facade with balconies and Arabic signage: the everyday context AI systems in Lebanon run in',
        caption: 'Systems built for Lebanon have to survive power cuts, dollar billing, and customers who write in three languages on WhatsApp.',
        tilt: 'right',
    }))}
      <div class="prose reveal">
        <ul>
          <li><strong>Payments.</strong> Most SaaS and model providers bill in dollars by card, which is still awkward for many Lebanese companies. A consultant who has set up billing for local clients before saves you a week.</li>
          <li><strong>Connectivity and power.</strong> Systems should run in the cloud and queue work, so the daily report still arrives when the office generator does not start. This is a design requirement here, not an edge case.</li>
          <li><strong>Language.</strong> Customers write in Arabic, French and English, often in the same message. Anything customer-facing must handle all three and the mixed form people actually use on WhatsApp.</li>
          <li><strong>Team size.</strong> The median client has under thirty people. Solutions must survive the person who set them up leaving, which is another argument for owning the code.</li>
          <li><strong>Talent.</strong> Lebanon produces strong engineers; many of the best work remotely for the GCC. That keeps local practitioner rates competitive and quality high.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section container" id="results">
    <div class="section__grid">
      ${label('Timeline', 'How long does it take to see results?', figure('guide-timeline', {
        alt: 'Open planner notebook and glasses on a dark desk: scheduling a two-day audit and a two-week build sprint',
        caption: 'Two days for the audit, two weeks for the first system, hours saved measurable in the first month.',
    }))}
      <div class="prose reveal">
        <p>For the practitioner model: two days for an audit, two weeks for the first system, and the hours-saved figure is measurable in the first month of use. For an agency build the timeline is typically one to three months. For a strategy programme, results are measured in quarters, and that is appropriate for the problems it addresses.</p>
        <p>If someone promises a transformation in a week, or a two-week sprint for a national strategy, the mismatch is the warning sign.</p>
      </div>
    </div>
  </section>`,
    faqTitle: 'Frequently asked questions',
    faq: [
        { q: 'Is AI consulting worth it for a small business in Lebanon?', a: 'If your team spends measurable hours every week on repeated, rule-based work, yes: a single build sprint typically pays back within a few months at Lebanese salary levels. If your work is mostly judgement calls and relationships, a consultant will tell you so in the audit, and that answer is worth the audit fee.' },
        { q: 'What is the difference between AI strategy consulting and AI implementation?', a: 'Strategy consulting produces a plan: where AI fits, governance, priorities. Implementation produces working systems. Large organisations need both, usually from different providers. Small businesses mostly need implementation with a short diagnostic in front of it.' },
        { q: 'Should I hire an AI consultant or an AI agency in Beirut?', a: 'Agency if you need capacity, an SLA, or a large multi-department build. Independent consultant if the problem is specific, the team is small, and you want the person who scopes the work to build it. Many businesses use a consultant first and an agency later, once they know what they need.' },
        { q: 'Do AI consultants in Lebanon work in Arabic?', a: 'The good ones do, and build systems that handle Arabic, French and English together. Ask specifically about mixed-language WhatsApp messages; it is a good test of whether they have shipped for Lebanese customers before.' },
        { q: 'How do I verify a consultant is legitimate?', a: 'Look for a real name and face, case studies with numbers, a LinkedIn and GitHub history, listings on directories such as Clutch or TechBehemoths, and a willingness to build in your own accounts. Be cautious of anyone who will only demo on their platform.' },
        { q: 'Who wrote this guide?', a: 'David Geha, an independent AI consultant based in Beirut who builds agentic automation and custom AI systems for marketing agencies, F&B businesses and founders across Lebanon. Details and verification links are on the about page.' },
    ],
    ctaTitle: 'Want the audit version of this guide, for your business?',
    ctaText: 'Two days, a written map of what to automate first, and a fixed price for the first build. No obligation to continue.',
    extraSchema: () => [],
};
