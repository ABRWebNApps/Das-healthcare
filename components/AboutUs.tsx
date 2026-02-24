"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const AboutUs = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const shortText = (
    <>
      <p className="text-gray-600 mb-4">
        DAS Healthcare Providers Ltd exists to provide compassionate and robust care to some of the most
        vulnerable members of society. We believe everyone should be able to maximize their quality of
        life and do so from the comfort of their own home.
      </p>
      <p className="text-gray-600">
        Our team of compassionate, caring staff ensures each of our care users receives the support and
        dignity they deserve.
      </p>
    </>
  );

  const fullText = (
    <>
      {shortText}
      <p className="text-gray-600 mt-4">
        We focus on delivering holistic, flexible care services tailored to the individual needs of each
        care user. Our approach combines medical expertise with genuine compassion to create care plans
        that respect each person's unique circumstances and preferences.
      </p>
      <p className="text-gray-600 mt-4">
        At DAS Healthcare, we understand that quality care goes beyond just meeting basic needs. We
        strive to build meaningful relationships with our care users, ensuring they feel valued,
        respected, and empowered in their daily lives.
      </p>
    </>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image Section with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="w-full md:w-1/2 bg-white rounded-lg overflow-hidden shadow-md"
        >
          <Image
            src="/doctore male -2.jpg" 
            alt="Healthcare professional"
            width={400}
            height={200}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Text Section with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-6">ABOUT US</h2>

          <div className="text-lg leading-relaxed">
            {expanded ? fullText : shortText}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpanded(!expanded)}
            className={`mt-6 px-6 py-2 rounded-full border-2 border-blue-500 text-blue-500 font-medium transition-all duration-300 ${
              expanded ? 'bg-transparent hover:bg-teal-50' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {expanded ? 'Show Less' : 'Read More'}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
