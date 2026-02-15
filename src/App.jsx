import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GuideIndex from './pages/GuideIndex';
import GuideDetail from './pages/GuideDetail';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-black text-slate-400 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides" element={<GuideIndex />} />
            <Route path="/guides/:id" element={<GuideDetail />} />
          </Routes>
        </main>
        
        <footer className="py-12 px-6 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-700">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Skyblock Guides</p>
            <div className="flex gap-8">
              <a href="https://discord.gg/5humW7QHkK" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
