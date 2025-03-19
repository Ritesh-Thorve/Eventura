const express = require('express');
const { sendMessage } = require('../controllers/messageController');
const router = express.Router();

router.post('/new-message', sendMessage );

module.exports = router;