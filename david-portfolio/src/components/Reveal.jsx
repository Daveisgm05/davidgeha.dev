import React, { useEffect, useRef, useState } from 'react';
import './Reveal.css';

/**
 * Scroll-triggered entrance animation.
 * - Block mode (default): the element eases in as one unit.
 *     variant="rise" (fade + up) | "pop" (fade + scale)
 * - Stagger mode (stagger): direct children cascade in one after another.
 * `as` + `className` let it BE a layout element (grid, section) so it can
 * wrap real content without adding an extra div that breaks the layout.
 */
const Reveal = ({
    children,
    as: Tag = 'div',
    className = '',
    variant = 'rise',
    stagger = false,
    threshold = 0.15,
    delay = 0,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin: '0px 0px -60px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    const base = stagger ? `reveal-stagger reveal-stagger--${variant}` : `reveal reveal--${variant}`;
    const cls = `${base}${isVisible ? ' is-visible' : ''}${className ? ' ' + className : ''}`;

    return (
        <Tag ref={ref} className={cls} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
            {children}
        </Tag>
    );
};

export default Reveal;
