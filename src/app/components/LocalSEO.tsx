"use client";
import React from "react";
import { motion } from "framer-motion";
import { HiLocationMarker, HiPhone, HiCheckCircle } from "react-icons/hi";

const LocalSEO = () => {
  const serviceAreas = [
    "Agartala",
    "Udaipur",
    "Dharmanagar",
    "Kailasahar",
    "Belonia",
    "Khowai",
    "Teliamura",
    "Ambassa",
    "Kumarghat",
    "All of Tripura"
  ];

  const services = [
    "Solar Panel Installation in Tripura",
    "Rooftop Solar Systems in Tripura",
    "Solar EPC Services in Tripura",
    "Solar Panel Distribution in Tripura",
    "Commercial Solar Installation in Tripura",
    "Residential Solar in Tripura"
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tripura&apos;s Trusted Solar Company
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Serving homes and businesses across Tripura with expert solar installation and premium solar products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Service Areas */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <HiLocationMarker className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                We Serve All of Tripura
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              As Tripura&apos;s leading solar company, we provide solar installation and services across the entire state:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {serviceAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2">
                  <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{area}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <HiCheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Our Solar Services in Tripura
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Comprehensive solar solutions for Tripura residents and businesses:
            </p>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={index} className="flex items-start gap-3">
                  <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Go Solar in Tripura?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Get a free solar quote for your home or business in Tripura. Our experts will help you save on electricity bills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+919742422340"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <HiPhone className="w-5 h-5" />
              Call: +91 9742422340
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-200 border-2 border-white/50"
            >
              Get Free Quote
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocalSEO;

