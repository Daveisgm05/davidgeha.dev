import React from 'react';
import { services, servicesIntro } from '../content/services';
import { siteLinks } from '../content/site-links';

// A card links to its service's own page once that page exists, else to its section on the solutions page.
const live = new Set(siteLinks.pages.map((p) => p.href));

// The follower's picture per service (decorative: the row's own text carries the meaning).
// One series from the portfolio's studio: each service's system on a device, on basalt, in
// monochrome studio light like the project photographs (Blender: docs/blender/devices.py),
// in the order of src/content/services.js.
const PICTURES = [1, 2, 3, 4, 5, 6].map((n) => `/img/service-0${n}-800.webp`);

/**
 * Services: C23 adapted (DESIGN.md). A full-width spec sheet (index · name · promise ·
 * link) whose rules draw in as it arrives; the hovered row fills with the signal plate and
 * a picture of the work follows the pointer, leaning with its speed (P12 + V20).
 * Touch: no follower, the rows are plain. Every word stays visible: nothing collapses.
 *
 * The head rides on a pinned 3D film (C44/P73 adapted to the portfolio's own world): a laptop
 * on volcanic basalt opens, its screen wakes on an agent's run log, and the camera comes round
 * and pushes in, frame by frame as the page scrolls (Blender: docs/blender/devices.py;
 * motion/media.js → sequence).
 */
const Services = () => (
    <section className="services" id="services">
        <div className="services__stage" data-sequence data-frames="120" data-src="/film/core/{i}.webp" data-src-phone="/film/core-m/{i}.webp">
            <div className="services__sticky">
                <canvas className="services__canvas" data-sequence-canvas aria-hidden="true"></canvas>
                <div className="container services__head">
                <div className="services__intro">
                    <span className="services__eyebrow eyebrow">Services</span>
                    <h2 className="services__title" data-anim="tokens">AI consulting &amp; AI solutions in Lebanon</h2>
                </div>

                <p className="services__lead" data-anim="fade">
                    {servicesIntro}{' '}
                    <a className="services__guide" href="/ai-consulting-lebanon/">How the audit works →</a>{' '}
                    <a className="services__guide" href="/blog/ai-consulting-in-lebanon-guide/">Read the 2026 guide to AI consulting in Lebanon →</a>
                </p>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="services__rows" data-rows>
                {services.map(({ num, title, text, href, page, cta }, i) => (
                    <article className="service" key={num} data-row data-row-image={PICTURES[i % PICTURES.length]}>
                        <span className="service__rule" data-rule aria-hidden="true"></span>
                        <span className="service__num">{num}</span>
                        <h3 className="service__title">{title}</h3>
                        <div className="service__body">
                            <p className="service__text">{text}</p>
                            {href && <a className="service__link" href={page && live.has(page) ? page : href}>{cta} →</a>}
                        </div>
                    </article>
                ))}
                <div className="services__follower" data-rows-image aria-hidden="true">
                    <img src={PICTURES[0]} alt="" width="800" height="600" decoding="async" />
                </div>
            </div>
        </div>
    </section>
);

export default Services;
