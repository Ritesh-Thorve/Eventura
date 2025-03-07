"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editingAppointmentDate, setEditingAppointmentDate] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

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
    <div className="flex flex-col p-14 gap-6">
      <ToastContainer />

      {/* Filters Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Input */}
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by venue or user email..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filter: {statusFilter === "all" ? "All" : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Accepted")}>Accepted</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Rejected")}>Rejected</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>Pending</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Venue Bookings</CardTitle>
          <CardDescription>Manage all venue bookings from users</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-700">Loading bookings...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Venue</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Event Date</TableHead>
                  <TableHead>Appointment Date</TableHead>
                  <TableHead>Assign Appointment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.venueName}</TableCell>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.eventType}</TableCell>
                    <TableCell>{new Date(booking.eventDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {booking.appointmentDate
                        ? new Date(booking.appointmentDate).toLocaleDateString()
                        : "Not assigned"}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={editingAppointmentDate === booking._id ? new Date().toISOString().split("T")[0] : ""}
                        onChange={(e) => {
                          const newDate = e.target.value;
                          updateAppointmentDate(booking._id, newDate);
                          setEditingAppointmentDate(null); // Reset editing state
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge>{booking.status}</Badge>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {/* Detail Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedBooking(booking)}>
                            Details
                          </Button>
                        </DialogTrigger>
                        {selectedBooking && (
                          <DialogContent onClose={() => setSelectedBooking(null)}>
                            <DialogHeader>
                              <DialogTitle>Booking Details</DialogTitle>
                            </DialogHeader>
                            <div className="p-4">
                              <p><strong>Venue:</strong> {selectedBooking.venueName}</p>
                              <p><strong>User:</strong> {selectedBooking.email}</p>
                              <p><strong>Event Type:</strong> {selectedBooking.eventType}</p>
                              <p><strong>Event Date:</strong> {new Date(selectedBooking.eventDate).toLocaleDateString()}</p>
                              <p><strong>Appointment Date:</strong> {selectedBooking.appointmentDate ? new Date(selectedBooking.appointmentDate).toLocaleDateString() : "Not assigned"}</p>
                              <p><strong>Status:</strong> {selectedBooking.status}</p>
                              <p><strong>Mobile Number:</strong> {selectedBooking.mobileNumber}</p>
                            </div>
                          </DialogContent>
                        )}
                      </Dialog>

                      {/* Status Update Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => updateBookingStatus(booking._id, "Accepted")}>
                            Accept Booking
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateBookingStatus(booking._id, "Rejected")}>
                            Reject Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}