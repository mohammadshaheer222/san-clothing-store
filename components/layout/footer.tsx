import Link from 'next/link';
import { Container, Typography, Flex, Grid } from '@/components/ui';
import { Camera, Send, MessageSquare, Play } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white-soft pt-10 pb-10 mt-auto border-t border-black/10">
      <Container>
        <Grid cols={1} md={4} gap={12} className="mb-10">
          {/* Brand and About */}
          <div className="flex flex-col gap-6">
            <Typography variant="h3" serif className="text-black tracking-widest uppercase">
              SAN
            </Typography>
            <Typography variant="p" className="text-black/60 text-sm leading-relaxed max-w-xs">
              Crafting premium essentials for the modern journey. We believe in quality,
              sustainability, and timeless style that statements who you are.
            </Typography>
            <Flex gap={4}>
              <Link href="#" className="text-black/60 transition-colors">
                <Camera size={20} />
              </Link>
              <Link href="#" className="text-black/60 transition-colors">
                <Send size={20} />
              </Link>
              <Link href="#" className="text-black/60 transition-colors">
                <MessageSquare size={20} />
              </Link>
              <Link href="#" className="text-black/60 transition-colors">
                <Play size={20} />
              </Link>
            </Flex>
          </div>

          {/* Shop Links */}
          <div className="flex flex-col gap-6 mt-5">
            <Typography variant="caption" className="text-black font-bold">
              Shop
            </Typography>
            <ul className="flex flex-col gap-3">
              <li><Link href="#" className="text-black/60 text-sm transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="text-black/60 text-sm transition-colors">Best Sellers</Link></li>
              <li><Link href="#" className="text-black/60 text-sm transition-colors">Collections</Link></li>
              <li><Link href="#" className="text-black/60 text-sm transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-6 mt-5">
            <Typography variant="caption" className="text-black font-bold">
              Support
            </Typography>
            <ul className="flex flex-col gap-3">
              <li><Link href="#" className="text-black/60 text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-black/60 text-sm transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-black/60 text-sm transition-colors">Size Guide</Link></li>
              <li><Link href="#" className="text-black/60 text-sm transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </Grid>

        {/* Bottom Bar */}
        <div className="border-t border-black/10 pt-10 flex flex-col md:flex-row justify-center items-center gap-6">
          <Typography variant="p" className="text-black/40 text-[11px]! tracking-wider uppercase text-center">
            © {currentYear} SAN. ALL RIGHTS RESERVED.
          </Typography>
        </div>
      </Container>
    </footer>
  );
};
