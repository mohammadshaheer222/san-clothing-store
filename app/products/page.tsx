import type { Metadata } from 'next';
import ProductsPageContent from './components/page-content';

export const metadata: Metadata = {
  title: 'All Products — SAN',
  description: 'Browse the full SAN collection — premium T-Shirts, Hoodies, Jackets and more, crafted for style and comfort.',
};

export default function ProductsPage() {
  return <ProductsPageContent />;
}
