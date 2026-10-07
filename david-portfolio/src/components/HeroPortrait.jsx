import React, { useEffect, useRef, useState } from 'react';
import { mountPortrait } from '../motion/portrait';

/**
 * Depth-parallax portrait: a subdivided mesh displaced by a real depth map, turning toward
 * the cursor under a perspective camera (the GL lives in motion/portrait.js, shared with the
 * static /about/ page). Falls back to a static <img> on reduced motion or without WebGL2,
 * at the width the screen needs (a phone gets the 520/780 file; the 3D keeps the full one).
 */
const HeroPortrait = ({
    diffuse = '/david_transparent.webp',
    srcSet = '/david_transparent-520.webp 520w, /david_transparent-780.webp 780w, /david_transparent.webp 1049w',
    sizes = '(max-width: 760px) 100vw, 768px',
    depth = '/david_depth.png',
    alt = 'David Geha',
    className = 'hero__portrait',
}) => {
    const canvasRef = useRef(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;
        return mountPortrait(canvasRef.current, { diffuse, depth, onFail: () => setFailed(true) });
    }, [diffuse, depth]);

    if (failed) return <img className={className} src={diffuse} srcSet={srcSet} sizes={sizes} fetchPriority="high" alt={alt} />;
    return <canvas ref={canvasRef} className={className} role="img" aria-label={alt} />;
};

export default HeroPortrait;
