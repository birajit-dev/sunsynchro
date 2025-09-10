"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../data/products";
import { HiDownload, HiStar, HiInformationCircle, HiMail, HiCheckCircle } from "react-icons/hi";

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const openProductModal = (product: typeof products[0]) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-green-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Solar <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">Products</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Discover our comprehensive catalog of premium solar components from world-leading manufacturers.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Products List */}
      <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {product.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                        <HiStar className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-2 py-1 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-bold rounded-full shadow-lg border border-green-200">
                      {product.category}
                    </span>
                  </div>
                </div>

                 {/* Product Details */}
                 <div className="p-4 sm:p-5">
                  {/* Product Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-600 font-semibold">{product.brand}</span>
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600 font-medium">Certified</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2" dangerouslySetInnerHTML={{ __html: product.description }}>
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                          <span className="text-xs text-gray-500 font-medium block">{key}</span>
                          <span className="text-gray-900 font-bold text-sm" dangerouslySetInnerHTML={{ __html: String(value) }}></span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {product.datasheet && (
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center text-sm border border-gray-200 hover:border-gray-300">
                        <HiDownload className="w-4 h-4 mr-1" />
                        Brochure
                      </button>
                    )}
                    <button
                      onClick={() => openProductModal(product)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold py-2 px-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm transform hover:scale-105"
                    >
                      <HiMail className="w-4 h-4 mr-1" />
                      Enquiry
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProductModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 lg:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 text-sm font-bold rounded-full mb-3 border border-green-200">
                      {selectedProduct.category}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                      {selectedProduct.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <p className="text-lg text-gray-600 font-semibold">{selectedProduct.brand}</p>
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">Premium Quality</span>
                    </div>
                  </div>
                  <button
                    onClick={closeProductModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-64 lg:h-80 flex items-center justify-center border border-gray-200">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-3xl">
                          {selectedProduct.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-700 font-bold text-lg">
                        {selectedProduct.name}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div>
                    <div className="mb-6">
                      <p className="text-gray-600 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedProduct.description }}>
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <HiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Technical Specifications
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-gray-700 font-semibold text-sm">{key}:</span>
                            <span className="text-gray-900 font-bold text-sm" dangerouslySetInnerHTML={{ __html: String(value) }}></span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        Request Quote
                      </button>
                      {selectedProduct.datasheet && (
                        <button className="px-4 py-3 border-2 border-green-500 text-green-600 font-bold rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 group">
                          <HiDownload className="w-4 h-4 inline mr-1 group-hover:scale-110 transition-transform" />
                          Datasheet
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-green-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need Help Choosing Products?
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Our technical experts are here to help you select the right components for your specific project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                <HiInformationCircle className="w-4 h-4 mr-2" />
                Get Expert Advice
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-600 transition-all duration-200"
              >
                Request Bulk Quote
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
