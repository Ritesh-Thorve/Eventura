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



module.exports = { getVenues };
