"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiSun,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiGlobeAlt,
  HiHashtag,
  HiLink,
  HiPhotograph,
} from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Solutions",
      links: [
        { name: "Solar Distribution", href: "/solutions#distribution" },
        { name: "Solar EPC", href: "/solutions#epc" },
        { name: "Solar Components", href: "/solutions#components" },
        { name: "Maintenance Services", href: "/solutions#maintenance" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "Solar Panels", href: "/products?category=panels" },
        { name: "Inverters", href: "/products?category=inverters" },
        { name: "Energy Storage", href: "/products?category=storage" },
        { name: "Mounting Systems", href: "/products?category=mounting" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Brands", href: "/brands" },
        { name: "Blog", href: "/blogs" },
        { name: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Technical Support", href: "/support" },
        { name: "Warranty", href: "/warranty" },
        { name: "Documentation", href: "/docs" },
      ],
    },
  ];

  const socialLinks = [
    { icon: HiGlobeAlt, href: "#", label: "Facebook" },
    { icon: HiHashtag, href: "#", label: "Twitter" },
    { icon: HiLink, href: "#", label: "LinkedIn" },
    { icon: HiPhotograph, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl flex items-center justify-center">
                  <HiSun className="w-7 h-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-2xl">Sunsynchro Pvt. Ltd.</span>
                  {/* <span className="text-sm text-green-400">
                    Clean Energy Solutions
                  </span> */}
                </div>
              </Link>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
              A solar EPC cum distribution startup in Tripura, delivering turnkey rooftop installations and high-quality solar components.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <HiPhone className="w-5 h-5 text-green-400" />
                  <span>+91 9742422340</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <HiMail className="w-5 h-5 text-green-400" />
                  <span>sunsynchro1@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <HiLocationMarker className="w-5 h-5 text-green-400" />
                  <span>GE, Ward No. 12, Ramnagar, West Tripura, 799002</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h3 className="font-semibold text-lg mb-4 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm">
                Get the latest news about solar technology and industry updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent flex-1 lg:w-64"
              />
              <button className="bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Sunsynchro. All rights reserved. | 
              <Link href="/privacy" className="hover:text-green-400 ml-1">Privacy Policy</Link> | 
              <Link href="/terms" className="hover:text-green-400 ml-1">Terms of Service</Link>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-500 rounded-full flex items-center justify-center transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
