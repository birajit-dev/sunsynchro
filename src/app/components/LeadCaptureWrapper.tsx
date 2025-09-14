'use client';

import { useState, useEffect } from 'react';
import LeadCaptureModal from './LeadCaptureModal';

export default function LeadCaptureWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Show modal after 3 seconds on every page load
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 3000); // 3 seconds delay

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Global function to show modal (can be called from anywhere)
  useEffect(() => {
    const showLeadModal = () => {
      setIsModalOpen(true);
    };

    // Make function globally available
    (window as unknown as { showLeadModal: () => void }).showLeadModal = showLeadModal;

    return () => {
      delete (window as unknown as { showLeadModal?: () => void }).showLeadModal;
    };
  }, []);

  return (
    <LeadCaptureModal 
      isOpen={isModalOpen} 
      onClose={handleCloseModal} 
    />
  );
}
