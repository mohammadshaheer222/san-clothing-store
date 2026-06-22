import { Section, Typography } from '@/components/ui';

interface AboutHeroProps {
  caption?: string;
  title?: string;
  description?: string;
}

export const AboutHero = ({ caption, title, description }: AboutHeroProps) => {
  return (
    <Section
      id="about-hero"
      bg="bg-white"
      py="py-10"
      containerSize="md"
      containerClassName="flex flex-col gap-6 items-center text-center"
    >
      <Typography variant="caption" className="tracking-[0.3em] text-primary font-semibold text-xs!">
        {caption || "Our Story"}
      </Typography>
      <Typography
        variant="h1"
        serif
        className="text-neutral-900 text-4xl! ipad-land:text-3xl! mob-land:text-2xl! font-bold leading-tight whitespace-pre-line"
      >
        {title || "Crafting Simplicity.\nInspiring Timelessness."}
      </Typography>
      <Typography variant="p" className="text-neutral-500 max-w-2xl text-sm! leading-relaxed">
        {description || "SAN was born from a desire to strip away the noise of modern fast fashion and return to what clothing was always meant to be: comfortable, beautiful, and built to endure."}
      </Typography>
    </Section>
  );
};
