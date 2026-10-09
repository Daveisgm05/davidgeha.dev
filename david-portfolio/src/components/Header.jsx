import React, { useLayoutEffect, useRef } from 'react';
import { gsap, splitWords, tokenTimeline } from '../motion/engine';
import { dur, ease, stagger } from '../motion/tokens';
import HeroPortrait from './HeroPortrait';
import HeroField from './HeroField';
import { ArrowUpRight } from './SiteHeader';
import { prefersReducedMotion } from '../lib/introGate';

const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
);

const LinkedInIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11.3 22 14.4V21h-4v-5.8c0-1.38-.02-3.16-1.93-3.16-1.93 0-2.23 1.5-2.23 3.06V21h-4z" />
    </svg>
);

const GitHubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.79.62-3.38-1.38-3.38-1.38-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0022 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
);

const socials = [
    { name: 'Instagram', href: 'https://www.instagram.com/dave.automates/', Icon: InstagramIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/david-geha/', Icon: LinkedInIcon },
    { name: 'GitHub', href: 'https://github.com/Daveisgm05', Icon: GitHubIcon },
];

/**
 * Home hero (inspired: C4's "one picture filling exactly one viewport, melting into the
 * black page", built from P51's depth portrait, V25's field and a mixed-face lockup).
 * The name sits behind the depth portrait. index.html carries the same hero as static markup,
 * so the intro (the page's largest paint) shows before any script; when React takes over, the
 * hero beat plays (the name rises out of its masks, the portrait settles, the role types in —
 * the intro and the nav stay where they are, never faded in), and on the
 * way out the two halves of the name drift apart while the portrait recedes (one scrub).
 */
const Header = () => {
    const heroRef = useRef(null);
    const stageRef = useRef(null);
    const roleRef = useRef(null);

    // before the first paint of the React hero, so it starts exactly where index.html's copy stood
    useLayoutEffect(() => {
        if (prefersReducedMotion()) return; // CSS shows the final state
        const hero = heroRef.current;
        let split;

        const ctx = gsap.context(() => {
            const nameWords = hero.querySelectorAll('.hero__word-inner');
            split = splitWords(roleRef.current, { caret: true });
            const role = tokenTimeline(split.words);

            gsap.set(nameWords, { yPercent: 112 });
            gsap.set(stageRef.current, { scale: 1.06 });
            gsap.set(roleRef.current, { opacity: 1 });

            const play = () => {
                gsap.timeline({ defaults: { ease: ease.land } })
                    .to(nameWords, { yPercent: 0, duration: dur.hero, stagger: stagger.line }, 0.05)
                    .to(stageRef.current, { scale: 1, duration: dur.hero * 1.2, ease: ease.out }, 0.15)
                    .add(role.play(), 0.75);
            };

            // the way out: one scrubbed move for the whole hero
            const exit = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
            gsap.to(stageRef.current, { yPercent: 10, scale: 0.86, opacity: 0.25, ease: 'none', scrollTrigger: exit });
            gsap.to(hero.querySelector('.hero__foot'), { yPercent: -40, opacity: 0, ease: 'none', scrollTrigger: { ...exit, end: '60% top' } });

            play();
        }, hero);

        return () => {
            ctx.revert();
            split?.revert();
        };
    }, []);

    return (
        <header className="hero" id="top" ref={heroRef} data-drift-scope>
            <HeroField />

            {/* The visible H1 is the name; the sr-only tail gives search engines and
                screen readers the full "who + what + where" in the top heading. The {' '}
                keeps "David Geha" two words in the page's text (each word is a block). */}
            <h1 className="hero__name">
                <span className="hero__word hero__word--serif" data-drift="-16"><span className="hero__word-inner">David</span></span>{' '}
                <span className="hero__word hero__word--outline" data-drift="16"><span className="hero__word-inner">Geha</span></span>
                <span className="sr-only"> — AI Consultant in Lebanon</span>
            </h1>

            <div className="hero__stage" ref={stageRef}>
                <HeroPortrait className="hero__portrait" alt="David Geha" />
                <span className="hero__frame" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
            </div>

            <div className="hero__foot container">
                {/* Bottom-left: role + intro */}
                <div className="hero__intro">
                    <span className="hero__eyebrow eyebrow" data-hero-hide="fade">AI Automation · Lebanon</span>
                    <h2 className="hero__role" ref={roleRef} data-hero-hide="role">AI consultant in Lebanon</h2>
                    <p className="hero__subtitle" data-hero-hide="fade">
                        I find the repetitive work in your business and <br />
                        build agentic AI systems that run it for you — <br />
                        AI consulting and custom AI solutions for teams in Beirut and across Lebanon.
                    </p>
                    <a href="#work" className="hero__btn" data-hero-hide="fade">
                        Let's collaborate <ArrowUpRight />
                    </a>
                </div>

                {/* Bottom-right: social pills */}
                <div className="hero__socials">
                    {socials.map(({ name, href, Icon }) => (
                        <a
                            key={name}
                            href={href}
                            className="hero__social"
                            aria-label={name}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-hero-hide="fade"
                        >
                            <span className="hero__social-icon"><Icon /></span>
                            {name}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
