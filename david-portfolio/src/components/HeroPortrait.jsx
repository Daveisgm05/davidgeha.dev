import React, { useEffect, useRef, useState } from 'react';

/**
 * Depth-parallax portrait — the landonorris.com-style effect, done right.
 *
 * Rather than smearing a 2D image (which deforms the face), this builds a
 * subdivided 3D mesh whose vertices are displaced along Z by a real depth map
 * (Depth Anything V2), then gently rotates that mesh under a perspective camera
 * toward the cursor. The result is genuine parallax with depth-tested occlusion
 * — the head turns, it doesn't warp. Falls back to a static <img> on reduced
 * motion or when WebGL2 is unavailable.
 */

const GX = 150;          // grid columns
const GY = 200;          // grid rows (≈ 3:4)
const PLANE_W = 0.75;    // model-space plane size (matches 3:4 asset)
const PLANE_H = 1.0;
const DISP = 0.22;       // depth displacement amount
const ROT = 0.18;        // max head rotation (radians ≈ 10.3°)
const SWAY = 0.035;      // max positional sway (model units) — parallax on top of rotation
const IDLE_MS = 2500;    // no pointer input for this long → autonomous idle drift
const IDLE_AMP = 0.45;   // idle drift amplitude (fraction of full pointer range)
const CAM = 2.15;        // camera distance
const FOV = 26 * Math.PI / 180;

/* ---- minimal mat4 helpers (column-major) ---- */
const m4 = {
    mul(a, b) {
        const o = new Float32Array(16);
        for (let r = 0; r < 4; r++)
            for (let c = 0; c < 4; c++)
                o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
        return o;
    },
    perspective(fovy, aspect, near, far) {
        const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
        return new Float32Array([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) * nf, -1,
            0, 0, 2 * far * near * nf, 0,
        ]);
    },
    translate(x, y, z) {
        return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
    },
    rotX(a) {
        const c = Math.cos(a), s = Math.sin(a);
        return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
    },
    rotY(a) {
        const c = Math.cos(a), s = Math.sin(a);
        return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
    },
};

const VERT = `#version 300 es
in vec3 aPos;
in vec2 aUv;
in vec3 aNormal;
uniform mat4 uMVP;
out vec2 vUv;
out vec3 vNormal;
void main() {
    vUv = aUv;
    vNormal = aNormal;
    gl_Position = uMVP * vec4(aPos, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
in vec3 vNormal;
uniform sampler2D uDiffuse;
uniform vec2 uMouse;
uniform float uLight;
out vec4 outColor;
void main() {
    vec4 col = texture(uDiffuse, vUv);
    if (col.a < 0.04) discard;
    // Fade the left/right edges so shoulders dissolve instead of being cut
    // by the canvas bounds (the bottom fade is handled by the CSS mask).
    col.a *= smoothstep(0.0, 0.05, vUv.x) * (1.0 - smoothstep(0.95, 1.0, vUv.x));
    vec3 n = normalize(vNormal);
    vec3 lightDir = normalize(vec3(uMouse * 1.2, 0.9));
    float diff = clamp(dot(n, lightDir), 0.0, 1.0);
    col.rgb *= 1.0 + (diff - 0.5) * uLight;
    outColor = col;
}`;

function compile(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'compile failed');
    return s;
}

function loadImage(url) {
    return new Promise((res, rej) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = url;
    });
}

// Read a depth image into a Float32 grid sampled on the (GX+1)x(GY+1) lattice.
function sampleDepthGrid(depthImg) {
    const DW = 300, DH = 400;
    const c = document.createElement('canvas');
    c.width = DW; c.height = DH;
    const ctx = c.getContext('2d');
    ctx.drawImage(depthImg, 0, 0, DW, DH);
    const data = ctx.getImageData(0, 0, DW, DH).data;
    const grid = new Float32Array((GX + 1) * (GY + 1));
    for (let j = 0; j <= GY; j++) {
        for (let i = 0; i <= GX; i++) {
            const u = i / GX, v = j / GY;
            const px = Math.min(DW - 1, Math.round(u * (DW - 1)));
            const py = Math.min(DH - 1, Math.round(v * (DH - 1)));
            grid[j * (GX + 1) + i] = data[(py * DW + px) * 4] / 255;
        }
    }
    return grid;
}

function buildGeometry(depthGrid) {
    const cols = GX + 1, rows = GY + 1;
    const positions = new Float32Array(cols * rows * 3);
    const uvs = new Float32Array(cols * rows * 2);
    const normals = new Float32Array(cols * rows * 3);
    const zAt = (i, j) => (depthGrid[Math.max(0, Math.min(GY, j)) * cols + Math.max(0, Math.min(GX, i))] - 0.5) * DISP;

    const dx = PLANE_W / GX, dy = PLANE_H / GY;
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            const idx = j * cols + i;
            const u = i / GX, v = j / GY;
            const x = (u - 0.5) * PLANE_W;
            const y = (0.5 - v) * PLANE_H;
            const z = zAt(i, j);
            positions[idx * 3] = x;
            positions[idx * 3 + 1] = y;
            positions[idx * 3 + 2] = z;
            uvs[idx * 2] = u;
            uvs[idx * 2 + 1] = v;
            // normal from height gradient
            const zl = zAt(i - 1, j), zr = zAt(i + 1, j);
            const zt = zAt(i, j - 1), zb = zAt(i, j + 1);
            const nx = (zl - zr) / (2 * dx);
            const ny = (zb - zt) / (2 * dy);
            const nz = 1.0;
            const len = Math.hypot(nx, ny, nz) || 1;
            normals[idx * 3] = nx / len;
            normals[idx * 3 + 1] = ny / len;
            normals[idx * 3 + 2] = nz / len;
        }
    }

    const indices = new Uint32Array(GX * GY * 6);
    let p = 0;
    for (let j = 0; j < GY; j++) {
        for (let i = 0; i < GX; i++) {
            const a = j * cols + i, b = a + 1, c = a + cols, d = c + 1;
            indices[p++] = a; indices[p++] = c; indices[p++] = b;
            indices[p++] = b; indices[p++] = c; indices[p++] = d;
        }
    }
    return { positions, uvs, normals, indices };
}

const HeroPortrait = ({
    diffuse = '/david_transparent.png',
    depth = '/david_depth.png',
    alt = 'David Geha',
    className = 'hero__portrait',
}) => {
    const canvasRef = useRef(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setFailed(true); return; }
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false, antialias: true });
        if (!gl) { setFailed(true); return; }

        let raf = 0, disposed = false, running = false, onScreen = true, ready = false;
        const target = { x: 0, y: 0 }, eased = { x: 0, y: 0 };
        let program, uMVP, uMouse, uLight, uDiffuse, indexCount, proj;

        try {
            program = gl.createProgram();
            gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
            gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'link failed');
        } catch (e) {
            console.warn('HeroPortrait: WebGL init failed —', e.message);
            setFailed(true);
            return;
        }

        uMVP = gl.getUniformLocation(program, 'uMVP');
        uMouse = gl.getUniformLocation(program, 'uMouse');
        uLight = gl.getUniformLocation(program, 'uLight');
        uDiffuse = gl.getUniformLocation(program, 'uDiffuse');

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
            const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w; canvas.height = h;
                gl.viewport(0, 0, w, h);
                proj = m4.perspective(FOV, w / h, 0.1, 100);
            }
        };

        let lastPointer = -Infinity;
        const onPointer = (e) => {
            lastPointer = performance.now();
            target.x = (e.clientX / window.innerWidth) * 2 - 1;
            target.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        const onLeave = () => { target.x = 0; target.y = 0; };

        const render = (now = 0) => {
            if (disposed) return;
            // No recent pointer input (touch devices, or a resting cursor):
            // drift the gaze on a slow figure-eight so the portrait stays alive.
            if (now - lastPointer > IDLE_MS) {
                const t = now * 0.001;
                target.x = Math.sin(t * 0.35) * IDLE_AMP;
                target.y = Math.cos(t * 0.22) * IDLE_AMP * 0.6;
            }
            eased.x += (target.x - eased.x) * 0.07;
            eased.y += (target.y - eased.y) * 0.07;

            const rot = m4.mul(m4.rotY(eased.x * ROT), m4.rotX(-eased.y * ROT));
            const model = m4.mul(m4.translate(eased.x * SWAY, -eased.y * SWAY * 0.6, 0), rot);
            const view = m4.translate(0, 0, -CAM);
            const mvp = m4.mul(proj, m4.mul(view, model));

            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            gl.useProgram(program);
            gl.uniformMatrix4fv(uMVP, false, mvp);
            gl.uniform2f(uMouse, eased.x, eased.y);
            gl.uniform1f(uLight, 0.35);
            gl.uniform1i(uDiffuse, 0);
            gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_INT, 0);

            if (running) raf = requestAnimationFrame(render);
        };

        const start = () => {
            if (running || disposed || !ready || !onScreen || document.hidden) return;
            running = true;
            raf = requestAnimationFrame(render);
        };
        const stop = () => { running = false; cancelAnimationFrame(raf); };

        const io = new IntersectionObserver(([e]) => {
            onScreen = e.isIntersecting;
            onScreen ? start() : stop();
        }, { threshold: 0 });
        const onVisibility = () => (document.hidden ? stop() : start());

        Promise.all([loadImage(diffuse), loadImage(depth)])
            .then(([diffImg, depthImg]) => {
                if (disposed) return;

                const geo = buildGeometry(sampleDepthGrid(depthImg));
                indexCount = geo.indices.length;

                const vao = gl.createVertexArray();
                gl.bindVertexArray(vao);
                const mkAttr = (name, data, size) => {
                    const b = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, b);
                    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
                    const loc = gl.getAttribLocation(program, name);
                    gl.enableVertexAttribArray(loc);
                    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
                };
                mkAttr('aPos', geo.positions, 3);
                mkAttr('aUv', geo.uvs, 2);
                mkAttr('aNormal', geo.normals, 3);
                const ib = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.indices, gl.STATIC_DRAW);

                const tex = gl.createTexture();
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, diffImg);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                // The source image is larger than the canvas — mipmaps kill the
                // shimmer that plain LINEAR minification produces while rotating.
                gl.generateMipmap(gl.TEXTURE_2D);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                resize();
                ready = true;
                window.addEventListener('resize', resize);
                window.addEventListener('pointermove', onPointer);
                window.addEventListener('pointerleave', onLeave);
                document.addEventListener('visibilitychange', onVisibility);
                io.observe(canvas);
                start();
            })
            .catch((e) => {
                console.warn('HeroPortrait: asset load failed —', e?.message || e);
                setFailed(true);
            });

        return () => {
            disposed = true;
            running = false;
            cancelAnimationFrame(raf);
            io.disconnect();
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onPointer);
            window.removeEventListener('pointerleave', onLeave);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [diffuse, depth]);

    if (failed) return <img className={className} src={diffuse} alt={alt} />;
    return <canvas ref={canvasRef} className={className} role="img" aria-label={alt} />;
};

export default HeroPortrait;
