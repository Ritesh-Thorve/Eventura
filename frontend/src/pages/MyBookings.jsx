import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaPlusCircle, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
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
      setLoading(true);
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
    <div className="min-h-screen bg-gray-100 py-24 px-6">
      <h1 className="text-5xl font-bold text-gray-900 text-center mb-10">📅 My Bookings</h1>

      {loading && ( 
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      <div className="max-w-6xl mx-auto">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-2xl p-6 mb-6 transition hover:shadow-xl border border-gray-200"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600" /> {booking.venueName}
              </h2>

              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <p className="flex items-center gap-2 text-lg">
                  <FaCalendarAlt className="text-green-500" /> {new Date(booking.eventDate).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2 text-lg">
                  <FaClock className="text-yellow-500" /> {booking.eventType}
                </p>
              </div>

              <button
                onClick={() => deleteBooking(booking._id)}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
              >
                <FaTrash /> Delete Booking
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076475.png"
              alt="No bookings"
              className="w-48 mx-auto mb-6 opacity-75"
            />
            <h2 className="text-3xl font-semibold text-gray-700">No bookings found! 🚀</h2>
            <p className="text-lg text-gray-500 mt-2">Start planning your event by booking a venue now.</p>
            <button
              onClick={() => navigate('/venues')}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow-md flex items-center gap-2 transition"
            >
              <FaPlusCircle /> Book a Venue
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default MyBookings;
