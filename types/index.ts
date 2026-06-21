export interface HeroData {
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  title: string | React.ReactNode;
  buttonVariant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
}

export type BannerType = "hero" | "collection-promo" | "homepage-sections";

export interface Banner {
  id: string;
  type: BannerType;
  /** Shared */
  title: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  /** Hero-specific */
  subtitle?: string;
  buttonVariant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  backgroundImage?: string;
  backgroundImagePublicId?: string;
  /** Collection-promo-specific */
  description?: string;
  leftImage?: string;
  leftImagePublicId?: string;
  rightImage?: string;
  rightImagePublicId?: string;
  /** Homepage section toggles */
  showCollectionSection?: boolean;
  showBestSellerSection?: boolean;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  image: string;
  /** Cloudinary public_id for the main image — used for deletion */
  imagePublicId?: string;
  images?: string[];
  /** Cloudinary public_ids for the gallery images — used for deletion */
  imagePublicIds?: string[];
  deliveryText: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  category?: string;
  careInstructions?: string[];
  badge?: string;
  isBestSeller?: boolean;
  isBuiltForJourney?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

