import React from 'react';
import { siteLinks } from '../content/site-links';

export const ArrowUpRight = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const navLinks = ['Work', 'Services', 'About', 'Contact'];

/**
 * Fixed bar (P25 *Scroll-away bar over a top scrim*): transparent over the hero, a scrim
 * behind it once the page moves, out of the way while reading down, back on the first
 * scroll up. A signal hairline along its foot tracks the page (P35). data-header → engine.
 */
const SiteHeader = () => (
    <div className="site-header" data-header>
        <nav className="nav">
            <span className="nav__status" data-hero-hide="fade">
                <span className="nav__dot" aria-hidden="true"></span>
                <span className="nav__status-label">Available for new projects</span>
            </span>

            <ul className="nav__links" data-hero-hide="fade">
                {navLinks.map((link) => (
                    <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
                ))}
            </ul>

            <div className="nav__actions" data-hero-hide="fade">
                <a className="nav__cta" href="mailto:david@osgdev.com">
                    Let's talk <ArrowUpRight />
                </a>
                <a className="nav__logo" href="#top" aria-label="Back to top">D</a>
                {/* ≤1024px: the inline links are hidden, so a native
                    <details> menu takes over — no JS, no focus trap needed. */}
                <details className="nav__menu">
                    <summary aria-label="Open menu">Menu</summary>
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
                        ))}
                        <li><a href="/ai-consulting-lebanon/">AI consulting</a></li>
                        <li><a href="/ai-solutions-lebanon/">AI solutions</a></li>
                        {siteLinks.guide && <li><a href={siteLinks.guide.href}>{siteLinks.guide.label}</a></li>}
                        <li><a href="https://wa.me/96176412978" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                    </ul>
                </details>
            </div>
        </nav>
        <span className="site-header__progress" aria-hidden="true"></span>
    </div>
);

export default SiteHeader;
