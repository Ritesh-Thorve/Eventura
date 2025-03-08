const Message = require("../models/Message");

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
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Mock email sending logic
  try {
    console.log(`Sending email to ${email}...`);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { getMessages, markAsRead, deleteMessage, sendMail };
