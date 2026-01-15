import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Heart, Smile, Calendar, Clock, User, Phone, Mail, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import heroCreativeArts from "@/assets/hero-creative-arts.png";
import heroEarlyLearning from "@/assets/hero-early-learning.png";
import heroPhysicalPlay from "@/assets/hero-physical-play.png";
import heroMusicDance from "@/assets/hero-music-dance.png";

const Hero = () => {
  const [visitForm, setVisitForm] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const { toast } = useToast();

  const handleVisitFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Robot check
    if (!isRobotChecked) {
      toast({
        title: "Captcha Required",
        description: "Please confirm you are not a robot.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(visitForm).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("_subject", "New Visit Schedule Request - Little Wings");
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
        setIsDialogOpen(false);
        setVisitForm({
          parentName: '',
          childName: '',
          childAge: '',
          phone: '',
          email: '',
          preferredDate: '',
          preferredTime: '',
          message: ''
        });
        setIsRobotChecked(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to schedule visit. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An expected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVisitFormChange = (field: string, value: string) => {
    setVisitForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-baby-blue/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-peach/30 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-mint-green/30 rounded-full animate-float"></div>
        <div className="absolute top-60 left-1/3 w-8 h-8 bg-sunshine-yellow/30 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-60 right-1/3 w-14 h-14 bg-soft-purple/30 rounded-full animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4 md:mb-6">
              <Star className="w-6 h-6 text-sunshine-yellow fill-current" />
              <span className="text-baby-blue font-semibold">Welcome to</span>
              <Star className="w-6 h-6 text-sunshine-yellow fill-current" />
            </div>


            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-baby-blue to-mint-green bg-clip-text text-transparent">
                Little Wings
              </span>
              <br />
              <span className="text-gray-700">Play School</span>
            </h1>


            <p className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
              "Where Little Minds Take Big Flights"
            </p>


            <p className="text-lg text-gray-600 mb-4 md:mb-8 max-w-2xl mx-auto lg:mx-0">
              A nurturing environment where children aged 2-6 years discover,
              learn, and grow through play-based learning and Montessori methods.
            </p>

            <div className="flex flex-col md:flex-col lg:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/join#applyNow">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-playful-orange to-coral text-white hover:from-coral hover:to-playful-orange text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 button-playful"
                >
                  🎉 Admissions Open - Apply Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-bright-blue text-bright-blue hover:bg-bright-blue hover:text-white text-lg px-8 py-6 rounded-full transition-all duration-300 button-playful"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    📅 Schedule a Visit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] max-h-[65vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
                      <Calendar className="mr-3 w-6 h-6 text-baby-blue" />
                      Schedule Your Visit
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleVisitFormSubmit} className="space-y-4 mt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="parent-name">Parent/Guardian Name *</Label>
                        <Input
                          id="parent-name"
                          disabled={isSubmitting}
                          value={visitForm.parentName}
                          onChange={(e) => handleVisitFormChange('parentName', e.target.value)}
                          required
                          className="mt-1"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="child-name">Child's Name *</Label>
                        <Input
                          id="child-name"
                          disabled={isSubmitting}
                          value={visitForm.childName}
                          onChange={(e) => handleVisitFormChange('childName', e.target.value)}
                          required
                          className="mt-1"
                          placeholder="Child's name"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="child-age">Child's Age *</Label>
                        <Input
                          id="child-age"
                          disabled={isSubmitting}
                          value={visitForm.childAge}
                          onChange={(e) => handleVisitFormChange('childAge', e.target.value)}
                          required
                          className="mt-1"
                          placeholder="e.g., 3 years"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          disabled={isSubmitting}
                          value={visitForm.phone}
                          onChange={(e) => handleVisitFormChange('phone', e.target.value)}
                          required
                          className="mt-1"
                          placeholder="Your phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          disabled={isSubmitting}
                          value={visitForm.email}
                          onChange={(e) => handleVisitFormChange('email', e.target.value)}
                          className="mt-1"
                          placeholder="Your email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="preferred-date">Preferred Date *</Label>
                        <Input
                          id="preferred-date"
                          type="date"
                          disabled={isSubmitting}
                          value={visitForm.preferredDate}
                          onChange={(e) => handleVisitFormChange('preferredDate', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferred-time">Preferred Time *</Label>
                        <Input
                          id="preferred-time"
                          type="time"
                          disabled={isSubmitting}
                          value={visitForm.preferredTime}
                          onChange={(e) => handleVisitFormChange('preferredTime', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Additional Message</Label>
                      <Textarea
                        id="visit-message"
                        disabled={isSubmitting}
                        value={visitForm.message}
                        onChange={(e) => handleVisitFormChange('message', e.target.value)}
                        className="mt-1"
                        placeholder="Any specific questions? (Optional)"
                        rows={3}
                      />
                    </div>

                    <div className="bg-mint-green/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Clock className="mr-2 w-4 h-4" />
                        Visit Information
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• School tours available Monday - Friday, 10:00 AM - 2:00 PM</li>
                        <li>• Duration: Approximately 30-45 minutes</li>
                        <li>• Meet our teachers and see our facilities</li>
                        <li>• Q&A session with our director</li>
                      </ul>
                    </div>

                    {/* Anti-DDoS Capacitor Checkbox */}
                    <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <input 
                        type="checkbox" 
                        id="visit-robot-check" 
                        checked={isRobotChecked}
                        onChange={(e) => setIsRobotChecked(e.target.checked)}
                        disabled={isSubmitting}
                        className="w-5 h-5 text-baby-blue border-gray-300 rounded focus:ring-baby-blue cursor-pointer"
                      />
                      <Label htmlFor="visit-robot-check" className="cursor-pointer font-medium text-gray-700">
                        I am not a robot
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-baby-blue to-mint-green text-white hover:from-mint-green hover:to-baby-blue py-6 text-lg rounded-xl shadow-md transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                          Scheduling...
                        </>
                      ) : (
                        "Confirm Visit Request"
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-4 md:space-x-8 mt-6 md:mt-12">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Heart className="w-5 h-5 text-coral fill-current" />
                  <span className="text-2xl font-bold text-gray-800">5+</span>
                </div>
                <p className="text-sm text-gray-600">Years of Care</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Smile className="w-5 h-5 text-sunshine-yellow fill-current" />
                  <span className="text-2xl font-bold text-gray-800">40+</span>
                </div>
                <p className="text-sm text-gray-600">Happy Kids</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="w-5 h-5 text-mint-green fill-current" />
                  <span className="text-2xl font-bold text-gray-800">4.9</span>
                </div>
                <p className="text-sm text-gray-600">Parent Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-baby-blue/20 to-mint-green/20 rounded-3xl p-4 md:p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="w-full h-24 rounded-xl mb-4 overflow-hidden">
                    <img src={heroCreativeArts} alt="Creative Arts" className="w-full h-full object-cover" />
                    {/* <span className="text-white text-4xl">🎨</span> */}
                  </div>
                  <h3 className="font-semibold text-gray-800">Creative Arts</h3>
                </div>


                 <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-8">
                   <div className="w-full h-24 rounded-xl mb-4 overflow-hidden">
                     <img src={heroEarlyLearning} alt="Early Learning" className="w-full h-full object-cover" />
                     {/* <span className="text-white text-4xl">📚</span> */}
                   </div>
                   <h3 className="font-semibold text-gray-800">
                     Early Learning
                   </h3>
                 </div>


                <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="w-full h-24 rounded-xl mb-4 overflow-hidden">
                    <img src={heroPhysicalPlay} alt="Physical Play" className="w-full h-full object-cover" />
                    {/* <span className="text-white text-4xl">🏃</span> */}
                  </div>
                  <h3 className="font-semibold text-gray-800">Physical Play</h3>
                </div>


                <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300 mt-4">
                  <div className="w-full h-32 rounded-xl mb-4 overflow-hidden">
                    <img src={heroMusicDance} alt="Music & Dance" className="w-full h-full object-cover" />
                    {/* <span className="text-white text-4xl">🎵</span> */}
                  </div>
                  <h3 className="font-semibold text-gray-800">Music & Dance</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md p-8 md:p-12">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-3xl font-bold text-center text-gray-800">
              📋 Visit Request Sent!
            </DialogTitle>
            <DialogDescription className="text-center text-xl text-gray-600 font-medium">
              We have received your request to schedule a visit.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 pt-6">
            <p className="text-center text-gray-500 text-lg">
              Our team will contact you shortly to confirm the appointment.
            </p>
            <div className="flex flex-col gap-4">
              <Link to="/gallery" onClick={() => setShowSuccess(false)}>
                <Button className="w-full bg-gradient-to-r from-baby-blue to-mint-green hover:from-mint-green hover:to-baby-blue text-white py-6 text-lg rounded-xl shadow-md transition-all">
                  📸 View Gallery
                </Button>
              </Link>
              <a 
                href="https://www.instagram.com/littlewingsplayschooll/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white py-6 text-lg rounded-xl shadow-md transition-all">
                  📱 Follow on Instagram
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
