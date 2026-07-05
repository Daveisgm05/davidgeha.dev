import React from 'react';
import './SelectedWork.css';
import Reveal from './Reveal';

const projects = [
    {
        id: 1,
        title: 'Lead Outreach Pipelines',
        category: 'Agentic Outreach',
        image: '/work-outreach.webp',
        year: '2026'
    },
    {
        id: 2,
        title: 'Competitive Research & SEO/GEO Pipelines',
        category: 'Market Intelligence',
        image: '/work-research.webp',
        year: '2026'
    },
    {
        id: 3,
        title: 'Image Ad Pipelines',
        category: 'GPT Image 2.0',
        image: '/work-ads.webp',
        year: '2025'
    },
    {
        id: 4,
        title: 'Custom CRM Dashboards',
        category: 'Internal Tooling',
        image: '/work-crm.webp',
        year: '2025'
    }
];

const SelectedWork = () => {
    return (
        <section className="selected-work container" id="work">
            <Reveal as="div" className="selected-work__header" variant="rise">
                <h2 className="selected-work__title">Selected Work</h2>
                <span className="selected-work__count">({projects.length})</span>
            </Reveal>

            <Reveal as="div" className="selected-work__grid" variant="pop" stagger>
                {projects.map((project) => (
                    <article key={project.id} className="work-item">
                        <div className="work-item__image-container">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="work-item__image"
                            />
                            <div className="work-item__overlay"></div>
                        </div>
                        <div className="work-item__info">
                            <div className="work-item__meta">
                                <h3 className="work-item__title">{project.title}</h3>
                                <span className="work-item__year">{project.year}</span>
                            </div>
                            <p className="work-item__category">{project.category}</p>
                        </div>
                    </article>
                ))}
            </Reveal>
        </section>
    );
};

export default SelectedWork;
