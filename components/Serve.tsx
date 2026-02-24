"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function WhoWeServe() {
  return (
    <section className="w-full bg-blue-50 ">
      {/* TOP HALF WITH TEAL BACKGROUND */}
      <div className="w-full bg-blue-400 pt-16 pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10">

          {/* DOCTOR IMAGE
          <motion.img
            src="/Caregiver.png" // Replace with your real doctor image path
            alt="Doctor"
            className="w-[400px] md:w-[400px] object-contain z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          /> */}

          {/* TEXT ON RIGHT SIDE */}
          <motion.div
            className="text-white max-w-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h3 className="text-sm tracking-widest font-semibold text-gray-200">
              DAS HEALTHCARE PROVIDERS
            </h3>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Who We Serve
            </h2>

            <p className="mt-3 text-gray-100 text-sm md:text-base">
              We support adults and individuals with varying needs by offering consistent,
              person-centred care designed to enhance independence, dignity, and daily living.
            </p>
          </motion.div>
        </div>
      </div>

      {/* WHITE BOTTOM CARD AREA */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative -mt-24 ">
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Key Support Areas
          </h3>

          <ul className="space-y-3">
            {[
              "Adults aged 18-65",
              "Individuals with learning difficulties or autism",
              "Individuals with sensory impairments",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="text-blue-500 shrink-0" size={22} />
                <span className="text-gray-700 text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
