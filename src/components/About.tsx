
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Target, Users, Award, Baby, Droplets, Wind } from 'lucide-react';
import directorImage from '@/assets/director.png';
import airConditionedImage from '@/assets/air-conditioned.png';
import hygienicSanitationImage from '@/assets/hygienic-sanitation.png';
import filteredWaterImage from '@/assets/filtered-water.png';
import smallClassImage from '@/assets/small-class.png';
import qualifiedTeachersImage from '@/assets/qualified-teachers.png';
import safeEnvironmentImage from '@/assets/safe-environment.png';
import daycareImage from '@/assets/daycare.png';

const About = () => {
  return (
    <section id="about" className="pb-4 pt-12 md:py-20 bg-gradient-to-br from-white to-baby-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            About <span className="bg-gradient-to-r from-baby-blue to-mint-green bg-clip-text text-transparent">Little Wings</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe every child is unique and deserves a nurturing environment to spread their wings and soar to new heights.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
          <Card className="bg-gradient-to-br from-baby-blue/20 to-mint-green/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-4 md:p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-baby-blue to-mint-green rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To provide a safe, nurturing, and stimulating environment where children can explore, learn, and develop their full potential through play-based learning and individualized attention.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-peach/20 to-sunshine-yellow/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-4 md:p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-peach to-sunshine-yellow rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be the premier early childhood education center where every child feels loved, valued, and inspired to become confident, creative, and compassionate individuals.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Director's Message */}
        <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 lg:p-12 mb-8 md:mb-16">
          <div className="grid lg:grid-cols-3 gap-4 md:gap-8 items-center">
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-mint-green to-baby-blue rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  {/* <span className="text-6xl">👩‍🏫</span> */}
                  <img src={directorImage} alt="Mr. Joginder Mittal - School Director" className="w-full h-full object-fill" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg">
                  <p className="text-gray-800 font-semibold" style={{ whiteSpace: 'nowrap' }}>Mr. Joginder Mittal</p>
                  <p className="text-sm text-gray-600 text-center">Director</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {/* <h3 className="text-3xl font-bold text-gray-800 mb-6">Message from the Director</h3> */}
              <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  "At Happy Kids, we believe that every child deserves a joyful, nurturing, and meaningful start to their educational journey. Our director envisions a space where learning is inspired by curiosity, not pressure; guided by care, not just curriculum."
                </p>
                <p>
                  "With a strong commitment to quality early childhood education, we aim to build confidence, creativity, and compassion in every little one we welcome into our family. We do not merely rely on years of experience, but a forward-thinking approach that values progress, play, and purpose."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities Highlight */}
        <div className="bg-gradient-to-r from-sunshine-yellow/20 to-mint-green/20 rounded-3xl p-4 md:p-8 lg:p-12 mb-8 md:mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-4 md:mb-8">Our Premium Facilities</h3>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Wind,
                title: "Fully Air-Conditioned Classrooms",
                description: "Comfortable learning environment throughout the year",
                image: airConditionedImage
              },
              {
                icon: Heart,
                title: "Hygienic Sanitation Facilities",
                description: "Child-safe and clean washrooms with proper maintenance",
                image: hygienicSanitationImage
              },
              {
                icon: Droplets,
                title: "Safe, Filtered Drinking Water",
                description: "Pure and healthy water systems for all children",
                image: filteredWaterImage
              },
              {
              icon: Users,
              title: "Small Class Sizes",
              description: "12 to 15 children per class for personalized attention",
              color: "from-baby-blue to-mint-green",
              image: smallClassImage
            },
            {
              icon: Award,
              title: "Qualified Teachers",
              description: "Certified early childhood educators with years of experience",
              color: "from-peach to-sunshine-yellow",
              image: qualifiedTeachersImage
            },
            {
              icon: Heart,
              title: "Safe Environment",
              description: "CCTV monitoring, secure premises, and child-proofed facilities",
              color: "from-mint-green to-soft-purple",
              image: safeEnvironmentImage
            },
            {
              icon: Baby,
              title: "Day-care Facility Available",
              description: "Safe, engaging, and caring environment for working parents",
              color: "from-sunshine-yellow to-coral",
              image: daycareImage
            }
            ].map((facility, index) => (
              <div key={index} className="bg-white/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-full h-48 overflow-hidden">
                  <img src={facility.image} alt={facility.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{facility.title}</h4>
                  <p className="text-gray-600 text-sm">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Users,
              title: "Small Class Sizes",
              description: "12 to 15 children per class for personalized attention",
              color: "from-baby-blue to-mint-green"
            },
            {
              icon: Award,
              title: "Qualified Teachers",
              description: "Certified early childhood educators with years of experience",
              color: "from-peach to-sunshine-yellow"
            },
            {
              icon: Heart,
              title: "Safe Environment",
              description: "CCTV monitoring, secure premises, and child-proofed facilities",
              color: "from-mint-green to-soft-purple"
            },
            {
              icon: Baby,
              title: "Day-care Facility Available",
              description: "Safe, engaging, and caring environment for working parents",
              color: "from-sunshine-yellow to-coral"
            }
          ].map((feature, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default About;
