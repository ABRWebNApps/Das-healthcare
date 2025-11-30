"use client";

import Image from "next/image";
import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      '"Having worked alongside Olajide for over 15 years in critical care, I can attest to his exceptional clinical expertise and compassionate leadership. His dedication to patient care and professional development is truly inspiring."',
    name: "Dr. Sarah Mitchell",
    role: "Senior Consultant, NHS",
    avatar: "/Client-1.jpg",
  },
  {
    quote:
      '"Olajide\'s transformative leadership and strategic vision have been instrumental in improving care standards. His ability to mentor and develop nursing teams while maintaining the highest clinical standards is remarkable."',
    name: "Dr. David Lawson",
    role: "Clinical Director, Private Healthcare",
    avatar: "/Client-2.jpg",
  },
  {
    quote:
      '"Working with Olajide during the COVID-19 response in Botswana was a privilege. His problem-solving skills, regulatory knowledge, and emotional intelligence make him an outstanding healthcare professional and leader."',
    name: "Dr. Maria Patel",
    role: "WHO Consultant",
    avatar: "/Client-3.jpg",
  },
  {
    quote:
      '"As a fellow RN, I\'ve witnessed Olajide\'s commitment to excellence in nursing practice. His clinical expertise combined with his compassionate approach and excellent communication skills sets a benchmark for quality care."',
    name: "Emily Roberts, RN",
    role: "Senior Nurse Practitioner",
    avatar: "/Client-4.jpg",
  },
];

export default function FamiliesSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-700 mb-7">
            What Our Colleagues Say
          </h2>

          <div className="flex flex-wrap justify-center gap-x-20 gap-y-12 md:gap-x-14 md:gap-y-16">
            {testimonials.map((t, i) => (
              <m.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: "easeOut",
                  },
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 },
                }}
                key={i}
                className="w-full sm:w-[46%] lg:w-[46%] max-w-[380px] bg-white rounded-xl p-5 shadow-sm min-h-[200px] flex flex-col justify-between"
              >
                <p className="text-gray-700 italic leading-relaxed text-sm mb-4">
                  {t.quote}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={t.avatar || "/avatar-placeholder.png"}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </m.article>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
