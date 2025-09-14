"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiHome, HiOfficeBuilding, HiCog, HiTruck, HiCurrencyDollar, HiArrowRight } from "react-icons/hi";

interface Solution {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  gradient: string;
}

const solutions: Solution[] = [
  {
    id: "residential",
    icon: HiHome,
    title: "Residential Rooftop Solar",
    subtitle: "Home Solar Systems",
    description: "Reduce your power bills with reliable home solar systems designed for residential properties.",
    image: "/gallery/roof-solar.webp",
    href: "/solutions#residential",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "commercial",
    icon: HiOfficeBuilding,
    title: "Commercial & Industrial Solar",
    subtitle: "Business Solar Solutions",
    description: "Smart solar installations for offices, schools, shops & industries to reduce operational costs.",
    image: "/gallery/commercial.jpg",
    href: "/solutions#commercial",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "epc",
    icon: HiCog,
    title: "Solar EPC Services",
    subtitle: "Engineering, Procurement & Construction",
    description: "Complete Engineering, Procurement & Construction services for solar projects of all sizes.",
    image: "/gallery/epc.png", 
    href: "/solutions#epc",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "distribution",
    icon: HiTruck,
    title: "Distribution Services",
    subtitle: "Solar Components Supply",
    description: "Supply of solar panels, inverters, batteries, structures, and accessories to dealers & installers.",
    image: "/gallery/dist.webp",
    href: "/solutions#distribution",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: "subsidy",
    icon: HiCurrencyDollar,
    title: "Subsidy & Financing Assistance",
    subtitle: "Financial Support Services",
    description: "Hassle-free support for central/state solar subsidy schemes and financing options.",
    image: "/gallery/subsidy.png",
    href: "/solutions#subsidy",
    gradient: "from-yellow-500 to-orange-500"
  }
];

const SolutionsCards = () => {
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
            className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-base font-semibold mb-4"
          >
            Our Solutions
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Our Solar Solutions & Products
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
          >
            From residential rooftops to large commercial installations, we provide comprehensive 
            solar solutions with complete support from planning to commissioning.
          </motion.p>
        </div>

        {/* Solutions Grid */}
        <div className="mb-16">
          {/* First row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6 justify-center">
            {solutions.slice(0, 3).map((solution, index) => {
              const IconComponent = solution.icon;
              
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Icon */}
                      <div className={`absolute top-3 left-3 w-10 h-10 bg-gradient-to-br ${solution.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {solution.title}
                        </h3>
                        <p className="text-sm font-medium text-green-600">
                          {solution.subtitle}
                        </p>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed text-base flex-grow">
                        {solution.description}
                      </p>

                      {/* CTA */}
                      <Link
                        href={solution.href}
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-full hover:from-green-500 hover:to-yellow-500 transition-all duration-300 group-hover:shadow-lg text-base mt-auto"
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

          {/* Second row - 2 cards centered */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-2xl">
              {solutions.slice(3, 5).map((solution, index) => {
                const IconComponent = solution.icon;
                
                return (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
                        <img
                          src={solution.image}
                          alt={solution.title}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        
                        {/* Icon */}
                        <div className={`absolute top-3 left-3 w-10 h-10 bg-gradient-to-br ${solution.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="mb-3">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {solution.title}
                          </h3>
                          <p className="text-sm font-medium text-green-600">
                            {solution.subtitle}
                          </p>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed text-base flex-grow">
                          {solution.description}
                        </p>

                        {/* CTA */}
                        <Link
                          href={solution.href}
                          className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-full hover:from-green-500 hover:to-yellow-500 transition-all duration-300 group-hover:shadow-lg text-base mt-auto"
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
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-green-600 via-green-500 to-yellow-500 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Switch to Solar with Sunsynchro Today
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-95 max-w-4xl mx-auto leading-relaxed">
                Whether you want to install a rooftop solar system or source premium solar products, 
                Sunsynchro Energy Pvt. Ltd. is your trusted partner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 lg:px-10 py-4 lg:py-5 bg-white text-green-600 font-bold rounded-full hover:bg-gray-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg lg:text-xl min-w-[200px]"
                >
                  👉 Request a Free Quote
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 lg:px-10 py-4 lg:py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-600 transform hover:scale-105 transition-all duration-300 text-lg lg:text-xl min-w-[200px]"
                >
                  Explore Our Product Catalog
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsCards;
