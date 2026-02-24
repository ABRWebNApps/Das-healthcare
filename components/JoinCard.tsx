"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface JoinOurTeamCardProps {
  
}

const JoinOurTeamCard: React.FC<JoinOurTeamCardProps> = () => {
  const router = useRouter();

  // For Apply Now button
  const handleApplyNow = () => {
    router.push('/apply-for-job');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto my-12 px-4"
    >
      <div className="bg-sky-100 rounded-xl overflow-hidden shadow-lg">
        <div className="p-8 md:p-12">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center"
          >
            Join Our Team or Request Care Assistance
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-center mb-8 max-w-2xl mx-auto"
          >
            Whether you're looking to join our compassionate team or need professional care services,
            we're here to help. Choose an option below to get started.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Apply Now Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={handleApplyNow}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
            >
              Apply Now
            </motion.button>

            {/* Request Care Assistance Button - using Link component */}
            <Link
              href="/contact"
              scroll={false}
              className="w-full sm:w-auto"
            >
              {/* Request Care Assistance Button */}
            <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.4 }}
               onClick={() => router.push('/contact')}
               className="w-full sm:w-auto bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-medium py-3 px-6 rounded-lg transition-colors duration-300 shadow-md">
                  Request Care Assistance
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JoinOurTeamCard;
