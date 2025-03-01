const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminMiddleware');
const { registerAdmin, loginAdmin, getAllBookings, addVenue } = require('../controllers/adminController'); 
const { updateBookingStatus} = require('../controllers/adminController')

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/allbookings', adminAuth, getAllBookings);
router.post('/addvenue', adminAuth, addVenue);
router.put('/bookings/:id/status', adminAuth, updateBookingStatus); 

module.exports = router;
