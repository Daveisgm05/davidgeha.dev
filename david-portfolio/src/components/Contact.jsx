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

                <div className="contact__links">
                    <div className="contact__social">
                        <a href="https://www.instagram.com/david.geha/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
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
