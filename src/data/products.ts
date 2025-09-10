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
    name: "SunPower Maxeon 3",
    category: "Solar Panels",
    brand: "SunPower",
    image: "/products/sunpower-maxeon3.jpg",
    description: "High-efficiency solar panels with industry-leading performance and 25-year warranty.",
    specifications: {
      "Power Output": "400W - 435W",
      "Efficiency": "22.6%",
      "Cell Technology": "Monocrystalline",
      "Dimensions": "1690 x 1046 x 40mm",
      "Weight": "20.6 kg",
      "Warranty": "25 years"
    },
    datasheet: "/datasheets/sunpower-maxeon3.pdf",
    featured: true
  },
  {
    id: "2",
    name: "Tesla Powerwall 2",
    category: "Energy Storage",
    brand: "Tesla",
    image: "/products/tesla-powerwall2.jpg",
    description: "Rechargeable lithium-ion battery designed to store energy at residential level.",
    specifications: {
      "Capacity": "13.5 kWh",
      "Power Output": "5 kW continuous",
      "Efficiency": "90% round-trip",
      "Dimensions": "1150 x 755 x 155mm",
      "Weight": "114 kg",
      "Warranty": "10 years"
    },
    datasheet: "/datasheets/tesla-powerwall2.pdf",
    featured: true
  },
  {
    id: "3",
    name: "Enphase IQ7+",
    category: "Inverters",
    brand: "Enphase",
    image: "/products/enphase-iq7plus.jpg",
    description: "High-performance microinverter for residential solar installations.",
    specifications: {
      "Max AC Power": "290W",
      "Peak Efficiency": "97.5%",
      "Operating Temp": "-40°C to +85°C",
      "Dimensions": "166 x 175 x 27mm",
      "Weight": "0.7 kg",
      "Warranty": "25 years"
    },
    datasheet: "/datasheets/enphase-iq7plus.pdf"
  },
  {
    id: "4",
    name: "Canadian Solar HiKu6",
    category: "Solar Panels",
    brand: "Canadian Solar",
    image: "/products/canadian-solar-hiku6.jpg",
    description: "High-power solar module with excellent performance in various conditions.",
    specifications: {
      "Power Output": "540W - 565W",
      "Efficiency": "21.4%",
      "Cell Technology": "Monocrystalline PERC",
      "Dimensions": "2278 x 1134 x 35mm",
      "Weight": "27.5 kg",
      "Warranty": "25 years"
    },
    datasheet: "/datasheets/canadian-solar-hiku6.pdf"
  },
  {
    id: "5",
    name: "SolarEdge SE7600H",
    category: "Inverters",
    brand: "SolarEdge",
    image: "/products/solaredge-se7600h.jpg",
    description: "Single phase inverter with HD-Wave technology for residential applications.",
    specifications: {
      "Max AC Power": "7600W",
      "Max Efficiency": "99%",
      "Operating Temp": "-25°C to +60°C",
      "Dimensions": "656 x 418 x 206mm",
      "Weight": "22 kg",
      "Warranty": "12 years"
    },
    datasheet: "/datasheets/solaredge-se7600h.pdf"
  },
  {
    id: "6",
    name: "IronRidge XR Rails",
    category: "Mounting Systems",
    brand: "IronRidge",
    image: "/products/ironridge-xr-rails.jpg",
    description: "Structural rails for residential and commercial solar mounting systems.",
    specifications: {
      "Material": "6005-T5 Aluminum",
      "Length": "168 inches (4.27m)",
      "Load Rating": "Up to 75 psf",
      "Finish": "Clear Anodized",
      "Compatibility": "Universal",
      "Warranty": "25 years"
    },
    datasheet: "/datasheets/ironridge-xr-rails.pdf"
  },
  {
    id: "7",
    name: "LG NeON R",
    category: "Solar Panels",
    brand: "LG",
    image: "/products/lg-neon-r.jpg",
    description: "High-efficiency solar panels with innovative Cello technology.",
    specifications: {
      "Power Output": "365W - 375W",
      "Efficiency": "21.7%",
      "Cell Technology": "Monocrystalline",
      "Dimensions": "1700 x 1016 x 40mm",
      "Weight": "18.5 kg",
      "Warranty": "25 years"
    },
    datasheet: "/datasheets/lg-neon-r.pdf"
  },
  {
    id: "8",
    name: "BYD Battery-Box Premium",
    category: "Energy Storage",
    brand: "BYD",
    image: "/products/byd-battery-box.jpg",
    description: "Modular lithium battery system for residential and commercial use.",
    specifications: {
      "Capacity": "2.56 kWh per module",
      "Voltage": "51.2V",
      "Efficiency": "95%",
      "Dimensions": "440 x 410 x 132mm",
      "Weight": "30 kg",
      "Warranty": "10 years"
    },
    datasheet: "/datasheets/byd-battery-box.pdf"
  }
];

export const productCategories = [
  "All",
  "Solar Panels",
  "Inverters",
  "Energy Storage",
  "Mounting Systems",
  "Monitoring",
  "Accessories"
];
