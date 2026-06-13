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
    <article className="border-l-2 border-brand/20 pl-5 transition-colors duration-200 hover:border-brand">
      <p className="text-[15px] leading-[1.8] text-white/65">&ldquo;{quote}&rdquo;</p>
      <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-brand">— {author}</p>
    </article>
  );
}

export function SocialProof({ eyebrow, title, testimonials }: SocialProofProps) {
  return (
    <section className="mx-auto w-full max-w-[820px] px-6 pb-20 md:pb-[100px]">
      <p className="text-[10px] uppercase tracking-[0.28em] text-brand before:mr-1.5 before:opacity-50 before:content-['—']">
        {eyebrow}
      </p>
      <h2
        className="mt-4 font-display font-light leading-[1.1] text-white"
        style={{ fontSize: "clamp(34px, 7vw, 56px)" }}
      >
        {title}
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.author} {...t} />
        ))}
      </div>
    </section>
  );
}
