// Progressive enhancement for the static pages (scripts/build-pages.mjs). Every page is
// complete without JS (crawlers and reader modes see everything); this adds the same
// motion system as the homepage: smooth scroll, the hero beat and the data-* hooks.
// The page modules' existing classes are mapped onto hooks here, so neither the modules
// nor the SEO engine's generated pages need to know about motion.
import { initMotion, heroBeat } from './motion/engine.js';
import { reduced, lowTier } from './motion/tokens.js';

const tag = (selector, attr, value) => document.querySelectorAll(selector).forEach((el) => {
    if (!el.hasAttribute(attr)) el.setAttribute(attr, value);
});

tag('.section__head h2, .section__label h2', 'data-anim', 'tokens');
tag('.section__head p, .prose.reveal, .toc__inner.reveal', 'data-anim', 'fade');
tag('.reveal-stagger', 'data-anim', 'stagger');
tag('.figure__frame', 'data-reveal', 'img');
tag('.band__frame img', 'data-parallax', '8');
tag('.hero__media--portrait', 'data-portrait', '');

// the live lattice behind every hero (the CSS dots stay underneath as the static form)
const panel = document.querySelector('.panel');
if (panel && !panel.querySelector('[data-field]')) {
    const c = document.createElement('canvas');
    c.className = 'panel__field';
    c.setAttribute('data-field', '');
    c.setAttribute('aria-hidden', 'true');
    panel.prepend(c);
}

initMotion();
if (!reduced() && !lowTier()) heroBeat(document.querySelector('.hero'));
