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
            <Route path="/" component={<Home />} />
            <Route path="/:username" component={<Home />} />
            <Route path="/notes" component={<Notes />} />
            <Route path="/dictionary" component={<Dictionary />} />
            <Route path="/musicplayer" component={<MusicPlayer />} />
          </Routes>

          <Footer />

        </div>
      </HashRouter>
    </GlobalProvider>
  );
}

export default App;
