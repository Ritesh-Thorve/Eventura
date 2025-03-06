"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get("http://localhost:8000/api/admin/allmessages", {
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
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message._id}>
                    <TableCell>{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.message}</TableCell>
                    <TableCell>
                      {message.isRead ? (
                        <span className="text-green-600">Read</span>
                      ) : (
                        <span className="text-red-600">Unread</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}