const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  venueName: { type: String, required: true },
  email: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  numberOfDays: { type: Number, required: true },   
  phone: { type: String, required: true }, 
  name: { type: String, required: true }, 
  location: { type: String, required: true }, 
  status: { type: String, default: "Pending" },
  price: { type: Number, required: true },
  appointmentDate: Date,  
});

module.exports = mongoose.model("Booking", bookingSchema);