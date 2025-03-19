"use client";
import React from "react";
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
import { useVenues } from "../../contexts/VenuesContext";

export default function VenuesManagement() {
  const {
    venues,
    isAddDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    selectedVenue,
    searchQuery,
    errors,
    formData,
    daysOfWeek,
    filteredVenues,
    setSearchQuery,
    setErrors,
    setFormData,
    openAddDialog,
    openEditDialog,
    openDeleteDialog,
    handleAddVenue,
    handleEditVenue,
    handleDeleteVenue,
    handleInputChange,
    handleNumberChange,
    handleServicesChange,
    handleAmenitiesChange,
    toggleAvailabilityDay,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
  } = useVenues();

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
        <Button className="bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out disabled:bg-indigo-400" onClick={openAddDialog}>
          <Plus className="mr-2 h-7 w-7" /> Add Venue
        </Button>
      </div>

      {/* Venues Table */}
      <Card className="overflow-x-auto mt-5">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Venues Management</CardTitle>
          <CardDescription className="text-sm mt-2">Manage, edit, and add new venues</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="text-lg">
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
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={errors.location ? "border-red-500" : ""}
                  />
                  {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
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
                    className={errors.capacity ? "border-red-500" : ""}
                  />
                  {errors.capacity && <p className="text-sm text-red-500">{errors.capacity}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleNumberChange}
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
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
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
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
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability-hours">Availability Hours</Label>
                <Input
                  id="availability-hours"
                  name="availability.hours"
                  value={formData.availability.hours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availability: { ...formData.availability, hours: e.target.value },
                    })
                  }
                  className={errors.hours ? "border-red-500" : ""}
                />
                {errors.hours && <p className="text-sm text-red-500">{errors.hours}</p>}
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
                {errors.days && <p className="text-sm text-red-500">{errors.days}</p>}
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddVenue} disabled={Object.keys(errors).length > 0}>
              Add Venue
            </Button>
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
                  <Input
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={errors.location ? "border-red-500" : ""}
                  />
                  {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
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
                    className={errors.capacity ? "border-red-500" : ""}
                  />
                  {errors.capacity && <p className="text-sm text-red-500">{errors.capacity}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price (₹)</Label>
                  <Input
                    id="edit-price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleNumberChange}
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
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
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
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
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-availability-hours">Availability Hours</Label>
                <Input
                  id="edit-availability-hours"
                  name="availability.hours"
                  value={formData.availability.hours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availability: { ...formData.availability, hours: e.target.value },
                    })
                  }
                  className={errors.hours ? "border-red-500" : ""}
                />
                {errors.hours && <p className="text-sm text-red-500">{errors.hours}</p>}
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
                {errors.days && <p className="text-sm text-red-500">{errors.days}</p>}
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out disabled:bg-indigo-400" onClick={handleEditVenue} disabled={Object.keys(errors).length > 0}>
              Save Changes
            </Button>
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