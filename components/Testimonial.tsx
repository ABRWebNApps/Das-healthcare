"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "Olajide's exceptional clinical expertise and compassionate leadership have consistently set high standards in healthcare delivery. His transformative approach to nursing leadership is truly inspiring.",
    name: "Thomas Taylor, RN",
    role: "Senior Nurse Practitioner",
    image: "/Thomas.jpg",
  },
  {
    id: 2,
    quote:
      "Having worked with Olajide across multiple healthcare settings, I've witnessed his strategic vision and problem-solving abilities firsthand. His regulatory knowledge and communication skills are exemplary.",
    name: "David Lawson, RN",
    role: "Clinical Lead Nurse",
    image: "/david.jpg",
  },
  {
    id: 3,
    quote:
      "Olajide's dedication to professional development and his role as an educator/trainer has significantly contributed to improving care standards. His emotional intelligence and clinical expertise are outstanding.",
    name: "Emily Roberts, RN",
    role: "Nurse Educator",
    image: "/emily.jpg",
  },
  {
    id: 4,
    quote:
      "As a colleague, I've always admired Olajide's kind and compassionate professional approach. His combination of clinical expertise and transformative leadership makes him an exceptional healthcare professional.",
    name: "Robert King, RN",
    role: "Senior Staff Nurse",
    image: "/robert.jpg",
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
