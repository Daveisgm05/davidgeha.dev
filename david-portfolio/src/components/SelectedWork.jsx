import React, { useState } from 'react';
import './SelectedWork.css';
import Reveal from './Reveal';

import { projects } from '../content/work.js';

/**
 * Selected Work — mirrors likely-story.co.uk's homepage list: a single
 * image slot glued to the left of the list (position:absolute against
 * the list's own box, not the cursor or the viewport), rotated 6deg,
 * whose visible image swaps to match whichever row is hovered. Text
 * sits in a right-aligned column. No mouse-tracking involved.
 */
const SelectedWork = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="selected-work container" id="work">
            <Reveal as="div" className="selected-work__header" variant="rise">
                <h2 className="selected-work__title">Selected Work</h2>
                <span className="selected-work__count">({projects.length})</span>
            </Reveal>

            <div className="work-list-wrap">
                <Reveal as="div" className="work-list" variant="rise" stagger>
                    {projects.map((project, i) => (
                        <article
                            key={project.id}
                            className="work-row"
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <div className="work-row__inner">
                                <div className="work-row__left">
                                    <span className="work-row__index">{String(i + 1).padStart(2, '0')}</span>
                                    <h3 className="work-row__title">{project.title}</h3>
                                </div>

                                <div className="work-row__right">
                                    <span className="work-row__category">{project.category}</span>
                                    <span className="work-row__year">{project.year}</span>
                                </div>
                            </div>

                            {/* Touch fallback: no hover, so show a static inline thumbnail. */}
                            <div className="work-row__mobile-thumb">
                                <img
                                    src={project.image}
                                    srcSet={`${project.image.replace('.webp', '-640.webp')} 640w, ${project.image.replace('.webp', '-960.webp')} 960w, ${project.image} 1280w`}
                                    sizes="(max-width: 768px) calc(100vw - 48px), 640px"
                                    width="1280"
                                    height="960"
                                    alt={`${project.title} — AI automation project by David Geha, AI consultant in Lebanon`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </article>
                    ))}
                </Reveal>

                {/* Glued preview slot — pinned to the list's own box, left side. */}
                <div className="work-preview-stack" aria-hidden="true">
                    {projects.map((project, i) => (
                        <div key={project.id} className={`work-preview${activeIndex === i ? ' is-active' : ''}`}>
                            <div className="work-preview__frame">
                                <img src={project.image} width="1280" height="960" alt="" loading="lazy" decoding="async" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SelectedWork;
