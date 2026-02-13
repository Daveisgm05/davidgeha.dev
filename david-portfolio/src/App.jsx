import './App.css';
import Header from './components/Header';
import SelectedWork from './components/SelectedWork';
import About from './components/About';
import MyWork from './components/MyWork';
import Contact from './components/Contact';
import Reveal from './components/Reveal';

function App() {
  return (
    <div className="app">
      <main>
        <Header />
        <Reveal><SelectedWork /></Reveal>
        <Reveal><About /></Reveal>
        <Reveal><MyWork /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
    </div>
  );
}

export default App;
