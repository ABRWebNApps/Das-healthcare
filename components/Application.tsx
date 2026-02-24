"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Explore Opportunities",
    text: "Browse our current job openings and find a role that matches your skills and passion.".split(" "),
    line1: "Browse our current job openings",
    line2: "and find a role that matches your skills.",
  },
  {
    number: 2,
    title: "Submit Your Application",
    line1: "Complete our online application form",
    line2: "and attach your CV and cover letter.",
  },
  {
    number: 3,
    title: "Search and Verification",
    line1: "Search and verification of prospective employees",
    line2: "CV / Resumes and past employment history and other vital records.",
  },
  {
    number: 4,
    title: "Interview Process",
    line1: "Successful candidates will be invited",
    line2: "for an interview to discuss experience.",
  },
  {
    number: 5,
    title: "Join Our Family",
    line1: "Receive an offer and begin your journey",
    line2: "with DAS HEALTHCARE PROVIDERS today.",
  },
];

export default function ApplicationProcess() {
  return (
    <section
      className="w-full min-h-screen flex items-center justify-center px-4 md:px-5 
      bg-gradient-to-r from-blue-100 via-gray-100 to-orange-50"
    >
      <div className="max-w-5xl mx-auto text-center">
       {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-10"
        >
          OUR SIMPLE BUT ROBUST APPLICATION PROCESS
        </motion.h2>

         {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-left">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              
              {/* Number Circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.25, y: -6 }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg flex-shrink-0 shadow-md cursor-pointer"
              >
                {step.number}
              </motion.div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-l text-base leading-relaxed">
                  {step.line1}
                  <br />
                  {step.line2}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Current Opportunities Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <motion.button
            onClick={() => {
              const element = document.getElementById("current-openings");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:bg-blue-700"
          >
            View Current Opportunities
            <ArrowDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
