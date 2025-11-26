"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { JobApplication } from "@/lib/supabase/types";
import { Briefcase, CheckCircle, XCircle, Eye, Download, FileText } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ApplicationsAdmin() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      let query = supabase
        .from("job_applications")
        .select(`
          *,
          jobs:job_id (
            title
          )
        `)
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Map the data to include job title
      const mappedData = (data || []).map((app: any) => ({
        ...app,
        job_title: app.jobs?.title || "Unknown Job",
      }));

      setApplications(mappedData);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: JobApplication["status"]) => {
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      setApplications(
        applications.map((app) => (app.id === id ? { ...app, status } : app))
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update application status");
    }
  };

  const updateNotes = async (id: string) => {
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ admin_notes: notes, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      setApplications(
        applications.map((app) => (app.id === id ? { ...app, admin_notes: notes } : app))
      );
      setSelectedApp(null);
      setNotes("");
    } catch (error) {
      console.error("Error updating notes:", error);
      alert("Failed to update notes");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const { error } = await supabase.from("job_applications").delete().eq("id", id);
      if (error) throw error;
      setApplications(applications.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application");
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    reviewed: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    declined: "bg-red-100 text-red-800",
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
        <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
        <div className="flex gap-2">
          {["all", "pending", "reviewed", "approved", "declined"].map((status) => (
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

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications</h3>
          <p className="text-gray-600">No job applications found for the selected filter.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{app.applicant_name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[app.status]
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Job Position</p>
                      <p className="font-medium text-gray-900">{app.job_title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <p className="text-gray-900">{app.applicant_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <p className="text-gray-900">{app.applicant_phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Applied</p>
                      <p className="text-gray-900">
                        {format(new Date(app.created_at), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>

                  {app.cover_letter && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p>
                      <p className="text-gray-600 text-sm line-clamp-2">{app.cover_letter}</p>
                    </div>
                  )}

                  {app.files && app.files.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {app.files.map((file, index) => (
                          <a
                            key={index}
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <FileText size={16} />
                            <span className="text-sm">Document {index + 1}</span>
                            <Download size={14} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {app.admin_notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Admin Notes:</p>
                      <p className="text-gray-600 text-sm">{app.admin_notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {app.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(app.id, "approved")}
                        className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                        title="Approve"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button
                        onClick={() => updateStatus(app.id, "declined")}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Decline"
                      >
                        <XCircle size={20} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setNotes(app.admin_notes || "");
                    }}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    title="Add Notes"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Application Details</h3>
            <div className="mb-4 space-y-2">
              <p className="text-sm text-gray-600">Applicant: {selectedApp.applicant_name}</p>
              <p className="text-sm text-gray-600">Email: {selectedApp.applicant_email}</p>
              <p className="text-sm text-gray-600">Phone: {selectedApp.applicant_phone}</p>
              {selectedApp.cover_letter && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p>
                  <p className="text-sm text-gray-600">{selectedApp.cover_letter}</p>
                </div>
              )}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-4"
              placeholder="Add notes about this application..."
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedApp(null);
                  setNotes("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => updateNotes(selectedApp.id)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

