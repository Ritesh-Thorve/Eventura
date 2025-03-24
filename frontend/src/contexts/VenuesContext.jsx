import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
  const URL = import.meta.env.VITE_API_URL;
  // State for managing venues  
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // New state for VenueProfile
  const [venueDetails, setVenueDetails] = useState(null);
  const [venueLoading, setVenueLoading] = useState(true);
  const [venueError, setVenueError] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);

  // State for managing venue management  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
      hours: "9:00 AM - 6:00 PM",
    },
  });

  // Fetch venue details for VenueProfile
  const fetchVenueDetails = async (venueId) => {
    try {
      const response = await axios.get(`${URL}/venues/${venueId}`);
      setVenueDetails(response.data);
    } catch (err) {
      setVenueError("Failed to fetch venue details");
      toast.error("Failed to fetch venue details");
    } finally {
      setVenueLoading(false);
    }
  };

  
  // Handle booking appointment
  const handleBookAppointment = (user) => {
    if (!user) {
      toast.error("You need to log in to book an appointment!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }
    setShowBookingForm(true);
  };

  // Fetch all venues (from Venues component)
  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await axios.get(`${URL}/venues`);
      setVenues(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load venues");
      setLoading(false);
      toast.error("Failed to fetch venues");
    }
  };

  // Handle viewing a venue profile (from Venues component)
  const handleViewProfile = (id) => {
    const venue = venues.find((v) => v.id === id);
    if (venue) setSelectedVenue(venue);
  };

  // Functions for venue management (from existing context)
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
        hours: "9:00 AM - 6:00 PM",
      },
    });
    setErrors({});
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Venue name is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.capacity) newErrors.capacity = "Capacity is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.contact.email) newErrors.email = "Email is required";
    if (!formData.contact.phone) newErrors.phone = "Phone number is required";
    if (!formData.availability.days) newErrors.days = "At least one day must be selected";
    if (!formData.availability.hours) newErrors.hours = "Availability hours are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddVenue = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${URL}/admin/addvenue`, formData);
      setVenues([...venues, response.data]);
      setIsAddDialogOpen(false);
      resetFormData();
      toast.success("Venue added successfully!");
    } catch (error) {
      console.error("Failed to add venue:", error.response ? error.response.data : error.message);
      toast.error("Failed to add venue. Please try again.");
    }
  };

  const handleEditVenue = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(
        `${URL}/admin/updatevenue/${selectedVenue._id}`,
        formData
      );
      setVenues(venues.map((venue) => (venue._id === selectedVenue._id ? response.data.updatedVenue : venue)));
      setIsEditDialogOpen(false);
      toast.success("Venue updated successfully!");
    } catch (error) {
      console.error("Failed to update venue:", error.response ? error.response.data : error.message);
      toast.error("Failed to update venue. Please try again.");
    }
  };

  const handleDeleteVenue = async () => {
    try {
      await axios.delete(`${URL}/admin/delete/${selectedVenue._id}`);
      setVenues(venues.filter((venue) => venue._id !== selectedVenue._id));
      setIsDeleteDialogOpen(false);
      toast.success("Venue deleted successfully!");
    } catch (error) {
      console.error("Failed to delete venue:", error.response ? error.response.data : error.message);
      toast.error("Failed to delete venue. Please try again.");
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
    <VenuesContext.Provider
      value={{
        // State and functions for viewing venues
        venues,
        selectedVenue,
        loading,
        error,
        handleViewProfile,
        setSelectedVenue,

        // state and functions for VenueProfile
        venueDetails,
        venueLoading,
        venueError,
        showBookingForm,
        fetchVenueDetails,
        fetchVenues,
        handleBookAppointment,
        setShowBookingForm,

        // State and functions for managing venues
        isAddDialogOpen,
        isEditDialogOpen,
        isDeleteDialogOpen,
        searchQuery,
        errors,
        formData,
        daysOfWeek,
        filteredVenues: venues.filter((venue) => {
          const name = venue?.name?.toLowerCase() || "";
          const location = venue?.location?.toLowerCase() || "";
          return name.includes(searchQuery.toLowerCase()) || location.includes(searchQuery.toLowerCase());
        }),
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
      }}
    >
      {children}
    </VenuesContext.Provider>
  );
};

export const useVenues = () => useContext(VenuesContext);