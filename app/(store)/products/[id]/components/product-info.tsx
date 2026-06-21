'use client';

import { useState } from 'react';
import { Truck, Shield, RefreshCw, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Flex, Badge, Button } from '@/components/ui';

interface Color {
  name: string;
  hex: string;
}

interface ProductInfoProps {
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  sizes?: string[];
  colors?: Color[];
  category?: string;
  deliveryText: string;
  careInstructions?: string[];
  badge?: string;
  whatsappNumber?: string;
}

const WHATSAPP_NUMBER = '9744931030'; // placeholder — update as needed

export const ProductInfo = ({
  title,
  description,
  price,
  oldPrice,
  discount,
  sizes = [],
  colors = [],
  category,
  deliveryText,
  careInstructions = [],
  badge,
  whatsappNumber = WHATSAPP_NUMBER,
}: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(colors[0] ?? null);
  const [careOpen, setCareOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const handleWhatsApp = () => {
    if (sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2500);
      return;
    }

    const colorText = selectedColor ? ` | Color: ${selectedColor.name}` : '';
    const sizeText = selectedSize ? ` | Size: ${selectedSize}` : '';
    const formattedPrice = (price / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const message = encodeURIComponent(
      `Hi, I would like to order:\n\n*${title}*${sizeText}${colorText}\n\nPrice: ₹${formattedPrice}\n\nPlease confirm availability. Thank you!`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const discountPct = discount ? parseInt(discount) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4"
    >
      {/* Category + Badge row */}
      <Flex align="center" gap={3}>
        {category && (
          <Typography variant="caption" className="text-neutral-400 tracking-widest">
            {category}
          </Typography>
        )}
        {badge && (
          <Badge variant={badge === 'New' ? 'new' : badge === 'Best Seller' ? 'primary' : 'sale'}>
            {badge}
          </Badge>
        )}
      </Flex>

      {/* Title */}
      <Typography
        variant="h2"
        serif
        className="text-neutral-900 text-2xl! ipad-land:text-2xl! mob-land:text-xl! font-bold leading-snug"
      >
        {title}
      </Typography>



      {/* Price */}
      <div className="flex flex-col gap-1">
        <Flex align="baseline" gap={3}>
          <Typography variant="h3" className="text-neutral-900 text-2xl! font-bold">
            ₹{(price / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
          {oldPrice && oldPrice > 0 && (
            <Typography variant="p" className="text-base! text-neutral-400 line-through">
              ₹{(oldPrice / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          )}
          {discountPct && (
            <span className="text-emerald-600 text-sm font-bold">{discount} off</span>
          )}
        </Flex>
        {oldPrice && oldPrice > price && (
          <Typography variant="p" className="text-xs! text-emerald-600 font-medium">
            You save ₹{((oldPrice - price) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
        )}
      </div>

      <div className="w-full h-px bg-neutral-100" />

      {/* Size Selector */}
      {sizes.length > 0 && (
        <div className="flex flex-col gap-3">
          <Flex align="center" justify="between">
            <Typography variant="caption" className="text-neutral-700 font-semibold tracking-widest">
              Size:
            </Typography>
            {selectedSize && (
              <Typography variant="p" className="text-sm! text-neutral-500">
                Selected: <span className="font-semibold text-neutral-800">{selectedSize}</span>
              </Typography>
            )}
          </Flex>
          <Flex gap={2} wrap>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => { setSelectedSize(size); setSizeError(false); }}
                className={`w-11 h-11 rounded-sm border text-xs font-bold uppercase transition-all duration-200 ${selectedSize === size
                  ? 'bg-primary text-white border-primary'
                  : sizeError
                    ? 'border-red-300 text-neutral-700 hover:border-primary'
                    : 'border-neutral-200 text-neutral-700 hover:border-primary hover:text-primary'
                  }`}
              >
                {size}
              </button>
            ))}
          </Flex>
          <AnimatePresence>
            {sizeError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-500 font-medium"
              >
                Please select a size before ordering.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="w-full h-px bg-neutral-100" />

      {/* WhatsApp CTA */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white font-bold text-sm uppercase tracking-widest py-4 rounded-full transition-all duration-200 shadow-lg shadow-[#25D366]/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Buy on WhatsApp
        </button>
        <Typography variant="p" className="text-center text-xs! text-neutral-400">
          Chat with us directly — fast & easy ordering
        </Typography>
      </div>

      {/* Delivery + Trust badges */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: <Truck size={18} />, label: deliveryText },
          { icon: <Shield size={18} />, label: '100% Authentic' },
          { icon: <RefreshCw size={18} />, label: '30-Day Returns' },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 bg-white border border-neutral-100 rounded-xl py-3 px-2 text-center"
          >
            <span className="text-primary">{icon}</span>
            <Typography variant="p" className="text-[10px]! text-neutral-500 font-medium leading-tight">
              {label}
            </Typography>
          </div>
        ))}
      </div>

      {/* Care Instructions accordion */}
      {careInstructions.length > 0 && (
        <div className="border border-neutral-100 rounded-2xl overflow-hidden mb-10">
          <button
            onClick={() => setCareOpen(!careOpen)}
            className="w-full flex items-center justify-between px-5 py-4 bg-white text-left"
          >
            <Typography variant="caption" className="text-neutral-700 font-semibold tracking-widest">
              Care Instructions
            </Typography>
            {careOpen ? <ChevronUp size={16} className="text-neutral-400" /> : <ChevronDown size={16} className="text-neutral-400" />}
          </button>
          <AnimatePresence initial={false}>
            {careOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              >
                <ul className="px-5 pb-4 flex flex-col gap-2 bg-white border-t border-neutral-50">
                  {careInstructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <Typography variant="p" className="text-xs! text-neutral-600">
                        {inst}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};
