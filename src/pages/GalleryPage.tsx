import React from 'react';
import Gallery from '../components/Gallery';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-baby-blue/20 via-white to-mint-green/20 pb-24 lg:pb-0 overflow-x-hidden">
      <Navigation />
      <div className="pt-20">
        <Gallery />
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;