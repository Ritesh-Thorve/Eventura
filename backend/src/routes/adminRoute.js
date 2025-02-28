const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminMiddleware');
const { registerAdmin, loginAdmin, getAllBookings, addVenue } = require('../controllers/adminController'); 

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/allbookings', adminAuth, getAllBookings);
router.post('/addvenue', adminAuth, addVenue);

module.exports = router;
