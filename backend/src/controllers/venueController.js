const Venue = require("../models/Venue");

// Get all venues
const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new venue
const createVenue = async (req, res) => {
  try {
    const newVenue = new Venue(req.body);
    await newVenue.save();
    res.status(201).json(newVenue);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};



module.exports = { getVenues, createVenue };
