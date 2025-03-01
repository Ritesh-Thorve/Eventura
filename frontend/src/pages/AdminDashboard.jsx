import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { MapPin, Calendar, Trash2, CheckCircle, XCircle, PhoneCall, Mail, Building, Tag } from "lucide-react";
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

  const updateBookingStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `http://localhost:8000/api/admin/bookings/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Booking marked as ${status}`);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-white py-24 px-6">
      <section>
        <h2 className="text-2xl font-semibold mb-4 mx-7 text-center">📋 Users Booking</h2>

        {loading && <p className="text-center text-gray-700 text-lg">Loading bookings...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        <div className="max-w-4xl mx-auto">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="bg-gray-50 shadow-md rounded-xl p-6 mb-6 hover:shadow-lg hover:-translate-y-1 transition">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
                  <Building className="text-blue-600" /> {booking.venueName || "Venue Name Missing"}
                </h2>

                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-2 text-lg">
                    <MapPin className="text-red-500" /> {booking.location || "Location Missing"}
                  </p>
                  <p className="flex items-center gap-2 text-lg">
                    <Calendar className="text-green-600" /> {booking.eventDate ? new Date(booking.eventDate).toLocaleDateString("en-GB") : "Date Missing"}
                  </p>
                  <p className="flex items-center gap-2 text-lg">
                    <Tag className="text-blue-500" /> {booking.eventType || "Event Type Missing"}
                  </p>
                  <p className="flex items-center gap-2 text-lg">
                    <Mail className="text-purple-500" /> {booking.email || "User Email Missing"}
                  </p>
                  <p className="flex items-center gap-2 text-lg">
                    <PhoneCall className="text-yellow-500" /> {booking.phone || "User Phone Missing"}
                  </p>
                  <p className="text-lg flex items-center gap-2">
                    📌 Status: <strong className={`${booking.status === "Accepted" ? "text-green-600" : booking.status === "Rejected" ? "text-red-600" : "text-gray-600"}`}>
                      {booking.status}
                    </strong>
                  </p>
                </div>

                {/* Buttons for Admin Actions */}
                <div className="mt-4 flex gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    onClick={() => updateBookingStatus(booking._id, "Accepted")}
                  >
                    <CheckCircle /> Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    onClick={() => updateBookingStatus(booking._id, "Rejected")}
                  >
                    <XCircle /> Reject
                  </button>
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
