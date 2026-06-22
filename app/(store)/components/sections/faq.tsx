'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { FAQ_CONTENT } from '@/constants/mock-data';
import { Section, Typography, Flex, SectionHeader } from '@/components/ui';
import { useFaqs } from '@/hooks';

export const FAQ = () => {
  const { faqs, loading } = useFaqs();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return (
      <Section bg="bg-white-soft!" py="py-24" containerSize="lg" containerClassName='flex flex-col gap-10 mob:gap-5 pb-10 pt-0!'>
        <div className="w-full flex flex-col gap-4 animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-1/4 mx-auto" />
          <div className="h-4 bg-neutral-200 rounded w-1/2 mx-auto" />
          <div className="h-16 bg-neutral-200 rounded-2xl w-full mt-6" />
          <div className="h-16 bg-neutral-200 rounded-2xl w-full" />
          <div className="h-16 bg-neutral-200 rounded-2xl w-full" />
        </div>
      </Section>
    );
  }

  const items = faqs.length > 0 ? faqs : FAQ_CONTENT.items;

  if (items.length === 0) return null;

  return (
    <Section id="faq" bg="bg-white" py="py-0!" containerSize="lg" containerClassName='flex flex-col gap-10 mob:gap-5 py-10'>
      <Flex direction="col" gap={10} className="mx-auto w-full">
        <SectionHeader
          title={FAQ_CONTENT.title}
          description={FAQ_CONTENT.description}
        />
        <div className="flex flex-col gap-5 w-full">
          {items.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={'id' in item ? (item as any).id : index}
                className="group border-b border-neutral-100 bg-white-soft rounded-2xl transition-all duration-500 px-5"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-6 text-left flex items-center justify-between group cursor-pointer"
                >
                  <Typography
                    variant="h3"
                    serif
                    className={`text-base ipad-land:text-base! font-semibold! transition-all duration-500 ${isOpen ? 'text-primary' : 'text-neutral-800 group-hover:text-neutral-600'
                      }`}
                  >
                    {item.question}
                  </Typography>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`transition-colors duration-500 ${isOpen ? 'text-primary' : 'text-neutral-300 group-hover:text-neutral-500'}`}
                  >
                    <ChevronDown size={24} strokeWidth={1} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <Typography
                        variant="p"
                        className="text-sm ipad-land:text-sm! text-neutral-500 leading-relaxed max-w-3xl pb-6"
                      >
                        {item.answer}
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Flex>
    </Section>
  );
};

