"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { JobPost } from "@/lib/supabase/types";
import Navbar from "@/components/Navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign } from "lucide-react";

export default function JobDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);

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
          <p className="text-gray-600 mb-8">This job posting is no longer available.</p>
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

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Careers
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={20} />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{job.type}</span>
            </div>
            {job.salary_range && (
              <div className="flex items-center gap-2">
                <DollarSign size={20} />
                <span>{job.salary_range}</span>
              </div>
            )}
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200">
            <Link
              href={`/careers/${slug}/apply`}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

