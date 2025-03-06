"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Plus, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";



export default function VenuesManagement() {
  const [venues, setVenues] = useState([]); // 👈 Ensure venues is an array
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Days of week array for availability selection
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Form state for adding/editing venues
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    capacity: "",
    location: "",
    services: [],
    amenities: [],
    price: "",
    contact: {
      phone: "",
      email: "",
    },
    availability: {
      days: "",
      hours: "",
    },
  });

  // Fetch venues from the backend
  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/venues");
  
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }
  
      setVenues(response.data);
    } catch (error) {
      console.error("Failed to fetch venues:", error);
      setVenues([]); // 👈 Ensure it's always an array, even on failure
    }
  };
  


  // Filter venues based on search query
  const filteredVenues = Array.isArray(venues) && venues.length > 0
  ? venues.filter(
      (venue) =>
        venue?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue?.location?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];



  const resetFormData = () => {
    setFormData({
      name: "",
      imageUrl: "",
      description: "",
      capacity: "",
      location: "",
      services: [],
      amenities: [],
      price: "",
      contact: {
        phone: "",
        email: "",
      },
      availability: {
        days: "",
        hours: "",
      },
    });
  };

  const openAddDialog = () => {
    resetFormData();
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (venue) => {
    setSelectedVenue(venue);
    setFormData({ ...venue });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (venue) => {
    setSelectedVenue(venue);
    setIsDeleteDialogOpen(true);
  };

  const handleAddVenue = async () => {
    if (!formData.availability.hours) {
      formData.availability.hours = "9:00 AM - 6:00 PM"; // 👈 Default value if empty
    }
  
    try {
      console.log("Sending venue data:", JSON.stringify(formData, null, 2));
  
      const response = await axios.post("http://localhost:8000/api/admin/addvenue", formData);
      setVenues([...venues, response.data]);
      setIsAddDialogOpen(false);
      resetFormData();
    } catch (error) {
      console.error("Failed to add venue:", error.response ? error.response.data : error.message);
    }
  };
  
  
  

  const handleEditVenue = async () => {
    try {
      if (!selectedVenue || !selectedVenue._id) {
        console.error("Venue ID is missing");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:8000/api/admin/updatevenue/${selectedVenue._id}`,
        formData
      );
  
      setVenues(
        venues.map((venue) => 
          venue._id === selectedVenue._id ? response.data.updatedVenue : venue
        )
      );
  
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update venue:", error.response ? error.response.data : error.message);
    }
  };
  

  const handleDeleteVenue = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/delete/${selectedVenue._id}`);
      setVenues(venues.filter((venue) => venue._id !== selectedVenue._id));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete venue:", error.response ? error.response.data : error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number.parseInt(value) || 0,
    });
  };

  const handleServicesChange = (e) => {
    setFormData({
      ...formData,
      services: e.target.value.split(",").map((item) => item.trim()),
    });
  };

  const handleAmenitiesChange = (e) => {
    setFormData({
      ...formData,
      amenities: e.target.value.split(",").map((item) => item.trim()),
    });
  };

  const toggleAvailabilityDay = (day) => {
    const currentAvailability = formData.availability.days.split(",").filter((d) => d.trim() !== "");
    if (currentAvailability.includes(day)) {
      setFormData({
        ...formData,
        availability: {
          ...formData.availability,
          days: currentAvailability.filter((d) => d !== day).join(","),
        },
      });
    } else {
      setFormData({
        ...formData,
        availability: {
          ...formData.availability,
          days: [...currentAvailability, day].join(","),
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 p-14">
      {/* Search and Add Venue Button */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search venues..."
              className="pl-8 md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4 " /> Add Venue
        </Button>
      </div>

      {/* Venues Table */}
      <Card>
        <CardHeader>
          <CardTitle>Venues Management</CardTitle>
          <CardDescription>Manage, edit, and add new venues</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Venue</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden md:table-cell">Capacity</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVenues.map((venue) => (
                <TableRow key={venue._id}>
                  <TableCell>
                    <div className="font-medium">{venue.name}</div>
                    <div className="text-sm text-muted-foreground md:hidden">{venue.location}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{venue.location}</TableCell>
                  <TableCell className="hidden md:table-cell">{venue.capacity} people</TableCell>
                  <TableCell className="hidden md:table-cell">₹{venue.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEditDialog(venue)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(venue)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredVenues.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No venues found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Venue Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Add New Venue</DialogTitle>
            <DialogDescription>Enter the details for the new venue</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="contact">Contact & Availability</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Venue Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="/images/venue.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </TabsContent>
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleNumberChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" name="price" type="number" value={formData.price} onChange={handleNumberChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="services">Services (comma separated)</Label>
                <Textarea
                  id="services"
                  rows={3}
                  value={formData.services.join(", ")}
                  onChange={handleServicesChange}
                  placeholder="Catering, Decoration, Sound System, Photography"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities (comma separated)</Label>
                <Textarea
                  id="amenities"
                  rows={3}
                  value={formData.amenities.join(", ")}
                  onChange={handleAmenitiesChange}
                  placeholder="WiFi, Parking, AC, Projector"
                />
              </div>
            </TabsContent>
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="contact.email"
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, phone: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Availability (Select Days)</Label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={formData.availability.days.includes(day) ? "default" : "outline"}
                      onClick={() => toggleAvailabilityDay(day)}
                      className="h-8"
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddVenue}>Add Venue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Venue Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Edit Venue</DialogTitle>
            <DialogDescription>Update the venue details</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="contact">Contact & Availability</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Venue Name</Label>
                  <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input id="edit-location" name="location" value={formData.location} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-imageUrl">Image URL</Label>
                <Input
                  id="edit-imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="/images/venue.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </TabsContent>
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity">Capacity</Label>
                  <Input
                    id="edit-capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleNumberChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleNumberChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-services">Services (comma separated)</Label>
                <Textarea
                  id="edit-services"
                  rows={3}
                  value={formData.services.join(", ")}
                  onChange={handleServicesChange}
                  placeholder="Catering, Decoration, Sound System, Photography"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-amenities">Amenities (comma separated)</Label>
                <Textarea
                  id="edit-amenities"
                  rows={3}
                  value={formData.amenities.join(", ")}
                  onChange={handleAmenitiesChange}
                  placeholder="WiFi, Parking, AC, Projector"
                />
              </div>
            </TabsContent>
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    name="contact.email"
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, phone: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Availability (Select Days)</Label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={formData.availability.days.includes(day) ? "default" : "outline"}
                      onClick={() => toggleAvailabilityDay(day)}
                      className="h-8"
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditVenue}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Venue Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Venue</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedVenue?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteVenue}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}