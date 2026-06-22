import { AboutHero, AboutNarrative, AboutQuote } from './sections';
import { getAboutContent } from '@/services/about.service';

export default async function AboutPageContent() {
  const content = await getAboutContent();

  return (
    <div className="bg-white-soft">
      <AboutHero
        caption={content.heroCaption}
        title={content.heroTitle}
        description={content.heroDescription}
      />
      <AboutNarrative
        title1={content.narrativeTitle1}
        description1={content.narrativeDescription1}
        title2={content.narrativeTitle2}
        description2={content.narrativeDescription2}
        image={content.narrativeImage}
      />
      <AboutQuote
        quote={content.quoteText}
        author={content.quoteAuthor}
      />
    </div>
  );
}
