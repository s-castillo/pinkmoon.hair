"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  process?: string;
  colors?: string;
  duration?: string;
};

const TILE_HEIGHTS = [
  "h-44 md:h-56",
  "h-64 md:h-80",
  "h-80 md:h-[28rem]",
  "h-52 md:h-72",
  "h-72 md:h-96",
  "h-56 md:h-[22rem]",
];

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!selected) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const hasDetails = selected && (selected.caption || selected.process || selected.colors || selected.duration);

  return (
    <>
      <div className="mt-6 columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => setSelected(image)}
            className={`relative mb-4 block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-[#1a1822] break-inside-avoid ${TILE_HEIGHTS[index % TILE_HEIGHTS.length]} transition-transform hover:scale-[1.01] hover:border-brand/40`}
            aria-label={`View ${image.alt}`}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover object-center" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
            onClick={() => setSelected(null)}
          >
            <svg viewBox="0 0 14 14" fill="none" className="h-4 w-4">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div
            className="flex max-h-[90svh] max-w-[90vw] flex-col items-center gap-0 overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selected.src}
                alt={selected.alt}
                width={1200}
                height={1600}
                className="max-h-[72svh] max-w-[90vw] rounded-t-2xl object-contain"
                style={{ borderRadius: hasDetails ? "1rem 1rem 0 0" : "1rem" }}
                priority
              />
            </div>

            {hasDetails && (
              <div className="w-full rounded-b-2xl border border-t-0 border-white/10 bg-[#1a1822] px-6 py-5">
                {selected.caption && (
                  <p className="font-display text-xl text-white">{selected.caption}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/50">
                  {selected.process && (
                    <span><span className="text-brand">Process — </span>{selected.process}</span>
                  )}
                  {selected.colors && (
                    <span><span className="text-brand">Colors — </span>{selected.colors}</span>
                  )}
                  {selected.duration && (
                    <span><span className="text-brand">Time in chair — </span>{selected.duration}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
