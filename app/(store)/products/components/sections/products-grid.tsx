'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { PRODUCTS_DATA } from '@/constants/mock-data';
import { Section, Typography, Flex, ProductCard, Button } from '@/components/ui';
import { useProducts } from '@/hooks';

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

  const { products: fetchedProducts, loading, updateOptions } = useProducts({
    limit: 100,
    category: activeCategory === 'All' ? undefined : activeCategory,
  });

  // Keep hook filters in sync when activeCategory changes
  useEffect(() => {
    updateOptions({
      category: activeCategory === 'All' ? undefined : activeCategory,
      page: 1,
    });
  }, [activeCategory, updateOptions]);

  const displayedProducts = useMemo(() => {
    let list = [...fetchedProducts];

    // Apply client-side sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
    }

    return list;
  }, [fetchedProducts, sortBy]);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Featured';

  return (
    <Section bg="bg-white-soft!" py="py-16" containerSize="lg" containerClassName="flex flex-col gap-10 pb-10">
      {/* Category selector */}
      <Flex gap={2} className="flex-wrap border-b border-neutral-100 pb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all ${
              activeCategory === cat
                ? "bg-primary border-primary text-white"
                : "border-neutral-250 text-neutral-600 hover:border-neutral-400 bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </Flex>

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
            {loading ? 'Loading...' : `${displayedProducts.length} ${displayedProducts.length === 1 ? 'product' : 'products'}${activeCategory !== 'All' ? ` in ${activeCategory}` : ''}`}
          </Typography>
        </Flex>
      </Flex>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-4 ipad-land:grid-cols-3 mob-land:grid-cols-2 mob:grid-cols-1 gap-x-6 gap-y-10 w-full animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="aspect-4/5 w-full bg-neutral-200 rounded-sm" />
              <div className="h-4 bg-neutral-200 rounded w-3/4" />
              <div className="h-3 bg-neutral-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : displayedProducts.length > 0 ? (
        <div className="grid grid-cols-4 ipad-land:grid-cols-3 mob-land:grid-cols-2 mob:grid-cols-1 gap-x-6 gap-y-10">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{ ...product, oldPrice: product.oldPrice ?? 0 }}
              showRating
              className="!w-full flex-shrink-0 snap-none"
            />
          ))}
        </div>
      ) : activeCategory === 'All' ? (
        <Flex direction="col" align="center" justify="center" gap={6} className="py-32 px-4 max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100 animate-bounce">
            <span className="text-3xl">✨</span>
          </div>
          <Flex direction="col" gap={2}>
            <Typography variant="h3" className="text-neutral-800 font-bold tracking-tight">
              Curating New Arrivals
            </Typography>
            <Typography variant="p" className="text-sm! text-neutral-500 max-w-sm leading-relaxed">
              We are currently updating our collections with fresh styles. Stay tuned or check back soon to discover our latest arrivals!
            </Typography>
          </Flex>
        </Flex>
      ) : (
        <Flex direction="col" align="center" gap={4} className="py-24">
          <Typography variant="h3" className="text-neutral-400 font-bold">No products found</Typography>
          <Typography variant="p" className="text-sm! text-neutral-400">
            Try a different category or clear the filter.
          </Typography>
          <Button
            variant="primary"
            size="md"
            onClick={() => setActiveCategory('All')}
            className="mt-2 uppercase tracking-wider text-[11px] font-bold"
          >
            View All
          </Button>
        </Flex>
      )}
    </Section>
  );
};

