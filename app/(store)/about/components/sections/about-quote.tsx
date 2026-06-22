import { Section, Typography } from '@/components/ui';

interface AboutQuoteProps {
  quote?: string;
  author?: string;
}

export const AboutQuote = ({ quote, author }: AboutQuoteProps) => {
  return (
    <Section
      id="about-quote"
      bg="bg-primary!"
      py="py-24"
      containerSize="md"
      containerClassName="flex flex-col gap-6 items-center text-center text-white"
    >
      <Typography variant="h2" serif className="text-white text-2xl! md:text-3xl! italic font-light max-w-xl leading-relaxed">
        &ldquo;{quote || "Minimalism is not about having less. It is about making room for what truly matters."}&rdquo;
      </Typography>
      <Typography variant="caption" className="tracking-widest uppercase text-white/75 font-semibold text-xs!">
        {author || "— The SAN Philosophy"}
      </Typography>
    </Section>
  );
};
