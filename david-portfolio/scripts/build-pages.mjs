#!/usr/bin/env node
// Generates the static content pages (services, guide, about, case studies)
// from src/pages/*.js into <slug>/index.html so Vite picks them up as
// multi-page entries. Pure HTML: crawlers that don't run JS (Bing, most AI
// fetchers) read the full copy. Also rewrites public/sitemap.xml from the
// same page list so the sitemap can't drift from what exists.
//
// Runs as part of `prebuild` (after sync-static) and `predev`.
import { readdirSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://davidgeha.dev';
const TODAY = new Date().toISOString().slice(0, 10);

export const NAP = {
    name: 'David Geha - AI Consultant',
    person: 'David Geha',
    email: 'david@osgdev.com',
    phone: '+961 76 412 978',
    phoneE164: '+96176412978',
    whatsapp: 'https://wa.me/96176412978',
    city: 'Beirut, Lebanon',
    sameAs: [
        'https://www.linkedin.com/in/david-geha/',
        'https://github.com/Daveisgm05',
        'https://www.instagram.com/dave.automate/',
    ],
};

const NAV = [
    { href: '/ai-consulting-lebanon/', label: 'Consulting' },
    { href: '/ai-solutions-lebanon/', label: 'Solutions' },
    { href: '/blog/ai-consulting-in-lebanon-guide/', label: 'Guide' },
    { href: '/about/', label: 'About' },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function bar(current) {
    const links = NAV.map((n) => `<li><a href="${n.href}"${n.href === current ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('');
    return `<header class="container">
  <nav class="bar" aria-label="Primary">
    <a class="bar__logo" href="/" aria-label="David Geha — home">D</a>
    <ul class="bar__links">${links}</ul>
    <a class="bar__cta" href="${NAP.whatsapp}" target="_blank" rel="noopener">WhatsApp me</a>
    <details class="bar__menu">
      <summary>Menu</summary>
      <ul>${links}<li><a href="/#work">Work</a></li><li><a href="${NAP.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li></ul>
    </details>
  </nav>
</header>`;
}

function crumbs(list) {
    return `<ol class="crumbs">${list.map((c, i) => c.href && i < list.length - 1 ? `<li><a href="${c.href}">${esc(c.label)}</a></li>` : `<li aria-current="page">${esc(c.label)}</li>`).join('')}</ol>`;
}

function faqBlock(faq) {
    if (!faq?.length) return '';
    return `<div class="faq">${faq.map(({ q, a }, i) => `
  <details${i === 0 ? ' open' : ''}>
    <summary><h3>${esc(q)}</h3><span class="icon" aria-hidden="true"></span></summary>
    <div class="answer"><p>${a}</p></div>
  </details>`).join('')}
</div>`;
}

function footer() {
    return `<footer class="footer container">
  <address class="footer__nap">
    <span>${NAP.name}</span><span aria-hidden="true">·</span>
    <a href="mailto:${NAP.email}">${NAP.email}</a><span aria-hidden="true">·</span>
    <a href="${NAP.whatsapp}" target="_blank" rel="noopener">${NAP.phone}</a><span aria-hidden="true">·</span>
    <span>${NAP.city}</span>
  </address>
  <div class="footer__row">
    <ul class="footer__links">
      <li><a href="/">Home</a></li>${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
      <li><a href="https://www.linkedin.com/in/david-geha/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
      <li><a href="https://github.com/Daveisgm05" target="_blank" rel="noopener noreferrer">GitHub</a></li>
      <li><a href="https://www.instagram.com/dave.automate/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
    </ul>
    <span class="footer__copy">© ${new Date().getFullYear()} David Geha. All rights reserved.</span>
  </div>
</footer>`;
}

function schemaFor(page) {
    const url = SITE + page.path;
    const person = { '@id': SITE + '/#david-geha' };
    const service = { '@id': SITE + '/#service' };
    const breadcrumb = {
        '@type': 'BreadcrumbList',
        itemListElement: page.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: SITE + (c.href || page.path) })),
    };
    const webpage = {
        '@type': page.schemaType || 'WebPage',
        '@id': url + '#webpage',
        url,
        name: page.title,
        description: page.description,
        inLanguage: 'en',
        isPartOf: { '@id': SITE + '/#website' },
        about: page.about === 'service' ? service : person,
        author: person,
        publisher: person,
        datePublished: page.datePublished || TODAY,
        dateModified: TODAY,
        breadcrumb: { '@id': url + '#breadcrumb' },
    };
    breadcrumb['@id'] = url + '#breadcrumb';
    const graph = [webpage, breadcrumb, ...(page.extraSchema?.(url) || [])];
    if (page.faq?.length) {
        graph.push({
            '@type': 'FAQPage', '@id': url + '#faq',
            mainEntity: page.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
        });
    }
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

function render(page) {
    const url = SITE + page.path;
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}" />
  <meta name="author" content="David Geha" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="${url}" />
  <meta name="geo.region" content="LB" />
  <meta name="geo.placename" content="Beirut, Lebanon" />
  <meta property="og:type" content="${page.ogType || 'website'}" />
  <meta property="og:site_name" content="David Geha" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content="${esc(page.ogTitle || page.title)}" />
  <meta property="og:description" content="${esc(page.description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${SITE}/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(page.ogTitle || page.title)}" />
  <meta name="twitter:description" content="${esc(page.description)}" />
  <meta name="twitter:image" content="${SITE}/og-image.jpg" />
  <script type="application/ld+json">
  ${schemaFor(page).replace(/\n/g, '\n  ')}
  </script>
  <link rel="preload" as="font" type="font/woff2" href="/fonts/playfair-display-400.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="/fonts/inter-400.woff2" crossorigin>
  <link rel="stylesheet" href="/src/pages.css">
</head>
<body>
${bar(page.path)}
<main>
  <section class="page-hero container">
    ${crumbs(page.crumbs)}
    <h1>${page.h1}</h1>
    ${page.lead ? `<p class="lead">${page.lead}</p>` : ''}
    ${page.meta ? `<p class="meta">${page.meta}</p>` : ''}
    <div class="actions">
      <a class="btn btn--solid" href="${NAP.whatsapp}" target="_blank" rel="noopener">WhatsApp ${NAP.phone}</a>
      <a class="btn btn--ghost" href="mailto:${NAP.email}">Email David</a>
    </div>
  </section>
${page.body}
${page.faq?.length ? `
  <section class="section container" id="faq">
    <div class="section__grid">
      <div class="section__label"><span class="eyebrow">FAQ</span><h2>${esc(page.faqTitle || 'Questions people ask')}</h2></div>
      ${faqBlock(page.faq)}
    </div>
  </section>` : ''}
  <section class="cta container">
    <h2>${page.ctaTitle || "Let's automate the work you shouldn't be doing."}</h2>
    <p>${page.ctaText || 'Send one or two sentences about the work your team repeats most. You get a scoped plan and a fixed price before anything is built.'}</p>
    <div class="actions">
      <a class="btn btn--solid" href="${NAP.whatsapp}" target="_blank" rel="noopener">WhatsApp ${NAP.phone}</a>
      <a class="btn btn--ghost" href="mailto:${NAP.email}">${NAP.email}</a>
    </div>
  </section>
</main>
${footer()}
</body>
</html>
`;
}

// ---------------------------------------------------------------- run
const pagesDir = resolve(root, 'src/pages');
const files = readdirSync(pagesDir).filter((f) => f.endsWith('.js')).sort();
const pages = [];
for (const f of files) {
    const mod = await import(resolve(pagesDir, f));
    const page = mod.default;
    if (page.draft) { console.log(`build-pages: skipping draft ${page.path}`); continue; }
    pages.push(page);
}

// clean previously generated dirs (anything with a .generated marker)
for (const p of pages) {
    const dir = join(root, p.path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), render(p));
    writeFileSync(join(dir, '.generated'), 'generated by scripts/build-pages.mjs — do not edit by hand\n');
}

// sitemap: home + generated pages
const images = [
    ['og-image.jpg', 'David Geha - AI Consultant in Lebanon'],
    ['work-outreach-v2.webp', 'Lead Outreach Pipelines - agentic AI automation project'],
    ['work-research-v2.webp', 'Competitive Research and SEO/GEO Pipelines - AI automation project'],
    ['work-ads-v2.webp', 'Image Ad Pipelines - AI ad-creative generation project'],
    ['work-crm-v3.webp', 'Custom CRM Dashboards - custom AI solution for a marketing agency in Lebanon'],
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${TODAY}</lastmod>
${images.map(([f, t]) => `    <image:image>\n      <image:loc>${SITE}/${f}</image:loc>\n      <image:title>${esc(t)}</image:title>\n    </image:image>`).join('\n')}
  </url>
${pages.map((p) => `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${p.lastmod || TODAY}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);
console.log(`build-pages: ${pages.length} pages → ${pages.map((p) => p.path).join(', ')}; sitemap ${pages.length + 1} URLs`);
