"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Message } from "@/lib/supabase/types";
import { MessageCircle, Mail, Reply, Archive, Trash2, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchMessages();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel("messages_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [filter]);

  const fetchMessages = async () => {
    try {
      let query = supabase.from("messages").select("*").order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Message["status"]) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      setMessages(
        messages.map((msg) => (msg.id === id ? { ...msg, status } : msg))
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update message status");
    }
  };

  const sendResponse = async (id: string) => {
    if (!response.trim()) {
      alert("Please enter a response");
      return;
    }

    try {
      const { error } = await supabase
        .from("messages")
        .update({
          response,
          status: "replied",
          responded_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      // Here you would typically send an email with the response
      // For now, we'll just update the status
      alert("Response saved! (Email sending would be implemented here)");

      setMessages(
        messages.map((msg) =>
          msg.id === id
            ? { ...msg, response, status: "replied", responded_at: new Date().toISOString() }
            : msg
        )
      );
      setSelectedMessage(null);
      setResponse("");
    } catch (error) {
      console.error("Error sending response:", error);
      alert("Failed to send response");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
    }
  };

  const statusColors = {
    new: "bg-blue-100 text-blue-800",
    read: "bg-gray-100 text-gray-800",
    replied: "bg-green-100 text-green-800",
    archived: "bg-yellow-100 text-yellow-800",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <div className="flex gap-2">
          {["all", "new", "read", "replied", "archived"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <MessageCircle className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages</h3>
          <p className="text-gray-600">No messages found for the selected filter.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{msg.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[msg.status]
                      }`}
                    >
                      {msg.status}
                    </span>
                    {msg.status === "new" && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                        New
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={18} />
                      <span>{msg.email}</span>
                    </div>
                    <div className="text-gray-600">
                      {format(new Date(msg.created_at), "MMM dd, yyyy 'at' h:mm a")}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Message:</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{msg.message}</p>
                  </div>

                  {msg.response && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                      <p className="text-sm font-medium text-blue-700 mb-1">Your Response:</p>
                      <p className="text-blue-900 text-sm">{msg.response}</p>
                      {msg.responded_at && (
                        <p className="text-xs text-blue-600 mt-2">
                          Replied on {format(new Date(msg.responded_at), "MMM dd, yyyy 'at' h:mm a")}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {msg.status === "new" && (
                    <button
                      onClick={() => updateStatus(msg.id, "read")}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      title="Mark as Read"
                    >
                      <CheckCircle size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedMessage(msg);
                      setResponse(msg.response || "");
                    }}
                    className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                    title="Reply"
                  >
                    <Reply size={20} />
                  </button>
                  {msg.status !== "archived" && (
                    <button
                      onClick={() => updateStatus(msg.id, "archived")}
                      className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors"
                      title="Archive"
                    >
                      <Archive size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reply to Message</h3>
            <div className="mb-4 space-y-2 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {format(new Date(selectedMessage.created_at), "MMM dd, yyyy 'at' h:mm a")}
              </p>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700 mb-1">Original Message:</p>
                <p className="text-gray-700">{selectedMessage.message}</p>
              </div>
            </div>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-4"
              placeholder="Type your response here..."
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedMessage(null);
                  setResponse("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => sendResponse(selectedMessage.id)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Reply size={18} />
                Send Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

