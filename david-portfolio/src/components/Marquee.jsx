import React from 'react';
import './Marquee.css';

const STACK = [
    'Supabase',
    'Vercel',
    'Claude Code',
    'Claude Desktop',
    'GitHub',
    'GPT Image 2.0',
    'Custom CRMs',
    'Outreach Systems',
];

const Marquee = () => {
    // Duplicated once so the -50% translate loops seamlessly.
    const items = [...STACK, ...STACK];
    return (
        <section className="marquee" aria-label="Tools and stack">
            <div className="marquee__track">
                {items.map((tool, i) => (
                    <span
                        className="marquee__item"
                        key={i}
                        aria-hidden={i >= STACK.length ? 'true' : undefined}
                    >
                        {tool}
                        <span className="marquee__sep" aria-hidden="true">✦</span>
                    </span>
                ))}
            </div>
        </section>
    );
};

export default Marquee;
