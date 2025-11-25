"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ContactHero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("contact-header");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) setShow(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="contact-header"
      className="relative w-full h-[260px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/contact image.png"
        alt="contact background"
        fill
        className="object-cover"
      />

      {/* Sky–Blue Overlay */}
      <div className="absolute inset-0 bg-sky-700/40 backdrop-blur-[1px]" />

      {/* Content */}
      <div
        className={`relative text-center transition-all duration-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1 className="text-white text-4xl font-semibold tracking-wide">
          Contact <span className="text-#4BA3C3-800">Us</span> Today
        </h1>

        <p className="text-white text-sm mt-2">
          We’re here to support your healthcare needs. Reach out anytime.
        </p>

        <p className="text-white text-xs mt-1 opacity-70">
          Book An Appointment / Contact Us
        </p>
      </div>
    </section>
  );
}
