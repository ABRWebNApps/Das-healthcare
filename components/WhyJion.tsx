"use client";

import { motion } from "framer-motion";
import {
  Heart,
  GraduationCap,
  Users,
  Leaf,
  Handshake,
  Briefcase,
} from "lucide-react";

const benefits = [
  {
    icon: <Heart className="w-8 h-8 text-blue-600" />,
    title: "Compassionate Culture",
    text: "Join a team that prioritizes empathy, respect, and dignity in every interaction, fostering a truly supportive environment.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
    title: "Professional Growth",
    text: "Access continuous learning opportunities, specialised training, and career advancement paths to help you thrive.",
  },
  {
    icon: <Handshake className="w-8 h-8 text-blue-600" />,
    title: "Supportive Team",
    text: "Collaborate with dedicated professionals who share your passion for making a difference, in a truly inclusive setting.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-blue-600" />,
    title: "Meaningful Impact",
    text: "Make a real difference in the lives of individuals with learning disabilities, autism, and sensory impairments every day.",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "Work-Life Balance",
    text: "We believe in supporting our staff with flexible scheduling options and a strong well-being focus to ensure you feel valued.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-blue-600" />,
    title: "Competitive Benefits",
    text: "Enjoy a comprehensive benefits package, including health, retirement, and generous paid time off.",
  },
];

export default function WhyJoinSection() {
  return (
    <section className="w-full py-20 px-8 md:px-16 bg-gradient-to-r from-blue-100 via-gray-100 to-orange-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-14"
        >
          Why Join DAS HEALTHCARE <br/> PROVIDERS?
            
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 text-left border border-gray-100 hover:scale-105 transform transition-all duration-300 min-h-[220px] flex flex-col justify-start"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
