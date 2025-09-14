"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  HiCog, 
  HiCube, 
  HiStar, 
  HiShieldCheck, 
  HiLightningBolt,
  HiHeart 
} from "react-icons/hi";

const WhyWe = () => {
  const reasons = [
    {
      icon: HiCog,
      title: "EPC + Distribution Under One Roof",
      description: "Your complete solar partner offering both engineering services and product distribution in a single solution.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: HiStar,
      title: "First to Introduce Panasonic Solar in Tripura",
      description: "Pioneering premium solar technology in Tripura with world-class Panasonic Solar panels and systems.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: HiCube,
      title: "Wide Range of Solar Products",
      description: "Complete inventory of panels, inverters, batteries, mounting structures & accessories from trusted brands.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: HiShieldCheck,
      title: "End-to-End EPC Support",
      description: "Comprehensive services from design and installation to subsidy guidance and long-term maintenance.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: HiLightningBolt,
      title: "Startup Agility",
      description: "Fast decision-making, innovative solutions, and personalized attention that larger companies can't match.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: HiHeart,
      title: "Transparency & Affordability",
      description: "Driven by honest pricing, clear communication, and commitment to long-term customer relationships.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 rounded-full text-sm font-semibold mb-4"
          >
            Why Choose Us
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">Sunsynchro?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover what makes us the preferred solar partner in Tripura and Northeast India
          </motion.p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 h-full border border-gray-100">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${reason.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                      {reason.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Go Solar with Sunsynchro?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join hundreds of satisfied customers who chose us for their solar journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
              >
                Get Free Consultation
              </a>
              <a
                href="/solutions"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transform hover:scale-105 transition-all duration-200"
              >
                Explore Solutions
              </a>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default WhyWe;
