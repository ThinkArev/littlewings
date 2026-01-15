import React from 'react';
import Admissions from '../components/Admissions';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AdmissionsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-baby-blue/20 via-white to-mint-green/20">
      <Navigation />
      <div className="pt-20">
        <Admissions />
      </div>
      <Footer />
    </div>
  );
};

export default AdmissionsPage;