import React from 'react';
import Staff from '../components/Staff';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const StaffPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Teaching Staff - Little Wings Play School</title>
        <meta
          name="description"
          content="Meet our qualified and experienced teachers at Little Wings Play School in Sector 10A, Gurgaon. Dedicated educators with certifications in early childhood development."
        />
        <meta
          name="keywords"
          content="teachers, staff, qualified educators, early childhood teachers, Montessori teachers, Gurgaon play school staff"
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-baby-blue/20 via-white to-mint-green/20">
        <Navigation />
        <div className="pt-20">
          <Staff />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default StaffPage;