import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { VenueCard } from './VenueCard';
import { VenueProfile } from './VenueProfile';
import 'react-toastify/dist/ReactToastify.css';

function Venues() {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/venues')
      .then((response) => response.json())
      .then((data) => {
        setVenues(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load venues');
        setLoading(false);
        toast.error('Failed to fetch venues');
      });
  }, []);

  const handleViewProfile = (id) => {
    const venue = venues.find(v => v.id === id);
    if (venue) setSelectedVenue(venue);
  };

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Find Your Perfect Venue
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              id={venue.id}
              name={venue.name}
              imageUrl={venue.imageUrl}
              capacity={venue.capacity}
              services={venue.services}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>

        {selectedVenue && (
          <VenueProfile
            venue={selectedVenue}
            onClose={() => setSelectedVenue(null)}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Venues;
