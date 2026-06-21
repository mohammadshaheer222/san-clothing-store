import { HeroData } from "@/types";

export const HOME_HERO_DATA: HeroData = {
  subtitle: "Kireina & Gelyu",
  title: "8 New Colors. Moving Fast.",
  backgroundImage: "/hero-bg.png",
  buttonText: "SHOP NOW",
  buttonVariant: "white",
  buttonLink: "/collections/new-colors",
};

export const ANNOUNCEMENT_TEXT = "Free USA shipping for orders $85+";

export const FAQ_CONTENT = {
  title: "Frequently Asked Questions",
  description: "Everything you need to know about our products, shipping, and returns.",
  items: [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unworn and unwashed items. Simply visit our returns portal to start your process. Original tags must be attached."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 5-7 business days within the USA. International shipping can take 10-14 business days depending on the destination."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location and will be calculated at checkout."
    },
    {
      question: "How do I find my correct size?",
      answer: "We provide a detailed size guide on each product page. Our fits are generally true to size, but we recommend checking the specific measurements for the best fit."
    },
    {
      question: "Are your materials sustainable?",
      answer: "We are committed to sustainability. Our collections use organic cotton, recycled fibers, and eco-friendly dyes to minimize our environmental footprint."
    }
  ]
};

export const PRODUCTS_DATA = [
  {
    id: '1',
    title: "Essential T-Shirt — Silk-Like Touch for a Sophisticated Look",
    description: "Crafted from our signature silk-blend fabric, this essential t-shirt drapes beautifully and feels luxuriously soft against the skin. The refined cut offers a relaxed yet structured silhouette perfect for any occasion.",
    price: 460000,
    oldPrice: 850000,
    discount: "-40%",
    rating: 5,
    reviews: 6,
    image: "/product-1.png",
    images: ["/product-1.png", "/product-2.png", "/product-3.png"],
    deliveryText: "DELIVERY IN 5-7 DAYS",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Navy", hex: "#0C2565" },
      { name: "Charcoal", hex: "#3D3D3D" },
    ],
    category: "T-Shirts",
    careInstructions: [
      "Machine wash cold on gentle cycle",
      "Do not bleach",
      "Tumble dry low",
      "Iron on low heat if needed",
    ],
    badge: "Sale",
  },
  {
    id: '2',
    title: "Premium Apparel — Egyptian Cotton for Everyday Elegance",
    description: "Woven from 100% Egyptian cotton, this premium tee offers unmatched breathability and a naturally soft hand feel. Preshrunk and double-stitched for lasting shape retention through wash after wash.",
    price: 450000,
    oldPrice: 800000,
    discount: "-44%",
    rating: 5,
    reviews: 8,
    image: "/product-2.png",
    images: ["/product-2.png", "/product-1.png", "/product-4.png"],
    deliveryText: "DELIVERY IN 5-7 DAYS",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Sage", hex: "#8FAF8C" },
      { name: "Navy", hex: "#0C2565" },
    ],
    category: "T-Shirts",
    careInstructions: [
      "Machine wash cold",
      "Do not bleach",
      "Hang dry recommended",
      "Warm iron on reverse",
    ],
    badge: "Best Seller",
  },
  {
    id: '3',
    title: "Urban-Chic Apparel — Breathable Fabric for Total Freedom",
    description: "Our urban-chic collection is engineered with advanced breathable micro-weave fabric that adapts to your body temperature. Whether navigating city streets or weekend escapes, this piece moves with you.",
    price: 410000,
    oldPrice: 750000,
    discount: "-46%",
    rating: 5,
    reviews: 4,
    image: "/product-3.png",
    images: ["/product-3.png", "/product-4.png", "/product-1.png"],
    deliveryText: "DELIVERY IN 5-7 DAYS",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Stone", hex: "#C8B9A2" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Dusty Rose", hex: "#C49A9A" },
    ],
    category: "T-Shirts",
    careInstructions: [
      "Machine wash warm",
      "Do not bleach",
      "Tumble dry medium",
      "Do not iron print area",
    ],
    badge: "Sale",
  },
  {
    id: '4',
    title: "Elevated Apparel — Organic Fiber for Total Freedom",
    description: "Grown and harvested with zero harmful pesticides, our organic fiber tee is as kind to the planet as it is to your skin. GOTS certified and naturally hypoallergenic for the most sensitive skin types.",
    price: 470000,
    oldPrice: 850000,
    discount: "-45%",
    rating: 5,
    reviews: 6,
    image: "/product-4.png",
    images: ["/product-4.png", "/product-2.png", "/product-3.png"],
    deliveryText: "DELIVERY IN 5-7 DAYS",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ecru", hex: "#F0EAD6" },
      { name: "Olive", hex: "#708060" },
      { name: "Midnight", hex: "#0C2565" },
    ],
    category: "T-Shirts",
    careInstructions: [
      "Machine wash cold",
      "Eco-certified non-bleach detergent",
      "Lay flat to dry",
      "Cool iron only",
    ],
    badge: "Eco",
  },
  {
    id: 'bs1',
    title: "Signature Hoodie — Heavyweight Cotton for Maximum Comfort",
    description: "Our heavyweight hoodie is built for enduring warmth and timeless style. Triple-panel hood, kangaroo pocket, and ribbed cuffs deliver structure while the 400gsm fleece interior wraps you in cloud-like softness.",
    price: 650000,
    oldPrice: 950000,
    discount: "-32%",
    rating: 5,
    reviews: 11,
    image: "/product-1.png",
    images: ["/product-1.png", "/product-3.png"],
    deliveryText: "DELIVERY IN 5-7 DAYS",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal", hex: "#3D3D3D" },
      { name: "Navy", hex: "#0C2565" },
      { name: "Cream", hex: "#FAF7F0" },
    ],
    category: "Hoodies",
    careInstructions: [
      "Machine wash cold inside out",
      "Do not bleach",
      "Tumble dry low",
      "Do not iron graphic",
    ],
    badge: "Best Seller",
  },
  {
    id: 'bs2',
    title: "Tech Joggers — Water-Repellent and Breathable for Active Days",
    description: "Engineered for peak performance, these tech joggers feature a 4-way stretch shell with DWR water-repellent coating. Tapered fit, YKK zip pockets, and reflective detailing make these your go-to for training and travel.",
    price: 520000,
    oldPrice: 800000,
    discount: "-35%",
    rating: 4,
    reviews: 7,
    image: "/product-2.png",
    images: ["/product-2.png", "/product-4.png"],
    deliveryText: "DELIVERY IN 5-7 DAYS",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Slate", hex: "#708090" },
    ],
    category: "Bottoms",
    careInstructions: [
      "Machine wash cold",
      "Do not bleach or tumble dry",
      "Hang dry only",
      "Do not iron",
    ],
    badge: "New",
  },
  {
    id: 'bs3',
    title: "Classic Bomber Jacket — Timeless Design with Modern Functionality",
    description: "The SAN bomber reimagines a wardrobe classic with modern detailing — a satin shell, ribbed collar and hem, and an interior mesh liner. Compact and packable, it layers effortlessly over everything from tees to knitwear.",
    price: 890000,
    oldPrice: 1250000,
    discount: "-29%",
    rating: 5,
    reviews: 14,
    image: "/product-3.png",
    images: ["/product-3.png", "/product-1.png"],
    deliveryText: "DELIVERY IN 7-10 DAYS",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Olive", hex: "#708060" },
      { name: "Navy", hex: "#0C2565" },
    ],
    category: "Jackets",
    careInstructions: [
      "Dry clean recommended",
      "Spot clean only",
      "Do not bleach",
      "Store on padded hanger",
    ],
    badge: "Best Seller",
  },
  {
    id: 'bs4',
    title: "Performance Polo — Moisture-Wicking Fabric for All-Day Freshness",
    description: "Engineered for the modern professional-athlete, our performance polo pairs a sharp silhouette with high-tech moisture-wicking fabric that moves sweat away from skin instantly. Snag-resistant and fade-proof.",
    price: 380000,
    oldPrice: 600000,
    discount: "-37%",
    rating: 4,
    reviews: 9,
    image: "/product-4.png",
    images: ["/product-4.png", "/product-2.png"],
    deliveryText: "DELIVERY IN 5-7 DAYS",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#0C2565" },
      { name: "Sage", hex: "#8FAF8C" },
    ],
    category: "Polo",
    careInstructions: [
      "Machine wash warm",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed",
    ],
    badge: "Sale",
  },
];

export const COLLECTION_DATA = {
  title: "Built for the Journey",
  description: "From daily routines to new horizons, Grozavu provides the gear you need to explore the world. Our collections are engineered for durability and style, ensuring you look your best no matter where the path leads.",
  products: PRODUCTS_DATA.slice(0, 4),
};

export const COLLECTION_PROMO_DATA = {
  title: "PERFECT STYLE",
  description: "MaisonGrozavu is it is a statement of who you are",
  buttonText: "View All Products",
  buttonLink: "/products",
  leftImage: "/collection-promo-left.png",
  rightImage: "/collection-promo-right.png"
};

export const BEST_SELLER_DATA = {
  title: "Best Sellers",
  description: "Our most-loved pieces, curated for your journey. Discover why these are the top choices for our community.",
  products: PRODUCTS_DATA.slice(4, 8),
};
