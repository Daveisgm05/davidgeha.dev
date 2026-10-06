import React from 'react';
import { faq } from '../content/faq';

// Native <details> keeps every answer in the DOM (crawlable, no JS needed
// to read it) while still collapsing visually; data-accordion animates the height.
const Faq = () => (
    <section className="faq" id="faq">
        <div className="container faq__grid">
            <div className="faq__intro">
                <span className="faq__eyebrow eyebrow">FAQ</span>
                <h2 className="faq__title" data-anim="tokens">Working with an AI consultant in Lebanon</h2>
            </div>

            <div className="faq__list" data-accordion data-anim="stagger">
                {faq.map(({ q, a }, i) => (
                    <details className="faq__item" key={q} open={i === 0}>
                        <summary className="faq__question">
                            <span className="faq__num" aria-hidden="true" style={{ '--n': i + 1 }}></span>
                            <h3>{q}</h3>
                            <span className="faq__icon" aria-hidden="true"></span>
                        </summary>
                        <p className="faq__answer">{a}</p>
                    </details>
                ))}
            </div>
        </div>
    </section>
);

export default Faq;
