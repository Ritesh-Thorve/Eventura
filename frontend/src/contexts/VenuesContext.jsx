import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
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

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/venues");
      setVenues(response.data);
    } catch (error) {
      console.error("Failed to fetch venues:", error);
      setVenues([]);
    }
  };

  const filteredVenues = venues
    .filter((venue) => venue)
    .filter((venue) => {
      const name = venue?.name?.toLowerCase() || "";
      const location = venue?.location?.toLowerCase() || "";
      return name.includes(searchQuery.toLowerCase()) || location.includes(searchQuery.toLowerCase());
    });

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
      const response = await axios.post("http://localhost:8000/api/admin/addvenue", formData);
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
        `http://localhost:8000/api/admin/updatevenue/${selectedVenue._id}`,
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
      await axios.delete(`http://localhost:8000/api/admin/delete/${selectedVenue._id}`);
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
      }}
    >
      {children}
    </VenuesContext.Provider>
  );
};

export const useVenues = () => useContext(VenuesContext);