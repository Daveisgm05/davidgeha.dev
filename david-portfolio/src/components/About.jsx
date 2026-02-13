import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about container">
            <div className="about__grid">
                <div className="about__intro">
                    <h2 className="about__title">Digital artisan shaping the future of web.</h2>
                </div>

                <div className="about__content">
                    <p className="about__text">
                        I'm a multidisciplinary developer with a passion for creating immersive digital experiences.
                        With a background in both design and engineering, I bridge the gap between aesthetics and functionality.
                    </p>
                    <div className="about__stats">
                        <div className="stat-item">
                            <span className="stat-number">8+</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">40+</span>
                            <span className="stat-label">Projects Delivered</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">12</span>
                            <span className="stat-label">Awards Won</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
