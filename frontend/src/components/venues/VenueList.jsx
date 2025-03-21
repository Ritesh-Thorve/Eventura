import React from "react";
import { ToastContainer } from "react-toastify";
import { VenueCard } from "./venueCard";
import { VenueProfile } from "./VenueProfile";
import { useVenues } from "../../contexts/VenuesContext";
import "react-toastify/dist/ReactToastify.css";

function Venues() {
  const { venues, selectedVenue, loading, error, handleViewProfile, setSelectedVenue } = useVenues();

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Find Your Perfect Venue
        </h1>

        {/* Mapping all venues */}
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

        {/* Show venue profile if selected */}
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