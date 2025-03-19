import React, { useState } from "react";
import { useAdminMessages } from "../../contexts/AdminMessageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const UserMessages = () => {
  const {
    messages,
    loading,
    markAsRead,
    deleteMessage,
    sendEmail,
  } = useAdminMessages();

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showReadModal, setShowReadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMailModal, setShowMailModal] = useState(false);
  const [emailContent, setEmailContent] = useState("");

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User Messages</h2>

      {loading ? (
        <p>Loading messages...</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id} className="border p-4 mb-2 rounded-lg shadow">
            <p><strong>Name:</strong> {msg.name}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <div className="mt-2 flex gap-2">
              <Button onClick={() => { setSelectedMessage(msg); setShowReadModal(true); }} disabled={msg.isRead}>
                Read
              </Button>
              <Button onClick={() => { setSelectedMessage(msg); setShowDeleteModal(true); }} variant="destructive">
                Delete
              </Button>
              <Button onClick={() => { setSelectedMessage(msg); setShowMailModal(true); }} variant="outline">
                Send Mail
              </Button>
            </div>
          </div>
        ))
      )}

      {/* Read Modal */}
      <Dialog open={showReadModal} onOpenChange={setShowReadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
            <DialogDescription>{selectedMessage?.message}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => { markAsRead(selectedMessage._id); setShowReadModal(false); }}>
            Mark as Read
          </Button>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogDescription>Are you sure you want to delete this message?</DialogDescription>
          </DialogHeader>
          <Button variant="destructive" onClick={() => { deleteMessage(selectedMessage._id); setShowDeleteModal(false); }}>
            Delete
          </Button>
        </DialogContent>
      </Dialog>

      {/* Send Email Modal */}
      <Dialog open={showMailModal} onOpenChange={setShowMailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email to {selectedMessage?.email}</DialogTitle>
          </DialogHeader>
          <Textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Enter message..."
            className="mb-2"
          />
          <Button onClick={() => { sendEmail(selectedMessage.email, emailContent); setShowMailModal(false); }}>
            Send
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserMessages;
