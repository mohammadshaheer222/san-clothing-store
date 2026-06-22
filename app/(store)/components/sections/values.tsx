import * as LucideIcons from 'lucide-react';
import { Section, SectionHeader, Grid, Typography, Flex } from '@/components/ui';
import { ValueItem } from '@/types';

interface ValuesProps {
  title?: string;
  description?: string;
  items?: ValueItem[];
}

export const Values = ({ title, description, items = [] }: ValuesProps) => {
  const displayItems = items.length > 0 ? items : [
    {
      title: 'Timeless Aesthetic',
      description: 'We design refined, minimalist silhouettes that defy the cycle of trends, building a lasting wardrobe for years to come.',
      iconName: 'Compass',
    },
    {
      title: 'Responsible Production',
      description: 'Our products are crafted in limited batches, ensuring zero inventory waste while supporting fair wages and safe workshops.',
      iconName: 'ShieldCheck',
    },
    {
      title: 'Premium Materials',
      description: 'Selected for touch and durability, we specialize in high-grade organic linen, extra-fine merino wool, and long-staple cotton.',
      iconName: 'Gem',
    },
  ];

  return (
    <Section id="philosophy" bg="bg-white" py="py-10!" containerSize="lg" containerClassName="flex flex-col gap-10 py-0! mob:gap-5">
      <SectionHeader
        title={title || "The SAN Standard"}
        description={description || "A dedication to luxury craftsmanship, ethical manufacturing, and enduring simplicity in everyday wear."}
      />
      <Grid cols={1} md={3} gap={6} className="w-full">
        {displayItems.map((value, idx) => {
          const IconComponent = (LucideIcons as any)[value.iconName] || LucideIcons.HelpCircle;
          return (
            <Flex
              key={idx}
              direction="col"
              align="center"
              gap={4}
              className="text-center p-8 rounded-2xl border border-neutral-100/80 bg-white-soft hover:bg-white hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="p-4 bg-white rounded-full border border-neutral-100 text-primary shadow-xs group-hover:scale-110 transition-transform duration-300">
                <IconComponent size={24} strokeWidth={1.2} />
              </div>
              <Typography variant="h3" serif className="text-neutral-900 text-base! font-semibold!">
                {value.title}
              </Typography>
              <Typography variant="p" className="text-neutral-500 text-sm! leading-relaxed">
                {value.description}
              </Typography>
            </Flex>
          );
        })}
      </Grid>
    </Section>
  );
};
