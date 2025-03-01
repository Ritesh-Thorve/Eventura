import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, Info, Trash2 } from "lucide-react";

function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/bookings/mybookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.length === 0) {
        toast.error("🚨 No bookings found. Book a venue now!", { autoClose: 3000 });
      }

      setBookings(response.data);
    } catch (error) {
      toast.error("❌ Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Booking deleted successfully");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to delete booking");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-gray-900 text-center mb-10">📅 My Bookings</h1>

      {loading ? <p className="text-center text-lg text-gray-700">Loading...</p> : null}

      <div className="max-w-6xl w-full">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <MapPin  className="text-blue-600" size={30}/> {booking.venueName}
              </h2>

              <p className="text-lg flex items-center gap-2">
                <Calendar className="text-green-500 " /> {new Date(booking.eventDate).toLocaleDateString()}
              </p>
              <p className="text-lg flex items-center gap-2">
                <Clock className="text-yellow-500" /> {booking.eventType}
              </p>
              <p className="text-lg flex items-center gap-2">
                <Info className="text-purple-500" /> Status: <strong>{booking.status}</strong>
              </p>

              <button
                onClick={() => deleteBooking(booking._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
              >
                <Trash2 /> Delete Booking
              </button>
            </div>
          ))
        ) : (
          !loading && (
            <div className="flex flex-col items-center justify-center h-auto bg-white shadow-lg rounded-3xl p-10 border border-gray-200">
              <img
                src="nobookings_found.png"
                alt="No Bookings"
                className="w-80 h-80 max-w-xs object-cover mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-700 mt-4">No Bookings Found</h2>
              <p className="text-gray-500 mt-2">You don’t have any booking history</p>

              <button
                onClick={() => navigate('/venues')}
                className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                🎉 Book a Venue
              </button>
            </div>
          )
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default MyBookings;
