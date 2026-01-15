import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, BookOpen, Palette, Music } from 'lucide-react';
import creativeArtsImage from '@/assets/creative-arts.png';
import earlyLiteracyImage from '@/assets/early-literacy.png';
import musicMovementImage from '@/assets/music-movement.png';
import motorSkillsImage from '@/assets/motor-skills.png';

const Programs = () => {
  const programs = [
    {
      name: "Pre-nursery",
      age: "2-3 years",
      duration: "3 hours 30 minutes",
      students: "12-15 kids",
      color: "from-baby-blue to-mint-green",
      icon: "🧸",
      features: [
        "Sensory play activities",
        "Social interaction skills", 
        "Basic motor development",
        "Story time & songs",
        "Art & craft activities"
      ]
    },
    {
      name: "Nursery",
      age: "3-4 years",
      duration: "3 hours 30 minutes",
      students: "12-15 kids",
      color: "from-peach to-sunshine-yellow",
      icon: "🌱",
      features: [
        "Pre-literacy skills",
        "Number recognition",
        "Creative expression",
        "Group activities",
        "Outdoor play time"
      ]
    },
    {
      name: "LKG", 
      age: "4-6 years",
      duration: "3 hours 30 minutes",
      students: "12-15 kids",
      color: "from-mint-green to-soft-purple",
      icon: "🎓",
      features: [
        "Reading & writing prep",
        "Mathematical concepts",
        "Science exploration",
        "Leadership skills",
        "School readiness"
      ]
    },
    {
      name: "UKG", 
      age: "4-6 years",
      duration: "3 hours 30 minutes",
      students: "12-15 kids",
      color: "from-mint-green to-soft-purple",
      icon: "🎓",
      features: [
        "Reading & writing prep",
        "Mathematical concepts",
        "Science exploration",
        "Leadership skills",
        "School readiness"
      ]
    }
  ];

  const learningAreas = [
    {
      icon: BookOpen,
      title: "Early Literacy",
      description: "Building foundation for reading and writing through phonics and storytelling",
      image: earlyLiteracyImage
    },
    {
      icon: Palette,
      title: "Creative Arts",
      description: "Encouraging self-expression through painting, drawing, and craft activities",
      image: creativeArtsImage
    },
    {
      icon: Music,
      title: "Music & Movement",
      description: "Developing rhythm, coordination, and musical appreciation",
      image: musicMovementImage
    },
    {
      icon: Star,
      title: "Motor Skills",
      description: "Enhancing fine and gross motor development through structured play",
      image: motorSkillsImage
    }
  ];

  return (
    <section id="programs" className="py-12 md:py-20 bg-gradient-to-br from-mint-green/10 to-baby-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            Our <span className="bg-gradient-to-r from-mint-green to-baby-blue bg-clip-text text-transparent">Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Age-appropriate programs designed to nurture your child's development at every stage
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-20">
          {programs.map((program, index) => (
            <Card key={index} className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
              <CardContent className="p-4 md:p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{program.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{program.name}</h3>
                  <p className="text-lg text-gray-600 font-semibold">{program.age}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Duration</span>
                    </div>
                    <span className="font-semibold text-gray-800">{program.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Class Size</span>
                    </div>
                    <span className="font-semibold text-gray-800">{program.students}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">What Your Child Will Learn:</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-sunshine-yellow fill-current" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Areas */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Key Learning Areas
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningAreas.map((area, index) => (
              <div key={index} className="text-center">
                {area.image ? (
                  <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <img src={area.image} alt={area.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-peach to-sunshine-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <area.icon className="w-8 h-8 text-white" />
                  </div>
                )}
                <h4 className="text-xl font-bold text-gray-800 mb-3">{area.title}</h4>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-baby-blue/20 to-mint-green/20 rounded-2xl p-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                Montessori-Style & Activity-Based Learning
              </h4>
              <p className="text-gray-700 max-w-4xl mx-auto">
                Our curriculum combines the proven Montessori method with modern activity-based learning techniques. 
                Children learn through hands-on experiences, self-directed activities, and collaborative play, 
                fostering independence, creativity, and a lifelong love for learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
