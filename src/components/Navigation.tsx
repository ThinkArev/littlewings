import React, { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import littlewingslogo from "@/assets/littlewingsUpdated.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    // { name: "Staff", href: "/staff" },
    { name: "Programs", href: "/programs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Admissions", href: "/admissions" },
    { name: "Contact", href: "/contact" },
  ];

  const handleApplyNowClick = () => {
    // Navigate to admissions page
    window.location.href = "/admissions";
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 lg:h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-baby-blue to-mint-green rounded-full flex items-center justify-center">
              {/* <span className="text-white font-bold text-lg">LW</span> */}
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
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 flex-1">
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
                  } hover:text-baby-blue transition-colors duration-200 font-medium whitespace-nowrap px-2 py-1 rounded-lg hover:bg-baby-blue/10`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>


          {/* Mobile Navigation - Horizontal Scroll */}
          <div className="md:hidden flex-1 max-w-xs">
            <div className="flex items-center overflow-x-auto scrollbar-hide space-x-4 px-2 py-2">
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
                    } hover:text-baby-blue transition-colors duration-200 font-medium whitespace-nowrap text-sm px-3 py-2 rounded-lg hover:bg-baby-blue/10 flex-shrink-0`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+91 9599716401</span>
            </div>
            <Button
              onClick={handleApplyNowClick}
              className="bg-gradient-to-r from-peach to-sunshine-yellow text-gray-800 hover:from-sunshine-yellow hover:to-peach"
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Apply Button */}
          {/* <div className="md:hidden">
            <Button
              onClick={handleApplyNowClick}
              size="sm"
              className="bg-gradient-to-r from-peach to-sunshine-yellow text-gray-800 hover:from-sunshine-yellow hover:to-peach px-4"
            >
              Apply
            </Button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
