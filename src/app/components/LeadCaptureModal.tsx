'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Modal from './Modal';
import { submitLead } from '../../lib/leads';

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
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmailAlert = async (data: FormData) => {
    try {
      emailjs.init('zKip-4kLgSFyNmZLH');
      await emailjs.send(
        'service_h8dcvda',
        'template_mt5dqkk',
        {
          name: 'Sunsynchro Private Limited',
          reply_to: 'sunsynchro1@gmail.com',
          from_name: data.name,
          from_email: data.email,
          customer_name: data.name,
          customer_email: data.email,
          customer_phone: data.phone,
          service_interest: data.service || 'Not specified',
          customer_message: data.message || 'No message provided',
          submission_date: new Date().toLocaleString(),
          source: 'Website Lead Modal'
        }
      );
    } catch {
      /* email optional — lead already saved to Supabase */
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

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
      // Primary: save to Supabase so it appears in /admin/leads as "Quote modal"
      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        source: 'website_lead_modal',
      });

      void sendEmailAlert(formData);

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        onClose();
      }, 2500);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Could not submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-xs">
      <div className="bg-white rounded-lg p-4">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-3">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Get Free Quote</h2>
              <p className="text-xs text-gray-600">Quick response in 24hrs</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              {submitError && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                  {submitError}
                </div>
              )}

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 bg-white"
                placeholder="Full Name *"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 bg-white"
                placeholder="Email Address *"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 bg-white"
                placeholder="Phone Number *"
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 bg-white"
              >
                <option value="">Select Service</option>
                <option value="residential-solar">Residential Solar</option>
                <option value="commercial-solar">Commercial Solar</option>
                <option value="solar-products">Solar Products</option>
                <option value="maintenance">Maintenance</option>
                <option value="consultation">Consultation</option>
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 bg-white resize-none"
                placeholder="Additional message (optional)"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-semibold py-2.5 px-4 rounded-md transition-colors text-sm mt-3"
              >
                {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
              </button>
            </form>

            <p className="mt-2 text-center text-xs text-gray-500">🔒 Secure • ⚡ 24hr Response</p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Thank You!</h3>
            <p className="text-xs text-gray-600">We&apos;ll contact you within 24 hours.</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
