import React from 'react';
import './About.css';
import Reveal from './Reveal';

const About = () => {
    return (
        <section className="about container" id="about">
            <div className="about__grid">
                <Reveal as="div" className="about__intro" variant="rise">
                    <h2 className="about__title">An engineer's approach to AI automation.</h2>
                </Reveal>

                <div className="about__content">
                    <Reveal as="p" className="about__text" variant="rise" delay={0.1}>
                        I'm David — a Civil &amp; Environmental Engineering student at AUB running an AI consultancy
                        for businesses across Lebanon. I work with marketing agencies and F&amp;B teams to find the
                        work they repeat every day and replace it with agentic AI systems that run on their own.
                        Alongside that, I design and build the full product — UI/UX, backend, and apps.
                    </Reveal>
                    <Reveal as="div" className="about__stats" variant="rise" stagger>
                        <div className="stat-item">
                            <span className="stat-number">01</span>
                            <span className="stat-label">Find the repetitive work</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">02</span>
                            <span className="stat-label">Build the agentic system</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">03</span>
                            <span className="stat-label">Automate &amp; scale</span>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
