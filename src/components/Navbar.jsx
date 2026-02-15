import React from 'react';
import { Link } from 'react-router-dom';
import { Sword, BookOpen, Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-necron rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-necron/20">
                <Sword className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black uppercase tracking-tighter text-white">
                Skyblock <span className="text-necron">Guides</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <NavLink to="/" icon={<Home className="w-4 h-4" />} label="Home" />
            <NavLink to="/guides" icon={<BookOpen className="w-4 h-4" />} label="Library" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
  >
    {icon}
    {label}
  </Link>
);

export default Navbar;
