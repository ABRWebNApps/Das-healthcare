"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Briefcase, Calendar, Users, TrendingUp, MessageCircle, FileText } from "lucide-react";
import Link from "next/link";
import AdminCalendar from "@/components/AdminCalendar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    appointments: 0,
    pendingAppointments: 0,
    activeJobs: 0,
    applications: 0,
    pendingApplications: 0,
    messages: 0,
    newMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch job stats
      const { count: totalJobs } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true });

      const { count: activeJobs } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Fetch appointment stats
      const { count: totalAppointments } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true });

      const { count: pendingAppointments } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      // Fetch application stats
      const { count: totalApplications } = await supabase
        .from("job_applications")
        .select("*", { count: "exact", head: true });

      const { count: pendingApplications } = await supabase
        .from("job_applications")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      // Fetch message stats
      const { count: totalMessages } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true });

      const { count: newMessages } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");

      setStats({
        jobs: totalJobs || 0,
        appointments: totalAppointments || 0,
        pendingAppointments: pendingAppointments || 0,
        activeJobs: activeJobs || 0,
        applications: totalApplications || 0,
        pendingApplications: pendingApplications || 0,
        messages: totalMessages || 0,
        newMessages: newMessages || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Jobs",
      value: stats.jobs,
      icon: Briefcase,
      color: "blue",
      href: "/admin/careers",
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      icon: TrendingUp,
      color: "green",
      href: "/admin/careers",
    },
    {
      title: "Pending Applications",
      value: stats.pendingApplications,
      icon: FileText,
      color: "orange",
      href: "/admin/applications?status=pending",
    },
    {
      title: "Total Appointments",
      value: stats.appointments,
      icon: Calendar,
      color: "purple",
      href: "/admin/appointments",
    },
    {
      title: "Pending Appointments",
      value: stats.pendingAppointments,
      icon: Users,
      color: "orange",
      href: "/admin/appointments?status=pending",
    },
    {
      title: "New Messages",
      value: stats.newMessages,
      icon: MessageCircle,
      color: "red",
      href: "/admin/messages?status=new",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          const colorClasses = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            purple: "bg-purple-50 text-purple-600",
            orange: "bg-orange-50 text-orange-600",
            red: "bg-red-50 text-red-600",
          };

          return (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[card.color as keyof typeof colorClasses]}`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/careers/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <Briefcase className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="font-medium text-gray-700">Create New Job Post</p>
          </Link>
          <Link
            href="/admin/applications"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <FileText className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="font-medium text-gray-700">View Applications</p>
          </Link>
          <Link
            href="/admin/appointments"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <Calendar className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="font-medium text-gray-700">View Appointments</p>
          </Link>
          <Link
            href="/admin/messages"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <MessageCircle className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="font-medium text-gray-700">View Messages</p>
          </Link>
        </div>
      </div>

      {/* Appointment Calendar */}
      <AdminCalendar />
    </div>
  );
}

