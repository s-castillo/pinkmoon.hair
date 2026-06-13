import Image from "next/image";
import Link from "next/link";
import { PinkMoonLogo } from "@/components/ui/PinkMoonLogo";

type HeroSectionProps = {
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

export function HeroSection({
  headline,
  headlineEmphasis,
  headlineTail,
  subheadline,
  location,
  primaryCtaLabel,
  primaryCtaHref,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-[calc(72px+40px)] text-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(37,35,47,0.40) 0%, rgba(37,35,47,0.60) 50%, rgba(37,35,47,1.00) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex max-w-[840px] flex-col items-center">
        <PinkMoonLogo variant="hero" className="mb-7" />

        <h1
          className="font-display font-light leading-[1.08] tracking-[-0.01em] text-white"
          style={{ fontSize: "clamp(40px, 5.5vw, 58px)" }}
        >
          {headline}
          <br className="md:hidden" />
          {" "}
          <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>{headlineEmphasis}</em>
          <br />
          {headlineTail}
        </h1>

        <p className="mt-5 text-[17px] leading-relaxed text-white/55">{subheadline}</p>

        <p className="mt-2 flex items-center gap-1.5 text-[14px] text-white/55">
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0 text-brand" aria-hidden="true">
            <path
              d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.49-2.01-4.5-4.5-4.5zm0 6.1a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2z"
              fill="currentColor"
            />
          </svg>
          {location}
        </p>

        <Link
          href={primaryCtaHref}
          className="mt-8 inline-block rounded-full bg-brand px-9 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#25232f] transition hover:opacity-90 active:scale-[0.98]"
        >
          {primaryCtaLabel}
        </Link>
      </div>

      {/* Scroll indicator — whole group bounces together */}
      <div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ animation: "scrollBounce 2.2s ease-in-out infinite" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-brand/40 to-transparent" />
        <svg viewBox="0 0 8 5" fill="none" className="h-2 w-2 text-brand/40" aria-hidden="true">
          <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
