const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  venueName: { type: String, required: true },
  email: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  phone: { type: String, required: true }, // Add phone field
  name: { type: String, required: true }, // Add name field
  location: { type: String, required: true }, // Add location field
  status: { type: String, default: "Pending" },
  appointmentDate: Date, // Optional field
});

module.exports = mongoose.model("Booking", bookingSchema);