import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import localGuides from '../data/guides';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';

const GuideDetail = () => {
  const { id } = useParams();
  const [guideMetadata, setGuideMetadata] = useState(localGuides.find(g => g.id === id));
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuideData() {
      let currentMetadata = guideMetadata;

      // If not in local storage, try fetching from Supabase
      if (!currentMetadata) {
        try {
          const { data, error } = await supabase
            .from('guides')
            .select('*')
            .eq('id', id)
            .single();
          
          if (data) {
            currentMetadata = data;
            setGuideMetadata(data);
          }
        } catch (err) {
          console.error("Error fetching guide metadata:", err);
        }
      }

      if (currentMetadata && (currentMetadata.contentPath || currentMetadata.content_path)) {
        const path = currentMetadata.content_path || currentMetadata.contentPath;
        // Check if path is a full URL or a local path
        const url = path.startsWith('http') 
          ? path 
          : `${import.meta.env.BASE_URL}${path}`;

        fetch(url)
          .then(res => res.text())
          .then(text => {
            setContent(text);
            setLoading(false);
          })
          .catch(err => {
            console.error("Failed to load guide content:", err);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }

    fetchGuideData();
  }, [id, guideMetadata]);

  if (!guideMetadata) {
    return (
      <div className="container py-5 text-center">
        <h1 className="display-4 fw-black mb-4 text-white">GUIDE NOT FOUND</h1>
        <Link to="/guides">
          <Button variant="primary">RETURN TO LIBRARY</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="container py-5 max-w-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/guides" className="d-inline-flex align-items-center gap-2 text-decoration-none text-muted fw-black text-uppercase tracking-widest mb-5 hover-primary" style={{ fontSize: '10px' }}>
        <ArrowLeft size={14} /> Back to Library
      </Link>

      <article>
        <header className="mb-5">
          <div className="mb-4">
            <span className="badge-custom">
              {guideMetadata.category}
            </span>
          </div>
          
          <h1 className="display-3 fw-black text-white mb-4 tracking-tighter text-uppercase">
            {guideMetadata.title}
          </h1>

          <div className="d-flex flex-wrap align-items-center gap-4 text-muted fw-black text-uppercase tracking-widest" style={{ fontSize: '11px' }}>
            <div className="d-flex align-items-center gap-2">
              <User size={14} className="text-secondary" />
              <span>{guideMetadata.author}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Calendar size={14} className="text-accent" />
              <span>{guideMetadata.date}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Clock size={14} className="text-primary" />
              <span>10 MIN READ</span>
            </div>
          </div>
        </header>

        <motion.div 
          className="border-top border-secondary pt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {loading ? (
            <div className="animate-pulse">
              <div className="bg-dark rounded mb-3" style={{ height: '20px', width: '75%' }}></div>
              <div className="bg-dark rounded mb-3" style={{ height: '20px', width: '100%' }}></div>
              <div className="bg-dark rounded mb-3" style={{ height: '20px', width: '90%' }}></div>
              <div className="bg-dark rounded-5 mt-5" style={{ height: '300px' }}></div>
            </div>
          ) : content ? (
            <div className="prose-custom">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary fw-bold" />
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-center py-5 italic text-muted">Content unavailable.</p>
          )}
        </motion.div>
      </article>
    </motion.div>
  );
};

export default GuideDetail;
