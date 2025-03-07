"use client";
import { useState } from "react";
import { LayoutDashboard, Calendar, MessageCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingsManagement from "../components/Booking/BookinsManagement";
import VenuesManagement from "../components/venues/VenuesManagement";
import UserMessages from "../components/Admin/UserMessages";

export default function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState("bookings");

  // Mock stats data (replace with real data from your backend)
  const stats = [
    { title: "Total Bookings", value: "120", icon: "📅" },
    { title: "Total Venues", value: "25", icon: "🏟️" },
    { title: "New Messages", value: "8", icon: "✉️" },
  ];

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
      {/* Sidebar (Moved to the Left) */}
      <div className="w-full  md:w-64 bg-white border-t md:border-t-0 md:border-r p-4 md:p-6 mt-16">
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

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-16">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{stat.icon}</span>
                  <span>{stat.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold capitalize">{activeComponent}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Admin</span>
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Render Active Component */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}