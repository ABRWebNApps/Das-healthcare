"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Target, ShieldCheck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const cards = [
  {
    title: "Our Mission",
    icon: <HeartHandshake size={20} className="text-white" />,
    full: "Our mission is to provide the most vulnerable members of our community with empathetic and compassionate care in the comfort and secure surroundings of their own home.",
    bg: "/Card.jpg",
    overlay: "bg-blue-600/40",
  },
  {
    title: "Our Aims & Objectives",
    icon: <Target size={20} className="text-white" />,
    full: "• Provide domiciliary care services for daily tasks.\n• Deliver high-quality, person-centred care.\n• Be forward-thinking and innovative.\n• Raise standards within the care sector.\n• Promote dignity, respect, and equal opportunities.\n• Ensure financial viability.",
    bg: "/Card2.jpg",
    overlay: "bg-red-400/40",
  },
  {
    title: "Our Core Values",
    icon: <ShieldCheck size={20} className="text-white" />,
    full: "• Measurable quality outcomes.\n• A culture of inclusion and support.\n• Agility and resilience.\n• Integrity and transparency.\n• Tailored care for each individual.",
    bg: "/Card-3.jpg",
    overlay: "bg-orange-600/40",
  },
];

export default function AboutSection() {
  return (
    <section className="w-full py-20 px-6 bg-[linear-gradient(135deg,#E3EFFF_30%,#F5F5F5_50%,#FFF5E6_100%)] md:px-14">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Building Compassionate Care Together
        </h2>
        <p className="text-gray-800 max-w-2xl mx-auto mt-3 text-lg">
          At DAS Healthcare, we empower individuals through quality, dignity and
          heartfelt support.
        </p>
      </motion.div>

      {/* MOBILE SWIPER */}
      <div className="block lg:hidden">
        <Swiper spaceBetween={20} slidesPerView={1.1}>
          {cards.map((card, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="relative h-auto min-h-[300px] rounded-xl shadow-lg overflow-hidden pb-6"
              >
                {/* Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.bg})` }}
                />

                <div
                  className={`absolute inset-0 ${card.overlay} backdrop-blur-sm`}
                />

                {/* Content */}
                <div className="relative z-10 p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-full bg-black/40">
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                  </div>

                  <p className="text-[15px] whitespace-pre-line leading-relaxed">
                    {card.full}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden lg:flex justify-center gap-10">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="relative w-1/3 min-h-[300px] rounded-xl shadow-lg overflow-hidden pb-6 cursor-default"
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${card.bg})` }}
            />

            <div
              className={`absolute inset-0 ${card.overlay} backdrop-blur-sm`}
            />

            {/* Content */}
            <div className="relative z-10 p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-full bg-black/40">{card.icon}</div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>

              <p className="text-[15px] whitespace-pre-line leading-relaxed">
                {card.full}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
