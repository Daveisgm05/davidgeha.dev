import React from 'react';
import './FAQ.css';
import Reveal from './Reveal';

// Keep in sync with the FAQPage JSON-LD in index.html.
const faqs = [
    {
        q: 'What does an AI consultant in Lebanon do?',
        a: 'As an AI consultant based in Lebanon, I find the repetitive, manual work inside a business and replace it with custom agentic AI systems that run on their own — so teams spend less time on busywork and more on the work that matters.',
    },
    {
        q: 'What kind of businesses do you work with?',
        a: 'Mainly marketing agencies and F&B businesses in Lebanon, plus founders who want to automate outreach, research, reporting and other repeat tasks with AI.',
    },
    {
        q: 'What can you automate with AI?',
        a: 'Lead-outreach pipelines, competitive research and SEO/GEO pipelines, image-ad generation, custom CRMs and dashboards, and back-office workflows — built on a modern stack including Supabase, Vercel, Claude and GitHub.',
    },
    {
        q: 'How do we get started?',
        a: 'Start a project and we map your repetitive work together, then design and build the agentic system that automates it and measure the productivity gain.',
    },
];

const FAQ = () => {
    return (
        <section className="faq container" id="faq">
            <Reveal as="div" className="faq__header" variant="rise">
                <h2 className="faq__title">Frequently asked</h2>
                <span className="faq__count">({faqs.length})</span>
            </Reveal>

            <Reveal as="div" className="faq__list" variant="rise" stagger>
                {faqs.map((item) => (
                    <div className="faq__item" key={item.q}>
                        <h3 className="faq__q">{item.q}</h3>
                        <p className="faq__a">{item.a}</p>
                    </div>
                ))}
            </Reveal>
        </section>
    );
};

export default FAQ;
