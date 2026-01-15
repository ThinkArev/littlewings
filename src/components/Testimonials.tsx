
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import GoogleReviews from '@/components/GoogleReviews';

const Testimonials = () => {


  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-baby-blue/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            Happy <span className="bg-gradient-to-r from-coral to-peach bg-clip-text text-transparent">Parents</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear what parents have to say about their children's journey at Little Wings Play School
          </p>
        </div>


        {/* Parent Review Section */}
        <div className="bg-gradient-to-r from-mint-green/20 to-baby-blue/20 rounded-3xl p-4 md:p-8 lg:p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 md:mb-6">
            Join Our Happy Family
          </h3>
          <p className="text-lg text-gray-700 mb-4 md:mb-8 max-w-2xl mx-auto">
            We'd love to hear about your child's experience at Little Wings. Your feedback helps us continue providing the best care and education for all our little ones.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6">
            <div className="bg-white/50 rounded-2xl p-4 md:p-6">
              <div className="text-3xl mb-3">⭐</div>
              <h4 className="font-bold text-gray-800 mb-2">4.9/5 Rating</h4>
              <p className="text-sm text-gray-600">Based on 150+ reviews</p>
            </div>
            <div className="bg-white/50 rounded-2xl p-4 md:p-6">
              <div className="text-3xl mb-3">❤️</div>
              <h4 className="font-bold text-gray-800 mb-2">50+ Happy Kids</h4>
              <p className="text-sm text-gray-600">Growing every year</p>
            </div>
            <div className="bg-white/50 rounded-2xl p-4 md:p-6">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="font-bold text-gray-800 mb-2">5+ Years Experience</h4>
              <p className="text-sm text-gray-600">Trusted by families</p>
            </div>
          </div>
        </div>

        {/* <GoogleReviews /> */}

      </div>
    </section>
  );
};

export default Testimonials;
