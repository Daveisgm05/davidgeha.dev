import React from 'react';
import { aboutText, aboutTitle, processSteps as steps } from '../content/about.js';

/**
 * About: the paper interlude (V1's hard surface switch). The title streams in (house
 * reveal), the statement brightens word by word as it's read (P8), and the process runs
 * as a pipeline (inspired: P35's progress principle drawn as a data line): a packet
 * travels the rail with scroll and each station lights as it passes.
 */
const About = () => (
    <section className="about" id="about">
        <div className="container">
            <div className="about__grid">
                <h2 className="about__title" data-anim="tokens">{aboutTitle}</h2>

                <p className="about__text">
                    <span data-anim="brighten">{aboutText}</span>{' '}
                    <a className="about__more" href="/about/">More about me →</a>
                </p>
            </div>

            {/* The process as a pipeline: one rail, three stations */}
            <ol className="pipeline" data-pipeline style={{ '--steps': steps.length }}>
                {steps.map(({ num, label }, i) => (
                    <li className="pipeline__step" key={num} style={{ '--i': i }}>
                        <span className="pipeline__node" aria-hidden="true"></span>
                        <span className="pipeline__num">{num}</span>
                        <h3 className="pipeline__label">{label}</h3>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);

export default About;
