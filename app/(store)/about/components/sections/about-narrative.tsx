import Image from 'next/image';
import { Section, Flex, Typography } from '@/components/ui';

interface AboutNarrativeProps {
  title1?: string;
  description1?: string;
  title2?: string;
  description2?: string;
  image?: string;
}

export const AboutNarrative = ({ title1, description1, title2, description2, image }: AboutNarrativeProps) => {
  return (
    <Section
      id="about-narrative"
      bg="bg-white-soft!"
      py="py-10"
      containerSize="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* Image Section */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-xs group">
          <Image
            src={image || "/hero-bg.png"}
            alt="Minimalist design aesthetic"
            fill
            priority
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>

        {/* Narrative Content */}
        <Flex direction="col" gap={8} justify="center">
          <Flex direction="col" gap={3}>
            <Typography variant="h3" serif className="text-neutral-900 text-base! font-semibold!">
              {title1 || "Design with Intention"}
            </Typography>
            <Typography variant="p" className="text-neutral-500 text-sm! leading-relaxed">
              {description1 || "We believe that every piece of clothing should serve a clear purpose in your life. We do not design for temporary trends or seasons; we design for longevity, style, and ease. Our collections feature relaxed silhouettes, natural fabrics, and muted tones that integrate seamlessly into any wardrobe."}
            </Typography>
          </Flex>

          <Flex direction="col" gap={3}>
            <Typography variant="h3" serif className="text-neutral-900 text-base! font-semibold!">
              {title2 || "Ethical & Transparent Craftsmanship"}
            </Typography>
            <Typography variant="p" className="text-neutral-500 text-sm! leading-relaxed">
              {description2 || "Every thread in a SAN garment tells a story of care and respect. We partner only with mills and workshops that share our commitment to fair wages, safe conditions, and low environmental impact. By manufacturing in limited quantities, we eliminate waste and ensure that each detail is finished to the highest standards."}
            </Typography>
          </Flex>
        </Flex>
      </div>
    </Section>
  );
};
