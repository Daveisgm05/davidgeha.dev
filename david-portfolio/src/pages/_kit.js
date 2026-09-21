// Markup helpers shared by the static page modules. Everything here renders to
// plain HTML at build time (scripts/build-pages.mjs); nothing depends on JS in
// the browser, so crawlers read exactly what users see.
import { IMAGES } from './_images.js';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const VARIANTS = { hero: [480, 800, 1200, 1600], figure: [480, 800, 1200] };

/** Responsive <img> for a photo in public/img (see _images.js). */
export function img(slug, { alt, sizes = '(max-width: 768px) calc(100vw - 3rem), 33vw', eager = false, className = '' } = {}) {
    const meta = IMAGES[slug];
    if (!meta) throw new Error(`_images.js: unknown image "${slug}"`);
    const widths = slug.endsWith('-hero') ? VARIANTS.hero : VARIANTS.figure;
    const srcset = widths.map((w) => `/img/${slug}-${w}.webp ${w}w`).join(', ');
    const largest = widths[widths.length - 1];
    return `<img src="/img/${slug}-${largest}.webp" srcset="${srcset}" sizes="${sizes}" width="${meta.w}" height="${meta.h}" alt="${esc(alt)}"${eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"'} decoding="async"${className ? ` class="${className}"` : ''}>`;
}

/** Tilted, cream-framed photo (the homepage's hover-preview card, made static). */
export function figure(slug, { alt, caption, tilt = 'left' } = {}) {
    return `<figure class="figure figure--${tilt} reveal">
        <div class="figure__frame">${img(slug, { alt })}</div>
        ${caption ? `<figcaption>${caption}</figcaption>` : ''}
      </figure>`;
}

/** Full-width cinematic photo band between sections. */
export function band(slug, { alt, caption } = {}) {
    return `
  <figure class="band container reveal">
    <div class="band__frame">${img(slug, { alt, sizes: '(max-width: 1400px) calc(100vw - 3rem), 1320px' })}</div>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>`;
}

/** The homepage process rail: one hairline, a ✦ station per step. */
export function rail(steps) {
    return `<ol class="rail" data-rail>${steps.map(({ num, title, text }) => `
        <li class="rail__step">
          <span class="rail__num">${esc(num)}</span>
          <h3 class="rail__title">${title}</h3>
          ${text ? `<p class="rail__text">${text}</p>` : ''}
        </li>`).join('')}
      </ol>`;
}

/** Responsive <img> for one of the homepage work screenshots (public/work-*.webp, 1280×960). */
export function workImg(name, alt, { sizes = '(max-width: 768px) calc(100vw - 3rem), 33vw' } = {}) {
    return `<img src="/${name}.webp" srcset="/${name}-640.webp 640w, /${name}-960.webp 960w, /${name}.webp 1280w" sizes="${sizes}" width="1280" height="960" alt="${esc(alt)}" loading="lazy" decoding="async">`;
}

/** Small uppercase pills, as on the homepage work cards. */
export function tags(list) {
    return `<div class="tags">${list.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>`;
}

/** Sticky label column: eyebrow + h2 (+ optional figure beneath). */
export function label(eyebrow, h2, extra = '') {
    return `<div class="section__label"><span class="eyebrow">${esc(eyebrow)}</span><h2>${h2}</h2>${extra}</div>`;
}
