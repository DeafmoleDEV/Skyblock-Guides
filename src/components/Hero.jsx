import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from './ui/Button';

const Hero = ({ onSearch, searchQuery, setSearchQuery, onTagClick }) => {
  const isFirefox = typeof window !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');

  return (
    <div className="section-padding">
      <div className="row align-items-center g-5">
        <div className="col-lg-7 text-center text-lg-start">
          {isFirefox ? (
            <div>
              <span className="badge-custom mb-3">Expert Knowledge</span>
              <h1 className="display-2 mb-4">
                CULTIVATING <br/>
                <span className="text-primary">EXCELLENCE</span>
              </h1>
              
              <p className="lead mb-5 pe-lg-5" style={{ color: 'var(--ef-text-muted)', maxWidth: '540px' }}>
                Master the meta and reach Endgame with our resources.
              </p>

              <div className="d-flex flex-column flex-sm-row align-items-center gap-3 justify-content-center justify-content-lg-start">
                <Link to="/guides">
                  <Button size="md" variant="primary">
                    EXPLORE LIBRARY
                  </Button>
                </Link>
                <a href="https://discord.gg/5humW7QHkK" target="_blank" rel="noopener noreferrer">
                  <Button size="md" variant="outline">
                    JOIN DISCORD
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <span className="badge-custom mb-3">Expert Knowledge</span>
              <h1 className="display-2 mb-4">
                CULTIVATING <br/>
                <span className="text-primary">EXCELLENCE</span>
              </h1>
              
              <p className="lead mb-5 pe-lg-5" style={{ color: 'var(--ef-text-muted)', maxWidth: '540px' }}>
                Master the meta and reach Endgame with our resources.
              </p>

              <div className="d-flex flex-column flex-sm-row align-items-center gap-3 justify-content-center justify-content-lg-start">
                <Link to="/guides">
                  <Button size="md" variant="primary">
                    EXPLORE LIBRARY
                  </Button>
                </Link>
                <a href="https://discord.gg/5humW7QHkK" target="_blank" rel="noopener noreferrer">
                  <Button size="md" variant="outline">
                    JOIN DISCORD
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </div>

        <div className="col-lg-5">
          {isFirefox ? (
            <div className="card-custom">
              <form onSubmit={onSearch}>
                <h3 className="h5 mb-4 text-uppercase tracking-wide">Find a guide</h3>
                <div className="position-relative">
                  <Search className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" size={18} />
                  <input 
                    type="text"
                    placeholder="e.g. 'F7 Tank Setup'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-custom ps-5"
                  />
                </div>
                <div className="mt-4 d-flex flex-wrap gap-2">
                  {['M7', 'Voidgloom', 'Mining'].map(tag => (
                    <button 
                      key={tag} 
                      type="button"
                      className="search-tag"
                      onClick={() => onTagClick ? onTagClick(tag) : setSearchQuery(tag)}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          ) : (
            <motion.div 
              className="card-custom"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <form onSubmit={onSearch}>
                <h3 className="h5 mb-4 text-uppercase tracking-wide">Find a guide</h3>
                <div className="position-relative">
                  <Search className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" size={18} />
                  <input 
                    type="text"
                    placeholder="e.g. 'F7 Tank Setup'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-custom ps-5"
                  />
                </div>
                <div className="mt-4 d-flex flex-wrap gap-2">
                  {['F7', 'Archer', 'MP'].map(tag => (
                    <button 
                      key={tag} 
                      type="button"
                      className="search-tag"
                      onClick={() => onTagClick ? onTagClick(tag) : setSearchQuery(tag)}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
