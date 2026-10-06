// The one WebGL stage every three.js piece mounts through (web-motion-craft's GL rules):
//   - three.js is imported lazily, only when a GL host comes near the viewport;
//   - no canvas under reduced motion, on the low tier or without WebGL: the host keeps its fallback;
//   - the pixel ratio is capped (1.5 on desktop, 1 on touch);
//   - one frame loop on gsap's ticker (in step with ScrollTrigger and Lenis), paused while the host is
//     off-screen or the tab is hidden; a lost context falls back instead of freezing;
//   - dispose() frees the renderer, its context and every listener.
import gsap from 'gsap';
import { reduced, lowTier, finePointer } from './tokens.js';

export function canGL() {
    if (reduced() || lowTier()) return false;
    try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch { return false; }
}

/** Resolves once `el` is within `margin` of the viewport (GL hosts load lazily). */
export function whenNear(el, margin = '600px') {
    return new Promise((resolve) => {
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { io.disconnect(); resolve(); }
        }, { rootMargin: margin });
        io.observe(el);
    });
}

export async function mountGL(host, { alpha = true } = {}) {
    if (!canGL()) return null;
    const three = await import('./three-lite.js');
    const canvas = document.createElement('canvas');
    canvas.className = 'gl-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);
    let renderer;
    try {
        renderer = new three.WebGLRenderer({ canvas, alpha, antialias: true, powerPreference: 'high-performance' });
    } catch {
        canvas.remove();
        return null;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, finePointer() ? 1.5 : 1);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    const frames = new Set();
    const resizes = new Set();
    let onScreen = false, running = false, last = 0, disposed = false;
    const size = () => ({ width: host.clientWidth, height: host.clientHeight });

    const tick = (time) => {
        const dt = last ? Math.min(0.05, time - last) : 0.016;
        last = time;
        frames.forEach((fn) => fn(time, dt));
    };
    const start = () => { if (!running && onScreen && !document.hidden && !disposed) { running = true; last = 0; gsap.ticker.add(tick); } };
    const stop = () => { if (running) { running = false; gsap.ticker.remove(tick); } };

    const resize = () => {
        const { width, height } = size();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        resizes.forEach((fn) => fn(width, height));
        if (!running) tick(gsap.ticker.time);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; onScreen ? start() : stop(); });
    io.observe(host);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    const onLost = (e) => { e.preventDefault(); stop(); host.dataset.gl = 'off'; canvas.remove(); };
    canvas.addEventListener('webglcontextlost', onLost);
    host.dataset.gl = 'on';

    return {
        three, renderer, canvas, dpr, size,
        onFrame: (fn) => { frames.add(fn); return () => frames.delete(fn); },
        onResize: (fn) => { resizes.add(fn); fn(size().width, size().height); return () => resizes.delete(fn); },
        resize,
        dispose() {
            disposed = true;
            stop();
            ro.disconnect();
            io.disconnect();
            document.removeEventListener('visibilitychange', onVis);
            canvas.removeEventListener('webglcontextlost', onLost);
            renderer.dispose();
            renderer.forceContextLoss?.();
            canvas.remove();
            delete host.dataset.gl;
        },
    };
}
