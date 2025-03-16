const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminMiddleware');
const {
  registerAdmin,
  loginAdmin,
  getAllBookings,
  updateBookingStatus,
  setAppointmentDate,
  getStats
} = require('../controllers/adminController'); 
const { addVenue, updateVenue, deleteVenue, getVenues } = require('../controllers/venueController');
const { getMessages, markAsRead, deleteMessage, sendMail } = require("../controllers/messageController");

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

router.get('/allbookings', adminAuth, getAllBookings);
router.put('/bookings/:id/status', adminAuth, updateBookingStatus);
router.put('/bookings/:id/assign-date', adminAuth, setAppointmentDate);

router.get('/venues', adminAuth, getVenues);
router.post('/addvenue', adminAuth, addVenue);
router.put('/updatevenue/:id', adminAuth, updateVenue);
router.delete('/delete/:id', adminAuth, deleteVenue);


router.get('/getstats', adminAuth, getStats); 
router.get("/messages", adminAuth, getMessages);
router.put("/messages/:id/read", adminAuth, markAsRead);
router.delete("/messages/:id", adminAuth, deleteMessage);
router.post("/send-mail", adminAuth, sendMail);

module.exports = router;
