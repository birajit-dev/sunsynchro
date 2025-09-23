export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  website?: string;
  category: string;
}

export const brands: Brand[] = [
  {
    id: "1",
    name: "adani",
    logo: "/brands/adani.png",
    description: "Leading Indian solar panel manufacturer and renewable energy company.",
    website: "https://www.adanisolar.com",
    category: "Solar Panels"
  },
  {
    id: "2",
    name: "Sineng",
    logo: "/brands/sineng.png",
    description: "Global leader in battery technology and energy storage solutions.",
    website: "https://byd.com",
    category: "Energy Storage"
  },
  {
    id: "3",
    name: "canadian solar",
    logo: "/brands/deye.webp",
    description: "One of the world's largest solar technology and renewable energy companies.",
    website: "https://canadiansolar.com",
    category: "Solar Panels"
  },
  {
    id: "4",
    name: "enphase",
    logo: "/brands/DEIFlogo.avif",
    description: "Leading provider of microinverter-based solar and battery systems.",
    website: "https://enphase.com",
    category: "Inverters"
  },
  {
    id: "5",
    name: "fronius",
    logo: "/brands/enphase.png",
    description: "Austrian manufacturer of high-quality solar inverters and energy solutions.",
    website: "https://fronius.com",
    category: "Inverters"
  },
  {
    id: "6",
    name: "growatt",
    logo: "/brands/feston.png",
    description: "Innovative manufacturer of solar inverters and energy storage systems.",
    website: "https://www.ginverter.com",
    category: "Inverters"
  },
  {
    id: "9",
    name: "microtek",
    logo: "/brands/nova.png",
    description: "Leading provider of solar inverters, batteries, and UPS systems.",
    website: "https://www.microtekdirect.com",
    category: "Inverters"
  },
  {
    id: "10",
    name: "panasonic",
    logo: "/brands/nunam.webp",
    description: "Global leader in high-efficiency solar panels and energy solutions.",
    website: "https://www.panasonic.com/global/energy/solar.html",
    category: "Solar Panels"
  },
  {
    id: "11",
    name: "solaredge",
    logo: "/brands/panasonic.jpg",
    description: "Smart energy solutions for residential, commercial, and utility-scale solar.",
    website: "https://solaredge.com",
    category: "Inverters"
  },
  {
    id: "12",
    name: "tata power",
    logo: "/brands/red.png",
    description: "Pioneering solar solutions and EPC services in India.",
    website: "https://www.tatapowersolar.com",
    category: "Solar Panels"
  },
  {
    id: "13",
    name: "tesla",
    logo: "/brands/sineng.png",
    description: "Innovative solar roof and energy storage solutions for homes and businesses.",
    website: "https://www.tesla.com/energy",
    category: "Energy Storage"
  },
  {
    id: "14",
    name: "usha shriram",
    logo: "/brands/sungrow_772.webp",
    description: "Indian manufacturer of solar panels and energy products.",
    website: "https://www.ushashriram.com",
    category: "Solar Panels"
  },
  {
    id: "15",
    name: "vikram solar",
    logo: "/brands/SunPower-Logo.jpg",
    description: "Leading Indian solar energy solutions provider and panel manufacturer.",
    website: "https://www.vikramsolar.com",
    category: "Solar Panels"
  },
];

export const brandCategories = [
  "All",
  "Solar Panels",
  "Inverters", 
  "Energy Storage",
  "Mounting Systems"
];
