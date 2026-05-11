'use client';

import { useRef, useState, useEffect } from 'react';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { COLLECTION_DATA } from '@/constants/mock-data';
import { Section, Typography, Flex, SectionHeader } from '@/components/ui';

export const Collection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const cardWidth = sliderRef.current.children[0].clientWidth + 24; // Width + Gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0].clientWidth + 24;
      sliderRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -sliderRef.current.offsetWidth : sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };


  return (
    <Section bg="bg-white-soft!" py="py-24" containerSize="lg" containerClassName='flex flex-col gap-10'>
      <SectionHeader
        title={COLLECTION_DATA.title}
        description={COLLECTION_DATA.description}
      />
      <div className="relative group/slider">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-6 pb-5 scrollbar-hide snap-x snap-mandatory scroll-smooth items-stretch"
        >
          {COLLECTION_DATA.products.map((product) => (
            <div
              key={product.id}
              className="w-[85%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start group flex flex-col gap-4 h-full"
            >
              <div className="relative aspect-4/5 bg-neutral-50 overflow-hidden rounded-sm flex-shrink-0">
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
              <div className="flex flex-col gap-2.5 flex-grow">
                <Typography variant="p" className="text-[13px] font-semibold leading-tight text-neutral-900 line-clamp-2 min-h-[2.5rem]">
                  {product.title}
                </Typography>
                <div className="mt-auto">
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
            </div>
          ))}
        </div>

        {/* Sliding Dots for Mobile/Tablet */}
        <Flex justify="center" gap={2} className="mt-4 md:hidden">
          {COLLECTION_DATA.products.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${activeIndex === index ? 'w-6 bg-primary' : 'w-1.5 bg-neutral-300'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </Flex>

        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0 transition-all duration-300 z-10 border border-neutral-100 hidden md:flex"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0 transition-all duration-300 z-10 border border-neutral-100 hidden md:flex"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>

      </div>
    </Section>
  );
};
