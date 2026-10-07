// /ai-seo-geo-lebanon/ — service page for two goals: AI for SEO and AI for GEO in Lebanon.
// Primary: "AI SEO Lebanon". Secondaries: AI SEO services Lebanon, SEO consultant Lebanon,
// generative engine optimization Lebanon, GEO services Lebanon, AI search optimization Lebanon.
// Facts: seo-geo-engine/intake/articles/ai-seo-geo-lebanon.yaml. Do not claim that davidgeha.dev's
// own SEO and GEO run on the pipeline until that intake line is uncommented.
import { figure, label, rail } from './_kit.js';

export default {
    path: '/ai-seo-geo-lebanon/',
    title: 'AI SEO & GEO Services in Lebanon: Google and AI Answers',
    ogTitle: 'AI for SEO and GEO in Lebanon',
    description: 'AI SEO and GEO in Lebanon for agencies and SEO teams: a pipeline that drafts competitor briefs and shows how brands appear in ChatGPT and Google AI answers.',
    datePublished: '2026-10-07',
    dateModified: '2026-10-07',
    about: 'service',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'AI for SEO and GEO in Lebanon' }],
    navLabel: 'AI for SEO & GEO',
    word: 'Search',
    eyebrow: 'AI for SEO and GEO · Beirut, Lebanon',
    h1: 'AI for SEO and GEO in Lebanon',
    lead: 'AI SEO in Lebanon, as I build it, is a pipeline that does the research and writes the brief: positioning, content gaps, technical SEO issues and, for GEO, how each brand shows up when buyers ask ChatGPT, Perplexity or Google\'s AI answers. Your team edits the brief rather than writing it, and the system runs in your own accounts.',
    meta: 'David Geha, an AI consultant in Beirut · For agencies and SEO teams · English, Arabic, French',
    hero: {
        work: 'work-research-v2',
        alt: 'The SEO and GEO pipeline: automated competitor and AI-visibility briefs for agencies, on a phone',
        caption: 'Give it a client or competitor list and it returns a brief your team edits rather than writes.',
    },
    body: `
  <section class="container" style="padding-top:2.5rem">
    <dl class="glance reveal-stagger">
      <div><dt>Built for</dt><dd>Agencies · SEO teams</dd></div>
      <div><dt>Covers</dt><dd>Google · AI answers</dd></div>
      <div><dt>Runs</dt><dd>On demand or monthly</dd></div>
      <div><dt>Delivery</dt><dd>48-h audit → two-week sprint</dd></div>
    </dl>
  </section>

  <section class="section container" id="seo">
    <div class="section__grid">
      ${label('AI for SEO', 'What AI SEO in Lebanon includes')}
      <div class="prose reveal">
        <p><strong>AI SEO in Lebanon</strong>, in my work, means an AI system that does the research and brief writing an SEO team repeats for every client. You give it a client or competitor list, and it returns a brief covering positioning, content gaps and technical SEO issues. A person on your team still reads it, corrects it and decides what to do.</p>
        <p>Each brief covers:</p>
        <ul>
          <li><strong>Positioning</strong>: how each brand presents itself, so your client's angle is clear against the others.</li>
          <li><strong>Content gaps</strong>: the topics competitors cover and your client does not.</li>
          <li><strong>Technical SEO issues</strong>: problems on the site that hold its pages back in search.</li>
          <li><strong>AI answers</strong>: how each brand shows up in ChatGPT, Perplexity and Google AI Overviews, which is the GEO half of the brief.</li>
        </ul>
        <p>Competitor audits, keyword research and client briefs usually take a day each, and they are out of date a month later. The pipeline runs on demand or monthly, so the brief can be refreshed before a pitch or a client review instead of going stale.</p>
        <p>The stack is small: Supabase holds the data, search and crawl APIs gather it, Claude drafts the brief, and the result lands in Google Docs or Notion, ready for your team to edit.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="geo">
    <div class="section__grid">
      ${label('AI for GEO', 'What does generative engine optimization (GEO) mean for a business in Lebanon?')}
      <div class="prose reveal">
        <p><strong>Generative engine optimization</strong>, or GEO, is the work of getting a business named when buyers ask ChatGPT, Gemini, Perplexity, Claude or Google's AI answers who to hire. For a business in Lebanon, that means appearing when someone asks an assistant for an agency, a hotel or a consultant in Beirut. SEO aims for a place in a list of links; GEO aims for a mention inside the answer itself.</p>
        <p>The two overlap more than the new name suggests. Google documents how its AI features use content from the web on its <a href="https://developers.google.com/search/docs/appearance/ai-features">page on AI features and your website</a>. The difference is in how you check the result: a ranking is a position you can look up, while an AI answer is written fresh each time and can differ from one assistant to the next.</p>
        <h2>AI search optimization: another name for the same goal</h2>
        <p>AI search optimization is the term many people use for GEO: making a business easy for AI assistants to find, understand and name when they answer a question. Some teams sell it as a separate service and some fold it into SEO; the groundwork is shared either way.</p>
        <h2>How the pipeline shows each brand in AI answers</h2>
        <p>For every brand on the list, your client and its competitors, the brief records how it shows up in AI answers from ChatGPT, Perplexity and Google AI Overviews, next to its search picture. Your team can see who gets named, who does not, and where a gap lines up with a missing page or a weak description. That turns GEO from a vague worry into a list of pages to write or fix.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="ai-answers">
    <div class="section__grid">
      ${label('Showing up', 'Who can help my business show up in ChatGPT and Google AI answers?')}
      <div class="prose reveal">
        <p>I can help with the part that can be done reliably: showing where your business and its competitors stand in ChatGPT, Perplexity and Google's AI answers, and writing the brief on what to change. Nobody can promise that an assistant will name you, because the assistant writes its own answer. What you control is what it can find about you: your pages, your positioning and the gaps against competitors.</p>
        <p>In practice, a business works through the brief in order: fix the technical SEO issues, write the missing pages, make the positioning plain on the site, then run the pipeline again to see what changed.</p>
        <h2>GEO services in Lebanon: agency or consultant?</h2>
        <p>You can buy GEO services from an agency that does the work for you, or build the capability into your own team. I do the second. I am an independent consultant, not a GEO agency: I build the SEO and GEO pipeline that an agency or an in-house SEO team runs for itself, so the knowledge stays with you after the sprint.</p>
        <p>If you want someone to write and publish content for you every month, an agency is the better fit. If you are the agency, and the same research repeats for every client, that is the work I take off your desk.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="who">
    <div class="section__grid">
      ${label('Who', 'Who offers AI SEO services in Lebanon?')}
      <div class="prose reveal">
        <p>You can hire <strong>AI SEO services in Lebanon</strong> from an agency that uses AI inside its own SEO work and sends you the results, or from someone who builds the AI system so your team runs it. I do the second, from Beirut: the system runs in your own accounts and stays with your team.</p>
        <h2>Which SEO consultant in Lebanon uses AI?</h2>
        <p>I use AI for the part of SEO that repeats: the research and the brief. I am an AI consultant who builds for SEO work rather than a traditional SEO consultant, because the strategy should stay with the people who know the client. The pipeline gathers the data and drafts; your strategist edits and decides.</p>
        <p>You can see the pipeline among my <a href="/#work">selected work</a>, and its entry in the <a href="/ai-solutions-lebanon/#seo-geo">catalog of AI solutions</a> next to the other systems I build.</p>
        <h2>Who the pipeline is for</h2>
        <p>Marketing agencies and SEO teams that repeat the same competitor audits, keyword research and briefs for every client. The more clients you manage, the more days the pipeline gives back. A business with its own marketing person can use it too, as long as someone acts on the brief.</p>
        <p>It is not a fit if you want links built, content published for you or a promise of a position on Google. For other repeated work, the pages on <a href="/ai-automation-lebanon/">AI automation in Lebanon</a>, <a href="/ai-agents-lebanon/">AI agents for business</a> and the <a href="/ai-outreach-lebanon/">AI outreach system for agencies</a> cover what else I build.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="how">
    <div class="section__head reveal">
      <span class="eyebrow">How it works</span>
      <h2>How an AI SEO engagement works</h2>
      <p>A short audit, a two-week build, then a brief whenever you need one. The price is fixed before the build starts.</p>
    </div>
    ${rail([
        { num: '01', title: '48-hour audit', text: 'I look at how your team handles research and briefs today and rank each repeated task by payback. You get a fixed price for the first build. <a href="/ai-consulting-lebanon/#audit">See how the audit works</a>.' },
        { num: '02', title: 'Two-week sprint', text: 'I build the pipeline in your accounts: Supabase, Claude, the search and crawl APIs and the export to Google Docs or Notion. The code goes into your GitHub.' },
        { num: '03', title: 'Briefs on demand or monthly', text: 'Hand it a client or competitor list and a brief comes back for your team to edit.' },
    ])}
  </section>

  <section class="section container" id="cost">
    <div class="section__grid">
      ${label('Cost and limits', 'What do AI SEO services cost in Lebanon?', figure('consulting-what', {
        alt: 'Red marker diagram drawn on a whiteboard, mapping the steps of a process',
        caption: 'The audit maps how your team researches and writes briefs today, then ranks each repeated task by payback.',
    }))}
      <div class="prose reveal">
        <p>With me, the build is one fixed price, scoped in the 48-hour audit, so you know the number before any work starts. There is no licence: the pipeline runs in your accounts and the code is yours. For the price bands other Lebanese providers publish, the <a href="/blog/ai-consulting-in-lebanon-guide/#cost">guide to AI consulting costs in Lebanon</a> compares them.</p>
        <h2>What the pipeline does not do</h2>
        <p>The pipeline does the research and drafts the brief. It does not publish pages, build links or set your strategy, and nobody can promise a ranking on Google or a mention in an AI answer. What it gives your team is a current picture of the competition and a clear list of changes, every time it runs.</p>
        <p>I work in English, Arabic and French, from Beirut, and the audit can be done over calls when meeting in person is not practical. More on my background is on the <a href="/about/">about page</a>.</p>
      </div>
    </div>
  </section>`,
    faqTitle: 'Questions about AI for SEO and GEO',
    faq: [
        { q: 'What is the difference between SEO and GEO?', a: 'SEO works toward a place in Google\'s search results. GEO works toward being named inside the answer an AI assistant writes, whether that is ChatGPT, Gemini, Perplexity, Claude or Google\'s AI answers. The groundwork overlaps, which is why one pipeline and one brief cover both.' },
        { q: 'Can you make ChatGPT recommend my business?', a: 'Not directly, and nobody can: the assistant decides what to say. What I build shows how your business appears in AI answers today, next to its competitors, and turns that into a list of changes for your team to make.' },
        { q: 'Which AI assistants does the brief cover?', a: 'The brief shows how each brand appears in ChatGPT, Perplexity and Google AI Overviews. If your buyers rely on another assistant, raise it in the audit so the scope reflects it.' },
        { q: 'How long does it take to set up AI for SEO?', a: 'The 48-hour audit comes first and ends with a fixed price. The build is a two-week sprint in your own accounts. After that, the pipeline runs whenever you ask for a brief, or monthly on a schedule.' },
        { q: 'Who owns the pipeline and the data?', a: 'You do. Everything runs in your own accounts, the code sits in your GitHub and there is no licence. If we stop working together, the pipeline keeps working for you.' },
        { q: 'Is an AI SEO pipeline a replacement for an SEO agency?', a: 'No. It replaces the day of research before the work, not the people who decide, write and publish. For an agency it removes that research day for each client; for a business without one, someone still has to act on what the brief says.' },
    ],
    ctaTitle: 'Start with one client and its competitors.',
    ctaText: 'Send the list of brands you track and tell me where the brief should land, Google Docs or Notion. The 48-hour audit comes back with a fixed price for the build.',
    extraSchema: (url) => [
        {
            '@type': 'Service',
            '@id': url + '#seo',
            name: 'AI for SEO',
            serviceType: 'Search engine optimization',
            description: 'A pipeline that takes a client or competitor list and produces the SEO brief: positioning, content gaps and technical SEO issues, as a document the team edits rather than writes. Delivered as a two-week sprint.',
            provider: { '@id': 'https://davidgeha.dev/#david-geha' },
            areaServed: [{ '@type': 'Country', name: 'Lebanon' }, { '@type': 'City', name: 'Beirut' }],
            availableLanguage: ['English', 'Arabic', 'French'],
            audience: { '@type': 'BusinessAudience', name: 'Marketing agencies, SEO teams' },
            url,
        },
        {
            '@type': 'Service',
            '@id': url + '#geo',
            name: 'Generative engine optimization (GEO)',
            serviceType: 'Generative engine optimization',
            description: 'Part of the same brief: how each brand shows up in AI answers from ChatGPT, Perplexity and Google AI Overviews, so a business can work on being named when buyers ask AI assistants who to hire.',
            provider: { '@id': 'https://davidgeha.dev/#david-geha' },
            areaServed: [{ '@type': 'Country', name: 'Lebanon' }, { '@type': 'City', name: 'Beirut' }],
            availableLanguage: ['English', 'Arabic', 'French'],
            audience: { '@type': 'BusinessAudience', name: 'Marketing agencies, SEO teams' },
            url,
        },
    ],
};
