import React, { useEffect, useRef, useState } from 'react';
import './Loader.css';
import { INTRO_READY_EVENT, arrivedMidPage, prefersReducedMotion } from '../lib/introGate';

const COUNT_DELAY = 200;   // ms — matches the CSS fade-in delay on tag/num/bar
const COUNT_DUR = 1050;
const TOTAL_DUR = 2450;    // logo/tag/num/bar exit + curtain lift, see Loader.css
const FALLBACK_MS = 4500;  // never let the loader trap the page

const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2);

/**
 * Full-screen intro curtain, shown once per page load. Mirrors the
 * osgdev.com loader — brand mark, a counting number, a filling progress
 * bar, then a staggered exit before the whole panel lifts away — but in
 * this site's near-black/cream/blue palette and copy.
 */
const Loader = () => {
    const [hidden, setHidden] = useState(false);
    const [skip, setSkip] = useState(false);
    const numRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        if (prefersReducedMotion() || arrivedMidPage()) {
            setSkip(true);
            // The hero still waits on this event to know when it's safe to
            // play its own entrance — dispatch it even when this curtain
            // itself is skipped, so it's never left waiting forever.
            window.dispatchEvent(new Event(INTRO_READY_EVENT));
            return;
        }

        document.documentElement.classList.add('is-loading');

        let raf = 0, done = false;
        const finish = () => {
            if (done) return;
            done = true;
            cancelAnimationFrame(raf);
            window.clearTimeout(fallback);
            document.documentElement.classList.remove('is-loading');
            setHidden(true);
            window.dispatchEvent(new Event(INTRO_READY_EVENT));
        };
        const fallback = window.setTimeout(finish, FALLBACK_MS);

        const start = performance.now();
        const tick = (now) => {
            const t = now - start;
            if (t >= COUNT_DELAY) {
                const p = Math.min(1, (t - COUNT_DELAY) / COUNT_DUR);
                const eased = easeInOutQuad(p);
                const v = Math.round(eased * 100);
                if (numRef.current) numRef.current.textContent = String(v).padStart(3, '0');
                if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
            }
            if (t >= TOTAL_DUR) { finish(); return; }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(fallback);
            document.documentElement.classList.remove('is-loading');
        };
    }, []);

    if (skip || hidden) return null;

    return (
        <div className="loader" aria-hidden="true">
            <span className="loader__logo">David Geha</span>
            <span className="loader__bar"><i ref={barRef}></i></span>
            <span className="loader__tag">AI Consultant</span>
            <span className="loader__num" ref={numRef}>000</span>
        </div>
    );
};

export default Loader;
