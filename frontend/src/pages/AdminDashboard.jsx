import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboard() {
  const { admin } = useAdminAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch all user bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("🚨 No Admin Token Found. Admin is not logged in.");
        return;
      }

      const response = await axios.get("http://localhost:8000/api/admin/allbookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(response.data);
    } catch (err) {
      setError("Failed to fetch bookings");
      toast.error("Failed to fetch bookings"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-24 px-6">
      {/* <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10"> Admin Dashboard</h1> */}

      {/* All Bookings Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 mx-7 text-center">📋 Users Booking </h2>

        {loading && <p className="text-center text-gray-700 text-lg">Loading bookings...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        <div className="max-w-4xl mx-auto">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="bg-gray-50 shadow-md rounded-xl p-6 mb-6 hover:shadow-lg hover:-translate-y-1 transition">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
                  <FaCalendarAlt className="text-blue-500" /> {booking.venueName || "Venue Name Missing"}
                </h2>

                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-2 text-lg">
                    <FaMapMarkerAlt className="text-red-500" /> {booking.location|| "Location Missing"}
                  </p>
                  <p className="flex items-center gap-2 text-lg">
                    📅 {booking.eventDate ? new Date(booking.eventDate).toLocaleDateString("en-GB") : "Date Missing"}
                  </p>
                  <p className="flex items-center gap-2 text-lg">
                    🏷️ {booking.eventType || "Event Type Missing"}
                  </p>
                  <p className="flex items-center gap-2 text-lg">
                    ✉️  {booking.email || "User Email Missing"}
                  </p>
                  <p className="flex items-center gap-2 text-lg">
                  <LuPhoneCall size={20}/> {booking.phone || "User Phone Missing"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <h2 className="text-2xl font-semibold text-gray-700">🚀 No bookings found!</h2>
            </div>
          )}
        </div>
      </section>

      <ToastContainer />
    </div>
  );
}
