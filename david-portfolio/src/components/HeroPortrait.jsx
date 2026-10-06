import React, { useEffect, useRef, useState } from 'react';
import { mountPortrait } from '../motion/portrait';

/**
 * Depth-parallax portrait: a subdivided mesh displaced by a real depth map, turning toward
 * the cursor under a perspective camera (the GL lives in motion/portrait.js, shared with the
 * static /about/ page). Falls back to a static <img> on reduced motion or without WebGL2.
 */
const HeroPortrait = ({
    diffuse = '/david_transparent.webp',
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

    if (failed) return <img className={className} src={diffuse} alt={alt} />;
    return <canvas ref={canvasRef} className={className} role="img" aria-label={alt} />;
};

export default HeroPortrait;
