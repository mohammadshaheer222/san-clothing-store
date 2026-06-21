'use client';

import { useRef, useState, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Flex } from '@/components/ui';

interface ProductSliderProps {
  children: ReactNode;
  itemCount: number;
  showDotsAlways?: boolean;
  hideArrows?: boolean;
}

export const ProductSlider = ({
  children,
  itemCount,
  showDotsAlways = false,
  hideArrows = false,
}: ProductSliderProps) => {
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
    <div className="relative group/slider w-full">
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-6 pb-5 scrollbar-hide snap-x snap-mandatory scroll-smooth items-stretch"
      >
        {children}
      </div>

      {/* Sliding Dots */}
      <Flex justify="center" gap={2} className={`mt-4 ${showDotsAlways ? 'flex' : 'md:hidden'}`}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-1.5 transition-all duration-300 rounded-full ${activeIndex === index ? 'w-6 bg-primary' : 'w-1.5 bg-neutral-300'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </Flex>

      {/* Navigation Arrows */}
      {!hideArrows && (
        <>
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
        </>
      )}
    </div>
  );
};
