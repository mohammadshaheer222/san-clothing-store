'use client';

import { BEST_SELLER_DATA } from '@/constants/mock-data';
import { Section, SectionHeader, ProductCard, ProductSlider } from '@/components/ui';
import { useProducts } from '@/hooks';

interface BestSellerProps {
  title?: string;
  description?: string;
}

export const BestSeller = ({ title, description }: BestSellerProps) => {
  const activeTitle = title || BEST_SELLER_DATA.title;
  const activeDescription = description || BEST_SELLER_DATA.description;

  const { products, loading } = useProducts({
    isBestSeller: true,
    limit: 8,
  });

  if (!loading && products.length === 0) return null;

  return (
    <Section id="best-sellers" bg="bg-white" py="py-24" containerSize="lg" containerClassName='flex flex-col gap-10 pb-10'>
      <SectionHeader
        title={activeTitle}
        description={activeDescription}
      />
      {loading ? (
        <div className="flex gap-6 overflow-hidden animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[calc(25%-18px)] sm-lap:w-[calc(33.333%-16px)] ipad-land:w-[calc(50%-12px)] mob-land:w-[85%] flex-shrink-0 flex flex-col gap-4 bg-white rounded-2xl p-3 border border-neutral-100/80 shadow-xs"
            >
              <div className="aspect-4/5 w-full bg-neutral-100 rounded-xl" />
              <div className="flex flex-col gap-2.5">
                <div className="h-4 bg-neutral-200 rounded-md w-3/4" />
                <div className="h-3.5 bg-neutral-200 rounded-md w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductSlider itemCount={products.length}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductSlider>
      )}
    </Section>
  );
};

