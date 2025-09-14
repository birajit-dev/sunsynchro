"use client";
import React from "react";
import { motion } from "framer-motion";
import { HiCheckCircle, HiBadgeCheck, HiUsers, HiLightningBolt, HiSparkles } from "react-icons/hi";

const AboutPage = () => {
  const achievements = [
    {
      icon: HiLightningBolt,
      title: "EPC Services",
      description: "Residential, commercial & institutional solar installations"
    },
    {
      icon: HiUsers,
      title: "Distribution",
      description: "Solar panels, inverters, batteries & accessories across Tripura"
    },
    {
      icon: HiBadgeCheck,
      title: "Customer First",
      description: "Complete subsidy and financing support model"
    },
    {
      icon: HiCheckCircle,
      title: "Trusted Partner",
      description: "Recognized partner for customers and dealers"
    }
  ];

  const certifications = [
    "MNRE Guidelines Compliant",
    "Safety Standards Certified", 
    "Subsidy Program Approved",
    "Quality Management System",
    "Professional Installation Team",
    "Authorized Distribution Partner"
  ];

  return (
    <div className="pt-16 lg:pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-green-50 via-emerald-50 to-yellow-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-green-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center mb-6"
            >
              <HiSparkles className="w-8 h-8 text-yellow-500 mr-3" />
              <span className="text-lg font-semibold text-green-600 tracking-wide uppercase">About Us</span>
              <HiSparkles className="w-8 h-8 text-yellow-500 ml-3" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-yellow-600">Sunsynchro</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Delivering solar EPC services and premium product distribution in Tripura
            </motion.p>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-32 right-20 w-6 h-6 bg-green-400 rounded-full opacity-40"
            />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
              <p className="text-lg lg:text-xl text-gray-600 mb-12 leading-relaxed">
                Sunsynchro Energy Pvt. Ltd. is a new-age solar EPC cum distribution startup based in Tripura. We design and install rooftop solar systems while also supplying high-quality components and accessories—including solar panels, inverters, batteries, mounting structures, and wiring solutions—to customers, dealers, and project developers.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Story</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-yellow-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded in 2025, Sunsynchro was created with a vision to accelerate solar adoption in Northeast India by combining project execution expertise with reliable product distribution.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                <p className="text-lg text-gray-600 leading-relaxed">
                  As a startup, we are among the first to introduce Panasonic Solar panels and premium solar technologies to Tripura, making global-standard products available locally. Our dual role as an EPC and distribution company ensures that both end-users and channel partners benefit from affordable, high-performance solar solutions.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-yellow-500 rounded-3xl blur opacity-20"></div>
              <img
                src="/gallery/logo2.png"
                alt="Our Story"
                className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-yellow-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Focus & Early <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">Achievements</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-yellow-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-green-50/30 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-green-400/10 to-yellow-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-emerald-400/10 to-green-400/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Commitment</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-yellow-500 mx-auto rounded-full mb-8"></div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Sunsynchro is committed to adhering to industry best practices, government guidelines, and subsidy program requirements. Every installation and product supplied is backed by strict quality checks, ensuring performance, safety, and durability. As we grow, we aim to secure additional certifications and accreditations to strengthen customer and partner confidence.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center space-x-4 border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex items-center space-x-4 w-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <HiCheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">{cert}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default AboutPage;
