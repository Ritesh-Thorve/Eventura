const Admin = require('../models/Admin');
const Booking = require('../models/Booking');
const Venue = require('../models/Venue');
const User = require("../models/User");
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

// ✅ Fetch all user bookings (updated) 
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




// ✅ Admin adds a new venue
const addVenue = async (req, res) => {
  try {
    const { name, location, capacity, price } = req.body;
    const newVenue = new Venue({ name, location, capacity, price });
    await newVenue.save();

    res.status(201).json({ message: 'Venue added successfully', venue: newVenue });
  } catch (error) {
    res.status(500).json({ message: 'Error adding venue' });
  }
};

module.exports = { registerAdmin, loginAdmin, getAllBookings, addVenue };
