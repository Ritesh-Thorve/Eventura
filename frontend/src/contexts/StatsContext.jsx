"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState("bookings");
  const [stats, setStats] = useState({ totalBookings: 0, totalVenues: 0, newMessages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get("http://localhost:8000/api/admin/getstats", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        setStats(response.data);
      } catch (err) {
        setError("Failed to fetch stats. Please try again.");
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
