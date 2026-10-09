import { useEffect } from 'react';
import { initMotion } from './motion/engine';
import SiteHeader from './components/SiteHeader';
import Header from './components/Header';
import Marquee from './components/Marquee';
import SelectedWork from './components/SelectedWork';
import About from './components/About';
import Services from './components/Services';
import Faq from './components/Faq';
import MyWork from './components/MyWork';
import Contact from './components/Contact';

function App() {
  // One engine for the whole page: smooth scroll, the data-* hooks and their cleanup.
  // Children's effects (the hero beat, the portrait) run before this one.
  useEffect(() => {
    const motion = initMotion();
    return () => motion.destroy();
  }, []);

  return (
    <div className="app">
      <SiteHeader />
      <main>
        <Header />
        <Marquee />
        <SelectedWork />
        <About />
        <Services />
        <MyWork />
        <Faq />
        <Contact />
      </main>
    </div>
  );
}

export default App;
