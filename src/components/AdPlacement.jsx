import React, { useEffect } from 'react';

const AdPlacement = ({ id }) => {
  useEffect(() => {
    try {
      if (window.ezstandalone) {
        window.ezstandalone.cmd.push(function () {
          // If the placeholder exists, show it
          if (window.ezstandalone.showAds) {
            window.ezstandalone.showAds(id);
          }
        });
      }
    } catch (e) {
      console.error('Ezoic Ad Error:', e);
    }
  }, [id]);

  return (
    <div className="py-4 d-flex justify-content-center w-100 overflow-hidden" style={{ minHeight: '100px' }}>
      <div id={`ezoic-pub-ad-placeholder-${id}`}></div>
    </div>
  );
};

export default AdPlacement;
