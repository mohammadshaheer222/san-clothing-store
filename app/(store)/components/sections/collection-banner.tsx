import Link from 'next/link';
import Image from 'next/image';
import { Section, Typography, Button, Flex } from '@/components/ui';
import { COLLECTION_PROMO_DATA } from '@/constants/mock-data';

interface CollectionBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  leftImage?: string;
  rightImage?: string;
}

export const CollectionBanner = ({
  title = COLLECTION_PROMO_DATA.title,
  description = COLLECTION_PROMO_DATA.description,
  buttonText = COLLECTION_PROMO_DATA.buttonText,
  buttonLink = COLLECTION_PROMO_DATA.buttonLink,
  leftImage = COLLECTION_PROMO_DATA.leftImage,
  rightImage = COLLECTION_PROMO_DATA.rightImage,
}: CollectionBannerProps) => {
  return (
    <Section
      container={false}
      bg="bg-[#111111]"
      className="relative min-h-[500px] md:h-[700px] overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 h-full w-full">
        {/* Left Image */}
        {leftImage && (
          <div className="relative h-full hidden md:block">
            <Image
              src={leftImage}
              alt="Collection Promo Left"
              fill
              className="object-cover object-center brightness-90"
              priority
            />
          </div>
        )}

        {/* Center Content */}
        <div className={`relative flex flex-col items-center justify-center text-center p-10 z-10 bg-black md:bg-transparent min-h-[400px] md:min-h-full ${!leftImage ? 'md:col-span-2' : ''}`}>
          <Flex direction="col" gap={6} align="center" className="max-w-md">
            <Typography variant="h2" serif className="text-white uppercase tracking-[0.2em] text-3xl md:text-5xl">
              {title}
            </Typography>
            <Typography variant="p" className="text-white/60 text-sm md:text-base max-w-[280px] font-light leading-relaxed">
              {description}
            </Typography>
            <div className="pt-4">
              <Link href={buttonLink}>
                <Button
                  variant="white"
                  size="lg"
                  className="rounded-2xl px-6 py-4 text-xs tracking-widest uppercase font-semibold text-black hover:bg-neutral-200 transition-colors"
                >
                  {buttonText}
                </Button>
              </Link>
            </div>
          </Flex>
        </div>

        {/* Right Image */}
        <div className="relative h-full min-h-[400px] md:min-h-full">
          <Image
            src={rightImage}
            alt="Collection Promo Right"
            fill
            className="object-cover object-center brightness-90"
            priority
          />
        </div>
      </div>
    </Section>
  );
};
