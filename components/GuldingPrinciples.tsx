"use client";
import { motion } from "framer-motion";
import { Heart, Lightbulb, Handshake } from "lucide-react";

export default function GuidingPrinciples() {
  const principles = [
    {
      icon: <Heart className="w-10 h-10 text-[#FCE9C0]" />,
      title: "Personalised Care",
      description:
        "We craft bespoke care plans, honoring each individual's journey and fostering their independence and personal growth with deep empathy.",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-[#F9E5B0]" />,
      title: "Empowerment & Dignity",
      description:
        "We empower our clients to make choices, celebrating their strengths and ensuring their voice is heard, respected, and valued in every interaction.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-[#FCE9C0]" />,
      title: "Community & Inclusion",
      description:
        "We cultivate a vibrant, inclusive community where everyone feels a sense of belonging, purpose, and mutual support, enriching lives together.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-6 md:px-10 lg:px-20">
      <div className="text-center mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Guiding Principles
        </motion.h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {principles.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 text-center w-[290px] md:w-[300px] lg:w-[310px] transition-transform duration-500 hover:shadow-xl hover:-translate-y-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-[#FFF9F5] rounded-full p-4">{item.icon}</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-[250px] mx-auto line-clamp-5">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
