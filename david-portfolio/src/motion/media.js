// Media hooks: the scrubbed 3D film (P73), looping films (P46) and the cursor.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whenNear } from './gl.js';
import { dur, ease, reduced, lowTier, finePointer } from './tokens.js';

// ------------------------------------------------------------------ P73 frame film
// [data-sequence] (a tall stage) > [data-sequence-canvas] on a sticky layer. A Blender
// render of the agent core, one frame per scroll step: scroll position → frame. Frames
// load coarse-to-fine (every 8th first) so scrubbing works before the set is complete;
// phones get a lighter set. Static profile: the poster frame only.
export function sequence(el) {
    const canvas = el.querySelector('[data-sequence-canvas]');
    const ctx = canvas.getContext('2d');
    const total = parseInt(el.dataset.frames, 10);
    const phone = window.matchMedia('(max-width: 760px)').matches;
    const pattern = (phone && el.dataset.srcPhone) || el.dataset.src;
    const url = (i) => pattern.replace('{i}', String(i + 1).padStart(3, '0'));
    const frames = new Array(total);
    let current = -1, want = Math.round(total * 0.08), dead = false;

    const fit = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(canvas.clientWidth * dpr);
        canvas.height = Math.round(canvas.clientHeight * dpr);
        current = -1; draw(want);
    };
    const nearestLoaded = (i) => {
        for (let d = 0; d < total; d++) {
            if (frames[i - d]?.complete && frames[i - d].naturalWidth) return i - d;
            if (frames[i + d]?.complete && frames[i + d].naturalWidth) return i + d;
        }
        return -1;
    };
    function draw(i) {
        want = i;
        const k = nearestLoaded(i);
        if (k < 0 || k === current) return;
        current = k;
        const img = frames[k], cw = canvas.width, ch = canvas.height;
        const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const w = img.naturalWidth * s, h = img.naturalHeight * s;
        const bias = 0.5;
        // phones: lift the core into the open top half, above the copy
        const lift = cw / ch < 1 ? ch * 0.17 : 0;
        ctx.drawImage(img, (cw - w) * bias, (ch - h) / 2 - lift, w, h);
    }
    const load = (i) => new Promise((res) => {
        if (frames[i]) return res();
        const img = new Image();
        img.decoding = 'async';
        img.onload = img.onerror = () => { if (!dead) { if (Math.abs(i - want) < Math.abs(current - want) || current < 0) { current = -1; draw(want); } } res(); };
        img.src = url(i);
        frames[i] = img;
    });

    const isStatic = reduced() || lowTier();
    if (isStatic) {
        el.classList.add('is-static');
        load(want).then(fit);
        window.addEventListener('resize', fit);
        return () => { dead = true; window.removeEventListener('resize', fit); };
    }

    let st;
    whenNear(el, '1200px').then(async () => {
        if (dead) return;
        await load(want);
        fit();
        const order = [];
        for (let step = 8; step >= 1; step = step === 1 ? 0 : Math.max(1, step >> 1)) {
            for (let i = 0; i < total; i += step) if (!order.includes(i)) order.push(i);
            if (step === 1) break;
        }
        // a few at a time, so the first coarse pass lands quickly
        const queue = order.slice();
        const worker = async () => { while (queue.length && !dead) await load(queue.shift()); };
        Promise.all([worker(), worker(), worker(), worker()]);
    });
    st = ScrollTrigger.create({
        trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.4,
        onUpdate: (self) => draw(Math.round(self.progress * (total - 1))),
    });
    // before the stage pins, ease the first frames in as it rises (no dead first screen)
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    return () => { dead = true; st?.kill(); ro.disconnect(); };
}

// ------------------------------------------------------------------ P46 looping film
// <video data-film data-src="…"> muted, looping, inline; loads near the viewport, plays only
// while visible. Static profile: the poster stays.
export function film(video) {
    if (reduced() || lowTier()) return;
    let dead = false;
    const io = new IntersectionObserver(([e]) => {
        if (dead) return;
        if (e.isIntersecting) video.play().catch(() => {});
        else video.pause();
    }, { threshold: 0.05 });
    whenNear(video, '800px').then(() => {
        if (dead) return;
        video.src = video.dataset.src;
        video.load();
        io.observe(video);
    });
    const t = gsap.fromTo(video, { scale: 1.12 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: video.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    return () => { dead = true; io.disconnect(); video.pause(); t.scrollTrigger?.kill(); t.kill(); };
}

// ------------------------------------------------------------------ cursor
// A signal dot on the pointer and a ring that lags behind it: the ring opens over links
// and buttons, and turns into a grab ring over the globe. Fine pointers only; the native
// pointer stays (this is an accent, not a replacement).
export function cursor() {
    if (!finePointer() || reduced() || lowTier()) return null;
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot'; ring.className = 'cursor-ring';
    dot.setAttribute('aria-hidden', 'true'); ring.setAttribute('aria-hidden', 'true');
    document.body.append(ring, dot);
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dx = gsap.quickTo(dot, 'x', { duration: 0.08, ease: ease.out });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.08, ease: ease.out });
    const rx = gsap.quickTo(ring, 'x', { duration: dur.sm, ease: ease.out });
    const ry = gsap.quickTo(ring, 'y', { duration: dur.sm, ease: ease.out });
    let shown = false;
    const onMove = (e) => {
        if (!shown) { shown = true; gsap.set([dot, ring], { x: e.clientX, y: e.clientY }); gsap.to([dot, ring], { opacity: 1, duration: dur.xs }); }
        dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
        const t = e.target;
        ring.classList.toggle('is-link', !!t.closest?.('a, button, summary, [data-magnetic]'));
        ring.classList.toggle('is-grab', !!t.closest?.('.is-draggable'));
        ring.classList.toggle('is-light', !!t.closest?.('.about, .service:hover'));
    };
    const onLeave = () => { shown = false; gsap.to([dot, ring], { opacity: 0, duration: dur.xs }); };
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
        window.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        dot.remove(); ring.remove();
    };
}
