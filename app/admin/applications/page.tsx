"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { JobApplication, JobPost } from "@/lib/supabase/types";
import {
  Briefcase,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  FileText,
  Search,
  Filter,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ApplicationWithJob extends JobApplication {
  job?: JobPost;
}

interface JobOption {
  id: string;
  title: string;
  slug: string;
}

export default function ApplicationsAdmin() {
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [allApplications, setAllApplications] = useState<ApplicationWithJob[]>([]);
  const [jobs, setJobs] = useState<JobOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobFilter, setJobFilter] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<ApplicationWithJob | null>(null);
  const [notes, setNotes] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [filter, searchQuery, jobFilter, allApplications]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase.from("jobs").select("id, title, slug").order("title");
      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select(
          `
          *,
          jobs:job_id (
            id,
            title,
            slug,
            department,
            location
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      const mappedData = (data || []).map((app: any) => ({
        ...app,
        job: app.jobs || null,
        job_title: app.jobs?.title || "Unknown Job",
      }));

      setAllApplications(mappedData);
      setApplications(mappedData);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...allApplications];

    // Status filter
    if (filter !== "all") {
      filtered = filtered.filter((app) => app.status === filter);
    }

    // Job filter
    if (jobFilter !== "all") {
      filtered = filtered.filter((app) => app.job_id === jobFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.applicant_name.toLowerCase().includes(query) ||
          app.applicant_email.toLowerCase().includes(query) ||
          app.applicant_phone.toLowerCase().includes(query) ||
          app.job_title?.toLowerCase().includes(query) ||
          app.job?.department?.toLowerCase().includes(query)
      );
    }

    setApplications(filtered);
  };

  const updateStatus = async (id: string, status: JobApplication["status"]) => {
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      setAllApplications(
        allApplications.map((app) => (app.id === id ? { ...app, status } : app))
      );
      if (selectedApp?.id === id) {
        setSelectedApp({ ...selectedApp, status });
      }
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
      setAllApplications(
        allApplications.map((app) => (app.id === id ? { ...app, admin_notes: notes } : app))
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
      setAllApplications(allApplications.filter((app) => app.id !== id));
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-600 mt-1">
            {applications.length} application{applications.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, phone, or job title..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Filter size={18} />
            Filters
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Position</label>
                <select
                  value={jobFilter}
                  onChange={(e) => setJobFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Jobs</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600">
            {searchQuery || filter !== "all" || jobFilter !== "all"
              ? "Try adjusting your search or filters."
              : "No job applications have been submitted yet."}
          </p>
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
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <h3 className="text-xl font-semibold text-gray-900">{app.applicant_name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[app.status]
                      }`}
                    >
                      {app.status}
                    </span>
                    {app.job && (
                      <Link
                        href={`/careers/${app.job.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <span>{app.job.title}</span>
                        <ExternalLink size={14} />
                      </Link>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                      <p className="text-gray-900 flex items-center gap-1">
                        <Calendar size={14} className="text-gray-400" />
                        {format(new Date(app.created_at), "MMM dd, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    {app.job && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Department</p>
                        <p className="text-gray-900">{app.job.department}</p>
                      </div>
                    )}
                  </div>

                  {app.cover_letter && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p>
                      <p className="text-gray-600 text-sm line-clamp-2">{app.cover_letter}</p>
                    </div>
                  )}

                  {/* Custom Responses */}
                  {app.custom_responses && Object.keys(app.custom_responses).length > 0 && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm font-medium text-blue-900 mb-2">Additional Information:</p>
                      <div className="space-y-2">
                        {Object.entries(app.custom_responses).map(([key, value]) => {
                          // Find the field to get its label
                          const field = app.job?.application_fields?.find((f) => f.id === key);
                          const label = field?.label || key;

                          // Check if value is an array (file URLs)
                          if (Array.isArray(value)) {
                            return (
                              <div key={key} className="text-sm">
                                <span className="font-medium text-blue-800">{label}:</span>
                                <div className="mt-1 flex flex-wrap gap-2">
                                  {value.map((url: string, idx: number) => (
                                    <a
                                      key={idx}
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 px-2 py-1 bg-white text-blue-700 rounded text-xs hover:bg-blue-100"
                                    >
                                      <FileText size={12} />
                                      File {idx + 1}
                                      <Download size={12} />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div key={key} className="text-sm">
                              <span className="font-medium text-blue-800">{label}:</span>{" "}
                              <span className="text-blue-700">{String(value)}</span>
                            </div>
                          );
                        })}
                      </div>
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
                    title="View Details / Add Notes"
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

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Application Details</h3>
            <div className="mb-4 space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Applicant</p>
                <p className="text-gray-900">{selectedApp.applicant_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-gray-900">{selectedApp.applicant_email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-gray-900">{selectedApp.applicant_phone}</p>
              </div>
              {selectedApp.job && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Job Position</p>
                  <Link
                    href={`/careers/${selectedApp.job.slug}`}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    {selectedApp.job.title}
                    <ExternalLink size={14} />
                  </Link>
                </div>
              )}
              {selectedApp.cover_letter && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedApp.cover_letter}</p>
                </div>
              )}
              {selectedApp.custom_responses &&
                Object.keys(selectedApp.custom_responses).length > 0 && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-2">Additional Information:</p>
                    <div className="space-y-2">
                      {Object.entries(selectedApp.custom_responses).map(([key, value]) => {
                        const field = selectedApp.job?.application_fields?.find((f) => f.id === key);
                        const label = field?.label || key;

                        if (Array.isArray(value)) {
                          return (
                            <div key={key} className="text-sm">
                              <span className="font-medium text-blue-800">{label}:</span>
                              <div className="mt-1 flex flex-wrap gap-2">
                                {value.map((url: string, idx: number) => (
                                  <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-white text-blue-700 rounded text-xs hover:bg-blue-100"
                                  >
                                    <FileText size={12} />
                                    File {idx + 1}
                                    <Download size={12} />
                                  </a>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div key={key} className="text-sm">
                            <span className="font-medium text-blue-800">{label}:</span>{" "}
                            <span className="text-blue-700">{String(value)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Add notes about this application..."
              />
            </div>
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
          </motion.div>
        </div>
      )}
    </div>
  );
}
