import Link from "next/link";

type ServiceSnapshotItem = {
  name: string;
  href: string;
};

type ServicesSnapshotProps = {
  eyebrow: string;
  title: string;
  items: ServiceSnapshotItem[];
};

export function ServicesSnapshot({ eyebrow, title, items }: ServicesSnapshotProps) {
  return (
    <section className="mx-auto w-full max-w-[820px] px-6 pb-20 md:pb-[100px]">
      <p className="text-[10px] uppercase tracking-[0.28em] text-brand before:mr-1.5 before:opacity-50 before:content-['—']">
        {eyebrow}
      </p>
      <h2
        className="mt-4 font-display font-light leading-[1.1] text-white"
        style={{ fontSize: "clamp(34px, 7vw, 56px)" }}
      >
        What I <em className="italic text-brand">Offer</em>
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-brand/40 hover:bg-brand/[0.05]"
          >
            <span className="font-display text-xl text-white/90">{item.name}</span>
            <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 shrink-0 text-brand" aria-hidden="true">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
