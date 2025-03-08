"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { LayoutDashboard, Calendar, MessageCircle, BarChart, Loader2, Hotel, Mail } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingsManagement from "../components/Booking/BookinsManagement";
import VenuesManagement from "../components/venues/VenuesManagement";
import UserMessages from "../components/Admin/UserMessages";

export default function AdminDashboard() {
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

  const renderComponent = () => {
    switch (activeComponent) {
      case "bookings":
        return <BookingsManagement />;
      case "venues":
        return <VenuesManagement />;
      case "messages":
        return <UserMessages />;
      default:
        return <BookingsManagement />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-t md:border-t-0 md:border-r p-4 md:p-6 mt-16">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <BarChart className="h-5 w-5" /> Admin Dashboard
        </h1>
        <nav className="mt-4 space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeComponent === "bookings" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveComponent("bookings")}
          >
            <LayoutDashboard className="mr-2 h-5 w-5" /> Bookings
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeComponent === "venues" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveComponent("venues")}
          >
            <Hotel className="mr-2 h-5 w-5" /> Venues
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeComponent === "messages" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveComponent("messages")}
          >
            <Mail className="mr-2 h-5 w-5" /> Messages
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-16">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {loading ? (
            <div className="col-span-3 flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="col-span-3 text-center text-red-600 font-semibold">{error}</div>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> Total Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.totalBookings}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hotel className="h-5 w-5" /> Total Venues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.totalVenues}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" /> New Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.newMessages}</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold capitalize">{activeComponent}</h2>
        </div>

        {/* Render Active Component */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
