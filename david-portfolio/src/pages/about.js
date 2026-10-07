// /about/ — Person entity page. Primary: "AI consultant Beirut". Secondaries:
// David Geha, David Geha AI consultant (disambiguation vs the TV producer),
// AI consulting Beirut, Beirut AI consultant, AUB. Third person, entity first.
import { figure, label, rail, workImg } from './_kit.js';

export default {
    path: '/about/',
    title: 'About David Geha — AI Consultant in Beirut, Lebanon',
    ogTitle: 'David Geha — AI consultant in Beirut, Lebanon',
    description: 'David Geha is an independent AI consultant in Beirut, Lebanon, and an engineering student at AUB, building AI agents for hotels, agencies and founders.',
    schemaType: 'ProfilePage',
    datePublished: '2026-09-19',
    dateModified: '2026-10-06',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'About' }],
    word: 'About',
    eyebrow: 'AI consultant · Beirut, Lebanon',
    h1: 'David Geha, AI consultant in Beirut, Lebanon',
    lead: 'Not the American television producer of the same name. This David Geha is an engineering student at the American University of Beirut who runs an independent AI consultancy for businesses across Lebanon.',
    meta: 'Beirut, Lebanon · English, Arabic, French · Working with clients since 2025',
    hero: { portrait: true, alt: 'David Geha, independent AI consultant based in Beirut, Lebanon' },
    body: `
  <section class="container" style="padding-top:2.5rem">
    <dl class="glance reveal-stagger">
      <div><dt>Based in</dt><dd>Beirut, Lebanon</dd></div>
      <div><dt>Education</dt><dd>Civil &amp; Environmental Engineering, AUB</dd></div>
      <div><dt>Focus</dt><dd>Agentic AI automation</dd></div>
      <div><dt>Clients</dt><dd>Hotels · Agencies · Founders</dd></div>
    </dl>
  </section>

  <section class="section container" id="who">
    <div class="section__grid">
      ${label('Who', 'Who is David Geha?', figure('about-beirut', {
        alt: 'Aerial view of the Lebanese coast and Beirut bay at dusk',
        caption: 'Based in Beirut, working in person around the city and remotely with businesses across Lebanon and the GCC.',
    }))}
      <div class="prose reveal">
        <p><strong>David Geha is an independent AI consultant based in Beirut, Lebanon.</strong> He works with hotels, marketing agencies and founders to find the repetitive manual work inside their businesses and replace it with AI systems that run on their own: AI agents that live in a company's email and handle its reports and invoices, custom CRMs with AI agent employees, AI outreach systems, AI for SEO and GEO, AI receptionists that answer hotel calls, and a custom AI that builds high-end websites. He audits the work, designs the system, builds it, and hands it over running in the client's own accounts.</p>
        <p>He is also a fourth-year Civil &amp; Environmental Engineering student at the American University of Beirut (AUB). The consultancy started in 2025 with agentic workflows for small teams and has since shipped systems for hotels, agencies and founders in Lebanon.</p>
        <p>If you searched his name and found a television producer in Los Angeles, that is a different person. The consultant's public profiles are linked at the bottom of this page.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="why">
    <div class="section__grid">
      ${label('Background', 'Why does an engineering student build AI systems?', figure('about-engineering', {
        alt: 'Tower crane and a high-rise under construction in monochrome: the civil engineering discipline behind the consultancy',
        caption: 'Define the load, size the member, check it against failure modes, never build what you cannot inspect. Same rules for automation.',
        tilt: 'right',
    }))}
      <div class="prose reveal">
        <p>Civil engineering is a discipline of constraints: define the load, choose the material, size the member, check it against failure modes, and never build what you cannot inspect. That is also the right way to build automation for a small business. Most failed AI projects skip the first step, defining the load, which in a business means measuring the work before deciding what to automate.</p>
        <p>That is why every engagement starts with an <a href="/ai-consulting-lebanon/#audit">audit</a> rather than a demo, why every system logs what it did and hands exceptions to a person, and why the stack is deliberately conventional (Supabase, Vercel, Claude, GitHub) so that a client can hire anyone to maintain it later.</p>
        <p>Alongside the automation work, David designs and builds complete products, from UI/UX through backend to deployment, which is how the custom CRM and the website-building AI came about: he used that AI to build this site.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="work">
    <div class="section__grid">
      ${label('Track record', 'What has he built, and for whom?', `<figure class="figure reveal">
        <div class="figure__frame">${workImg('work-crm-v3', 'Custom CRM dashboard David Geha built for a marketing agency in Lebanon')}</div>
        <figcaption>A custom CRM built for a marketing agency: clients, deals and delivery in one view, with AI agent employees working inside it.</figcaption>
      </figure>`)}
      <div class="prose reveal">
        <table>
          <thead><tr><th>System</th><th>What it does</th><th>For</th></tr></thead>
          <tbody>
            <tr><td>AI email agent</td><td>Lives in a company's email: reviews incoming reports, generates the company's reports and prepares its invoices</td><td>Companies</td></tr>
            <tr><td>Custom CRM with AI agent employees</td><td>A CRM with AI agents working inside it: keeping records current, following up on deals and preparing tasks</td><td>Marketing agency</td></tr>
            <tr><td>AI outreach system</td><td>Sources leads, researches each one and sends personalised cold emails on its own</td><td>Marketing agency</td></tr>
            <tr><td>AI for SEO &amp; GEO</td><td>Tracks how a brand ranks on Google and shows up in AI answers, delivered as a monthly brief</td><td>Agencies and brands</td></tr>
            <tr><td>AI receptionist</td><td>Answers phone calls and responds to guests</td><td>Hotels</td></tr>
            <tr><td>AI website builder</td><td>Designs and builds high-end websites; it built this portfolio</td><td>Founders and brands</td></tr>
          </tbody>
        </table>
        <p>Detailed case studies with outcomes are being written up; the <a href="/#work">selected work</a> on the homepage shows the systems, and the <a href="/ai-solutions-lebanon/">AI solutions page</a> describes each type of build.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="how">
    <div class="section__head reveal"><span class="eyebrow">Working together</span><h2>How an engagement works</h2></div>
    ${rail([
        { num: '01', title: 'Find the repetitive work', text: 'A two-day audit with the people doing the tasks. Output: a ranked map and a fixed price for the first build.' },
        { num: '02', title: 'Build the agentic system', text: 'A two-week sprint, in your accounts, with a handover session.' },
        { num: '03', title: 'Automate &amp; scale', text: 'Measure the hours saved, decide what is next, optionally on a monthly retainer.' },
    ])}
    <div class="prose reveal" style="margin-top:2.5rem">
      <p>Offers and pricing structure are on the <a href="/ai-consulting-lebanon/">AI consulting page</a>. The <a href="/blog/ai-consulting-in-lebanon-guide/">guide to AI consulting in Lebanon</a> explains how this compares with agencies and larger firms, including when they are the better choice.</p>
    </div>
  </section>

  <section class="section container" id="verify">
    <div class="section__grid">
      ${label('Verification', 'How can I verify this?')}
      <div class="prose reveal">
        <ul>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/david-geha/" target="_blank" rel="noopener noreferrer">linkedin.com/in/david-geha</a></li>
          <li>GitHub: <a href="https://github.com/Daveisgm05" target="_blank" rel="noopener noreferrer">github.com/Daveisgm05</a></li>
          <li>Instagram: <a href="https://www.instagram.com/dave.automates/" target="_blank" rel="noopener noreferrer">@dave.automates</a></li>
          <li>Email: <a href="mailto:david@gehalb.com">david@gehalb.com</a> · WhatsApp: <a href="https://wa.me/96176412978" target="_blank" rel="noopener">+961 76 412 978</a></li>
        </ul>
        <p>Directory listings and Google Business Profile links will be added here as they go live.</p>
      </div>
    </div>
  </section>`,
    faq: [
        { q: 'Where is David Geha based?', a: 'Beirut, Lebanon. He meets clients in person around Beirut and works remotely with businesses across Lebanon and the GCC.' },
        { q: 'Is David Geha the television producer?', a: 'No. There is an American television producer named David Geha; the AI consultant is a different person, an engineering student at AUB running a consultancy in Beirut.' },
        { q: 'What languages does he work in?', a: 'English, Arabic and French, and the systems he builds handle all three, including the mixed-language messages common on WhatsApp in Lebanon.' },
        { q: 'Does he advise only, or also build?', a: 'Both. The audit is advisory; the build sprint is hands-on. Most clients want the same person to do both so nothing is lost between the recommendation and the system.' },
    ],
    ctaTitle: 'Talk to David.',
    ctaText: 'One message about the work your team repeats most. A scoped plan and a fixed price follow within days.',
    extraSchema: (url) => [{
        '@type': 'Person',
        '@id': 'https://davidgeha.dev/#david-geha',
        name: 'David Geha',
        alternateName: 'Dave Geha',
        url,
        mainEntityOfPage: url,
        image: 'https://davidgeha.dev/og-image.jpg',
        description: 'Independent AI consultant in Beirut, Lebanon, and Civil & Environmental Engineering student at AUB. Audits, designs and builds AI agents and custom AI systems for hotels, marketing agencies and founders across Lebanon.',
        jobTitle: 'AI Consultant',
        worksFor: { '@id': 'https://davidgeha.dev/#service' },
        disambiguatingDescription: 'AI consultant and engineering student based in Beirut, Lebanon (not the American television producer of the same name).',
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'American University of Beirut', sameAs: 'https://www.aub.edu.lb/' },
        address: { '@type': 'PostalAddress', addressLocality: 'Beirut', addressCountry: 'LB' },
        email: 'david@gehalb.com',
        telephone: '+96176412978',
        knowsLanguage: ['en', 'ar', 'fr'],
        sameAs: ['https://www.linkedin.com/in/david-geha/', 'https://github.com/Daveisgm05', 'https://www.instagram.com/dave.automates/'],
    }],
};
