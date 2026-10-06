import React from 'react';
import { workItems } from '../content/work.js';

/**
 * Recent Builds as a build log (inspired: P43's typewriter in the brand's own world, an
 * agent's run log). When the panel arrives, each entry prints in order: its status light
 * comes on, the date and the line type out behind a signal caret, then the tags settle.
 * (Source order is date, tags, title, as before the redesign; the grid places the tags under the line.)
 * The text is in the page from the start; only its visibility is animated.
 */
const MyWork = () => (
    <section className="builds" id="builds">
        {/* P46: a generated loop of light running through fibre, veiled behind the log */}
        <div className="builds__film" aria-hidden="true">
            <video data-film data-src="/film/fibers.mp4" poster="/film/fibers-poster.webp" muted loop playsInline preload="none"></video>
        </div>
        <div className="container builds__grid">
            <h2 className="builds__title my-work__title" data-anim="tokens">Recent Builds</h2>

            <div className="log">
                <div className="log__bar" aria-hidden="true"><i></i><i></i><i></i></div>
                <ol className="log__lines" data-log>
                    {workItems.map((item) => (
                        <li key={item.id} className="log__line" data-log-line style={{ '--dot': item.color }}>
                            <span className="log__dot" data-log-dot aria-hidden="true"></span>
                            <div className="log__tags" data-log-after>
                                {item.tags.map((tag) => (
                                    <span key={tag} className="log__tag">{tag}</span>
                                ))}
                            </div>
                            <h3 className="log__title" data-log-type>{item.title}</h3>
                        </li>
                    ))}
                </ol>
                <span className="log__prompt" aria-hidden="true"></span>
            </div>
        </div>
    </section>
);

export default MyWork;
