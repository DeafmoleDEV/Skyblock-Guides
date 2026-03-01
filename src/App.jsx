import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import CanonicalTag from './components/CanonicalTag';
import { CategoriesProvider } from './lib/CategoriesContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const GuideIndex = lazy(() => import('./pages/GuideIndex'));
const GuideDetail = lazy(() => import('./pages/GuideDetail'));
const LegalNotice = lazy(() => import('./pages/LegalNotice'));
const Creators = lazy(() => import('./pages/Creators'));

// Loading fallback component
const PageLoader = () => (
  <div className="container py-5 text-center min-vh-50 d-flex align-items-center justify-content-center">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <CategoriesProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <CanonicalTag />
        <div className="min-vh-100 d-flex flex-column">
          <Navbar />
          <main className="flex-grow-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/guides" element={<GuideIndex />} />
                <Route path="/guides/:id" element={<GuideDetail />} />
                <Route path="/creators" element={<Creators />} />
                <Route path="/privacy" element={<LegalNotice />} />
              </Routes>
            </Suspense>
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
                  <Link to="/privacy" className="text-decoration-none text-muted hover-primary transition-all">Privacy</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CategoriesProvider>
  );
}

export default App;
