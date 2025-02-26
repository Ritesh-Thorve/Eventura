const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true }, // Added email field
  phone: String,
  location: String,
  eventType: String,
  timeSlot: String,  
  venueName: String,
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
