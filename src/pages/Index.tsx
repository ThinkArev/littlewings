
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Programs from '../components/Programs';
import Gallery from '../components/Gallery';
import Admissions from '../components/Admissions';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-baby-blue/20 via-white to-mint-green/20 pb-24 lg:pb-0 overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Programs />
      <Gallery limit={3} />
      {/* <Testimonials /> */}
      {/* <Admissions /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
