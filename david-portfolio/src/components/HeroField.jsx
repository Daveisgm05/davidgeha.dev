import React, { useEffect, useRef } from 'react';
import { field } from '../motion/field';

// The hero's lattice ground (the drawing lives in motion/field.js, shared with the content pages).
const HeroField = () => {
    const ref = useRef(null);
    useEffect(() => field(ref.current), []);
    return <canvas ref={ref} className="hero__field" aria-hidden="true" />;
};

export default HeroField;
