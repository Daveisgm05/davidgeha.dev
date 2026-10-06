import React from 'react';
import { projects } from '../content/work.js';

/**
 * Selected Work: P31 pinned stacking cards, adapted (DESIGN.md). Each project is dealt
 * as a framed window over the last one while the stage holds; the covered card shrinks
 * and dims behind it, the picture inside settles from a slight zoom, and the head counts
 * the dealt card. Phones keep the stack with shorter cards; reduced motion gets a list.
 */
const SelectedWork = () => (
    <section className="work" id="work">
        <div className="work__stage container" data-stack>
            <div className="work__head" data-stack-stage>
                <h2 className="work__title" data-anim="tokens">Selected Work</h2>
                <span className="work__count">({projects.length})</span>
                <span className="work__index" data-stack-count aria-hidden="true" style={{ '--n': 1, '--total': `"${String(projects.length).padStart(2, '0')}"` }}></span>
            </div>

            <div className="work__cards">
                {projects.map((project, i) => (
                    <article key={project.id} className="work-card" data-stack-card style={{ '--i': i }}>
                        <div className="work-card__bar">
                            <span className="work-card__index">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="work-card__title">{project.title}</h3>
                            <span className="work-card__meta">
                                <span className="work-card__category">{project.category}</span>
                            </span>
                        </div>
                        <div className="work-card__media">
                            <img
                                src={project.image}
                                srcSet={`${project.image.replace('.webp', '-640.webp')} 640w, ${project.image.replace('.webp', '-960.webp')} 960w, ${project.image} 1280w`}
                                sizes="(max-width: 768px) calc(100vw - 48px), 1100px"
                                width="1280"
                                height="960"
                                alt={`${project.title} — AI automation project by David Geha, AI consultant in Lebanon`}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <span className="work-card__dim" data-stack-dim aria-hidden="true"></span>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

export default SelectedWork;
