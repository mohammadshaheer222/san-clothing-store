'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Section, SectionHeader, Typography, ProductSlider } from '@/components/ui';
import { useReviews } from '@/hooks';

interface ReviewsProps {
  title?: string;
  description?: string;
}

export const Reviews = ({
  title,
  description,
}: ReviewsProps) => {
  const { reviews, loading } = useReviews();

  const activeTitle = title || "Customer Reviews";
  const activeDescription = description || "Hear what our community has to say about their journey with SAN.";

  if (loading) {
    return (
      <Section id="reviews" bg="bg-white-soft!" py="py-24" containerSize="lg" containerClassName="flex flex-col gap-10 pb-10">
        <div className="w-full flex flex-col gap-4 animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-1/4 mx-auto" />
          <div className="h-4 bg-neutral-200 rounded w-1/2 mx-auto" />
          <div className="flex gap-6 overflow-hidden mt-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[400px] h-64 bg-neutral-100 rounded-2xl shrink-0" />
            ))}
          </div>
        </div>
      </Section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <Section id="reviews" bg="bg-white-soft!" py="py-24" containerSize="lg" containerClassName="flex flex-col gap-10 pb-10 pt-0!">
      <SectionHeader
        title={activeTitle}
        description={activeDescription}
      />
      <ProductSlider itemCount={reviews.length} showDotsAlways hideArrows>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="w-[calc(25%-18px)] sm-lap:w-[calc(33.333%-16px)] ipad-land:w-[calc(50%-12px)] mob-land:w-[85%] flex-shrink-0 snap-start flex flex-col gap-6 p-6 bg-white border border-neutral-100 rounded-2xl shadow-xs justify-between hover:shadow-sm transition-all duration-300"
          >
            <div className="flex flex-col gap-4">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill={index < review.rating ? '#F59E0B' : 'none'}
                    className={index < review.rating ? 'text-amber-500' : 'text-neutral-200'}
                  />
                ))}
              </div>

              {/* Content */}
              <Typography
                variant="p"
                serif
                italic
                className="text-neutral-700 text-base! font-medium! leading-relaxed"
              >
                &ldquo;{review.content}&rdquo;
              </Typography>
            </div>

            {/* Author */}
            <div className="flex flex-col gap-1 border-t border-neutral-100 pt-4 mt-2">
              <Typography
                variant="caption"
                className="text-primary font-semibold! tracking-wide text-xs!"
              >
                {review.authorName}
              </Typography>
              <Typography
                variant="caption"
                className="text-neutral-400 text-[10px]!"
              >
                Verified Buyer
              </Typography>
            </div>
          </div>
        ))}
      </ProductSlider>
    </Section>
  );
};
