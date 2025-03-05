"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      toast.error("Failed to fetch bookings");
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

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesSearch = searchQuery
      ? booking.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return <Badge className="bg-green-500 hover:bg-green-600">Accepted</Badge>;
      case "Rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
    }
  };

  return (
    <div className="flex flex-col p-24 gap-6">
      <ToastContainer />
      
      {/* Filters Section */}
      <div className="flex justify-between items-center mb-4">
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.venueName}</TableCell>
                    <TableCell>{booking.email}</TableCell>
                    <TableCell>{booking.eventType}</TableCell>
                    <TableCell>{new Date(booking.eventDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => { setSelectedBooking(booking); setDetailsOpen(true); }}>
                        Details
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
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

      {/* Booking Details Modal */}
      {selectedBooking && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="p-6 rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Booking Details</DialogTitle>
              <DialogDescription className="text-gray-500">Detailed information about this booking</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <p><strong>Venue:</strong> {selectedBooking.venueName}</p>
              <p><strong>Email:</strong> {selectedBooking.email}</p>
              <p><strong>Mobile No:</strong> {selectedBooking.mobile || "N/A"}</p>
              <p><strong>Date:</strong> {new Date(selectedBooking.eventDate).toLocaleDateString()}</p>
              <p><strong>Event Type:</strong> {selectedBooking.eventType || "N/A"}</p>
              <p><strong>Total Price:</strong> ${selectedBooking.totalPrice || "N/A"}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedBooking.status)}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
