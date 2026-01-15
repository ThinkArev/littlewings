import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GoogleReviews from "@/components/GoogleReviews";
import {
  validateEmail,
  validateIndianMobile,
  validateTextarea,
  validateName,
  sanitizeInput,
} from "@/lib/formValidation";

const Contact = () => {
  const { toast } = useToast();
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    // Validate name
    if (!validateName(inquiryForm.name)) {
      newErrors.name = "Please enter a valid name (letters only, at least 2 characters)";
    }

    // Validate email
    if (!validateEmail(inquiryForm.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate phone
    if (!validateIndianMobile(inquiryForm.phone)) {
      newErrors.phone = "Please enter a valid Indian mobile number (10 digits, starting with 6-9)";
    }

    // Validate message
    const messageValidation = validateTextarea(inquiryForm.message);
    if (!messageValidation.isValid) {
      newErrors.message = messageValidation.message;
    }

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== "")) {
      setErrors(newErrors);
      return;
    }

    // Sanitize all inputs before submission
    const sanitizedData = {
      name: sanitizeInput(inquiryForm.name),
      email: sanitizeInput(inquiryForm.email),
      phone: sanitizeInput(inquiryForm.phone),
      subject: sanitizeInput(inquiryForm.subject),
      message: sanitizeInput(inquiryForm.message),
    };

    // Submit to FormSubmit.co
    const form = e.target as HTMLFormElement;
    form.action = "https://formsubmit.co/littlewingsplayschool25@gmail.com";
    form.method = "POST";
    
    // Form will submit naturally after validation
    toast({
      title: "Sending...",
      description: "Your inquiry is being submitted.",
    });
  };

  const handleInputChange = (field: keyof typeof inquiryForm, value: string) => {
    setInquiryForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <section
      id="contact"
      className="py-12 md:py-20 bg-gradient-to-br from-mint-green/10 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            Get In{" "}
            <span className="bg-gradient-to-r from-mint-green to-baby-blue bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you! Reach out with any questions or to
            schedule a visit to our school.
          </p>
        </div>

        {/* Google Reviews - Trust Signal Before Contact Form */}
        <GoogleReviews />

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-12 mt-8">
          {/* Contact Information */}
          {/* Google Reviews Embed */}
          <div className="space-y-4 md:space-y-8 rounded-lg bg-card text-card-foreground bg-gradient-to-br from-baby-blue/20 to-mint-green/20 border-0 shadow-lg">
            <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Visit us</h4>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              {/* Google Reviews Embed - Shows real reviews */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.049158565252!2d77.00260917514812!3d28.447934475766083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1764747e01ad%3A0xa97e6345456375a7!2sLittle%20Wings%20Play%20School%20Gurgaon!5e0!3m2!1sen!2sin!4v1768473400000!5m2!1sen!2sin"
                className="w-full h-[400px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Little Wings Play School Reviews"
              />
              
              {/* View All Reviews Button */}
              <div className="p-4 bg-gradient-to-r from-baby-blue/10 to-mint-green/10">
                <a 
                  href="https://www.google.com/maps/place/Little+Wings+Play+School+Gurgaon/@28.4479345,77.0026092,17z/data=!4m8!3m7!1s0x390d1764747e01ad:0xa97e6345456375a7!8m2!3d28.4479345!4d77.0051841!9m1!1b1!16s%2Fg%2F11vkd0y8kn?entry=ttu&g_ep=EgoyMDI1MDExNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-baby-blue to-mint-green text-white hover:from-mint-green hover:to-baby-blue"
                  >
                    View All Reviews on Google
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-4 md:space-y-8">
            <Card className="bg-gradient-to-br from-baby-blue/20 to-mint-green/20 border-0 shadow-lg">
              <CardContent className="p-4 md:p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-baby-blue to-mint-green rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Our Location
                      </h4>
                      <p className="text-gray-700">
                        H.No. 1260, Opposite Housing Board Colony,
                        <br />
                        Sector 10A, Gurgaon, Haryana 122001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-peach to-sunshine-yellow rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Phone Numbers
                      </h4>
                      <p className="text-gray-700">
                        Main: +91 9599716401
                        <br />
                        Office: +91 9599716401
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-mint-green to-soft-purple rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Email Addresses
                      </h4>
                      <p className="text-gray-700">
                        littlewingsplayschool25@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sunshine-yellow to-coral rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        School Hours
                      </h4>
                      <p className="text-gray-700">
                        Monday - Friday: 9:00 AM - 2:00 PM
                        <br />
                        Office Hours: 8:30 AM - 3:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps Placeholder */}

          </div>
        </div>
          {/* Inquiry Form */}
          <div>
            <Card className="bg-white border-0 shadow-xl">
              <CardContent className="p-4 md:p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-coral to-peach rounded-full flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Send Us a Message
                  </h3>
                </div>

                <form 
                  action="https://formsubmit.co/littlewingsplayschool25@gmail.com" 
                  method="POST"
                  onSubmit={handleInquirySubmit} 
                  className="space-y-4 md:space-y-6"
                >
                  {/* FormSubmit.co Configuration */}
                  <input type="hidden" name="_captcha" value="true" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value="New Contact Inquiry - Little Wings Play School" />
                  <input type="hidden" name="_next" value={`${window.location.origin}/contact?submitted=true`} />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inquiry-name">Your Name *</Label>
                      <Input
                        id="inquiry-name"
                        value={inquiryForm.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                        className={`mt-2 ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="inquiry-phone">Phone Number *</Label>
                      <Input
                        id="inquiry-phone"
                        type="tel"
                        value={inquiryForm.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                        className={`mt-2 ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="Enter 10-digit mobile number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="inquiry-email">Email Address *</Label>
                    <Input
                      id="inquiry-email"
                      type="email"
                      value={inquiryForm.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                      className={`mt-2 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="inquiry-subject">Subject</Label>
                    <Input
                      id="inquiry-subject"
                      value={inquiryForm.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      className="mt-2"
                      placeholder="What is your inquiry about?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="inquiry-message">Message *</Label>
                    <Textarea
                      id="inquiry-message"
                      value={inquiryForm.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      required
                      className={`mt-2 ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Tell us more about your inquiry... (Min 10 characters, Max 1000)"
                      rows={5}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-mint-green to-baby-blue text-white hover:from-baby-blue hover:to-mint-green text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-4 md:mt-8 grid grid-cols-2 gap-4">
              <a href="tel:+919599716401">
                <Button className="w-full bg-gradient-to-r from-peach to-sunshine-yellow text-gray-800 hover:from-sunshine-yellow hover:to-peach py-6">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </a>
              <a href="mailto:littlewingsplayschool25@gmail.com">
                <Button
                  variant="outline"
                  className="w-full border-2 border-baby-blue text-baby-blue hover:bg-baby-blue hover:text-white py-6"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </Button>
              </a>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Contact;
