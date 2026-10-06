// [data-globe]: a dot-matrix globe that turns to Beirut (inspired: P75's lit globe and marker
// overlay, redrawn in the site's schematic language: land as square dots, a faint signal rim,
// a pulsing marker on Beirut and packets travelling the arcs to the teams it works with).
// Decorative (aria-hidden): the page's text already says "Beirut, Lebanon". Drag to spin;
// scroll turns it onto Beirut as the section arrives. No WebGL / reduced motion → nothing
// (the host's CSS lattice stays).
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mountGL, whenNear } from './gl.js';
import { finePointer } from './tokens.js';

const BEIRUT = [33.8938, 35.5018];
const LINKS = [
    [25.2048, 55.2708],  // Dubai
    [24.7136, 46.6753],  // Riyadh
    [25.2854, 51.531],   // Doha
    [29.3759, 47.9774],  // Kuwait City
    [30.0444, 31.2357],  // Cairo
    [48.8566, 2.3522],   // Paris
    [51.5072, -0.1276],  // London
    [41.0082, 28.9784],  // Istanbul
];
const INK = 0x0f1114, PAPER = [0.925, 0.92, 0.894], SIGNAL = [0.776, 0.957, 0.196];

const toVec = (three, lat, lon, r = 1) => {
    const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
    return new three.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};

export async function globe(host) {
    await whenNear(host);
    const stage = await mountGL(host);
    if (!stage) return () => {};
    const { three, renderer } = stage;
    let disposed = false;
    const data = await fetch('/data/land-dots.json').then((r) => r.json()).catch(() => []);
    if (disposed) return () => {};

    const scene = new three.Scene();
    const camera = new three.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0, 4.1);
    const world = new three.Group();
    scene.add(world);
    const beirut = toVec(three, ...BEIRUT);

    // the body: an ink sphere so the far side's dots are hidden
    world.add(new three.Mesh(new three.SphereGeometry(0.985, 64, 48), new three.MeshBasicMaterial({ color: INK })));

    // land: one square point per dot, brightening toward Beirut, fading at the limb
    const n = data.length / 2;
    const pos = new Float32Array(n * 3), near = new Float32Array(n);
    for (let i = 0; i < n; i++) {
        const v = toVec(three, data[i * 2] / 10, data[i * 2 + 1] / 10, 1.0);
        pos.set([v.x, v.y, v.z], i * 3);
        near[i] = Math.max(0, 1 - v.distanceTo(beirut) / 0.55);
    }
    const g = new three.BufferGeometry();
    g.setAttribute('position', new three.BufferAttribute(pos, 3));
    g.setAttribute('aNear', new three.BufferAttribute(near, 1));
    const dotMat = new three.ShaderMaterial({
        transparent: true, depthWrite: false,
        uniforms: { uSize: { value: 2.6 * stage.dpr }, uPaper: { value: new three.Vector3(...PAPER) }, uSignal: { value: new three.Vector3(...SIGNAL) } },
        vertexShader: `
            attribute float aNear; uniform float uSize; varying float vNear; varying float vFace;
            void main() {
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                vFace = normalize(normalMatrix * position).z;
                vNear = aNear;
                gl_PointSize = uSize * (1.0 + aNear * 0.6);
                gl_Position = projectionMatrix * mv;
            }`,
        fragmentShader: `
            uniform vec3 uPaper; uniform vec3 uSignal; varying float vNear; varying float vFace;
            void main() {
                float a = smoothstep(0.0, 0.35, vFace) * (0.38 + vNear * 0.62);
                gl_FragColor = vec4(mix(uPaper, uSignal, smoothstep(0.15, 0.8, vNear)), a);
            }`,
    });
    world.add(new three.Points(g, dotMat));

    // the rim: a back-face shell lit at the edge in the signal colour
    const rim = new three.Mesh(new three.SphereGeometry(1.07, 64, 48), new three.ShaderMaterial({
        transparent: true, side: three.BackSide, depthWrite: false, blending: three.AdditiveBlending,
        uniforms: { uSignal: { value: new three.Vector3(...SIGNAL) } },
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 uSignal; varying vec3 vN; void main(){ float f = pow(clamp(0.62 - dot(vN, vec3(0.0,0.0,1.0)), 0.0, 1.0), 4.0); gl_FragColor = vec4(uSignal, clamp(f, 0.0, 1.0) * 0.16); }`,
    }));
    scene.add(rim);

    // Beirut: a dot and two rings pulsing out over the surface
    const markerGroup = new three.Group();
    markerGroup.position.copy(beirut.clone().multiplyScalar(1.004));
    markerGroup.lookAt(beirut.clone().multiplyScalar(2));
    world.add(markerGroup);
    const sig = new three.Color().setRGB(...SIGNAL);
    markerGroup.add(new three.Mesh(new three.CircleGeometry(0.018, 24), new three.MeshBasicMaterial({ color: sig })));
    const rings = [0, 1].map(() => {
        const m = new three.Mesh(new three.RingGeometry(0.03, 0.036, 48), new three.MeshBasicMaterial({ color: sig, transparent: true, side: three.DoubleSide }));
        markerGroup.add(m);
        return m;
    });

    // arcs: a faint full path and a bright packet running along it, staggered
    const arcs = LINKS.map(([lat, lon], i) => {
        const to = toVec(three, lat, lon);
        const lift = 1 + beirut.distanceTo(to) * 0.42;
        const mid = beirut.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(lift);
        const curve = new three.QuadraticBezierCurve3(beirut, mid, to);
        const pts = curve.getPoints(64);
        const geo = new three.BufferGeometry().setFromPoints(pts);
        const t = new Float32Array(pts.length).map((_, k) => k / (pts.length - 1));
        geo.setAttribute('aT', new three.BufferAttribute(t, 1));
        const mat = new three.ShaderMaterial({
            transparent: true, depthWrite: false,
            uniforms: { uHead: { value: 0 }, uSignal: { value: new three.Vector3(...SIGNAL) } },
            vertexShader: `attribute float aT; varying float vT; void main(){ vT = aT; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
            fragmentShader: `uniform float uHead; uniform vec3 uSignal; varying float vT;
                void main(){ float d = uHead - vT; float packet = d >= 0.0 ? smoothstep(0.22, 0.0, d) : 0.0;
                gl_FragColor = vec4(uSignal, 0.14 + packet * 0.86); }`,
        });
        world.add(new three.Line(geo, mat));
        const dot = new three.Mesh(new three.CircleGeometry(0.011, 16), new three.MeshBasicMaterial({ color: 0xecebe4 }));
        dot.position.copy(to.clone().multiplyScalar(1.004));
        dot.lookAt(to.clone().multiplyScalar(2));
        world.add(dot);
        return { mat, offset: i * 0.37, speed: 0.32 + (i % 3) * 0.05 };
    });

    // orientation: Beirut faces the camera, a little below centre; drag adds yaw with inertia;
    // the section's arrival turns the globe the last stretch onto Beirut (scrubbed).
    const baseYaw = -Math.atan2(beirut.x, beirut.z) - 0.38; // Beirut a little left of centre, clear of the call button
    const basePitch = Math.asin(beirut.y) - 0.16; // Beirut a little above centre, clear of the footer slab
    const state = { arrive: 1, drag: 0, vel: 0 };
    const st = ScrollTrigger.create({
        trigger: host.closest('[data-globe-scope]') || host, start: 'top bottom', end: 'top 25%', scrub: true,
        onUpdate: (self) => { state.arrive = 1 - self.progress; },
    });

    let down = false, lastX = 0;
    const onDown = (e) => { down = true; lastX = e.clientX; host.classList.add('is-grabbing'); };
    const onMove = (e) => { if (!down) return; const dx = e.clientX - lastX; lastX = e.clientX; state.vel = dx * 0.006; state.drag += state.vel; };
    const onUp = () => { down = false; host.classList.remove('is-grabbing'); };
    host.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);

    stage.onResize((w, h) => {
        camera.aspect = w / h;
        // keep the globe the same share of the host on narrow hosts
        camera.position.z = w / h < 1 ? 4.1 / (w / h) * 0.9 : 4.1;
        camera.updateProjectionMatrix();
    });

    stage.onFrame((time) => {
        if (!down) { state.drag += state.vel; state.vel *= 0.94; }
        const idle = Math.sin(time * 0.12) * 0.08;
        world.rotation.set(basePitch, baseYaw + idle + state.drag - state.arrive * 1.4, 0, 'XYZ');
        rim.rotation.copy(world.rotation);
        rings.forEach((r, i) => {
            const p = (time * 0.45 + i * 0.5) % 1;
            r.scale.setScalar(1 + p * 3.2);
            r.material.opacity = (1 - p) * 0.9;
        });
        arcs.forEach((a) => { a.mat.uniforms.uHead.value = ((time * a.speed + a.offset) % 1.6) * 1.2 - 0.1; });
        renderer.render(scene, camera);
    });

    if (finePointer()) host.classList.add('is-draggable');
    return () => {
        disposed = true;
        st.kill();
        host.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        stage.dispose();
    };
}
