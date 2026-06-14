import Image from "next/image";
import { PinkMoonLogo } from "@/components/ui/PinkMoonLogo";

type ComingSoonProps = {
  backgroundImage: string;
  location: string;
  instagramUrl: string;
  instagramHandle: string;
  facebookUrl: string;
};

export function ComingSoon({
  backgroundImage,
  location,
  instagramUrl,
  instagramHandle,
  facebookUrl,
}: ComingSoonProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Background */}
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
              "linear-gradient(to bottom, rgba(37,35,47,0.55) 0%, rgba(37,35,47,0.70) 50%, rgba(37,35,47,1.00) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex max-w-[640px] flex-col items-center gap-0">
        <PinkMoonLogo variant="hero" className="mb-8 w-[280px] md:w-[360px]" />

        {/* Coming Soon pill */}
        <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-5 py-2 text-[10px] uppercase tracking-[0.28em] text-brand">
          <span
            className="h-1.5 w-1.5 rounded-full bg-brand"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          Coming Soon
        </p>

        <h1
          className="font-display font-light leading-[1.1] tracking-[-0.01em] text-white"
          style={{ fontSize: "clamp(36px, 6vw, 56px)" }}
        >
          Something <em className="italic text-brand">beautiful</em>
          <br />
          is on its way.
        </h1>

        <p className="mt-6 max-w-[480px] text-[16px] leading-relaxed text-white/55">
          A warm, personal hair experience specializing in colors, cuts, and trims —
          by appointment from a private home studio in San Antonio, TX.
        </p>

        {/* Location */}
        <p className="mt-4 flex items-center gap-1.5 text-[13px] text-white/40">
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0 text-brand/60" aria-hidden="true">
            <path
              d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.49-2.01-4.5-4.5-4.5zm0 6.1a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2z"
              fill="currentColor"
            />
          </svg>
          {location}
        </p>

        {/* Divider */}
        <div className="my-8 h-px w-16 bg-brand/20" />

        {/* Social links */}
        <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-white/30">Follow along</p>
        <div className="flex items-center gap-5">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[12px] tracking-wide text-white/50 transition hover:text-brand"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {instagramHandle}
          </a>

          <span className="h-3 w-px bg-white/15" />

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[12px] tracking-wide text-white/50 transition hover:text-brand"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            Facebook
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
