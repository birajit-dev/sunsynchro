"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiExternalLink, HiCheckCircle, HiShieldCheck, HiSun, HiChip, HiLightningBolt, HiCube } from "react-icons/hi";

const BrandsPage = () => {
  const brandCategories = ["All", "Solar Panels", "Inverters", "Energy Meters", "Storage & Accessories"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const brands = [
    {
      id: "panasonic",
      name: "Panasonic",
      category: "Solar Panels",
      description: "Renowned worldwide for high-efficiency HIT® and half-cut solar modules, delivering superior performance in all conditions.",
      website: "https://panasonic.com/solar"
    },
    {
      id: "novasys",
      name: "Novasys",
      category: "Solar Panels", 
      description: "Reliable and affordable solar panels specifically designed and optimized for Indian weather conditions.",
      website: "https://novasys.com"
    },
    {
      id: "sunpower",
      name: "SunPower (Maxeon)",
      category: "Solar Panels",
      description: "Premium solar modules offering industry-leading efficiency ratings and comprehensive long-term warranties.",
      website: "https://sunpower.maxeon.com"
    },
    {
      id: "feston",
      name: "Feston",
      category: "Inverters",
      description: "Advanced on-grid and hybrid inverters featuring smart monitoring capabilities and robust performance.",
      website: "https://feston.com"
    },
    {
      id: "enphase",
      name: "Enphase",
      category: "Inverters",
      description: "Revolutionary microinverter technology enabling safer and smarter solar installations with module-level monitoring.",
      website: "https://enphase.com"
    },
    {
      id: "fimer-abb",
      name: "FIMER-ABB",
      category: "Inverters",
      description: "Globally trusted brand delivering robust string inverters ideal for large-scale solar installations.",
      website: "https://fimer.com"
    },
    {
      id: "deye",
      name: "Deye",
      category: "Inverters",
      description: "Innovative hybrid and on-grid inverters with seamless energy storage integration capabilities.",
      website: "https://deye.com"
    },
    {
      id: "fuji",
      name: "Fuji Electric",
      category: "Inverters",
      description: "High-performance inverters engineered specifically for demanding industrial applications.",
      website: "https://fujielectric.com"
    },
    {
      id: "livguard",
      name: "Livguard",
      category: "Inverters",
      description: "Reliable solar inverters specially designed for Indian residential and commercial applications.",
      website: "https://livguard.com"
    },
    {
      id: "secure",
      name: "Secure Energy Meters",
      category: "Energy Meters",
      description: "Comprehensive range of smart prepaid meters, ABT meters and digital panel meters for precise solar monitoring.",
      website: "https://securemeters.com"
    },
    {
      id: "storage",
      name: "Energy Storage Solutions",
      category: "Storage & Accessories",
      description: "Premium lithium-ion and lead acid battery systems providing reliable energy storage for all applications.",
    },
    {
      id: "bos",
      name: "Mounting & BOS",
      category: "Storage & Accessories",
      description: "High-quality mounting structures and balance of system components ensuring installation durability and safety.",
    }
  ];

  const filteredBrands = selectedCategory === "All" 
    ? brands 
    : brands.filter(brand => brand.category === selectedCategory);

  const features = [
    {
      icon: HiShieldCheck,
      title: "Certified Products",
      description: "All products meet international quality and safety standards"
    },
    {
      icon: HiCheckCircle, 
      title: "Warranty Backed",
      description: "Comprehensive manufacturer warranties on all components"
    },
    {
      icon: HiSun,
      title: "Premium Quality",
      description: "Only tier-1 manufacturers with proven track records"
    },
    {
      icon: HiChip,
      title: "Technical Support",
      description: "Expert guidance and after-sales service support"
    }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400/10 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-green-400/10 border border-green-400/20 rounded-full text-green-400 text-sm font-medium mb-6"
            >
              <HiShieldCheck className="w-4 h-4 mr-2" />
              Authorized Distributor
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Our Trusted
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Brand Partners
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed"
            >
              Partnering with world-class solar brands to deliver high-efficiency panels, inverters,
              energy meters, and accessories that guarantee long-term performance and peace of mind.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-lg sticky top-16 lg:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {brandCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                        {brand.category}
                      </span>
                      <HiCheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {brand.name}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 line-clamp-3">
                      {brand.description}
                    </p>

                    <div className="flex gap-3">
                      <a
                        href="/contact"
                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors"
                      >
                        Learn More
                      </a>
                      {brand.website && (
                        <a
                          href={brand.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          <HiExternalLink className="w-5 h-5 text-slate-600" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Our Brand Partners?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We partner only with industry leaders to ensure every installation meets
              the highest standards of quality, efficiency and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Work with the Best Brands in Solar?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re installing a solar system or sourcing components,
            our partnerships with trusted brands guarantee the best results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-colors"
            >
              <HiCube className="w-5 h-5 mr-2" />
              Explore Products
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <HiLightningBolt className="w-5 h-5 mr-2" />
              Get Started
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandsPage;
