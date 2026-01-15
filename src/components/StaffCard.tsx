import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Award, Heart } from 'lucide-react';

interface StaffMember {
  name: string;
  role: string;
  qualification: string;
  experience: string;
  photo: string;
  specialties: string[];
  description: string;
  gradient: string;
}

interface StaffCardProps {
  staff: StaffMember;
}

const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  return (
    <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${staff.gradient}`}></div>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${staff.gradient} rounded-full flex items-center justify-center shadow-lg`}>
            <span className="text-4xl">{staff.photo}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{staff.name}</h3>
          <p className="text-lg text-baby-blue font-semibold mb-2">{staff.role}</p>
          <div className="flex items-center justify-center space-x-1 mb-3">
            <Award className="w-4 h-4 text-sunshine-yellow" />
            <span className="text-sm text-gray-600">{staff.qualification}</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <Star className="w-4 h-4 text-mint-green" />
            <span className="text-sm text-gray-600">{staff.experience}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 leading-relaxed">{staff.description}</p>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="w-4 h-4 text-coral" />
            <span className="text-sm font-semibold text-gray-800">Specialties:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {staff.specialties.map((specialty, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gradient-to-r from-baby-blue/20 to-mint-green/20 text-gray-700 border-0"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffCard;