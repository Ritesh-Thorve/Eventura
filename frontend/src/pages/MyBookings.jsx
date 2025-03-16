import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  Info,
  Trash2,
  Phone,
  Mail,
  Loader2,
  CalendarCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch bookings when user is loaded
  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  // Fetch bookings from backend
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/bookings/mybookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.length === 0) {
        console.log("No bookings found. Book a venue now!");
      }

      setBookings(response.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  // Open confirmation dialog
  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  // Confirm delete booking
  const confirmDelete = async () => {
    if (!selectedBooking) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/bookings/${selectedBooking._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Booking deleted successfully");
      fetchBookings(); // Refresh bookings after deletion
    } catch (error) {
      toast.error("Failed to delete booking");
    } finally {
      setIsDialogOpen(false);
      setSelectedBooking(null);
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Not Set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3 flex items-center justify-center gap-3">
            <CalendarCheck className="text-primary h-10 w-10 mt-1" />
            My Bookings
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Manage all your venue bookings in one place
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-slate-600 text-lg">Loading your bookings...</p>
          </div>
        ) : bookings.length > 0 ? (
          // Show bookings
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <Card
                key={booking._id}
                className="overflow-hidden border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-4">
                  <CardTitle className="flex items-start gap-3 text-2xl">
                    <MapPin className="text-primary h-6 w-6 mt-1" />
                    <span className="line-clamp-2 font-bold">{booking.venueName}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Event Date */}
                    <div className="flex items-start gap-2">
                      <Calendar className="text-emerald-500 h-5 w-5 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-700">Event Date</p>
                        <p className="text-slate-600">{formatDate(booking.eventDate)}</p>
                      </div>
                    </div>

                    {/* Event Type */}
                    <div className="flex items-start gap-2">
                      <Clock className="text-amber-500 h-5 w-5 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-700">Event Type</p>
                        <p className="text-slate-600">{booking.eventType}</p>
                      </div>
                    </div>

                    {/* Appointment Date */}
                    <div className="flex items-start gap-2">
                      <Calendar className="text-blue-500 h-5 w-5 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-700">Appointment Date</p>
                        <p className="text-slate-600">{formatDate(booking.appointmentDate)}</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-start gap-2">
                      <Info className="text-purple-500 h-5 w-5 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-700">Status</p>
                        <p className="text-red-800 font-bold text-xl">{booking.status}</p>
                      </div>
                    </div>

                    {/*number of booking days and venue price*/}
                    <div className="flex items-start gap-2">
                    <Calendar className="text-pink-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div>
                      <p className="text-base font-bold text-slate-700">Days</p>
                      <p className="text-slate-600">
                        {booking.numberOfDays} {booking.numberOfDays > 1 ? "days" : "day"}
                      </p>
                      </div>
                    </div>


                    <div className="flex items-start gap-2">
                      <Info className="text-purple-500 h-5 w-5 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-700">Price</p>
                        <p className="text-red-800 font-bold text-xl">₹{booking.price}/Day</p>
                      </div>
                    </div>
                  </div>

                    <Separator className="my-2" />

                    {/* Venue Contact */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-slate-700">Venue Contact</h3>
                      <div className="flex items-center gap-2">
                        <Phone className="text-indigo-500 h-4 w-4" />
                        <a href={`tel:${booking.venueContactPhone}`} className="text-slate-600 hover:text-indigo-500">
                          {booking.venueContactPhone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="text-rose-500 h-4 w-4" />
                        <a href={`mailto:${booking.venueContactEmail}`} className="text-slate-600 break-all hover:text-rose-500">
                          {booking.venueContactEmail}
                        </a>
                      </div>
                    </div>
                </CardContent>

                {/* Delete Booking */}
                <CardFooter className="bg-slate-50 flex justify-end pt-4">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(booking)}
                    className="gap-2 text-sm"
                  >
                    <Trash2 className="h-5 w-5" />
                    Cancel Booking
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-3xl p-10 border border-gray-200">
            <img src="nobookings_found.png" alt="No Bookings" className="w-80 h-80 object-cover mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">No Bookings Found</h2>
            <p className="text-gray-500 mt-2">You don’t have any booking history</p>
            <button
              onClick={() => navigate("/venues")}
              className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              🎉 Book a Venue
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Cancel this booking?</DialogTitle>
            <DialogDescription>
              {selectedBooking && (
                <div className="mt-2 text-slate-600">
                  <p className="text-base">
                    You're about to cancel your booking at <strong>{selectedBooking.venueName}</strong> for{" "}
                    <strong>{formatDate(selectedBooking.eventDate)}</strong>.
                  </p>
                  <p className="text-sm mt-2">This action cannot be undone.</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={confirmDelete} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MyBookings;
