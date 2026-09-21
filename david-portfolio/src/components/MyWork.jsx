import React from 'react';
import './MyWork.css';
import Reveal from './Reveal';

import { workItems } from '../content/work.js';

const MyWork = () => {
    return (
        <section className="my-work container" id="builds">
            <Reveal as="h2" className="my-work__title" variant="rise">Recent Builds</Reveal>

            <Reveal as="div" className="my-work__grid" variant="rise" stagger>
                {workItems.map((item, i) => (
                    <article
                        key={item.id}
                        className="work-card"
                        style={{ '--card-color': item.color, '--stack-index': i }}
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
