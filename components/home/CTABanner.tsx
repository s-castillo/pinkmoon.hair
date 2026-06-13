import Link from "next/link";

type CTABannerProps = {
  headline: string;
  supportingText: string;
  ctaLabel: string;
  ctaHref: string;
};

export function CTABanner({ headline, supportingText, ctaLabel, ctaHref }: CTABannerProps) {
  return (
    <section className="mx-auto w-full max-w-[820px] px-6 pb-20 md:pb-[100px]">
      <div className="rounded-2xl border border-brand/40 bg-brand/10 p-8 md:p-10">
        <h2
          className="font-display font-light leading-[1.1] text-white"
          style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
        >
          {headline}
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/55">{supportingText}</p>
        <div className="mt-7">
          <Link
            href={ctaHref}
            className="inline-block rounded-full bg-brand px-9 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#25232f] transition hover:opacity-90 active:scale-[0.98]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
