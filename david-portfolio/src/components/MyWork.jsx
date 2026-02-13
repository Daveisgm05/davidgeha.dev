import React from 'react';
import './MyWork.css';

const workItems = [
    {
        id: 1,
        date: 'DECEMBER 13, 2025',
        tags: ['AI', 'MARKETING', 'AUTOMATION'],
        title: 'Automated generation of UGC-style ad creatives with direct Meta Ads–ready export',
        mentions: 49,
        color: 'white'
    },
    {
        id: 2,
        date: 'NOVEMBER 2, 2025',
        tags: ['UI/UX', 'ANIMATION'],
        title: 'GLOBAL FINTECH DASHBOARD REDESIGN',
        mentions: 18,
        color: '#ff0066' // Pinkish
    },
    {
        id: 3,
        date: 'OCTOBER 3, 2025',
        tags: ['AI', 'EXPERIMENTAL'],
        title: 'AI-POWERED CONTENT GENERATION TOOL',
        mentions: 4,
        color: '#808080' // Grey
    },
    {
        id: 4,
        date: 'SEPTEMBER 17, 2025',
        tags: ['FULL STACK', 'REAL-TIME'],
        title: 'REAL-TIME DATA VISUALIZATION SYSTEM',
        mentions: 85,
        color: '#0066cc' // Blue
    },
    {
        id: 5,
        date: 'JULY 13, 2025',
        tags: ['ECOMMERCE', 'STRATEGY'],
        title: 'SUSTAINABLE FASHION PLATFORM',
        mentions: 15,
        color: '#cc9900' // Yellow/Gold
    },
    {
        id: 6,
        date: 'JULY 7, 2025',
        tags: ['MOBILE', 'APP'],
        title: 'MOBILE-FIRST BANKING APPLICATION',
        mentions: 13,
        color: 'white'
    }
];

const MyWork = () => {
    return (
        <section className="my-work container">
            <h2 className="my-work__title">My Work</h2>

            <div className="my-work__grid">
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

                            <div className="work-card__footer">
                                <span className="work-card__mentions">
                                    {item.mentions} WEBMENTIONS
                                </span>
                            </div>
                        </div>

                        {/* Decorative fold/icon for top right if needed, 
                for now utilizing border radius and pseudo elements */}
                    </article>
                ))}
            </div>
        </section>
    );
};

export default MyWork;
