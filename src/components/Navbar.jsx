import React from 'react';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom px-4 sticky-top">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <Flame className="text-primary" fill="currentColor" size={24} />
          <span className="h5 mb-0 fw-bold text-uppercase tracking-wider">
            Skyblock<span className="text-primary">Guides</span>
          </span>
        </Link>
        
        <div className="d-flex align-items-center gap-4">
          <Link to="/guides" className="nav-link text-uppercase fw-bold text-white-50 hover-white small tracking-widest">
            Guides
          </Link>
          <Link to="/creators" className="nav-link text-uppercase fw-bold text-white-50 hover-white small tracking-widest">
            Creators
          </Link>
          <a href="https://discord.gg/5humW7QHkK" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Discord
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
