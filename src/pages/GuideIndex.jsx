import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import guidesRegistry, { categories } from '../data/guides';

const GuideIndex = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const queryParam = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);

  useEffect(() => {
    setActiveCategory(categoryParam);
    setSearchQuery(queryParam);
  }, [categoryParam, queryParam]);

  const filteredGuides = guidesRegistry.filter(guide => {
    const matchesCategory = activeCategory === 'All' || guide.category === activeCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const updateCategory = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const updateSearch = (query) => {
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Library</h1>
        <p className="text-slate-400 text-sm">Browse all available progression guides.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <input 
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => updateSearch(e.target.value)}
          className="flex-1 bg-transparent border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white/20 transition-colors"
        />
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => updateCategory('All')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${activeCategory === 'All' ? 'bg-white text-black' : 'border border-white/10 text-slate-400 hover:text-white'}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => updateCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${activeCategory === cat ? 'bg-white text-black' : 'border border-white/10 text-slate-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGuides.map((guide) => (
          <Link key={guide.id} to={`/guides/${guide.id}`} className="card p-6 group">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{guide.category}</p>
            <h3 className="text-lg font-bold text-white group-hover:underline transition-all mb-2">
              {guide.title}
            </h3>
            <p className="text-slate-400 text-sm line-clamp-2 mb-4">
              {guide.description}
            </p>
            <div className="flex items-center justify-between text-[10px] font-medium uppercase text-slate-500">
              <span>By {guide.author}</span>
              <span>{guide.date}</span>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredGuides.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-400 text-sm">No results found.</p>
        </div>
      )}
    </div>
  );
};

export default GuideIndex;
