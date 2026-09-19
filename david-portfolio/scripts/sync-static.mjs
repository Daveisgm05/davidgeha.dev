#!/usr/bin/env node
// Keeps the crawlable parts of index.html in lockstep with the React
// content modules. Runs as `prebuild` (and can be run by hand):
//
//   1. FAQPage JSON-LD  <- src/content/faq.js      (Google requires visible parity)
//   2. <noscript> block <- src/content/services.js + faq.js
//
// The site is a client-rendered SPA, so crawlers that don't execute JS
// (many AI fetchers, and Bing less reliably) only read the raw HTML. The
// <noscript> mirror gives them the same ~1,000 words a browser user sees,
// instead of a two-line stub.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { faq } = await import(resolve(root, 'src/content/faq.js'));
const { services, servicesIntro } = await import(resolve(root, 'src/content/services.js'));

const htmlPath = resolve(root, 'index.html');
let html = readFileSync(htmlPath, 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---- 1. FAQPage node inside the @graph ---------------------------------
const ldStart = html.indexOf('<script type="application/ld+json">');
const ldEnd = html.indexOf('</script>', ldStart);
const ldOpen = html.indexOf('>', ldStart) + 1;
const graph = JSON.parse(html.slice(ldOpen, ldEnd));
const faqNode = graph['@graph'].find((n) => n['@type'] === 'FAQPage');
if (!faqNode) throw new Error('FAQPage node not found in index.html JSON-LD');
faqNode.mainEntity = faq.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
}));
const ldBody = '\n  ' + JSON.stringify(graph, null, 2).replace(/\n/g, '\n  ') + '\n  ';
html = html.slice(0, ldOpen) + ldBody + html.slice(ldEnd);

// ---- 2. <noscript> mirror ---------------------------------------------
const noscript = `<noscript>
    <h1>David Geha - AI Consultant in Lebanon</h1>
    <p>David Geha is an independent AI consultant in Lebanon offering AI consulting, agentic AI automation
      and custom AI solutions for marketing agencies, F&amp;B businesses and founders in Beirut and across
      Lebanon.</p>

    <h2>AI consulting &amp; AI solutions in Lebanon</h2>
    <p>${esc(servicesIntro)}</p>
${services.map(({ title, text }) => `    <h3>${esc(title)}</h3>\n    <p>${esc(text)}</p>`).join('\n')}

    <h2>Working with an AI consultant in Lebanon</h2>
${faq.map(({ q, a }) => `    <h3>${esc(q)}</h3>\n    <p>${esc(a)}</p>`).join('\n')}

    <p>Contact: <a href="mailto:david@osgdev.com">david@osgdev.com</a> ·
      <a href="tel:+96176412978">+961 76 412 978</a> (WhatsApp) · Beirut, Lebanon ·
      <a href="https://www.linkedin.com/in/david-geha/">LinkedIn</a> ·
      <a href="https://github.com/Daveisgm05">GitHub</a> ·
      <a href="https://www.instagram.com/dave.automate/">Instagram</a></p>
  </noscript>`;

const nsStart = html.indexOf('<noscript>\n    <h1>');
const nsEnd = html.indexOf('</noscript>', nsStart) + '</noscript>'.length;
if (nsStart < 0) throw new Error('crawl-fallback <noscript> block not found in index.html');
html = html.slice(0, nsStart) + noscript + html.slice(nsEnd);

writeFileSync(htmlPath, html);
console.log(`sync-static: ${faq.length} FAQ items → JSON-LD, ${services.length} services + ${faq.length} FAQs → <noscript>`);
