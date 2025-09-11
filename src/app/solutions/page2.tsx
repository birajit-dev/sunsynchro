"use client";
import React from "react";
import { motion } from "framer-motion";
import { HiTruck, HiCog, HiCube, HiCheckCircle } from "react-icons/hi";

const SolutionsPage = () => {
  const solutions = [
    {
      id: "distribution",
      icon: HiTruck,
      title: "Solar Distribution",
      subtitle: "Premium Components Supply Chain",
      description: "Comprehensive distribution network providing high-quality solar components from world-leading manufacturers to installers and contractors nationwide.",
      features: [
        "Global brand partnerships with tier-1 manufacturers",
        "Bulk pricing advantages for volume purchases",
        "Technical support and product training included",
        "Fast nationwide delivery and logistics",
        "Inventory management and forecasting",
        "Quality assurance and product warranties"
      ],
      benefits: [
        "Access to premium solar components",
        "Competitive wholesale pricing",
        "Reliable supply chain management",
        "Expert technical consultation"
      ]
    },
    {
      id: "epc",
      icon: HiCog,
      title: "Solar EPC Services",
      subtitle: "Engineering, Procurement & Construction",
      description: "Complete turnkey solar solutions from initial site assessment and system design through procurement, installation, and commissioning for residential and commercial projects.",
      features: [
        "Custom system design and engineering",
        "Professional installation by certified technicians",
        "Complete project management from start to finish",
        "Performance optimization and system commissioning",
        "Permitting and interconnection assistance",
        "Post-installation monitoring and support"
      ],
      benefits: [
        "Single-source responsibility",
        "Streamlined project delivery",
        "Quality installation guarantee",
        "Ongoing performance monitoring"
      ]
    },
    {
      id: "components",
      icon: HiCube,
      title: "Solar Components",
      subtitle: "Individual Component Sales & Support",
      description: "Individual solar components and accessories for DIY installations, system maintenance, repairs, and expansions with comprehensive technical documentation and support.",
      features: [
        "Individual component sales for any project size",
        "Detailed technical specifications and datasheets",
        "Installation guides and technical documentation",
        "Comprehensive warranty support and service",
        "Compatibility consulting and system matching",
        "Replacement parts and upgrade components"
      ],
      benefits: [
        "Flexible purchasing options",
        "Expert component matching",
        "Technical documentation included",
        "Warranty and support coverage"
      ]
    }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Solar <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">Solutions</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Comprehensive solar services tailored to meet your specific needs, from individual components to complete turnkey installations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Solutions Details */}
      {solutions.map((solution, index) => {
        const IconComponent = solution.icon;
        const isEven = index % 2 === 0;
        
        return (
          <section key={solution.id} className={`py-16 lg:py-24 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={!isEven ? 'lg:col-start-2' : ''}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full flex items-center justify-center mr-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {solution.title}
                      </h2>
                      <p className="text-lg text-green-600 font-medium">
                        {solution.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features:</h3>
                    <ul className="space-y-3">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Get Started
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-200"
                    >
                      Learn More
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={!isEven ? 'lg:col-start-1' : ''}
                >
                  <div className="bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Benefits:</h3>
                    <div className="space-y-4">
                      {solution.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">{idx + 1}</span>
                          </div>
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-green-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Choose Your Solar Solution?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Our expert team will help you select the perfect solar solution for your specific needs, budget, and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                Get Free Consultation
              </a>
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-600 transition-all duration-200"
              >
                Browse Products
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
