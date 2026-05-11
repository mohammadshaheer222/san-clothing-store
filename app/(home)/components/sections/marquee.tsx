'use client';

import { Flex, Typography } from '@/components/ui';

const MARQUEE_ITEMS = [
  "Free Shipping on Prepaid Orders",
  "COD Available",
  "Featured Collection",
];

export const Marquee = () => {
  return (
    <div className="bg-primary py-3.5 overflow-hidden whitespace-nowrap border-y border-white/10">
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {[...Array(4)].map((_, i) => (
          <Flex key={i} align="center" gap={40} className="px-20 flex-shrink-0">
            {MARQUEE_ITEMS.map((item, index) => (
              <Flex key={index} align="center" gap={40}>
                <Typography
                  variant="p"
                  className="text-white font-bold text-[11px]! uppercase tracking-[0.2em]"
                >
                  {item}
                </Typography>
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
              </Flex>
            ))}
          </Flex>
        ))}
      </div>
    </div>
  );
};
