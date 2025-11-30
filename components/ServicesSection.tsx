"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Home,
  UserCheck,
  Globe,
  Brain,
  User,
  Lightbulb,
  Heart,
  Handshake,
  HelpingHand,
} from "lucide-react";

import type { Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
  img: string;
}

const services: Service[] = [
  {
    title: "Learning Disability Support",
    description:
      "Domiciliary care providing tailored support plans delivered in your home to help individuals achieve their potential and live fulfilling lives.",
    icon: Brain,
    img: "/learning-support.jpg",
  },
  {
    title: "Autism Spectrum Care",
    description:
      "Domiciliary care with specialised approaches focusing on communication, sensory integration and social skills development, delivered at home.",
    icon: UserCheck,
    img: "/autism-care.jpg",
  },
  {
    title: "Sensory Impairment Solutions",
    description:
      "Domiciliary care with innovative solutions and adaptations delivered in your home to support individuals with visual and hearing impairments.",
    icon: Lightbulb,
    img: "/sensory.jpg",
  },
  {
    title: "Sitting Services",
    description:
      "A trained caregiver stays with you to provide companionship, monitor your health, and assist with basic need while ensuring your safety and comfort",
    icon: User,
    img: "/sitting.jpg",
  },
  {
    title: "Person-Centred Support",
    description:
      "Domiciliary care empowering individuals to shape their own care plans, focusing on personal goals, preferences and aspirations, all delivered at home.",
    icon: Heart,
    img: "/centered-support.jpg",
  },
  {
    title: "Domiciliary Services",
    description:
      "We bring quality medical care to your home. Our team provides check-ups, medication support, wound care, and continous monitoring in the comfort of your own space.",
    icon: Home,
    img: "/domicilary.jpg",
  },
  {
    title: "Daily Living Assistance",
    description:
      "Comprehensive support for daily tasks, including personal care, meal preparation and household management. We ensure you stay comfortable, independent, and well-cared for at home.",
    icon: HelpingHand,
    img: "/living assistance.jpg",
  },
  {
    title: "Nurse Specialist Escort (Local & International)",
    description:
      "We provide highly trained Nurse Specialist Escorts for both local and intertional travel, ensuring safe, medically supervised transportation with viatl-sign monitoring, medication support, adn immediate clinical care when needed",
    icon: Globe,
    img: "/escort.jpg",
  },
  {
    title: "Community Engagement",
    description:
      "Facilitating active participation in community activities, promoting social inclusion, and building connections.",
    icon: Handshake,
    img: "/community.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-semibold text-[#111827] text-center mb-10 md:mb-12"
        >
          Our Comprehensive Services
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="w-full max-w-[260px] bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md"
              >
                {/* Image Section */}
                <div className="relative w-full h-44 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full w-full"
                  >
                    <Image
                      src={service.img}
                      alt={service.title}
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 260px) 100vw, 260px"
                    />
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-5 text-left min-h-[160px] flex flex-col justify-start">
                  <div className="flex items-start gap-3 mb-2.5">
                    <Icon
                      className="h-5 w-5 text-[#0091FF] mt-0.5"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-[15px] font-semibold text-[#111827] leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-[12px] text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
