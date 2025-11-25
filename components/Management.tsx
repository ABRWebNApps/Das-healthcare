"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  shortBio: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  image,
  bio,
  shortBio,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Get initials for fallback
  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length === 1) return names[0].charAt(0);
    return names[0].charAt(0) + names[1].charAt(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-xs">
        <div className="relative h-56 w-full bg-gray-100">
          {imageLoading && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="animate-pulse text-gray-400">Loading...</div>
            </div>
          )}

          {!imageError ? (
            <Image
              src={image.startsWith("/") ? image : `/${image}`} // Ensure path starts with /
              alt={name}
              fill
              className="object-cover"
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              onLoadingComplete={() => setImageLoading(false)}
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl font-bold bg-gray-200">
              {getInitials(name)}
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 text-center">{role}</p>

          <p className="text-gray-600 text-sm mb-4">{shortBio}</p>

          <motion.div
            initial={false}
            animate={{
              height: expanded ? "auto" : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 text-sm mb-4">{bio}</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className={`w-full py-2 px-4 rounded-full font-medium transition-colors duration-300 ${
              expanded
                ? "text-blue-600 border border-blue-400 bg-transparent hover:bg-blue-50"
                : "bg-blue-300 text-white hover:bg-blue-400"
            }`}
          >
            {expanded ? "Show Less" : "Read More"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const MeetOurTeam = () => {
  const teamMembers = [
    {
      name: "Olajide Bankole, RN, DHM",
      role: "Co-Founder, Director of Care & Registered Manager",
      image: "olajide-bankole.jpg", // Path relative to public folder
      shortBio:
        "Highly skilled Acute and Critical Care Nurse with over 30 years of experience in national and international healthcare services.",
      bio: "Highly skilled and experienced Acute and Critical Care Nurse with over 30 years of national (NHS and Private Hospitals across England) and international service. Obtained education in LSSN, Lagos Nigeria, Olabisi Onabanjo University, formerly Ogun State University, Nigeria, Yishak Rabin Trauma Centre, Tel-Aviv, University of Israel, Kings College University of London, Edinburgh Napier University, Scotland, University of Oxford, UK. Clinical Educator/Trainer, Project Manager with WHO Consultancy Experience (COVID-19 Pandemic Response, Botswana).",
    },
    {
      name: "Olutoyin Bankole",
      role: "Co-Founder & Director",
      image: "/Olutoyin Bankole.jpg", // Path relative to public folder
      shortBio:
        "Co-Founder with nearly two decades of experience in quality management and compliance in healthcare.",
      bio: "BSc in Human Nutrition (currently pursuing MA in Social Work). Nearly two decades of experience in quality management and compliance, managing human and resources, team building and development. From humble beginnings as a volunteer support worker to Deputy Team Manager, she is well organized and motivated, consistently demonstrating empathy, and strategic leadership and exceptional care. Specializes in Qualities Management and Compliance, Team Building and Development.",
    },
  ];

  return (
    <div className="bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-2 text-center"
        >
          MEET OUR <span className="text-blue-600">MANAGEMENT TEAM</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-700 text-center mb-12 max-w-4xl mx-auto"
        >
          Our management team brings together decades of healthcare experience
          <br /> with a shared vision of providing compassionate, high-quality
          care.
        </motion.p>

        <div className="flex flex-wrap justify-center -mx-4">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetOurTeam;
