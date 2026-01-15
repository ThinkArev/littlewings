import React from "react";
import { Heart, MapPin, Phone, Mail, Clock } from "lucide-react";
import littlewingslogo from "@/assets/littlewingsUpdated.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/home" },
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Admissions", href: "/admissions" },
    { name: "Contact", href: "/contact" },
  ];

  const programs = [
    "Pre-nursery (2-3 years)",
    "Nursery (3-4 years)",
    "LKG (4-6 years)",
    "UKG (5-6 years)",
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {/* School Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-baby-blue to-mint-green rounded-full flex items-center justify-center">
                {/* <span className="text-white font-bold text-lg">LW</span> */}
                 <img
                src={littlewingslogo}
                alt="Little Wings Logo"
                className="h-[60px] min-w-[55px] border-2 border-[#FFF0F5] rounded-full"
              />
              </div>
              <div>
                <h3 className="text-xl font-bold">Little Wings</h3>
                <p className="text-sm text-gray-300">Play School</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              "Where Little Minds Take Big Flights" - Nurturing young minds with
              love, care, and quality education since 2019.
            </p>
            <div className="flex items-center space-x-1 text-sunshine-yellow">
              <span>Made with</span>
              <Heart className="w-4 h-4 fill-current" />
              <span>for little ones</span>
            </div>
          </div>
        </div>    
          {/* Quick Links */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-baby-blue transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
       <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Programs</h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index} className="text-gray-300">
                  {program}
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-gradient-to-r from-baby-blue/20 to-mint-green/20 rounded-lg">
              <p className="text-sm font-semibold text-baby-blue mb-2">
                Admissions Open!
              </p>
              <p className="text-xs text-gray-300">
                Apply now for the new academic session
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-baby-blue mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    H.No. 1260, Opposite Housing Board Colony, Sector 10A
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-mint-green flex-shrink-0" />
                <p className="text-gray-300 text-sm">+91 9599716401</p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-peach flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  littlewingsplayschool25@gmail.com
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-sunshine-yellow mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Mon - Fri: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-pink-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <a 
                  href="https://www.instagram.com/littlewingsplayschooll/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-pink-400 transition-colors"
                >
                  @littlewingsplayschooll
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Little Wings Play School. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-baby-blue transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-mint-green transition-colors duration-200 text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
