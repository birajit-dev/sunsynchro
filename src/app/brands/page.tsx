"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brands, brandCategories } from "../../data/brands";
import { HiExternalLink, HiInformationCircle, HiCheckCircle, HiShieldCheck, HiCurrencyDollar, HiSupport } from "react-icons/hi";

const BrandsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBrands = selectedCategory === "All" 
    ? brands 
    : brands.filter(brand => brand.category === selectedCategory);

  return (
    <div className="pt-16 lg:pt-20 bg-gradient-to-br from-slate-50 via-white to-green-50/30 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-100/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-100/20 via-transparent to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-6"
            >
              <HiShieldCheck className="w-4 h-4 mr-2" />
              Trusted by Industry Leaders
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
            >
              Premium Solar
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Brand Partners
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto"
            >
              We collaborate exclusively with tier-1 manufacturers to deliver cutting-edge solar technology, 
              uncompromising quality, and industry-leading warranties for your renewable energy investments.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-slate-100 sticky top-16 lg:top-20 z-40">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {brandCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm ${
                  selectedCategory === category
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/25"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50/50 to-white/50">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <motion.div 
            layout
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
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
                  className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200/60 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  {/* Brand Logo */}
                  <div className="relative h-40 bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center p-8">
                    <div className="w-full h-full bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:shadow-md transition-shadow duration-300">
                      <span className="text-slate-700 font-semibold text-lg text-center px-4">
                        {brand.name}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Brand Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md border border-green-200">
                          {brand.category}
                        </span>
                        <div className="flex items-center text-xs text-slate-500">
                          <HiCheckCircle className="w-3 h-3 mr-1 text-green-500" />
                          Verified
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                        {brand.name}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3">
                      {brand.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <a
                        href="/products"
                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-center shadow-sm hover:shadow-md"
                      >
                        View Products
                      </a>
                      {brand.website && (
                        <a
                          href={brand.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-sm"
                        >
                          <HiExternalLink className="w-4 h-4 text-slate-600" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredBrands.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiInformationCircle className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-lg text-slate-600 mb-2">No brands found</p>
              <p className="text-sm text-slate-500">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-white via-slate-50/30 to-green-50/20">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-700 text-sm font-medium mb-6"
            >
              Partnership Excellence
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight"
            >
              Why Our Brand Partnerships
              <span className="block text-green-600">Drive Your Success</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Our strategic alliances with industry leaders ensure you receive premium products, 
              competitive pricing, and comprehensive support for your solar investments.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Quality Assurance",
                description: "Tier-1 manufacturers with proven track records, industry certifications, and rigorous quality standards",
                icon: HiShieldCheck,
                color: "green"
              },
              {
                title: "Competitive Pricing", 
                description: "Volume purchasing agreements and strategic partnerships deliver exceptional value to our customers",
                icon: HiCurrencyDollar,
                color: "blue"
              },
              {
                title: "Technical Excellence",
                description: "Direct manufacturer support, comprehensive training, and cutting-edge technical resources",
                icon: HiSupport,
                color: "purple"
              },
              {
                title: "Warranty Protection",
                description: "Industry-leading warranties backed by financially stable manufacturers with global presence",
                icon: HiCheckCircle,
                color: "emerald"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className={`w-12 h-12 bg-${benefit.color}-50 border border-${benefit.color}-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`w-6 h-6 text-${benefit.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-slate-50/50 via-white/50 to-slate-50/50">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "8+", label: "Brand Partners", sublabel: "Tier-1 manufacturers", delay: 0 },
              { value: "25+", label: "Years Average", sublabel: "Product warranties", delay: 0.1 },
              { value: "99.9%", label: "Reliability Rate", sublabel: "Across all products", delay: 0.2 },
              { value: "24/7", label: "Support", sublabel: "Technical assistance", delay: 0.3 }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: stat.delay }}
                className="text-center group"
              >
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-base font-semibold text-slate-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-slate-500">
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Ready to Explore Our
              <span className="block text-green-400">Premium Brand Portfolio?</span>
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover our complete product catalog or connect with our technical experts to find 
              the perfect brands and solutions for your specific project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a
                href="/products"
                className="flex-1 bg-white text-slate-900 font-semibold py-3 px-6 rounded-lg hover:bg-slate-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Browse Products
              </a>
              <a
                href="/contact"
                className="flex-1 border-2 border-slate-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-800 hover:border-slate-500 transition-all duration-200"
              >
                <HiInformationCircle className="w-4 h-4 inline mr-2" />
                Get Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BrandsPage;
