import Link from 'next/link';
import {
    Button,
    Typography,
    Flex,
    Section,
    BackgroundImage
} from '@/components/ui';

import { HeroData } from '@/types';

interface HeroProps extends Partial<HeroData> {
    onButtonClick?: () => void;
}

export const Hero = ({
    onButtonClick,
    buttonText = "SHOP NOW",
    buttonVariant = "primary",
    subtitle = "Kireina & Gelyu",
    backgroundImage = "/hero-bg.png",
    title = <>8 New Colors. <br className="hidden md:block" /> Moving Fast.</>,
    buttonLink,
}: HeroProps) => {
    return (
        <Section fullHeight className="flex flex-col justify-end pb-32 mob-land:pb-24">
            <BackgroundImage
                priority
                src={backgroundImage}
                alt={typeof title === 'string' ? title : 'Hero Image'}
            />
            <Flex direction="col" gap={5} justify={"end"} className="max-w-2xl relative h-full">
                <Flex direction="col" gap={2}>
                    {subtitle && (
                        <Typography
                            serif
                            italic
                            variant="h3"
                            className="text-white animate-fade-in-up"
                        >
                            {subtitle}
                        </Typography>
                    )}
                    <Typography
                        variant="h1"
                        className="text-white animate-fade-in-up [animation-delay:200ms] opacity-0"
                    >
                        {title}
                    </Typography>
                </Flex>
                <div className="animate-fade-in-up [animation-delay:400ms] opacity-0">
                    <Link href={buttonLink || "/products"} className="inline-block">
                        <Button
                            size="xl"
                            variant={buttonVariant}
                            onClick={onButtonClick}
                            className="uppercase tracking-widest text-[12px] font-bold"
                        >
                            {buttonText}
                        </Button>
                    </Link>
                </div>
            </Flex>
        </Section>
    );
};
