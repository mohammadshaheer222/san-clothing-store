import { ProductsHero } from './sections/products-hero';
import { ProductsGrid } from './sections/products-grid';

export default function ProductsPageContent() {
  return (
    <div className="flex flex-col bg-white-soft">
      <ProductsHero />
      <ProductsGrid />
    </div>
  );
}
