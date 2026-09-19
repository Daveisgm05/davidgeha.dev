# Visual / UX Audit — davidgeha.dev
Captured 2026-09-19 via Playwright (Chromium), reduced-motion enabled, 3.5s settle + full scroll pass to clear the loader curtain and trigger reveal animations before each capture.

## Score: 80 / 100

## Screenshots
- `screenshots/desktop.png` — above-the-fold, 1920x1080
- `screenshots/desktop_full.png` — full page, 1920px wide
- `screenshots/mobile.png` — above-the-fold, 375x812 (iPhone viewport, 2x DPR)
- `screenshots/mobile_full.png` — full page, 375px wide

## Above-the-Fold Analysis

### Desktop (1920x1080) — Good
- Value proposition is fully visible without scrolling: eyebrow "AI AUTOMATION · LEBANON", H2 "AI consultant", and the supporting sentence ("I find the repetitive work in your business and build agentic AI systems that run it for you.") all render inside the viewport.
- Both CTAs are visible above the fold: nav "Let's talk" (mailto, top nav) and hero "Let's collaborate" (`#work` anchor, top ≈950px of 1080).
- Nav (Work / About / Contact), status pill ("Available for new projects"), and social pills (Instagram/LinkedIn/GitHub) are all visible with no overlap.
- No layout shift artifacts observed once the loader/GSAP intro settles (~3.5s); reduced-motion mode also confirmed the CSS "final state" fallback renders cleanly (per `Header.jsx`/`Header.css` — reduced motion skips the GSAP timeline and shows the settled layout directly).
- No horizontal scroll (`document.body.scrollWidth === window.innerWidth` at 1920).

### Mobile (375x812, iPhone viewport) — Needs improvement (Medium-High severity)
Measured element positions (CSS px, from real `getBoundingClientRect()` calls, not just visual inspection):
| Element | top | bottom | In viewport (812px)? |
|---|---|---|---|
| Nav "Let's talk" | 45 | 88 | Yes |
| H1 "David Geha" | 128 | 266 | Yes |
| Portrait photo | ~266 | ~660 | Yes |
| Eyebrow / H2 "AI consultant" | 666 | 703 | Yes, but only ~146px of margin left |
| Subtitle paragraph | 719 | 795 | Yes, but touches the very bottom edge (17px to spare) |
| **CTA "Let's collaborate"** | **824** | **877** | **No — starts 12px below the fold** |
| Social pills | 905 | 1016 | No |

Findings:
1. **(High) Primary hero CTA is below the fold on mobile.** "Let's collaborate" (links to `#work`) starts at y=824 against an 812px viewport — it is fully clipped and requires a scroll to discover. The only CTA visible without scrolling on mobile is the small nav "Let's talk" mailto link.
2. **(Medium) Value-prop text is cramped against the bottom edge.** The "AI consultant" H2 and its supporting sentence are technically inside the viewport but packed into the last ~150px, with the subtitle's last line landing only 17px from the bottom edge — a very tight, visually crowded reading experience directly caused by the large name headline (139px tall) + full-bleed portrait (~400px) consuming most of the 812px viewport before any positioning copy appears.
3. **(Medium) Root cause / recommendation:** on the `max-width: 768px` breakpoint (`Header.css`), reduce the portrait's height or the name's `clamp(3.5rem, 21vw, 9rem)` sizing so the eyebrow/H2/subtitle/CTA block clears ~700px instead of ~880px, or move the CTA above the socials so it lands before the fold.

## Navigation / Mobile Menu (High severity — confirmed in source)
- `Header.css` hides `.nav__links` (Work, About, Contact) at `max-width: 1024px` with **no replacement hamburger/menu** — confirmed both by rendered DOM (link elements report `width:0, height:0` at 375px) and by source inspection:
  ```css
  @media (max-width: 1024px) {
      .nav__links { display: none; }
  }
  ```
  No mobile-menu toggle button exists anywhere in `Header.jsx`. On tablet and mobile, in-page navigation to Work/About/Contact sections is only possible by manually scrolling — there is no way to jump directly to a section. This should be treated as a functional regression on any viewport ≤1024px wide (iPads included, not just phones).

## Mobile Tap Targets
- Nav "Let's talk" pill: 118×43px — height is **slightly under** the commonly recommended 44–48px minimum touch target (Apple HIG 44pt / Google Material 48dp). Minor, low severity.
- Hero "Let's collaborate": 196×54px — OK (below fold anyway).
- Social pills: ~148×49 / 137×49 / 126×49px — OK.
- "Start a project" (footer CTA): 231×80px — OK.
- No horizontal scroll or tap-target overlap detected at 375px width.

## Text Legibility
- Subtitle: `clamp(1.05rem, 1.3vw, 1.3rem)` → renders at 16.8px on mobile (meets 16px+ baseline).
- H2 "AI consultant": `clamp(2.2rem, 3.4vw, 3.4rem)` → renders at 35.2px on mobile. Good.
- Eyebrow label ("AI Automation · Lebanon"): 0.78rem (~12.5px) — small, but decorative/supplementary; the H2 restates the same info in larger type, so this is low priority.
- Contrast checked against the near-black (#0a0a0a) background:
  - Eyebrow `#8c8c92` → ≈5.9:1 (passes WCAG AA for normal text)
  - Subtitle `#9a9aa0` → ≈7.1:1 (passes WCAG AA/AAA)
  - No contrast issues found on primary copy.

## Layout / Visual Issues (full-page scroll-through)
- No overlapping elements, no cut-off/clipped text, and no broken responsive layout observed at 1920px or 375px widths across the full page (Selected Work list, "An engineer's approach" section, Recent Builds cards ×6, closing CTA).
- On desktop, the "Selected Work" list rows render as text-only rows with no inline thumbnail — this appears to be an intentional hover-triggered image-preview interaction (consistent with the recent commit "Layer work preview card above row separator lines"). On mobile the same section correctly falls back to inline thumbnails per card, which is the right touch-device pattern; not flagged as a bug, but worth a manual keyboard/touch pass to confirm the underlying work-item links are reachable without requiring hover (e.g., visible focus state for keyboard users).
- Recent Builds cards and footer CTA render correctly with no overflow at either width.

## Positioning / SEO Alignment
- Page `<title>`: "AI Consultant in Lebanon - David Geha | Agentic AI Automation" and hero copy ("AI consultant" / "AI Automation · Lebanon" / sr-only "David Geha — AI Consultant in Lebanon") are well aligned with the "AI consultant in Lebanon" ranking goal noted in memory. Visually this is reinforced on desktop but undercut on mobile by the CTA/positioning text being pushed to the very edge of (or past) the fold — worth fixing given mobile traffic share for local/consultant searches.

## Priority Fixes
1. **High** — Get the "Let's collaborate" CTA (or an equivalent primary action) above the fold on mobile; currently 100% clipped at 375×812.
2. **High** — Add a mobile/tablet navigation pattern (hamburger or condensed menu) for screens ≤1024px; `.nav__links` is currently just hidden with no alternative.
3. **Medium** — Reduce vertical space consumed by the name headline + portrait on mobile so the positioning copy isn't crammed into the last ~150px of the viewport.
4. **Low** — Increase nav "Let's talk" pill height to ≥44px on mobile.
