'use client';

import { Flex, Typography } from '@/components/ui';

const DEFAULT_MARQUEE_ITEMS = [
  "Free Shipping on Prepaid Orders",
  "COD Available",
  "Featured Collection",
];

interface MarqueeProps {
  items?: string[];
}

export const Marquee = ({ items = DEFAULT_MARQUEE_ITEMS }: MarqueeProps) => {
  const activeItems = items.length > 0 ? items : DEFAULT_MARQUEE_ITEMS;

  return (
    <div className="bg-primary py-3.5 overflow-hidden whitespace-nowrap border-y border-white/10">
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {[...Array(4)].map((_, i) => (
          <Flex key={i} align="center" gap={40} className="flex-shrink-0 gap-10!">
            {activeItems.map((item, index) => (
              <Flex key={index} align="center" gap={40}>
                <Typography
                  variant="p"
                  className="text-white font-bold text-[11px]! uppercase tracking-[0.2em]"
                >
                  {item}
                </Typography>
              </Flex>
            ))}
          </Flex>
        ))}
      </div>
    </div>
  );
};
