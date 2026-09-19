import React from 'react';
import './Services.css';
import Reveal from './Reveal';
import { services, servicesIntro } from '../content/services';


const Services = () => {
    return (
        <section className="services container" id="services">
            <div className="services__head">
                <Reveal as="div" className="services__intro" variant="rise">
                    <span className="services__eyebrow">Services</span>
                    <h2 className="services__title">AI consulting &amp; AI solutions in Lebanon</h2>
                </Reveal>

                <Reveal as="p" className="services__lead" variant="rise" delay={0.1}>
                    {servicesIntro}
                </Reveal>
            </div>

            <Reveal as="div" className="services__grid" variant="rise" stagger>
                {services.map(({ num, title, text }) => (
                    <article className="service" key={num}>
                        <span className="service__num">{num}</span>
                        <h3 className="service__title">{title}</h3>
                        <p className="service__text">{text}</p>
                    </article>
                ))}
            </Reveal>
        </section>
    );
};

export default Services;
