// src/contexts/BookingContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_API_URL;

  // Inside BookingContext.js
const createBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${URL}/bookings/addbookings`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setBookings((prev) => [...prev, response.data]); 
    return response.data;
  } catch (error) { 
    throw error;
  }
};


  // Fetch bookings for the logged-in user
  const fetchUserBookings = async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${URL}/bookings/mybookings`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.length === 0) {
        toast.info("No bookings found. Book a venue now!");
      }

      setBookings(response.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  // Delete a booking
  const deleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${URL}/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      throw new Error("Failed to delete booking");
    }
  };

  return (
    <BookingContext.Provider
      value={{
        createBooking,
        bookings,
        loading,
        fetchUserBookings,
        deleteBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
