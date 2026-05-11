import Image from 'next/image';
import { Typography, Flex } from '@/components/ui';

interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice: number;
  discount: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="w-[85%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start group flex flex-col gap-4 h-full">
      <div className="relative aspect-4/5 bg-neutral-50 overflow-hidden rounded-sm flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-sm">
          Sale {product.discount}
        </div>
      </div>
      <div className="flex flex-col gap-2.5 flex-grow">
        <Typography variant="p" className="text-[13px] font-semibold leading-tight text-neutral-900 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </Typography>
        <div className="mt-auto">
          <Flex align="center" gap={2}>
            <Typography variant="p" className="text-[13px] text-neutral-400 line-through">
              Rs. {product.oldPrice.toLocaleString()}.00
            </Typography>
            <Typography variant="p" className="text-[13px] font-bold text-neutral-900">
              Rs. {product.price.toLocaleString()}.00
            </Typography>
          </Flex>
        </div>
      </div>
    </div>
  );
};
