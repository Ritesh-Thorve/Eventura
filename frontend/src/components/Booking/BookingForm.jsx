import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext'; // Import Auth Context

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Conference',
  'Seminar',
  'Social Gathering',
  'Other'
];

export function BookingForm({ venue, onClose }) {
  const { user } = useAuth(); // Get logged-in user data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    eventType: eventTypes[0],
    eventDate: '',
  });

  // Automatically set logged-in user's email when component mounts
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, email: user.email, name: user.name }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = { ...formData, venueName: venue.name, venueLocation: venue.location };

    try {
      const response = await axios.post('http://localhost:8000/api/bookings/addbookings', bookingData);

      if (response.status === 201) {
        toast.success('Appointment booked successfully! We will contact you shortly.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
            <h2 className="text-2xl font-bold text-gray-900">Book an Appointment - {venue.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-100"
                value={formData.email}
                readOnly
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
              <input
                type="text"
                id="location"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
              <select
                id="eventType"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
              <input
                type="date"
                id="eventDate"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Confirm Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}