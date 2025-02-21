import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext'
 

export default function Home() {

  const venues = [
    {
      title: "Hotel Silver Palace",
      image: "banquet_1.webp",
      description: "Luxury hotels for your events",
      location: "New York, USA",
    },
    {
      title: "Gardens Aditya",
      image: "garden1.avif",
      description: "Beautiful outdoor spaces",
      location: "Los Angeles, USA",
    },
    {
      title: "Wedding Venues",
      image: "hotel1.jpg",
      description: "Perfect for your special day",
      location: "Paris, France",
    },
    {
      title: "Banquet Halls",
      image: "banquet_1.webp",
      description: "Spacious halls for large gatherings",
      location: "Dubai, UAE",
    },{
      title: "Hotel Silver Palace",
      image: "Hotel_2.jpg",
      description: "Luxury hotels for your events",
      location: "New York, USA",
    },
    {
      title: "Gardens Aditya",
      image: "garden_2.jpg",
      description: "Beautiful outdoor spaces",
      location: "Los Angeles, USA",
    },
    {
      title: "Wedding Venues",
      image: "bunquet_2.jpg",
      description: "Perfect for your special day",
      location: "Paris, France",
    },
    {
      title: "Banquet Halls",
      image: "weddign_img_1.jpg",
      description: "Spacious halls for large gatherings",
      location: "Dubai, UAE",
    },
    
  ];

  const { events, fetchEvents, loading } = useEvents();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

 // Debugging: Check if events is an array
 


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
              className="inline-block bg-pink-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Explore Venues
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Venues Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Venues</h2>
          
        {/* mapping venue categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {venues.map((venue, index) => (
        <div
          key={index}
          className="relative rounded-lg overflow-hidden group cursor-pointer"
          onClick={() => navigate(`/venue/${venue.title.replace(/\s+/g, "-").toLowerCase()}`)}
        >
          <img
            src={venue.image}
            alt={venue.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-50"></div>

          {/* Location appears on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-lg font-semibold text-white bg-black bg-opacity-70 px-4 py-2 rounded-lg">
              {venue.location}
            </p>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h3 className="text-xl font-semibold text-white mb-2">{venue.title}</h3>
            <p className="text-gray-200">{venue.description}</p>
          </div>
        </div>
      ))}
    </div>  
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Venue Categories</h2>
          
        {/* mapping venue categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Hotels',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
                description: 'Luxury hotels for your events'
              },
              {
                title: 'Gardens',
                image: 'garden_img_featured_venue.jpg',
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
