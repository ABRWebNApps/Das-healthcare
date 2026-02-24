"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Appointment } from "@/lib/supabase/types";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, getDay } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchAppointments();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel("appointments_calendar")
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
  }, [currentDate]);

  const fetchAppointments = async () => {
    try {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .gte("appointment_date", format(start, "yyyy-MM-dd"))
        .lte("appointment_date", format(end, "yyyy-MM-dd"))
        .in("status", ["pending", "confirmed", "rescheduled"])
        .order("appointment_date", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((apt) =>
      isSameDay(new Date(apt.appointment_date), date)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-green-500";
      case "rescheduled":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get first day of week (0 = Sunday)
  const firstDayOfWeek = getDay(monthStart);
  
  // Create array with empty cells for days before month starts
  const emptyDays = Array(firstDayOfWeek).fill(null);

  const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <CalendarIcon size={20} />
          Appointment Calendar
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-base font-semibold text-gray-900 min-w-[140px] text-center">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-600 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {daysInMonth.map((day) => {
          const dayAppointments = getAppointmentsForDate(day);
          const isToday = isSameDay(day, new Date());
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isPast = day < new Date() && !isToday;

          return (
            <motion.button
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                aspect-square p-0.5 rounded border transition-all text-xs
                ${isSelected
                  ? "border-blue-600 bg-blue-50"
                  : isToday
                  ? "border-blue-400 bg-blue-50"
                  : dayAppointments.length > 0
                  ? "border-orange-300 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
                }
                ${isPast ? "opacity-50" : ""}
              `}
            >
              <div className="text-xs font-medium text-gray-900 mb-0.5">
                {format(day, "d")}
              </div>
              <div className="flex flex-wrap gap-0.5">
                {dayAppointments.slice(0, 2).map((apt, idx) => (
                  <div
                    key={apt.id}
                    className={`w-full h-0.5 rounded ${getStatusColor(apt.status)}`}
                    title={`${apt.client_name} - ${apt.appointment_time}`}
                  />
                ))}
                {dayAppointments.length > 2 && (
                  <div className="text-[10px] text-gray-500 w-full">
                    +{dayAppointments.length - 2}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-yellow-500"></div>
          <span className="text-gray-600">Pending</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-500"></div>
          <span className="text-gray-600">Confirmed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-blue-500"></div>
          <span className="text-gray-600">Rescheduled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded border-2 border-blue-400 bg-blue-50"></div>
          <span className="text-gray-600">Today</span>
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && selectedDateAppointments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200"
        >
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </h3>
          <div className="space-y-1.5">
            {selectedDateAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-2 bg-white rounded border border-gray-200 text-xs"
              >
                <div>
                  <p className="font-medium text-gray-900">{apt.client_name}</p>
                  <p className="text-gray-600">{apt.appointment_time}</p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    apt.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : apt.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

