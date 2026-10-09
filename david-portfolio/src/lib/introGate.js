// Reduced motion: the hero shows its final state with no beat (Header.jsx, CSS).
export const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
