import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      const formData = new FormData();
      formData.append("name", sanitizeInput(inquiryForm.name));
      formData.append("email", sanitizeInput(inquiryForm.email));
      formData.append("phone", sanitizeInput(inquiryForm.phone));
      formData.append("subject", sanitizeInput(inquiryForm.subject));
      formData.append("message", sanitizeInput(inquiryForm.message));
      formData.append("_subject", "New Contact Inquiry - Little Wings Play School");
      formData.append("_template", "table");
      formData.append("_captcha", "false");

      const response = await fetch("https://formsubmit.co/ajax/littlewingsplayschool25@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setShowSuccess(true);
        setInquiryForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        toast({
          title: "Success!",
          description: "Your message has been sent. We'll get back to you soon.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      className="pb-12 pt-4 md:pt-4 md:pb-20 bg-gradient-to-br from-mint-green/10 to-white"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Google Reviews - Trust Signal Before Contact Form */}
        {/* Google Reviews Embed */}
        <GoogleReviews />

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
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-12 mt-8">
          {/* Contact Information */}
          <div className="">
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

                <form onSubmit={handleInquirySubmit} className="space-y-4 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inquiry-name">Your Name *</Label>
                      <Input
                        id="inquiry-name"
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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

                  {/* Anti-DDoS Capacitor Checkbox */}
                  <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <input 
                      type="checkbox" 
                      id="robot-check" 
                      checked={isRobotChecked}
                      onChange={(e) => setIsRobotChecked(e.target.checked)}
                      disabled={isSubmitting}
                      className="w-5 h-5 text-baby-blue border-gray-300 rounded focus:ring-baby-blue cursor-pointer"
                    />
                    <Label htmlFor="robot-check" className="cursor-pointer font-medium text-gray-700">
                      I am not a robot
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-mint-green to-baby-blue text-white hover:from-baby-blue hover:to-mint-green text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
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

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md p-8 md:p-12">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-3xl font-bold text-center text-gray-800">
              ✅ Success!
            </DialogTitle>
            <DialogDescription className="text-center text-xl text-gray-600 font-medium">
              Your inquiry has been submitted successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 pt-6">
            <p className="text-center text-gray-500 text-lg">
              We'll get back to you shortly. In the meantime, feel free to explore our school!
            </p>
            <div className="flex flex-col gap-4">
              <Link to="/gallery" onClick={() => setShowSuccess(false)}>
                <Button className="w-full bg-gradient-to-r from-baby-blue to-mint-green hover:from-mint-green hover:to-baby-blue text-white py-6 text-lg rounded-xl shadow-md transition-all">
                  📸 Explore Gallery
                </Button>
              </Link>
              <a 
                href="https://www.instagram.com/littlewingsplayschooll/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white py-6 text-lg rounded-xl shadow-md transition-all">
                  📱 Follow us on Instagram
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;
