import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-16 flex items-center px-6">
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="text-heading font-bold tracking-tighter uppercase text-sm">
          Skyblock Guides
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/guides" className="nav-link">
            Library
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-heading/5 transition-colors text-secondary hover:text-heading"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
