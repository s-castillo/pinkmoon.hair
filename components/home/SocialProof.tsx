type Testimonial = {
  quote: string;
  author: string;
};

type SocialProofProps = {
  eyebrow: string;
  title: string;
  testimonials: Testimonial[];
};

function TestimonialCard({ quote, author }: Testimonial) {
  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:bg-white/[0.09] hover:shadow-[0_8px_32px_-8px_rgba(255,112,219,0.15)]"
    >
      {/* Subtle top-left accent line that grows on hover */}
      <div className="absolute left-0 top-0 h-[2px] w-8 rounded-full bg-brand/30 transition-all duration-500 group-hover:w-full group-hover:bg-brand/20" />

      <p className="text-[15px] leading-[1.8] text-white/65">&ldquo;{quote}&rdquo;</p>
      <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-brand">— {author}</p>
    </article>
  );
}

export function SocialProof({ eyebrow, title, testimonials }: SocialProofProps) {
  return (
    <section className="mx-auto w-full max-w-[820px] px-6 pb-20 text-center md:pb-[100px]">
      <p className="text-[10px] uppercase tracking-[0.28em] text-brand before:mr-1.5 before:opacity-50 before:content-['—']">
        {eyebrow}
      </p>
      <h2
        className="mt-4 font-display font-light leading-[1.1] text-white"
        style={{ fontSize: "clamp(34px, 7vw, 56px)" }}
      >
        {title}
      </h2>
      <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.author} {...t} />
        ))}
      </div>
    </section>
  );
}
