"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, isSameDay } from "date-fns";

type Step = "date" | "time" | "details" | "confirm";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00"
];

export default function ModernBookingForm() {
  const [currentStep, setCurrentStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    otherReason: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generate available dates (next 30 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      dates.push(addDays(today, i));
    }
    return dates;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep("details");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear otherReason when a different reason is selected
    if (name === "reason" && value !== "Other") {
      setFormData((prev) => ({ ...prev, reason: value, otherReason: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone) {
      return;
    }

    setSubmitting(true);
    try {
      // Use otherReason if "Other" is selected, otherwise use the selected reason
      const finalReason = formData.reason === "Other" 
        ? formData.otherReason 
        : formData.reason || "Appointment Booking";

      const { error } = await supabase.from("appointments").insert({
        client_name: formData.name,
        client_email: formData.email,
        client_phone: formData.phone,
        subject: finalReason,
        reason: finalReason,
        department: "General Inquiry",
        appointment_date: format(selectedDate, "yyyy-MM-dd"),
        appointment_time: selectedTime,
        status: "pending",
      });

      if (error) throw error;
      setSuccess(true);
      setCurrentStep("confirm");
    } catch (error: any) {
      console.error("Error submitting appointment:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetBooking = () => {
    setCurrentStep("date");
    setSelectedDate(null);
    setSelectedTime("");
    setFormData({ name: "", email: "", phone: "", reason: "", otherReason: "" });
    setSuccess(false);
  };

  const steps = [
    { id: "date", label: "Select Date", icon: Calendar },
    { id: "time", label: "Choose Time", icon: Clock },
    { id: "details", label: "Your Details", icon: User },
    { id: "confirm", label: "Confirmed", icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-blue-600 text-white scale-110 shadow-lg"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                        isCompleted ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Booking Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {/* Step 1: Date Selection */}
              {currentStep === "date" && (
                <motion.div
                  key="date"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Select a Date
                    </h2>
                    <p className="text-gray-600">Choose your preferred appointment date</p>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2">
                    {getAvailableDates().map((date, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDateSelect(date)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedDate && isSameDay(date, selectedDate)
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        <div className="text-xs font-medium text-gray-600">
                          {format(date, "EEE")}
                        </div>
                        <div className="text-lg font-bold text-gray-900 mt-1">
                          {format(date, "d")}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {format(date, "MMM")}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Time Selection */}
              {currentStep === "time" && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <button
                      onClick={() => setCurrentStep("date")}
                      className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                      <ArrowLeft size={20} />
                      <span>Change date</span>
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Choose a Time
                    </h2>
                    <p className="text-gray-600">
                      {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {TIME_SLOTS.map((time) => (
                      <motion.button
                        key={time}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTimeSelect(time)}
                        className={`p-3 rounded-xl border-2 transition-all font-medium ${
                          selectedTime === time
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-200 hover:border-blue-300 text-gray-700"
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Details */}
              {currentStep === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <button
                      onClick={() => setCurrentStep("time")}
                      className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                      <ArrowLeft size={20} />
                      <span>Change time</span>
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Your Information
                    </h2>
                    <p className="text-gray-600">We'll use this to confirm your appointment</p>
                  </div>

                  <div className="space-y-4 max-w-md mx-auto">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition"
                          placeholder="+44 20 1234 5678"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Visit (Optional)
                      </label>
                      <select
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      >
                        <option value="">Select a reason</option>
                        <option>Personal Care</option>
                        <option>Domiciliary Care</option>
                        <option>Sitting Services</option>
                        <option>Live-in Care</option>
                        <option>Supported Living</option>
                        <option>General Inquiry</option>
                        <option>Other</option>
                      </select>
                      
                      {/* Show text input when "Other" is selected */}
                      <AnimatePresence>
                        {formData.reason === "Other" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3"
                          >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Please specify your reason *
                            </label>
                            <input
                              type="text"
                              name="otherReason"
                              value={formData.otherReason}
                              onChange={handleInputChange}
                              required={formData.reason === "Other"}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition"
                              placeholder="Enter your reason for the appointment..."
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={
                        submitting || 
                        !formData.name || 
                        !formData.email || 
                        !formData.phone ||
                        (formData.reason === "Other" && !formData.otherReason.trim())
                      }
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Booking...
                        </>
                      ) : (
                        <>
                          Confirm Appointment
                          <ArrowRight size={20} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === "confirm" && success && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6 py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle className="text-green-600" size={48} />
                  </motion.div>

                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Appointment Confirmed!
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Your appointment has been successfully booked
                    </p>
                    {selectedDate && (
                      <div className="bg-blue-50 rounded-xl p-6 max-w-md mx-auto">
                        <div className="space-y-2 text-left">
                          <div className="flex items-center gap-3">
                            <Calendar className="text-blue-600" size={20} />
                            <span className="font-medium">
                              {format(selectedDate, "EEEE, MMMM d, yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="text-blue-600" size={20} />
                            <span className="font-medium">{selectedTime}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <User className="text-blue-600" size={20} />
                            <span className="font-medium">{formData.name}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-4">
                      A confirmation email has been sent to {formData.email}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetBooking}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Book Another Appointment
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

