"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiPhone, HiMail, HiLocationMarker, HiSun } from "react-icons/hi";

const ContactCTA = () => {
  const contactMethods = [
    {
      icon: HiPhone,
      title: "Call Us",
      description: "Speak directly with our experts",
      action: "tel:+919742422340",
      actionText: "+91 974242234",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: HiMail,
      title: "Email Us",
      description: "Get detailed information via email",
      action: "mailto:sunsynchro1@gmail.com",
      actionText: "sunsynchro1@gmail.com",
      color: "from-green-500 to-green-600"
    },
    // {
    //   icon: HiChatAlt,
    //   title: "Live Chat",
    //   description: "Chat with our support team",
    //   action: "#chat",
    //   actionText: "Start Chat",
    //   color: "from-purple-500 to-purple-600"
    // },
    {
      icon: HiLocationMarker,
      title: "Visit Us",
      description: "Come to our showroom",
      action: "/contact#locations",
      actionText: "Find Locations",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <HiSun className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Go Solar?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who have made the switch to clean, 
              renewable energy. Start your solar journey today.
            </p>
          </motion.div>

          
        </div>

        {/* Contact Methods Grid */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{method.description}</p>
                    
                    <a
                      href={method.action}
                      className="inline-block text-green-400 hover:text-green-300 font-semibold text-sm transition-colors"
                    >
                      {method.actionText}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Value Propositions */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">$0</div>
            <div className="text-lg font-semibold mb-2">Down Payment</div>
            <div className="text-gray-300 text-sm">
              Multiple financing options available with zero upfront costs
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">25</div>
            <div className="text-lg font-semibold mb-2">Year Warranty</div>
            <div className="text-gray-300 text-sm">
              Comprehensive warranty coverage on all components and installation
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">30%</div>
            <div className="text-lg font-semibold mb-2">Federal Tax Credit</div>
            <div className="text-gray-300 text-sm">
              Take advantage of federal incentives and local rebate programs
            </div>
          </div>
        </motion.div> */}

        {/* Testimonial Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <blockquote className="text-xl md:text-2xl font-light italic mb-6 text-gray-200">
              &quot;Sunsynchro exceeded our expectations. From the initial consultation to the final 
              installation, their team was professional, knowledgeable, and efficient. Our energy 
              bills have dropped by 90% and we couldn&apos;t be happier!&quot;
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">MJ</span>
              </div>
              <div className="text-left">
                <div className="font-semibold">Michael Johnson</div>
                <div className="text-gray-300 text-sm">Homeowner, California</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 mb-6">
            Ready to start saving with solar? Our experts are standing by to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-colors"
            >
              <HiPhone className="w-5 h-5 mr-2" />
              Call Now: +91 9742422340
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Schedule Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
