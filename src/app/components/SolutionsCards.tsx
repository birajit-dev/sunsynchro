"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiTruck, HiCog, HiCube, HiArrowRight } from "react-icons/hi";

interface Solution {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  href: string;
  gradient: string;
}

const solutions: Solution[] = [
  {
    id: "distributor",
    icon: HiTruck,
    title: "Solar Distributor",
    subtitle: "Premium Components Supply",
    description: "Comprehensive distribution of high-quality solar panels, inverters, batteries, and mounting systems from world-leading manufacturers.",
    features: [
      "Global brand partnerships",
      "Bulk pricing advantages", 
      "Technical support included",
      "Fast delivery nationwide"
    ],
    image: "/solutions/distribution.jpg",
    href: "/solutions#distribution",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "epc",
    icon: HiCog,
    title: "Solar EPC",
    subtitle: "Engineering, Procurement & Construction",
    description: "Complete turnkey solar solutions from initial design and engineering through procurement, construction, and commissioning.",
    features: [
      "Custom system design",
      "Professional installation",
      "Project management",
      "Performance optimization"
    ],
    image: "/solutions/epc-services.jpg", 
    href: "/solutions#epc",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "components",
    icon: HiCube,
    title: "Solar Components",
    subtitle: "Individual Component Sales",
    description: "Individual solar components and accessories for DIY installations, maintenance, repairs, and system expansions.",
    features: [
      "Individual component sales",
      "Technical specifications",
      "Installation guides",
      "Warranty support"
    ],
    image: "/solutions/components.jpg",
    href: "/solutions#components", 
    gradient: "from-yellow-500 to-orange-500"
  }
];

const SolutionsCards = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4"
          >
            Our Solutions
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Comprehensive Solar Services
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            From distribution to installation, we provide end-to-end solar solutions 
            tailored to meet your specific energy needs and budget requirements.
          </motion.p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Icon */}
                    <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${solution.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {solution.title}
                      </h3>
                      <p className="text-sm font-medium text-green-600">
                        {solution.subtitle}
                      </p>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {solution.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href={solution.href}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-full hover:from-green-500 hover:to-yellow-500 transition-all duration-300 group-hover:shadow-lg"
                    >
                      Learn More
                      <HiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Not sure which solution is right for you?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Our solar experts are here to help you choose the perfect solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transition-all duration-200"
              >
                View All Solutions
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsCards;
