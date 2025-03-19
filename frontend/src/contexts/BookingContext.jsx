import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch bookings of the logged-in user
  const fetchUserBookings = async (userId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/api/bookings/user/${userId}`);
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new booking
  const createBooking = async (bookingData) => {
    try {
      const { data } = await axios.post('http://localhost:8000/api/bookings/addbookings', bookingData);
      setBookings((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Booking failed:', error);
      throw error;
    }
  };

  // Delete booking (optional)
  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8000/api/bookings/delete/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };


  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        fetchUserBookings,
        createBooking,
        deleteBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
