const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminMiddleware');
const { registerAdmin, loginAdmin, getAllBookings, updateBookingStatus, setAppointmentDate, totalBookings, totalVenues, newMessage } = require('../controllers/adminController'); 
const { addVenue, updateVenue, deleteVenue, getVenues } = require('../controllers/venueController'); 
const Booking = require('../models/Booking');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/allbookings', adminAuth, getAllBookings);
router.get('/venue', adminAuth, getVenues)
router.post('/addvenue', adminAuth, addVenue);
router.put("/updatevenue/:id",adminAuth, updateVenue);
router.delete("/delete/:id", adminAuth, deleteVenue); 
router.put('/bookings/:id/status', adminAuth, updateBookingStatus); 
router.get('/total-bookings', adminAuth, totalBookings )
router.get('/total-venues', adminAuth, totalVenues )
router.get('/new-messages', adminAuth, newMessage )


router.put("/bookings/:id/assign-date", adminAuth, async (req, res) => {
    try {
      const { appointmentDate } = req.body;
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { appointmentDate },
        { new: true }
      );
      if (!booking) return res.status(404).json({ message: "Booking not found" });
      res.json({ message: "Appointment date assigned", booking });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  


module.exports = router;
