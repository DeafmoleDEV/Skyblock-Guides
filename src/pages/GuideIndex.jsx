import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import localGuides from '../data/guides';
import { supabase } from '../lib/supabase';
import { useCategories } from '../lib/CategoriesContext';
import GuideCard from '../components/GuideCard';
import Button from '../components/ui/Button';

const GuideIndex = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useCategories();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    async function fetchGuides() {
      try {
        const { data, error } = await supabase
          .from('guides')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setGuides(data);
        } else {
          setGuides(localGuides);
        }
      } catch (err) {
        console.error("Error fetching guides from Supabase:", err);
        setGuides(localGuides);
      } finally {
        setLoading(false);
      }
    }

    fetchGuides();
  }, []);

  const filteredGuides = guides.filter(guide => {
    const matchesCategory = activeCategory === 'All' || guide.category === activeCategory;
    const title = guide.title || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (guide.tags && guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
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
    <div className="container py-5">
      <div className="mb-5">
        <h1 className="display-4 fw-black mb-2 tracking-tighter text-white">THE LIBRARY</h1>
        <p className="lead text-light-muted fw-medium">Browse all available progression guides.</p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div className="position-relative">
            <Search className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" size={20} />
            <input 
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => updateSearch(e.target.value)}
              className="form-control bg-deep border-secondary text-white ps-5 py-3 rounded-3 shadow-none focus-ring focus-ring-primary"
              style={{ borderColor: '#333', backgroundColor: '#111' }}
            />
          </div>
        </div>
        <div className="col-lg-6 d-flex flex-wrap align-items-center gap-2">
          <Button 
            onClick={() => updateCategory('All')}
            variant={activeCategory === 'All' ? 'primary' : 'outline'}
            size="sm"
            className={activeCategory !== 'All' ? 'text-muted border-secondary' : ''}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button 
              key={cat} 
              onClick={() => updateCategory(cat)}
              variant={activeCategory === cat ? 'primary' : 'outline'}
              size="sm"
              className={activeCategory !== cat ? 'text-muted border-secondary' : ''}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-5 text-center">
          <Loader2 className="animate-spin text-primary mx-auto mb-3" size={48} />
          <p className="text-muted fw-medium">Loading guides...</p>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {filteredGuides.map((guide, index) => (
              <div className="col-md-6 col-lg-4" key={guide.id}>
                <GuideCard guide={guide} delay={index * 0.1} />
              </div>
            ))}
          </div>
          
          {filteredGuides.length === 0 && (
            <div className="py-5 text-center bg-surface rounded-5 border border-secondary border-dashed mt-5">
              <p className="h4 text-muted fw-bold">No guides found matching your search.</p>
              <Button 
                onClick={() => {updateSearch(''); updateCategory('All')}} 
                variant="ghost" 
                size="sm"
                className="mt-2 text-primary"
              >
                RESET FILTERS
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GuideIndex;
