"use client";
import React from "react";
import { motion } from "framer-motion";
import { HiLocationMarker, HiPhone, HiMail } from "react-icons/hi";

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  type: "headquarters" | "branch" | "service";
}

const locations: Location[] = [
  {
    id: "hq",
    name: "SUNSYNCHRO PRIVATE LIMITED",
    address: "66, WARD NO.12 RAMNAGAR, WEST TRIPURA, 799002",
    phone: "+91 9611548340",
    email: "info@sunsynchro.com",
    coordinates: { lat: 23.840036400223568, lng: 91.27001106022641 },
    type: "headquarters"
  },
];

const MapEmbed = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4"
          >
            Our Locations
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Serving Communities
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            With strategic locations across the country, we&apos;re always close by to provide 
            exceptional solar solutions and support when you need it most.
          </motion.p>
        </div>

        {/* Change grid to 6 and 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 lg:h-[500px]">
              {/* Google Maps Embed */}
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.234567890123!2d${locations[0].coordinates.lng}!3d${locations[0].coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUwJzI0LjEiTiA5McKwMTYnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SUNSYNCHRO Location Map"
              ></iframe>
            </div>
          </motion.div>

          {/* Locations List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-center justify-center"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 w-full max-w-lg mx-auto"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    location.type === "headquarters" 
                      ? "bg-red-100 text-red-600"
                      : location.type === "branch"
                      ? "bg-blue-100 text-blue-600" 
                      : "bg-green-100 text-green-600"
                  }`}>
                    <HiLocationMarker className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0 w-full">
                    <h3 className="font-semibold text-gray-900 mb-1 break-words text-center">
                      {location.name}
                    </h3>
                    
                    <div className="space-y-2">
                      {/* Address centered horizontally */}
                      <p className="text-sm text-gray-600 flex items-center justify-center break-words max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto text-center">
                        <HiLocationMarker className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="break-words">{location.address}</span>
                      </p>
                      
                      <p className="text-sm text-gray-600 flex items-center justify-center break-all text-center">
                        <HiPhone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                        <span>{location.phone}</span>
                      </p>
                      
                      <p className="text-sm text-gray-600 flex items-center justify-center break-all text-center">
                        <HiMail className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                        <span>{location.email}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Coverage Area
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Nationwide Service Coverage
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
              While our main offices are strategically located across key regions, 
              our certified installation teams and service network cover all 50 states.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">50</div>
                <div className="text-sm opacity-90">States Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Support Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">48hr</div>
                <div className="text-sm opacity-90">Response Time</div>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default MapEmbed;
