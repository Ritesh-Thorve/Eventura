const Booking = require("../models/Booking");
const Venue = require("../models/Venue");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, venueName, price, email, eventType, eventDate, numberOfDays, phone, name, location, appointmentDate } = req.body;

    // Validate required fields
    if (!userId || !venueName || !price || !email || !eventType || !eventDate || !numberOfDays || !phone || !name || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBooking = new Booking({
      userId,
      venueName,
      price,
      email,
      eventType,
      eventDate,
      numberOfDays,
      phone,
      name,
      location,
      appointmentDate,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all bookings for the logged-in user (with venue contact info)
exports.getAllBookings = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const userEmail = req.user.email;
    const bookings = await Booking.find({ email: userEmail }).lean();

    // Fetch venue contact info for each booking
    const bookingsWithVenueDetails = await Promise.all(
      bookings.map(async (booking) => {
        const venue = await Venue.findOne({ name: booking.venueName }).lean();
        return {
          ...booking,
          venueContactEmail: venue?.contact?.email || "Not Available",
          venueContactPhone: venue?.contact?.phone || "Not Available",
        };
      })
    );

    res.status(200).json(bookingsWithVenueDetails);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure only the user who created the booking can delete it
    if (booking.email !== req.user.email) {
      return res.status(403).json({ message: "Not authorized to delete this booking" });
    }

    await booking.deleteOne();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};
