"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCalendar, HiUser, HiClock, HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";

// Example blog data - will be replaced with API data later
const blogPosts = [
  {
    id: "1",
    title: "The Future of Solar Energy: Trends and Innovations for 2024",
    excerpt: "Explore the latest developments in solar technology, from perovskite cells to floating solar farms, and how they're shaping the renewable energy landscape.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Technology",
    image: "/blogs/solar-future.jpg",
    slug: "future-of-solar-energy-2024"
  },
  {
    id: "2",
    title: "Solar Panel Maintenance: Essential Tips for Maximum Efficiency",
    excerpt: "Learn how to properly maintain your solar panels to ensure optimal performance and extend their lifespan with these expert maintenance tips.",
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "7 min read",
    category: "Maintenance",
    image: "/blogs/solar-maintenance.jpg",
    slug: "solar-panel-maintenance-tips"
  },
  {
    id: "3",
    title: "Understanding Solar Inverters: Types and Selection Guide",
    excerpt: "A comprehensive guide to different types of solar inverters, their pros and cons, and how to choose the right one for your solar installation.",
    author: "David Rodriguez",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Education",
    image: "/blogs/solar-inverters.jpg",
    slug: "understanding-solar-inverters-guide"
  },
  {
    id: "4",
    title: "Commercial Solar Installation: ROI and Business Benefits",
    excerpt: "Discover how commercial solar installations can reduce operating costs, improve sustainability credentials, and provide long-term financial benefits.",
    author: "Lisa Thompson",
    date: "2024-01-08",
    readTime: "8 min read",
    category: "Business",
    image: "/blogs/commercial-solar.jpg",
    slug: "commercial-solar-roi-benefits"
  },
  {
    id: "5",
    title: "Energy Storage Solutions: Batteries for Solar Systems",
    excerpt: "Compare different battery technologies for solar energy storage, including lithium-ion, lead-acid, and emerging alternatives.",
    author: "Alex Kumar",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Technology",
    image: "/blogs/energy-storage.jpg",
    slug: "energy-storage-solar-batteries"
  },
  {
    id: "6",
    title: "Solar Panel Efficiency: Factors That Affect Performance",
    excerpt: "Understanding the various factors that impact solar panel efficiency, from weather conditions to installation angles and shading effects.",
    author: "Emma Wilson",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Education",
    image: "/blogs/panel-efficiency.jpg",
    slug: "solar-panel-efficiency-factors"
  },
  {
    id: "7",
    title: "Grid-Tie vs Off-Grid Solar Systems: Which is Right for You?",
    excerpt: "Compare grid-tied and off-grid solar systems to determine which option best suits your energy needs, budget, and lifestyle requirements.",
    author: "Robert Martinez",
    date: "2024-01-01",
    readTime: "7 min read",
    category: "Planning",
    image: "/blogs/grid-tie-vs-off-grid.jpg",
    slug: "grid-tie-vs-off-grid-solar-systems"
  },
  {
    id: "8",
    title: "Solar Financing Options: Making Solar Affordable",
    excerpt: "Explore various financing options for solar installations, including loans, leases, PPAs, and government incentives to make solar more accessible.",
    author: "Jennifer Lee",
    date: "2023-12-28",
    readTime: "6 min read",
    category: "Finance",
    image: "/blogs/solar-financing.jpg",
    slug: "solar-financing-options-guide"
  },
  {
    id: "9",
    title: "Environmental Impact of Solar Energy: Beyond Carbon Reduction",
    excerpt: "Examine the comprehensive environmental benefits of solar energy, including reduced water usage, land conservation, and ecosystem protection.",
    author: "Dr. Michael Green",
    date: "2023-12-25",
    readTime: "8 min read",
    category: "Environment",
    image: "/blogs/environmental-impact.jpg",
    slug: "environmental-impact-solar-energy"
  }
];

const BlogsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Solar <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">Insights</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Stay informed with the latest trends, tips, and insights from the solar energy industry.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
                >
                  {/* Blog Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-lg">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <HiUser className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <HiClock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <HiCalendar className="w-4 h-4 mr-1" />
                        {formatDate(post.date)}
                      </div>
                      
                      <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                        Read More
                        <HiArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center items-center mt-12 space-x-2"
            >
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <HiChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <HiChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      {/* <section className="py-12 lg:py-16 bg-gradient-to-r from-green-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated with Solar Insights
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest solar industry news, tips, and insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default BlogsPage;
