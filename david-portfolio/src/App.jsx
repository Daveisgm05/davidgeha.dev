import { useEffect } from 'react';
import Lenis from 'lenis';
import './App.css';
import Loader from './components/Loader';
import Header from './components/Header';
import Marquee from './components/Marquee';
import SelectedWork from './components/SelectedWork';
import About from './components/About';
import MyWork from './components/MyWork';
import Contact from './components/Contact';
import Reveal from './components/Reveal';

function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Route in-page anchor links through Lenis so nav glides instead of jumping.
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -32, duration: 1.2 });
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div className="app">
      <Loader />
      <main>
        <Header />
        <Marquee />
        <SelectedWork />
        <About />
        <MyWork />
        <Reveal><Contact /></Reveal>
      </main>
    </div>
  );
}

export default App;
