'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export const FadeLoader = () => {
  const [hasLoaderShown, setHasLoaderShown] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const shown = sessionStorage.getItem('san_loader_shown');
    if (shown) {
      setHasLoaderShown(true);
      setIsVisible(false);
      // Clean up body scroll lock if any
      document.documentElement.classList.remove('loader-active');
      document.documentElement.classList.add('loader-hidden');
    } else {
      setHasLoaderShown(false);
      // Force active class (to prevent scrolling)
      document.documentElement.classList.add('loader-active');
      document.documentElement.classList.remove('loader-hidden');

      // Hide after animation finishes (duration of staggered text + exit fade)
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('san_loader_shown', 'true');
        document.documentElement.classList.remove('loader-active');
        document.documentElement.classList.add('loader-hidden');
      }, 2600);

      return () => clearTimeout(timer);
    }
  }, []);

  // During SSR and initial hydration render, hasLoaderShown is null.
  // We render the static overlay structure so the server-rendered HTML contains it.
  // This prevents the page from flashing before the loader is shown.
  if (hasLoaderShown === true) {
    return null;
  }

  // Animation variants for letters
  const letterVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
        delay: index * 0.15,
      },
    }),
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          id="san-initial-loader"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white text-primary select-none pointer-events-auto"
        >
          <div
            className="flex items-center justify-center font-serif text-3xl md:text-4xl font-bold tracking-[0.18em] uppercase text-center"
          >
            <span className="flex">
              <motion.span custom={0} variants={letterVariants}>S</motion.span>
              <motion.span custom={1} variants={letterVariants}>A</motion.span>
              <motion.span custom={2} variants={letterVariants}>N</motion.span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
