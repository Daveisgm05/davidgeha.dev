import React from 'react';
import './Contact.css';
import { siteLinks } from '../content/site-links';

const Contact = () => {
    return (
        <footer className="contact container" id="contact">
            <div className="contact__content">
                <h2 className="contact__title">
                    Let's automate the work <br />
                    you shouldn't be doing.
                </h2>

                <div className="contact__actions">
                    <a href="mailto:david@osgdev.com" className="contact__button">
                        Start a project
                    </a>
                </div>

                {/* Visible NAP — must match the Google Business Profile and every directory exactly. */}
                <address className="contact__nap">
                    <a href="mailto:david@osgdev.com">david@osgdev.com</a>
                    <span aria-hidden="true">·</span>
                    <a href="https://wa.me/96176412978" target="_blank" rel="noopener noreferrer">+961 76 412 978</a>
                    <span aria-hidden="true">·</span>
                    <span>Beirut, Lebanon</span>
                </address>

                {/* Content pages come from src/pages via the generated site-links module: a new page or guide
                    is linked here on the next build, and "All guides" appears once there are two. */}
                <nav className="contact__sitemap" aria-label="Pages">
                    <a href="/ai-consulting-lebanon/">AI consulting in Lebanon</a>
                    <a href="/ai-solutions-lebanon/">AI solutions &amp; automation</a>
                    {siteLinks.pages.map((p) => <a key={p.href} href={p.href}>{p.label}</a>)}
                    {siteLinks.articles.slice(0, 2).map((a) => <a key={a.href} href={a.href}>{a.label}</a>)}
                    {siteLinks.hub && <a href={siteLinks.hub}>All guides</a>}
                    {siteLinks.work && <a href={siteLinks.work}>Case studies</a>}
                    <a href="/about/">About David</a>
                </nav>

                <div className="contact__links">
                    <div className="contact__social">
                        <a href="https://www.instagram.com/dave.automates/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
                        <a href="https://www.linkedin.com/in/david-geha/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                        <a href="https://github.com/Daveisgm05" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                    </div>
                    <div className="contact__copyright">
                        &copy; {new Date().getFullYear()} David Geha. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
