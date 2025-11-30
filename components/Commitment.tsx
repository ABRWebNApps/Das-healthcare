"use client";

import { motion, type Variants } from "framer-motion";
import { Users, ClipboardCheck, Heart, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CommitmentItem {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const commitmentItems: CommitmentItem[] = [
  {
    Icon: Users,
    title: "Extended Group Approach",
    description:
      "We treat every individual as part of our own family, fostering a warm, supportive, and inclusive environment for everyone.",
  },
  {
    Icon: ClipboardCheck,
    title: "Personalised Care Plans",
    description:
      "Tailored care assessments and plans designed around individual needs, preferences, and aspirations to ensure the best support.",
  },
  {
    Icon: Heart,
    title: "Compassionate & Skilled Team",
    description:
      "Our dedicated caregivers are highly trained and genuinely passionate about making a positive difference in lives.",
  },
  {
    Icon: Shield,
    title: "Peace of Mind & Reassurance",
    description:
      "With transparent communication and accredited services, families can trust in our commitment to safety and quality.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 15,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const iconVariants: Variants = {
  hidden: { 
    scale: 0.7,
    opacity: 0 
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay: 0.1
    },
  },
};

export default function Commitment() {
  return (
    <section className="py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-2xl md:text-[28px] font-semibold text-center text-[#111827] mb-8 md:mb-10"
            variants={itemVariants}
          >
            Our Commitment to Your Group
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1120px] mx-auto">
            {commitmentItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center bg-white rounded-lg px-3 py-4 w-full max-w-[220px] mx-auto hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="w-11 h-11 mb-3.5 flex items-center justify-center bg-[#0091FF]/5 rounded-full"
                  variants={iconVariants}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "rgba(0, 145, 255, 0.12)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <item.Icon className="w-5 h-5 text-[#0091FF]" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-[14px] font-semibold text-[#111827] mb-2 px-1">
                  {item.title}
                </h3>
                <p className="text-[12.5px] text-gray-600 leading-[1.43] h-[7lh] overflow-hidden px-0.5">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
