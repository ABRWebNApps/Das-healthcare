"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative flex items-center justify-center h-[95vh] overflow-hidden">

  {/* Background Carousel */}
  <div className="absolute inset-0 w-full h-full">
    <div
      className="bg-cover bg-center w-full h-full absolute fade1"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    ></div>

    <div
      className="bg-cover bg-center w-full h-full absolute fade2"
      style={{ backgroundImage: "url('/Hero-home 1.jpg')" }}
    ></div>

    <div
      className="bg-cover bg-center w-full h-full absolute fade3"
      style={{ backgroundImage: "url('/Hero-home-2.jpg')" }}
    ></div>
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-blue-30"></div>

  {/* Content (unchanged) */}
  <div className="relative z-10 text-center px-6 max-w-2xl">
    <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4 drop-shadow-lg">
      Compassionate Domiciliary Care, Empowering Lives
    </h1>
    <p className="text-white text-lg mb-8 drop-shadow-md">
      Delivering exceptional domiciliary care services in the comfort of your own home. 
      Supporting individuals with learning disabilities, autism, and sensory impairments 
      to live independently and well.
    </p>

    <button
      onClick={() => router.push("/contact")}
      className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
    >
      Request a Care Assessment
    </button>
  </div>

  {/* Inline animations (NO global.css used) */}
  <style jsx>{`
    @keyframes fadeCycle1 {
      0%, 33% { opacity: 1; }
      34%, 100% { opacity: 0; }
    }
    @keyframes fadeCycle2 {
      0%, 33% { opacity: 0; }
      34%, 66% { opacity: 1; }
      67%, 100% { opacity: 0; }
    }
    @keyframes fadeCycle3 {
      0%, 66% { opacity: 0; }
      67%, 100% { opacity: 1; }
    }

    .fade1 {
      animation: fadeCycle1 12s infinite;
    }
    .fade2 {
      animation: fadeCycle2 12s infinite;
    }
    .fade3 {
      animation: fadeCycle3 12s infinite;
    }
  `}</style>
</section>

  );
}
