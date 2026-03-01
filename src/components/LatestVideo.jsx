import React, { useEffect, useState } from 'react';
import { Youtube, ExternalLink, Loader2 } from 'lucide-react';
import Card from './ui/Card';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const LatestVideo = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLatestVideos = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // Fetch channels from Supabase
        const { data: channels, error: supabaseError } = await supabase
          .from('latest_videos')
          .select('channel_id');
          
        if (supabaseError) throw supabaseError;
        
        if (!channels || channels.length === 0) {
          setVideos([]);
          setLoading(false);
          return;
        }

        const videoPromises = channels.map(async (channel) => {
          try {
            const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.channel_id}`;
            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            
            if (data.status === 'ok' && data.items && data.items.length > 0) {
              return { ...data.items[0], channel_id: channel.channel_id };
            }
            return null;
          } catch (err) {
            console.error(`Error fetching video for channel ${channel.channel_id}:`, err);
            return null;
          }
        });

        const fetchedVideos = (await Promise.all(videoPromises)).filter(v => v !== null);
        
        // Optionally sort them by pubDate descending
        fetchedVideos.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        setVideos(fetchedVideos);
      } catch (err) {
        console.error('Error fetching latest videos:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideos();
  }, []);

  if (loading) {
    return (
      <Card className="p-4 d-flex align-items-center justify-content-center" style={{ minHeight: '250px' }}>
        <Loader2 className="animate-spin text-primary" size={32} />
      </Card>
    );
  }

  if (error || videos.length === 0) {
    return (
      <a 
        href="https://www.youtube.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-decoration-none"
      >
        <Card hoverable className="p-4 d-flex align-items-center justify-content-center gap-3 border-dashed border-secondary text-center">
          <Youtube className="text-danger" size={32} />
          <div>
            <h4 className="h6 fw-bold text-white mb-1">Check out YouTube</h4>
            <p className="small text-muted mb-0">No videos found. Click to open YouTube.</p>
          </div>
          <ExternalLink className="ms-2 text-muted" size={16} />
        </Card>
      </a>
    );
  }

  return (
    <div className="row g-4">
      {videos.map((video, index) => {
        const videoId = video.link.split('v=')[1]?.split('&')[0];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        return (
          <div className="col-md-6 col-lg-4" key={video.guid || index}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-100"
            >
              <Card className="overflow-hidden p-0 border-secondary bg-black h-100 d-flex flex-column">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="border-0"
                  ></iframe>
                </div>
                <div className="p-3 bg-surface d-flex flex-column flex-grow-1">
                  <h4 className="h6 fw-bold text-white mb-2 line-clamp-2" title={video.title} style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {video.title}
                  </h4>
                  <div className="mt-auto d-flex align-items-center justify-content-between">
                    <span className="text-muted" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>
                      PUBLISHED {new Date(video.pubDate).toLocaleDateString()}
                    </span>
                    <a 
                      href={video.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary text-decoration-none d-flex align-items-center gap-1"
                      style={{ fontSize: '10px', fontWeight: 'bold' }}
                    >
                      OPEN <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default LatestVideo;
