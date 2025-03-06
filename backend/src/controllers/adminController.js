const Admin = require('../models/Admin');
const Booking = require('../models/Booking'); 
const Venue = require("../models/Venue");
const Message = require("../models/Message");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//  Fetch all user bookings (updated) 
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: `Booking updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error });
  }
};

// ✅ Function to set appointment date
const setAppointmentDate = async (req, res) => {
  try {
    const { id } = req.params; // Booking ID
    const { appointmentDate } = req.body; // New date

    if (!appointmentDate) {
      return res.status(400).json({ message: "Appointment date is required" });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { appointmentDate },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Appointment date set successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error setting appointment date", error });
  }
};

//  total bookings counting
const totalBookings = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    res.json({ totalBookings });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch total bookings" });
  }
};

//total venue counting
const totalVenues = async (req, res) => {
  try {
    const totalVenues = await Venue.countDocuments();
    res.json({ totalVenues });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch total venues" });
  }
};

//new message
const newMessage = async (req, res) => {
  try {
    const newMessages = await Message.countDocuments({ isRead: false });
    res.json({ newMessages });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch new messages" });
  }
};

module.exports = { registerAdmin, loginAdmin, getAllBookings, updateBookingStatus, setAppointmentDate, totalBookings, totalVenues, newMessage };
