"use client";
import React from "react";
import { motion } from "framer-motion";
import { brands } from "../../data/brands";

const LogoCarousel = () => {
  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-16 lg:py-24 bg-white">
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
            Trusted Partners
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            World-Class Brand Partners
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We partner with industry-leading manufacturers to bring you the highest quality 
            solar components and cutting-edge technology.
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: [0, -1920], // Adjust based on total width
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            className="flex space-x-8 md:space-x-12"
          >
            {duplicatedBrands.map((brand, index) => (
              <motion.div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 w-32 md:w-40 lg:w-48"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-24 flex items-center justify-center group">
                  {/* Brand logo image or fallback to name */}
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-gray-600 font-semibold text-sm md:text-base text-center px-2">
                      {brand.name}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Brand Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Solar Panels</h3>
              <p className="text-gray-600 text-sm">
                Premium photovoltaic modules from leading manufacturers worldwide
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Inverters</h3>
              <p className="text-gray-600 text-sm">
                High-efficiency string and micro inverters for optimal performance
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Batteries</h3>
              <p className="text-gray-600 text-sm">
                Advanced energy storage solutions for residential and commercial use
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Mounting</h3>
              <p className="text-gray-600 text-sm">
                Robust mounting systems designed for durability and easy installation
              </p>
            </div>
          </div> */}
        </motion.div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Why Our Brand Partnerships Matter
              </h3>
              <p className="text-lg opacity-90 max-w-3xl mx-auto">
                Our strategic partnerships with industry leaders ensure you receive the best 
                products, pricing, and support for your solar investment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-sm opacity-90">Years Average Warranty</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">99%</div>
                <div className="text-sm opacity-90">Product Reliability Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Technical Support</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/brands"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Explore All Brands
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              Browse Products
            </a>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default LogoCarousel;