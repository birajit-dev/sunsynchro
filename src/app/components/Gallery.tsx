"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
}

// Only 4 images
const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "/gallery/residential-rooftop-1.jpg",
    title: "Residential Rooftop Installation",
    category: "Residential",
    description: "Beautiful 8kW residential solar system installed on a modern home"
  },
  {
    id: "2", 
    src: "/gallery/commercial-building-1.jpg",
    title: "Commercial Office Building",
    category: "Commercial",
    description: "Large-scale 250kW commercial solar installation for office complex"
  },
  {
    id: "3",
    src: "/gallery/solar-farm-1.jpg",
    title: "Utility-Scale Solar Farm",
    category: "Utility",
    description: "Massive 50MW utility-scale solar farm project completion"
  },
  {
    id: "4",
    src: "/gallery/residential-rooftop-2.jpg",
    title: "Modern Home Solar System",
    category: "Residential", 
    description: "Sleek 12kW solar installation with energy storage system"
  }
];

const Gallery = () => {
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (item: GalleryItem) => {
    setLightboxImage(item);
    setLightboxIndex(galleryItems.findIndex(i => i.id === item.id));
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % galleryItems.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(galleryItems[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    setLightboxIndex(prevIndex);
    setLightboxImage(galleryItems[prevIndex]);
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4"
          >
            Our Work
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Project Gallery
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Explore our portfolio of successful solar installations across residential, 
            commercial, and utility-scale projects.
          </motion.p>
        </div>

        {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
          <AnimatePresence>
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-64 sm:h-80 lg:h-96 w-full">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <span className="inline-block px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-xs sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <HiX className="w-8 h-8" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <HiChevronLeft className="w-8 h-8" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <HiChevronRight className="w-8 h-8" />
                </button>

                {/* Image */}
                <div className="relative">
                  <img
                    src={lightboxImage.src}
                    alt={lightboxImage.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  />
                  
                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                    <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded mb-2">
                      {lightboxImage.category}
                    </span>
                    <h3 className="text-white font-bold text-xl mb-2">
                      {lightboxImage.title}
                    </h3>
                    <p className="text-gray-200">
                      {lightboxImage.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>       
      </div>
    </section>
  );
};

export default Gallery;
