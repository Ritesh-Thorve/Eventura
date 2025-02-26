const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// POST - Create a booking
router.post('/addbookings', createBooking);

// GET - Fetch all bookings for the logged-in user
router.get('/mybookings', protect, getAllBookings);

// DELETE - Delete a booking (fixed route)
router.delete('/:id', protect, deleteBooking);

module.exports = router;
