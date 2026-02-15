import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ChevronRight, Search } from 'lucide-react';
import guidesRegistry, { categories } from '../data/guides';

const GuideIndex = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = guidesRegistry.filter(guide => {
    const matchesCategory = activeCategory === 'All' || guide.category === activeCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
          Library of <span className="text-necron italic">Skyblock</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          The most comprehensive collection of Hypixel Skyblock knowledge. Filter by category or search for specific items and strategies.
        </p>
      </div>

      <div className="flex flex-col gap-8 mb-12">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text"
            placeholder="Search guides, tags, or items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-necron/50 transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          <CategoryButton 
            label="All" 
            isActive={activeCategory === 'All'} 
            onClick={() => setActiveCategory('All')} 
          />
          {categories.map((cat) => (
            <CategoryButton 
              key={cat} 
              label={cat} 
              isActive={activeCategory === cat} 
              onClick={() => setActiveCategory(cat)} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuides.map((guide) => (
          <Link key={guide.id} to={`/guides/${guide.id}`} className="group">
            <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full">
              <div className={`h-40 ${guide.image} relative flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                <span className="text-white font-black text-3xl opacity-20 uppercase tracking-tighter group-hover:scale-110 transition-transform duration-500">
                  {guide.category}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800/50 text-slate-400 border border-slate-700/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {guide.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                  {guide.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-800/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-necron" /> {guide.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {guide.date}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-necron group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredGuides.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500">No guides found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

const CategoryButton = ({ label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all border ${
      isActive 
        ? 'bg-necron text-white border-necron shadow-lg shadow-necron/20' 
        : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:text-slate-300 hover:border-slate-700'
    }`}
  >
    {label}
  </button>
);

export default GuideIndex;
