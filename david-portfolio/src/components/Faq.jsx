import React from 'react';
import './Faq.css';
import Reveal from './Reveal';
import { faq } from '../content/faq';

// Native <details> keeps every answer in the DOM (crawlable, no JS needed
// to read it) while still collapsing visually.
const Faq = () => {
    return (
        <section className="faq container" id="faq">
            <div className="faq__grid">
                <Reveal as="div" className="faq__intro" variant="rise">
                    <span className="faq__eyebrow">FAQ</span>
                    <h2 className="faq__title">Working with an AI consultant in Lebanon</h2>
                </Reveal>

                <Reveal as="div" className="faq__list" variant="rise" stagger>
                    {faq.map(({ q, a }, i) => (
                        <details className="faq__item" key={q} open={i === 0}>
                            <summary className="faq__question">
                                <h3>{q}</h3>
                                <span className="faq__icon" aria-hidden="true"></span>
                            </summary>
                            <p className="faq__answer">{a}</p>
                        </details>
                    ))}
                </Reveal>
            </div>
        </section>
    );
};

export default Faq;
