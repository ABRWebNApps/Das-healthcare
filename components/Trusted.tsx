"use client";
import React, { useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Trusted = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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
    <section className="flex justify-center items-center px-4 py-12">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants as any}
        className="bg-white rounded-lg shadow-lg p-8 text-center w-full max-w-2xl"
        style={{ border: "1px solid rgba(0, 0, 0, 0.08)" }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Registered & Trusted
        </h3>
        <motion.div
          whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0, 191, 255, 0.4)" }}
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full font-bold mb-6"
        >
          BRN: 14651663
        </motion.div>
        <p className="text-gray-600 text-lg">
          We uphold the highest standards of professional care and compliance.
        </p>
      </motion.div>
    </section>
  );
};

export default Trusted;
