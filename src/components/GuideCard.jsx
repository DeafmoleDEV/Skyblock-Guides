import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from './ui/Card';

const GuideCard = ({ guide, delay = 0 }) => {
  // Prefetch libraries when user hovers over a card
  const handlePrefetch = () => {
    // These are dynamic imports that browser will fetch and cache
    import('react-markdown');
    import('remark-gfm');
    
    // If it's a docx, prefetch mammoth too
    const path = guide.content_path || guide.contentPath;
    if (path && path.endsWith('.docx')) {
      import('mammoth');
    }
  };

  return (
    <div className="h-100" onMouseEnter={handlePrefetch}>
      <Link to={`/guides/${guide.id}`} className="text-decoration-none h-100 d-block">
        <Card
          hoverable
          isAnimated
          className="d-flex flex-column h-100 p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay, duration: 0.3 }}
        >
          <div className="mb-3">
            <span className="badge-custom">
              {guide.category}
            </span>
          </div>
          
          <h3 className="h5 fw-bold text-white mb-2">
            {guide.title}
          </h3>
          <p className="small mb-4 flex-grow-1" style={{ color: 'var(--ef-text-muted)', lineHeight: '1.5' }}>
            {guide.description}
          </p>
          
          <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top" style={{ borderColor: 'var(--ef-border)' }}>
            <span className="text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>By {guide.author}</span>
            <ArrowRight size={14} className="text-primary" />
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default GuideCard;
