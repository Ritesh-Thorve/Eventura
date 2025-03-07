const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
  location: { type: String, required: true },
  services: { type: [String], required: true },
  amenities: { type: [String], required: true },
  price: { type: Number, required: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  availability: {
    days: { type: String, required: true },
    hours: { type: String, required: true, default: "9:00 AM - 10:00 PM" }, 
  },
});

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
