"use client";
import React from "react";
import { motion } from "framer-motion";

const Ready = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.42, 0, 0.58, 1], // cubic-bezier easeOut as array for Framer Motion type
          },
        },
      }}
      className="bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)] py-12 md:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Ready to Make a Difference?
        </motion.h2>
        <motion.p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-10 max-w-xl sm:max-w-2xl mx-auto">
          We are always looking for compassionate and dedicated individuals to
          join our growing family.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <a
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-colors duration-300 block"
          >
            Apply Now
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Ready;
