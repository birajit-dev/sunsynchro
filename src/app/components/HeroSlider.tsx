"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiPlay } from "react-icons/hi";

interface Slide {
  id: number;
  type: "image" | "video";
  src: string;
  title: string;
  subtitle: string;
  description: string;
  cta: {
    primary: { text: string; href: string };
    secondary: { text: string; href: string };
  };
}

const slides: Slide[] = [
  {
    id: 1,
    type: "image",
    src: "/hero/h1.webp",
    title: "Power Your Future",
    subtitle: "With Clean Solar Energy",
    description: "Leading provider of solar distribution and installation services. Transform your energy consumption with our cutting-edge solar solutions.",
    cta: {
      primary: { text: "Get Free Quote", href: "/contact" },
      secondary: { text: "View Solutions", href: "/solutions" }
    }
  },
  {
    id: 2,
    // The original code had type: "video" and src: "/hero/h2.webp"
    // If you want to show a webp image, type should be "image"
    // If you want to show a video, src should be a video file (mp4/webm)
    // Let's assume you want to show a webp image, so change type to "image"
    type: "image",
    src: "/hero/h2.jpg",
    title: "Professional Installation",
    subtitle: "Expert EPC Services",
    description: "From engineering to procurement and construction, our certified team delivers complete solar solutions for residential and commercial projects.",
    cta: {
      primary: { text: "Our Services", href: "/solutions" },
      secondary: { text: "View Portfolio", href: "/projects" }
    }
  },
  {
    id: 3,
    type: "image",
    src: "/hero/h3.jpg",
    title: "Commercial Solutions",
    subtitle: "Scale Your Business",
    description: "Reduce operational costs and enhance sustainability with our commercial solar solutions. Custom designs for maximum efficiency and ROI.",
    cta: {
      primary: { text: "Commercial Solar", href: "/solutions#commercial" },
      secondary: { text: "Calculate Savings", href: "/calculator" }
    }
  },
  {
    id: 4,
    type: "image",
    src: "/hero/h4.jpg",
    title: "Premium Components",
    subtitle: "Top-Tier Solar Products",
    description: "Distributor of world-class solar panels, inverters, and energy storage systems from leading manufacturers worldwide.",
    cta: {
      primary: { text: "Browse Products", href: "/products" },
      secondary: { text: "Our Brands", href: "/brands" }
    }
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen min-h-[500px] sm:min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {slides[currentSlide].type === "image" ? (
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slides[currentSlide].src})` }}
            />
          ) : (
            <video
              className="w-full h-full object-cover"
              src={slides[currentSlide].src}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full">
          <div className="max-w-4xl text-center sm:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
                
                <motion.h2 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-yellow-400"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.h2>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl leading-relaxed text-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {slides[currentSlide].description}
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <a
                    href={slides[currentSlide].cta.primary.href}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-yellow-500 rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[44px]"
                  >
                    {slides[currentSlide].cta.primary.text}
                  </a>
                  <a
                    href={slides[currentSlide].cta.secondary.href}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white border-2 border-white/50 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 min-h-[44px]"
                  >
                    {slides[currentSlide].cta.secondary.text}
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-200"
        aria-label="Previous slide"
      >
        <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-200"
        aria-label="Next slide"
      >
        <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-8 right-8 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-200"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
          <div className="w-4 h-4 flex space-x-1">
            <div className="w-1 h-4 bg-white"></div>
            <div className="w-1 h-4 bg-white"></div>
          </div>
        ) : (
          <HiPlay className="w-5 h-5 ml-0.5" />
        )}
      </button>
    </section>
  );
};

export default HeroSlider;
