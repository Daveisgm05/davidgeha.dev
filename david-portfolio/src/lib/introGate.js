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
