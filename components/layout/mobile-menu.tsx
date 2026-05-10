'use client';

import Link from 'next/link';

import { X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import { useScrollLock } from '@/hooks';
import { Button } from '@/components/ui';
import { NAV_LINKS } from '@/constants/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarVariants: Variants = {
  closed: {
    x: '-100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 },
};

const backdropVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  useScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex">
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="relative w-[85%] max-w-[400px] h-full bg-white shadow-2xl flex flex-col"
          >
            <div className="h-[60px] flex items-center px-4 border-b border-neutral-100 bg-neutral-50/50">
              <motion.div
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="w-10 h-10 p-0! bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-all hover:rotate-90 duration-300 rounded-full"
                >
                  <X size={20} strokeWidth={1.5} />
                </Button>
              </motion.div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <motion.div key={link.label} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-6 py-5 border-b border-neutral-50 text-[14px] font-medium tracking-widest text-neutral-900 hover:bg-neutral-50 transition-colors uppercase"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
