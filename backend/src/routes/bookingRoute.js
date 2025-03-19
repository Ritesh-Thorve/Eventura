const express = require('express');
const { createBooking, getAllBookings, deleteBooking } = require('../controllers/bookingController');
const  userAuthMiddleware  = require('../middleware/userAuthMiddleware');
const router = express.Router();

router.post('/addbookings', createBooking);

// GET - Fetch all bookings for the logged-in user
router.get('/mybookings', userAuthMiddleware, getAllBookings); 
router.delete('/:id', userAuthMiddleware, deleteBooking);

module.exports = router;
