import React from 'react';
import './Contact.css';

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

                <nav className="contact__sitemap" aria-label="Pages">
                    <a href="/ai-consulting-lebanon/">AI consulting in Lebanon</a>
                    <a href="/ai-solutions-lebanon/">AI solutions &amp; automation</a>
                    <a href="/blog/ai-consulting-in-lebanon-guide/">2026 guide: costs &amp; how to choose</a>
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
