import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const AdminMessageContext = createContext();

export function AdminMessageProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = adminToken ? `Bearer ${adminToken}` : "";
    fetchMessages();
  }, [adminToken]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("Admin token not found");
      }

      const response = await axios.get("http://localhost:8000/api/admin/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages(response.data);
    } catch (error) {
      setError("Failed to fetch messages"); 
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/admin/messages/${id}/read`);
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, isRead: true } : msg))
      );
      toast.success("Marked as read");
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      toast.success("Message deleted");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  const sendEmail = async (email, message) => {
    try {
      await axios.post("http://localhost:8000/api/admin/send-mail", {
        email,
        message,
      });
      toast.success("Email sent successfully");
    } catch (error) {
      toast.error("Failed to send email");
    }
  };

  // New function to handle message submission from the About component
  const sendMessage = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8000/api/messages/new-message", formData);
      if (response.status === 201) {
        toast.success("Message sent successfully!");
        return true; // Indicate success
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      return false; // Indicate failure
    }
  };

  return (
    <AdminMessageContext.Provider
      value={{
        messages,
        loading,
        fetchMessages,
        markAsRead,
        deleteMessage,
        sendEmail,
        sendMessage, // Add the new function to the context
      }}
    >
      {children}
    </AdminMessageContext.Provider>
  );
}

export const useAdminMessages = () => useContext(AdminMessageContext);