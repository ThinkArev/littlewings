import React from 'react';
import StaffCard from './StaffCard';
import { Users, Heart, Award, Smile } from 'lucide-react';

const Staff = () => {
  const staffMembers = [
    {
      name: "Mrs. Priya Sharma",
      role: "Director & Principal",
      qualification: "M.Ed in Early Childhood",
      experience: "8+ years experience",
      photo: "👩‍🏫",
      specialties: ["Child Psychology", "Curriculum Development", "Parent Counseling"],
      description: "Leading Little Wings with passion and dedication, Mrs. Sharma ensures every child receives personalized attention and quality education.",
      gradient: "from-baby-blue to-mint-green"
    },
    {
      name: "Ms. Anjali Verma",
      role: "Lead Teacher - Playgroup",
      qualification: "B.Ed with Montessori Certification",
      experience: "5+ years experience",
      photo: "👩‍🎓",
      specialties: ["Sensory Play", "Motor Skills", "Creative Arts"],
      description: "Specializing in toddler development, Ms. Verma creates engaging activities that promote learning through play and exploration.",
      gradient: "from-peach to-sunshine-yellow"
    },
    {
      name: "Ms. Kavya Singh",
      role: "Nursery Teacher",
      qualification: "B.A in Child Development",
      experience: "4+ years experience",
      photo: "👩‍🏫",
      specialties: ["Pre-literacy", "Social Skills", "Music & Movement"],
      description: "Ms. Singh brings creativity and enthusiasm to every lesson, helping children develop confidence and independence.",
      gradient: "from-mint-green to-soft-purple"
    },
    {
      name: "Ms. Deepika Gupta",
      role: "Kindergarten Teacher",
      qualification: "M.A in Elementary Education",
      experience: "6+ years experience",
      photo: "👩‍💼",
      specialties: ["School Readiness", "STEM Activities", "Leadership Skills"],
      description: "Preparing children for their next educational journey, Ms. Gupta focuses on building strong foundations in academics and life skills.",
      gradient: "from-sunshine-yellow to-coral"
    },
    {
      name: "Ms. Ritu Pandey",
      role: "Activity Coordinator",
      qualification: "B.F.A with Teaching Diploma",
      experience: "3+ years experience",
      photo: "🎨",
      specialties: ["Arts & Crafts", "Drama & Theater", "Creative Expression"],
      description: "Fostering creativity and imagination, Ms. Pandey designs innovative activities that bring out the artist in every child.",
      gradient: "from-soft-purple to-cheerful-pink"
    },
    {
      name: "Ms. Neha Joshi",
      role: "Physical Education Teacher",
      qualification: "B.P.Ed in Sports & Recreation",
      experience: "4+ years experience",
      photo: "🏃‍♀️",
      specialties: ["Motor Development", "Sports & Games", "Health & Wellness"],
      description: "Promoting physical fitness and healthy habits, Ms. Joshi ensures children develop strong bodies and team spirit.",
      gradient: "from-playful-orange to-forest-green"
    }
  ];

  const staffStats = [
    {
      icon: Users,
      number: "6+",
      label: "Qualified Teachers",
      color: "from-baby-blue to-mint-green"
    },
    {
      icon: Award,
      number: "30+",
      label: "Years Combined Experience",
      color: "from-peach to-sunshine-yellow"
    },
    {
      icon: Heart,
      number: "100%",
      label: "Certified Professionals",
      color: "from-mint-green to-soft-purple"
    },
    {
      icon: Smile,
      number: "24/7",
      label: "Care & Support",
      color: "from-sunshine-yellow to-coral"
    }
  ];

  return (
    <section id="staff" className="py-20 bg-gradient-to-br from-baby-blue/10 via-white to-mint-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="bg-gradient-to-r from-baby-blue to-mint-green bg-clip-text text-transparent">Amazing Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated and qualified educators who are passionate about nurturing young minds and hearts
          </p>
        </div>

        {/* Staff Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {staffStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Staff Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {staffMembers.map((staff, index) => (
            <StaffCard key={index} staff={staff} />
          ))}
        </div>

        {/* Commitment Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Commitment to Excellence</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-baby-blue to-mint-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Continuous Training</h4>
                <p className="text-gray-600">Regular workshops and skill development programs to stay updated with latest teaching methods</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-peach to-sunshine-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Child-Centric Approach</h4>
                <p className="text-gray-600">Every decision and activity is designed with the child's best interests and development in mind</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-mint-green to-soft-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smile className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Caring Environment</h4>
                <p className="text-gray-600">Creating a warm, safe, and loving atmosphere where every child feels valued and supported</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Staff;