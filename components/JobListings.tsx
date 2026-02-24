"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { JobPost } from "@/lib/supabase/types";
import Link from "next/link";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function JobListings() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn("Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file");
        setError("Database not configured");
        setJobs([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        // If table doesn't exist, show empty state instead of error
        if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
          console.warn("Jobs table not found. Please run the database setup SQL from DATABASE_SETUP.md");
          setError("Database table not found");
          setJobs([]);
        } else {
          throw error;
        }
      } else {
        setJobs(data || []);
        setError(null);
      }
    } catch (error: any) {
      console.error("Error fetching jobs:", error?.message || error);
      // Set empty array on error to show "no jobs" message instead of breaking
      setError(error?.message || "Failed to load jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (jobs.length === 0 && !loading) {
    return (
      <section id="current-openings" className="py-16 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Openings</h2>
          {error ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-yellow-800 text-sm">
                {error === "Database not configured" 
                  ? "Please configure Supabase in your .env.local file"
                  : error === "Database table not found"
                  ? "Please run the database setup SQL from DATABASE_SETUP.md"
                  : "Unable to load job listings. Please try again later."}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">No job openings at the moment. Please check back later.</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="current-openings" className="py-16 px-4 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Current Openings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{job.title}</h3>
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{job.type}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
              <Link
                href={`/careers/${job.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                View Details
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

