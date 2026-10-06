import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { dur, ease } from '../motion/tokens';
import { INTRO_READY_EVENT, shouldSkipIntro, markIntroPlayed, prefersReducedMotion } from '../lib/introGate';

const FALLBACK_MS = 3000; // never let the loader trap the page

/**
 * First-visit intro (inspired: P43's typewriter principle in the brand's own world).
 * The name and role are typed behind a signal caret while a mono counter runs to 100,
 * then the curtain splits open along one scan line onto the hero. ≤ 1.5 s, once per
 * session; reduced motion and mid-page arrivals skip it (lib/introGate.js).
 * The letters are revealed with clip steps, never by rewriting the text.
 */
const Loader = () => {
    const [done, setDone] = useState(false);
    // decided once, on the first render: reduced motion or a repeat/mid-page arrival skips the curtain
    const [skip] = useState(() => prefersReducedMotion() || shouldSkipIntro());
    const root = useRef(null);

    useEffect(() => {
        if (skip) {
            markIntroPlayed();
            // the hero still waits on this event, so send it even when the curtain is skipped
            window.dispatchEvent(new Event(INTRO_READY_EVENT));
            return;
        }

        document.documentElement.classList.add('is-loading');
        let finished = false;
        const finish = () => {
            if (finished) return;
            finished = true;
            document.documentElement.classList.remove('is-loading');
            markIntroPlayed();
            setDone(true);
        };
        const fallback = window.setTimeout(() => { finish(); window.dispatchEvent(new Event(INTRO_READY_EVENT)); }, FALLBACK_MS);

        const el = root.current;
        const lines = el.querySelectorAll('.loader__line');
        const count = { v: 0 };
        const num = el.querySelector('.loader__num');
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ onComplete: () => { window.clearTimeout(fallback); finish(); } });
            lines.forEach((line, i) => {
                const n = line.textContent.length;
                tl.fromTo(line, { clipPath: 'inset(0 100% 0 0)' }, {
                    clipPath: 'inset(0 0% 0 0)', duration: n * 0.035, ease: `steps(${n})`,
                }, i ? '+=0.05' : 0.1);
            });
            tl.to(count, {
                v: 100, duration: 0.95, ease: ease.inOut,
                onUpdate: () => { num.style.setProperty('--n', Math.round(count.v)); },
            }, 0.1);
            tl.to(el.querySelector('.loader__bar i'), { scaleX: 1, duration: 0.95, ease: ease.inOut }, 0.1);
            // the hero starts while the curtain opens: the two beats overlap, never a gap
            tl.call(() => window.dispatchEvent(new Event(INTRO_READY_EVENT)), null, 1.1);
            tl.to(el.querySelector('.loader__inner'), { opacity: 0, duration: dur.xs, ease: ease.in }, 1.05);
            tl.to(el, { clipPath: 'inset(50% 0% 50% 0%)', duration: dur.md, ease: ease.expo }, 1.1);
        }, el);

        return () => {
            window.clearTimeout(fallback);
            ctx.revert();
            document.documentElement.classList.remove('is-loading');
        };
    }, [skip]);

    if (skip || done) return null;

    return (
        <div className="loader" ref={root} aria-hidden="true">
            <div className="loader__inner">
                <span className="loader__line loader__logo">David Geha</span>
                <span className="loader__row">
                    <span className="loader__line loader__tag">AI Consultant</span>
                    <span className="loader__caret"></span>
                </span>
                <span className="loader__bar"><i></i></span>
                <span className="loader__num"></span>
            </div>
        </div>
    );
};

export default Loader;
