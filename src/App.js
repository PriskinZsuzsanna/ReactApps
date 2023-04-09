import './index.css';
import { BrowserRouter, Routes, Route, Link, HashRouter } from 'react-router-dom';

import { GlobalProvider } from './context/GlobalState';

import Footer from './components/Footer'
import Home from './pages/Home'
import Notes from './pages/Notes'
import MusicPlayer from './pages/MusicPlayer'
import Dictionary from './pages/Dictionary';


function App() {
  return (
    <GlobalProvider>
      <HashRouter basename="/">
        <div className="App">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:username" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/musicplayer" element={<MusicPlayer />} />
          </Routes>

          <Footer />

        </div>
      </HashRouter>
    </GlobalProvider>
  );
}

export default App;
