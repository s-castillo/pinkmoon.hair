import Link from "next/link";
import { ServiceCard } from "@/components/services/ServiceCard";
import { readContentFile } from "@/lib/content";

type ServicesContent = {
  pageHeader: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  categories: Array<{
    name: string;
    services: Array<{
      name: string;
      description: string;
      price?: string;
      options?: Array<{ label: string; price: string }>;
    }>;
  }>;
  consultationCta: {
    headline: string;
    supportingText: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export default async function ServicesPage() {
  const content = await readContentFile<ServicesContent>("services/services.json");

  return (
    <section className="mx-auto w-full max-w-[820px] px-6 pb-20 pt-28 md:pt-32">
      <p className="text-[10px] uppercase tracking-[0.28em] text-brand before:mr-1.5 before:opacity-50 before:content-['—']">
        {content.pageHeader.eyebrow}
      </p>
      <h1
        className="mt-4 font-display font-light leading-[1.1] text-white"
        style={{ fontSize: "clamp(34px, 7vw, 56px)" }}
      >
        What I <em className="italic text-brand">Offer</em>
      </h1>
      <div className="mt-4 max-w-xl space-y-4 text-[15px] leading-[1.8] text-white/55">
        {content.pageHeader.intro.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-12 space-y-12">
        {content.categories.map((category) => (
          <section key={category.name}>
            <h2 className="mb-1 font-display text-2xl font-bold text-white">{category.name}</h2>
            <div className="divide-y divide-white/[0.08] rounded-2xl border border-white/10 bg-white/[0.03] px-5 md:px-7">
              {category.services.map((service) => (
                <ServiceCard
                  key={`${category.name}-${service.name}`}
                  name={service.name}
                  description={service.description}
                  price={service.price}
                  options={service.options}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14 rounded-2xl border border-brand/40 bg-brand/10 p-8 md:p-10">
        <h2
          className="font-display font-light leading-[1.1] text-white"
          style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
        >
          {content.consultationCta.headline}
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/55">
          {content.consultationCta.supportingText}
        </p>
        <div className="mt-7">
          <Link
            href={content.consultationCta.ctaHref}
            className="inline-block rounded-full bg-brand px-9 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#25232f] transition hover:opacity-90 active:scale-[0.98]"
          >
            {content.consultationCta.ctaLabel}
          </Link>
        </div>
      </section>
    </section>
  );
}
