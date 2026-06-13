type IntroBlurbProps = {
  eyebrow: string;
  title: string;
  titleEmphasis: string;
  quote: string;
  paragraphs: string[];
};

export function IntroBlurb({ eyebrow, title, titleEmphasis, quote, paragraphs }: IntroBlurbProps) {
  return (
    <section className="mx-auto w-full max-w-[820px] px-6 py-20 md:py-[100px]">
      <p className="text-[10px] uppercase tracking-[0.28em] text-brand before:mr-1.5 before:opacity-50 before:content-['—']">
        {eyebrow}
      </p>

      <h2
        className="mt-4 font-display font-light leading-[1.1] text-white"
        style={{ fontSize: "clamp(34px, 7vw, 56px)" }}
      >
        {title} <em className="italic text-brand">{titleEmphasis}</em>
      </h2>

      <div className="my-6 h-px max-w-[60px] bg-brand/30" />

      <p className="mb-6 font-display text-xl italic text-white/70">&ldquo;{quote}&rdquo;</p>

      <div className="space-y-5">
        {paragraphs.map((p) => (
          <p key={p} className="max-w-[520px] text-[15px] leading-[1.8] text-white/55">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
