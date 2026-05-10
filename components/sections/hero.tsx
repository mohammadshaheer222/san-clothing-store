import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

export const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt="Kidoriman Fashion Hero"
          fill
          priority
          className="object-cover object-center scale-105 animate-subtle-zoom"
        />
        {/* Subtle Overlay to make text pop */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full container mx-auto px-6 md:px-12 flex flex-col justify-end pb-24 md:pb-32">
        <div className="max-w-2xl flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-xl md:text-2xl font-serif italic tracking-wide animate-fade-in-up">
              Kireina & Gelyu
            </h3>
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight animate-fade-in-up [animation-delay:200ms] opacity-0">
              8 New Colors. <br className="hidden md:block" />
              Moving Fast.
            </h1>
          </div>
          
          <div className="animate-fade-in-up [animation-delay:400ms] opacity-0">
            <Button variant="white" size="xl" className="uppercase tracking-widest text-[12px] font-bold">
              SHOP NOW
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
