#!/usr/bin/env node
// Generates the static content pages (services, guide, about, case studies)
// from src/pages/*.js into <slug>/index.html so Vite picks them up as
// multi-page entries. Pure HTML: crawlers that don't run JS (Bing, most AI
// fetchers) read the full copy. Also rewrites public/sitemap.xml from the
// same page list so the sitemap can't drift from what exists.
//
// Runs as part of `prebuild` (after sync-static) and `predev`.
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { IMAGES } from '../src/pages/_images.js';

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
        'https://www.instagram.com/dave.automates/',
    ],
};

const NAV = [
    { href: '/ai-consulting-lebanon/', label: 'Consulting' },
    { href: '/ai-solutions-lebanon/', label: 'Solutions' },
    { href: '/blog/ai-consulting-in-lebanon-guide/', label: 'Guide' },
    { href: '/about/', label: 'About' },
];

const STACK = ['Supabase', 'Vercel', 'Claude Code', 'Claude Desktop', 'GitHub', 'GPT Image 2.0', 'Custom CRMs', 'Outreach Systems'];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ARROW = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function nav(current) {
    const links = NAV.map((n) => `<li><a href="${n.href}"${n.href === current ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('');
    return `<nav class="nav container" aria-label="Primary">
      <a class="nav__status" href="/#contact"><span class="nav__dot" aria-hidden="true"></span><span class="nav__status-label">Available for new projects</span></a>
      <ul class="nav__links">${links}</ul>
      <div class="nav__actions">
        <a class="nav__cta" href="mailto:${NAP.email}">Let's talk ${ARROW}</a>
        <a class="nav__logo" href="/" aria-label="David Geha — home">D</a>
        <details class="nav__menu">
          <summary aria-label="Open menu">Menu</summary>
          <ul><li><a href="/">Home</a></li>${links}<li><a href="/#work">Work</a></li><li><a href="${NAP.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li></ul>
        </details>
      </div>
    </nav>`;
}

function crumbs(list) {
    return `<ol class="crumbs">${list.map((c, i) => c.href && i < list.length - 1 ? `<li><a href="${c.href}">${esc(c.label)}</a></li>` : `<li aria-current="page">${esc(c.label)}</li>`).join('')}</ol>`;
}

function heroMedia(page) {
    const h = page.hero || {};
    if (h.portrait) {
        return `<div class="hero__media hero__media--portrait">
          <img class="hero__portrait" src="/david_transparent.webp" width="900" height="1200" alt="${esc(h.alt || 'David Geha, AI consultant in Beirut, Lebanon')}" loading="eager" fetchpriority="high" decoding="async">
        </div>`;
    }
    if (!h.image) return '';
    const meta = IMAGES[h.image];
    const widths = [480, 800, 1200, 1600];
    const srcset = widths.map((w) => `/img/${h.image}-${w}.webp ${w}w`).join(', ');
    return `<figure class="hero__media">
          <div class="hero__frame"><img src="/img/${h.image}-1600.webp" srcset="${srcset}" sizes="(max-width: 900px) calc(100vw - 4rem), 44vw" width="${meta.w}" height="${meta.h}" alt="${esc(h.alt)}" loading="eager" fetchpriority="high" decoding="async"></div>
          ${h.caption ? `<figcaption>${h.caption}</figcaption>` : ''}
        </figure>`;
}

function heroPreload(page) {
    const h = page.hero || {};
    if (h.portrait) return `<link rel="preload" as="image" href="/david_transparent.webp">`;
    if (!h.image) return '';
    const widths = [480, 800, 1200, 1600];
    const srcset = widths.map((w) => `/img/${h.image}-${w}.webp ${w}w`).join(', ');
    return `<link rel="preload" as="image" href="/img/${h.image}-1600.webp" imagesrcset="${srcset}" imagesizes="(max-width: 900px) calc(100vw - 4rem), 44vw">`;
}

function marquee(items) {
    const list = [...items, ...items];
    return `<section class="marquee" aria-label="Tools and stack">
  <div class="marquee__track">${list.map((t, i) => `<span class="marquee__item"${i >= items.length ? ' aria-hidden="true"' : ''}>${esc(t)}<span class="marquee__sep" aria-hidden="true">✦</span></span>`).join('')}</div>
</section>`;
}

function faqBlock(faq) {
    if (!faq?.length) return '';
    return `<div class="faq reveal-stagger">${faq.map(({ q, a }, i) => `
  <details${i === 0 ? ' open' : ''}>
    <summary><h3>${esc(q)}</h3><span class="icon" aria-hidden="true"></span></summary>
    <div class="answer"><p>${a}</p></div>
  </details>`).join('')}
</div>`;
}

function footer(page) {
    return `<footer class="contact container" id="contact">
  <div class="contact__content reveal">
    <h2 class="contact__title">${page.ctaTitle || "Let's automate the work you shouldn't be doing."}</h2>
    <p class="contact__text">${page.ctaText || 'Send one or two sentences about the work your team repeats most. You get a scoped plan and a fixed price before anything is built.'}</p>
    <div class="contact__actions">
      <a href="${NAP.whatsapp}" class="contact__button" target="_blank" rel="noopener">WhatsApp David</a>
      <a href="mailto:${NAP.email}" class="contact__button contact__button--ghost">Start a project by email</a>
    </div>
    <address class="contact__nap">
      <a href="mailto:${NAP.email}">${NAP.email}</a><span aria-hidden="true">·</span>
      <a href="${NAP.whatsapp}" target="_blank" rel="noopener">${NAP.phone}</a><span aria-hidden="true">·</span>
      <span>${NAP.city}</span>
    </address>
    <nav class="contact__sitemap" aria-label="Pages">
      <a href="/">Home — AI consultant in Lebanon</a>
      <a href="/#work">Selected work</a>${NAV.map((n) => `
      <a href="${n.href}"${n.href === page.path ? ' aria-current="page"' : ''}>${n.label === 'Guide' ? '2026 guide: costs &amp; how to choose' : n.label === 'About' ? 'About David' : n.label === 'Consulting' ? 'AI consulting in Lebanon' : 'AI solutions &amp; automation'}</a>`).join('')}
    </nav>
    <div class="contact__links">
      <div class="contact__social">
        <a href="https://www.instagram.com/dave.automates/" target="_blank" rel="noopener noreferrer" class="social-link">Instagram</a>
        <a href="https://www.linkedin.com/in/david-geha/" target="_blank" rel="noopener noreferrer" class="social-link">LinkedIn</a>
        <a href="https://github.com/Daveisgm05" target="_blank" rel="noopener noreferrer" class="social-link">GitHub</a>
      </div>
      <div class="contact__copyright">© ${new Date().getFullYear()} David Geha. All rights reserved.</div>
    </div>
  </div>
</footer>`;
}

// Every <img> under /img/ in the rendered page, for the sitemap and schema.
function collectImages(html) {
    const out = [];
    for (const tag of html.match(/<img\b[^>]*>/g) || []) {
        const src = tag.match(/\bsrc="(\/img\/[^"]+|\/david_transparent\.webp)"/)?.[1];
        if (!src) continue;
        const alt = tag.match(/\balt="([^"]*)"/)?.[1] || '';
        if (!out.some((o) => o.src === src)) out.push({ src, alt: alt.replace(/&quot;/g, '"').replace(/&amp;/g, '&') });
    }
    return out;
}

function schemaFor(page) {
    const url = SITE + page.path;
    const person = { '@id': SITE + '/#david-geha' };
    const service = { '@id': SITE + '/#service' };
    const breadcrumb = {
        '@type': 'BreadcrumbList',
        itemListElement: page.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: SITE + (c.href || page.path) })),
    };
    const h = page.hero || {};
    const heroMeta = h.image ? IMAGES[h.image] : null;
    const primaryImage = heroMeta ? {
        '@type': 'ImageObject', '@id': url + '#primaryimage',
        url: `${SITE}/img/${h.image}-1600.webp`, contentUrl: `${SITE}/img/${h.image}-1600.webp`,
        width: heroMeta.w, height: heroMeta.h, caption: (h.caption || h.alt || '').replace(/<[^>]+>/g, ''),
    } : h.portrait ? {
        '@type': 'ImageObject', '@id': url + '#primaryimage',
        url: `${SITE}/og-image.jpg`, contentUrl: `${SITE}/og-image.jpg`, width: 1200, height: 630, caption: h.alt || 'David Geha, AI consultant in Beirut, Lebanon',
    } : null;
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
    if (primaryImage) {
        webpage.primaryImageOfPage = { '@id': primaryImage['@id'] };
        webpage.image = { '@id': primaryImage['@id'] };
    }
    if (page.schemaType === 'Article') {
        webpage.headline = (page.ogTitle || page.title).slice(0, 110);
    }
    if (page.schemaType === 'ProfilePage') {
        webpage.mainEntity = person;
        webpage.dateCreated = page.datePublished || TODAY;
    }
    breadcrumb['@id'] = url + '#breadcrumb';
    const extra = typeof page.extraSchema === 'function' ? page.extraSchema(url) : (page.extraSchema || []);
    const graph = [webpage, breadcrumb, ...(primaryImage ? [primaryImage] : []), ...extra];
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
    const og = page.ogImage || '/og-image.jpg';
    const ogAlt = page.ogImageAlt || page.hero?.alt || 'David Geha - AI Consultant in Lebanon';
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
  <meta property="og:image" content="${SITE}${og}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${esc(ogAlt)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(page.ogTitle || page.title)}" />
  <meta name="twitter:description" content="${esc(page.description)}" />
  <meta name="twitter:image" content="${SITE}${og}" />
  <script type="application/ld+json">
  ${schemaFor(page).replace(/\n/g, '\n  ')}
  </script>
  <link rel="preload" as="font" type="font/woff2" href="/fonts/playfair-display-400.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="/fonts/playfair-display-500.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="/fonts/inter-400.woff2" crossorigin>
  ${heroPreload(page)}
  <link rel="stylesheet" href="/src/pages.css">
  <script>document.documentElement.classList.add('js')</script>
  <script>(function(){var id='%VITE_GA4_ID%';if(!id||id.charAt(0)==='%')return;var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',id,{anonymize_ip:true});})();</script>
</head>
<body>
<div class="hero-frame">
  <div class="panel${page.hero?.portrait ? ' panel--portrait' : ''}" id="top">
    ${nav(page.path)}
    <header class="hero container">
      ${page.word ? `<span class="hero__mark" aria-hidden="true" style="--chars:${page.word.length}">${esc(page.word)}</span>` : ''}
      <div class="hero__grid">
        <div class="hero__copy">
          ${crumbs(page.crumbs)}
          ${page.eyebrow ? `<span class="hero__eyebrow">${esc(page.eyebrow)}</span>` : ''}
          <h1 class="hero__title">${page.h1}</h1>
          ${page.lead ? `<p class="hero__lead">${page.lead}</p>` : ''}
          ${page.meta ? `<p class="hero__meta">${page.meta}</p>` : ''}
          <div class="hero__actions">
            <a class="btn btn--solid" href="${NAP.whatsapp}" target="_blank" rel="noopener">WhatsApp David ${ARROW}</a>
            <a class="btn btn--ghost" href="mailto:${NAP.email}">Email David</a>
          </div>
        </div>
        ${heroMedia(page)}
      </div>
    </header>
  </div>
</div>
${marquee(page.marquee || STACK)}
<main>
${page.body}
${page.faq?.length ? `
  <section class="section container" id="faq">
    <div class="section__grid">
      <div class="section__label reveal"><span class="eyebrow">FAQ</span><h2>${esc(page.faqTitle || 'Questions people ask')}</h2></div>
      ${faqBlock(page.faq)}
    </div>
  </section>` : ''}
</main>
${footer(page)}
<script type="module" src="/src/pages.js"></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------- run
const pagesDir = resolve(root, 'src/pages');
const files = readdirSync(pagesDir).filter((f) => f.endsWith('.js') && !f.startsWith('_')).sort();
const pages = [];
for (const f of files) {
    const mod = await import(resolve(pagesDir, f));
    const page = mod.default;
    if (page.draft) { console.log(`build-pages: skipping draft ${page.path}`); continue; }
    pages.push(page);
}

const rendered = new Map();
for (const p of pages) {
    const dir = join(root, p.path);
    mkdirSync(dir, { recursive: true });
    const html = render(p);
    rendered.set(p.path, html);
    writeFileSync(join(dir, 'index.html'), html);
    writeFileSync(join(dir, '.generated'), 'generated by scripts/build-pages.mjs — do not edit by hand\n');
}

// sitemap: home + generated pages, each with its images
const homeImages = [
    ['/og-image.jpg', 'David Geha - AI Consultant in Lebanon'],
    ['/work-outreach-v2.webp', 'Lead Outreach Pipelines - agentic AI automation project'],
    ['/work-research-v2.webp', 'Competitive Research and SEO/GEO Pipelines - AI automation project'],
    ['/work-ads-v2.webp', 'Image Ad Pipelines - AI ad-creative generation project'],
    ['/work-crm-v3.webp', 'Custom CRM Dashboards - custom AI solution for a marketing agency in Lebanon'],
];
const imageXml = (list) => list.map(([f, t]) => `    <image:image>\n      <image:loc>${SITE}${f}</image:loc>\n      <image:title>${esc(t)}</image:title>\n    </image:image>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${TODAY}</lastmod>
${imageXml(homeImages)}
  </url>
${pages.map((p) => {
    const imgs = collectImages(rendered.get(p.path)).map((i) => [i.src, i.alt]);
    return `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${p.lastmod || TODAY}</lastmod>\n${imageXml(imgs)}\n  </url>`;
}).join('\n')}
</urlset>
`;
writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);
console.log(`build-pages: ${pages.length} pages → ${pages.map((p) => p.path).join(', ')}; sitemap ${pages.length + 1} URLs`);
