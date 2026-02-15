import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="h-16 flex items-center px-6">
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="text-white font-bold tracking-tighter uppercase text-sm">
          Skyblock Guides
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/guides" className="nav-link">
            Library
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
