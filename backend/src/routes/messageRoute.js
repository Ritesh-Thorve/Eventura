const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.post('/new-message', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send message", error });
    }
});



module.exports = router;