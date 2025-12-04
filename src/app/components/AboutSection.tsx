"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";

const AboutSection = () => {

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
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">Who We Are?</span>
              </h2>
            </div>

            <div className="space-y-6 mb-8">
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                Sunsynchro is Tripura&apos;s leading solar company, specializing in rooftop solar installation and distribution across the state. Based in Agartala, we serve homes and businesses throughout Tripura with expert solar solutions.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                As a trusted solar company in Tripura, we provide complete design, procurement, and installation of rooftop solar projects. We also supply premium solar panels, inverters, and components to dealers, installers, and project developers across Tripura.
              </p>
            </div>

            {/* Features Grid
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
            </div> */}

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
            className="order-1 lg:order-2 px-4 sm:px-0"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-[500px]">
                <Image
                  src="/gallery/logo.png"
                  alt="Sunsynchro professional team"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Company Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-6 space-y-3"
              >
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                  <p className="text-lg text-gray-600 font-medium">CIN: <span className="font-bold">U35105TR2025PTC014623</span></p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                  <p className="text-lg text-gray-600 font-medium">GSTIN: <span className="font-bold">16ABQCS9864C1ZR</span></p>
                </div>
              </motion.div>

              {/* Floating Card */}
              {/* <motion.div
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
              </motion.div> */}

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-20 h-20 sm:w-32 sm:h-32 bg-green-400/20 rounded-full blur-xl"></div>
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
                To provide comprehensive solar EPC and distribution services across 
                Northeast India, delivering reliable renewable energy solutions that 
                reduce costs and environmental impact.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading solar EPC and distribution company in Northeast India, 
                empowering homes, businesses, and solar professionals with world-class 
                products and services.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Values</h3>
              <p className="text-gray-600">
                Excellence in engineering, transparency in business, innovation in 
                solutions, and commitment to empowering our regional community with 
                sustainable energy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
