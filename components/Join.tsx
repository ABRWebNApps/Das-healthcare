"use client";

import { motion } from "framer-motion";

export default function JoinOurFamilySection() {
  return (
    <section
      className="w-full py-20 px-6 flex justify-center items-center text-center"
      style={{
        background: "linear-gradient(135deg, #E3EFFF 0%, #F5F5F5 50%, #FFF5E6 100%)",

      }}

    >
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-snug"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Join Our Family, Make a Difference.
        </motion.h2>

        <motion.p
          className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          At <span className="font-semibold text-gray-900">DAS HEALTHCARE PROVIDERS</span>, 
          we believe in an <span className="italic">“Extended <br/> Family”</span> approach, 
          where every team member is valued and <br/>empowered to provide exceptional, 
          compassionate care.
        </motion.p>
    

      <motion.button
        onClick={() => {
          const element = document.getElementById("current-openings");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="relative bg-[#0091FF] hover:bg-[#007EE5] text-white font-semibold py-3 px-7 rounded-full text-sm sm:text-base transition-all duration-300 shadow-md overflow-hidden group"
      >
        <span className="relative z-10">View Current Opportunities</span>
        <span className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-40 blur-lg transition duration-500"></span>
      </motion.button>
      </motion.div>
    </section>
  );
}
