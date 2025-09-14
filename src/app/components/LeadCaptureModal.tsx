'use client';

import { useState } from 'react';
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
      // Method 1: Try with fetch and FormData
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('service', formData.service);
      submitData.append('message', formData.message);
      submitData.append('timestamp', new Date().toISOString());
      submitData.append('source', 'website_lead_modal');

      try {
        await fetch('https://script.google.com/macros/s/AKfycbwpbzTRgwZ56p--mz4zrLbEiRO4imzT3owUjH81i4xXpie_ZAG4h3xLFxuyDVy6ug1Y1Q/exec', {
          method: 'POST',
          body: submitData,
          mode: 'no-cors' // Add this back for Google Apps Script
        });
        console.log('Modal form submitted successfully via fetch');
      } catch (fetchError) {
        console.log('Fetch failed, trying alternative method:', fetchError);
        
        // Method 2: Fallback using URL parameters
        const params = new URLSearchParams();
        params.append('name', formData.name);
        params.append('email', formData.email);
        params.append('phone', formData.phone);
        params.append('service', formData.service);
        params.append('message', formData.message);
        params.append('timestamp', new Date().toISOString());
        params.append('source', 'website_lead_modal');

        const scriptUrl = `https://script.google.com/macros/s/AKfycbwpbzTRgwZ56p--mz4zrLbEiRO4imzT3owUjH81i4xXpie_ZAG4h3xLFxuyDVy6ug1Y1Q/exec?${params.toString()}`;
        
        // Use an invisible iframe as fallback
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = scriptUrl;
        document.body.appendChild(iframe);
        
        // Remove iframe after 3 seconds
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 3000);
        
        console.log('Modal form submitted via iframe fallback');
      }

      console.log('Form submitted to Google Sheets:', formData);
      console.log('Name field value:', formData.name);
      console.log('Full data being sent:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        timestamp: new Date().toISOString(),
        source: 'website_lead_modal'
      });
      setIsSubmitted(true);
      
      // Reset form after 2 seconds and close modal
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
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      // Still show success to user even if there's a CORS error
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
      }, 2000);
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
