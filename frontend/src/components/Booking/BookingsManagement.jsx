"use client";
import { Search } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useBookings } from "../../contexts/BookingsContext";
import { useEffect } from "react";

export default function BookingsManagement() {
  const {
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
  } = useBookings();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div className="flex flex-col p-14 gap-6">
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
          <CardTitle className="text-xl font-bold ">Venue Bookings</CardTitle>
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
                <TableRow className="text-base font-semibold">
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

                    {/* edit appointment date */}
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

                    {/* set booking status */}
                    <TableCell>
                      <Badge>{booking.status}</Badge>
                    </TableCell>

                    <TableCell className="flex gap-2">
                      {/* Detail Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedBooking(booking)} className="text-md">
                            Details
                          </Button>
                        </DialogTrigger>
                        {selectedBooking && (
                          <DialogContent onClose={() => setSelectedBooking(null)}>
                            <DialogHeader>
                              <DialogTitle className="text-xl">Booking Details</DialogTitle>
                            </DialogHeader>
                            <div className="p-4">
                              <p><strong>Venue:</strong> {selectedBooking.venueName}</p>
                              <p><strong>Price:</strong> {selectedBooking.price}/Day</p>
                              <p><strong>User:</strong> {selectedBooking.email}</p>
                              <p><strong>Event Type:</strong> {selectedBooking.eventType}</p>
                              <p><strong>Event Date:</strong> {new Date(selectedBooking.eventDate).toLocaleDateString()}</p>
                              <p><strong>Days:</strong> {selectedBooking.numberOfDays}</p>
                              <p><strong>Appointment Date:</strong> {selectedBooking.appointmentDate ? new Date(selectedBooking.appointmentDate).toLocaleDateString() : "Not assigned"}</p>
                              <p><strong>Status:</strong> {selectedBooking.status}</p>
                              <p><strong>Mobile Number:</strong> {selectedBooking.phone}</p>
                            </div>
                          </DialogContent>
                        )}
                      </Dialog>

                      {/* Status Update Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="text-md">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem  className="text-md" onClick={() => updateBookingStatus(booking._id, "Accepted")}>
                            Accept Booking
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-md" onClick={() => updateBookingStatus(booking._id, "Rejected")}>
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