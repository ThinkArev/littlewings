import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed right-6 bottom-24 lg:bottom-8 z-[90] transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <Button
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full bg-baby-blue hover:bg-bright-blue text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 p-0 flex items-center justify-center border-2 border-white"
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 stroke-[3px]" />
      </Button>
    </div>
  );
};

export default BackToTop;
