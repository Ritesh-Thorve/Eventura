import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, Info, Trash2, Phone, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedBooking) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/bookings/${selectedBooking._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Booking deleted successfully");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to delete booking");
    } finally {
      setIsDialogOpen(false);
      setSelectedBooking(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-gray-900 text-center mb-10">📅 My Bookings</h1>

      {loading ? <p className="text-center text-lg text-gray-700">Loading...</p> : null}

      <div className="max-w-6xl w-full">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200 
                         hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <MapPin className="text-blue-600" size={30} /> {booking.venueName}
              </h2>

              <p className="text-lg flex items-center gap-2">
                <Calendar className="text-green-500" />
                <span className="font-medium">Event Date:</span> {new Date(booking.eventDate).toLocaleDateString()}
              </p>
              <p className="text-lg flex items-center gap-2">
                <Clock className="text-yellow-500" />
                <span className="font-medium">Event Type:</span> {booking.eventType}
              </p>

              <p className="text-lg flex items-center gap-2">
                <Calendar className="text-blue-500" />
                <span className="font-medium">Appointment Date:</span>
                {booking.appointmentDate ? new Date(booking.appointmentDate).toLocaleDateString() : "Not Set"}
              </p>

              <p className="text-lg flex items-center gap-2">
                <Info className="text-purple-500" />
                <span className="font-medium">Status:</span> <strong>{booking.status}</strong>
              </p>

              <p className="text-lg flex items-center gap-2">
                <Phone className="text-indigo-500" />
                <span className="font-medium">Venue Contact:</span> {booking.venueContactPhone}
              </p>
              <p className="text-lg flex items-center gap-2">
                <Mail className="text-red-500" />
                <span className="font-medium">Venue Email:</span> {booking.venueContactEmail}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteClick(booking)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 
                           transition-all shadow-md hover:shadow-lg hover:scale-105"
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
                onClick={() => navigate("/venues")}
                className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md 
                           hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out"
              >
                🎉 Book a Venue
              </button>
            </div>
          )
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <p className="text-gray-600">This action cannot be undone.</p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  );
}

export default MyBookings;
