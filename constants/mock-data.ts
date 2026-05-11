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
export const COLLECTION_DATA = {
  title: "Built for the Journey",
  description: "From daily routines to new horizons, Grozavu provides the gear you need to explore the world. Our collections are engineered for durability and style, ensuring you look your best no matter where the path leads.",
  products: [
    {
      id: '1',
      title: "Essential T-Shirt - with a Silk-Like Touch for a Sophisticated Look",
      price: 4600,
      oldPrice: 8500,
      discount: "-40%",
      rating: 5,
      reviews: 6,
      image: "/product-1.png",
      delivery: "DELIVERY IN 5-7 DAYS"
    },
    {
      id: '2',
      title: "Premium Apparel - from Egyptian Cotton for Everyday Elegance",
      price: 4500,
      oldPrice: 8000,
      discount: "-44%",
      rating: 5,
      reviews: 8,
      image: "/product-2.png",
      delivery: "DELIVERY IN 5-7 DAYS"
    },
    {
      id: '3',
      title: "Urban-Chic Apparel - from Breathable Fabric for Total Freedom of Movement",
      price: 4100,
      oldPrice: 7500,
      discount: "-46%",
      rating: 5,
      reviews: 4,
      image: "/product-3.png",
      delivery: "DELIVERY IN 5-7 DAYS"
    },
    {
      id: '4',
      title: "Elevated Apparel - from Organic Fiber for Total Freedom of Movement",
      price: 4700,
      oldPrice: 8500,
      discount: "-45%",
      rating: 5,
      reviews: 6,
      image: "/product-4.png",
      delivery: "DELIVERY IN 5-7 DAYS"
    }
  ]
};
export const COLLECTION_PROMO_DATA = {
  title: "PERFECT STYLE",
  description: "MaisonGrozavu is it is a statement of who you are",
  buttonText: "View All Products",
  leftImage: "/collection-promo-left.png",
  rightImage: "/collection-promo-right.png"
};

export const BEST_SELLER_DATA = {
  title: "Best Sellers",
  description: "Our most-loved pieces, curated for your journey. Discover why these are the top choices for our community.",
  products: [
    {
      id: 'bs1',
      title: "Signature Hoodie - Heavyweight Cotton for Maximum Comfort",
      price: 6500,
      oldPrice: 9500,
      discount: "-32%",
      image: "/product-1.png",
    },
    {
      id: 'bs2',
      title: "Tech Joggers - Water-Repellent and Breathable for Active Days",
      price: 5200,
      oldPrice: 8000,
      discount: "-35%",
      image: "/product-2.png",
    },
    {
      id: 'bs3',
      title: "Classic Bomber Jacket - Timeless Design with Modern Functionality",
      price: 8900,
      oldPrice: 12500,
      discount: "-29%",
      image: "/product-3.png",
    },
    {
      id: 'bs4',
      title: "Performance Polo - Moisture-Wicking Fabric for All-Day Freshness",
      price: 3800,
      oldPrice: 6000,
      discount: "-37%",
      image: "/product-4.png",
    }
  ]
};
