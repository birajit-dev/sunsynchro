"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HiLightningBolt, HiOfficeBuilding, HiUsers, HiTrendingUp } from "react-icons/hi";

interface Stat {
  id: string;
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    id: "projects",
    icon: HiLightningBolt,
    value: 1250,
    suffix: "+",
    label: "Projects Completed",
    description: "Successful solar installations delivered"
  },
  {
    id: "capacity",
    icon: HiTrendingUp,
    value: 500,
    suffix: " MW",
    label: "Total Capacity Installed",
    description: "Megawatts of clean energy generated"
  },
  {
    id: "clients",
    icon: HiUsers,
    value: 850,
    suffix: "+",
    label: "Happy Clients",
    description: "Satisfied customers worldwide"
  },
  {
    id: "experience",
    icon: HiOfficeBuilding,
    value: 15,
    suffix: " Years",
    label: "Industry Experience",
    description: "Years of solar expertise and innovation"
  }
];

const CounterStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<Record<string, number>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startCounting();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const startCounting = () => {
    stats.forEach((stat) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.value / steps;
      let currentValue = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        currentValue = Math.min(stat.value, Math.floor(increment * step));
        
        setCounters(prev => ({
          ...prev,
          [stat.id]: currentValue
        }));

        if (step >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);
    });
  };

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Proven Track Record
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Numbers that showcase our commitment to delivering exceptional solar solutions
            and building lasting partnerships with our clients.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const currentValue = counters[stat.id] || 0;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                      {currentValue.toLocaleString()}
                      <span className="text-green-600">{stat.suffix}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 inline-block">
            <p className="text-lg text-gray-700 mb-4">
              <strong className="text-green-600">Carbon Footprint Reduced:</strong> Over 750,000 tons CO₂ equivalent
            </p>
            <p className="text-sm text-gray-600">
              Equivalent to planting 34 million trees or removing 163,000 cars from the road for a year
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CounterStats;
