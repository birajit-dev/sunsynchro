export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  description: string;
  specifications: {
    [key: string]: string;
  };
  price?: string;
  datasheet?: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Solar Kit 3kW",
    category: "Solar Panels",
    brand: "Panasonic",
    image: "/products/solar-kit-3kw.jpg",
    description: "Complete 3kW solar kit with panels, inverter, and mounting accessories for residential installations.",
    specifications: {
      "Power Output": "3kW",
      "Panel Type": "Monocrystalline",
      "Inverter": "3kW Grid-tie",
      "Panels Included": "8 x 375W",
      "Efficiency": "20.5%",
      "Warranty": "25 years"
    },
    datasheet: "/datasheets/solar-kit-3kw.pdf",
    featured: true
  },
  {
    id: "1a",
    name: "Solar Kit 5kW",
    category: "Solar Panels",
    brand: "Panasonic",
    image: "/products/solar-kit-5kw.jpg",
    description: "Complete 5kW solar kit with panels, inverter, and mounting accessories for residential and small commercial installations.",
    specifications: {
      "Power Output": "5kW",
      "Panel Type": "Monocrystalline",
      "Inverter": "5kW Grid-tie",
      "Panels Included": "12 x 415W",
      "Efficiency": "21.0%",
      "Warranty": "25 years"
    },
    datasheet: "/datasheets/solar-kit-5kw.pdf",
    featured: true
  },
  {
    id: "2",
    name: "Novasys Mono PERC 540W",
    category: "Solar Panels",
    brand: "Novasys",
    image: "/products/novasys-mono-perc-540.jpg",
    description: "High-power monocrystalline PERC solar panels for residential and commercial applications.",
    specifications: {
      "Power Output": "540W",
      "Efficiency": "21.2%",
      "Cell Technology": "Monocrystalline PERC",
      "Dimensions": "2279 x 1134 x 35mm",
      "Weight": "27.5 kg",
      "Warranty": "25 years"
    },
    datasheet: "/datasheets/novasys-mono-perc-540.pdf",
    featured: true
  },
  {
    id: "6",
    name: "Fuji Electric PVP800",
    category: "Solar Inverters",
    brand: "Fuji Electric",
    image: "/products/fuji-electric-pvp800.jpg",
    description: "High-performance central inverter for large-scale commercial and utility applications.",
    specifications: {
      "Max AC Power": "800kW",
      "Max Efficiency": "98.8%",
      "Operating Temp": "-25°C to +50°C",
      "Dimensions": "2200 x 800 x 600mm",
      "Weight": "850 kg",
      "Warranty": "10 years"
    },
    datasheet: "/datasheets/fuji-electric-pvp800.pdf"
  },
  {
    id: "8",
    name: "Feston FS-5000TL",
    category: "Solar Inverters",
    brand: "Feston",
    image: "/products/feston-fs-5000tl.jpg",
    description: "Grid-tie string inverter with advanced MPPT technology for optimal energy harvest.",
    specifications: {
      "Max AC Power": "5kW",
      "Max Efficiency": "97.8%",
      "Operating Temp": "-25°C to +60°C",
      "Dimensions": "340 x 470 x 180mm",
      "Weight": "18 kg",
      "Warranty": "10 years"
    },
    datasheet: "/datasheets/feston-fs-5000tl.pdf"
  },
  {
    id: "8a",
    name: "Feston Lithium Battery 100Ah",
    category: "Storage Systems",
    brand: "Feston",
    image: "/products/feston-lithium-battery-100ah.jpg",
    description: "High-performance lithium-ion battery with advanced BMS for residential and commercial energy storage.",
    specifications: {
      "Capacity": "100Ah (5.12kWh)",
      "Voltage": "51.2V",
      "Cycle Life": "6000+ cycles",
      "Efficiency": "95%",
      "Dimensions": "483 x 170 x 240mm",
      "Weight": "45 kg",
      "Warranty": "10 years"
    },
    datasheet: "/datasheets/feston-lithium-battery-100ah.pdf"
  },
  {
    id: "7",
    name: "Sunpower SPH6000",
    category: "Solar Inverters",
    brand: "Sunpower",
    image: "/products/sunpower-sph6000.jpg",
    description: "Hybrid inverter with integrated battery management for residential energy storage.",
    specifications: {
      "Max AC Power": "6kW",
      "Max Efficiency": "97.5%",
      "Operating Temp": "-25°C to +60°C",
      "Dimensions": "367 x 641 x 216mm",
      "Weight": "25 kg",
      "Warranty": "10 years"
    },
    datasheet: "/datasheets/sunpower-sph6000.pdf"
  },
  {
    id: "7a",
    name: "Sunpower Energy Storage Battery 200Ah",
    category: "Storage Systems",
    brand: "Sunpower",
    image: "/products/sunpower-battery-200ah.jpg",
    description: "Premium lithium-ion battery system with intelligent energy management for residential and commercial applications.",
    specifications: {
      "Capacity": "200Ah (10.24kWh)",
      "Voltage": "51.2V",
      "Cycle Life": "8000+ cycles",
      "Efficiency": "96%",
      "Dimensions": "600 x 300 x 280mm",
      "Weight": "85 kg",
      "Warranty": "12 years"
    },
    datasheet: "/datasheets/sunpower-battery-200ah.pdf"
  },
  {
    id: "9",
    name: "Enphase IQ8+",
    category: "Microinverters",
    brand: "Enphase",
    image: "/products/enphase-iq8plus.jpg",
    description: "Advanced microinverter with grid-forming capability and enhanced safety features.",
    specifications: {
      "Max AC Power": "300W",
      "Peak Efficiency": "97.5%",
      "Operating Temp": "-40°C to +85°C",
      "Dimensions": "166 x 175 x 27mm",
      "Weight": "0.7 kg",
      "Warranty": "25 years"
    },
    datasheet: "/datasheets/enphase-iq8plus.pdf",
    featured: true
  },
  {
    id: "10",
    name: "Secure ABT Energy Meter",
    category: "Energy Meters & Controls",
    brand: "Secure",
    image: "/products/secure-abt-meter.jpg",
    description: "Advanced ABT (Availability Based Tariff) meter for accurate energy measurement and billing.",
    specifications: {
      "Accuracy Class": "0.2S",
      "Voltage Range": "57.7V to 300V",
      "Current Range": "1A to 10A",
      "Communication": "RS485, Ethernet",
      "Display": "LCD with backlight",
      "Warranty": "5 years"
    },
    datasheet: "/datasheets/secure-abt-meter.pdf"
  },
  {
    id: "11",
    name: "Secure Prepaid Energy Meter",
    category: "Energy Meters & Controls",
    brand: "Secure",
    image: "/products/secure-prepaid-meter.jpg",
    description: "Smart prepaid energy meter with remote recharge and monitoring capabilities.",
    specifications: {
      "Accuracy Class": "1.0",
      "Voltage Range": "180V to 280V",
      "Current Range": "5A to 60A",
      "Communication": "GSM/GPRS",
      "Display": "LCD with LED indicators",
      "Warranty": "5 years"
    },
    datasheet: "/datasheets/secure-prepaid-meter.pdf"
  },
  {
    id: "12",
    name: "Lithium-ion Battery 100Ah",
    category: "Storage Systems",
    brand: "Generic",
    image: "/products/lithium-ion-battery-100ah.jpg",
    description: "High-capacity lithium-ion battery for residential and commercial energy storage.",
    specifications: {
      "Capacity": "100Ah (5.12kWh)",
      "Voltage": "51.2V",
      "Cycle Life": "6000+ cycles",
      "Efficiency": "95%",
      "Dimensions": "483 x 170 x 240mm",
      "Weight": "45 kg",
      "Warranty": "10 years"
    },
    datasheet: "/datasheets/lithium-ion-battery-100ah.pdf",
    featured: true
  },
  {
    id: "13",
    name: "Lead Acid Battery 150Ah",
    category: "Storage Systems",
    brand: "Generic",
    image: "/products/lead-acid-battery-150ah.jpg",
    description: "Deep cycle lead acid battery for backup power and off-grid applications.",
    specifications: {
      "Capacity": "150Ah",
      "Voltage": "12V",
      "Type": "AGM Deep Cycle",
      "Cycle Life": "1200+ cycles",
      "Dimensions": "483 x 170 x 240mm",
      "Weight": "45 kg",
      "Warranty": "3 years"
    },
    datasheet: "/datasheets/lead-acid-battery-150ah.pdf"
  },
  {
    id: "14",
    name: "BESS Container 1MWh",
    category: "Storage Systems",
    brand: "Generic",
    image: "/products/bess-container-1mwh.jpg",
    description: "Large-scale Battery Energy Storage System for grid-scale applications.",
    specifications: {
      "Capacity": "1MWh",
      "Power Output": "500kW",
      "Efficiency": "92%",
      "Operating Temp": "-20°C to +50°C",
      "Dimensions": "6058 x 2438 x 2591mm",
      "Weight": "25000 kg",
      "Warranty": "10 years"
    },
    datasheet: "/datasheets/bess-container-1mwh.pdf"
  },
  {
    id: "15",
    name: "AC EV Charger 22kW",
    category: "EV Charging Stations",
    brand: "Generic",
    image: "/products/ac-ev-charger-22kw.jpg",
    description: "Three-phase AC electric vehicle charger for residential and commercial use.",
    specifications: {
      "Power Output": "22kW",
      "Connector Type": "Type 2",
      "Input Voltage": "400V AC",
      "Efficiency": "94%",
      "Dimensions": "800 x 300 x 200mm",
      "Weight": "25 kg",
      "Warranty": "3 years"
    },
    datasheet: "/datasheets/ac-ev-charger-22kw.pdf"
  },
  {
    id: "16",
    name: "DC Fast Charger 60kW",
    category: "EV Charging Stations",
    brand: "Generic",
    image: "/products/dc-fast-charger-60kw.jpg",
    description: "High-power DC fast charger for rapid electric vehicle charging.",
    specifications: {
      "Power Output": "60kW",
      "Connector Type": "CCS2, CHAdeMO",
      "Input Voltage": "400V AC",
      "Efficiency": "95%",
      "Dimensions": "1600 x 800 x 400mm",
      "Weight": "200 kg",
      "Warranty": "3 years"
    },
    datasheet: "/datasheets/dc-fast-charger-60kw.pdf",
    featured: true
  },
  {
    id: "17",
    name: "Solar Street Light 60W",
    category: "Solar Street Light Luminaires",
    brand: "Generic",
    image: "/products/solar-street-light-60w.jpg",
    description: "All-in-one solar street light with integrated battery and smart controls.",
    specifications: {
      "LED Power": "60W",
      "Solar Panel": "120W",
      "Battery": "40Ah LiFePO4",
      "Luminous Flux": "8000lm",
      "Operating Time": "12+ hours",
      "Warranty": "5 years"
    },
    datasheet: "/datasheets/solar-street-light-60w.pdf"
  },
  {
    id: "18",
    name: "Remote Monitoring System",
    category: "Remote Monitoring & Power Management Systems",
    brand: "Generic",
    image: "/products/remote-monitoring-system.jpg",
    description: "Advanced monitoring and control system for solar installations and power management.",
    specifications: {
      "Communication": "4G/WiFi/Ethernet",
      "Data Logging": "20 years",
      "Monitoring Points": "Up to 100",
      "Display": "Web/Mobile App",
      "Alerts": "SMS/Email",
      "Warranty": "3 years"
    },
    datasheet: "/datasheets/remote-monitoring-system.pdf"
  },
  {
    id: "19",
    name: "UPS System 10kVA",
    category: "UPS / DG Backup & Power Controls",
    brand: "Generic",
    image: "/products/ups-system-10kva.jpg",
    description: "Online UPS system with advanced power management and backup capabilities.",
    specifications: {
      "Capacity": "10kVA/8kW",
      "Input Voltage": "380-480V AC",
      "Efficiency": "95%",
      "Backup Time": "15-30 minutes",
      "Dimensions": "600 x 800 x 1600mm",
      "Weight": "180 kg",
      "Warranty": "2 years"
    },
    datasheet: "/datasheets/ups-system-10kva.pdf"
  },
  {
    id: "20",
    name: "Solar Mounting Structure",
    category: "Mounting Structures & Accessories",
    brand: "Generic",
    image: "/products/solar-mounting-structure.jpg",
    description: "Galvanized steel mounting structure for rooftop solar panel installations.",
    specifications: {
      "Material": "Galvanized Steel",
      "Panel Capacity": "Up to 20 panels",
      "Tilt Angle": "15-30 degrees",
      "Wind Load": "Up to 200 km/h",
      "Corrosion Resistance": "25 years",
      "Warranty": "10 years"
    },
    datasheet: "/datasheets/solar-mounting-structure.pdf"
  }
];

export const productCategories = [
  "All",
  "Solar Panels",
  "Solar Inverters",
  "Microinverters",
  "Energy Meters & Controls",
  "Storage Systems",
  "EV Charging Stations",
  "Solar Street Light Luminaires",
  "Remote Monitoring & Power Management Systems",
  "UPS / DG Backup & Power Controls",
  "Mounting Structures & Accessories"
];
