export interface HeroData {
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  title: string | React.ReactNode;
  buttonVariant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
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
  deliveryText: string;
}
