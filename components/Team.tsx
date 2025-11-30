"use client";

import { motion } from "framer-motion";

export default function Team() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const values = [
    {
      title: "Compassionate Care",
      text: `We are building a team of dedicated professionals who share our commitment to providing compassionate, person-centred domiciliary care that makes a real difference in people's lives.`,
    },
    {
      title: "Professional Development",
      text: `We value continuous learning and professional growth. Our team members will have access to specialised training and development opportunities to enhance their skills and advance their careers.`,
    },
    {
      title: "Supportive Environment",
      text: `We believe in creating a supportive, inclusive workplace where every team member feels valued, respected, and empowered to contribute to our mission of delivering exceptional care.`,
    },
  ];

  return (
    <section className="w-full bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)] mb-4 py-6 flex flex-col items-center">
      {/* Heading */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className=" bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)]text-3xl md:text-4xl font-semibold text-center mb-13 text-[#0C1A2A]"
      >
        Our Team Values
      </motion.h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-14 max-w-4xl">
        {values.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#F4F9FD] p-6 rounded-xl shadow-sm border border-[#e9eef2]"
          >
            {/* Title */}
            <h3 className="font-semibold text-[#0C1A2A] mb-3 text-lg">{item.title}</h3>

            {/* Text */}
            <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
