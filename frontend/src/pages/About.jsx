import React from 'react';
import { Heart, Award, Users, MapPin, Calendar, ArrowLeft, Clock } from 'lucide-react'; 

export default function About({ onBack }) {
  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-indigo-900">
        <img 
          src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80" 
          alt="Elegant event venue" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/70"> </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">About Eventura</h1>
          <p className="text-xl text-indigo-100 max-w-2xl">
            Connecting people with extraordinary venues for unforgettable events since  2025.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At Eventura, we believe that finding the perfect venue should be as memorable as the event itself. 
              Our mission is to simplify the venue discovery and booking process, connecting people with 
              extraordinary spaces that bring their vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-indigo-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Passion for Excellence</h3>
              <p className="text-gray-600">
                We curate only the finest venues that meet our strict standards for quality, service, and uniqueness.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Exceptional Service</h3>
              <p className="text-gray-600">
                Our dedicated team provides personalized support to ensure your venue booking experience is seamless.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Focus</h3>
              <p className="text-gray-600">
                We connect venue owners with event planners, creating a thriving community of event professionals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-indigo-200 mb-8">
                Have questions about Eventura or need help finding the perfect venue? 
                Our team is here to assist you every step of the way.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="text-indigo-300 mt-1" />
                  <div>
                    <h3 className="font-semibold">Our Headquarters</h3>
                    <p className="text-indigo-200">123 Venue Street, <br />Jalgaon, Maharashtra, India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                <Clock />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-indigo-200">Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white text-gray-900 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

              <form method='submit' className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Rohit Sharma"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
