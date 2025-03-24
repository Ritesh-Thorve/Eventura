import { createContext, useContext, useState, useEffect, useCallback } from "react";
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
  const URL = import.meta.env.VITE_API_URL;

  // Wrap fetchBookings in useCallback to prevent unnecessary recreations
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${URL}/admin/allbookings`, {
        headers: { Authorization: `Bearer ${admin-token}` },
      });
      setBookings(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]); //only runs when fetchBookings changes (which it won't, thanks to useCallback)

  const updateBookingStatus = async (id, status) => {
  };

  const updateAppointmentDate = async (id, newDate) => {
  };

  const filteredBookings = bookings.filter((booking) => {

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