import React from 'react';
import './About.css';
import Reveal from './Reveal';

const steps = [
    { num: '01', label: 'Find the repetitive work' },
    { num: '02', label: 'Build the agentic system' },
    { num: '03', label: 'Automate & scale' },
];

const About = () => {
    return (
        <section className="about container" id="about">
            <div className="about__grid">
                <Reveal as="div" className="about__intro" variant="rise">
                    <h2 className="about__title">An engineer's approach to AI automation.</h2>
                </Reveal>

                <Reveal as="p" className="about__text" variant="rise" delay={0.1}>
                    I'm David, a Civil &amp; Environmental Engineering student at AUB running an AI consultancy
                    for businesses across Lebanon. I work with marketing agencies and F&amp;B teams to find the
                    work they repeat every day and replace it with agentic AI systems that run on their own.
                    Alongside that, I design and build the full product: UI/UX, backend, and apps.
                </Reveal>
            </div>

            {/* The process as a pipeline: one rail, three stations */}
            <Reveal as="ol" className="about__process" variant="rise" stagger>
                {steps.map(({ num, label }) => (
                    <li className="process-step" key={num}>
                        <span className="process-step__num">{num}</span>
                        <h3 className="process-step__label">{label}</h3>
                    </li>
                ))}
            </Reveal>
        </section>
    );
};

export default About;
