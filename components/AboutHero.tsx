"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/doctor male 1.jpg",
      title: " COMPASSIONATE CARE FOR EVERY INDIVIDUAL",
      description: "At DAS Healthcare, we believe everyone deserves dignity and respect. Our domiciliary care team provides personalised, empathetic support tailored to your unique needs, delivered in the comfort of your own home.",
      buttonText: "Request a Care Assessment"
    },
    {
      image: "/nurses smiling.jpg",
      title: "MAXIMIZING QUALITY OF LIFE AT HOME",
      description: "Our domiciliary care services help you live life to the fullest in the comfort of your own home. We support your independence and well-being through personalised care delivered where you feel most comfortable.",
      buttonText: "Request a Care Assessment"
    },
    {
      image: "/Care-2.jpg",
      title: "SUPPORT ALL ABILITIES AND NEEDS",
      description: "We proudly provide domiciliary care for adults with learning difficulties, autism, and sensory impairments. Our inclusive approach recognises and respects every individual's unique needs, delivered in their own home environment.",
      buttonText: "Request a Care Assessment"
    },
    {
      image: "/Compassion.jpg",
      title: "TRUSTED CARE FROM DEDICATED PROFESSIONALS",
      description: "Our domiciliary care team consists of compassionate, skilled professionals committed to your well-being. We uphold the highest standards of care, integrity, and safety, delivering trusted support in your own home.",
      buttonText: "Request a Care Assessment"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    },
    exit: { opacity: 0, transition: { duration: 0.20 } }
    
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.12 }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Curved bottom container - responsive height */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 z-20">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full h-full fill-white"
        >
          <path d="M 0 100 L 0 20 Q 360 0 720 20 T 1440 20 L 1440 100 Z" />
        </svg>
      </div>

      {/* Main carousel content - responsive height */}
      <div className="relative h-[80vh] md:h-[90vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Slide image with light overlay - responsive */}
            <div className="relative h-full w-full">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 43vw"
              />
              <div className="absolute inset-0 bg-[#000033]/35"></div>

            </div>

            {/* Content container - responsive */}
            <div className="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto w-full text-white text-center md:text-left">
                <motion.h1
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed max-w-xs sm:max-w-sm md:max-w-2xl mx-auto md:mx-0"
                >
                  {slides[currentSlide].description}
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <button 
                  onClick={() => router.push("/contact")}
                  className="bg-white text-blue-600 font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-sm sm:text-base transition-colors duration-300 hover:bg-blue-50">
                    {slides[currentSlide].buttonText}
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel indicators - responsive positioning */}
      <div className="absolute bottom-20 md:bottom-32 left-0 right-0 flex justify-center space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-blue-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
