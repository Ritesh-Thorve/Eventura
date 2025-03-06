"use client";
import { useState, useEffect } from "react";
import { LayoutDashboard, Calendar, MessageCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import BookingsManagement from "../components/Booking/BookinsManagement";
import VenuesManagement from "../components/venues/VenuesManagement";
// import UsersMessages from "./UsersMessages";

export default function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState("bookings");
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalVenues, setTotalVenues] = useState(0);
  const [newMessages, setNewMessages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch stats from the backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch total bookings
        const bookingsResponse = await axios.get("http://localhost:8000/api/admin/total-bookings", { headers });
        setTotalBookings(bookingsResponse.data.totalBookings);

        // Fetch total venues
        const venuesResponse = await axios.get("http://localhost:8000/api/admin/total-venues", { headers });
        setTotalVenues(venuesResponse.data.totalVenues);

        // Fetch new messages
        const messagesResponse = await axios.get("http://localhost:8000/api/admin/new-messages", { headers });
        setNewMessages(messagesResponse.data.newMessages);
      } catch (err) {
        setError("Failed to fetch stats");
        toast.error("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "bookings":
        return <BookingsManagement />;
      case "venues":
        return <VenuesManagement />;
      case "messages":
        return <UsersMessages />;
      default:
        return <BookingsManagement />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold capitalize">{activeComponent}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Admin</span>
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Bookings</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <p className="text-2xl font-bold">{totalBookings}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Venues</CardTitle>
              <CardDescription>Active venues</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <p className="text-2xl font-bold">{totalVenues}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>New Messages</CardTitle>
              <CardDescription>Unread messages</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <p className="text-2xl font-bold">{newMessages}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Component */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          {renderComponent()}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-t md:border-t-0 md:border-l p-4 md:p-6 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 ${activeComponent === "bookings" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveComponent("bookings")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Bookings
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 ${activeComponent === "venues" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveComponent("venues")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Venues
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 ${activeComponent === "messages" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveComponent("messages")}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </nav>
      </div>
    </div>
  );
}