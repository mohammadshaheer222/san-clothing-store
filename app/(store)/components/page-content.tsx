import { Hero, FAQ, Collection, Marquee, CollectionBanner, BestSeller } from "./sections";
import { HOME_HERO_DATA, COLLECTION_PROMO_DATA } from "@/constants/mock-data";
import { getActiveBanner } from "@/services/banner.service";

export default async function PageContent() {
  let heroData = null;
  let promoData = null;
  let showCollection = true;
  let showBestSeller = true;

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
    const sectionsConfig = await getActiveBanner("homepage-sections");
    if (sectionsConfig) {
      showCollection = sectionsConfig.showCollectionSection !== false;
      showBestSeller = sectionsConfig.showBestSellerSection !== false;
    }
  } catch (error) {
    console.error("Failed to load homepage sections visibility configuration:", error);
  }

  return (
    <div className="flex flex-col gap-16 bg-white-soft">
      {heroData && (
        <div className="flex flex-col">
          <Hero {...heroData} />
          <Marquee />
        </div>
      )}
      {showCollection && <Collection />}
      {promoData && <CollectionBanner {...promoData} />}
      {showBestSeller && <BestSeller />}
      <FAQ />
    </div>
  );
}