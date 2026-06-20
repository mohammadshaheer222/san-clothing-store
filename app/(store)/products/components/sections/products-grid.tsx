'use client';

import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { PRODUCTS_DATA } from '@/constants/mock-data';
import { Section, Typography, Flex, ProductCard, Button } from '@/components/ui';

const CATEGORIES = ['All', 'T-Shirts', 'Hoodies', 'Jackets', 'Bottoms', 'Polo'];

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rated', value: 'rating' },
];

export const ProductsGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showSort, setShowSort] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = [...PRODUCTS_DATA];

    if (activeCategory !== 'All') {
      products = products.filter((p) => p.category === activeCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
    }

    return products;
  }, [activeCategory, sortBy]);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Featured';

  return (
    <Section bg="bg-white-soft!" py="py-16" containerSize="lg" containerClassName="flex flex-col gap-10 pb-10">
      <Flex justify="between" align="center" className="flex-wrap gap-4">
        {/* Sort dropdown */}
        <div className="relative">
          <Button
            size="md"
            variant="outline"
            onClick={() => setShowSort(!showSort)}
            className="gap-2 hover:border-primary hover:text-primary!"
          >
            Sort: {activeSortLabel}
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${showSort ? 'rotate-180' : ''}`}
            />
          </Button>
          {showSort && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-neutral-100 rounded-2xl shadow-xl z-20 min-w-[180px] overflow-hidden">
              {SORT_OPTIONS.map((opt) => (
                <Button
                  key={opt.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                  className={`w-full! rounded-none! justify-start! text-left px-4 py-3 text-xs ${sortBy === opt.value
                    ? 'bg-primary/5! text-primary! font-semibold'
                    : 'text-neutral-700'
                    }`}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        {/* Results count */}
        <Flex justify="between" align="center">
          <Typography variant="p" className="text-sm! text-neutral-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          </Typography>
        </Flex>
      </Flex>


      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-4 ipad-land:grid-cols-3 mob-land:grid-cols-2 mob:grid-cols-1 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{ ...product, oldPrice: product.oldPrice ?? 0 }}
              showRating
              className="!w-full flex-shrink-0 snap-none"
            />
          ))}
        </div>
      ) : (
        <Flex direction="col" align="center" gap={4} className="py-24">
          <Typography variant="h3" className="text-neutral-400">No products found</Typography>
          <Typography variant="p" className="text-sm! text-neutral-400">
            Try a different category or clear the filter.
          </Typography>
          <Button
            variant="primary"
            size="md"
            onClick={() => setActiveCategory('All')}
            className="mt-2"
          >
            View All
          </Button>
        </Flex>
      )}
    </Section>
  );
};
