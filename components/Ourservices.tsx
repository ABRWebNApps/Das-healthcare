"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"; // ✅ you'll need this plugin
import { useRef } from "react";
import Buttong from "./Button";

export default function OurServices() {
  // Plugin ref for autoplay
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const router = useRouter();
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* === Background Carousel === */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="absolute inset-0 w-full h-full"
      >
        <CarouselContent className="h-full">
          <CarouselItem className="relative w-full h-screen">
            <Image
              src="/hero1.jpg"
              alt="Learning Disability Support"
              fill
              priority
              className="object-cover brightness-75"
            />
          </CarouselItem>

          <CarouselItem className="relative w-full h-screen">
            <Image
              src="/hero-2.jpg"
              alt="Autism Spectrum Care"
              fill
              className="object-cover brightness-75"
            />
          </CarouselItem>

          <CarouselItem className="relative w-full h-screen">
            <Image
              src="/hero3.jpg"
              alt="Community Engagement"
              fill
              className="object-cover brightness-75"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* === Foreground Content === */}
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center text-white px-6 py-16">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span>Specialised Care,</span>
            <br />
            <span>Tailored With</span>
            <br />
            <span>Compassion</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            We provide exceptional, person-centred domiciliary care services 
            delivered in your own home. Supporting adults with learning disabilities, 
            autism spectrum conditions, and sensory impairments.
          </p>

          <div className="flex justify-center">
            <Buttong 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
