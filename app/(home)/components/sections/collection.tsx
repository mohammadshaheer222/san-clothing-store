'use client';

import { COLLECTION_DATA } from '@/constants/mock-data';
import { Section, SectionHeader, ProductCard, ProductSlider } from '@/components/ui';

export const Collection = () => {
  return (
    <Section bg="bg-white-soft!" py="py-24" containerSize="lg" containerClassName='flex flex-col gap-10'>
      <SectionHeader
        title={COLLECTION_DATA.title}
        description={COLLECTION_DATA.description}
      />
      <ProductSlider itemCount={COLLECTION_DATA.products.length}>
        {COLLECTION_DATA.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductSlider>
    </Section>
  );
};
