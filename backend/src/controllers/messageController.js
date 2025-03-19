const Message = require("../models/Message");
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMessage = async (req, res) =>{
   try {
          const message = new Message(req.body);
          await message.save();
          res.status(201).json({ message: "Message sent successfully" });
      } catch (error) {
          res.status(500).json({ message: "Failed to send message", error });
      }
}

// Get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Mark a message as read
const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    message.isRead = true;
    await message.save();
    res.json({ message: "Message marked as read", updatedMessage: message });
  } catch (error) {
    res.status(500).json({ error: "Failed to update message status" });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};

// Send an email (mock function)
const sendMail = async (req, res) => {
  const { email, message } = req.body;

  // Validate input
  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_ADMIN, // Your Gmail address
        pass: process.env.EMAIL_PASS,  // App Password (not your Gmail password) creat at                     https://myaccount.google.com/apppasswords
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: email,
      subject: "Message from Eventura Admin",
      text: message, 
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    return res.json({ message: "Email sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send email" });
  }
};


module.exports = { 
  getMessages, 
  sendMessage,
  markAsRead, 
  deleteMessage, 
  sendMail 
};
