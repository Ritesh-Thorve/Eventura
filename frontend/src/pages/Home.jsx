import React  from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import FeaturedVenues from '../components/venues/FeaturedVenues';
import VenueCategories from '../components/venues/VenueCategories';
import BookingSteps from '../components/Booking/BookingSteps';
 
export default function Home() { 
  const navigate = useNavigate(); 

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
              to="/venues"
              className="inline-block bg-pink-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Explore Venues
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Venues Section */}
       <FeaturedVenues/>

      {/* Categories Section component*/}
       <VenueCategories/>
 
      {/*Booking step component */}
       <BookingSteps/>
    </div>
  );
}
