'use client';

import Image from 'next/image';
import { Section, Typography, Flex } from '@/components/ui';

export const ProductsHero = () => {
  return (
    <Section
      container={false}
      className="relative h-[340px] mob-land:h-[240px] overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/collection-promo-right.png"
          alt="Products collection"
          fill
          className="object-cover object-center animate-subtle-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-5 flex flex-col justify-center">
        <Flex direction="col" gap={3} className="max-w-lg animate-fade-in-up">
          <Typography
            variant="caption"
            className="text-white/60 tracking-[0.3em]"
          >
            SAN Collection
          </Typography>
          <Typography
            variant="h1"
            serif
            className="text-white text-4xl! ipad-land:text-3xl! mob-land:text-2xl! font-bold leading-tight"
          >
            All Products
          </Typography>
          <Typography variant="p" className="text-white/70 text-sm! max-w-xs leading-relaxed">
            Discover premium essentials crafted for every moment of your journey.
          </Typography>
        </Flex>
      </div>
    </Section>
  );
};
