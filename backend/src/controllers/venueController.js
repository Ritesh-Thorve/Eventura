const mongoose = require("mongoose");
const Venue = require("../models/Venue");

// Get all venues
const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a new venue
const addVenue = async (req, res) => {
  try {
    console.log("Received venue data:", req.body); 

    const venue = new Venue(req.body);
    await venue.save();

    res.status(201).json({ message: "Venue added successfully", venue });
  } catch (error) { 
    res.status(500).json({ message: "Failed to add venue", error: error.message });
  }
};

// Update a venue
const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
 

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid venue ID" });
    }

    const updatedVenue = await Venue.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.json({ message: "Venue updated successfully", updatedVenue });
  } catch (error) { 
    res.status(500).json({ message: "Failed to update venue", error: error.message });
  }
};

// Delete a venue
const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid venue ID" });
    }

    const deletedVenue = await Venue.findByIdAndDelete(id);

    if (!deletedVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.json({ message: "Venue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete venue", error: error.message });
  }
};

module.exports = { getVenues, addVenue, updateVenue, deleteVenue };
