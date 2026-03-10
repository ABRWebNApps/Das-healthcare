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
      '"Jide Bankole is an exceptional nurse and educator who demonstrated outstanding professionalism and dedication during our time working together in Botswana during the COVID-19 pandemic. His expertise, compassion, and ability to educate others made a significant impact on our team."',
    name: "Rejoice Gbologah",
    role: "Critical Care Nurse, Ghana",
    avatar: "/Client-1.jpg",
  },
  {
    quote:
      '"I would like to acknowledge my colleague Jide for his consistent professionalism, teamwork, and dedication. He always communicate clearly, support the team when needed and is an outstanding nurse. His reliability and positive attitude makes a meaningful contribution to work environment. I have always enjoyed working with him."',
    name: "Agnes Stansfeld",
    role: "RN, ITU Nurse, London, UK",
    avatar: "/Client-2.jpg",
  },
  {
    quote:
      '"I had the privilege of working with Olutoyin when she served as a deputy manager in a domiciliary care service in Leeds, working closely alongside the registered manager. She consistently demonstrated exceptional leadership and a deep commitment to high-quality, person-centred care. I witnessed her bring tender, thoughtful support to our care-at-home services, always striving to ensure that people receiving care felt safe, valued, and happy in the comfort of their own homes. She is hands-on, compassionate, and leads by example, whether supporting clients and their families or managing the wider team. Her humility, dedication, and genuine heart for service make her a standout leader and an asset to any organisation."',
    name: "Christy A.",
    role: "Colleague",
    avatar: "/Client-3.jpg",
  },
  {
    quote:
      '"All through the time I worked with Olutoyin as a deputy manager in residential support care, she proved to be an outstanding leader and support worker. She brought a level of tenderness, empathy, and professionalism that deeply impacted both residents and staff. Her leadership style is grounded in compassion and active involvement, always prioritising the needs of those in her care. Olutoyin’s dedication, humility, and ability to inspire others truly set her apart."',
    name: "Leslie S.",
    role: "Colleague",
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
