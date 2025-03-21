import React, { useEffect } from "react";
import { X, Users, MapPin, Calendar, Clock, Phone, Mail, IndianRupee, CheckCircle } from "lucide-react";
import { BookingForm } from "../Booking/BookingForm";
import { useAuth } from "../../contexts/AuthContext";
import { useVenues } from "../../contexts/VenuesContext";  

export function VenueProfile({ venueId, onClose }) {
  const { user } = useAuth();
  const {
    venueDetails,
    venueLoading,
    venueError,
    showBookingForm,
    fetchVenueDetails,
    handleBookAppointment,
    setShowBookingForm,
  } = useVenues();

  // Fetch venue details when venueId changes
  useEffect(() => {
    if (venueId) {
      fetchVenueDetails(venueId);
    }
  }, [venueId, fetchVenueDetails]);

  if (venueLoading) {
    return <div className="text-center py-10">Loading venue details...</div>;
  }

  if (venueError) {
    return <div className="text-center text-red-500 py-10">{venueError}</div>;
  }

  if (!venueDetails) {
    return <div className="text-center text-gray-600 py-10">Venue not found</div>;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <X size={24} />
            </button>
            <img
              src={venueDetails.imageUrl}
              alt={venueDetails.name}
              className="w-full h-64 object-cover"
              onError={(e) => (e.target.src = "/default-image.jpg")} // Fallback image
            />
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{venueDetails.name}</h2>
            <p className="text-gray-600">{venueDetails.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Users className="text-indigo-600" />
                  <span>Capacity: up to {venueDetails.capacity} guests</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="text-indigo-600" />
                  <span>{venueDetails.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <IndianRupee className="text-indigo-600" />
                  <span>Price: ₹{venueDetails.price.toLocaleString()} / Day</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="text-indigo-600" />
                  <span>{venueDetails.availability?.days || "Not specified"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="text-indigo-600" />
                  <span>{venueDetails.availability?.hours || "Not specified"}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Contact Information</h3>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="text-indigo-600" />
                  <a href={`tel:${venueDetails.contact?.phone}`} className="hover:text-indigo-600">
                    {venueDetails.contact?.phone || "N/A"}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="text-indigo-600" />
                  <a href={`mailto:${venueDetails.contact?.email}`} className="hover:text-indigo-600">
                    {venueDetails.contact?.email || "N/A"}
                  </a>
                </div>
              </div>
            </div>

            {/* Services & Amenities - Two Columns */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Services Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Services</h3>
                <ul className="mt-2 space-y-2">
                  {venueDetails.services.map((service, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="text-green-500" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenities Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
                <ul className="mt-2 space-y-2">
                  {venueDetails.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="text-blue-500" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => handleBookAppointment(user)}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBookingForm && (
        <BookingForm
          venue={venueDetails}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </>
  );
}