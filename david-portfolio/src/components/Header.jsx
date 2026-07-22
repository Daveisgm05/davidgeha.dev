import React from 'react';
import './Header.css';
import HeroPortrait from './HeroPortrait';

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
    return (
        <div className="hero-frame">
        <header className="header" id="top">
            {/* Top navigation — borderless top bar */}
            <nav className="nav container">
                <span className="nav__status">
                    <span className="nav__dot" aria-hidden="true"></span>
                    <span className="nav__status-label">Available for new projects</span>
                </span>

                <ul className="nav__links">
                    {navLinks.map((link) => (
                        <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
                    ))}
                </ul>

                <div className="nav__actions">
                    <a className="nav__cta" href="#contact">
                        Let's talk <ArrowUpRight />
                    </a>
                    <a className="nav__logo" href="#top" aria-label="Back to top">D</a>
                </div>
            </nav>

            {/* Hero — name behind portrait */}
            <div className="hero">
                <h1 className="hero__name" aria-label="David Geha">
                    <span className="hero__word hero__word--outline"><span className="hero__word-inner">David</span></span>
                    <span className="hero__word hero__word--solid"><span className="hero__word-inner">Geha</span></span>
                </h1>

                <HeroPortrait className="hero__portrait" alt="David Geha" />

                {/* Bottom-left: role + intro */}
                <div className="hero__intro">
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
                <div className="hero__socials">
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
