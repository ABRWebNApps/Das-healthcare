"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CardApproach() {
  const router = useRouter();
  return (
    <section className="flex justify-center items-center my-10 px-4 bg-transparent">
      {/* Card container */}
      <div className="bg-gray-100 max-w-3xl w-full rounded-3xl text-center shadow-sm p-12 md:p-14 h-auto md:min-h-[380px]">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          An Extended Family Approach
        </h2>
        <p className="text-gray-700 mt-6 text-base md:text-lg leading-relaxed">
          At DAS Healthcare Providers, we believe in building strong, supportive
          relationships. Our unique “Extended Family” approach ensures every
          individual feels valued, heard, and deeply connected.
        </p>

        {/* Animated Button */}
        <motion.button
        onClick={() => router.push("/approach")}
          whileHover={{ scale: 1.05 }}
          animate={{ scale: [1, 1.09, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="mt-8 bg-gray-200 text-gray-900 font-medium px-8 py-3 rounded-full shadow-sm hover:bg-gray-300 transition"
        >
          Learn More About Our Approach
        </motion.button>
      </div>
    </section>
  );
}
