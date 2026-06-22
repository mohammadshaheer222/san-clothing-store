import { Hero, FAQ, Collection, Marquee, CollectionBanner, BestSeller, Reviews, Values } from "./sections";
import { HOME_HERO_DATA, COLLECTION_PROMO_DATA } from "@/constants/mock-data";
import { getActiveBanner } from "@/services/banner.service";
import { getStripes } from "@/services/stripe.service";
import { getStoreValues } from "@/services/value.service";

export default async function PageContent() {
  let heroData = null;
  let promoData = null;
  let showCollection = true;
  let showBestSeller = true;
  let showReviews = true;
  let showValues = true;
  let marqueeItems: string[] | undefined = undefined;
  let brandValues: any[] = [];

  try {
    const activeHero = await getActiveBanner("hero");
    if (activeHero) {
      heroData = {
        subtitle: activeHero.subtitle || "",
        title: activeHero.title,
        backgroundImage: activeHero.backgroundImage || HOME_HERO_DATA.backgroundImage,
        buttonText: activeHero.buttonText,
        buttonLink: activeHero.buttonLink,
        buttonVariant: activeHero.buttonVariant || "white",
      };
    }
  } catch (error) {
    console.error("Failed to load dynamic hero banner:", error);
  }

  try {
    const activePromo = await getActiveBanner("collection-promo");
    if (activePromo) {
      promoData = {
        title: activePromo.title,
        description: activePromo.description || "",
        buttonText: activePromo.buttonText,
        buttonLink: activePromo.buttonLink,
        leftImage: activePromo.leftImage || "",
        rightImage: activePromo.rightImage || COLLECTION_PROMO_DATA.rightImage,
      };
    }
  } catch (error) {
    console.error("Failed to load dynamic collection promo banner:", error);
  }

  try {
    brandValues = await getStoreValues();
  } catch (error) {
    console.error("Failed to load dynamic brand values:", error);
  }

  let sectionsConfig: any = null;
  try {
    sectionsConfig = await getActiveBanner("homepage-sections");
    if (sectionsConfig) {
      showCollection = sectionsConfig.showCollectionSection !== false;
      showBestSeller = sectionsConfig.showBestSellerSection !== false;
      showReviews = sectionsConfig.showReviewsSection !== false;
      showValues = sectionsConfig.showValuesSection !== false;
    }
  } catch (error) {
    console.error("Failed to load homepage sections visibility configuration:", error);
  }

  try {
    const stripes = await getStripes();
    marqueeItems = stripes.marquee;
  } catch (error) {
    console.error("Failed to load dynamic stripes for marquee:", error);
  }

  return (
    <div className="flex flex-col gap-16 bg-white-soft">
      {heroData && (
        <div className="flex flex-col">
          <Hero {...heroData} />
          <Marquee items={marqueeItems} />
        </div>
      )}
      {showValues && (
        <Values
          title={sectionsConfig?.valuesTitle}
          description={sectionsConfig?.valuesDescription}
          items={brandValues}
        />
      )}
      {showCollection && (
        <Collection
          title={sectionsConfig?.collectionTitle}
          description={sectionsConfig?.collectionDescription}
        />
      )}
      {promoData && <CollectionBanner {...promoData} />}
      {showBestSeller && (
        <BestSeller
          title={sectionsConfig?.bestSellerTitle}
          description={sectionsConfig?.bestSellerDescription}
        />
      )}
      {showReviews && (
        <Reviews
          title={sectionsConfig?.reviewsTitle}
          description={sectionsConfig?.reviewsDescription}
        />
      )}
      <FAQ />
    </div>
  );
}