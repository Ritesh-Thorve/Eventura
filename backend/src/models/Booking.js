// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: { type: String, required: true },
//     phone: String,
//     location: String,
//     eventType: String,
//     eventDate: { type: Date, required: true },
//     venueName: String,
//     status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' }, // Add status field
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Booking', bookingSchema);

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  venueName: { type: String, required: true },
  email: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  status: { type: String, default: "Pending" },
  totalPrice: { type: Number, required: true },
  appointmentDate: Date, // Added field   
});

module.exports = mongoose.model("Booking", bookingSchema);
