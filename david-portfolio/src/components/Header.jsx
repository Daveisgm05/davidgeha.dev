import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Header.css';
import HeroPortrait from './HeroPortrait';
import { INTRO_READY_EVENT, arrivedMidPage, prefersReducedMotion } from '../lib/introGate';

const ArrowUpRight = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

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

const navLinks = ['Work', 'About', 'Contact'];

const socials = [
    { name: 'Instagram', href: 'https://www.instagram.com/david.geha/', Icon: InstagramIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/david-geha/', Icon: LinkedInIcon },
    { name: 'GitHub', href: 'https://github.com/Daveisgm05', Icon: GitHubIcon },
];

const Header = () => {
    const headerRef = useRef(null);
    const navStatusRef = useRef(null);
    const navLinksRef = useRef(null);
    const navActionsRef = useRef(null);
    const nameOutlineRef = useRef(null);
    const nameSolidRef = useRef(null);
    const introRef = useRef(null);
    const socialsRef = useRef(null);

    // First-load entrance, orchestrated with GSAP instead of CSS keyframes
    // firing unconditionally on mount — the old version animated in while
    // still hidden behind the Loader curtain, so it was never actually
    // visible. This waits for the Loader to signal it's clear (or, on a
    // mid-page reload / reduced motion, plays immediately with no wait).
    useEffect(() => {
        if (prefersReducedMotion()) return; // CSS already forces the final state

        const header = headerRef.current;
        let play;

        // React StrictMode runs this effect, its cleanup, then this effect
        // again in dev. GSAP caches parsed transform data per element, so a
        // plain gsap.set(el, {clearProps:'all'}) on cleanup resets the DOM
        // style but not that internal cache — the second run's yPercent:115
        // then compounds on the first run's stale cache instead of starting
        // clean (visible as the name staying stuck instead of animating in).
        // gsap.context()/.revert() is GSAP's own fix for exactly this: it
        // tracks everything created inside, and reverts it — cache included.
        const ctx = gsap.context(() => {
            const nameWords = [nameOutlineRef.current, nameSolidRef.current];
            const navLinkItems = navLinksRef.current
                ? Array.from(navLinksRef.current.children)
                : [];

            // Matches the CSS baseline exactly (Header.css) so this is a
            // no-op visually — it just tells GSAP explicitly what "from" is.
            gsap.set(navStatusRef.current, { autoAlpha: 0, y: -10 });
            gsap.set(navLinkItems, { autoAlpha: 0, y: -10 });
            gsap.set(navActionsRef.current, { autoAlpha: 0, y: -10 });
            gsap.set(nameWords, { yPercent: 115 });
            gsap.set(introRef.current, { autoAlpha: 0, y: 24 });
            gsap.set(socialsRef.current, { autoAlpha: 0, y: 16 });

            play = () => {
                header?.classList.add('is-ready'); // gates the portrait's own CSS reveal (Header.css)

                gsap.timeline({ defaults: { ease: 'expo.out' } })
                    .to(navStatusRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
                    .to(navLinkItems, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.08)
                    .to(navActionsRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.3)
                    .to(nameWords, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0.15)
                    .to(introRef.current, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.75)
                    .to(socialsRef.current, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.85);
            };

            if (arrivedMidPage()) play();
            else window.addEventListener(INTRO_READY_EVENT, play, { once: true });
        }, headerRef);

        return () => {
            window.removeEventListener(INTRO_READY_EVENT, play);
            header?.classList.remove('is-ready');
            ctx.revert();
        };
    }, []);

    return (
        <div className="hero-frame">
        <header className="header" id="top" ref={headerRef}>
            {/* Top navigation — borderless top bar */}
            <nav className="nav container">
                <span className="nav__status" ref={navStatusRef}>
                    <span className="nav__dot" aria-hidden="true"></span>
                    <span className="nav__status-label">Available for new projects</span>
                </span>

                <ul className="nav__links" ref={navLinksRef}>
                    {navLinks.map((link) => (
                        <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
                    ))}
                </ul>

                <div className="nav__actions" ref={navActionsRef}>
                    <a className="nav__cta" href="mailto:david@osgdev.com">
                        Let's talk <ArrowUpRight />
                    </a>
                    <a className="nav__logo" href="#top" aria-label="Back to top">D</a>
                </div>
            </nav>

            {/* Hero — name behind portrait */}
            <div className="hero">
                <h1 className="hero__name" aria-label="David Geha">
                    <span className="hero__word hero__word--outline"><span className="hero__word-inner" ref={nameOutlineRef}>David</span></span>
                    <span className="hero__word hero__word--solid"><span className="hero__word-inner" ref={nameSolidRef}>Geha</span></span>
                </h1>

                <HeroPortrait className="hero__portrait" alt="David Geha" />

                {/* Bottom-left: role + intro */}
                <div className="hero__intro" ref={introRef}>
                    <span className="hero__eyebrow">AI Automation · Lebanon</span>
                    <h2 className="hero__role">AI consultant</h2>
                    <p className="hero__subtitle">
                        I find the repetitive work in your business and <br />
                        build agentic AI systems that run it for you.
                    </p>
                    <a href="#work" className="hero__btn">
                        Let's collaborate <ArrowUpRight />
                    </a>
                </div>

                {/* Bottom-right: social pills */}
                <div className="hero__socials" ref={socialsRef}>
                    {socials.map(({ name, href, Icon }) => {
                        const external = href.startsWith('http');
                        return (
                            <a
                                key={name}
                                href={href}
                                className="hero__social"
                                aria-label={name}
                                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                                <span className="hero__social-icon"><Icon /></span>
                                {name}
                            </a>
                        );
                    })}
                </div>
            </div>
        </header>
        </div>
    );
};

export default Header;
