"use client";
import { useState } from "react";
import Image from "next/image";

const recognitionLogos = [
  {
    src: "/startup/tripura-logo.webp",
    alt: "Tripura startup logo",
  },
  {
    src: "/startup/DPIIT.png",
    alt: "DPIIT Startup India logo",
  },
];

const certificates = [
  {
    src: "/startup/recognize-certificate.png",
    alt: "Startup recognition certificate",
  },
  {
    src: "/startup/DPIIT RECOGNOTION.jpg",
    alt: "DPIIT recognition certificate",
  },
];

const StartupRecognition = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
    null
  );

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
            Recognized Startup
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600">
            Sunsynchro is proud to be officially recognized under Startup India. We share our recognition and certificate with our valued visitors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <div className="rounded-xl border border-gray-100 bg-white shadow p-5 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Recognised by
            </h3>
            <div className="flex-1 flex flex-col justify-center gap-4">
              {recognitionLogos.map((logo, i) => (
                <div
                  key={i}
                  className="relative w-full h-20 rounded-xl overflow-hidden border border-gray-100 bg-white"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 90vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl border border-gray-100 bg-white shadow p-4 group cursor-zoom-in"
            onClick={() => setSelectedCertificate(certificates[0].src)}
            tabIndex={0}
            role="button"
            aria-label={`View ${certificates[0].alt}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedCertificate(certificates[0].src);
              }
            }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
              Tripura Startup Certificate
            </h3>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 bg-white">
              <Image
                src={certificates[0].src}
                alt={certificates[0].alt}
                fill
                className="object-contain bg-white"
                sizes="(max-width: 768px) 90vw, 33vw"
                quality={95}
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white rounded-md px-3 py-1 text-sm font-medium text-gray-700 shadow-md">
                  View Larger
                </span>
              </div>
            </div>
          </div>

          <div
            className="rounded-xl border border-gray-100 bg-white shadow p-4 group cursor-zoom-in"
            onClick={() => setSelectedCertificate(certificates[1].src)}
            tabIndex={0}
            role="button"
            aria-label={`View ${certificates[1].alt}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedCertificate(certificates[1].src);
              }
            }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
              DPIIT Certificate
            </h3>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 bg-white">
              <Image
                src={certificates[1].src}
                alt={certificates[1].alt}
                fill
                className="object-contain bg-white"
                sizes="(max-width: 768px) 90vw, 33vw"
                quality={95}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white rounded-md px-3 py-1 text-sm font-medium text-gray-700 shadow-md">
                  View Larger
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Popup */}
            {selectedCertificate && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                onClick={() => setSelectedCertificate(null)}
                tabIndex={-1}
                aria-modal="true"
                role="dialog"
              >
                <div
                  className="relative bg-white rounded-xl shadow-lg max-w-3xl w-[90vw] max-h-[90vh] flex flex-col items-center"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-2 transition"
                    onClick={() => setSelectedCertificate(null)}
                    aria-label="Close"
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>
                    </svg>
                  </button>
                  <Image
                    src={selectedCertificate}
                    alt="Recognition certificate large view"
                    width={1000}
                    height={700}
                    className="object-contain rounded-xl max-h-[80vh] bg-white"
                  />
                  <div className="mt-2 text-xs text-gray-500">Click outside image or "Close" to exit</div>
                </div>
              </div>
            )}
      </div>
    </section>
  );
};

export default StartupRecognition;
