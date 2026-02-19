import React, { useEffect, useState } from 'react';
import { Youtube, ExternalLink, Loader2 } from 'lucide-react';
import Card from './ui/Card';
import { motion } from 'framer-motion';

const LatestVideo = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const channelId = 'UC17QRjzQlQc-VPxr7Ry-RLA';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          setVideo(data.items[0]);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching latest video:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Card className="p-4 d-flex align-items-center justify-content-center" style={{ minHeight: '250px' }}>
        <Loader2 className="animate-spin text-primary" size={32} />
      </Card>
    );
  }

  if (error || !video) {
    return (
      <a 
        href="https://www.youtube.com/channel/UC17QRjzQlQc-VPxr7Ry-RLA" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-decoration-none"
      >
        <Card hoverable className="p-4 d-flex align-items-center gap-3 border-dashed border-secondary">
          <Youtube className="text-danger" size={32} />
          <div>
            <h4 className="h6 fw-bold text-white mb-1">Watch on YouTube</h4>
            <p className="small text-muted mb-0">Check out our latest guides and tips.</p>
          </div>
          <ExternalLink className="ms-auto text-muted" size={16} />
        </Card>
      </a>
    );
  }

  // Extract video ID from link
  const videoId = video.link.split('v=')[1]?.split('&')[0];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden p-0 border-secondary bg-black">
        <div className="ratio ratio-16x9">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="border-0"
          ></iframe>
        </div>
        <div className="p-3 bg-surface">
          <h4 className="h6 fw-bold text-white mb-2 line-clamp-1" title={video.title}>
            {video.title}
          </h4>
          <div className="d-flex align-items-center justify-content-between">
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
              OPEN ON YOUTUBE <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default LatestVideo;
