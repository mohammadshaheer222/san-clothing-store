import { Hero, FAQ, Collection, Marquee, CollectionBanner, BestSeller } from "./sections";

import { HOME_HERO_DATA } from "@/constants/mock-data";

export default function PageContent() {
    return (
        <div className="flex flex-col gap-16 bg-white-soft">
            <div className="flex flex-col">
                <Hero {...HOME_HERO_DATA} />
                <Marquee />
            </div>
            <Collection />
            <CollectionBanner />
            <BestSeller />
            <FAQ />
        </div>
    );
}