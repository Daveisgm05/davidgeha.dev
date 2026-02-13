import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <footer className="contact container">
            <div className="contact__content">
                <h2 className="contact__title">
                    Let's create something<br />
                    extraordinary together.
                </h2>

                <div className="contact__actions">
                    <a href="mailto:hello@david.dev" className="contact__button">
                        Start a project
                    </a>
                </div>

                <div className="contact__links">
                    <div className="contact__social">
                        <a href="#" className="social-link">Twitter</a>
                        <a href="#" className="social-link">LinkedIn</a>
                        <a href="#" className="social-link">GitHub</a>
                    </div>
                    <div className="contact__copyright">
                        &copy; {new Date().getFullYear()} David. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
