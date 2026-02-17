import React, { useEffect, useState } from 'react';
import { Users, AlertTriangle, ExternalLink, Video, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Card from '../components/ui/Card';

const CreatorCard = ({ creator, delay = 0 }) => {
  return (
    <Card
      hoverable={false}
      isAnimated
      className="p-4 d-flex flex-column h-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.3 }}
    >
      <div className="flex-grow-1">
        <div className="d-flex align-items-center gap-3 mb-3">
          {creator.avatar_url && (
            <img 
              src={creator.avatar_url} 
              alt={creator.name} 
              className="rounded-circle border border-2 border-secondary"
              style={{ width: '48px', height: '48px', objectFit: 'cover' }}
            />
          )}
          <h3 className="h5 fw-bold text-white mb-0 text-uppercase tracking-wider">
            {creator.name}
          </h3>
        </div>
        
        <div className="d-flex flex-column gap-2 mb-3">
          {creator.youtube_id && (
            <div 
              className="youtube-subscribe p-3 rounded-3 d-flex justify-content-center align-items-center" 
              style={{ backgroundColor: '#333', border: '1px solid var(--ef-border)', minHeight: '68px' }}
            >
              <div 
                className="g-ytsubscribe" 
                data-channelid={creator.youtube_id}
                data-layout="full" 
                data-count="default"
                data-theme="dark"
              ></div>
            </div>
          )}

          {creator.tiktok_username && (
            <a 
              href={`https://www.tiktok.com/@${creator.tiktok_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="platform-link p-3 rounded-3 d-flex align-items-center gap-3 text-decoration-none"
              style={{ backgroundColor: '#333', border: '1px solid var(--ef-border)', color: '#fff' }}
            >
              <Video size={20} className="text-primary" />
              <div className="flex-grow-1">
                <div className="small fw-bold">TikTok</div>
                <div className="text-muted extra-small">@{creator.tiktok_username}</div>
              </div>
              <ExternalLink size={14} className="opacity-50" />
            </a>
          )}

          {creator.forums_url && (
            <a 
              href={creator.forums_url}
              target="_blank"
              rel="noopener noreferrer"
              className="platform-link p-3 rounded-3 d-flex align-items-center gap-3 text-decoration-none"
              style={{ backgroundColor: '#333', border: '1px solid var(--ef-border)', color: '#fff' }}
            >
              <MessageSquare size={20} className="text-primary" />
              <div className="flex-grow-1">
                <div className="small fw-bold">Hypixel Forums</div>
                <div className="text-muted extra-small">View Profile</div>
              </div>
              <ExternalLink size={14} className="opacity-50" />
            </a>
          )}
        </div>

        <p className="small mb-0" style={{ color: 'var(--ef-text-muted)', lineHeight: '1.5' }}>
          {creator.description || `High-quality Skyblock content and guides.`}
        </p>
      </div>
    </Card>
  );
};

const Creators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCreators() {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        setCreators(data || []);
      } catch (err) {
        console.error("Error fetching creators:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCreators();
  }, []);

  useEffect(() => {
    if (!loading && creators.length > 0) {
      const renderWidgets = () => {
        if (window.gapi && window.gapi.ytsubscribe) {
          window.gapi.ytsubscribe.go();
        } else {
          setTimeout(renderWidgets, 500);
        }
      };
      renderWidgets();
    }
  }, [loading, creators]);

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h1 className="display-4 fw-black mb-2 tracking-tighter text-white d-flex align-items-center gap-3">
          <Users className="text-primary" size={48} />
          CREATORS
        </h1>
        <p className="lead text-light-muted fw-medium">The talented individuals behind our guides and community.</p>
      </div>

      {error && (
        <div className="alert alert-danger bg-danger bg-opacity-10 border-danger text-danger d-flex align-items-center gap-3 p-4 rounded-4 mb-5">
          <AlertTriangle size={24} />
          <div>
            <div className="fw-bold">Failed to load creators</div>
            <div className="small opacity-75">{error}</div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {creators.length > 0 ? (
            creators.map((creator, index) => (
              <div className="col-md-6 col-lg-4" key={creator.id}>
                <CreatorCard creator={creator} delay={index * 0.1} />
              </div>
            ))
          ) : !error && (
            <div className="col-12 text-center py-5 bg-surface rounded-5 border border-secondary border-dashed">
              <p className="h4 text-muted fw-bold">No creators found yet.</p>
              <p className="text-muted small">Check your "creators" table in Supabase.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Creators;
