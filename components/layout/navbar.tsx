'use client';

import { useState } from 'react';

import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

import { NavLink, SiteConfig } from '@/types';
import { NAV_LINKS, SITE_CONFIG } from '@/constants/site';

import { MobileMenu } from './mobile-menu';
import { Container, Flex, Typography, Button } from '@/components/ui';

interface NavbarProps {
  links?: readonly NavLink[];
  config?: SiteConfig;
}

const navVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export const Navbar = ({
  links = NAV_LINKS,
  config = SITE_CONFIG
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="bg-[#f9f9f9] border-b border-neutral-100 sticky top-0 z-50 py-5 ipad-land:py-3.5"
      >
        <Container size="xl" className="px-12! ipad-land:px-4!">
          <Flex align="center" justify="between" className="relative">
            <Flex align="center" className="flex-1 ipad-land:z-10">
              {/* <Link href="/" className="ipad-land:hidden hover:opacity-70 transition-opacity">
                <Typography
                  variant="h3"
                  serif
                  className="text-2xl tracking-[0.18em] text-neutral-900 uppercase whitespace-nowrap"
                >
                  {config.name}
                </Typography>
              </Link> */}

              {/* Mobile Menu Icon - Hidden on Desktop */}
              <div className="hidden ipad-land:block">
                <Button
                  variant="ghost"
                  onClick={() => setIsMenuOpen(true)}
                  className="p-1.5! text-neutral-800 hover:scale-110 transition-transform"
                >
                  <Menu size={24} strokeWidth={1.2} />
                </Button>
              </div>
            </Flex>
            <Link
              href="/"
              className="hidden ipad-land:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 hover:opacity-70 transition-opacity"
            >
              <Typography
                variant="h3"
                serif
                className="text-[17px] tracking-[0.18em] text-neutral-900 uppercase whitespace-nowrap"
              >
                {config.name}
              </Typography>
            </Link>
            <Flex
              justify="center"
              className="flex-1 ipad-land:hidden"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={navVariants}
                className="flex items-center gap-8"
              >
                {links.map((link) => (
                  <motion.div key={link.label} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="nav-link-hover group"
                    >
                      <Typography
                        variant="caption"
                        className="font-bold text-neutral-800 group-hover:text-neutral-500 transition-colors"
                      >
                        {link.label}
                      </Typography>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </Flex>
            <Flex align="center" justify="end" gap={6} className="flex-1 ipad-land:z-10 ipad-land:gap-3.5">
              <Button
                variant="ghost"
                className="p-1.5! text-neutral-800 hover:scale-110 relative"
              >
                <ShoppingCart size={22} strokeWidth={1.2} />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  0
                </span>
              </Button>
            </Flex>
          </Flex>
        </Container>
      </nav>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

