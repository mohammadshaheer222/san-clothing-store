'use client';

import { COLLECTION_DATA } from '@/constants/mock-data';
import { Section, SectionHeader, ProductCard, ProductSlider } from '@/components/ui';
import { useProducts } from '@/hooks';

export const Collection = () => {
  const { products, loading } = useProducts({
    isBuiltForJourney: true,
    limit: 8,
  });

  if (loading) return null;
  if (products.length === 0) return null;

  return (
    <Section bg="bg-white-soft!" py="py-24" containerSize="lg" containerClassName='flex flex-col gap-10 pt-0!'>
      <SectionHeader
        title={COLLECTION_DATA.title}
        description={COLLECTION_DATA.description}
      />
      {loading ? (
        <div className="grid grid-cols-4 sm-lap:grid-cols-3 ipad-land:grid-cols-2 mob-land:grid-cols-1 gap-6 w-full animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="aspect-4/5 w-full bg-neutral-200 rounded-sm" />
              <div className="h-4 bg-neutral-200 rounded w-3/4" />
              <div className="h-3 bg-neutral-200 rounded w-1/2" />
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

