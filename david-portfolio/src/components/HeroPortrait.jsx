import React, { useEffect, useRef, useState } from 'react';
import { mountPortrait } from '../motion/portrait';

/**
 * Depth-parallax portrait: a subdivided mesh displaced by a real depth map, turning toward
 * the cursor under a perspective camera (the GL lives in motion/portrait.js, shared with the
 * static /about/ page). Falls back to a static <img> on reduced motion or without WebGL2,
 * at the width the screen needs. index.html preloads the same srcset, and the 3D takes its
 * texture from the file that srcset picks for this screen, so a phone downloads one picture.
 */

// Keep in step with index.html's preload (imagesrcset / imagesizes).
const PORTRAIT_SRCSET = '/david_transparent-520.webp 520w, /david_transparent-780.webp 780w, /david_transparent.webp 1049w';
const PORTRAIT_SIZES = '(max-width: 760px) 100vw, 768px';

/** The candidate a browser takes from the srcset for this screen: the smallest that covers the shown width × DPR. */
function pickSrc(srcSet = PORTRAIT_SRCSET, shown = window.innerWidth <= 760 ? window.innerWidth : 768) {
    const list = srcSet.split(',').map((s) => s.trim().split(/\s+/)).map(([u, w]) => ({ u, w: parseInt(w, 10) })).sort((a, b) => a.w - b.w);
    const need = shown * (window.devicePixelRatio || 1);
    return (list.find((c) => c.w >= need) || list[list.length - 1]).u;
}
const HeroPortrait = ({
    diffuse = '/david_transparent.webp',
    srcSet = PORTRAIT_SRCSET,
    sizes = PORTRAIT_SIZES,
    depth = '/david_depth.png',
    alt = 'David Geha',
    className = 'hero__portrait',
}) => {
    const canvasRef = useRef(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;
        return mountPortrait(canvasRef.current, { diffuse: srcSet ? pickSrc(srcSet) : diffuse, depth, onFail: () => setFailed(true) });
    }, [diffuse, srcSet, depth]);

    if (failed) return <img className={className} src={diffuse} srcSet={srcSet} sizes={sizes} fetchPriority="high" alt={alt} />;
    return <canvas ref={canvasRef} className={className} role="img" aria-label={alt} />;
};

export default HeroPortrait;
