import React from 'react';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-baby-blue/20 via-white to-mint-green/20 pb-24 lg:pb-0 overflow-x-hidden">
      <Navigation />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;