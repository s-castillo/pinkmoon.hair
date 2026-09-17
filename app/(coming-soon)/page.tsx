import { ComingSoon } from "@/components/home/ComingSoon";
import { readContentFile } from "@/lib/content";

type SalonInfo = {
  social: {
    instagram: string;
    instagramHandle: string;
    facebook: string;
  };
};

type HomeContent = {
  hero: {
    backgroundImage: string;
    location: string;
  };
};

export default async function HomePage() {
  const [info, home] = await Promise.all([
    readContentFile<SalonInfo>("salon-info.json"),
    readContentFile<HomeContent>("home.json"),
  ]);

  return (
    <ComingSoon
      backgroundImage={home.hero.backgroundImage}
      location={home.hero.location}
      instagramUrl={info.social.instagram}
      instagramHandle={info.social.instagramHandle}
      facebookUrl={info.social.facebook}
    />
  );
}
