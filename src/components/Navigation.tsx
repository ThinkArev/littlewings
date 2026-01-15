import React, { useState, useEffect, useRef } from "react";
import { Home, Info, BookOpen, Image, Mail, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import littlewingslogo from "@/assets/littlewingsUpdated.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const threshold = 10;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY.current);
      
      // Determine if scrolled enough to change background
      setIsScrolled(currentScrollY > 50);

      // Only toggle visibility if scroll distance is significant
      if (diff > threshold) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
          // Scrolling Down - hide
          setIsVisible(false);
        } else {
          // Scrolling Up - show
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Programs", href: "/programs", icon: BookOpen },
    { name: "Gallery", href: "/gallery", icon: Image },
    { name: "Join Us", href: "/join", icon: Mail },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav
        className={`fixed top-0 w-full z-[100] transition-transform duration-500 ease-in-out transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg" 
            : "backdrop-blur-sm bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 lg:h-20 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-baby-blue to-mint-green rounded-full flex items-center justify-center flex-shrink-0">
                <img
                  src={littlewingslogo}
                  alt="Little Wings Logo"
                  className="h-[60px] min-w-[55px] border-2 border-[#FFF0F5] rounded-full"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                  Little Wings
                </h1>
                <p className="text-xs text-gray-600">Play School</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 lg:space-x-8 flex-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive 
                        ? "text-baby-blue bg-baby-blue/10" 
                        : "text-gray-700"
                    } hover:text-baby-blue transition-colors duration-200 font-medium whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-baby-blue/10`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile/Tablet View - Spacer */}
            <div className="lg:hidden flex-1"></div>

            {/* Apply Now Button (Global) */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+91 9599716401</span>
              </div>
              <Link to="/join#applyNow">
                <Button
                  className="bg-gradient-to-r from-peach to-sunshine-yellow text-gray-800 hover:from-sunshine-yellow hover:to-peach text-[13px] sm:text-base px-5 sm:px-6 h-10 sm:h-11 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
                >
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Bottom Navigation Bar - Stabilized Floating Design */}
      <div className="lg:hidden fixed bottom-4 inset-x-4 z-[1000] flex justify-center">
        <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl border border-gray-100/50 rounded-[2rem] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1),0_5px_15px_-3px_rgba(0,0,0,0.05)] px-2 py-1">
            <div className="flex items-stretch justify-between h-16 relative">
            {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                <Link
                    key={item.name}
                    to={item.href}
                    className={`flex-1 flex flex-col items-center justify-center transition-all duration-200 relative min-w-0 ${
                    isActive 
                        ? "text-baby-blue" 
                        : "text-gray-600 active:scale-95"
                    }`}
                >
                    <div className={`p-1.5 rounded-2xl transition-all duration-200 ${
                    isActive ? "bg-baby-blue/10" : ""
                    }`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2px]`} />
                    </div>
                    <span className={`font-bold tracking-tight uppercase transition-all duration-200 ${
                    isActive ? "opacity-100" : "opacity-70"
                    } truncate w-full text-center px-0.5 text-[8px] sm:text-[9px] mt-0.5`}>
                    {item.name}
                    </span>
                    {isActive && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-0.5 bg-baby-blue rounded-b-full"></div>
                    )}
                </Link>
                );
            })}
            </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
