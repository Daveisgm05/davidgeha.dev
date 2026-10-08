// Media hooks: the scrubbed 3D film (P73), looping films (P46) and the cursor.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whenNear } from './gl.js';
import { dur, ease, reduced, lowTier, finePointer } from './tokens.js';

// ------------------------------------------------------------------ P73 frame film
// [data-sequence] (a tall stage) > [data-sequence-canvas] on a sticky layer. A Blender
// render (Cycles), one frame per scroll step: scroll position → frame. The set matches the
// canvas: phones a portrait set, a canvas over XL_PX wide (Retina, 1440p and up) the large
// set. Frames are fetched coarse-to-fine (every 8th first) at low priority and kept
// compressed; only the frames within WINDOW of the playhead are decoded, off the main
// thread (createImageBitmap), and the rest are let go — so a draw never waits on a decode
// and memory stays bounded however long the film. Static profile: the poster frame only.
const XL_PX = 2000;
const WINDOW = 8;   // decoded frames kept either side of the playhead
const DITHER = 6;   // ± grey levels of the fixed noise laid over each frame (soft-light): ≈ ±3 levels in the darks
export function sequence(el) {
    const canvas = el.querySelector('[data-sequence-canvas]');
    const ctx = canvas.getContext('2d');
    const total = parseInt(el.dataset.frames, 10);
    const phone = window.matchMedia('(max-width: 760px)').matches;
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);
    const pattern = (phone && el.dataset.srcPhone)
        || (el.dataset.srcXl && canvas.clientWidth * dpr() > XL_PX && el.dataset.srcXl) || el.dataset.src;
    const url = (i) => pattern.replace('{i}', String(i + 1).padStart(3, '0'));
    const blobs = new Array(total);          // compressed frames, ≈ 30–50 KB each
    const asked = new Array(total).fill(false);
    const bitmaps = new Map();               // decoded frames near the playhead: frame → ImageBitmap
    const pending = new Set();
    let current = -1, want = Math.round(total * 0.08), dead = false;

    const fit = () => {
        canvas.width = Math.round(canvas.clientWidth * dpr());
        canvas.height = Math.round(canvas.clientHeight * dpr());
        ctx.imageSmoothingEnabled = true;   // a resize resets the context: set the resampling again
        ctx.imageSmoothingQuality = 'high';
        current = -1; draw(want);
    };
    const nearestDecoded = (i) => {
        for (let d = 0; d < total; d++) {
            if (bitmaps.has(i - d)) return i - d;
            if (bitmaps.has(i + d)) return i + d;
        }
        return -1;
    };
    // decode the nearest missing frames around the playhead, two at a time; let go of the far ones
    const decodeAround = () => {
        for (const [k, bmp] of bitmaps) if (Math.abs(k - want) > WINDOW && k !== current) { bmp.close(); bitmaps.delete(k); }
        while (pending.size < 2) {
            let next = -1;
            for (let d = 0; d <= WINDOW && next < 0; d++) {
                for (const k of [want + d, want - d]) {
                    if (k >= 0 && k < total && blobs[k] && !bitmaps.has(k) && !pending.has(k)) { next = k; break; }
                }
            }
            if (next < 0) return;
            pending.add(next);
            createImageBitmap(blobs[next]).then((bmp) => {
                if (dead) return bmp.close();
                bitmaps.set(next, bmp);
                if (current < 0 || Math.abs(next - want) < Math.abs(current - want)) { current = -1; draw(want); }
            }).catch(() => {}).finally(() => { pending.delete(next); if (!dead) decodeAround(); });
        }
    };
    let noise;
    const grain = () => {
        if (noise) return noise;
        const tile = document.createElement('canvas');
        tile.width = tile.height = 256;
        const g = tile.getContext('2d'), px = g.createImageData(256, 256);
        for (let p = 0; p < px.data.length; p += 4) {
            px.data[p] = px.data[p + 1] = px.data[p + 2] = 128 - DITHER + Math.floor(Math.random() * (2 * DITHER + 1));
            px.data[p + 3] = 255;
        }
        g.putImageData(px, 0, 0);
        return (noise = ctx.createPattern(tile, 'repeat'));
    };
    function draw(i) {
        want = i;
        decodeAround();
        const k = nearestDecoded(i);
        if (k < 0 || k === current) return;
        current = k;
        const img = bitmaps.get(k), cw = canvas.width, ch = canvas.height;
        const s = Math.max(cw / img.width, ch / img.height);
        const w = img.width * s, h = img.height * s;
        const bias = 0.5;
        // phones: lift the core into the open top half, above the copy
        const lift = cw / ch < 1 ? ch * 0.17 : 0;
        const x = (cw - w) * bias, y = (ch - h) / 2 - lift;
        ctx.drawImage(img, x, y, w, h);
        // the render's dither, put back: lossy frames turn a dark gradient into faint steps
        ctx.globalCompositeOperation = 'soft-light';
        ctx.fillStyle = grain();
        ctx.fillRect(x, y, w, h);
        ctx.globalCompositeOperation = 'source-over';
    }
    const load = (i) => {
        if (asked[i]) return Promise.resolve();
        asked[i] = true;
        return fetch(url(i), { priority: 'low' })
            .then((r) => (r.ok ? r.blob() : null))
            .then((blob) => { if (blob && !dead) { blobs[i] = blob; if (Math.abs(i - want) <= WINDOW) decodeAround(); } })
            .catch(() => {});
    };
    const stop = () => { dead = true; for (const bmp of bitmaps.values()) bmp.close(); bitmaps.clear(); };

    const isStatic = reduced() || lowTier();
    if (isStatic) {
        el.classList.add('is-static');
        load(want).then(fit);
        window.addEventListener('resize', fit);
        return () => { stop(); window.removeEventListener('resize', fit); };
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
    return () => { stop(); st?.kill(); ro.disconnect(); };
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
