import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skull, Swords, Pickaxe } from 'lucide-react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import LatestVideo from '../components/LatestVideo';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/guides?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    navigate(`/guides?search=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="container py-4">
      <Hero 
        onSearch={handleSearch} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onTagClick={handleTagClick}
      />

      <div className="row g-4 mt-5">
        <div className="col-md-4">
          <CategoryCard 
            title="Dungeons" 
            description="From F1 to M7, master every floor with optimal setups." 
            icon={<Skull className="text-primary" size={32} />}
            onClick={() => navigate('/guides?category=Dungeons')}
            delay={0.2}
          />
        </div>
        <div className="col-md-4">
          <CategoryCard 
            title="Slayers" 
            description="Voidgloom Seraph, Inferno Demonlord, and more." 
            icon={<Swords className="text-accent" size={32} />}
            onClick={() => navigate('/guides?category=Slayers')}
            delay={0.4}
          />
        </div>
        <div className="col-md-4">
          <CategoryCard 
            title="Mining" 
            description="Max your mithril powder and optimize your routes." 
            icon={<Pickaxe className="text-accent" size={32} />}
            onClick={() => navigate('/guides?category=Mining')}
            delay={0.6}
          />
        </div>
      </div>

      <div className="mt-5 pt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="text-center mb-4">
              <h2 className="h4 fw-black text-white text-uppercase tracking-tighter">Latest Video</h2>
              <div className="mx-auto bg-primary rounded" style={{ height: '3px', width: '40px' }}></div>
            </div>
            <LatestVideo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
