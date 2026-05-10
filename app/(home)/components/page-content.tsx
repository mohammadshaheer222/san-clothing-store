import { Hero, FAQ, Collection } from "./sections";

import { HOME_HERO_DATA } from "@/constants/mock-data";

export default function PageContent() {
    return (
        <div className="flex flex-col gap-16 bg-white-soft">
            <Hero {...HOME_HERO_DATA} />
            <Collection />
            <FAQ />
        </div>
    );
}