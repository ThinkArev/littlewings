import React, { useState, useEffect } from "react";
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
  Loader2,
  MapPin,
  ExternalLink,
  Instagram,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GoogleReviews from "@/components/GoogleReviews";
import { Helmet } from 'react-helmet-async';
import {
  validateEmail,
  validateIndianMobile,
  validateTextarea,
  validateName,
  sanitizeInput,
} from "@/lib/formValidation";

const JoinUsPage = () => {
  const { toast } = useToast();
  
  // Admissions States (Matching Admissions.tsx Exactly)
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(false);

  // Admissions Handler (Matching Admissions.tsx Exactly)
  const handleSubmit = async (e: React.FormEvent) => {
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

    // Robot check
    if (!isRobotChecked) {
      toast({
        title: "Captcha Required",
        description: "Please confirm you are not a robot.",
        variant: "destructive",
      });
      return;
    }

    // Submit via AJAX
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("childName", sanitizeInput(formData.childName));
      formDataToSend.append("parentName", sanitizeInput(formData.parentName));
      formDataToSend.append("email", sanitizeInput(formData.email));
      formDataToSend.append("phone", sanitizeInput(formData.phone));
      formDataToSend.append("childAge", sanitizeInput(formData.childAge));
      formDataToSend.append("program", formData.program);
      formDataToSend.append("message", sanitizeInput(formData.message));
      formDataToSend.append("_subject", "New Admission Application - Little Wings Play School");
      formDataToSend.append("_template", "table");
      formDataToSend.append("_captcha", "false");

      const response = await fetch("https://formsubmit.co/ajax/littlewingsplayschool25@gmail.com", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          childName: "",
          parentName: "",
          email: "",
          phone: "",
          childAge: "",
          program: "",
          message: "",
        });
        setIsRobotChecked(false);
        setErrors({
          childName: "",
          parentName: "",
          email: "",
          phone: "",
          message: "",
        });
        toast({
          title: "Application Submitted!",
          description: "We'll be in touch with you shortly.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-baby-blue/20 via-white to-mint-green/20 pb-24 lg:pb-0 overflow-x-hidden">
      <Helmet>
        <title>Join Us - Little Wings Play School | Admissions & Contact</title>
        <meta name="description" content="Enroll your child at Little Wings Play School. Fill out our admission form for the upcoming academic session." />
      </Helmet>
      
      <Navigation />
      
      <div className="pt-20">
        {/* 1. Admissions Info Section */}
        <section id="admissions" className="py-4 md:py-8 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                <span className="bg-gradient-to-r from-sunshine-yellow to-coral bg-clip-text text-transparent">
                  Admissions
                </span>{" "}
                Open
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Give your child the best start in their educational journey. Apply for the upcoming academic session!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {admissionInfo.map((info, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-6 md:p-8 text-center">
                    <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm`}>
                      <info.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{info.title}</h3>
                    <ul className="space-y-1.5">
                      {info.details.map((detail, idx) => (
                        <li key={idx} className="text-gray-600 text-sm">{detail}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Admissions Form Section - Matching Admissions.tsx Exactly */}
        <section id="applyNow" className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-baby-blue to-mint-green rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800" >
                    Apply Now - It's Free!
                  </h3>
                </div>

                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="childName">Child's Name *</Label>
                      <Input
                        id="childName"
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                      disabled={isSubmitting}
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

                  {/* Anti-DDoS Capacitor Checkbox */}
                  <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <input 
                      type="checkbox" 
                      id="robot-check" 
                      checked={isRobotChecked}
                      onChange={(e) => setIsRobotChecked(e.target.checked)}
                      disabled={isSubmitting}
                      className="w-5 h-5 text-coral border-gray-300 rounded focus:ring-coral cursor-pointer"
                    />
                    <Label htmlFor="robot-check" className="cursor-pointer font-medium text-gray-700">
                      I am not a robot
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-coral to-peach text-white hover:from-peach hover:to-coral text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 3. Contact & Map Section */}
        <section id="contact" className="py-8 bg-gradient-to-br from-baby-blue/5 via-mint-green/5 to-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GoogleReviews />

            <div className="text-center mt-12 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Visit <span className="text-baby-blue">Our Campus</span></h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">We'd love to show you around! Visit us or reach out via phone/email for any questions.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Desktop/Tablet Map View */}
              <div className="bg-white p-3 rounded-3xl shadow-xl border border-gray-100/50">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.049158565252!2d77.00260917514812!3d28.447934475766083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1764747e01ad%3A0xa97e6345456375a7!2sLittle%20Wings%20Play%20School%20Gurgaon!5e0!3m2!1sen!2sin!4v1768473400000!5m2!1sen!2sin"
                  className="w-full h-[350px] md:h-[450px] rounded-2xl border-0 overflow-hidden"
                  loading="lazy"
                  title="Little Wings Play School Location"
                />
                <div className="p-4 pt-6 text-center">
                  <a href="https://www.google.com/maps/place/Little+Wings+Play+School+Gurgaon/@28.4479345,77.0026092,17z/data=!4m8!3m7!1s0x390d1764747e01ad:0xa97e6345456375a7!8m2!3d28.4479345!4d77.0051841!9m1!1b1" target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button className="w-full bg-baby-blue text-white hover:bg-baby-blue/90 h-12 rounded-xl text-md font-semibold px-8">
                        View Reviews on Google Maps <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Contact Information */}
              <div className="h-full flex flex-col">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-3xl overflow-hidden flex-grow">
                  <CardContent className="p-8 md:p-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-10">Contact Information</h3>
                    <div className="space-y-10">
                      <div className="flex items-start gap-6 group">
                        <div className="w-14 h-14 bg-baby-blue/10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"><MapPin className="w-7 h-7 text-baby-blue" /></div>
                        <div className="pt-1">
                          <h4 className="text-xl font-bold text-gray-800 mb-1">Visit Us</h4>
                          <p className="text-gray-600 leading-relaxed">H.No. 1260, Opp. Housing Board Colony, Sector 10A, Gurgaon, HR 122001</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-6 group">
                        <div className="w-14 h-14 bg-mint-green/10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"><Phone className="w-7 h-7 text-mint-green" /></div>
                        <div className="pt-1">
                          <h4 className="text-xl font-bold text-gray-800 mb-1">Call Us</h4>
                          <p className="text-gray-600 font-semibold text-lg">+91 9599716401</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-6 group">
                        <div className="w-14 h-14 bg-peach/10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"><Mail className="w-7 h-7 text-peach" /></div>
                        <div className="pt-1 overflow-hidden">
                          <h4 className="text-xl font-bold text-gray-800 mb-1">Email Us</h4>
                          <p className="text-gray-600 truncate font-medium">littlewingsplayschool25@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md p-8 md:p-12">
          <DialogClose className="absolute right-6 top-6 rounded-full p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground bg-gray-100 hover:bg-gray-200">
            <X className="h-5 w-5 text-gray-600" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <DialogHeader className="space-y-4">
            <div className="text-center text-5xl mb-2">🎉</div>
            <DialogTitle className="text-3xl font-bold text-center text-gray-800">Application Received!</DialogTitle>
            <DialogDescription className="text-center text-lg text-gray-600">Your admission application has been submitted successfully. Our team will contact you shortly.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pt-8">
            <Link to="/gallery" onClick={() => setShowSuccess(false)}>
              <Button className="w-full bg-baby-blue text-white h-14 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl transition-all">
                📸 Explore Our Gallery
              </Button>
            </Link>
            
            <a 
              href="https://www.instagram.com/littlewingsplayschooll/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="outline" className="w-full border-2 border-pink-500 text-pink-600 hover:bg-pink-50 h-14 rounded-2xl text-lg font-bold shadow-sm transition-all">
                <Instagram className="mr-2 h-6 w-6" /> Follow us on Instagram
              </Button>
            </a>

            <p className="text-center text-gray-400 text-sm italic mt-2">See our latest activities & updates online!</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JoinUsPage;
