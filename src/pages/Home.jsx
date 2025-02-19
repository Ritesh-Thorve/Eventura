import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import EventCard from '../components/EventCard';

export default function Home() {
  const { events, fetchEvents, loading } = useEvents();

  useEffect(() => {
    fetchEvents();
  }, []);

 // Debugging: Check if events is an array

  const featuredEvents = Array.isArray(events) ? events.slice(0, 3) : [];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[600px]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find Your Perfect Venue
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Book amazing spaces for your next event
            </p>
            <Link
              to="/events"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Explore Venues
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Venues Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Venues</h2>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No featured events available</p>
        )}
        
        <div className="text-center mt-12">
          <Link
            to="/events"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            View All Venues
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Venue Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Hotels',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
                description: 'Luxury hotels for your events'
              },
              {
                title: 'Gardens',
                image: 'https://images.unsplash.com/photo-1464158426056-acbba9645b9b?ixlib=rb-4.0.3',
                description: 'Beautiful outdoor spaces'
              },
              {
                title: 'Wedding Venues',
                image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3',
                description: 'Perfect for your special day'
              },
              {
                title: 'Banquet Halls',
                image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3',
                description: 'Spacious halls for large gatherings'
              }
            ].map((category, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden group">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-50" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-200">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
