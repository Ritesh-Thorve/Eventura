import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/bookings/mybookings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch bookings');
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Booking deleted successfully');
      await fetchBookings();
    } catch (error) {
      toast.error('Failed to delete booking');
    }
  };

  return (
    <div className="min-h-screen bg-white py-24 px-6">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">📅 My Bookings</h1>

      {loading && <p className="text-center text-gray-700 text-lg">Loading bookings...</p>}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      <div className="max-w-5xl mx-auto">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="bg-gray-50 shadow-md rounded-xl p-6 mb-6 hover:shadow-lg hover:-translate-y-1 transition">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
                <FaCalendarAlt className="text-blue-500" /> {booking.venueName}
              </h2>
              
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center gap-2 text-lg">
                  <FaMapMarkerAlt className="text-red-500" /> {booking.location}
                </p>
                <p className="flex items-center gap-2 text-lg">
                  📅 {new Date(booking.eventDate).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2 text-lg">
                  🏷️ {booking.eventType}
                </p>
              </div>

              <button 
                onClick={() => deleteBooking(booking._id)} 
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <FaTrash /> Delete Booking
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-gray-700">🚀 You haven’t booked any venue yet!</h2>
            <p className="text-lg text-gray-500 mt-2">Start planning your event by booking a venue now.</p>
            <button 
              onClick={() => navigate('/venues')} 
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow-md transition"
            >
              Book a Venue
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default MyBookings;
