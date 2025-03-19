const express = require('express');
const { getVenues } = require('../controllers/venueController');
const { venueDetails } = require('../controllers/venueController');
const router = express.Router();

router.get('/', getVenues); 

// Get a single venue by ID
router.get('/:id', venueDetails);

module.exports = router;
 
