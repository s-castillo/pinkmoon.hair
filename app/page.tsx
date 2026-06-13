import { CTABanner } from "@/components/home/CTABanner";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroBlurb } from "@/components/home/IntroBlurb";
import { ServicesSnapshot } from "@/components/home/ServicesSnapshot";
import { SocialProof } from "@/components/home/SocialProof";
import { readContentFile } from "@/lib/content";

type HomeContent = {
  hero: {
    eyebrow: string;
    headline: string;
    headlineEmphasis: string;
    headlineTail: string;
    subheadline: string;
    location: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    backgroundImage: string;
  };
  introBlurb: {
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    quote: string;
    paragraphs: string[];
  };
  servicesSnapshot: {
    eyebrow: string;
    title: string;
    items: Array<{ name: string; href: string }>;
  };
  galleryStrip: {
    eyebrow: string;
    title: string;
    images: Array<{ src: string; alt: string }>;
  };
  socialProof: {
    eyebrow: string;
    title: string;
    testimonials: Array<{ quote: string; author: string }>;
  };
  ctaBanner: {
    headline: string;
    supportingText: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export default async function HomePage() {
  const content = await readContentFile<HomeContent>("home.json");

  return (
    <>
      <HeroSection {...content.hero} />
      <IntroBlurb {...content.introBlurb} />
      <ServicesSnapshot {...content.servicesSnapshot} />
      <GalleryStrip {...content.galleryStrip} />
      <SocialProof {...content.socialProof} />
      <CTABanner {...content.ctaBanner} />
    </>
  );
}
