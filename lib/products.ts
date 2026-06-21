export interface Product {
  id: number;
  price: number;
  image: string;
  title: string;
  description: string;
  favourite: boolean;
  addtocart: boolean;
  category:
    | "appliances"
    | "electronics"
    | "fashion"
    | "phones & tablets"
    | "computing";
}

export const DUMMY_PRODUCTS: Product[] = [
  // --- COMPUTING ---
  {
    id: 101,
    price: 2499,
    image: "/images/product (1).png", // Path: public/products/computing-zenith.png
    title: "Barrison Zenith Book Pro",
    description:
      "Ultra-slim aerospace grade aluminum chassis powered by a 16-core neural processor for seamless compilation and creative architectures.",
    favourite: false,
    addtocart: false,
    category: "computing",
  },
  {
    id: 102,
    price: 899,
    image: "/images/product (2).png",
    title: 'Onyx Horizon 34" Curved Display',
    description:
      "Quantum dot mini-LED ultrawide workstation display with a 240Hz refresh rate and studio-grade color accuracy.",
    favourite: true,
    addtocart: false,
    category: "computing",
  },

  // --- PHONES & TABLETS ---
  {
    id: 201,
    price: 1199,
    image: "/images/product (3).png",
    title: "Stratus Ultra 5G",
    description:
      "Sleek titanium framing housing a 200MP cinematic sensor array and absolute low-light night vision rendering capability.",
    favourite: true,
    addtocart: true, // Item pre-added to cart for state demonstration
    category: "phones & tablets",
  },
  {
    id: 202,
    price: 799,
    image: "/images/product (4).png",
    title: "Matrix Pad Pro 11",
    description:
      "Architectural grade slate with active magnetic stylus integration, configured beautifully for complex vector illustration and drafting.",
    favourite: false,
    addtocart: false,
    category: "phones & tablets",
  },

  // --- ELECTRONICS ---
  {
    id: 301,
    price: 349,
    image: "/images/product (5).png",
    title: "StudioPro Wireless ANC",
    description:
      "Lossless acoustic dimension headphones featuring customizable dynamic active noise cancellation and calfskin leather ear cushions.",
    favourite: false,
    addtocart: false,
    category: "electronics",
  },
  {
    id: 302,
    price: 189,
    image: "/images/product (6).png",
    title: 'LuminaHalo 18" Broadcast LED',
    description:
      "Premium multi-spectrum color accurate studio balance light calibrated strictly for pristine video stream arrays and portrait arrays.",
    favourite: true,
    addtocart: false,
    category: "electronics",
  },

  // --- APPLIANCES ---
  {
    id: 401,
    price: 599,
    image: "/images/product (7).png",
    title: "AeroBrew Intelligent Espresso Engine",
    description:
      "Barista-grade thermal block heating element with built-in micro-grinder scale integration and smartphone-controlled automation configurations.",
    favourite: false,
    addtocart: false,
    category: "appliances",
  },
  {
    id: 402,
    price: 420,
    image: "/images/product (8).png",
    title: "PureAir Aerodynamic Vortex H14",
    description:
      "Hyper-silent medical-grade HEPA air filtration system designed visually to compliment luxury living room layouts seamlessly.",
    favourite: false,
    addtocart: false,
    category: "appliances",
  },

  // --- FASHION ---
  {
    id: 501,
    price: 150,
    image: "/images/product (9).png",
    title: "Minimalist Stealth Chronograph",
    description:
      "Matte black ion-plated stainless steel watch with high-contrast red detailing and a performance architectural fluoroelastomer strap.",
    favourite: true,
    addtocart: false,
    category: "fashion",
  },
  {
    id: 502,
    price: 210,
    image: "/images/product (10).png",
    title: "Apex Waterproof Tech Pack",
    description:
      "Ballistic nylon structural commuting backpack with dedicated custom microfiber slots for high-end notebooks and peripheral arrays.",
    favourite: false,
    addtocart: true, // Item pre-added to cart for state demonstration
    category: "fashion",
  },
  //add 15 more products following the same structure
  {
    id: 503,
    price: 180,
    image: "/images/product (11).png",
    title: "Velocity Running Shoes",
    description:
      "Lightweight athletic footwear with responsive cushioning and breathable mesh construction for optimal performance.",
    favourite: false,
    addtocart: false,
    category: "fashion",
  },
  {
    id: 504,
    price: 250,
    image: "/images/product (12).png",
    title: "Nexus Smartwatch",
    description:
      "Sleek smartwatch with advanced health monitoring features and seamless integration with leading fitness applications.",
    favourite: true,
    addtocart: false,
    category: "fashion",
  },
  {
    id: 505,
    price: 120,
    image: "/images/product (13).png",
    title: "Cresta Sunglasses",
    description:
      "UV-protective sunglasses with polarized lenses and lightweight frame design for all-day comfort.",
    favourite: false,
    addtocart: false,
    category: "fashion",
  },
  {
    id: 506,
    price: 300,
    image: "/images/product (14).png",
    title: "Vanguard Tactical Jacket",
    description:
      "Durable outdoor jacket with multiple pockets and weather-resistant materials for versatile use in various conditions.",
    favourite: false,
    addtocart: false,
    category: "fashion",
  },
  {
    id: 507,
    price: 90,
    image: "/images/product (15).png",
    title: "Lumina LED Headlamp",
    description:
      "Compact headlamp with adjustable brightness settings and long-lasting battery life for outdoor adventures.",
    favourite: true,
    addtocart: false,
    category: "fashion",
  },
  {
    id: 508,
    price: 160,
    image: "/images/product (16).png",
    title: "Echo Wireless Earbuds",
    description:
      "True wireless earbuds with active noise cancellation and immersive sound quality for an unparalleled listening experience.",
    favourite: false,
    addtocart: false,
    category: "fashion",
  },
  {
    id: 509,
    price: 220,
    image: "/images/product (17).png",
    title: "Pulse Fitness Tracker",
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS functionality, and water resistance for active lifestyles.",
    favourite: true,
    addtocart: false,
    category: "phones & tablets",
  },
  {
    id: 510,
    price: 130,
    image: "/images/product (18).png",
    title: "Lumina LED Headlamp",
    description:
      "Compact headlamp with adjustable brightness settings and long-lasting battery life for outdoor adventures.",
    favourite: true,
    addtocart: false,
    category: "electronics",
  },
  {
    id: 511,
    price: 180,
    image: "/images/product (19).png",
    title: "Lumina LED Headlamp",
    description:
      "Compact headlamp with adjustable brightness settings and long-lasting battery life for outdoor adventures.",
    favourite: true,
    addtocart: false,
    category: "electronics",
  },
  {
    id: 512,
    price: 200,
    image: "/images/product (20).png",
    title: "Lumina LED Headlamp",
    description:
      "Compact headlamp with adjustable brightness settings and long-lasting battery life for outdoor adventures.",
    favourite: true,
    addtocart: false,
    category: "phones & tablets",
  },
  {
    id: 513,
    price: 250,
    image: "/images/product (21).png",
    title: "Lumina LED Headlamp",
    description:
      "Compact headlamp with adjustable brightness settings and long-lasting battery life for outdoor adventures.",
    favourite: true,
    addtocart: false,
    category: "phones & tablets",
  },
  {
    id: 514,
    price: 300,
    image: "/images/product (22).png",
    title: "Lumina LED Headlamp",
    description:
      "Compact headlamp with adjustable brightness settings and long-lasting battery life for outdoor adventures.",
    favourite: true,
    addtocart: false,
    category: "fashion",
  },
  {
    id: 515,
    price: 350,
    image: "/images/product (23).png",
    title: "Lumina LED Headlamp",
    description:
      "Compact headlamp with adjustable brightness settings and long-lasting battery life for outdoor adventures.",
    favourite: true,
    addtocart: false,
    category: "appliances",
  },
  {
    id: 516,
    price: 400,
    image: "/images/product (24).png",
    title: "Lumina LED Headlamp",
    description:
      "Compact headlamp with adjustable brightness settings and long-lasting battery life for outdoor adventures.",
    favourite: true,
    addtocart: false,
    category: "fashion",
  },
  {
    id: 517,
    price: 450,
    image: "/images/product (25).png",
    title: "Lumina LED Headlamp",
    description:
      "Compact headlamp with adjustable brightness settings and long-lasting battery life for outdoor adventures.",
    favourite: true,
    addtocart: false,
    category: "electronics",
  },
];
