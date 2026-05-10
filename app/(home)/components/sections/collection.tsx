'use client';

import Image from 'next/image';
import { Star, Info } from 'lucide-react';

import { COLLECTION_DATA } from '@/constants/mock-data';
import { Section, Typography, Flex, Grid, SectionHeader } from '@/components/ui';

export const Collection = () => {
  return (
    <Section bg="bg-white-soft!" py="py-24" containerSize="lg" containerClassName='flex flex-col gap-10'>
      <SectionHeader
        title={COLLECTION_DATA.title}
        description={COLLECTION_DATA.description}
      />
      <Grid cols={1} md={2} lg={4} gap={6}>
        {COLLECTION_DATA.products.map((product) => (
          <div key={product.id} className="group flex flex-col gap-4">
            <div className="relative aspect-4/5 bg-neutral-50 overflow-hidden rounded-sm">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-sm">
                Sale {product.discount}
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              {/* <Flex align="center" gap={1}>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < product.rating ? "currentColor" : "none"}
                      className={i < product.rating ? "text-neutral-900" : "text-neutral-200"}
                    />
                  ))}
                </div>
                <Typography variant="caption" className="text-neutral-400 normal-case tracking-normal text-[11px]">
                  {product.reviews} reviews
                </Typography>
              </Flex> */}
              <Typography variant="p" className="text-[13px] font-semibold leading-tight text-neutral-900 line-clamp-2">
                {product.title}
              </Typography>
              {/* <Flex align="center" gap={1.5} className="text-[#22c55e]">
                <div className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center">
                  <span className="text-[8px] font-bold">✓</span>
                </div>
                <Typography variant="caption" className="text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                  {product.delivery}
                  <Info size={10} className="text-neutral-300" />
                </Typography>
              </Flex> */}
              <Flex align="center" gap={2}>
                <Typography variant="p" className="text-[13px] text-neutral-400 line-through">
                  Rs. {product.oldPrice.toLocaleString()}.00
                </Typography>
                <Typography variant="p" className="text-[13px] font-bold text-neutral-900">
                  Rs. {product.price.toLocaleString()}.00
                </Typography>
              </Flex>
            </div>
          </div>
        ))}
      </Grid>
    </Section>
  );
};
