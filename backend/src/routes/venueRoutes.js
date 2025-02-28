const express = require('express');
const { getVenues, createVenue } = require('../controllers/venueController');
const Venue = require('../models/Venue');

const router = express.Router();

router.get('/', getVenues);
router.post('/create', createVenue); 

// Get a single venue by ID
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
 
