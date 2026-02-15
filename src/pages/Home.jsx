import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/guides?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
      <div className="mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight uppercase">
          Skyblock Guides
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mb-12">
          Best Skyblock resource for getting better at the game and progressing faster
        </p>

        <form onSubmit={handleSearch} className="max-w-xl mb-6">
          <input 
            type="text"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-white transition-colors"
          />
        </form>
        <Link to="/guides" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
          Browse full library →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CategoryCard 
          title="Dungeons" 
          description="F7 & Master Mode setups." 
          onClick={() => navigate('/guides?category=Dungeons')}
        />
        <CategoryCard 
          title="Slayers" 
          description="T5 Rev & Enderman meta." 
          onClick={() => navigate('/guides?category=Slayers')}
        />
        <CategoryCard 
          title="Mining" 
          description="HOTM 7 & Gemstone routes." 
          onClick={() => navigate('/guides?category=Mining')}
        />
      </div>
    </div>
  );
};

const CategoryCard = ({ title, description, onClick }) => (
  <button 
    onClick={onClick}
    className="card text-left p-8 group"
  >
    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2 group-hover:underline">
      {title}
    </h3>
    <p className="text-slate-400 text-xs">
      {description}
    </p>
  </button>
);

export default Home;
