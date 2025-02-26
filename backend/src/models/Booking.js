const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true }, 
  phone: String,
  location: String,
  eventType: String,
  eventDate: { type: Date, required: true }, // Change here
  venueName: String, 
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
