// /privacy/ — what this site collects and why. Every statement is checked against the code: no forms, no cookies,
// self-hosted fonts and images, nothing kept in the browser's storage. The analytics paragraph follows the
// build: Google Analytics / Clarity are named only when their IDs are set (VITE_GA4_ID / VITE_CLARITY_ID, the same
// variables index.html and the page template read), so the page never claims a tracker that isn't running.
const env = globalThis.process?.env || {};  // read at build time by scripts/build-pages.mjs (Node)
const ga4 = /^G-[A-Z0-9]+$/i.test(env.VITE_GA4_ID || '');
const clarity = /^[a-z0-9]+$/i.test(env.VITE_CLARITY_ID || '');

const analytics = ga4 || clarity
    ? `<p>To see which pages are read and which contact links are used, this site runs ${[
        ga4 && 'Google Analytics 4, with IP anonymisation switched on',
        clarity && 'Microsoft Clarity, which records how pages are used (clicks, scrolling) so I can improve them',
    ].filter(Boolean).join(', and ')}. These tools set their own cookies and process data under their providers' privacy policies. I use the results only in aggregate, to improve the site.</p>`
    : '<p>No analytics, advertising or tracking scripts run on this site, and it sets no cookies.</p>';

export default {
    path: '/privacy/',
    title: 'Privacy | David Geha, AI Consultant in Beirut',
    description: 'What davidgeha.dev collects and why: no forms, no tracking cookies, self-hosted fonts and images, and what happens to the messages you send David Geha.',
    datePublished: '2026-10-07',
    dateModified: '2026-10-09',
    about: 'person',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Privacy' }],
    navLabel: 'Privacy',
    word: 'Privacy',
    eyebrow: 'davidgeha.dev · Privacy',
    h1: 'Privacy',
    lead: 'This site belongs to David Geha, an AI consultant in Beirut. It collects as little as it can: there are no forms and no accounts, and the only things I receive are the messages you choose to send me.',
    meta: 'Last updated 7 October 2026',
    body: `
  <section class="section container" id="collect">
    <div class="section__grid">
      <div class="section__label"><span class="eyebrow">This site</span><h2>What the site collects</h2></div>
      <div class="prose reveal">
        ${analytics}
        <p>The fonts and images are served from this site itself, so reading a page does not call a font service or an advertising network.</p>
        <p>The site is hosted on Vercel. Like any web host, Vercel processes the technical details every request carries (your IP address, your browser and the page you asked for) to deliver the page and protect the site from abuse.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="messages">
    <div class="section__grid">
      <div class="section__label"><span class="eyebrow">Contact</span><h2>What happens to the messages you send me</h2></div>
      <div class="prose reveal">
        <p>When you email me or message me on WhatsApp, I use what you send to reply and, if we work together, to scope and deliver the project. I do not sell it, share it for marketing or add you to a mailing list.</p>
        <p>Email and WhatsApp handle your messages under their own terms. Links to LinkedIn, Instagram, GitHub and WhatsApp take you to those services, which have their own privacy policies.</p>
        <p>For client projects, the systems I build run in the client's own accounts; the <a href="/ai-consulting-lebanon/#faq">consulting questions</a> explain how that data is handled.</p>
      </div>
    </div>
  </section>

  <section class="section container" id="rights">
    <div class="section__grid">
      <div class="section__label"><span class="eyebrow">Your data</span><h2>Ask what I hold, or ask me to delete it</h2></div>
      <div class="prose reveal">
        <p>You can ask what I hold about you, ask me to correct it, or ask me to delete it. Write to <a href="mailto:david@gehalb.com">david@gehalb.com</a> and I will answer from that address.</p>
        <p>If this page changes, the date at the top changes with it.</p>
      </div>
    </div>
  </section>`,
    faq: [],
    ctaTitle: 'Questions about your data?',
    ctaText: 'Email david@gehalb.com and I will answer personally.',
};
