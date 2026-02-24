"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Award } from "lucide-react";

interface Service {
  title: string;
  description: string;
  link: string;
}

const services: Service[] = [
  {
    title: "Learning Disabilities Support",
    description:
      "Domiciliary care providing specialised assistance tailored to enhance daily living and independence, delivered in your own home.",
    link: "View Details",
  },
  {
    title: "Autism Spectrum Care",
    description:
      "Domiciliary care with focused strategies delivered at home to support communication, social interaction, and sensory needs.",
    link: "View Details",
  },
  {
    title: "Sensory Impairment Aids",
    description:
      "Domiciliary care with adaptive support and home-based solutions for individuals with various sensory challenges.",
    link: "View Details",
  },
];

export default function Services() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Our Services At A Glance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="bg-white rounded-lg p-6 flex flex-col items-start"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="text-sky-500 hover:text-sky-600 transition-colors mt-auto"
                >
                  {service.link}
                </a>
              </m.div>
            ))}
          </div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.2,
                ease: "easeOut",
              },
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-16 bg-sky-50 rounded-xl py-8 px-10 text-center max-w-2xl mx-auto"
          >
            <div className="flex justify-center gap-3 items-center mb-5">
              <Award className="w-5 h-5 text-sky-500" />
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  BRN: 14651663
                </span>
                <span className="bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  CQC: CRT1-24768607163
                </span>
                <span className="bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Provider ID: 1-20631585417
                </span>
              </div>
            </div>
            <div className="max-w-lg mx-auto">
              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                Registered with the Care Quality Commission,
                <br />
                ensuring the highest standards of care, safety, and
                effectiveness.
              </p>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm"
              >
                Learn More About Our Standards
              </a>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
