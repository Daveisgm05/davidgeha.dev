import React from 'react';

const STACK = [
    'Supabase',
    'Vercel',
    'Claude Code',
    'GitHub',
    'AI Email Agents',
    'AI CRMs',
    'Outreach Systems',
    'SEO & GEO',
    'AI Receptionists',
    'AI Web Design',
];

// P14 velocity-reactive marquee with V10's outline row (every other name is stroked).
const Marquee = () => {
    // Duplicated once so the -50% translate loops seamlessly.
    const items = [...STACK, ...STACK];
    return (
        <section className="marquee" aria-label="Tools and stack" data-marquee>
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
