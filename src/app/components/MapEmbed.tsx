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
    name: "SYNCHRONISING SOLAR SOLUTIONS",
    address: "66, WARD NO.12 RAMNAGAR, WEST TRIPURA, 799002",
    phone: "+91 ",
    email: "info@sunsynchro.com",
    coordinates: { lat: 37.7749, lng: -122.4194 },
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
            Serving Communities Nationwide
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
              {/* Placeholder for Google Maps */}
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <HiLocationMarker className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Google Maps integration will show our locations with interactive pins
                  </p>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 inline-block">
                    <p className="text-sm text-gray-500">
                      Map will display: Headquarters, Branch offices, Service centers
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Overlay with location pins simulation */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Simulated location pins */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              </div>
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
