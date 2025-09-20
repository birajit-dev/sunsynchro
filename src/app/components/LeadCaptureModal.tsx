'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Modal from './Modal';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
        service_interest: formData.service || 'Not specified',
        customer_message: formData.message || 'No message provided',
        submission_date: new Date().toLocaleString(),
        source: 'Website Lead Modal'
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
    if (!formData.phone.trim()) {
      alert('Please enter your phone number');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Send email alert first
      const emailSent = await sendEmailAlert(formData);
      if (emailSent) {
        console.log('Email notification sent successfully');
      }

      // Method 1: Using URLSearchParams (works better with Google Apps Script)
      const params = new URLSearchParams();
      params.append('name', formData.name.trim());
      params.append('email', formData.email.trim());
      params.append('phone', formData.phone.trim());
      params.append('service', formData.service || 'Not specified');
      params.append('message', formData.message.trim() || 'No message');
      params.append('timestamp', new Date().toISOString());
      params.append('source', 'website_lead_modal');

      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxOqwPJCRc9lPQzhxzZECU0Vme_m2de2drEc_hc5YfDrIynbb0JfNgzN-Jx7SNxEJBypA/exec';
      const getUrl = `${scriptUrl}?${params.toString()}`;

      // Method 1: Try GET request with parameters
      try {
        await fetch(getUrl, {
          method: 'GET',
          mode: 'no-cors'
        });
        console.log('Form submitted successfully via GET request');
      } catch (getError) {
        console.log('GET request failed, trying POST:', getError);
        
        // Method 2: Try POST with FormData
        try {
          const formDataObj = new FormData();
          formDataObj.append('name', formData.name.trim());
          formDataObj.append('email', formData.email.trim());
          formDataObj.append('phone', formData.phone.trim());
          formDataObj.append('service', formData.service || 'Not specified');
          formDataObj.append('message', formData.message.trim() || 'No message');
          formDataObj.append('timestamp', new Date().toISOString());
          formDataObj.append('source', 'website_lead_modal');

          await fetch(scriptUrl, {
            method: 'POST',
            body: formDataObj,
            mode: 'no-cors'
          });
          console.log('Form submitted successfully via POST request');
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
          
          console.log('Form submitted via iframe fallback');
        }
      }

      // Log the data being sent for debugging
      console.log('Form data being submitted:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        timestamp: new Date().toISOString(),
        source: 'website_lead_modal'
      });

      setIsSubmitted(true);
      
      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      // Still show success to user (due to CORS limitations we can't detect actual success/failure)
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
        onClose();
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-xs">
      <div className="bg-white rounded-lg p-4">
        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-3">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Get Free Quote
              </h2>
              <p className="text-xs text-gray-600">
                Quick response in 24hrs
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Name */}
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent bg-white"
                  placeholder="Full Name *"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent bg-white"
                  placeholder="Email Address *"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent bg-white"
                  placeholder="Phone Number *"
                />
              </div>

              {/* Service Interest */}
              <div>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent bg-white"
                >
                  <option value="">Select Service</option>
                  <option value="residential-solar">Residential Solar</option>
                  <option value="commercial-solar">Commercial Solar</option>
                  <option value="solar-products">Solar Products</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>

              {/* Message (Optional) */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent bg-white resize-none"
                  placeholder="Additional message (optional)"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-semibold py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center text-sm mt-3"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Get Free Quote'
                )}
              </button>
            </form>

            {/* Trust indicators */}
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">
                🔒 Secure • ⚡ 24hr Response
              </p>
            </div>
          </>
        ) : (
          /* Success Message */
          <div className="text-center py-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Thank You!
            </h3>
             <p className="text-xs text-gray-600">
               We&apos;ll contact you within 24 hours.
             </p>
          </div>
        )}
      </div>
    </Modal>
  );
}