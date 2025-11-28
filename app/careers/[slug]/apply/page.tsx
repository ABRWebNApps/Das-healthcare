"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { JobPost } from "@/lib/supabase/types";
import Navbar from "@/components/Navigation";
import DynamicApplicationForm from "@/components/DynamicApplicationForm";
import Link from "next/link";
import { ArrowLeft, CheckCircle, User, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function JobApplyPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [standardFormData, setStandardFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchJob();
  }, [slug]);

  const fetchJob = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      setJob(data);
    } catch (error) {
      console.error("Error fetching job:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File, jobId: string, fieldId: string): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${jobId}/${fieldId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("applications")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      // Check if it's a bucket not found error
      if (error.message?.toLowerCase().includes("bucket") || error.message?.toLowerCase().includes("not found")) {
        throw new Error(
          "Storage bucket 'applications' not found. Please contact the administrator to set up the storage bucket in Supabase."
        );
      }
      throw error;
    }

    const { data: urlData } = supabase.storage.from("applications").getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleSubmit = async (
    customData: Record<string, any>,
    customFiles: Record<string, File[]>
  ) => {
    if (!job) return;

    // Validate standard fields
    if (!standardFormData.name || !standardFormData.email || !standardFormData.phone) {
      alert("Please fill in all required fields (Name, Email, Phone)");
      return;
    }

    setSubmitting(true);

    try {
      // Upload all files from custom fields
      const allFileUrls: string[] = [];
      const customResponses: Record<string, any> = { ...customData };
      let fileUploadError: string | null = null;

      for (const [fieldId, fieldFiles] of Object.entries(customFiles)) {
        if (fieldFiles && fieldFiles.length > 0) {
          const uploadedUrls: string[] = [];
          for (const file of fieldFiles) {
            try {
              const url = await uploadFile(file, job.id, fieldId);
              uploadedUrls.push(url);
              allFileUrls.push(url);
            } catch (uploadError: any) {
              // If bucket error, stop and show error
              if (uploadError.message?.toLowerCase().includes("bucket") || 
                  uploadError.message?.toLowerCase().includes("storage")) {
                fileUploadError = uploadError.message;
                break;
              }
              // For other upload errors, log but continue
              console.error(`Error uploading file ${file.name}:`, uploadError);
            }
          }
          // Store file URLs in custom responses
          if (uploadedUrls.length > 0) {
            customResponses[fieldId] = uploadedUrls;
          }
        }
      }

      // If there was a bucket error, don't proceed with submission
      if (fileUploadError) {
        throw new Error(fileUploadError);
      }

      // Create application record
      const { error } = await supabase.from("job_applications").insert({
        job_id: job.id,
        job_title: job.title,
        applicant_name: standardFormData.name,
        applicant_email: standardFormData.email,
        applicant_phone: standardFormData.phone,
        files: allFileUrls.length > 0 ? allFileUrls : null,
        custom_responses: Object.keys(customResponses).length > 0 ? customResponses : null,
        status: "pending",
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push(`/careers/${slug}`);
      }, 3000);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      
      // Extract error message and details
      const errorMessage = error?.message || "Failed to submit application. Please try again.";
      const errorCode = error?.code || error?.error_code || "";
      const errorDetails = error?.details || error?.hint || "";
      
      // Log full error for debugging
      console.error("Full error details:", {
        message: errorMessage,
        code: errorCode,
        details: errorDetails,
        fullError: error
      });
      
      // Provide more helpful error messages based on error type
      if (errorMessage.toLowerCase().includes("bucket") || 
          errorMessage.toLowerCase().includes("storage") ||
          errorCode === "PGRST301") {
        alert(
          "Storage Configuration Error:\n\n" +
          "The file storage bucket is not configured. Please contact the website administrator.\n\n" +
          "Administrators: Please create a bucket named 'applications' in your Supabase Storage dashboard."
        );
      } else if (errorMessage.toLowerCase().includes("column") || 
                 errorMessage.toLowerCase().includes("schema cache") ||
                 errorMessage.toLowerCase().includes("job_title")) {
        alert(
          "Database Schema Error:\n\n" +
          "The database table is missing required columns. Please run the migration script:\n\n" +
          "MIGRATION_ADD_JOB_TITLE_COLUMN.sql\n\n" +
          "This will add the missing 'job_title' column to the job_applications table."
        );
      } else if (errorMessage.toLowerCase().includes("row-level security") ||
                 errorMessage.toLowerCase().includes("policy")) {
        alert(
          "Permission Error:\n\n" +
          "The database security policies are not configured correctly. Please check:\n\n" +
          "1. RLS policies for job_applications table\n" +
          "2. Storage policies for the 'applications' bucket\n\n" +
          "See DATABASE_SETUP.md for the correct SQL policies."
        );
      } else {
        // Show detailed error message
        const fullErrorMessage = errorDetails 
          ? `${errorMessage}\n\nDetails: ${errorDetails}`
          : errorMessage;
        alert(`Error: ${fullErrorMessage}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)]">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)]">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)]">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for applying to {job.title}. We'll review your application and get back to
              you soon.
            </p>
            <Link
              href={`/careers/${slug}`}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Job Details
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href={`/careers/${slug}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Job Details
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
          <p className="text-gray-600 mb-8">
            {job.department} • {job.location} • {job.type}
          </p>

          <div className="space-y-8">
            {/* Standard Fields */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      required
                      value={standardFormData.name}
                      onChange={(e) =>
                        setStandardFormData({ ...standardFormData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      required
                      value={standardFormData.email}
                      onChange={(e) =>
                        setStandardFormData({ ...standardFormData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      required
                      value={standardFormData.phone}
                      onChange={(e) =>
                        setStandardFormData({ ...standardFormData, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      placeholder="+44 20 1234 5678"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Custom Fields */}
            {job.application_fields && job.application_fields.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <DynamicApplicationForm
                  fields={job.application_fields}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                />
              </div>
            )}

            {/* If no custom fields, show submit button */}
            {(!job.application_fields || job.application_fields.length === 0) && (
              <motion.button
                onClick={() => handleSubmit({}, {})}
                disabled={submitting || !standardFormData.name || !standardFormData.email || !standardFormData.phone}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <CheckCircle size={20} />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
