# Site plan: design and motion

The visual system and motion plan behind the October 2026 redesign, built with the web-motion-craft library. The
SEO layer (titles, metas, canonicals, JSON-LD, headings, copy, links, image alts, the `<noscript>` mirror, the
sitemap) was not changed by the redesign; keep it that way when restyling (see "SEO contract" below).

## Direction
- **A1 · Quiet studio** at the **showcase** level (runner-up: A2 · Loud editorial). A founder's personal brand for an
  AI consultant: confident and calm, with more motion than the direction's standard budget because the owner asked for it.
- **Brand world:** an engineer's schematic. Dark ink surfaces with one paper interlude, one accent (signal `#c6f432`),
  a dot lattice, mono labels, pipelines and run logs.
- **Type:** Inter Tight (display), Inter (body), Instrument Serif italic (the one accent face, used on "David"),
  JetBrains Mono (labels, indices, dates). Self-hosted in `public/fonts/`.
- Tokens: `src/styles/site.css` (`:root`) for CSS, and `src/motion/tokens.js` for durations, eases, staggers and
  knobs. Animations take their numbers from there, never inline.

Chrome (chosen for this project): loader inspired (P43 typewriter × brand: typed name and role, mono counter, scan-line split, ≤ 1.5 s, first visit per session) · transition none · header P25 *Scroll-away bar over a top scrim* + P35 progress hairline · menu none (inline links; native `<details>` sheet ≤ 1024 px) · footer C70 adapted · cursor none
House reveal: inspired *token stream*: words arrive from a soft blur one after another, with a signal caret flashing at each word's edge (P43 × P7)

## Home (`src/App.jsx`)
| Section | Mode | Design |
|---|---|---|
| Hero | inspired | C4's principle (one picture filling one viewport, melting into the page) with P51's depth portrait (`HeroPortrait.jsx`), V25's field as a dot lattice that glows around the pointer with a scan line (`HeroField.jsx`), a mixed-face name behind the portrait, focus brackets. Hero beat after the loader; on exit the name halves drift apart while the portrait recedes (one scrub). |
| Stack marquee | adapted | P14 velocity-reactive, V10 outline on every other name, skew by scroll speed. |
| Selected work | adapted | C41 / P31 pinned stacking cards, varied to framed "windows" (index · title · category · year bar), covered card shrinks and dims, picture settles from zoom, a CSS-counter index. The site's one pinned gallery. |
| About | adapted | V1 paper interlude; P8 statement brightening word by word; the process as a pipeline rail with a travelling packet (inspired by P35). |
| Services | adapted | C23 rows: spec-sheet rows whose rules draw in, a signal plate wipes across the hovered row (V20), a picture follows the pointer and leans with its speed (P12). Pictures are decorative (`alt=""`, `aria-hidden`). |
| Recent builds | inspired | A run log: each entry prints in order (status light, date and line typed word by word behind a caret, then the tags). |
| FAQ | adapted | Sticky label, native `<details>` with animated height (`data-accordion`). |
| Footer | adapted | C70: the call line streams in, a magnetic signal circle, an inset notched slab with the NAP, the page links and socials. |

## 3D and media layer (second pass, 2026-10-06)
| Where | What | Made with |
|---|---|---|
| Home · Services intro | C44/P73 adapted to the portfolio's own world (its project photographs: products on devices, on volcanic stone, in monochrome studio light): a scrubbed frame film on a sticky canvas (`data-sequence`). A laptop resting on basalt opens, its screen wakes on an agent's run log, and the camera comes round and pushes in; 290svh stage. Frames load coarse-to-fine; phones get a portrait set. Static profile: one poster frame. | Blender 5.2 (Cycles, headless): `docs/blender/devices.py film laptop` with the run-log screen from `docs/blender/screens.html` → `public/film/core/` (1600×900, 120 frames) and `public/film/core-m/` (720×1280) |
| Home · Recent builds | P46 muted loop of light pulsing through fibre, veiled behind a glass log panel; loads near the viewport, plays only while visible. | Higgsfield: a still (gpt_image_2_5), then a seamless 8 s loop (seedance_2_5 with the still as first and last frame) → `public/film/fibers.mp4` + poster |
| Home · Services rows | The follower pictures: each service's system on a device on basalt, the same studio as the film: the audit map (tablet), the agent run (laptop), the CRM (laptop), search and AI visibility (phone), the leads engine (laptop), the ad set and daily report (tablet). The screens are illustrative product UIs drawn for the site. | `docs/blender/devices.py still …` + `docs/blender/screens.html` → `public/img/service-0N-800.webp` |
| Every footer | A dot-matrix globe (`data-globe`, three.js, lazy): land as square dots from Natural Earth (public domain) → `public/data/land-dots.json`, a pulsing marker on Beirut, packets running arcs to Dubai, Riyadh, Doha, Kuwait City, Cairo, Istanbul, Paris and London; turns onto Beirut as the footer arrives, drag to spin. Inspired by P75. | `src/motion/globe.js`, `gl.js`, `three-lite.js` |
| Content pages | The live lattice (`field.js`) behind every hero; the depth portrait laid over the /about/ portrait (the `<img>` stays in the page). | shared modules from the homepage |
| Everywhere | A cursor accent (signal dot + lagging ring that opens over links and turns into a grab ring on the globe) and a pointer spotlight on panels and cards. Fine pointers only. | `media.js`, `engine.js` |

GL budget: the home page runs two WebGL canvases (the portrait at the top, the globe at the foot) far apart, each paused off-screen; the frame film is a 2D canvas. three.js loads only when the footer comes near (≈130 KB gzip).

## Content pages (`scripts/build-pages.mjs`, `src/pages.css`, `src/pages.js`)
The same system: the fixed bar, a static lattice, the page word as an outlined mark that drifts on scroll, a hero beat
(crumbs, eyebrow, the H1 in the house reveal, lead, meta, actions; the hero picture opens with P11's clip), P14
marquee, P11 clip reveals on figures, P17 parallax on bands, the rail drawn as the pipeline, height-animated FAQ, the
C70 footer. `pages.js` maps the page modules' existing classes onto engine hooks, so `src/pages/*.js` and the SEO
engine's generated pages need no motion markup.

## Engine
`src/motion/engine.js`: GSAP + ScrollTrigger + Lenis, one implementation per effect, declared by `data-*` hooks (the
list is at the top of the file). Every hook has a cleanup; reduced motion and save-data/2G visitors get the static
profile (no Lenis, no hidden first view, essential hooks only); the phone sheet, the rows' follower and the magnetic
button are pointer-only.

## SEO contract (do not break when restyling)
- `splitWords()` wraps words in spans without changing `textContent`; never reveal text by rewriting it (the loader
  and the log type with clip/opacity, the counters are CSS counters).
- Decorative additions carry no words: `aria-hidden`, pseudo-element `content`, or canvas pixels.
- Keep the DOM order of copy (the build log keeps date → tags → title; the grid places them).
- Check before merging a design change: build, then snapshot every page's head, headings, text, links and image alts
  with JS on and off, and diff against the previous build. The redesign passed with zero differences.

## Feel knobs
`src/motion/tokens.js` → `knobs`: `lenisLerp` 0.1 · `marqueeSpeed` 40 s · `marqueeBoost` 5 · `stackScale` 0.9 ·
`followerLag` 0.45 s · `magnet` 0.3 · `logChar` 0.007 s. Accent: `--signal` in `site.css`. Hero field: `GAP`,
`REACH`, `SCAN_S` in `HeroField.jsx`.

## Deviations from the A1 budget
Two wows on the home page (the P51 portrait at the top and the P31 stack mid-page), kept far apart with calm sections
between; the owner asked for more motion than A1's standard level.
