// Which content pages exist, for every place that links to them: the SPA homepage (header menu, footer — through the
// generated src/content/site-links.js), its <noscript> mirror, and the generated pages' nav/footer. A page the
// SEO engine publishes is linked everywhere on the next build — no hand edits, no orphans. "Guide" points at the
// only guide until a second one exists; from then on at the /blog/ hub.
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const FIXED = new Set(['/', '/ai-consulting-lebanon/', '/ai-solutions-lebanon/', '/about/']);
const text = (html) => String(html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export async function siteLinks(root) {
    const dir = resolve(root, 'src/pages');
    const pages = [];
    for (const f of readdirSync(dir).filter((n) => n.endsWith('.js') && !n.startsWith('_')).sort()) {
        const page = (await import(resolve(dir, f))).default;
        if (page && !page.draft) pages.push(page);
    }
    const articles = pages
        .filter((p) => p.path.startsWith('/blog/') && p.path !== '/blog/')
        .sort((a, b) => String(b.datePublished || '').localeCompare(String(a.datePublished || '')))
        .map((p) => ({ href: p.path, label: p.navLabel || text(p.title), title: text(p.ogTitle || p.title) }));
    const hub = articles.length >= 2 || pages.some((p) => p.path === '/blog/') ? '/blog/' : null;
    return {
        guide: hub ? { href: hub, label: 'Guides' } : articles[0] ? { href: articles[0].href, label: 'Guide' } : null,
        hub,
        articles,
        pages: pages
            .filter((p) => !FIXED.has(p.path) && !/^\/(blog|work)\//.test(p.path))
            .map((p) => ({ href: p.path, label: p.navLabel || text(p.h1 || p.title) })),
        work: pages.some((p) => p.path === '/work/') ? '/work/' : null,
    };
}
