import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  Clock,
  FileText,
  Users,
  Phone,
  Mail,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  validateEmail,
  validateIndianMobile,
  validateTextarea,
  validateName,
  sanitizeInput,
} from "@/lib/formValidation";

const Admissions = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    childName: "",
    parentName: "",
    email: "",
    phone: "",
    childAge: "",
    program: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    childName: "",
    parentName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {
      childName: "",
      parentName: "",
      email: "",
      phone: "",
      message: "",
    };

    // Validate child name
    if (!validateName(formData.childName)) {
      newErrors.childName = "Please enter a valid child name (letters only)";
    }

    // Validate parent name
    if (!validateName(formData.parentName)) {
      newErrors.parentName = "Please enter a valid parent name (letters only)";
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate phone
    if (!validateIndianMobile(formData.phone)) {
      newErrors.phone = "Please enter a valid Indian mobile number (10 digits, starting with 6-9)";
    }

    // Validate message if provided
    if (formData.message && formData.message.trim().length > 0) {
      const messageValidation = validateTextarea(formData.message);
      if (!messageValidation.isValid) {
        newErrors.message = messageValidation.message;
      }
    }

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== "")) {
      setErrors(newErrors);
      return;
    }

    // Sanitize all inputs
    const sanitizedData = {
      childName: sanitizeInput(formData.childName),
      parentName: sanitizeInput(formData.parentName),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      childAge: sanitizeInput(formData.childAge),
      program: formData.program,
      message: sanitizeInput(formData.message),
    };

    // Submit to FormSubmit.co
    const form = e.target as HTMLFormElement;
    form.action = "https://formsubmit.co/littlewingsplayschool25@gmail.com";
    form.method = "POST";
    
    // Form will submit naturally after validation
    toast({
      title: "Submitting...",
      description: "Your admission application is being submitted.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing  
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const admissionInfo = [
    {
      icon: CalendarDays,
      title: "Age Criteria",
      details: [
        "Pre-nursery: 2-3 years",
        "Nursery: 3-4 years",
        "LKG: 4-6 years",
        "UKG: 5-6 years",
      ],
      color: "from-baby-blue to-mint-green",
    },
    {
      icon: Clock,
      title: "School Timings",
      details: [
        "Morning: 9:00 AM - 12:00 PM",
        "Extended: 9:00 AM - 2:00 PM",
        "Monday to Friday",
      ],
      color: "from-peach to-sunshine-yellow",
    },
    {
      icon: FileText,
      title: "Required Documents",
      details: [
        "Birth certificate",
        "Passport size photos",
        "Medical records",
        "Previous school records (if any)",
      ],
      color: "from-mint-green to-soft-purple",
    },
  ];

  return (
    <section
      id="admissions"
      className="py-20 bg-gradient-to-br from-sunshine-yellow/10 to-mint-green/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-sunshine-yellow to-coral bg-clip-text text-transparent">
              Admissions
            </span>{" "}
            Open
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Give your child the best start in their educational journey. Apply
            now for the upcoming academic session!
          </p>
        </div>

        {/* Admission Information */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {admissionInfo.map((info, index) => (
            <Card
              key={index}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {info.title}
                </h3>
                <ul className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-600">
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admission Form */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Card className="bg-white border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-baby-blue to-mint-green rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Apply Now - It's Free!
                  </h3>
                </div>

                <form 
                  action="https://formsubmit.co/littlewingsplayschool25@gmail.com" 
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  {/* FormSubmit.co Configuration */}
                  <input type="hidden" name="_captcha" value="true" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value="New Admission Application - Little Wings Play School" />
                  <input type="hidden" name="_next" value={`${window.location.origin}/admissions?submitted=true`} />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="childName">Child's Name *</Label>
                      <Input
                        id="childName"
                        value={formData.childName}
                        onChange={(e) =>
                          handleChange("childName", e.target.value)
                        }
                        required
                        className={`mt-2 ${errors.childName ? 'border-red-500' : ''}`}
                        placeholder="Enter child's full name"
                      />
                      {errors.childName && (
                        <p className="text-red-500 text-sm mt-1">{errors.childName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="parentName">Parent's Name *</Label>
                      <Input
                        id="parentName"
                        value={formData.parentName}
                        onChange={(e) =>
                          handleChange("parentName", e.target.value)
                        }
                        required
                        className={`mt-2 ${errors.parentName ? 'border-red-500' : ''}`}
                        placeholder="Enter parent's name"
                      />
                      {errors.parentName && (
                        <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        className={`mt-2 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                        className={`mt-2 ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="Enter 10-digit mobile number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="childAge">Child's Age</Label>
                      <Input
                        id="childAge"
                        value={formData.childAge}
                        onChange={(e) =>
                          handleChange("childAge", e.target.value)
                        }
                        className="mt-2"
                        placeholder="e.g., 3 years 6 months"
                      />
                    </div>
                    <div>
                      <Label htmlFor="program">Preferred Program</Label>
                      <Select
                        onValueChange={(value) =>
                          handleChange("program", value)
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-nursery">
                            Pre-nursery (2-3 years)
                          </SelectItem>
                          <SelectItem value="nursery">
                            Nursery (3-4 years)
                          </SelectItem>
                          <SelectItem value="lkg">
                            LKG (4-6 years)
                          </SelectItem>
                          <SelectItem value="ukg">
                            UKG (5-6 years)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={`mt-2 ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Any specific questions or requirements? (Min 10 characters if provided)"
                      rows={4}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-coral to-peach text-white hover:from-peach hover:to-coral text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Quick Contact */}
            <Card className="bg-gradient-to-br from-baby-blue/20 to-mint-green/20 border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <a href="tel:+919599716401" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-gradient-to-br from-baby-blue to-mint-green rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Call Us</p>
                      <p className="text-gray-600">+91 9599716401</p>
                    </div>
                  </a>
                  <a href="mailto:littlewingsplayschool25@gmail.com" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-gradient-to-br from-peach to-sunshine-yellow rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email Us</p>
                      <p className="text-gray-600">
                        littlewingsplayschool25@gmail.com
                      </p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-sunshine-yellow/20 to-coral/20 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Schedule a School Visit
                </h3>
                <p className="text-gray-700 mb-6">
                  Come see our beautiful facilities and meet our caring
                  teachers. We'd love to show you around!
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-sunshine-yellow to-coral text-white hover:opacity-90">
                    Schedule a Visit
                  </Button>
                  <a href="tel:+919599716401">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-baby-blue text-baby-blue hover:bg-baby-blue hover:text-white"
                    >
                      Call Us Today
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
