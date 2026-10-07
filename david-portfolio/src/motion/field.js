// The lattice ground (inspired: V25's field in the brand's schematic language): a dot grid that
// wakes up in the signal colour around the pointer, with a slow scan line passing down it.
// Beirut's coordinates are drawn into the canvas corners (pixels, not page text). Used by the
// homepage hero (HeroField.jsx) and every content page's hero ([data-field], added by pages.js).
// Paused off-screen; one still frame for reduced motion and without a graphics chip.
import { reduced, noGPU } from './tokens.js';

const GAP = 26;            // lattice spacing, CSS px
const REACH = 190;         // pointer glow radius, CSS px
const SCAN_S = 7;          // seconds per scan pass
const SIGNAL = [198, 244, 50];


export function field(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const still = reduced() || noGPU();
    let w = 0, h = 0, dpr = 1, raf = 0, running = false, onScreen = true;
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.clientWidth; h = canvas.clientHeight;
        canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (!running) draw(0);
    };

    const label = (text, x, y, align) => {
        ctx.font = '500 10px "JetBrains Mono", ui-monospace, monospace';
        ctx.textAlign = align;
        ctx.fillStyle = 'rgba(236,235,228,0.32)';
        ctx.fillText(text, x, y);
    };

    const draw = (now) => {
        ctx.clearRect(0, 0, w, h);
        ptr.x += (ptr.tx - ptr.x) * 0.12;
        ptr.y += (ptr.ty - ptr.y) * 0.12;
        const scanY = still ? -999 : ((now / 1000) % SCAN_S) / SCAN_S * (h + 200) - 100;
        const cols = Math.ceil(w / GAP) + 1, rows = Math.ceil(h / GAP) + 1;
        const ox = (w - (cols - 1) * GAP) / 2;
        for (let j = 0; j < rows; j++) {
            const y = j * GAP + 8;
            const scan = Math.max(0, 1 - Math.abs(y - scanY) / 70);
            for (let i = 0; i < cols; i++) {
                const x = ox + i * GAP;
                const d = Math.hypot(x - ptr.x, y - ptr.y);
                const glow = Math.max(0, 1 - d / REACH);
                const g = glow * glow;
                const a = 0.09 + scan * 0.16 + g * 0.75;
                const r = 0.9 + g * 1.4;
                if (g > 0.02) {
                    ctx.fillStyle = `rgba(${SIGNAL[0]},${SIGNAL[1]},${SIGNAL[2]},${a})`;
                } else {
                    ctx.fillStyle = `rgba(236,235,228,${a})`;
                }
                ctx.fillRect(x - r / 2, y - r / 2, r, r);
            }
        }
        const m = 24;
        label('33.8938° N', m, h - m - 14, 'left');
        label('35.5018° E', m, h - m, 'left');
        label('BEY / LB', w - m, h - m, 'right');
    };

    const loop = (now) => {
        draw(now);
        if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
        if (still || running || !onScreen || document.hidden) return;
        running = true; raf = requestAnimationFrame(loop);
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const onMove = (e) => {
        const r = canvas.getBoundingClientRect();
        ptr.tx = e.clientX - r.left; ptr.ty = e.clientY - r.top;
        if (ptr.x < -999) { ptr.x = ptr.tx; ptr.y = ptr.ty; }
    };
    const onLeave = () => { ptr.tx = -9999; ptr.ty = -9999; };
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; onScreen ? start() : stop(); });
    const onVis = () => (document.hidden ? stop() : start());

    resize();
    document.fonts?.ready.then(() => { if (!running) draw(0); });
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVis);
    io.observe(canvas);
    start();
    return () => {
        stop();
        io.disconnect();
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerleave', onLeave);
        document.removeEventListener('visibilitychange', onVis);
    };
}
