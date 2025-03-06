const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminMiddleware');
const { registerAdmin, loginAdmin, getAllBookings } = require('../controllers/adminController'); 
const { addVenue, updateVenue, deleteVenue, getVenues } = require('../controllers/venueController');
const { updateBookingStatus} = require('../controllers/adminController')

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/allbookings', adminAuth, getAllBookings);
router.get('/venue', adminAuth, getVenues)
router.post('/addvenue', adminAuth, addVenue);
router.put("/updatevenue/:id",adminAuth, updateVenue);
router.delete("/delete/:id", adminAuth, deleteVenue); 
router.put('/bookings/:id/status', adminAuth, updateBookingStatus); 

module.exports = router;
