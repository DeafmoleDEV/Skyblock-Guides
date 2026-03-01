import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CanonicalTag = () => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = 'https://skyblock-guides.com';
    // Remove trailing slash if any, unless it's just '/'
    let path = location.pathname;
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    const url = `${baseUrl}${path}`;
    
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }, [location.pathname]);

  return null;
};

export default CanonicalTag;
