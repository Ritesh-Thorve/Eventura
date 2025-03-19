const Admin = require('../models/Admin');
const Booking = require('../models/Booking');
const Venue = require('../models/Venue');
const Message = require('../models/Message');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//admin regestration only first time
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//admin login
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//geting all bookings of the user
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();  
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
};

//update booking status
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
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
};

//set an appointement date to the user
const setAppointmentDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { appointmentDate } = req.body;

    if (!appointmentDate) {
      return res.status(400).json({ message: 'Appointment date is required' });
    }

    const booking = await Booking.findByIdAndUpdate(id, { appointmentDate }, { new: true });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Appointment date set successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error setting appointment date', error: error.message });
  }
};

//geting stats of venue, bookings and messages
const getStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalVenues = await Venue.countDocuments();
    const newMessages = await Message.countDocuments({ isRead: false });

    res.json({ totalBookings, totalVenues, newMessages });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllBookings,
  updateBookingStatus,
  setAppointmentDate,
  getStats
};
