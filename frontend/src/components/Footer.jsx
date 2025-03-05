import React from "react";
import { Facebook, Twitter, Instagram, Mail, Phone,HelpCircle, MoveRight } from "lucide-react"; 
import { Link } from "react-router-dom";

export default function Footer() { 
  const socialLinks = [
    { href: "https://facebook.com/eventura", icon: Facebook, label: "Facebook" },
    { href: "https://twitter.com/eventura", icon: Twitter, label: "Twitter" },
    { href: "https://instagram.com/eventura", icon: Instagram, label: "Instagram" },
  ];

  const AboutIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-white"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2V7zm0 4h2v6h-2v-6z"/>
    </svg>
  );

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Eventura</h3>
            <p className="text-gray-400">
              Your premier destination for event venue bookings. Find and book the perfect space for your next event.
            </p>
             <div className="flex gap-1 my-2 items-center">   
            <HelpCircle className="h-5 w-5 mr-2"/>
             <a href="/about" className="text-gray-400 hover:text-white">Want to register your hotel</a>
             <MoveRight className="h-5 w-5 mr-2 mt-1 ml-1"/>
             </div>
          </div>  

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:contact@eventura.com" className="text-gray-400 hover:text-white">
                  contact@eventura.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+911234567890" className="text-gray-400 hover:text-white">
                  (+91) 12345 67890
                </a>
              </div>

                <div className="flex items-center gap-3">
                <AboutIcon/>
                <Link to="/about" className="block  text-gray-400 hover:text-white">About</Link>
                </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Eventura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
