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
      '"DAS Healthcare has brought so much peace of mind. Their team treats my sister like family, and the personalized care has made a world of difference."',
    name: "Sarah J.",
    role: "Client's Sister",
    avatar: "/Client-1.jpg",
  },
  {
    quote:
      '"The support we received for our son was truly exceptional. The staff are incredibly understanding and have helped him thrive in ways we didn\'t imagine."',
    name: "David L.",
    role: "Client's Father",
    avatar: "/Client-2.jpg",
  },
  {
    quote:
      '"From the first assessment, we felt heard and understood. The dedication of the caregivers is profound, and their approach truly feels like an extension of our own family."',
    name: "Maria P.",
    role: "Client's Mother",
    avatar: "/Client-3.jpg",
  },
  {
    quote:
      '"I\'ve seen such a positive change in my brother since he started with DAS. The activities are engaging, and the staff are always patient and encouraging."',
    name: "Emily R.",
    role: "Client's Sibling",
    avatar: "/Client-4.jpg",
  },
];

export default function FamiliesSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-700 mb-7">
            What Our Families Say
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
