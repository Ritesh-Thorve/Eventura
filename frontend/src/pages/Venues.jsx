import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { VenueCard } from '../components/venues/venueCard';
import { VenueProfile } from '../components/venues/VenueProfile';
import { useVenues } from '../contexts/VenuesContext';
import 'react-toastify/dist/ReactToastify.css';

function Venues() {
  const { venues, loading, error, handleViewProfile } = useVenues();
  const [selectedVenueId, setSelectedVenueId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          Find Your Perfect Venue
        </h1>
        {loading && <p className="text-center text-gray-700">Loading venues...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <VenueCard
              key={venue._id}
              id={venue._id}
              name={venue.name}
              imageUrl={venue.imageUrl}
              capacity={venue.capacity}
              services={venue.services}
              onViewProfile={() => setSelectedVenueId(venue._id)}
            />
          ))}
        </div>
        {selectedVenueId && (
          <VenueProfile
            venueId={selectedVenueId}
            onClose={() => setSelectedVenueId(null)}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Venues;
