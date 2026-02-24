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
      className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto w-full max-w-[280px]">
        <div className="relative w-full aspect-[3/4] bg-gray-100">
          {imageLoading && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="animate-pulse text-gray-400 text-xs">
                Loading...
              </div>
            </div>
          )}

          {!imageError ? (
            <Image
              src={image.startsWith("/") ? image : `/${image}`} // Ensure path starts with /
              alt={name}
              fill
              className="object-contain w-full"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              onLoadingComplete={() => setImageLoading(false)}
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-bold bg-gray-200">
              {getInitials(name)}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-1 text-center">
            {name}
          </h3>
          <p className="text-gray-600 text-xs mb-3 text-center">{role}</p>

          <p className="text-gray-600 text-xs mb-3 leading-relaxed">
            {shortBio}
          </p>

          <motion.div
            initial={false}
            animate={{
              height: expanded ? "auto" : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 text-xs mb-3 leading-relaxed">{bio}</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className={`w-full py-1.5 px-3 rounded-full text-xs font-medium transition-colors duration-300 ${
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
      role: "Co-Founder, Director of Care & Registered Manager, DAS Healthcare Providers Ltd",
      image: "olajide-bankole.png", // Path relative to public folder
      shortBio:
        "Olajide Bankole RN is a highly accomplished Nurse Leader with over 30 years of experience in NHS, private hospitals, and international healthcare settings. As a WHO Nurse Consultant for COVID-19 response in Botswana (2021), he led emergency and critical care initiatives, driving quality improvements and healthcare innovation.",
      bio: "With expertise in strategic leadership, clinical governance, and education, he has held senior roles in Nigeria and the UK, including Director of Care and CQC Registered Manager for domiciliary care services. A skilled communicator and mentor, Olajide is committed to empowering healthcare teams and delivering exceptional patient care. His educational background includes qualifications from King's College London, Edinburgh Napier University, University of Oxford, Olabisi Onabanjo University, Ago-Iwoye, Ogun state Nigeria and Lagos State School of Nursing Lagos, Nigeria. Dedicated to giving back, he serves his communities through voluntary work and trusteeship roles, both locally and internationally, demonstrating his passion for healthcare excellence and social responsibility.",
    },
    {
      name: "Olutoyin Bankole",
      role: "Co-Founder & Director",
      image: "/Olutoyin Bankole.png", // Path relative to public folder
      shortBio:
        "BSc in Human Nutrition (currently pursuing MA in Social Work). Nearly two decades of experience in quality management and compliance, managing human and resources, team building and development.",
      bio: "BSc in Human Nutrition (currently pursuing MA in Social Work). Nearly two decades of experience in quality management and compliance, managing human and resources, team building and development. From humble beginnings as a volunteer support worker to Deputy Team Manager, she is well organised and motivated, consistently demonstrating empathy, and strategic leadership and exceptional care. Specialises in Qualities Management and Compliance, Team Building and Development.",
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
