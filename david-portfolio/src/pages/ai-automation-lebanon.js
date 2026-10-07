// /ai-automation-lebanon/ — commercial service page.
// Primary: "AI automation Lebanon". Secondaries: AI automation agency Lebanon,
// AI automation services Lebanon, AI automation Beirut, business process
// automation Lebanon, workflow automation Lebanon, WhatsApp automation Lebanon.
// Facts: seo-geo-engine/intake/articles/ai-automation-lebanon.yaml.
import { figure, label, rail } from './_kit.js';

export default {
    path: '/ai-automation-lebanon/',
    title: 'AI Automation in Lebanon: What to Automate First',
    ogTitle: 'AI Automation in Lebanon — David Geha',
    description: 'AI automation in Lebanon for hotels, agencies and small teams: what to automate first, how it runs beside email and WhatsApp, and the 48-hour audit to start.',
    datePublished: '2026-10-07',
    dateModified: '2026-10-07',
    about: 'service',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'AI Automation in Lebanon' }],
    navLabel: 'AI automation',
    word: 'Automation',
    eyebrow: 'AI automation · Beirut, Lebanon',
    h1: 'AI Automation in Lebanon',
    lead: 'AI automation in Lebanon pays off on the plain, repeated work: the reports, invoices, follow-ups and data entry your team redoes every week. I am David Geha, an AI consultant in Beirut, and I build systems that take that work over beside your email, phone line, WhatsApp and Google Sheets, with anything unusual waiting for a person to approve.',
    meta: 'Independent consultant · Beirut, Lebanon · English, Arabic, French',
    hero: {
        work: 'work-email-agent',
        alt: 'Screenshot of the AI email agent: a company inbox where the agent reviews incoming reports, generates reports and prepares invoices',
        caption: 'The AI email agent reviews incoming reports, generates the company\'s own reports and prepares invoices from one inbox.',
    },
    body: `
  <section class="container" style="padding-top:2.5rem">
    <dl class="glance reveal-stagger">
      <div><dt>Starts with</dt><dd>48-hour audit</dd></div>
      <div><dt>Build</dt><dd>Fixed-price 2-week sprint</dd></div>
      <div><dt>Connects to</dt><dd>Email · WhatsApp · Sheets</dd></div>
      <div><dt>Ownership</dt><dd>Your accounts, no licence</dd></div>
    </dl>
  </section>

  <section class="section container" id="what">
    <div class="section__grid">
      ${label('What it is', 'What does AI automation in Lebanon actually include?')}
      <div class="prose reveal">
        <p>AI automation, as I build it, is a system that takes one repeated task off your team from start to finish. It reads what arrives, does the work a person would do with it, records what it did, and hands anything unusual to a person to approve. It is not a chatbot on your website, and it is not a platform you rent per seat.</p>
        <p>The work it covers falls into six systems, each scoped on its own:</p>
        <ul>
          <li><a href="/ai-solutions-lebanon/#email">An AI email agent</a> that reviews incoming reports, generates your own reports and prepares invoices.</li>
          <li><a href="/ai-agents-lebanon/">A custom CRM with AI agent employees</a> that keep records current, follow up on deals and prepare the next tasks.</li>
          <li><a href="/ai-outreach-lebanon/">An AI outreach system</a> that researches each lead, writes the first message and logs the replies.</li>
          <li><a href="/ai-seo-geo-lebanon/">AI for SEO and GEO</a> that turns a client or competitor list into a brief, including how each brand shows up in AI answers.</li>
          <li><a href="/ai-solutions-lebanon/#receptionist">An AI receptionist for hotels</a> that answers calls and passes on anything that needs your team.</li>
          <li><a href="/ai-solutions-lebanon/#websites">An AI that builds high-end websites</a>, with the SEO built in from the first page.</li>
        </ul>
        <p>Each one runs in your own accounts and is judged by the hours it gives back.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="first">
    <div class="section__grid">
      ${label('Priorities', 'Which work should you automate first?', figure('solutions-backoffice', {
        alt: 'Black calculator resting on printed figures: the reports and invoices that are usually automated first',
        caption: 'Reports and invoices built from figures you already have: the highest payback and the lowest risk.',
    }))}
      <div class="prose reveal">
        <p>Start with whatever your team produces regularly from data you already have: reports compiled from the figures that arrive by email, client status reports, invoices. That work pays back fastest and carries the least risk, because the inputs already exist and a person can check the output before it leaves the office.</p>
        <p>The order I usually recommend after an audit:</p>
        <ol>
          <li><strong>Regular output from existing data.</strong> The weekly report built by copying numbers out of emails, the status update each client expects, the invoice after every finished job.</li>
          <li><strong>Outbound that follows a pattern.</strong> Lead research and first-touch emails, follow-ups, appointment reminders. The volume is high, and every message is easy to review before it goes.</li>
          <li><strong>Intake and data entry.</strong> Emails, WhatsApp messages and PDFs read into your CRM or sheet. Wherever money or a commitment is involved, a person approves the entry before it counts.</li>
        </ol>
        <h2>What should you not automate yet?</h2>
        <p>Two kinds of work should wait. The first is anything customer-facing where a mistake would embarrass you, because a wrong answer to a guest or a client costs goodwill that saved hours do not buy back. The second is any task you have not yet done by hand long enough to know the rules.</p>
        <p>If your own staff still disagree about how a case should be handled, an agent will not settle the argument for them. Write the rules down, run them by hand for a while, and automate them once they stop changing.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="tools">
    <div class="section__grid">
      ${label('Your tools', 'Does it work with WhatsApp and the tools we already use?')}
      <div class="prose reveal">
        <p>Yes. Email, the phone line, WhatsApp, Google Sheets, Notion and HubSpot are the usual connection points for the systems I build. Each system sits beside those tools and moves data between them; your team keeps working in the screens it already knows.</p>
        <h2>WhatsApp automation for businesses in Lebanon</h2>
        <p>The WhatsApp automation I build is intake: an agent reads the messages your team receives and records them in your CRM or Google Sheet, so nobody retypes a request, a set of details or an attached document. Anything that involves money or a commitment waits for a person to approve it first.</p>
        <p>What I do not build is a WhatsApp chatbot for its own sake. A bot that answers customers is customer-facing work, which should not be the first thing you automate; when an automatic reply makes sense, it is one step inside a larger workflow.</p>
        <h2>Does the automation keep running through power cuts?</h2>
        <p>Yes. The systems run on Vercel and Supabase rather than on a computer in your office, so scheduled jobs run on time when the office loses internet or power. Anything waiting for approval stays queued until someone is back online to look at it.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="workflow">
    <div class="section__head reveal">
      <span class="eyebrow">Workflow automation</span>
      <h2>Business process automation, one workflow at a time</h2>
      <p>I automate a business process one workflow at a time, from the moment its input arrives to the moment its result is approved. A single workflow your team trusts is worth more than a plan to automate the whole company.</p>
    </div>
    ${rail([
        { num: '01', title: 'Something arrives', text: 'An email with a report, a WhatsApp message, a PDF, or a scheduled time. That is the trigger.' },
        { num: '02', title: 'The agent does the work', text: 'It reads and checks the input, then produces what a person would have: the report, the invoice, the CRM entry, the follow-up.' },
        { num: '03', title: 'A person approves the exceptions', text: 'Routine output goes through. Anything unusual, or touching money or a commitment, waits for a person. Every action is logged.' },
    ])}
  </section>

  <section class="section container" id="who">
    <div class="section__grid">
      ${label('Who builds it', 'Who can automate the repetitive admin work in a Beirut business?')}
      <div class="prose reveal">
        <p>I can, when the admin work is reports, invoices, follow-ups, or data entry from emails, WhatsApp and PDFs. I work as an independent consultant in Beirut, not an AI automation agency: the same person studies how your team works, builds the system and hands it over, so whoever found the problem is the one who fixes it.</p>
        <p>Almost every business I work with in Lebanon has fewer than thirty people, so I build narrow systems around one task at a time rather than selling a platform. A small team needs its slowest afternoon back, not new software to learn.</p>
        <h2>Which companies offer AI automation services in Lebanon?</h2>
        <p>Three kinds of provider work on AI in Lebanon: strategy-led firms, software houses and AI agencies, and independent consultants like me. A larger firm is the better call for an enterprise programme that needs compliance and change-management capacity. Hotels, marketing agencies, founders and small teams that want specific repeated tasks removed with a clear payback are who I work for.</p>
        <p>The <a href="/blog/ai-consulting-in-lebanon-guide/#firms">overview of AI consulting firms in Lebanon</a> explains where each kind fits; my own background is on the <a href="/about/">about page</a>.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="engagement">
    <div class="section__grid">
      ${label('Engagement', 'How does an AI automation project work?', figure('consulting-audit-map', {
        alt: 'The audit task map on a tablet resting on black basalt, with every repeated task scored for payback',
        caption: 'The audit ranks every repeated task by payback before anything is built.',
        tilt: 'right',
    }))}
      <div class="prose reveal">
        <p>It starts with the <a href="/ai-consulting-lebanon/#audit">48-hour audit</a>: two working days with the people who do the repeated tasks, ending in a ranked list of what to automate and a fixed price for the first build. The build is then a fixed-price two-week sprint in your own accounts, and your team is using the system by the end of week two.</p>
        <p>Larger builds, such as a full custom CRM, run as two consecutive sprints so that something ships at the end of each one.</p>
        <h2>What does AI automation cost in Lebanon?</h2>
        <p>The first build is a fixed price scoped in the audit, so you know the number before any work starts, and the audit fee is credited against the sprint if you go ahead. There is no licence: the system runs in your accounts and the code sits in your GitHub. For what other providers in Lebanon publicly charge, the <a href="/blog/ai-consulting-in-lebanon-guide/#cost">price bands in the AI consulting guide</a> give a fair comparison.</p>
        <h2>What you have at handover</h2>
        <ul>
          <li>The working system in your Supabase and Vercel accounts, with the code in your GitHub</li>
          <li>Logs, a dashboard and a handover session for the people who will use it</li>
          <li>Two weeks of fixes after go-live</li>
        </ul>
      </div>
    </div>
  </section>`,
    faqTitle: 'Questions about AI automation in Lebanon',
    faq: [
        { q: 'Do I pay a monthly licence for AI automation?', a: 'No. The system is deployed in accounts you own and the code is yours, so you are not renting it from me. The retainer for new automations and tuning is optional and can be cancelled any month.' },
        { q: 'Can AI read WhatsApp messages written in Arabic?', a: 'Yes. The systems handle Arabic, English and French, including messages that mix them the way people in Lebanon actually write on WhatsApp. Whatever the system produces can be written in the language the recipient uses.' },
        { q: 'Will automation replace HubSpot or our Google Sheets?', a: 'No. Your CRM and sheets stay where they are, and the automation moves data in and out of them. If a tool has no API and no export, that limits what can be automated, and the audit says so plainly.' },
        { q: 'Do I need an IT person to run AI automation?', a: 'No. You need one person who knows how the work is done today and can give me a few hours during the audit, and an owner who approves the plan. I set up the accounts, deploy the system and train the people who will use it.' },
        { q: 'Is my business data safe with AI automation?', a: 'Everything runs in accounts you own, and my access can be revoked whenever you choose. Your data is not used to train models, and sensitive details stay out of the prompts unless we agree the task needs them.' },
        { q: 'Do you automate work for businesses outside Beirut?', a: 'Yes. I meet clients in person around Beirut and work remotely with businesses across Lebanon and the GCC. The audit can run over calls and screen shares when travel is not practical.' },
    ],
    ctaTitle: 'Name the task your team repeats most.',
    ctaText: 'Describe it in a message. If it is worth automating, the 48-hour audit turns it into a ranked plan and a fixed price for the first build.',
    extraSchema: (url) => [{
        '@type': 'Service',
        '@id': url + '#automation',
        name: 'AI automation in Lebanon',
        serviceType: 'AI automation',
        description: 'AI systems that take over repeated reports, invoices, follow-ups and data entry beside email, WhatsApp and Google Sheets, starting with a 48-hour audit and a fixed-price two-week build sprint.',
        provider: { '@id': 'https://davidgeha.dev/#david-geha' },
        areaServed: [{ '@type': 'Country', name: 'Lebanon' }, { '@type': 'City', name: 'Beirut' }],
        availableLanguage: ['English', 'Arabic', 'French'],
        url,
    }],
};
