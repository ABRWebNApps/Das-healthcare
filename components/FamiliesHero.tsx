"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";

const images = [
  "/hero-family-1.jpg",
  "/hero-family-2.jpg",
  "/hero-family-3.jpg",
  "/hero-family-4.jpg",
  "/hero-family-5.jpg",
];

export default function FamiliesHero() {
   const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-14 md:py-16">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative mx-auto rounded-2xl overflow-hidden aspect-[16/9] max-w-full sm:max-w-[700px] md:max-w-[880px]">
          {/* Carousel Base */}
          <div className="absolute inset-0">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              setApi={setApi}
              className="w-full h-full"
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index} className="min-w-0">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={image}
                        alt={`Family care moment ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="(max-width: 640px) 100vw, (max-width: 880px) 80vw, 880px"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/35" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 leading-snug">
              Peace of Mind for Your <br /> Group
            </h1>
            <p className="text-base sm:text-lg md:text-[20px] text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-[90%] sm:max-w-[500px] md:max-w-[550px] mx-auto leading-relaxed">
              Expert, Compassionate Care for Learning Disabilities, Autism, <br className="hidden sm:block" /> and Sensory Impairment
            </p>
            <Button
            onClick={() => router.push("/contact")}
              className="bg-[#0091FF] hover:bg-[#0081E5] text-white rounded-full px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 text-sm sm:text-[15px] md:text-base font-medium transition-all duration-300 mb-6 sm:mb-8"
            >
              Request a Care Assessment
            </Button>

            {/* Carousel Dots */}
            <div className="flex gap-2 items-center">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "bg-white w-5 sm:w-6"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
