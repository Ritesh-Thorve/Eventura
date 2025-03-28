"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState("bookings");
  const [stats, setStats] = useState({ totalBookings: 0, totalVenues: 0, newMessages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchStats() {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("No admin token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${URL}/admin/getstats`, {
          headers: { Authorization: `Bearer ${token}` },  
        });
        setStats(response.data);
      } catch (err) {
        console.error("Fetch Error:", err.response?.data || err.message);
        setError("Failed to fetch stats. Unauthorized or network issue.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <AdminContext.Provider value={{ activeComponent, setActiveComponent, stats, loading, error }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
