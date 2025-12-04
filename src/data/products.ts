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
    name: "Solar Kit 3kW, 5kW",
    category: "Solar Panels",
    brand: "Panasonic",
    image: "/products/panasonic_solar_kit.jpg",
    description: "Complete solar power system featuring high-efficiency Panasonic HIT panels with integrated inverter and mounting hardware. Ideal for residential rooftop installations with superior performance in high-temperature conditions.",
    specifications: {
      "System Power": "3kW / 5kW",
      "Panel Technology": "HIT (Heterojunction)",
      "Module Efficiency": "Up to 21.7%",
      "Inverter Type": "String Inverter",
      "Temperature Coefficient": "-0.26%/°C",
      "Warranty": "25 years product, 25 years performance"
    },
    datasheet: "/datasheets/solar-kit-3kw.pdf",
    featured: true
  },

  {
    id: "2",
    name: "Novasys Panel",
    category: "Solar Panels",
    brand: "Novasys",
    image: "/products/novasys_panel.webp",
    description: "High-efficiency monocrystalline solar panel with advanced PERC technology and half-cut cell design for enhanced performance and reduced hot-spot effects. Suitable for residential and commercial installations.",
    specifications: {
      "Power Output": "540W - 550W",
      "Efficiency": "21.0% - 21.5%",
      "Cell Type": "Mono PERC Half-Cut",
      "Dimensions": "2278 x 1133 x 35mm",
      "Weight": "27.5 kg",
      "Warranty": "12 years product, 25 years linear performance"
    },
    datasheet: "/datasheets/novasys-mono-perc-540.pdf",
    featured: true
  },

  {
    id: "8",
    name: "Feston 3KW String Inverter",
    category: "Solar Inverters",
    brand: "Feston",
    image: "/products/feston_inverter.webp",
    description: "Compact single-phase string inverter with dual MPPT trackers for maximum energy yield. Features intelligent cooling system, wide input voltage range, and built-in DC switch for enhanced safety.",
    specifications: {
      "Rated Power": "3kW",
      "Max Efficiency": "97.6%",
      "MPPT Trackers": "2",
      "Input Voltage Range": "90-550V DC",
      "Operating Temp": "-25°C to +60°C",
      "Warranty": "5 years (extendable to 10 years)"
    },
    datasheet: "/datasheets/feston-fs-5000tl.pdf"
  },
  {
    id: "8a",
    name: "Feston Battery",
    category: "Storage Systems",
    brand: "Feston",
    image: "/products/feston_battery.webp",
    description: "Modular lithium iron phosphate (LiFePO4) battery system with intelligent BMS for safe and reliable energy storage. Stackable design allows capacity expansion up to 30kWh. IP65 rated for indoor and outdoor installation.",
    specifications: {
      "Capacity": "5.12kWh (100Ah)",
      "Nominal Voltage": "51.2V",
      "Cycle Life": "6000+ cycles @ 80% DOD",
      "Round-trip Efficiency": "95%",
      "Dimensions": "483 x 170 x 240mm",
      "Warranty": "10 years"
    },
    datasheet: "/datasheets/feston-lithium-battery-100ah.pdf"
  },
  {
    id: "7",
    name: "Sunpower Inverter and Portable UPS System",
    category: "Solar Inverters",
    brand: "Sunpower",
    image: "/products/sun_power.avif",
    description: "All-in-one hybrid solar inverter with integrated MPPT charge controller, AC charger, and pure sine wave output. Supports grid-tie, off-grid, and backup modes with seamless switching. Built-in WiFi monitoring and mobile app control.",
    specifications: {
      "Rated Power": "6kW",
      "PV Input": "Up to 9kW",
      "Battery Voltage": "48V DC",
      "Max Efficiency": "97.5%",
      "UPS Switching Time": "<10ms",
      "Warranty": "5 years (extendable to 10 years)"
    },
    datasheet: "/datasheets/sunpower-sph6000.pdf"
  },
  
  {
    id: "9",
    name: "Enphase Microinverter",
    category: "Microinverters",
    brand: "Enphase",
    image: "/products/enphase.avif",
    description: "Industry-leading IQ8 series microinverter with Sunlight Backup capability for grid-independent operation. Features advanced semiconductor technology, rapid shutdown compliance, and module-level monitoring through Enphase Enlighten platform.",
    specifications: {
      "Max AC Power": "366W",
      "Peak Efficiency": "97.5%",
      "CEC Weighted Efficiency": "97.0%",
      "Operating Temp": "-40°C to +65°C",
      "Dimensions": "212 x 175 x 30mm",
      "Warranty": "25 years"
    },
    datasheet: "/datasheets/enphase-iq8plus.pdf",
    featured: true
  },
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
