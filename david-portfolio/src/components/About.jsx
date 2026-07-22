import React, { useEffect, useRef } from 'react';
import './About.css';
import Reveal from './Reveal';

const steps = [
    { num: '01', label: 'Find the repetitive work' },
    { num: '02', label: 'Build the agentic system' },
    { num: '03', label: 'Automate & scale' },
];

const About = () => {
    const railRef = useRef(null);

    // Steps reveal in lockstep with scroll position (not a fixed-timing
    // stagger) — --progress tracks how far the rail has scrolled through a
    // window above the fold, and each step reads its own slice of it in CSS.
    useEffect(() => {
        const el = railRef.current;
        if (!el) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.style.setProperty('--progress', 1);
            return;
        }

        let raf = 0;
        const update = () => {
            raf = 0;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const start = vh * 0.9;
            const end = vh * 0.35;
            const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
            el.style.setProperty('--progress', progress);
        };
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

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
            <ol className="about__process" ref={railRef}>
                {steps.map(({ num, label }, i) => (
                    <li className="process-step" key={num} style={{ '--i': i }}>
                        <span className="process-step__num">{num}</span>
                        <h3 className="process-step__label">{label}</h3>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default About;
