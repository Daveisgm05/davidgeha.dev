// Shared by Loader and Header so both agree, independently and
// synchronously, on whether the first-load intro sequence should run —
// no cross-component event race needed for this part of the decision.

export const INTRO_READY_EVENT = 'app:intro-ready';

export const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// A reload mid-scroll or a direct link to a hash didn't land "fresh" at
// the top of the page — playing the intro overlay/animations there would
// be confusing (or re-trigger a curtain over content the user already
// scrolled to) rather than delightful.
export const arrivedMidPage = () =>
    window.scrollY > 4 || !!window.location.hash;

// The curtain + hero entrance play once per browser session. Repeat visits
// within the session (back from a content page, a reload) land straight on
// the hero — the intro is a first impression, not a toll on every navigation.
const PLAYED_KEY = 'dg:intro-played';

export const introAlreadyPlayed = () => {
    try { return sessionStorage.getItem(PLAYED_KEY) === '1'; } catch { return false; }
};

export const markIntroPlayed = () => {
    try { sessionStorage.setItem(PLAYED_KEY, '1'); } catch { /* private mode etc. */ }
};

export const shouldSkipIntro = () => arrivedMidPage() || introAlreadyPlayed();
