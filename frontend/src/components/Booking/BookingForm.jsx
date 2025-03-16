// Add this to your imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Conference',
  'Seminar',
  'Social Gathering',
  'Other',
];

export function BookingForm({ venue, onClose }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    userId: user?._id || '',
    venueName: venue.name,
    email: user?.email || '',
    name: user?.name || '',
    eventType: eventTypes[0],
    eventDate: '',
    numberOfDays: 1,
    phone: '',
    location: '',
    price: venue?.price || '', // ✅ Added venue price
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
        name: user.name,
        userId: user._id,
      }));
    }

    if (venue) {
      setFormData((prev) => ({
        ...prev,
        venueName: venue.name,
        price: venue.price, // ✅ Ensure price is updated if venue changes
      }));
    }
  }, [user, venue]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.userId ||
      !formData.venueName ||
      !formData.email ||
      !formData.eventType || 
      !formData.name ||
      !formData.phone ||
      !formData.location ||
      !formData.eventDate ||
      !formData.numberOfDays ||
      !formData.price
    ) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/bookings/addbookings', formData);

      if (response.status === 201) {
        toast.success('Appointment booked successfully! we will contact you shortly.');
        onClose();
      }
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Book an Appointment - {venue.name}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                readOnly
                value={formData.email}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
              <select
                required
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
              <input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Number of Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Days</label>
              <input
                type="number"
                min="1"
                required
                value={formData.numberOfDays}
                onChange={(e) =>
                  setFormData({ ...formData, numberOfDays: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Venue Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue Price (₹)</label>
              <input
                type="number"
                readOnly
                value={formData.price}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
