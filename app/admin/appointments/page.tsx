"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Appointment } from "@/lib/supabase/types";
import { Calendar, Check, X, Clock, User, Mail, Phone, Edit, Trash2, RotateCcw, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function AppointmentsAdmin() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [notes, setNotes] = useState("");
  const [rescheduleAppointment, setRescheduleAppointment] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      let query = supabase.from("appointments").select("*");
      
      if (filter !== "all") {
        query = query.eq("status", filter);
      }
      
      query = query.order("appointment_date", { ascending: true });

      const { data, error } = await query;
      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel("appointments_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        () => {
          fetchAppointments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [filter]);

  const updateStatus = async (id: string, status: Appointment["status"]) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      await fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update appointment status");
    }
  };

  const handleReschedule = async () => {
    if (!rescheduleAppointment || !newDate || !newTime) {
      alert("Please select both date and time");
      return;
    }

    try {
      const { error } = await supabase
        .from("appointments")
        .update({
          appointment_date: newDate,
          appointment_time: newTime,
          status: "rescheduled",
          updated_at: new Date().toISOString(),
        })
        .eq("id", rescheduleAppointment.id);

      if (error) throw error;
      setRescheduleAppointment(null);
      setNewDate("");
      setNewTime("");
      await fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      alert("Failed to reschedule appointment");
    }
  };

  const handleComplete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({
          status: "completed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      await fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error("Error completing appointment:", error);
      alert("Failed to complete appointment");
    }
  };

  const updateNotes = async (id: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ notes, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      setAppointments(
        appointments.map((apt) => (apt.id === id ? { ...apt, notes } : apt))
      );
      setSelectedAppointment(null);
      setNotes("");
    } catch (error) {
      console.error("Error updating notes:", error);
      alert("Failed to update notes");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const { error } = await supabase.from("appointments").delete().eq("id", id);
      if (error) throw error;
      setAppointments(appointments.filter((apt) => apt.id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment");
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    rescheduled: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-gray-100 text-gray-800",
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
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "rescheduled", "cancelled", "completed"].map(
            (status) => (
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
            )
          )}
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments</h3>
          <p className="text-gray-600">No appointments found for the selected filter.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments.map((apt) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{apt.client_name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[apt.status]
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={18} />
                      <span>{apt.client_email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={18} />
                      <span>{apt.client_phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={18} />
                      <span>
                        {format(new Date(apt.appointment_date), "MMM dd, yyyy")} at{" "}
                        {apt.appointment_time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={18} />
                      <span>{apt.department}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Subject:</p>
                    <p className="text-gray-600">{apt.subject}</p>
                  </div>

                  {apt.reason && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Reason:</p>
                      <p className="text-gray-600">{apt.reason}</p>
                    </div>
                  )}

                  {apt.notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                      <p className="text-gray-600 text-sm">{apt.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {apt.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(apt.id, "confirmed")}
                        className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                        title="Confirm"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setRescheduleAppointment(apt);
                          setNewDate(apt.appointment_date);
                          setNewTime(apt.appointment_time);
                        }}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Reschedule"
                      >
                        <RotateCcw size={20} />
                      </button>
                      <button
                        onClick={() => updateStatus(apt.id, "cancelled")}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Cancel"
                      >
                        <X size={20} />
                      </button>
                    </>
                  )}
                  {apt.status === "confirmed" && (
                    <>
                      <button
                        onClick={() => {
                          setRescheduleAppointment(apt);
                          setNewDate(apt.appointment_date);
                          setNewTime(apt.appointment_time);
                        }}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Reschedule"
                      >
                        <RotateCcw size={20} />
                      </button>
                      <button
                        onClick={() => handleComplete(apt.id)}
                        className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                        title="Mark as Completed"
                      >
                        <CheckCircle size={20} />
                      </button>
                    </>
                  )}
                  {apt.status === "rescheduled" && (
                    <>
                      <button
                        onClick={() => {
                          setRescheduleAppointment(apt);
                          setNewDate(apt.appointment_date);
                          setNewTime(apt.appointment_time);
                        }}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Reschedule Again"
                      >
                        <RotateCcw size={20} />
                      </button>
                      <button
                        onClick={() => handleComplete(apt.id)}
                        className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                        title="Mark as Completed"
                      >
                        <CheckCircle size={20} />
                      </button>
                    </>
                  )}
                  {apt.status !== "completed" && apt.status !== "cancelled" && (
                    <button
                      onClick={() => {
                        setSelectedAppointment(apt);
                        setNotes(apt.notes || "");
                      }}
                      className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                      title="Add Notes"
                    >
                      <Edit size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(apt.id)}
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

      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-4"
              placeholder="Add notes about this appointment..."
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedAppointment(null);
                  setNotes("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => updateNotes(selectedAppointment.id)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {rescheduleAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reschedule Appointment</h3>
            <p className="text-sm text-gray-600 mb-4">
              Current: {format(new Date(rescheduleAppointment.appointment_date), "MMM dd, yyyy")} at {rescheduleAppointment.appointment_time}
            </p>
            
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Time</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setRescheduleAppointment(null);
                  setNewDate("");
                  setNewTime("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

