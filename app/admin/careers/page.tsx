"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { JobPost } from "@/lib/supabase/types";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function CareersAdmin() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", id);
      if (error) throw error;
      setJobs(jobs.filter((job) => job.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      setJobs(
        jobs.map((job) =>
          job.id === id ? { ...job, is_active: !currentStatus } : job
        )
      );
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job status");
    }
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
        <h1 className="text-3xl font-bold text-gray-900">Careers Management</h1>
        <Link
          href="/admin/careers/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Create New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first job posting</p>
          <Link
            href="/admin/careers/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Create Job Post
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {job.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                  <p className="text-gray-700 line-clamp-2">{job.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => toggleActive(job.id, job.is_active)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title={job.is_active ? "Deactivate" : "Activate"}
                  >
                    {job.is_active ? (
                      <Eye size={20} className="text-green-600" />
                    ) : (
                      <EyeOff size={20} className="text-gray-400" />
                    )}
                  </button>
                  <Link
                    href={`/admin/careers/${job.id}/edit`}
                    className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Edit size={20} className="text-blue-600" />
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(job.id)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={20} className="text-red-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Job Post?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. The job post will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

