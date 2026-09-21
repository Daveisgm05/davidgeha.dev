// Progressive enhancement for the static pages. Every effect here has a CSS
// fallback gated on `html.js` (added inline in <head>), so without JS the page
// renders fully visible — crawlers and reader modes see everything.
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hero entrance (mirrors the homepage's GSAP sequence with CSS keyframes).
const panel = document.querySelector('.panel');
if (panel) requestAnimationFrame(() => panel.classList.add('is-ready'));

// Scroll-triggered reveals (same contract as the homepage's <Reveal>).
const targets = document.querySelectorAll('.reveal, .reveal-stagger');
if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
} else {
    const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
        }
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    targets.forEach((el) => io.observe(el));
}

// Process rail: the fill draws in lockstep with scroll position.
const rails = document.querySelectorAll('[data-rail]');
if (rails.length) {
    if (reduced) {
        rails.forEach((el) => el.style.setProperty('--progress', 1));
    } else {
        let raf = 0;
        const update = () => {
            raf = 0;
            const vh = window.innerHeight;
            rails.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const start = vh * 0.9, end = vh * 0.35;
                const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
                el.style.setProperty('--progress', p);
            });
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
    }
}
