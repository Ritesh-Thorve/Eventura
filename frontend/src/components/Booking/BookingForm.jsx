import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

const timeSlots = [
  { id: '1', time: '10:00 AM', available: true },
  { id: '2', time: '11:00 AM', available: true },
  { id: '3', time: '2:00 PM', available: true },
  { id: '4', time: '3:00 PM', available: true },
  { id: '5', time: '4:00 PM', available: true },
];

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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    eventType: eventTypes[0],
    timeSlot: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Appointment booked successfully! We will contact you shortly.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      onClose();
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
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
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
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Your Location
              </label>
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
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Time Slots
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <label
                    key={slot.id}
                    className={
                      `flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer ` +
                      (formData.timeSlot === slot.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500')
                    }
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.id}
                      checked={formData.timeSlot === slot.id}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="sr-only"
                    />
                    {slot.time}
                  </label>
                ))}
              </div>
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
