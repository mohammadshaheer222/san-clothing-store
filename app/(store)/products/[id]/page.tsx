import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS_DATA } from '@/constants/mock-data';
import { SingleProductContent } from './components/single-product-content';
import { getProductById } from '@/services/product.service';
import { isValidObjectId } from '@/lib/utils';

interface Props {
  params: Promise<{ id: string }>;
}

async function fetchProduct(id: string) {
  if (isValidObjectId(id)) {
    try {
      return await getProductById(id);
    } catch {
      // Fall through to mock data fallback
    }
  }
  return PRODUCTS_DATA.find((p) => p.id === id) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return { title: 'Product Not Found — SAN' };
  }

  return {
    title: `${product.title} — SAN`,
    description: product.description,
  };
}

export function generateStaticParams() {
  return PRODUCTS_DATA.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    notFound();
  }

  return <SingleProductContent product={product} />;
}
