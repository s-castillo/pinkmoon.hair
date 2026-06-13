import { GalleryGrid, type GalleryImage } from "@/components/home/GalleryGrid";

type GalleryStripProps = {
  eyebrow: string;
  title: string;
  images: GalleryImage[];
};

export function GalleryStrip({ eyebrow, title, images }: GalleryStripProps) {
  return (
    <section className="mx-auto w-full max-w-[820px] px-6 pb-20 md:pb-[100px]">
      <p className="text-[10px] uppercase tracking-[0.28em] text-brand before:mr-1.5 before:opacity-50 before:content-['—']">
        {eyebrow}
      </p>
      <h2
        className="mt-4 font-display font-light leading-[1.1] text-white"
        style={{ fontSize: "clamp(34px, 7vw, 56px)" }}
      >
        The <em className="italic text-brand">Gallery</em>
      </h2>
      <GalleryGrid images={images} />
    </section>
  );
}
