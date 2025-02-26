const Booking = require('../models/Booking');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const { name, email, phone, location, eventType, timeSlot, venueName } = req.body;

        if (!email) {
            console.error("Error: Email is missing!");
            return res.status(400).json({ message: "Email is required" });
        }

        const newBooking = new Booking({ name, email, phone, location, eventType, timeSlot, venueName });

        await newBooking.save();
        res.status(201).json({ message: "Booking successful" });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Get bookings for the logged-in user
exports.getAllBookings = async (req, res) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const userEmail = req.user.email;
        const bookings = await Booking.find({ email: userEmail });

        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Error fetching bookings" });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Ensure only the user who created the booking can delete it
        if (booking.email !== req.user.email) {
            return res.status(403).json({ message: 'Not authorized to delete this booking' });
        }

        await booking.deleteOne();
        res.status(200).json({ message: 'Booking deleted successfully' });

    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
