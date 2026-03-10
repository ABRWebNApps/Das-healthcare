"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "Jide Bankole is an exceptional nurse and educator who demonstrated outstanding professionalism and dedication during our time working together in Botswana during the COVID-19 pandemic. His expertise, compassion, and ability to educate others made a significant impact on our team.",
    name: "Rejoice Gbologah",
    role: "Critical Care Nurse, Ghana",
    image: "/Rejoice - T.jfif.jpeg",
  },
  {
    id: 2,
    quote: "I would like to acknowledge my colleague Jide for his consistent professionalism, teamwork, and dedication. He always communicate clearly, support the team when needed and is an outstanding nurse. His reliability and positive attitude makes a meaningful contribution to work environment. I have always enjoyed working with him.",
    name: "Agnes Stansfeld",
    role: "RN, ITU Nurse, London, UK",
    image: "/premium_profile_icon.png",
  },
  {
    id: 3,
    quote: "I had the privilege of working with Olutoyin when she served as a deputy manager in a domiciliary care service in Leeds, working closely alongside the registered manager. She consistently demonstrated exceptional leadership and a deep commitment to high-quality, person-centred care. I witnessed her bring tender, thoughtful support to our care-at-home services, always striving to ensure that people receiving care felt safe, valued, and happy in the comfort of their own homes. She is hands-on, compassionate, and leads by example, whether supporting clients and their families or managing the wider team. Her humility, dedication, and genuine heart for service make her a standout leader and an asset to any organisation.",
    name: "Christy A.",
    role: "Colleague",
    image: "/premium_profile_icon.png",
  },
  {
    id: 4,
    quote: "All through the time I worked with Olutoyin as a deputy manager in residential support care, she proved to be an outstanding leader and support worker. She brought a level of tenderness, empathy, and professionalism that deeply impacted both residents and staff. Her leadership style is grounded in compassion and active involvement, always prioritising the needs of those in her care. Olutoyin’s dedication, humility, and ability to inspire others truly set her apart.",
    name: "Leslie S.",
    role: "Colleague",
    image: "/premium_profile_icon.png",
  },
];

export default function TestimonialsFigma() {
  return (
    <section className="flex justify-center px-6 py-16">
      {/* Card container (light grey) - centered, not full page width */}
      <div className="max-w-4xl w-full bg-gray-50 rounded-3xl shadow-sm p-8 md:p-10">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
          What Our Colleagues Say About Us
        </h2>

        {/* Narrow testimonial cards (white) */}
        <div className="flex gap-6 justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {testimonials.map((t, i) => (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ translateY: -6, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
                className="bg-white rounded-2xl p-5 flex flex-col justify-between items-center text-center shadow transition-all duration-300 h-full max-w-[200px] mx-auto"
              >
                {/* small portrait at top (centered) */}
                <div className="w-12 h-12 rounded-full overflow-hidden mb-4">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>

                {/* quote (centered, narrow) */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                  {t.quote}
                </p>

                {/* name & role at bottom (centered) */}
                <div className="mt-auto">
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
