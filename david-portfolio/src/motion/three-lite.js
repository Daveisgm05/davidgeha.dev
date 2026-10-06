// Only the three.js pieces the GL hooks use, so the lazy chunk tree-shakes the rest.
export {
    WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, Points, Line,
    SphereGeometry, CircleGeometry, RingGeometry, BufferGeometry, BufferAttribute,
    MeshBasicMaterial, ShaderMaterial, Vector3, Color, QuadraticBezierCurve3,
    BackSide, DoubleSide, AdditiveBlending,
} from 'three';
