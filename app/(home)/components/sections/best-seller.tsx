'use client';

import { BEST_SELLER_DATA } from '@/constants/mock-data';
import { Section, SectionHeader, ProductCard, ProductSlider } from '@/components/ui';

export const BestSeller = () => {
  return (
    <Section bg="bg-white" py="py-24" containerSize="lg" containerClassName='flex flex-col gap-10 pb-10'>
      <SectionHeader
        title={BEST_SELLER_DATA.title}
        description={BEST_SELLER_DATA.description}
      />
      <ProductSlider itemCount={BEST_SELLER_DATA.products.length}>
        {BEST_SELLER_DATA.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductSlider>
    </Section>
  );
};
