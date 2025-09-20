"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiPhone, HiMail, HiLocationMarker, HiClock } from "react-icons/hi";
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendEmailAlert = async (formData: FormData) => {
    try {
      // Initialize EmailJS (you need to call this once in your app)
      emailjs.init('zKip-4kLgSFyNmZLH'); // Replace with your EmailJS public key

      const templateParams = {
        name: 'Sunsynchro Private Limited', // Recipient name
        reply_to: 'sunsynchro1@gmail.com', // Your company email
        from_name: formData.name,
        from_email: formData.email,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        service_interest: formData.projectType || 'Not specified',
        customer_message: formData.message || 'No message provided',
        submission_date: new Date().toLocaleString(),
        source: 'Website Contact Form'
      };

      const response = await emailjs.send(
        'service_h8dcvda',    // Replace with your EmailJS service ID
        'template_mt5dqkk',   // Replace with your EmailJS template ID
        templateParams
      );

      console.log('Email alert sent successfully:', response);
      return true;
    } catch (error) {
      console.error('Error sending email alert:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Send email alert first
      const emailSent = await sendEmailAlert(formData);
      if (emailSent) {
        console.log('Email notification sent successfully');
      }

      // Prepare data with trimming and fallbacks
      const params = new URLSearchParams();
      params.append('name', formData.name.trim());
      params.append('email', formData.email.trim());
      params.append('phone', formData.phone.trim() || 'Not provided');
      params.append('service', formData.projectType || 'Not specified');
      params.append('message', formData.message.trim() || 'No message');
      params.append('timestamp', new Date().toISOString());
      params.append('source', 'website_contact_form');

      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxOqwPJCRc9lPQzhxzZECU0Vme_m2de2drEc_hc5YfDrIynbb0JfNgzN-Jx7SNxEJBypA/exec';
      const getUrl = `${scriptUrl}?${params.toString()}`;

      // Method 1: Try GET request with parameters (often works better with Google Apps Script)
      try {
        await fetch(getUrl, {
          method: 'GET',
          mode: 'no-cors'
        });
        console.log('Contact form submitted successfully via GET request');
      } catch (getError) {
        console.log('GET request failed, trying POST:', getError);
        
        // Method 2: Try POST with FormData
        try {
          const formDataObj = new FormData();
          formDataObj.append('name', formData.name.trim());
          formDataObj.append('email', formData.email.trim());
          formDataObj.append('phone', formData.phone.trim() || 'Not provided');
          formDataObj.append('service', formData.projectType || 'Not specified');
          formDataObj.append('message', formData.message.trim() || 'No message');
          formDataObj.append('timestamp', new Date().toISOString());
          formDataObj.append('source', 'website_contact_form');

          await fetch(scriptUrl, {
            method: 'POST',
            body: formDataObj,
            mode: 'no-cors'
          });
          console.log('Contact form submitted successfully via POST request');
        } catch (postError) {
          console.log('POST request failed, using iframe method:', postError);
          
          // Method 3: Fallback using iframe
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = getUrl;
          document.body.appendChild(iframe);
          
          // Remove iframe after 5 seconds
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 5000);
          
          console.log('Contact form submitted via iframe fallback');
        }
      }

      // Log the data being sent for debugging
      console.log('Contact form data being submitted:', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.projectType,
        message: formData.message.trim(),
        source: 'website_contact_form'
      });

      setIsSubmitted(true);
      
      // Reset form after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: ""
        });
      }, 4000);

    } catch (error) {
      console.error('Contact form submission error:', error);
      // Still show success to user (due to CORS limitations we can't detect actual success/failure)
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: ""
        });
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: HiPhone,
      title: "Phone",
      details: ["+91 9611548340"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: HiMail,
      title: "Email",
      details: ["info@sunsynchro.com"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: HiLocationMarker,
      title: "Address",
      details: ["66, Ward No. 12, Ramnagar, West Tripura, 799002"],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: HiClock,
      title: "Business Hours",
      details: ["Mon-Sat: 9:00 AM - 7:00 PM", "Sat: 10:00 AM - 2:00 PM"],
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">Sunsynchro</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Ready to start your solar journey? Get in touch with our expert team for a free consultation 
              and personalized solar solution.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get Your Free Quote
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+91 9611548340"
                      />
                    </div>
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select project type</option>
                        <option value="residential-solar">Residential Solar</option>
                        <option value="commercial-solar">Commercial Solar</option>
                        <option value="industrial-solar">Industrial Solar</option>
                        <option value="maintenance">Maintenance Service</option>
                        <option value="consultation">Consultation Only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Tell us about your project, energy goals, or any questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-yellow-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message Sent Successfully!
                      </>
                    ) : (
                      'Send Message & Get Free Quote'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get In Touch
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Have questions about solar energy? Need a custom quote? Our expert team 
                  is here to help you every step of the way.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+919611548340"
                    className="flex items-center space-x-3 text-white hover:text-gray-200 transition-colors"
                  >
                    <HiPhone className="w-5 h-5" />
                    <span>Call us now: +91 9611548340</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Visit Our Office
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See our solar solutions in person and speak with our experts face-to-face.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
              <div className="text-center">
                <HiLocationMarker className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Interactive Map Location
                </h3>
                <p className="text-gray-600 mb-4">
                  Google Maps integration showing our office location
                </p>
                <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
                  <p className="text-sm text-gray-700 font-medium">
                    66, Ward No. 12, Ramnagar<br />
                    West Tripura, 799002
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;