'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Section, Typography, Flex, SectionHeader, ProductCard, ProductSlider } from '@/components/ui';
import { ProductGallery } from './product-gallery';
import { ProductInfo } from './product-info';
import { apiFetch } from '@/lib/api-client';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  images?: string[];
  deliveryText: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  category?: string;
  careInstructions?: string[];
  badge?: string;
}

interface SingleProductContentProps {
  product: Product;
}

export const SingleProductContent = ({ product }: SingleProductContentProps) => {
  const images = product.images?.length ? product.images : [product.image];

  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const data = await apiFetch<Product[]>(`/api/products/${product.id}/related`);
        if (active) {
          setRelated(data);
        }
      } catch (err) {
        console.error("Failed to fetch related products:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchRelated();
    return () => {
      active = false;
    };
  }, [product.id]);

  return (
    <div className="flex flex-col bg-white-soft">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-5 py-3">
          <Flex align="center" gap={2}>
            {[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: product.title, href: null },
            ].map((crumb, i, arr) => (
              <Flex key={crumb.label} align="center" gap={2}>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-xs text-neutral-400 hover:text-primary transition-colors font-medium"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <Typography
                    variant="p"
                    className="text-xs! text-neutral-700 font-semibold line-clamp-1 max-w-[200px]"
                  >
                    {crumb.label}
                  </Typography>
                )}
                {i < arr.length - 1 && <ChevronRight size={12} className="text-neutral-300" />}
              </Flex>
            ))}
          </Flex>
        </div>
      </div>

      {/* Main Content */}
      <Section bg="bg-white!" py="py-12" containerSize="lg" containerClassName="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ipad-land:gap-8">
          {/* Left — Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductGallery images={images} title={product.title} />
          </motion.div>

          {/* Right — Info */}
          <div className="flex flex-col gap-6">
            <ProductInfo
              title={product.title}
              description={product.description}
              price={product.price}
              oldPrice={product.oldPrice}
              discount={product.discount}
              sizes={product.sizes}
              colors={product.colors}
              category={product.category}
              deliveryText={product.deliveryText}
              careInstructions={product.careInstructions}
              badge={product.badge}
            />
          </div>
        </div>
      </Section>

      {/* Description Section */}
      <Section bg="bg-white-soft!" py="py-12" containerSize="lg" containerClassName="flex flex-col gap-6 pb-10">
        <div className="max-w-2xl flex flex-col gap-2">
          <Typography variant="caption" className="text-neutral-400 tracking-widest block">
            About this product
          </Typography>
          <Typography variant="p" className="text-neutral-600 leading-relaxed text-base!">
            {product.description}
          </Typography>
        </div>
      </Section>

      {/* You Might Also Like */}
      {!loading && related.length > 0 && (
        <Section bg="bg-white!" py="py-16" containerSize="lg" containerClassName="flex flex-col gap-10 pb-10">
          <SectionHeader
            title="You Might Also Like"
            description="More premium pieces from the SAN collection."
          />
          <ProductSlider itemCount={related.length}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ProductSlider>
        </Section>
      )}
    </div>
  );
};
