import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Typography, Flex, Badge } from '@/components/ui';

interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  rating?: number;
  reviews?: number;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  showRating?: boolean;
  className?: string;
}

export const ProductCard = ({ product, showRating = false, className = '' }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className={`w-[calc(25%-18px)] sm-lap:w-[calc(33.333%-16px)] ipad-land:w-[calc(50%-12px)] mob-land:w-[85%] flex-shrink-0 snap-start group flex flex-col gap-4 h-full ${className}`}
    >
      <div className="relative aspect-4/5 bg-neutral-50 overflow-hidden rounded-sm flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.discount && (
          <div className="absolute top-4 left-4">
            <Badge variant="sale">Sale {product.discount}</Badge>
          </div>
        )}
        {product.badge && !product.discount && (
          <div className="absolute top-4 left-4">
            <Badge variant={product.badge === 'New' ? 'new' : product.badge === 'Eco' ? 'new' : 'primary'}>
              {product.badge}
            </Badge>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2.5 flex-grow">
        <Typography variant="p" className="text-[13px] font-semibold leading-tight text-neutral-900 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </Typography>
        {showRating && product.rating !== undefined && (
          <Flex align="center" gap={1}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < product.rating! ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}
              />
            ))}
            {product.reviews !== undefined && (
              <Typography variant="p" className="text-[11px] text-neutral-400 ml-1">
                ({product.reviews})
              </Typography>
            )}
          </Flex>
        )}
        <div className="mt-auto">
          <Flex align="center" gap={2}>
            {product.oldPrice && (
              <Typography variant="p" className="text-[13px] text-neutral-400 line-through">
                ₹{product.oldPrice.toLocaleString()}.00
              </Typography>
            )}
            <Typography variant="p" className="text-[13px] font-bold text-neutral-900">
              ₹{product.price.toLocaleString()}.00
            </Typography>
          </Flex>
        </div>
      </div>
    </Link>
  );
};

