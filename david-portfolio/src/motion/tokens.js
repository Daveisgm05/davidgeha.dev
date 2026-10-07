// Motion tokens: the only place durations, eases and staggers are defined (web-motion-craft
// motion-tokens, A1 tempo = the defaults; A1's "slow end" picks md–lg for reveals).
// Tune the feel here, never inside an animation.
export const dur = {
    xxs: 0.2,
    xs: 0.3,
    sm: 0.5,
    md: 0.6,
    lg: 0.8,
    xl: 1.2,
    hero: 1.5,
};

export const ease = {
    out: 'power2.out',
    inOut: 'power2.inOut',
    char: 'power3.out',
    scrub: 'none',
    softOut: 'power1.out',
    expo: 'expo.inOut',
    land: 'power4.out',
    in: 'power2.in',
};

export const stagger = { char: 0.02, word: 0.03, token: 0.045, row: 0.06, item: 0.05, line: 0.15 };

// Knobs for the inspired pieces (DESIGN.md "Feel knobs").
export const knobs = {
    lenisLerp: 0.1,           // smooth-scroll feel; 0.12 is less laggy after a trackpad flick
    marqueeSpeed: 40,         // seconds per loop at rest (P14 base speed)
    marqueeBoost: 5,          // max velocity multiplier
    stackScale: 0.9,          // how far a covered card shrinks (P31 variation)
    followerLag: 0.45,        // P12 follower quickTo duration
    magnet: 0.3,              // circle button pull, fraction of pointer offset
    logChar: 0.007,           // seconds per character in the build log typewriter
};

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const lowTier = () => {
    const c = navigator.connection;
    return !!(c && (c.saveData || /2g/.test(c.effectiveType || '')));
};
// No graphics chip: the browser would draw WebGL and canvas in software on the processor (a headless or test
// browser, a virtual machine, a blocklisted GPU). Every canvas and 3D piece then shows its still frame, as under
// reduced motion — a frame loop in software keeps the main thread busy for seconds. Checked once.
let soft;
export const noGPU = () => {
    if (soft !== undefined) return soft;
    try {
        const g = document.createElement('canvas').getContext('webgl');
        const info = g && g.getExtension('WEBGL_debug_renderer_info');
        const renderer = info ? String(g.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
        soft = !g || /swiftshader|llvmpipe|softpipe|software|basic render|offscreen/i.test(renderer);
        g?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch { soft = true; }
    return soft;
};
