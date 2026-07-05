import React from 'react';
import './MyWork.css';
import Reveal from './Reveal';

const workItems = [
    {
        id: 1,
        date: 'JUNE 2026',
        tags: ['AGENTIC', 'OUTREACH', 'SUPABASE'],
        title: 'Outreach engine that sources leads, researches each one, and sends personalized cold emails on its own',
        color: 'white'
    },
    {
        id: 2,
        date: 'APRIL 2026',
        tags: ['AI', 'MARKETING', 'GPT IMAGE 2.0'],
        title: 'Ad-creative pipeline generating on-brand UGC-style visuals, ready to export to Meta Ads',
        color: '#ff0066' // Pinkish
    },
    {
        id: 3,
        date: 'MARCH 2026',
        tags: ['AI', 'F&B', 'AUTOMATION'],
        title: 'Automated the daily reporting and inventory busywork for an F&B consultancy',
        color: '#cc9900' // Yellow/Gold
    },
    {
        id: 4,
        date: 'JANUARY 2026',
        tags: ['FULL STACK', 'CRM', 'SUPABASE'],
        title: 'Custom CRM built for a marketing agency to track clients, deals, and delivery',
        color: '#0066cc' // Blue
    },
    {
        id: 5,
        date: 'NOVEMBER 2025',
        tags: ['UI/UX', 'APP'],
        title: 'Designed and built a client-facing web app end to end — from UI to deploy',
        color: 'white'
    },
    {
        id: 6,
        date: 'SEPTEMBER 2025',
        tags: ['AGENTIC', 'WORKFLOW'],
        title: 'Internal agentic workflow that clears repetitive back-office tasks for a small team',
        color: '#808080' // Grey
    }
];

const MyWork = () => {
    return (
        <section className="my-work container" id="services">
            <Reveal as="h2" className="my-work__title" variant="rise">Recent Builds</Reveal>

            <Reveal as="div" className="my-work__grid" variant="rise" stagger>
                {workItems.map((item) => (
                    <article
                        key={item.id}
                        className="work-card"
                        style={{ '--card-color': item.color }}
                    >
                        <div className="work-card__content">
                            <div className="work-card__header">
                                <time className="work-card__date">{item.date}</time>
                                <div className="work-card__tags">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="work-card__tag">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <h3 className="work-card__title">
                                {item.title}
                            </h3>
                        </div>

                        {/* Decorative fold/icon for top right if needed, 
                for now utilizing border radius and pseudo elements */}
                    </article>
                ))}
            </Reveal>
        </section>
    );
};

export default MyWork;
