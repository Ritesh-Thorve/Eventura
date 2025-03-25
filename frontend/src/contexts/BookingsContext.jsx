import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookingsContext = createContext();

export const useBookings = () => useContext(BookingsContext);

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editingAppointmentDate, setEditingAppointmentDate] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all bookings
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      setError("Admin token missing. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/admin/allbookings`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      setBookings(response.data);
    } catch (err) {
      setError("Failed to fetch bookings");
      toast.error("Error fetching bookings.");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Apply filters based on status and search query
  useEffect(() => {
    let filtered = bookings;

    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (booking) =>
          booking.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [bookings, statusFilter, searchQuery]);

  // Update booking status (Accept/Reject)
  const updateBookingStatus = async (id, status) => {
    const adminToken = localStorage.getItem("adminToken");

    try {
      await axios.put(
        `${API_URL}/admin/bookings/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, status } : booking
        )
      );

      toast.success(`Booking ${status}`);
    } catch (err) {
      toast.error("Failed to update booking status.");
    }
  };

  // Assign appointment date
  const updateAppointmentDate = async (id, newDate) => {
    const adminToken = localStorage.getItem("adminToken");

    try {
      await axios.put(
        `${API_URL}/admin/bookings/${id}/assign-date`,
        { appointmentDate: newDate },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, appointmentDate: newDate } : booking
        )
      );

      toast.success("Appointment date updated.");
    } catch (err) {
      toast.error("Failed to update appointment date.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        filteredBookings,
        statusFilter,
        searchQuery,
        loading,
        error,
        selectedBooking,
        editingAppointmentDate,
        setStatusFilter,
        setSearchQuery,
        setSelectedBooking,
        setEditingAppointmentDate,
        fetchBookings,
        updateBookingStatus,
        updateAppointmentDate,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};
