// The motion engine. Markup declares motion with data-* hooks; this file implements each
// effect once, with its reduced-motion and touch paths and a cleanup. Used by the React
// homepage (App.jsx) and the static content pages (pages.js).
//
// Hooks (DESIGN.md has the ID behind each one):
//   data-anim="tokens"     house reveal: words stream in behind a signal caret (inspired: P43 × P7)
//   data-anim="fade"       P7 fade-up (+ data-anim-delay ms); data-anim="stagger" fades the children
//   data-anim="brighten"   P8 statement that brightens word by word as it's read (scrubbed)
//   data-marquee           P14 velocity-reactive marquee
//   data-stack             P31 pinned stacking cards (+ data-stack-card, data-stack-dim)
//   data-rows              P12 rows with a cursor-follow picture (+ data-row-image, data-rows-image)
//   data-header            P25 scroll-away bar over a top scrim, with a P35 progress hairline
//   data-parallax="n"      P17 parallax, ±n yPercent across the parent's pass
//   data-drift="n"         scrubbed sideways drift, n xPercent across the section's exit
//   data-reveal="img"      P11 clip reveal of a framed picture
//   data-log               build log: lines typed word by word behind a caret (inspired: P43)
//   data-pipeline / data-rail   the process rail drawn with scroll (--progress 0 → 1)
//   data-accordion         height-animated <details> (native without JS)
//   data-magnetic          a button that leans toward the pointer
//   data-globe             the dot-matrix globe turning to Beirut (three.js, lazy; globe.js)
//   data-sequence          P73 scrubbed frame film on a sticky canvas (media.js)
//   data-film              P46 muted loop, loaded near the viewport, playing only while visible
//   data-field             the hero lattice on a 2D canvas (field.js)
//   data-portrait          the depth portrait over its <img> (portrait.js)
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { dur, ease, stagger, knobs, reduced, finePointer, lowTier } from './tokens.js';
import { globe } from './globe.js';
import { sequence, film, cursor } from './media.js';
import { field } from './field.js';
import { portrait } from './portrait.js';

gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------------ split
// Wraps every word of `el` in <span class="tk"> without touching the text itself: the
// whitespace stays as text nodes, links/<br>/<em> stay where they are, and the caret is an
// empty aria-hidden element. textContent is identical before and after (crawlers, readers).
const SKIP = '.sr-only,[aria-hidden="true"],script,style';
export function splitWords(el, { caret = false } = {}) {
    const nodes = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => (n.parentElement.closest(SKIP) || n.parentElement.classList.contains('tk')
            ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const words = [];
    for (const node of nodes) {
        const frag = document.createDocumentFragment();
        for (const part of node.textContent.split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); continue; }
            const span = document.createElement('span');
            span.className = 'tk';
            span.textContent = part;
            if (caret) {
                const c = document.createElement('i');
                c.className = 'tk__c';
                c.setAttribute('aria-hidden', 'true');
                span.appendChild(c);
            }
            frag.appendChild(span);
            words.push(span);
        }
        node.replaceWith(frag);
    }
    const revert = () => {
        for (const w of words) {
            if (!w.isConnected) continue;
            const parent = w.parentNode;
            w.replaceWith(document.createTextNode(w.firstChild ? w.firstChild.textContent : ''));
            parent.normalize();
        }
    };
    return { words, revert };
}

// ------------------------------------------------------------------ house reveal
// Token stream: each word arrives from a soft blur a beat after the one before, and a signal
// caret flashes at its right edge as it lands, so a heading reads like a model streaming it.
export function tokenTimeline(words) {
    const carets = words.map((w) => w.querySelector('.tk__c')).filter(Boolean);
    gsap.set(words, { opacity: 0, yPercent: 35, filter: 'blur(8px)' });
    gsap.set(carets, { opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(words, {
        opacity: 1, yPercent: 0, filter: 'blur(0px)',
        duration: dur.md, ease: ease.char, stagger: stagger.token,
        clearProps: 'filter,transform',
    }, 0);
    carets.forEach((c, i) => {
        tl.set(c, { opacity: 1 }, i * stagger.token);
        tl.to(c, { opacity: 0, duration: dur.xs, ease: ease.out }, i * stagger.token + stagger.token * 1.5);
    });
    return tl;
}

// ------------------------------------------------------------------ hooks
const hooks = [];
const hook = (selector, fn, { essential = false } = {}) => hooks.push({ selector, fn, essential });

hook('[data-anim="tokens"]', (el) => {
    const s = splitWords(el, { caret: true });
    const tl = tokenTimeline(s.words);
    const st = ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => tl.play() });
    return () => { st.kill(); tl.kill(); gsap.set(s.words, { clearProps: 'all' }); s.revert(); };
});

hook('[data-anim="fade"]', (el) => {
    const t = gsap.from(el, {
        opacity: 0, y: 32, duration: dur.lg, ease: ease.out,
        delay: (parseFloat(el.dataset.animDelay) || 0) / 1000,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
    return () => t.scrollTrigger?.kill();
});

hook('[data-anim="stagger"]', (el) => {
    const t = gsap.from(el.children, {
        opacity: 0, y: 28, duration: dur.lg, ease: ease.out, stagger: stagger.row * 1.5,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
    return () => t.scrollTrigger?.kill();
});

hook('[data-anim="brighten"]', (el) => {
    const s = splitWords(el);
    const t = gsap.fromTo(s.words, { opacity: 0.16 }, {
        opacity: 1, ease: ease.scrub, stagger: stagger.item,
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); gsap.set(s.words, { clearProps: 'all' }); s.revert(); };
});

hook('[data-marquee]', (el) => {
    const track = el.querySelector('.marquee__track');
    if (!track) return;
    const loop = gsap.to(track, { xPercent: -50, duration: knobs.marqueeSpeed, ease: ease.scrub, repeat: -1 });
    loop.totalTime(loop.duration() * 50); // headroom so a reversed loop never hits zero
    const skew = gsap.quickTo(track, 'skewX', { duration: dur.sm, ease: ease.out });
    let dir = 1;
    const st = ScrollTrigger.create({
        trigger: el, start: 'top bottom', end: 'bottom top',
        onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        onUpdate: (self) => {
            const v = self.getVelocity();
            dir = self.direction || dir;
            const boost = gsap.utils.clamp(1, knobs.marqueeBoost, Math.abs(v) / 200);
            gsap.to(loop, { timeScale: dir * boost, duration: 0.15, overwrite: true });
            gsap.to(loop, { timeScale: dir, duration: dur.hero, ease: ease.out, delay: 0.15 });
            skew(gsap.utils.clamp(-5, 5, -v / 400));
        },
    });
    const settle = () => skew(0);
    ScrollTrigger.addEventListener('scrollEnd', settle);
    return () => { st.kill(); loop.kill(); ScrollTrigger.removeEventListener('scrollEnd', settle); };
});

hook('[data-stack]', (el) => {
    const cards = [...el.querySelectorAll('[data-stack-card]')];
    if (cards.length < 2 || window.innerHeight < 480) return;
    el.classList.add('is-stacked');
    const stage = el.querySelector('[data-stack-stage]') || el;
    // incoming cards wait below the whole stage (cards can be shorter than it: they're sized to their pictures)
    const area = cards[0].parentElement;
    const below = () => area.offsetHeight + 24;
    gsap.set(cards.slice(1), { y: below });
    const tl = gsap.timeline({
        defaults: { ease: ease.scrub },
        scrollTrigger: {
            trigger: el, start: 'top top', pin: true, scrub: true, invalidateOnRefresh: true,
            end: () => '+=' + (cards.length - 1) * window.innerHeight * 0.85,
        },
    });
    cards.forEach((card, i) => {
        if (!i) return;
        const prev = cards[i - 1];
        tl.fromTo(card, { y: below }, { y: 0, duration: 1, immediateRender: false }, i - 1);
        tl.to(prev, { scale: knobs.stackScale, yPercent: -2.5, duration: 1 }, i - 1);
        const dim = prev.querySelector('[data-stack-dim]');
        if (dim) tl.to(dim, { opacity: 0.7, duration: 1 }, i - 1);
        const img = card.querySelector('img');
        if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1 }, i - 1);
    });
    // the counter in the stage head follows the dealt card
    const counter = stage.querySelector('[data-stack-count]');
    if (counter) {
        tl.eventCallback('onUpdate', () => {
            const n = Math.min(cards.length, Math.round(tl.progress() * (cards.length - 1)) + 1);
            counter.style.setProperty('--n', n); // drawn by a CSS counter: no text added to the page
        });
    }
    return () => { tl.scrollTrigger?.kill(); tl.kill(); gsap.set(cards, { clearProps: 'all' }); el.classList.remove('is-stacked'); };
});

hook('[data-rows]', (el) => {
    const rows = [...el.querySelectorAll('[data-row]')];
    const rules = el.querySelectorAll('[data-rule]');
    const reveal = gsap.from(rules, {
        scaleX: 0, transformOrigin: '0 50%', duration: dur.xl, ease: ease.land, stagger: stagger.row,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
    const box = el.querySelector('[data-rows-image]');
    if (!box || !finePointer()) return () => reveal.scrollTrigger?.kill();
    const img = box.querySelector('img');
    rows.forEach((r) => { const i = new Image(); i.src = r.dataset.rowImage; });
    gsap.set(box, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 });
    const xTo = gsap.quickTo(box, 'x', { duration: knobs.followerLag, ease: ease.out });
    const yTo = gsap.quickTo(box, 'y', { duration: knobs.followerLag, ease: ease.out });
    const rTo = gsap.quickTo(box, 'rotation', { duration: dur.md, ease: ease.out });
    let lastX = 0;
    const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        xTo(x); yTo(y);
        rTo(gsap.utils.clamp(-10, 10, (x - lastX) * 0.6));
        lastX = x;
    };
    const show = (row) => {
        if (img.getAttribute('src') !== row.dataset.rowImage) img.src = row.dataset.rowImage;
        gsap.to(box, { scale: 1, opacity: 1, duration: dur.sm, ease: ease.out, overwrite: 'auto' });
    };
    const hide = () => gsap.to(box, { scale: 0.6, opacity: 0, duration: dur.sm, ease: ease.out, overwrite: 'auto' });
    const enters = rows.map((r) => { const f = () => show(r); r.addEventListener('mouseenter', f); return [r, f]; });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', hide);
    return () => {
        reveal.scrollTrigger?.kill();
        enters.forEach(([r, f]) => r.removeEventListener('mouseenter', f));
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', hide);
    };
});

hook('[data-header]', (el) => {
    let lastY = window.scrollY, hidden = false, raf = 0;
    const menu = el.querySelector('details');
    const update = () => {
        raf = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.classList.toggle('is-compact', y > 64);
        if (y > 320 && y > lastY + 6) hidden = true;
        else if (y < lastY - 6 || y < 320) hidden = false;
        el.classList.toggle('is-hidden', hidden && !(menu && menu.open));
        el.style.setProperty('--scroll', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
        lastY = y;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    // the phone sheet closes on a link tap or a tap outside
    const onDoc = (e) => { if (menu?.open && (!menu.contains(e.target) || e.target.closest('a'))) menu.open = false; };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    document.addEventListener('click', onDoc);
    return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        document.removeEventListener('click', onDoc);
    };
}, { essential: true });

hook('[data-parallax]', (el) => {
    const amt = parseFloat(el.dataset.parallax) || 8;
    const t = gsap.fromTo(el, { yPercent: -amt }, {
        yPercent: amt, ease: ease.scrub,
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
});

hook('[data-drift]', (el) => {
    const amt = parseFloat(el.dataset.drift) || -20;
    const trigger = el.closest('[data-drift-scope]') || el.parentElement;
    const t = gsap.to(el, {
        xPercent: amt, ease: ease.scrub,
        scrollTrigger: { trigger, start: 'top top', end: 'bottom top', scrub: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
});

hook('[data-reveal="img"]', (el) => {
    const img = el.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round var(--radius))' }, {
        clipPath: 'inset(0% 0% 0% 0% round var(--radius))', duration: dur.xl, ease: ease.land,
    });
    if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: dur.xl * 1.4, ease: ease.land }, 0);
    return () => { tl.scrollTrigger?.kill(); tl.kill(); gsap.set([el, img], { clearProps: 'all' }); };
});

hook('[data-log]', (el) => {
    const lines = [...el.querySelectorAll('[data-log-line]')];
    const reverts = [];
    // phones: the log is several screens tall, so each line types when it reaches the
    // screen instead of the whole log typing off-screen from the first trigger
    if (window.matchMedia('(max-width: 760px)').matches) {
        const parts = lines.map((line) => {
            const tl = gsap.timeline({ paused: true });
            typeLine(tl, line, 0, reverts);
            const st = ScrollTrigger.create({ trigger: line, start: 'top 88%', once: true, onEnter: () => tl.play() });
            return { tl, st };
        });
        return () => { parts.forEach(({ tl, st }) => { st.kill(); tl.kill(); }); gsap.set(lines, { clearProps: 'all' }); reverts.forEach((r) => r()); };
    }
    const tl = gsap.timeline({ paused: true });
    let t = 0;
    for (const line of lines) t = typeLine(tl, line, t, reverts);
    const st = ScrollTrigger.create({ trigger: el, start: 'top 75%', once: true, onEnter: () => tl.play() });
    return () => { st.kill(); tl.kill(); gsap.set(lines, { clearProps: 'all' }); reverts.forEach((r) => r()); };
});

// one build-log line on a timeline from t: dot, words typed behind a caret, then the tags
function typeLine(tl, line, t, reverts) {
    const dot = line.querySelector('[data-log-dot]');
    const typed = [...line.querySelectorAll('[data-log-type]')];
    const rest = line.querySelectorAll('[data-log-after]');
    gsap.set(line, { opacity: 0 });
    tl.set(line, { opacity: 1 }, t);
    if (dot) tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: dur.sm, ease: ease.out }, t);
    for (const part of typed) {
        const s = splitWords(part, { caret: true });
        reverts.push(s.revert);
        gsap.set(s.words, { opacity: 0 });
        for (const w of s.words) {
            const c = w.querySelector('.tk__c');
            tl.set(w, { opacity: 1 }, t);
            if (c) { tl.set(c, { opacity: 1 }, t); }
            t += (w.textContent.length + 1) * knobs.logChar;
            if (c) tl.set(c, { opacity: 0 }, t);
        }
        t += 0.08;
    }
    if (rest.length) tl.fromTo(rest, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: dur.sm, ease: ease.out, stagger: stagger.item }, t);
    return t + 0.12;
}

const railHook = (el) => {
    gsap.set(el, { '--progress': 0 });
    const t = gsap.to(el, {
        '--progress': 1, ease: ease.scrub,
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 30%', scrub: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); el.style.setProperty('--progress', 1); };
};
hook('[data-pipeline]', railHook);
hook('[data-rail]', railHook);

hook('[data-accordion]', (el) => {
    const items = [...el.querySelectorAll('details')];
    const handlers = items.map((d) => {
        const summary = d.querySelector('summary');
        const onClick = (e) => {
            e.preventDefault();
            const closedH = summary.offsetHeight;
            if (d.open) {
                d.classList.add('is-closing');
                gsap.fromTo(d, { height: d.offsetHeight }, {
                    height: closedH, duration: dur.sm, ease: ease.inOut, overflow: 'hidden',
                    onComplete: () => { d.open = false; d.classList.remove('is-closing'); gsap.set(d, { clearProps: 'height,overflow' }); },
                });
            } else {
                d.open = true;
                const openH = d.offsetHeight;
                gsap.fromTo(d, { height: closedH, overflow: 'hidden' }, {
                    height: openH, duration: dur.md, ease: ease.inOut,
                    onComplete: () => gsap.set(d, { clearProps: 'height,overflow' }),
                });
            }
        };
        summary.addEventListener('click', onClick);
        return () => summary.removeEventListener('click', onClick);
    });
    return () => handlers.forEach((f) => f());
});

hook('[data-magnetic]', (el) => {
    if (!finePointer()) return;
    const xTo = gsap.quickTo(el, 'x', { duration: dur.md, ease: ease.out });
    const yTo = gsap.quickTo(el, 'y', { duration: dur.md, ease: ease.out });
    const onMove = (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * knobs.magnet);
        yTo((e.clientY - (r.top + r.height / 2)) * knobs.magnet);
    };
    const onLeave = () => { xTo(0); yTo(0); };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); };
});

// [data-spot] / the panels below: a soft signal light follows the pointer across the surface
// (--mx / --my, drawn by site.css), so cards and panels answer the cursor. Fine pointers only.
const SPOT = '[data-spot], .work-card, .log, .contact__slab, .card, .glance, .toc__inner';
hook(SPOT, (el) => {
    if (!finePointer()) return;
    el.classList.add('spot');
    let raf = 0, x = 0, y = 0;
    const set = () => { raf = 0; el.style.setProperty('--mx', x + 'px'); el.style.setProperty('--my', y + 'px'); };
    const onMove = (e) => { const r = el.getBoundingClientRect(); x = e.clientX - r.left; y = e.clientY - r.top; if (!raf) raf = requestAnimationFrame(set); };
    el.addEventListener('pointermove', onMove);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointermove', onMove); el.classList.remove('spot'); };
});

// async hooks (GL hosts mount when they come near): the cleanup waits for the mount
const later = (fn) => (el) => {
    let cleanup = null, dead = false;
    Promise.resolve(fn(el)).then((c) => { if (dead) c?.(); else cleanup = c; });
    return () => { dead = true; cleanup?.(); };
};
hook('[data-globe]', later(globe));
hook('[data-sequence]', sequence, { essential: true });
hook('[data-film]', film);
hook('[data-field]', field, { essential: true });
hook('[data-portrait]', later(portrait));

// ------------------------------------------------------------------ hero beat (static pages)
// Every [data-hero-hide] in the hero focuses in once, in document order; the H1 streams in
// with the house reveal and the picture opens with P11's clip.
export function heroBeat(scope = document) {
    const items = [...scope.querySelectorAll('[data-hero-hide]')];
    if (!items.length) return null;
    const tl = gsap.timeline({ delay: 0.1 });
    let at = 0;
    const reverts = [];
    for (const el of items) {
        const kind = el.dataset.heroHide;
        gsap.set(el, { opacity: 1 });
        if (kind === 'tokens') {
            const s = splitWords(el, { caret: true });
            reverts.push(s.revert);
            const inner = tokenTimeline(s.words);
            tl.add(inner.play(), at);
            at += 0.25;
        } else if (kind === 'media') {
            const img = el.querySelector('img');
            tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round var(--radius))' }, { clipPath: 'inset(0% 0% 0% 0% round var(--radius))', duration: dur.hero, ease: ease.land }, 0.15);
            if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: dur.hero * 1.3, ease: ease.land }, 0.15);
        } else {
            tl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: dur.lg, ease: ease.out }, at);
            at += 0.08;
        }
    }
    return () => { tl.kill(); reverts.forEach((r) => r()); };
}

// ------------------------------------------------------------------ init
let navOffset = () => (document.querySelector('.site-header .nav')?.offsetHeight || 72) + 16;

export function initMotion({ root = document, onLenis } = {}) {
    const html = document.documentElement;
    const isStatic = reduced() || lowTier();
    const cleanups = [];
    let lenis = null;

    if (!isStatic) {
        html.classList.add('motion');
        lenis = new Lenis({ lerp: knobs.lenisLerp, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        const tick = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => { gsap.ticker.remove(tick); lenis.destroy(); });
        onLenis?.(lenis);
    } else {
        document.querySelectorAll('[data-hero-hide]').forEach((el) => { el.style.opacity = 1; });
        document.querySelectorAll('[data-pipeline],[data-rail]').forEach((el) => el.style.setProperty('--progress', 1));
    }

    // in-page anchors glide (and clear the fixed bar) instead of jumping
    const onClick = (e) => {
        const a = e.target.closest('a[href*="#"]');
        if (!a) return;
        const url = new URL(a.href, location.href);
        if (url.pathname !== location.pathname || !url.hash || url.hash.length < 2) return;
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (!target) return;
        e.preventDefault();
        const top = url.hash === '#top' ? 0 : target;
        if (lenis) lenis.scrollTo(top, { offset: top === 0 ? 0 : -navOffset(), duration: dur.xl });
        else window.scrollTo({ top: top === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY - navOffset() });
        history.replaceState(null, '', url.hash);
    };
    document.addEventListener('click', onClick);
    cleanups.push(() => document.removeEventListener('click', onClick));

    const ctx = gsap.context(() => {
        for (const { selector, fn, essential } of hooks) {
            if (isStatic && !essential) continue;
            root.querySelectorAll(selector).forEach((el) => {
                const c = fn(el);
                if (typeof c === 'function') cleanups.push(c);
            });
        }
    });

    if (!isStatic) { const c = cursor(); if (c) cleanups.push(c); }

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });

    return {
        lenis,
        isStatic,
        destroy() {
            window.removeEventListener('load', refresh);
            cleanups.reverse().forEach((f) => f());
            ctx.revert();
            html.classList.remove('motion');
        },
    };
}

export { gsap, ScrollTrigger };
