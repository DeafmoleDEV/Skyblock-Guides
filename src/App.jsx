import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GuideIndex from './pages/GuideIndex';
import GuideDetail from './pages/GuideDetail';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides" element={<GuideIndex />} />
            <Route path="/guides/:id" element={<GuideDetail />} />
          </Routes>
        </main>
        
        <footer className="py-5 px-4 border-top mt-5" style={{ borderColor: 'var(--ef-border)', backgroundColor: 'var(--ef-bg)' }}>
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
              <div className="d-flex align-items-center gap-2 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--ef-text-muted)' }}>
                <span className="text-white">© 2026 Skyblock Guides</span>
                <span style={{ color: 'var(--ef-border)' }}>/</span>
                <span>Meta knowledge</span>
              </div>
              <div className="d-flex gap-4 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>
                <a href="https://discord.gg/5humW7QHkK" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted hover-primary transition-all">Discord</a>
                <Link to="/guides" className="text-decoration-none text-muted hover-primary transition-all">Library</Link>
                <a href="#" className="text-decoration-none text-muted hover-primary transition-all">Twitter</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
