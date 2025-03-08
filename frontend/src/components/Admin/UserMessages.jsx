"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function UserMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showReadModal, setShowReadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMailModal, setShowMailModal] = useState(false);
  const [emailContent, setEmailContent] = useState("");

  // Fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get("http://localhost:8000/api/admin/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (err) {
        setError("Failed to fetch messages");
        toast.error("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Open the read modal
  const openReadModal = (message) => {
    setSelectedMessage(message);
    setShowReadModal(true);
  };

  // Mark as read after opening the modal
  const handleRead = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`http://localhost:8000/api/admin/messages/${selectedMessage._id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.map(msg => msg._id === selectedMessage._id ? { ...msg, isRead: true } : msg));
      toast.success("Message marked as read");
      setShowReadModal(false);
    } catch (err) {
      toast.error("Failed to mark message as read");
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (message) => {
    setSelectedMessage(message);
    setShowDeleteModal(true);
  };

  // Delete the message
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:8000/api/admin/messages/${selectedMessage._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.filter(msg => msg._id !== selectedMessage._id));
      toast.success("Message deleted successfully");
      setShowDeleteModal(false);
    } catch (err) {
      toast.error("Failed to delete message");
    }
  };

  // Open mail modal
  const openMailModal = (message) => {
    setSelectedMessage(message);
    setShowMailModal(true);
  };

  // Send email
  const handleSendMail = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post("http://localhost:8000/api/admin/send-mail", {
        email: selectedMessage.email,
        content: emailContent,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Email sent successfully");
      setShowMailModal(false);
    } catch (err) {
      toast.error("Failed to send email");
    }
  };

  return (
    <div>
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>User Messages</CardTitle>
          <CardDescription>Manage all user messages</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-700">Loading messages...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-gray-700">No messages found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message._id}>
                    <TableCell>{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.message}</TableCell>
                    <TableCell>
                      <Button onClick={() => openReadModal(message)} disabled={message.isRead}>
                        Read
                      </Button>
                      <Button onClick={() => openDeleteModal(message)} variant="destructive" className="ml-2">
                        Delete
                      </Button>
                      <Button onClick={() => openMailModal(message)} variant="outline" className="ml-2">
                        Send Mail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Read Message Modal */}
      {showReadModal && (
        <Dialog open={showReadModal} onOpenChange={setShowReadModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message from {selectedMessage.name}</DialogTitle>
              <DialogDescription>{selectedMessage.message}</DialogDescription>
            </DialogHeader>
            <Button onClick={handleRead}>Mark as Read</Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>Are you sure you want to delete this message?</DialogDescription>
            </DialogHeader>
            <Button onClick={handleDelete} variant="destructive">Delete</Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Send Mail Modal */}
      {showMailModal && (
        <Dialog open={showMailModal} onOpenChange={setShowMailModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Email to {selectedMessage.email}</DialogTitle>
            </DialogHeader>
            <Textarea 
              placeholder="Enter your message..." 
              value={emailContent} 
              onChange={(e) => setEmailContent(e.target.value)} 
            />
            <Button onClick={handleSendMail}>Send Email</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
