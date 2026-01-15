import React, { useEffect } from 'react';

const GoogleReviews = () => {
  // Load Elfsight script for Google Reviews widget
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Real Reviews from <span className="bg-gradient-to-r from-coral to-peach bg-clip-text text-transparent">Google</span>
      </h3>
      <div className="elfsight-app-59388eeb-9aad-472b-af34-525288275e26" data-elfsight-app-lazy></div>
    </div>
  );
};

export default GoogleReviews;
