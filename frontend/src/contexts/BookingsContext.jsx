import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookingsContext = createContext();

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editingAppointmentDate, setEditingAppointmentDate] = useState(null);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8000/api/admin/allbookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (err) {
      setError("Failed to fetch bookings");
      toast.error("No Bookings Found");
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

  const updateAppointmentDate = async (id, newDate) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `http://localhost:8000/api/admin/bookings/${id}/assign-date`,
        { appointmentDate: newDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Appointment date updated successfully");
      fetchBookings(); // Refresh the bookings list
    } catch (error) {
      toast.error("Failed to update appointment date");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = searchQuery
      ? booking.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesStatus && matchesSearch;
  });

  return (
    <BookingsContext.Provider
      value={{
        bookings,
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
        filteredBookings,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => useContext(BookingsContext);