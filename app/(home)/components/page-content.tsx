import { Hero } from "./sections";

import { HOME_HERO_DATA } from "@/constants/mock-data";

export default function PageContent() {
    return (
        <>
            <Hero {...HOME_HERO_DATA} />
        </>
    );
}