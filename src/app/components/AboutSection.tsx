"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiCheckCircle, HiArrowRight } from "react-icons/hi";

const AboutSection = () => {
  const features = [
    "15+ years of industry experience",
    "Certified installation professionals",
    "Premium quality components only",
    "Comprehensive warranty coverage",
    "24/7 monitoring and support",
    "Custom solutions for every need"
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                About Sunsynchro
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Leading the Solar Revolution with 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600"> Innovation</span>
              </h2>
            </div>

            <div className="space-y-6 mb-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                At Sunsynchro, we&apos;re more than just a solar company – we&apos;re your partners in building 
                a sustainable future. With over 15 years of experience in solar distribution and 
                installation, we&apos;ve helped thousands of clients harness the power of the sun.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Our comprehensive approach combines cutting-edge technology, premium components, 
                and expert installation services to deliver solar solutions that exceed expectations. 
                From residential rooftops to large commercial installations, we make clean energy accessible to everyone.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 group"
              >
                Learn More About Us
                <HiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-green-500 text-green-600 font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-200"
              >
                Get Free Consultation
              </Link>
            </motion.div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/about/solar-team.jpg"
                  alt="Sunsynchro professional team"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">15+</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Years of</p>
                    <p className="font-semibold text-gray-900">Excellence</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-400/20 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To accelerate the world&apos;s transition to sustainable energy through 
                innovative solar solutions and exceptional service.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-gray-600">
                A world powered by clean, renewable energy where every building 
                contributes to a sustainable future.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Values</h3>
              <p className="text-gray-600">
                Quality, integrity, innovation, and sustainability guide everything 
                we do in our commitment to our clients and the planet.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
