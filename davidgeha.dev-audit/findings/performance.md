# Performance Audit — davidgeha.dev

Audited: 2026-09-19
Method: Lighthouse 13.5.0 CLI (lab data only — CrUX/PSI field data unavailable: no Google API key configured, anonymous PSI quota exhausted). Mobile run: `--form-factor=mobile --screenEmulation.mobile --throttling-method=simulate`. Desktop run: `--preset=desktop --throttling-method=simulate`.

Raw reports: `lighthouse-mobile.json`, `lighthouse-desktop.json` (this directory). Trace screenshot evidence: `thumb_*ms.jpg` (mobile), `dthumb_*ms.jpg` (desktop).

## Scores

| | Mobile | Desktop |
|---|---|---|
| Performance | **79/100** | **95/100** |
| Accessibility | 96 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

## Core Web Vitals (lab)

| Metric | Mobile | Desktop | Threshold (good) | Status |
|---|---|---|---|---|
| LCP | 3.6s | 0.9s | ≤2.5s | Mobile: **Needs Improvement** · Desktop: Good |
| INP (TBT proxy) | 0ms TBT | 0ms TBT | ≤200ms | Good (no long tasks measured) |
| CLS | 0 | 0.013 | ≤0.1 | Good |

No CrUX field data was available to cross-check the 75th-percentile real-user experience. Given finding #1 below, the **real-world LCP/perceived-load experience is very likely worse than this lab number**, and it is the single most important thing to verify once field data is available (CrUX Vis / PSI, once an API key is configured).

## Findings, prioritized by expected impact

### 1. CRITICAL — Full-screen intro "curtain" blocks all real content on every visit
`src/components/Loader.jsx` renders a fixed, `z-index: 9999`, full-viewport overlay (`inset:0`, no `pointer-events` opt-out) on **every fresh page load** (any load where `window.scrollY <= 4` and no URL hash — i.e. essentially every first-time and repeat visitor landing on `/`). It runs a hardcoded `TOTAL_DUR = 2450ms` count-up/progress-bar animation (`FALLBACK_MS = 4500ms` safety net) before dispatching `app:intro-ready`, which is what `Header.jsx` waits for before even starting the hero name's entrance animation (`gsap.timeline` starting at `yPercent:115`, i.e. hidden below its box).

Trace screenshots prove this empirically:
- Mobile: at 1396ms the curtain ("David Geha / AI CONSULTANT" + progress bar at 39%) is still the only thing on screen; real hero content ("DAVID GEHA" + portrait) doesn't appear until the 3722ms frame.
- Desktop: the curtain is *still* covering the page at the 3269ms frame (last captured thumbnail).

Two consequences:
- **Perceived load time is ~2.5–3.7s of blank/branded curtain on every load**, independent of how fast the server/JS actually are (TTFB is only 266ms mobile / 262ms desktop). No `sessionStorage`/`localStorage` gate exists, so returning visitors see the same forced curtain every single time, not just on a true first visit.
- The overlay has no `pointer-events` exclusion, so any tap/click during the curtain is swallowed with zero visible feedback (a "dead click" UX problem, separate from the INP metric itself, since the overlay has no click handler).
- Note: Lighthouse's lab LCP metric (3.6s mobile) actually **undercounts** this — the LCP breakdown insight resolves the hero `<span>` (`DAVID`) as the LCP element with a render delay of only ~1.09s, which appears to be an early, largely invisible/occluded paint of that node before the curtain fully takes over, not the moment a user can actually perceive the page. Real CrUX field LCP will very likely be pulled from the same early paint (so it may look passable in aggregate CrUX numbers), but actual user-perceived readiness is materially worse — this is a strong argument for fixing it regardless of what the CWV dashboard eventually shows.

**Recommendation:** Cut `TOTAL_DUR` drastically (target <400–600ms, ideally skip animation on repeat visits with a `sessionStorage` flag) or remove the mandatory curtain entirely and replace with a much lighter (sub-500ms) fade that doesn't gate the hero's own entrance. Expected impact: this is the largest lever on the site for both lab and (likely) field LCP/perceived performance — bigger than any image or font optimization below.

Files: `david-portfolio/src/components/Loader.jsx` (lines 5–8, 24–68), `david-portfolio/src/lib/introGate.js`, `david-portfolio/src/components/Header.jsx` (lines 57–100).

### 2. HIGH — Render-blocking Google Fonts request chain
`render-blocking-insight`: **Est. savings 1,850ms (mobile) / 280ms (desktop)**. Despite the existing `<link rel="preload" as="style" onload="this.rel='stylesheet'">` trick in `index.html` (lines 310–320), Lighthouse still flags the Google Fonts CSS request and the local `index-CYYM1UeV.css` bundle as render-blocking. The network dependency tree shows a 3-hop chain (HTML → `fonts.googleapis.com/css2...` → `fonts.gstatic.com/*.woff2`) with a longest chain duration of 961ms, which lines up closely with the hero text's render-delay window.

**Recommendation:** Self-host the ~3 critical font files (Inter 400/500/600, Playfair Display 400/500/600) as WOFF2, add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for just the above-the-fold weights, keep `font-display: swap`, and drop the Google Fonts origin round-trip (saves 2 DNS/TLS/HTTP hops). This also removes the residual desktop CLS (0.013, entirely attributed by `cls-culprits-insight` to the `hero__word` span reflowing when Playfair Display / Inter swap in).

Files: `david-portfolio/index.html` lines 310–320.

### 3. HIGH — Unoptimized 1.4MB hero portrait PNG
`/david_transparent.png` is **1.43MB** — 74% of the page's total 1.94MB transfer weight — used as the diffuse texture for the WebGL2 depth-parallax portrait effect (`src/components/HeroPortrait.jsx`, `diffuse` prop default). It's an uncompressed-looking PNG-with-alpha; `david_depth.png` (71KB) is fine by comparison.

**Recommendation:** Convert to WebP (WebP supports alpha; near-lossless quality ~80–90 should be visually indistinguishable for a texture) and cap resolution to what the canvas can actually display (`resize()` in `HeroPortrait.jsx` clamps `devicePixelRatio` to 2, so the source only needs to cover the largest expected on-screen portrait box × 2). Expect roughly 300–900KB savings on a single file — the biggest single byte-weight win available on this page.

File: `david-portfolio/src/components/HeroPortrait.jsx` line 175; source asset `david-portfolio/public/david_transparent.png` (or wherever it's served from root).

### 4. MEDIUM — Work-thumbnail images still serving oversized source despite srcset
`image-delivery-insight` (mobile only, desktop scores 1.0 — see note below): **Est. savings 230KB** across 4 thumbnails (`work-outreach-v2.webp`, `work-research-v2.webp`, `work-crm-v3.webp`, `work-ads-v2.webp`), each rendered at 362×271 CSS px but the delivered resource matches the full 1280×960 master (e.g. `work-outreach-v2.webp` at 85.2KB vs. a needed ~7KB).

`SelectedWork.jsx` (lines 76–85) **already has correct-looking markup**:
```jsx
<img
  src={project.image}
  srcSet={`${project.image.replace('.webp', '-640.webp')} 640w, ${project.image.replace('.webp', '-960.webp')} 960w, ${project.image} 1280w`}
  sizes="(max-width: 768px) 92vw, 640px"
  width="1280" height="960"
  loading="lazy" decoding="async"
/>
```
and the `-640.webp`/`-960.webp` variants exist as generated files in the repo (currently untracked per `git status`). The mobile Lighthouse run's emulated device pixel ratio combined with the `92vw` slot still resolves to the largest (1280w) candidate rather than the 640/960w ones. Since the browser's own resource-selection algorithm picked the biggest candidate here, this isn't a markup bug so much as the `sizes` value being looser than the real rendered box (362px CSS width, not the ~379px that `92vw` implies at this viewport) combined with a fairly high test-device DPR.

**Recommendation:** Tighten `sizes` to the true max rendered width (e.g. a fixed `362px`/`380px` value instead of a vw-based estimate) and verify with real-device testing (Chrome DevTools device toolbar at a couple of DPRs) that the 640w/960w variants are actually selected before shipping. Confirm the same fix is applied to any other `<img>` using this same `project.image` value (e.g. the desktop hover-preview stack a few lines below, if it renders these images without srcset).

Files: `david-portfolio/src/components/SelectedWork.jsx` lines 76–85; new assets `david-portfolio/public/work-*-640.webp`, `work-*-960.webp` (currently untracked, not yet fully leveraged).

### 5. MEDIUM — 46% unused JavaScript in the main bundle
`unused-javascript`: `assets/index-BE7mlwOu.js` (105KB transferred) has **48.5KB (46%) unused** on initial load. `bootup-time` attributes 620ms total script cost to this one file (mobile). No duplicated or legacy JS was found (`duplicated-javascript-insight` / `legacy-javascript-insight` both score 1.0, 0 wasted bytes), so this isn't a bundling hygiene issue — it's more likely code for below-the-fold or conditionally-used features (the WebGL hero portrait shaders/matrix math, GSAP timelines for sections not yet in view, FAQ/Services interactivity) being bundled into the critical initial chunk.

**Recommendation:** Code-split `HeroPortrait`'s WebGL code and any below-the-fold component logic (FAQ accordion, Services, marquee) behind `React.lazy()`/dynamic `import()` so the initial bundle only contains what's needed for first paint. TBT is already 0ms so this is not urgent for INP, but it reduces main-thread script cost and total-byte-weight contribution.

File: `david-portfolio/src/App.jsx` (component composition), built asset `assets/index-BE7mlwOu.js`.

### 6. LOW — Minor desktop CLS from font swap (already passing)
`cls-culprits-insight` (desktop): CLS 0.013, entirely attributed to the `header#top > div.hero > h1.hero__name > span.hero__word` nodes reflowing when the Playfair Display / Inter web fonts swap in. Already well under the 0.1 "good" threshold — no action required beyond the font self-hosting in finding #2, which will eliminate this residual shift as a side effect.

### 7. INFORMATIONAL — Healthy baseline signals
- DOM size: 236 elements, max depth 12, max children 16 — small and healthy, no action needed.
- TBT: 0ms on both mobile and desktop — no long main-thread tasks; INP should be good for interactions **once the intro curtain (finding #1) is no longer intercepting early clicks**.
- No render-blocking third-party scripts beyond Google Fonts; `third-parties-insight` shows 0ms main-thread time attributed to Google Fonts.
- `modern-http-insight`, `duplicated-javascript-insight`, `legacy-javascript-insight` all clean (score 1.0).
- TTFB is excellent: 56ms mobile / 53ms server-response-time — hosting/edge delivery is not a bottleneck.

## Priority order for fixes

1. Shrink or gate the intro loader curtain (Finding #1) — largest expected impact on real-world LCP/perceived performance.
2. Self-host critical font weights with preload (Finding #2) — removes render-blocking chain, fixes residual CLS.
3. Compress/convert `david_transparent.png` to WebP (Finding #3) — largest single byte-weight reduction (~1MB+ of a 1.94MB page).
4. Tighten `sizes` on work-thumbnail `<img>` srcset (Finding #4) — ~230KB mobile savings.
5. Code-split non-critical JS out of the initial bundle (Finding #5).
