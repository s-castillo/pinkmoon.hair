type ValueItem = {
  title: string;
  description: string;
};

type ValuesSectionProps = {
  values: ValueItem[];
};

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-3xl text-white md:text-4xl">What We Value</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-display text-2xl text-accent">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
