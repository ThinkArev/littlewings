import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const GoogleReviews = () => {
  const [isLoading, setIsLoading] = useState(true);

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

    // More aggressive branding removal using MutationObserver
    // This targets the inline !important styles that CSS can't always beat
    const removeBranding = () => {
      const brandingLinks = document.querySelectorAll('a[href*="elfsight.com/google-reviews-widget"]');
      brandingLinks.forEach(link => {
        if (link) {
          // Setting display: none !important directly on the element's style property
          (link as HTMLElement).style.setProperty('display', 'none', 'important');
          (link as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
          (link as HTMLElement).style.setProperty('opacity', '0', 'important');
          (link as HTMLElement).style.setProperty('height', '0', 'important');
          (link as HTMLElement).style.setProperty('pointer-events', 'none', 'important');
          // Or just remove it entirely if that's safe
          // link.remove(); 
        }
      });
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => removeBranding());
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Run periodically as a fallback
    const interval = setInterval(removeBranding, 1000);

    // Set a timeout to hide the loader as Elfsight doesn't provide a direct callback
    const timer = setTimeout(() => {
      setIsLoading(false);
      removeBranding(); // Run once more after revealing
    }, 2500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="mt-8 relative">
      <style>{`
        /* Hide Elfsight branding anchor tag */
        a[href*="elfsight.com/google-reviews-widget"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
      
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Real Reviews from <span className="bg-gradient-to-r from-coral to-peach bg-clip-text text-transparent">Google</span>
      </h3>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
          <Loader2 className="w-10 h-10 text-coral animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading reviews...</p>
        </div>
      )}
      
      <div 
        className={`elfsight-app-59388eeb-9aad-472b-af34-525288275e26 ${isLoading ? 'opacity-0 h-0 transition-opacity' : 'opacity-100 transition-opacity duration-500'}`} 
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default GoogleReviews;
