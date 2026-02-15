import React, { useEffect } from 'react';

const AdPlacement = ({ id }) => {
  useEffect(() => {
    const loadAd = () => {
      try {
        if (window.ezstandalone) {
          window.ezstandalone.cmd.push(function () {
            window.ezstandalone.define(id);
            window.ezstandalone.refresh();
            window.ezstandalone.showAds(id);
          });
        }
      } catch (e) {
        console.error('Ezoic Ad  Error:', e);
      }
    };

    // Small delay to ensure the DOM element is fully rendered by React
    const timer = setTimeout(loadAd, 100);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div 
      className="ad-container py-4 d-flex justify-content-center w-100 overflow-hidden" 
      style={{ minHeight: '120px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '2rem' }}
    >
      <div id={`ezoic-pub-ad-placeholder-${id}`}></div>
    </div>
  );
};

export default AdPlacement;
