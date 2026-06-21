import Link from 'next/link';
import { Container, Typography, Flex, Grid } from '@/components/ui';
import { Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white-soft pt-14 pb-10 mt-auto border-t border-black/10">
      <Container>
        <Grid cols={1} md={3} gap={8} className="mb-10">
          {/* Brand and About */}
          <div className="flex flex-col gap-6">
            <Typography variant="h3" serif className="text-black tracking-widest uppercase">
              SAN
            </Typography>
            <Typography variant="p" className="text-black/60 text-sm leading-relaxed max-w-xs">
              Crafting premium essentials for the modern city. We believe in quality,
              sustainability, and timeless style that statements who you are.
            </Typography>
            <Flex gap={4}>
              <a href="https://www.instagram.com/sanclothingstudio/" target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://wa.me/9744931030" target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black transition-colors" aria-label="WhatsApp">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </Flex>
          </div>

          {/* Shop Links */}
          <div className="flex flex-col gap-6 mt-5 md:mt-0">
            <Typography variant="caption" className="text-black font-bold uppercase tracking-wider text-xs">
              Shop
            </Typography>
            <ul className="flex flex-col gap-3">
              <li><Link href="/products" className="text-black/60 hover:text-black text-sm transition-colors">All Products</Link></li>
              <li><Link href="/#best-sellers" className="text-black/60 hover:text-black text-sm transition-colors">Best Sellers</Link></li>
              <li><Link href="/#collections" className="text-black/60 hover:text-black text-sm transition-colors">Collections</Link></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="flex flex-col gap-6 mt-5 md:mt-0">
            <Typography variant="caption" className="text-black font-bold uppercase tracking-wider text-xs">
              Support
            </Typography>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="https://wa.me/9744931030" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black/60 hover:text-black text-sm transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <span>WhatsApp Chat: +91 9744931030</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@sanclothing.com" className="flex items-center gap-2 text-black/60 hover:text-black text-sm transition-colors">
                  <Mail size={16} />
                  <span>support@sanclothing.com</span>
                </a>
              </li>
              <li>
                <Link href="/#faq" className="flex items-center gap-2 text-black/60 hover:text-black text-sm transition-colors">
                  <span className="w-4 flex justify-center font-bold text-xs">?</span>
                  <span>Frequently Asked Questions</span>
                </Link>
              </li>
            </ul>
          </div>
        </Grid>

        {/* Bottom Bar */}
        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-center items-center gap-6">
          <Typography variant="p" className="text-black/40 text-[11px]! tracking-wider uppercase text-center">
            © {currentYear} SAN. ALL RIGHTS RESERVED.
          </Typography>
        </div>
      </Container>
    </footer>
  );
};
